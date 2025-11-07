# Game Events Overhaul Plan

**Created**: 2025-11-07
**Status**: PLANNING - Pending Review
**Purpose**: Comprehensive overhaul of game event tracking to capture defensive, neutral-zone, and contextual data for AI-powered practice planning

---

## Executive Summary

### Goals
1. **Add defensive and neutral-zone events** - Balance offensive-focused tracking
2. **Enrich existing events with context** - Capture success/failure, types, and situational data
3. **Layer smart tags** - Enable AI to map game deficiencies → practice priorities
4. **Maintain mobile-first UX** - Keep primary interface clean, add depth through sub-menus

### Why This Matters
Current tracking heavily focuses on offensive events (shots, zone entries). This overhaul captures the full game picture:
- Failed breakouts → D-zone retrieval drills
- Takeaways vs turnovers → pressure and positioning work
- Faceoff losses → faceoff technique drills
- Blocked shots → shot selection and lanes

---

## Current State Analysis

### Existing Event Types
| Event Type | Status | Tracked Context |
|------------|--------|-----------------|
| `shot` | ✅ Implemented | `shot_type`, `result`, `shot_quality` |
| `goal` | ⚠️ Deprecated | Now `shot` with `result='goal'` |
| `breakout` | ✅ Implemented | `success`, `type`, `exit_zone` |
| `turnover` | ✅ Implemented | `type`, `zone`, `caused_by` |
| `zone_entry` | ✅ Implemented | `success`, `type`, `zone` |
| `faceoff` | ⚠️ Partially implemented | `won`, `zone`, `location` |

### Database Schema
- **Table**: `game_events` (polymorphic design)
- **JSONB details column**: ✅ Perfect for extensibility
- **Coordinates**: x (0-200), y (0-100) ✅ Works well
- **Audit trail**: `event_edit_history` ✅ Good for data integrity

---

## Phase 1: New Event Types

### 1.1 Zone Exit
**Rationale**: Captures defensive zone play beyond just breakouts. Tracks how teams get pucks out under pressure.

**Database**:
```sql
event_type = 'zone_exit'
details = {
  "controlled": true,        -- boolean: clean exit vs dump
  "successful": true,        -- boolean: made it past blue line
  "exit_type": "pass",       -- "pass" | "carry" | "dump" | "clear"
  "pressure": "high"         -- "none" | "low" | "high"
}
```

**UI**:
- Primary button: "🧊 Zone Exit"
- Sub-menu on tap:
  - Controlled / Uncontrolled (toggle or 2 buttons)
  - Successful / Failed (auto-detect from coordinates if possible)
  - Exit type: Pass / Carry / Dump / Clear
  - Pressure level: None / Low / High

### 1.2 Blocked Shot
**Rationale**: Captures defensive effort and shot lane awareness.

**Database**:
```sql
event_type = 'blocked_shot'
details = {
  "blocker_position": "defense",  -- "defense" | "forward"
  "shot_from": "point"            -- "point" | "slot" | "rush" | "other"
}
```

**UI**:
- Primary button: "🧍‍♂️ Blocked Shot"
- Sub-menu:
  - Who blocked: D / F (position)
  - Shot from: Point / Slot / Rush

**Note**: This is separate from `shot` with `result='blocked'` - this tracks the blocker's perspective.

### 1.3 Takeaway
**Rationale**: Positive defensive play. Opposite of turnover.

**Database**:
```sql
event_type = 'takeaway'
details = {
  "zone": "defensive",           -- "defensive" | "neutral" | "offensive"
  "takeaway_type": "stick_check", -- "stick_check" | "intercept" | "body_check"
  "led_to_chance": false         -- boolean: immediate scoring chance
}
```

**UI**:
- Primary button: "⚔️ Takeaway"
- Sub-menu:
  - Zone: D / N / O (auto-detect from coordinates)
  - Type: Stick / Intercept / Body
  - Led to chance? Yes / No

### 1.4 Faceoff (Enhanced)
**Rationale**: Already in schema but likely underutilized. Critical for possession analytics.

**Current Schema**:
```sql
event_type = 'faceoff'
details = {
  "won": true,
  "zone": "defensive",
  "location": "left_circle"
}
```

**Enhanced Schema**:
```sql
event_type = 'faceoff'
details = {
  "won": true,                    -- boolean
  "zone": "defensive",            -- "defensive" | "neutral" | "offensive"
  "location": "left_circle",      -- "left_circle" | "right_circle" | "center" | ...
  "technique": "forehand",        -- "forehand" | "backhand" | "tie_up"
  "clean": true                   -- boolean: clean win vs scramble
}
```

**UI**:
- Primary button: "🧩 Faceoff"
- Sub-menu:
  - Won / Lost (toggle)
  - Zone: D / N / O (auto-detect from coordinates)
  - Clean win? Yes / No

### 1.5 Penalty
**Rationale**: Discipline tracking. Drawn penalties are often overlooked but critical.

**Database**:
```sql
event_type = 'penalty'
details = {
  "drawn": false,                 -- boolean: penalty drawn vs penalty taken
  "severity": "minor",            -- "minor" | "major" | "misconduct"
  "infraction": "hooking",        -- enum: "hooking" | "tripping" | "high_sticking" | ...
  "duration_minutes": 2           -- 2, 4, 5, 10
}
```

**UI**:
- Primary button: "🚨 Penalty"
- Sub-menu:
  - Taken / Drawn (toggle)
  - Type: Hooking / Tripping / High-sticking / Slashing / Interference / Other
  - Severity: Minor / Major / Misconduct (auto-fills duration)

### 1.6 Goal Against
**Rationale**: Currently only tracking offensive goals. Need defensive accountability.

**Database**:
```sql
event_type = 'goal_against'
details = {
  "situation": "even_strength",   -- "even_strength" | "power_play" | "penalty_kill" | "empty_net"
  "on_ice_players": ["uuid1"],    -- array of player UUIDs
  "breakdown_type": "lost_coverage", -- "lost_coverage" | "bad_clear" | "bad_pass" | ...
  "goalie_fault": false           -- boolean
}
```

**UI**:
- Primary button: "🧱 Goal Against"
- Tap ice where goal was scored from (opponent's perspective)
- Sub-menu:
  - Situation: ES / PP / PK / EN
  - Breakdown: Lost coverage / Bad clear / Bad pass / Other
  - Goalie fault? Yes / No
- Multi-select players on ice (optional)

---

## Phase 2: Event Context Enrichment

### 2.1 Shot (Enhanced)
**Current**:
```json
{
  "shot_type": "wrist",
  "result": "save",
  "shot_quality": "high"
}
```

**Enhanced**:
```json
{
  "shot_type": "wrist",            -- "wrist" | "backhand" | "slap" | "snap" | "one_timer" | "tip" | "deflection"
  "result": "goal",                -- "goal" | "save" | "miss" | "blocked" | "post"
  "shot_quality": "high",          -- "high" | "medium" | "low" (or auto-calculate from coordinates)
  "rebound": false,                -- boolean: shot off rebound
  "rush": false,                   -- boolean: odd-man rush
  "screen": true                   -- boolean: goalie screened
}
```

**UI Changes**:
- After ice tap + player select → Sub-menu:
  - Result: Goal / Save / Miss / Blocked / Post
  - Type: Wrist / Backhand / Slap / Snap / One-timer / Tip
  - Rebound? Yes / No
  - Rush? Yes / No
  - Screen? Yes / No
- Danger level: Auto-calculate from coordinates (show but don't ask)

### 2.2 Breakout (Enhanced)
**Current**:
```json
{
  "success": true,
  "type": "up_boards",
  "exit_zone": "left"
}
```

**Enhanced**:
```json
{
  "success": true,                 -- boolean
  "breakout_type": "up_boards",    -- "up_boards" | "center_ice" | "d_to_d" | "reverse" | "chip"
  "exit_zone": "left",             -- "left" | "center" | "right"
  "pressure": "high",              -- "none" | "low" | "high"
  "passes": 2                      -- integer: number of passes in breakout
}
```

**UI Changes**:
- After ice tap + player select → Sub-menu:
  - Success / Failed
  - Type: Up boards / Center ice / D-to-D / Reverse / Chip
  - Pressure: None / Low / High

### 2.3 Zone Entry (Enhanced)
**Current**:
```json
{
  "success": true,
  "type": "carry",
  "zone": "left"
}
```

**Enhanced**:
```json
{
  "success": true,                 -- boolean
  "entry_type": "carry",           -- "carry" | "dump" | "pass" | "chip"
  "zone": "left",                  -- "left" | "center" | "right"
  "defenders_beaten": 1,           -- integer: 0, 1, 2+
  "led_to_chance": true            -- boolean: immediate chance created
}
```

**UI Changes**:
- After ice tap + player select → Sub-menu:
  - Success / Failed
  - Type: Carry / Dump / Pass / Chip
  - Defenders beaten: 0 / 1 / 2+
  - Led to chance? Yes / No

### 2.4 Turnover (Enhanced)
**Current**:
```json
{
  "type": "giveaway",
  "zone": "defensive",
  "caused_by": "bad_pass"
}
```

**Enhanced**:
```json
{
  "type": "giveaway",              -- "giveaway" | "takeaway" (opponent's)
  "zone": "defensive",             -- "defensive" | "neutral" | "offensive"
  "caused_by": "bad_pass",         -- "bad_pass" | "lost_puck" | "hit" | "pressure" | "offside"
  "pressure": "high",              -- "none" | "low" | "high"
  "led_to_goal_against": false    -- boolean
}
```

**UI Changes**:
- After ice tap + player select → Sub-menu:
  - Zone: D / N / O (auto-detect from coordinates)
  - Caused by: Bad pass / Lost puck / Hit / Pressure / Offside
  - Pressure: None / Low / High
  - Led to goal? Yes / No

---

## Phase 3: Smart Tags (AI Learning Layer)

### 3.1 Design Philosophy
- **Optional layer** - Don't slow down tracking flow
- **Post-period tagging** - Allow coaches to add tags during intermissions
- **AI suggestions** - AI can suggest tags based on event patterns

### 3.2 Tag Categories

#### A. Outcome Context
**Purpose**: Why did the event succeed/fail?

**Tags**:
- "Turnover due to pressure"
- "Missed net - rushing shot"
- "Lost puck in traffic"
- "Failed breakout - no support"
- "Zone entry - no lanes"
- "Shot blocked - no screen"

**Storage**:
```json
{
  // ... existing event details ...
  "outcome_tags": ["pressure", "no_support"]
}
```

#### B. Player Skill Area
**Purpose**: What skill needs work?

**Tags**:
- "Puck handling"
- "Passing accuracy"
- "Defensive coverage"
- "Shot selection"
- "Positioning"
- "Communication"

**Storage**:
```json
{
  // ... existing event details ...
  "skill_tags": ["passing_accuracy", "positioning"]
}
```

#### C. Drill Implication
**Purpose**: Direct mapping to practice needs

**Tags**:
- "Need small-area battle drills"
- "Improve point shots"
- "Work on breakouts under pressure"
- "Defensive zone coverage"
- "Faceoff technique"

**Storage**:
```json
{
  // ... existing event details ...
  "drill_tags": ["breakouts_under_pressure", "defensive_coverage"]
}
```

### 3.3 UI Implementation
- **Option 1**: "Add Tags" button in event history (edit mode)
- **Option 2**: Bulk tagging view between periods
- **Option 3**: AI-suggested tags after game completion

**Recommended**: Combination of Option 1 (inline) + Option 3 (AI suggestions)

---

## Phase 4: Implementation Plan

### 4.1 Database Changes

#### Migration 1: Add New Event Types
**File**: `supabase/migrations/20251107_add_new_event_types.sql`

```sql
-- No table structure changes needed (polymorphic design handles it!)
-- Just update event_type constraint

ALTER TABLE game_events DROP CONSTRAINT IF EXISTS game_events_event_type_check;

ALTER TABLE game_events ADD CONSTRAINT game_events_event_type_check
  CHECK (event_type IN (
    'shot',
    'breakout',
    'turnover',
    'zone_entry',
    'zone_exit',      -- NEW
    'blocked_shot',   -- NEW
    'takeaway',       -- NEW
    'faceoff',        -- EXISTING
    'penalty',        -- NEW
    'goal_against'    -- NEW
  ));

-- Add indexes for new event types
CREATE INDEX IF NOT EXISTS idx_game_events_zone_exit ON game_events(event_type) WHERE event_type = 'zone_exit';
CREATE INDEX IF NOT EXISTS idx_game_events_blocked_shot ON game_events(event_type) WHERE event_type = 'blocked_shot';
CREATE INDEX IF NOT EXISTS idx_game_events_takeaway ON game_events(event_type) WHERE event_type = 'takeaway';
CREATE INDEX IF NOT EXISTS idx_game_events_penalty ON game_events(event_type) WHERE event_type = 'penalty';
CREATE INDEX IF NOT EXISTS idx_game_events_goal_against ON game_events(event_type) WHERE event_type = 'goal_against';

-- Add comment explaining new event types
COMMENT ON COLUMN game_events.event_type IS 'Event type: shot, breakout, turnover, zone_entry, zone_exit, blocked_shot, takeaway, faceoff, penalty, goal_against';
```

#### Migration 2: Update TypeScript Types
**File**: `lib/types/database.ts`

```bash
npx supabase gen types typescript --local > lib/types/database.ts
```

### 4.2 TypeScript Type Definitions

**File**: `lib/types/game-events.ts` (new file)

```typescript
// Base event types
export type EventType =
  | 'shot'
  | 'breakout'
  | 'turnover'
  | 'zone_entry'
  | 'zone_exit'
  | 'blocked_shot'
  | 'takeaway'
  | 'faceoff'
  | 'penalty'
  | 'goal_against'

// Event details by type
export interface ShotDetails {
  shot_type: 'wrist' | 'backhand' | 'slap' | 'snap' | 'one_timer' | 'tip' | 'deflection'
  result: 'goal' | 'save' | 'miss' | 'blocked' | 'post'
  shot_quality: 'high' | 'medium' | 'low'
  rebound?: boolean
  rush?: boolean
  screen?: boolean
}

export interface BreakoutDetails {
  success: boolean
  breakout_type: 'up_boards' | 'center_ice' | 'd_to_d' | 'reverse' | 'chip'
  exit_zone: 'left' | 'center' | 'right'
  pressure: 'none' | 'low' | 'high'
  passes?: number
}

export interface TurnoverDetails {
  type: 'giveaway' | 'takeaway'
  zone: 'defensive' | 'neutral' | 'offensive'
  caused_by: 'bad_pass' | 'lost_puck' | 'hit' | 'pressure' | 'offside'
  pressure: 'none' | 'low' | 'high'
  led_to_goal_against?: boolean
}

export interface ZoneEntryDetails {
  success: boolean
  entry_type: 'carry' | 'dump' | 'pass' | 'chip'
  zone: 'left' | 'center' | 'right'
  defenders_beaten?: number
  led_to_chance?: boolean
}

export interface ZoneExitDetails {
  controlled: boolean
  successful: boolean
  exit_type: 'pass' | 'carry' | 'dump' | 'clear'
  pressure: 'none' | 'low' | 'high'
}

export interface BlockedShotDetails {
  blocker_position: 'defense' | 'forward'
  shot_from: 'point' | 'slot' | 'rush' | 'other'
}

export interface TakeawayDetails {
  zone: 'defensive' | 'neutral' | 'offensive'
  takeaway_type: 'stick_check' | 'intercept' | 'body_check'
  led_to_chance?: boolean
}

export interface FaceoffDetails {
  won: boolean
  zone: 'defensive' | 'neutral' | 'offensive'
  location: string
  technique?: 'forehand' | 'backhand' | 'tie_up'
  clean?: boolean
}

export interface PenaltyDetails {
  drawn: boolean
  severity: 'minor' | 'major' | 'misconduct'
  infraction: string
  duration_minutes: number
}

export interface GoalAgainstDetails {
  situation: 'even_strength' | 'power_play' | 'penalty_kill' | 'empty_net'
  on_ice_players?: string[]
  breakdown_type: 'lost_coverage' | 'bad_clear' | 'bad_pass' | 'other'
  goalie_fault?: boolean
}

// Smart tags
export interface EventTags {
  outcome_tags?: string[]
  skill_tags?: string[]
  drill_tags?: string[]
}

// Union type for all event details
export type EventDetails =
  | ShotDetails
  | BreakoutDetails
  | TurnoverDetails
  | ZoneEntryDetails
  | ZoneExitDetails
  | BlockedShotDetails
  | TakeawayDetails
  | FaceoffDetails
  | PenaltyDetails
  | GoalAgainstDetails
```

### 4.3 Mobile Implementation

#### Step 1: Update Event Type Selector
**File**: `packages/mobile/app/(tabs)/game-tracking.tsx`

```typescript
// Add new event types to selector
const eventTypes: EventType[] = [
  'shot',
  'breakout',
  'turnover',
  'zone_entry',
  'zone_exit',      // NEW
  'blocked_shot',   // NEW
  'takeaway',       // NEW
  'faceoff',
  'penalty',        // NEW
  'goal_against',   // NEW
]

// Update event type display
const getEventLabel = (type: EventType): string => {
  switch (type) {
    case 'shot': return '🏒 Shot'
    case 'breakout': return '⬆️ Breakout'
    case 'turnover': return '❌ Turnover'
    case 'zone_entry': return '⬇️ Zone Entry'
    case 'zone_exit': return '🧊 Zone Exit'
    case 'blocked_shot': return '🧍‍♂️ Blocked Shot'
    case 'takeaway': return '⚔️ Takeaway'
    case 'faceoff': return '🧩 Faceoff'
    case 'penalty': return '🚨 Penalty'
    case 'goal_against': return '🧱 Goal Against'
  }
}
```

#### Step 2: Create Context Sub-Menu Component
**File**: `packages/mobile/components/game-tracking/EventContextMenu.tsx` (new file)

```typescript
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import type { EventType, EventDetails } from '@/lib/types/game-events'

interface EventContextMenuProps {
  eventType: EventType
  onComplete: (details: EventDetails) => void
  onCancel: () => void
}

export function EventContextMenu({ eventType, onComplete, onCancel }: EventContextMenuProps) {
  // Render appropriate sub-menu based on event type
  // ... implementation
}
```

#### Step 3: Update Event Logging Flow
**Current flow**: Ice tap → Player select → Save event

**New flow**: Ice tap → Player select → Context menu → Save event

```typescript
// State management
const [showContextMenu, setShowContextMenu] = useState(false)
const [pendingEventType, setPendingEventType] = useState<EventType | null>(null)

// After player selection
const handlePlayerSelected = (playerId: string) => {
  setSelectedPlayerId(playerId)
  setShowPlayerSelector(false)
  setShowContextMenu(true)  // NEW
}

// After context menu completion
const handleContextComplete = async (details: EventDetails) => {
  await logEvent({
    player_id: selectedPlayerId,
    event_type: pendingEventType,
    x_coord: pendingLocation.x,
    y_coord: pendingLocation.y,
    period: currentPeriod,
    details,
  })
  setShowContextMenu(false)
  // Clear state
}
```

### 4.4 Web Implementation

#### Step 1: Update GameTracker Component
**File**: `packages/web/components/game-tracking/GameTracker.tsx`

Similar changes to mobile implementation.

#### Step 2: Create Web Context Menu
**File**: `packages/web/components/game-tracking/EventContextDialog.tsx` (new file)

```typescript
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import type { EventType, EventDetails } from '@/lib/types/game-events'

interface EventContextDialogProps {
  open: boolean
  eventType: EventType
  onComplete: (details: EventDetails) => void
  onCancel: () => void
}

export function EventContextDialog({ open, eventType, onComplete, onCancel }: EventContextDialogProps) {
  // Render appropriate form based on event type
  // Use shadcn/ui components (RadioGroup, Select, Checkbox, etc.)
  // ... implementation
}
```

### 4.5 Analytics Updates

#### Update Game Analytics Calculation
**File**: `packages/web/lib/analytics/game-analytics.ts`

```typescript
export interface GameAnalytics {
  // Existing metrics
  shots: number
  goals: number
  save_percentage: number
  breakout_success_rate: number
  zone_entry_success_rate: number
  turnovers: number

  // NEW metrics
  zone_exit_success_rate: number
  blocked_shots: number
  takeaways: number
  giveaway_takeaway_ratio: number
  faceoff_win_percentage: number
  penalties_taken: number
  penalties_drawn: number
  penalty_differential: number
  goals_against: number

  // Contextual breakdowns
  shots_by_type: Record<string, number>
  turnovers_by_zone: Record<string, number>
  faceoffs_by_zone: Record<string, { wins: number; losses: number }>
}
```

### 4.6 AI Integration Updates

#### Update Practice Plan Prompt
**File**: `packages/web/lib/ai/practice-plan-generator.ts`

Add new event types to AI analysis:
- Zone exit failures → D-zone retrieval drills
- Low faceoff win % → Faceoff technique drills
- High penalties → Discipline and positioning work
- Goals against breakdown types → Specific defensive drills

#### Update Drill Metadata
**File**: `supabase/seeds/drills.sql`

Add new `addresses_situations` flags for new event types:
```json
{
  "failed_zone_exits": true,
  "low_faceoff_percentage": true,
  "high_penalties": true,
  "defensive_breakdowns": true,
  "weak_takeaway_pressure": true
}
```

---

## Phase 5: Testing Strategy

### 5.1 Database Tests
- [ ] New event types insert correctly
- [ ] JSONB details validation
- [ ] RLS policies work for new events
- [ ] Event edit history captures new event types

### 5.2 Mobile Tests
- [ ] New event buttons render
- [ ] Context menus display correctly for each event type
- [ ] Event logging flow: ice → player → context → save
- [ ] Coordinate transformation works with new events
- [ ] Period filtering works with new events

### 5.3 Web Tests
- [ ] New event types in game tracker
- [ ] Context dialogs render correctly
- [ ] Event editing supports new event types
- [ ] Analytics page displays new metrics

### 5.4 Integration Tests
- [ ] Events sync between mobile and web
- [ ] Analytics calculations include new events
- [ ] AI practice plan generation uses new data
- [ ] Event history displays all event types

### 5.5 E2E Tests
- [ ] Complete game tracking session with all event types
- [ ] Generate practice plan based on full game data
- [ ] Mobile game → Web analytics → AI practice plan

---

## Phase 6: Rollout Plan

### Stage 1: Database & Types (1 day)
- [ ] Run database migration
- [ ] Generate TypeScript types
- [ ] Create `game-events.ts` type definitions
- [ ] Update existing code to use new types

### Stage 2: Mobile UI (2-3 days)
- [ ] Add new event type buttons
- [ ] Create EventContextMenu component
- [ ] Update event logging flow
- [ ] Test on physical device
- [ ] Update mobile tests

### Stage 3: Web UI (2-3 days)
- [ ] Update GameTracker component
- [ ] Create EventContextDialog component
- [ ] Update event editing UI
- [ ] Update web tests

### Stage 4: Analytics (1-2 days)
- [ ] Update analytics calculations
- [ ] Update analytics display components
- [ ] Add new metrics to player stats
- [ ] Test analytics accuracy

### Stage 5: AI Integration (2-3 days)
- [ ] Update practice plan generator prompt
- [ ] Update drill metadata
- [ ] Test AI recommendations with new events
- [ ] Validate drill matching logic

### Stage 6: Testing & Polish (2-3 days)
- [ ] Full integration testing
- [ ] E2E testing
- [ ] Performance testing (50+ events per game)
- [ ] UX refinements

### Stage 7: Smart Tags (Optional, 2-3 days)
- [ ] Design tagging UI
- [ ] Implement tag storage
- [ ] Add AI tag suggestions
- [ ] Test tag-based drill recommendations

**Total Estimate**: 10-15 days (without Smart Tags), 12-18 days (with Smart Tags)

---

## Open Questions for Review

### 1. Event Type Priority
Should we implement all 6 new event types at once, or phase them in?

**Option A**: All at once (more complete data, but longer dev time)
**Option B**: Phase 1 (zone_exit, takeaway, faceoff), Phase 2 (blocked_shot, penalty, goal_against)

**Recommendation**: Option A - All at once. Database supports it, just need UI work.

### 2. Smart Tags Timing
Should Smart Tags be MVP or post-MVP?

**Option A**: MVP - Critical for AI learning
**Option B**: Post-MVP - Keep initial release focused on event capture

**Recommendation**: Post-MVP. Focus on getting event capture right first. Tags can be added later with AI-suggested defaults.

### 3. Context Menu UX
How much context is too much? Risk of slowing down tracking.

**Option A**: Minimal context (2-3 fields per event)
**Option B**: Full context (4-6 fields per event)
**Option C**: Progressive disclosure (quick log with minimal context, optional deep edit)

**Recommendation**: Option C. Default to quick log (1-2 taps), "Add details" button for more.

### 4. Goal Against Workflow
Should Goal Against require ice tap, or just player selection?

**Option A**: Ice tap required (captures opponent shot location)
**Option B**: Skip ice tap (just log the goal with players on ice)

**Recommendation**: Option A. Opponent shot location is valuable data for heat maps.

### 5. Coordinate Requirements
Which new events require coordinates?

Current thinking:
- ✅ zone_exit: YES (exit point matters)
- ❌ blocked_shot: OPTIONAL (shot origin vs block location?)
- ✅ takeaway: YES (where on ice matters for zone analysis)
- ✅ faceoff: YES (faceoff location)
- ❌ penalty: NO (location not relevant)
- ✅ goal_against: YES (opponent shot location)

**Recommendation**: Confirm this list. Affects UI flow.

### 6. Backward Compatibility
How to handle existing events without new context fields?

**Option A**: Migrate with defaults
**Option B**: Leave as-is, only new events have full context
**Option C**: Prompt users to enrich existing events

**Recommendation**: Option B. Don't touch existing data. Analytics can handle partial context.

---

## Success Metrics

### Data Quality
- [ ] 90%+ events have context filled out (not just minimal data)
- [ ] Average events per game increases 50% (more complete picture)
- [ ] Context fields have <10% "other" selections (good enum design)

### AI Effectiveness
- [ ] AI practice plans reference defensive events (not just offensive)
- [ ] Drill recommendations map to specific event patterns
- [ ] Coach satisfaction with AI relevance increases

### User Experience
- [ ] Average time to log event <10 seconds (including context)
- [ ] Event deletion rate <5% (getting it right the first time)
- [ ] Mobile tracking completion rate >80% (not abandoning mid-game)

---

## Documentation Updates

After implementation:
- [ ] Update `DATABASE_REFERENCE.md` with new event types
- [ ] Update `GAME_TRACKING_MOBILE.md` with new UI flows
- [ ] Create `GAME_EVENTS_REFERENCE.md` (comprehensive event type guide)
- [ ] Update `AI_PRACTICE_PLAN_GENERATION.md` with new event usage
- [ ] Update `COMPONENTS_INVENTORY.md` with new components

---

## Appendix A: UI Mockups

### Mobile Event Context Menu Wireframe
```
┌─────────────────────────────────┐
│  🧊 Zone Exit                   │
├─────────────────────────────────┤
│                                 │
│  Was it controlled?             │
│  ┌─────────┐  ┌──────────┐    │
│  │  YES ✓  │  │   NO     │    │
│  └─────────┘  └──────────┘    │
│                                 │
│  Exit Type:                     │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ Pass │ │ Carry│ │ Dump │   │
│  └──────┘ └──────┘ └──────┘   │
│  ┌──────┐                       │
│  │ Clear│                       │
│  └──────┘                       │
│                                 │
│  Pressure Level:                │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ None │ │ Low  │ │ High │   │
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  ┌────────────────────────────┐│
│  │        Save Event          ││
│  └────────────────────────────┘│
│                                 │
│  ┌────────────────────────────┐│
│  │          Cancel            ││
│  └────────────────────────────┘│
└─────────────────────────────────┘
```

---

## Appendix B: Event Type Reference Card

Quick reference for coaches during games:

| Icon | Event | When to Use |
|------|-------|-------------|
| 🏒 | Shot | Any shot on net (includes goals) |
| ⬆️ | Breakout | Successfully exiting defensive zone |
| 🧊 | Zone Exit | Any attempt to leave defensive zone |
| ⬇️ | Zone Entry | Crossing offensive blue line |
| ❌ | Turnover | Losing possession (giveaway) |
| ⚔️ | Takeaway | Winning possession (stick check, intercept) |
| 🧍‍♂️ | Blocked Shot | Defensive player blocks opponent shot |
| 🧩 | Faceoff | Win or loss at any faceoff dot |
| 🚨 | Penalty | Infraction (taken or drawn) |
| 🧱 | Goal Against | Opponent scores |

---

**Next Steps**: Review this plan, provide feedback, and approve for implementation.
