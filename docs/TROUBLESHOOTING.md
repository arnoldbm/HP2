# Troubleshooting Guide

**Last Updated**: 2025-11-01
**Purpose**: Common problems and their solutions

---

## Database & Schema Issues

### Problem: Age group confusion between USA and Canada

**Symptoms**:
- Age groups displaying incorrectly (e.g., "8U" showing as "U8")
- Unable to compare age groups programmatically

**Solution**: Store age as integer (9), format on display based on team's `region` field.

```typescript
// ✅ Correct approach
const ageYears = 9
const region = 'usa'
const display = formatAgeGroup(ageYears, region) // "8U"

// ❌ Wrong approach
const ageGroup = "8U" // Don't store formatted strings
```

**Utilities**:
- `formatAgeGroup(age_years, region)` - USA: "8U", Canada: "U9"
- `parseAgeGroup(formatted, region)` - Converts back to integer
- Database function: `format_age_group(age_years, region)`

**Why integers?**
- Single source of truth
- Easy comparisons (`age >= 13`)
- Regional formatting at display layer only

**See**: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 708-790)

---

### Problem: Game events are diverse (shots, turnovers, breakouts, etc.)

**Symptoms**:
- Complex queries across multiple event tables
- Difficult to add new event types
- Slow queries joining multiple tables

**Solution**: Polymorphic table with JSONB `details` column instead of separate tables.

```sql
-- ✅ Polymorphic approach
SELECT * FROM game_events WHERE game_id = ?

-- ❌ Multiple tables approach (rejected)
SELECT * FROM shots WHERE game_id = ?
UNION ALL
SELECT * FROM turnovers WHERE game_id = ?
UNION ALL
SELECT * FROM breakouts WHERE game_id = ?
```

**Benefits**:
- Easier queries: Single table, simple WHERE clause
- Type-safe with Zod schemas for each event type
- Easy to add new event types without migrations
- Better performance (no unions needed)

**See**: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 362-449)

---

### Problem: Should 'Goal' be a separate event type or a shot with result='goal'?

**Symptoms**:
- Data duplication (goal events duplicate shot data)
- Queries need to check both shots and goals
- Confusing to determine which events are "goals"

**Solution**: Treat goal as a shot with result='goal', not a separate event type.

```typescript
// ✅ Correct: Goal is a shot
{
  event_type: 'shot',
  details: {
    shot_type: 'wrist',
    result: 'goal', // ← Goal!
    shot_quality: 'high'
  }
}

// ❌ Wrong: Separate goal event
{
  event_type: 'goal',
  details: { /* duplicate shot data */ }
}
```

**Benefits**:
- Eliminates redundancy in data model
- Simplifies queries: `WHERE event_type = 'shot' AND details->>'result' = 'goal'`
- UI preserves UX: Goal button pre-fills result field
- Cleaner analytics (all shots in one query)

**Migration**: `supabase/migrations/20251027235333_remove_goal_event_type.sql`

---

### Problem: Real-time analytics are expensive to compute

**Symptoms**:
- Slow dashboard loading times
- Heavy database load during games
- Timeout errors on analytics page

**Solution**: Pre-compute analytics after game completion, store in `game_analytics` table.

```sql
-- ✅ Pre-computed analytics
SELECT * FROM game_analytics WHERE game_id = ?

-- ❌ Real-time computation (slow)
SELECT
  COUNT(*) FILTER (WHERE event_type = 'shot'),
  COUNT(*) FILTER (WHERE details->>'shot_quality' = 'high'),
  ...
FROM game_events
WHERE game_id = ?
```

**Implementation**:
- Triggered by game status change to 'completed'
- Includes: shot charts, breakout success rates, AI insights
- Serve from cache for instant loading
- Background job for computation (doesn't block UI)

**See**: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 634-675)

---

### Problem: Users with multiple teams get 406 errors

**Symptoms**:
- Error: "Cannot coerce the result to a single JSON object"
- HTTP 406 (Not Acceptable) from Supabase
- Works fine for users with one team

**Root Cause**: Using `.single()` when user has multiple team memberships

```typescript
// ❌ Wrong: Assumes exactly one team
const { data } = await supabase
  .from('team_members')
  .select('team_id')
  .eq('user_id', userId)
  .single() // Fails if user has 2+ teams!

// ✅ Correct: Use team context
const { selectedTeamId } = useTeam()
// Or get first team and auto-select
const { data } = await supabase
  .from('team_members')
  .select('team_id')
  .eq('user_id', userId)
  .limit(1)
```

**Solution**:
- Use TeamContext to track selected team
- Auto-select first team if none selected
- Update all pages to respect team selection
- Store team-specific data in localStorage per team

**Fixed in**: Commit `ad158d9` (Nov 1, 2025)

---

## AI & Practice Planning Issues

### Problem: AI generates drill titles that don't exactly match database drills

**Symptoms**:
- AI recommends "Breakout Drill - D to D" but database has "Breakout drill - d to d"
- Missing drills in saved practice plans
- Warnings in console about unmatched drills

**Solution**: Case-insensitive drill title matching with Map lookup

```typescript
// ✅ Case-insensitive matching
const drills = await supabase
  .from('drills')
  .select('id, title')
  .eq('is_global', true)

const drillTitleMap = new Map(
  drills.map(d => [d.title.toLowerCase(), d.id])
)

const drillId = drillTitleMap.get(aiDrillTitle.toLowerCase())
```

**Benefits**:
- Handles variations in AI-generated titles
- Gracefully skips unmatched drills with console warning
- Coaches can manually add missing drills later

**See**: `docs/AI_PRACTICE_PLAN_GENERATION.md` (Drill Matching Algorithm)

---

### Problem: Need to preserve AI reasoning for why drills were chosen

**Symptoms**:
- Coaches don't trust AI recommendations
- Can't remember why a drill was chosen weeks later
- No audit trail for AI decisions

**Solution**: Store full AI reasoning in JSONB field

```typescript
// ✅ Store AI reasoning
const practice = {
  ai_reasoning: {
    top_focus_areas: ['Poor shot quality', 'Failed breakouts'],
    overall_assessment: 'Team struggled with offensive zone entries...',
    practice_goals: ['Improve shooting accuracy', 'Practice breakout patterns']
  }
}

const practiceDrill = {
  notes: 'Addresses poor shot quality from game vs Rival Team',
  modifications: 'Focus on wrist shots from high-danger areas'
}
```

**Benefits**:
- Coaches can review AI logic later
- Builds trust in AI recommendations
- Future: Use for drill effectiveness analysis
- Audit trail for what AI recommended vs what was actually done

**See**: `docs/AI_PRACTICE_PLAN_GENERATION.md` (Database Schema section)

---

## Game Tracking Issues

### Problem: Analytics page showing 0 events

**Symptoms**:
- Analytics page loads but shows no data
- "No data available" message
- Events exist in database but don't display

**Root Cause**: Analytics page doesn't know which game to load

**Solution**: Auto-load most recent game and provide game selector dropdown.

```typescript
// ✅ Load most recent game on mount
useEffect(() => {
  const { data: games } = await supabase
    .from('games')
    .select('*')
    .eq('team_id', selectedTeamId)
    .order('game_date', { ascending: false })
    .limit(1)

  if (games && games.length > 0) {
    setSelectedGameId(games[0].id)
    loadEvents(games[0].id)
  }
}, [selectedTeamId])
```

**Features**:
- Auto-selects most recent game by game_date
- Dropdown allows switching between games
- Game display format: "vs {opponent_name} - {date} @ {location}"
- Loads events from database for selected game

**See**: `app/demo/analytics/page.tsx` (lines 30-80)

---

### Problem: Browser dialogs (prompt/alert) are poor UX for game creation

**Symptoms**:
- Ugly native browser popups
- Can't style or customize
- Poor mobile experience
- No validation before submission

**Solution**: Replace with inline React forms.

```tsx
// ✅ Inline form with state management
const [showForm, setShowForm] = useState(false)
const [opponentName, setOpponentName] = useState('')
const [location, setLocation] = useState('')

return (
  <form onSubmit={handleSubmit}>
    <input value={opponentName} onChange={...} required />
    <input value={location} onChange={...} />
    <button type="submit">Create Game</button>
    <button onClick={() => setShowForm(false)}>Cancel</button>
  </form>
)
```

**Benefits**:
- Show/hide form with useState toggle
- Controlled inputs for opponent name (required) and location (optional)
- Submit button with loading state
- Cancel button to dismiss form
- Auto-focus first input for keyboard accessibility
- Form validation before submission
- Better mobile experience

**See**: `components/game-tracking/live-stats.tsx` (lines 36-119, 216-274)

---

### Problem: Page refresh forgets which game is being tracked

**Symptoms**:
- Tracking game, refresh page, game resets
- Have to manually select game again
- Loses unsaved event data

**Solution**: Team-specific localStorage with database verification.

```typescript
// ✅ Team-specific localStorage
const storageKey = `current_game_${teamId}`
localStorage.setItem(storageKey, gameId)

// On page load
const storedGameId = localStorage.getItem(storageKey)
if (storedGameId) {
  // Verify game exists and belongs to team
  const { data } = await supabase
    .from('games')
    .select('id')
    .eq('id', storedGameId)
    .eq('team_id', teamId)
    .maybeSingle()

  if (data) {
    loadEvents(data.id)
  }
}
```

**Benefits**:
- Game persists across page refreshes
- Team-specific (different teams get different games)
- Database verification prevents stale data
- Graceful fallback to most recent game
- Security: Verify stored game belongs to user's team

**See**: `app/demo/game-tracking/page.tsx` (lines 194-254)

---

## Offline & PWA Issues

### Problem: Rinks have poor WiFi, need offline tracking

**Symptoms**:
- Events fail to save during game
- Lost data if connection drops
- Slow response when network is weak

**Solution**: PWA with IndexedDB + background sync

```typescript
// ✅ Offline-first approach
// 1. Save to IndexedDB immediately (fast)
await db.game_events.add(event)

// 2. Queue for background sync
await db.sync_queue.add({
  table: 'game_events',
  operation: 'insert',
  data: event
})

// 3. Sync when connection is available
if (navigator.onLine) {
  await syncQueue()
}
```

**Implementation**:
- All events stored locally first (IndexedDB via Dexie.js)
- `sync_queue` table tracks pending changes
- Service worker handles background sync
- Conflict resolution for simultaneous edits

**Status**: Deferred to post-MVP

---

## Performance Issues

### Problem: Can the app handle 50+ events per game?

**Considerations**:
- Database query performance
- Zustand store updates (re-renders)
- SVG ice surface rendering
- Analytics calculations

**Solutions**:
1. **Database**: Indexed queries on `game_id` and `event_type`
2. **State**: Zustand selectors to prevent unnecessary re-renders
3. **Rendering**: Virtual scrolling for event lists
4. **Analytics**: Pre-computed in `game_analytics` table

**Testing needed**:
- Load test with 100+ events
- Measure render performance
- Profile Zustand updates
- Benchmark analytics queries

**Status**: TODO before launch

---

## Development Issues

### Problem: TypeScript types out of sync with database

**Symptoms**:
- TypeScript errors for fields that exist in database
- Missing types for new tables
- Incorrect type definitions

**Solution**: Regenerate types from Supabase schema

```bash
# Generate types from local Supabase
npx supabase gen types typescript --local > lib/types/database.ts
```

**When to regenerate**:
- After creating new migration
- After modifying existing table schema
- When TypeScript complains about missing types

**See**: `lib/types/database.ts`

---

## Common Error Messages

### "Row Level Security policy violation"

**Cause**: User trying to access data they don't have permission for

**Solution**: Check RLS policies, ensure user is a team member

```sql
-- Verify user has team membership
SELECT * FROM team_members
WHERE user_id = '...'
AND team_id = '...';
```

---

### "Cannot coerce the result to a single JSON object"

**Cause**: Using `.single()` when query returns multiple rows

**Solution**: Use `.limit(1)` or `.maybeSingle()` instead

```typescript
// ❌ Fails if multiple rows
.single()

// ✅ Returns first row or null
.limit(1)
.maybeSingle()
```

---

### "PGRST116: The result contains 2 rows"

**Cause**: Same as above - `.single()` with multiple results

**Solution**: See "Users with multiple teams" section above

---

**See also:**
- `docs/DATABASE_REFERENCE.md` - Schema and RLS policies
- `docs/COMPONENTS_INVENTORY.md` - Component documentation
- `docs/TESTING_GUIDE.md` - Testing patterns
