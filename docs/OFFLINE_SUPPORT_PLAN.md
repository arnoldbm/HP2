# Offline Support - Implementation Plan

**Feature**: Enable game tracking without internet connection using IndexedDB + Background Sync
**Priority**: High (critical for rink environments with poor connectivity)
**Complexity**: Medium-High

---

## 📋 Overview

### Problem
Hockey rinks often have poor or no Wi-Fi/cellular connectivity. Coaches need to track games in real-time without worrying about connection drops. Currently, if the connection fails mid-game, data could be lost.

### Solution
Implement a robust offline-first architecture:
1. **IndexedDB** for local storage of game data
2. **Background Sync API** for automatic sync when connection returns
3. **Optimistic UI** updates (already partially implemented)
4. **Conflict resolution** for multi-device scenarios

### Value Proposition
- Track games anywhere, even in dead zones
- Never lose data due to connectivity issues
- Automatic sync when back online
- Better user experience with instant updates

---

## 🏗️ Architecture

### Data Flow

```
User Action (e.g., log shot)
  ↓
1. Update Zustand Store (instant UI update)
  ↓
2. Save to IndexedDB (local persistence)
  ↓
3. Mark as "pending sync" in IndexedDB
  ↓
4. Attempt Supabase sync (if online)
  ↓
  ├─ Success: Mark as "synced" in IndexedDB
  └─ Failure: Keep as "pending sync", retry later
  ↓
5. Background Sync API schedules retry
  ↓
6. When online: Sync all pending items
```

### IndexedDB Schema

```typescript
// Database: hp2-offline
// Version: 1

// Store: games
{
  id: string,              // UUID (generated client-side)
  team_id: string,
  opponent_name: string,
  game_date: string,
  status: 'in_progress' | 'completed',
  sync_status: 'pending' | 'synced' | 'conflict',
  local_created_at: number,  // timestamp
  local_updated_at: number,
  server_id?: string,        // Set after successful sync
  metadata: {
    last_sync_attempt: number,
    sync_error?: string,
  }
}

// Store: events
{
  id: string,              // UUID (generated client-side)
  game_id: string,         // Local game ID
  event_type: 'shot' | 'turnover' | 'breakout' | 'zone_entry' | 'faceoff' | 'blocked_shot',
  player_id: string,
  x: number,
  y: number,
  metadata: object,        // Event-specific data
  period: number,
  game_time: string,
  sync_status: 'pending' | 'synced' | 'conflict',
  local_created_at: number,
  server_id?: string,
}

// Store: sync_queue
{
  id: string,
  entity_type: 'game' | 'event',
  entity_id: string,       // Local ID
  operation: 'create' | 'update' | 'delete',
  data: object,            // Full entity data
  priority: number,        // 1 = high, 5 = low
  attempts: number,
  last_attempt: number,
  error?: string,
}

// Store: metadata
{
  key: string,             // e.g., 'last_sync', 'user_id', 'current_game'
  value: any,
}
```

---

## 🛠️ Implementation Plan

### Phase 1: IndexedDB Setup & Utilities

**Files to Create**:
- `lib/offline/db.ts` - IndexedDB wrapper and schema
- `lib/offline/sync-queue.ts` - Sync queue management
- `lib/offline/conflict-resolution.ts` - Merge strategies

**Tasks**:
1. Set up IndexedDB with Dexie.js (better DX than raw IndexedDB API)
2. Create database schema with stores (games, events, sync_queue, metadata)
3. Write utility functions:
   - `saveGameOffline(game)` - Save game to IndexedDB
   - `saveEventOffline(event)` - Save event to IndexedDB
   - `getAllPendingSync()` - Get all items needing sync
   - `markAsSynced(entity, serverId)` - Update sync status
   - `clearOldData()` - Clean up synced data older than 30 days

**Dependencies**:
```bash
npm install dexie
npm install dexie-react-hooks
```

**Test Coverage**:
- Unit tests for IndexedDB operations
- Integration tests for offline → online transition

---

### Phase 2: Offline-First Game Tracking

**Files to Modify**:
- `lib/stores/game-tracking-store.ts` - Add IndexedDB layer
- `app/actions/games.ts` - Dual write (Supabase + IndexedDB)
- `app/demo/game-tracking/page.tsx` - Load from IndexedDB if offline

**Implementation**:

```typescript
// lib/stores/game-tracking-store.ts
export const useGameTrackingStore = create<GameTrackingState>((set, get) => ({
  // ... existing state ...

  logEvent: async (event) => {
    const localId = crypto.randomUUID()
    const eventWithId = { ...event, id: localId }

    // 1. Optimistic update (instant UI)
    set((state) => ({
      events: [...state.events, eventWithId],
    }))

    // 2. Save to IndexedDB immediately
    await saveEventOffline({
      ...eventWithId,
      sync_status: 'pending',
      local_created_at: Date.now(),
    })

    // 3. Try Supabase sync (may fail offline)
    try {
      const { data, error } = await supabase
        .from('game_events')
        .insert(eventWithId)
        .select()
        .single()

      if (!error) {
        // Success: Mark as synced in IndexedDB
        await markAsSynced('event', localId, data.id)
      } else {
        // Failure: Add to sync queue
        await addToSyncQueue({
          entity_type: 'event',
          entity_id: localId,
          operation: 'create',
          data: eventWithId,
        })
      }
    } catch (err) {
      // Network error: Add to sync queue
      await addToSyncQueue({
        entity_type: 'event',
        entity_id: localId,
        operation: 'create',
        data: eventWithId,
      })
    }
  },

  loadCurrentGame: async (teamId) => {
    // Try online first
    if (navigator.onLine) {
      const { data } = await supabase
        .from('games')
        .select('*')
        .eq('team_id', teamId)
        .eq('status', 'in_progress')
        .single()

      if (data) {
        set({ currentGame: data })
        return
      }
    }

    // Fallback to IndexedDB
    const offlineGame = await getOfflineGame(teamId)
    if (offlineGame) {
      set({ currentGame: offlineGame })
    }
  },
}))
```

**Key Considerations**:
- Generate UUIDs client-side so we have stable IDs before server confirmation
- Always update UI first (optimistic), then persist
- Gracefully handle server rejections (e.g., duplicate prevention)

---

### Phase 3: Background Sync

**Files to Create**:
- `lib/offline/background-sync.ts` - Background Sync API wrapper
- `public/service-worker.js` - Service worker for background sync

**Implementation**:

```typescript
// lib/offline/background-sync.ts
export async function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register('sync-game-data')
  } else {
    // Fallback: Use setInterval to check every 30 seconds
    setInterval(async () => {
      if (navigator.onLine) {
        await syncPendingData()
      }
    }, 30000)
  }
}

export async function syncPendingData() {
  const pendingItems = await getAllPendingSync()

  for (const item of pendingItems) {
    try {
      if (item.operation === 'create') {
        await syncCreate(item)
      } else if (item.operation === 'update') {
        await syncUpdate(item)
      } else if (item.operation === 'delete') {
        await syncDelete(item)
      }

      // Remove from sync queue after success
      await removefromSyncQueue(item.id)
    } catch (error) {
      // Increment retry counter
      await updateSyncQueueItem(item.id, {
        attempts: item.attempts + 1,
        last_attempt: Date.now(),
        error: error.message,
      })
    }
  }
}

async function syncCreate(item: SyncQueueItem) {
  const { data, error } = await supabase
    .from(getTableName(item.entity_type))
    .insert(item.data)
    .select()
    .single()

  if (error) throw error

  // Update local record with server ID
  await markAsSynced(item.entity_type, item.entity_id, data.id)
}
```

**Service Worker** (`public/service-worker.js`):
```javascript
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-game-data') {
    event.waitUntil(syncPendingData())
  }
})

async function syncPendingData() {
  // Call our sync function via fetch to our API
  await fetch('/api/offline/sync', {
    method: 'POST',
    credentials: 'include',
  })
}
```

---

### Phase 4: Conflict Resolution

**Scenario**: User tracks a game on their phone offline. Coach also logs into laptop and makes changes. When phone comes back online, how do we merge?

**Strategy**: Last-Write-Wins with Event Log

```typescript
// lib/offline/conflict-resolution.ts
export async function resolveConflict(
  localEntity: any,
  serverEntity: any,
  entityType: 'game' | 'event'
) {
  if (entityType === 'event') {
    // Events are immutable - always keep both
    // (unlikely to conflict since events have unique timestamps)
    return {
      action: 'keep_both',
      resolution: [localEntity, serverEntity],
    }
  }

  if (entityType === 'game') {
    // Compare timestamps
    if (localEntity.local_updated_at > new Date(serverEntity.updated_at).getTime()) {
      // Local is newer: Update server
      return {
        action: 'update_server',
        resolution: localEntity,
      }
    } else {
      // Server is newer: Update local
      return {
        action: 'update_local',
        resolution: serverEntity,
      }
    }
  }
}
```

**User-Facing Conflicts**:
- Show notification: "Conflict detected for Game vs Opponent. Using most recent changes."
- Allow manual review in rare cases (future enhancement)

---

### Phase 5: UI Indicators

**Files to Modify**:
- `app/demo/game-tracking/page.tsx` - Add sync status indicators
- `components/game-tracking/sync-indicator.tsx` - NEW component

**Visual Indicators**:
- 🟢 Green dot: "Connected & Synced"
- 🟡 Yellow dot: "Syncing..."
- 🔴 Red dot: "Offline - Data saved locally"
- ⚠️ Warning: "X items pending sync"

```tsx
// components/game-tracking/sync-indicator.tsx
export function SyncIndicator() {
  const [syncStatus, setSyncStatus] = useState<'online' | 'syncing' | 'offline'>('online')
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    // Listen to online/offline events
    const handleOnline = () => setSyncStatus('online')
    const handleOffline = () => setSyncStatus('offline')

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check pending items
    const interval = setInterval(async () => {
      const pending = await getAllPendingSync()
      setPendingCount(pending.length)
    }, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${
        syncStatus === 'online' ? 'bg-green-500' :
        syncStatus === 'syncing' ? 'bg-yellow-500 animate-pulse' :
        'bg-red-500'
      }`} />
      <span className="text-sm text-gray-600">
        {syncStatus === 'online' && 'Connected'}
        {syncStatus === 'syncing' && 'Syncing...'}
        {syncStatus === 'offline' && 'Offline Mode'}
      </span>
      {pendingCount > 0 && (
        <span className="text-xs text-gray-500">
          ({pendingCount} pending)
        </span>
      )}
    </div>
  )
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- IndexedDB CRUD operations
- Sync queue management
- Conflict resolution logic

### Integration Tests
- Offline game creation → online sync
- Event logging while offline → sync when online
- Conflict resolution scenarios

### E2E Tests (Playwright)
1. **Offline Game Tracking**:
   - Go offline (Chrome DevTools)
   - Create game and log 10 events
   - Verify all saved to IndexedDB
   - Go online
   - Verify all synced to Supabase
2. **Sync Indicator**:
   - Check green dot when online
   - Toggle offline → red dot appears
   - Log event → yellow "syncing" state
   - Verify sync completes

---

## 📊 Success Metrics

- **Data Integrity**: 0% data loss in offline scenarios
- **Sync Success Rate**: >99% of offline data successfully synced
- **Sync Latency**: Average <5 seconds after reconnection
- **User Experience**: Sync indicator shows correct status 100% of the time

---

## 🚀 Rollout Plan

### Phase 1: Basic Offline (Week 1)
- IndexedDB setup
- Offline game tracking
- Manual sync button

### Phase 2: Auto-Sync (Week 2)
- Background sync API
- Automatic retry logic
- Sync status indicators

### Phase 3: Polish (Week 3)
- Conflict resolution
- Error handling & recovery
- Comprehensive testing

### Phase 4: Beta Testing (Week 4)
- Test with real coaches at rinks
- Monitor sync success rates
- Fix edge cases

---

## 🔧 Technical Considerations

### Browser Support
- IndexedDB: ✅ All modern browsers
- Background Sync API: ⚠️ Chrome/Edge only (fallback for others)
- Service Workers: ✅ All modern browsers

### Data Limits
- IndexedDB: ~50MB typical limit (plenty for game data)
- Clear old synced data after 30 days to stay under limit

### Security
- Encrypt sensitive data in IndexedDB (future enhancement)
- Validate all data before syncing to server
- Use server-side deduplication (e.g., check if event with same localId already exists)

---

## 📝 Documentation Needed

- User guide: "How offline mode works"
- Developer guide: IndexedDB schema and sync flow
- Troubleshooting: "What if my data doesn't sync?"

---

**Next Steps**: Implement Phase 1 (IndexedDB Setup & Utilities)
