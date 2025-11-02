# Database Reference

**Last Updated**: 2025-11-01
**Purpose**: Complete reference for database schema, migrations, and design decisions

---

## Migrations

| File | Purpose | Status |
|------|---------|--------|
| `supabase/migrations/20251024144107_initial_schema.sql` | Organizations, teams, players, age groups | ✅ DONE |
| `supabase/migrations/20251027165031_game_tracking_tables.sql` | Games, events, analytics, audit logging | ✅ DONE |
| `supabase/migrations/20251027172535_fix_audit_logging_trigger.sql` | Nullable edited_by for service role | ✅ DONE |
| `supabase/migrations/20251027175443_fix_event_edit_history_fk.sql` | FK SET NULL for deleted events | ✅ DONE |
| `supabase/migrations/20251027180845_add_service_role_bypass_policies.sql` | Service role RLS bypass | ✅ DONE |
| `supabase/migrations/20251027181536_fix_audit_trigger_delete.sql` | Audit log for deletes | ✅ DONE |
| `supabase/migrations/20251027235333_remove_goal_event_type.sql` | Remove 'goal' event type (use shot with result='goal') | ✅ DONE |
| `supabase/migrations/20251028104517_add_demo_game_support.sql` | Demo game support for testing | ✅ DONE |
| `supabase/migrations/20251028_fix_team_members_rls.sql` | Fixed RLS policies on team_members (added SELECT policies) | ✅ DONE |
| `supabase/migrations/20251028230000_practice_planning_schema.sql` | Practice planning schema (drills, practices, practice_drills with RLS) | ✅ DONE |
| `supabase/seeds/drills.sql` | 255 hockey drills with AI metadata (addresses_situations JSONB) | ✅ DONE |
| `supabase/migrations/20251031000000_seed_sample_drills.sql` | 27 sample drills for practice builder demo | ✅ DONE |
| `lib/types/database.ts` | Auto-generated TypeScript types from Supabase | ✅ DONE |

---

## Schema Design Philosophy

### Polymorphic Events Table
- **Single `game_events` table** with JSONB `details` column
- **Why**: Easier queries, simpler to extend event types
- **Alternative considered**: Separate tables per event type (rejected - too complex)

### Spatial Data
- **Ice coordinates**: x: 0-200, y: 0-100
- **Purpose**: Heat maps, shot location visualization
- **High-danger zone (slot)**: x: 80-110, y: 35-65

### Audit Trail
- **`event_edit_history` table** for all event edits
- **Tracks**: Original values, new values, edited timestamp, edited by user

### Pre-computed Analytics
- **`game_analytics` table** for expensive calculations
- **Triggered by**: Game status change to 'completed'
- **Contains**: Shot charts, breakout success rates, AI insights

### Row-Level Security (RLS)
- **RLS everywhere** for multi-tenant data isolation
- **Service role bypass** for admin operations
- **Team-based access control** via `team_members` table

---

## Core Entities Hierarchy

```
organizations
  ├── teams (age_years, region, level)
  │   ├── players (jersey_number, position)
  │   ├── games (opponent, date, status)
  │   │   ├── game_events (type, x/y coords, details JSONB)
  │   │   └── game_analytics (pre-computed stats)
  │   └── practices
  │       └── practice_drills
  └── users (with roles)

drills (global + org-specific)
  └── addresses_situations JSONB (links drills to game issues)
```

---

## Key Tables

### game_events (polymorphic design)

```sql
CREATE TABLE game_events (
  id UUID PRIMARY KEY,
  game_id UUID REFERENCES games(id),
  player_id UUID REFERENCES players(id),
  event_type TEXT, -- 'shot' | 'breakout' | 'turnover' | 'zone_entry' | 'faceoff'
  x_coord INTEGER, -- 0-200 (ice length)
  y_coord INTEGER, -- 0-100 (ice width)
  period INTEGER,
  game_time_seconds INTEGER,
  situation TEXT, -- 'even_strength' | 'power_play' | 'penalty_kill'
  details JSONB, -- Event-specific data
  created_at TIMESTAMPTZ,
  edited_at TIMESTAMPTZ,
  edited_by UUID
);
```

### Event Details Examples

**Shot event**:
```json
{
  "shot_type": "wrist",
  "result": "save",
  "shot_quality": "high"
}
```

**Breakout event**:
```json
{
  "success": true,
  "type": "up_boards",
  "exit_zone": "left"
}
```

**Turnover event**:
```json
{
  "type": "giveaway",
  "zone": "defensive",
  "caused_by": "bad_pass"
}
```

**Zone Entry event**:
```json
{
  "success": true,
  "type": "carry",
  "zone": "left"
}
```

**Faceoff event**:
```json
{
  "won": true,
  "zone": "defensive",
  "location": "left_circle"
}
```

---

## Ice Surface Coordinates

```
Defensive Zone ← → Offensive Zone
(0,0)           (100,50)          (200,100)
Bottom-left     Center ice        Top-right

Coordinate System:
- X-axis (0-200): Ice length (defensive → offensive)
- Y-axis (0-100): Ice width (bottom → top)
- Origin (0,0): Bottom-left corner (defensive zone)

Zones:
- Defensive: x: 0-66
- Neutral: x: 67-133
- Offensive: x: 134-200

High-danger zone (slot):
- x: 80-110
- y: 35-65
```

---

## Age Group System

### Storage
- **Database**: Integer (age_years)
- **Example**: 9, 11, 13, 15, 17

### Display Formatting
- **USA format**: 8U, 10U, 12U, 14U, 16U
- **Canada format**: U9, U11, U13, U15, U17

### Utilities
- `formatAgeGroup(age_years, region)` - Format for display
- `parseAgeGroup(formatted, region)` - Parse back to integer
- Database function: `format_age_group(age_years, region)`

### Mapping Table

| Stored Value | USA Display | Canada Display |
|--------------|-------------|----------------|
| 9            | 8U          | U9             |
| 11           | 10U         | U11            |
| 13           | 12U         | U13            |
| 15           | 14U         | U15            |
| 17           | 16U         | U17            |
| 19           | 18U         | U19            |

**Why integers?**
- Single source of truth
- Easy comparisons (age >= 13)
- Regional formatting at display layer only

---

## Practice Planning Schema

### practices table
```sql
CREATE TABLE practices (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  practice_date DATE,
  duration_minutes INTEGER,
  location TEXT,
  notes TEXT,
  objectives TEXT,
  generated_by_ai BOOLEAN DEFAULT FALSE,
  based_on_game_id UUID REFERENCES games(id),
  ai_reasoning JSONB, -- Stores AI's reasoning
  status TEXT, -- 'planned' | 'in_progress' | 'completed' | 'cancelled'
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
);
```

### practice_drills table
```sql
CREATE TABLE practice_drills (
  id UUID PRIMARY KEY,
  practice_id UUID REFERENCES practices(id),
  drill_id UUID REFERENCES drills(id),
  section TEXT, -- 'warm_up' | 'skills' | 'drills' | 'small_area_games' | 'scrimmage' | 'cool_down'
  sequence_order INTEGER,
  duration_minutes INTEGER,
  notes TEXT,
  modifications TEXT,
  completed BOOLEAN DEFAULT FALSE
);
```

### drills table
```sql
CREATE TABLE drills (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  title TEXT,
  description TEXT,
  category TEXT,
  duration_minutes INTEGER,
  skill_level TEXT,
  age_min INTEGER,
  age_max INTEGER,
  addresses_situations JSONB, -- AI integration metadata
  tags TEXT[],
  is_global BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ
);
```

**AI Integration Metadata** (`addresses_situations` JSONB):
```json
{
  "poor_shot_quality": true,
  "failed_breakouts": true,
  "turnovers_in_defensive_zone": false,
  "low_shooting_percentage": true
}
```

---

## RLS Policies

### Team Access Pattern
```sql
-- Users can only access data for teams they belong to
CREATE POLICY "team_access" ON {table_name}
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );
```

### Coach-Only Actions
```sql
-- Only head_coach and assistant_coach can modify
CREATE POLICY "coach_modify" ON {table_name}
  FOR ALL TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid()
      AND role IN ('head_coach', 'assistant_coach')
    )
  );
```

### Service Role Bypass
```sql
-- Service role can bypass RLS for admin operations
CREATE POLICY "service_role_bypass" ON {table_name}
  TO service_role
  USING (true)
  WITH CHECK (true);
```

---

## Database Functions

### format_age_group(age_years INTEGER, region TEXT)
```sql
-- Formats age group based on region
-- USA: 8U, 10U, 12U
-- Canada: U9, U11, U13
```

### calculate_practice_duration(practice_id UUID)
```sql
-- Sums duration_minutes from practice_drills
-- Returns total practice duration
```

### get_practice_drill_counts(practice_id UUID)
```sql
-- Returns drill counts by section
-- Used for practice plan summaries
```

---

## TypeScript Types

Auto-generated from Supabase schema:
```bash
npx supabase gen types typescript --local > lib/types/database.ts
```

**Location**: `lib/types/database.ts`

**Usage**:
```typescript
import type { Database } from '@/lib/types/database'

type GameEvent = Database['public']['Tables']['game_events']['Row']
type Player = Database['public']['Tables']['players']['Row']
```

---

**See also:**
- `docs/DEV_SETUP_AND_DATA_MODELS.md` - Full database design rationale
- `docs/COMPONENTS_INVENTORY.md` - Component test coverage
- `docs/TROUBLESHOOTING.md` - Common database issues
