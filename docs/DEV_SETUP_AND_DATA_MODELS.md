# Development Environment & Data Models

## Test-Driven Development Strategy

### Testing Philosophy
**Write tests FIRST, then implement features**

1. **Unit Tests**: Pure functions, utilities, business logic
2. **Integration Tests**: Database operations, API routes, RLS policies
3. **Component Tests**: React components in isolation
4. **E2E Tests**: Critical user flows (game tracking, practice generation)

### Test Coverage Goals
- **Core business logic**: 100% (event validation, analytics calculations)
- **Database operations**: 100% (CRUD + RLS policies)
- **API routes**: 95%+
- **UI components**: 80%+ (focus on interaction logic)
- **E2E flows**: Critical paths only (game tracking → practice plan generation)

---

## Development Environment Setup

### Tech Stack

```yaml
Framework: Next.js 14+ (App Router, Server Components)
Language: TypeScript (strict mode)
Database: Supabase (PostgreSQL 15+)
Testing:
  - Vitest: Unit & integration tests (fast, modern)
  - React Testing Library: Component tests
  - Playwright: E2E tests
  - Supabase CLI: Local database for testing
Auth: Supabase Auth (with RLS)
State: Zustand (lightweight, testable)
Forms: React Hook Form + Zod (type-safe validation)
UI: TailwindCSS + shadcn/ui
Offline: IndexedDB (via Dexie.js) + Service Workers
Canvas: Konva.js or Fabric.js (interactive ice surface)
Charts: Recharts (heat maps, analytics)
```

### Project Structure

```
hp2/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, signup)
│   ├── (dashboard)/              # Protected routes
│   │   ├── teams/
│   │   ├── games/
│   │   │   └── [gameId]/
│   │   │       ├── track/        # Live tracking interface
│   │   │       ├── edit/         # Post-game editing
│   │   │       └── analytics/    # Post-game analytics
│   │   ├── practices/
│   │   └── drills/
│   └── api/                      # API routes
│       ├── games/
│       ├── events/
│       ├── analytics/
│       └── ai/
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── game-tracking/
│   │   ├── IceSurface.tsx
│   │   ├── EventLogger.tsx
│   │   ├── LiveStats.tsx
│   │   └── EventEditor.tsx
│   ├── analytics/
│   └── practice-planning/
├── lib/                          # Core business logic
│   ├── db/                       # Database client & queries
│   ├── analytics/                # Analytics calculations
│   ├── ai/                       # AI integration
│   ├── offline/                  # Offline sync logic
│   └── validation/               # Zod schemas
├── tests/
│   ├── unit/                     # Pure function tests
│   ├── integration/              # Database & API tests
│   ├── components/               # React component tests
│   └── e2e/                      # Playwright E2E tests
├── supabase/
│   ├── migrations/               # Database migrations
│   ├── seed.sql                  # Seed data
│   └── tests/                    # pgTAP tests (optional)
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
└── scripts/
    ├── generate-types.ts         # Generate TS types from DB
    └── seed-drills.ts            # Populate drill library
```

### Installation & Setup

```bash
# 1. Initialize Next.js project
npx create-next-app@latest hp2 --typescript --tailwind --app --src-dir=false

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install zod react-hook-form @hookform/resolvers
npm install zustand
npm install dexie dexie-react-hooks
npm install konva react-konva (or fabric)
npm install recharts
npm install date-fns

# 3. Install dev dependencies
npm install -D vitest @vitest/ui
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npm install -D supabase
npm install -D eslint-config-prettier prettier
npm install -D @types/node

# 4. Setup Supabase CLI
npx supabase init
npx supabase start  # Starts local Postgres
npx supabase db reset  # Apply migrations

# 5. Generate TypeScript types from database
npx supabase gen types typescript --local > lib/types/database.ts
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key
```

### Test Configuration

**vitest.config.ts**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})
```

**playwright.config.ts**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

## Database Schema

### Core Entities

#### organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### users
```sql
-- Extends Supabase auth.users
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### organization_members
```sql
CREATE TYPE org_role AS ENUM ('owner', 'admin', 'coach', 'manager', 'stat_tracker');

CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role org_role NOT NULL DEFAULT 'coach',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
```

#### teams
```sql
CREATE TYPE team_level AS ENUM ('house', 'travel', 'aaa', 'aa', 'a');

-- Age stored as integer to support both USA and Canada conventions
-- USA: 8U, 10U, 12U, 14U, 16U, 18U (2-year bands)
-- Canada: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year)
-- age_years = 9 means "U9" (Canada) or "8U" (USA, since U9 = 8 and under)

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,

  -- Age group stored as integer for flexibility
  age_years INTEGER NOT NULL CHECK (age_years BETWEEN 6 AND 21),
  -- Examples:
  --   9 = U9 (Canada) or 8U (USA)
  --   11 = U11 (Canada) or 10U (USA)
  --   13 = U13 (Canada) or 12U (USA)

  level team_level NOT NULL,
  season TEXT NOT NULL,  -- e.g., "2024-25"

  -- Regional settings
  region TEXT DEFAULT 'usa' CHECK (region IN ('usa', 'canada')),
  -- Determines display format:
  --   'usa': age_years=9 displays as "8U"
  --   'canada': age_years=9 displays as "U9"

  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_teams_org ON teams(organization_id);
CREATE INDEX idx_teams_age ON teams(age_years);

-- Helper function to format age group for display
CREATE OR REPLACE FUNCTION format_age_group(age_years INTEGER, region TEXT)
RETURNS TEXT AS $$
BEGIN
  IF region = 'usa' THEN
    -- USA format: 8U (even numbers)
    -- age_years=9 -> 8U, age_years=11 -> 10U
    RETURN (age_years - 1)::TEXT || 'U';
  ELSE
    -- Canada format: U9, U10, U11, etc.
    RETURN 'U' || age_years::TEXT;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- View for formatted age groups
CREATE VIEW teams_with_age_display AS
SELECT
  t.*,
  format_age_group(t.age_years, t.region) as age_group_display
FROM teams t;
```

#### team_members
```sql
CREATE TYPE team_role AS ENUM ('head_coach', 'assistant_coach', 'manager', 'stat_tracker');

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role team_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
```

#### players
```sql
CREATE TYPE player_position AS ENUM ('forward', 'defense', 'goalie');

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  jersey_number INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position player_position NOT NULL,
  birthdate DATE,
  metadata JSONB DEFAULT '{}',  -- skill ratings, notes, etc.
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, jersey_number)
);

CREATE INDEX idx_players_team ON players(team_id);
```

### Game Tracking

#### games
```sql
CREATE TYPE game_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  opponent_name TEXT NOT NULL,
  game_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_home BOOLEAN DEFAULT true,
  status game_status DEFAULT 'scheduled',
  final_score_us INTEGER,
  final_score_them INTEGER,
  notes TEXT,
  locked BOOLEAN DEFAULT false,  -- Prevent edits after coach approval
  locked_at TIMESTAMPTZ,
  locked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_games_team ON games(team_id);
CREATE INDEX idx_games_date ON games(game_date);
```

### Game Events (Core Tracking Data)

**Design Decision**: Single polymorphic table with JSONB for event-specific data
- Simpler querying (all events in one table)
- Easier to add new event types
- Event-specific fields in `details` JSONB column

```sql
CREATE TYPE event_type AS ENUM (
  'shot',
  'goal',
  'breakout',
  'turnover',
  'zone_entry',
  'faceoff',
  'penalty',
  'defensive_breakdown',
  'special_teams'
);

CREATE TYPE shot_result AS ENUM ('goal', 'save', 'miss_high', 'miss_wide', 'blocked', 'post');
CREATE TYPE shot_type AS ENUM ('wrist', 'slap', 'snap', 'backhand', 'deflection', 'one_timer');
CREATE TYPE game_situation AS ENUM ('even_strength', 'power_play', 'penalty_kill', 'empty_net');
CREATE TYPE ice_zone AS ENUM ('defensive', 'neutral', 'offensive');

CREATE TABLE game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  event_type event_type NOT NULL,

  -- Spatial data (x, y on ice surface, 0-200 scale)
  -- (0,0) = defensive zone left corner, (100,100) = center ice, (200,100) = offensive zone right corner
  x_coord INTEGER,  -- 0-200 (left to right)
  y_coord INTEGER,  -- 0-100 (bottom to top)

  -- Temporal data
  period INTEGER NOT NULL CHECK (period BETWEEN 1 AND 5),  -- 1-3 regulation, 4+ OT
  game_time_seconds INTEGER,  -- Seconds remaining in period (1200 = 20:00)
  event_timestamp TIMESTAMPTZ DEFAULT now(),

  -- Player/situation context
  player_id UUID REFERENCES players(id) ON DELETE SET NULL,
  situation game_situation DEFAULT 'even_strength',
  zone ice_zone,

  -- Event-specific details (JSONB for flexibility)
  details JSONB NOT NULL DEFAULT '{}',
  /*
    For shots:
    {
      "shot_type": "wrist",
      "result": "save",
      "shot_quality": "high",  -- high/medium/low danger
      "rebound": false
    }

    For breakouts:
    {
      "success": true,
      "type": "up_boards", -- up_boards, center_ice, cross_ice, carry
      "exit_zone": "left", -- left, center, right
    }

    For turnovers:
    {
      "type": "bad_pass", -- bad_pass, lost_puck, forced
      "recovery": false
    }

    For zone_entry:
    {
      "entry_type": "carry", -- dump, carry, pass
      "controlled": true
    }

    For faceoff:
    {
      "won": true,
      "location": "offensive_left"
    }
  */

  -- Metadata
  notes TEXT,
  tracked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_game ON game_events(game_id);
CREATE INDEX idx_events_type ON game_events(event_type);
CREATE INDEX idx_events_player ON game_events(player_id);
CREATE INDEX idx_events_timestamp ON game_events(event_timestamp);

-- Spatial index for location-based queries
CREATE INDEX idx_events_coords ON game_events(x_coord, y_coord) WHERE x_coord IS NOT NULL;
```

#### event_edit_history
```sql
-- Audit log for event edits
CREATE TABLE event_edit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES game_events(id) ON DELETE CASCADE,
  edited_by UUID NOT NULL REFERENCES auth.users(id),
  edited_at TIMESTAMPTZ DEFAULT now(),
  previous_data JSONB NOT NULL,  -- Snapshot of event before edit
  changes JSONB NOT NULL,  -- What changed
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete'))
);

CREATE INDEX idx_edit_history_event ON event_edit_history(event_id);
```

### Practice Planning

#### drills
```sql
CREATE TYPE drill_category AS ENUM (
  'skating',
  'passing',
  'shooting',
  'puck_handling',
  'defensive',
  'offensive',
  'transition',
  'goalie',
  'special_teams'
);

CREATE TYPE space_requirement AS ENUM ('full_ice', 'half_ice', 'third_ice', 'station', 'any');

CREATE TABLE drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category drill_category NOT NULL,
  tags TEXT[] DEFAULT '{}',

  -- Drill metadata
  age_min INTEGER CHECK (age_min BETWEEN 6 AND 21),  -- Minimum age (e.g., 9 for U9/8U)
  age_max INTEGER CHECK (age_max BETWEEN 6 AND 21),  -- Maximum age (e.g., 13 for U13/12U)
  skill_level INTEGER CHECK (skill_level BETWEEN 1 AND 5),  -- 1=beginner, 5=advanced
  duration_minutes INTEGER NOT NULL,
  space_required space_requirement DEFAULT 'full_ice',
  min_players INTEGER DEFAULT 6,
  max_players INTEGER,
  equipment_needed TEXT[],

  -- Content
  diagram_url TEXT,
  video_url TEXT,
  coaching_points TEXT[],
  variations TEXT[],

  -- Game situation mappings (what this drill addresses)
  addresses_situations JSONB DEFAULT '{}',
  /*
    {
      "low_slot_shots": true,
      "left_side_breakouts": true,
      "neutral_zone_turnovers": true
    }
  */

  -- Effectiveness tracking
  times_used INTEGER DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0.0,

  -- Custom drills
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,  -- NULL = global drill
  created_by UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_drills_category ON drills(category);
CREATE INDEX idx_drills_org ON drills(organization_id) WHERE organization_id IS NOT NULL;
CREATE INDEX idx_drills_situations ON drills USING GIN(addresses_situations);
```

#### practices
```sql
CREATE TYPE practice_status AS ENUM ('planned', 'completed', 'cancelled');

CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  practice_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  location TEXT,
  status practice_status DEFAULT 'planned',

  -- Planning context
  focus_areas TEXT[],
  notes TEXT,
  attendance_count INTEGER,

  -- AI generation metadata
  generated_by_ai BOOLEAN DEFAULT false,
  generation_context JSONB,  -- What game data/feedback was used

  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_practices_team ON practices(team_id);
CREATE INDEX idx_practices_date ON practices(practice_date);
```

#### practice_drills
```sql
CREATE TABLE practice_drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  drill_id UUID NOT NULL REFERENCES drills(id) ON DELETE CASCADE,

  -- Drill order and timing
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,

  -- Customizations for this practice
  custom_notes TEXT,
  modifications TEXT,

  -- Post-practice feedback
  effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),
  feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_practice_drills_practice ON practice_drills(practice_id);
CREATE INDEX idx_practice_drills_drill ON practice_drills(drill_id);
```

### Analytics (Computed/Cached)

#### game_analytics
```sql
-- Pre-computed analytics per game (updated after game completion)
CREATE TABLE game_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL UNIQUE REFERENCES games(id) ON DELETE CASCADE,

  -- Shot analytics
  total_shots INTEGER DEFAULT 0,
  shots_on_goal INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  shot_quality_high INTEGER DEFAULT 0,
  shot_quality_medium INTEGER DEFAULT 0,
  shot_quality_low INTEGER DEFAULT 0,
  shooting_percentage DECIMAL(5,2),

  -- Defensive analytics
  total_breakouts INTEGER DEFAULT 0,
  successful_breakouts INTEGER DEFAULT 0,
  breakout_success_rate DECIMAL(5,2),
  turnovers INTEGER DEFAULT 0,
  turnovers_defensive INTEGER DEFAULT 0,
  turnovers_neutral INTEGER DEFAULT 0,
  turnovers_offensive INTEGER DEFAULT 0,

  -- Special teams
  faceoffs_taken INTEGER DEFAULT 0,
  faceoffs_won INTEGER DEFAULT 0,
  faceoff_win_percentage DECIMAL(5,2),
  power_plays INTEGER DEFAULT 0,
  power_play_goals INTEGER DEFAULT 0,

  -- Heat map data (aggregated coordinates)
  shot_locations JSONB DEFAULT '[]',  -- Array of {x, y, result}
  turnover_locations JSONB DEFAULT '[]',

  -- AI-generated insights
  insights TEXT[],
  recommended_drill_categories TEXT[],

  computed_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_game_analytics_game ON game_analytics(game_id);
```

#### team_season_stats
```sql
-- Aggregated stats across entire season
CREATE TABLE team_season_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  season TEXT NOT NULL,

  -- Aggregated game stats
  games_tracked INTEGER DEFAULT 0,
  total_shots INTEGER DEFAULT 0,
  avg_shots_per_game DECIMAL(5,2),
  avg_shooting_percentage DECIMAL(5,2),
  avg_breakout_success DECIMAL(5,2),

  -- Trends over time (JSONB array of game-by-game data)
  shot_volume_trend JSONB DEFAULT '[]',
  breakout_success_trend JSONB DEFAULT '[]',

  last_computed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, season)
);

CREATE INDEX idx_season_stats_team ON team_season_stats(team_id);
```

### Offline Sync

#### sync_queue
```sql
-- Track offline changes for later sync
CREATE TABLE sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,  -- 'game_event', 'game', etc.
  entity_id UUID,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  payload JSONB NOT NULL,
  client_timestamp TIMESTAMPTZ NOT NULL,
  synced BOOLEAN DEFAULT false,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sync_queue_user ON sync_queue(user_id);
CREATE INDEX idx_sync_queue_synced ON sync_queue(synced) WHERE NOT synced;
```

---

## TypeScript Types & Zod Schemas

### Age Group Utilities

```typescript
// lib/utils/age-groups.ts

/**
 * Age group utilities to handle USA and Canada conventions
 *
 * USA: 8U, 10U, 12U, 14U, 16U, 18U (2-year bands, even numbers)
 * Canada: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year)
 *
 * Mapping:
 * - U9 (Canada) = 8U (USA) - both are age 8 and under
 * - U11 (Canada) = 10U (USA) - both are age 10 and under
 * - U13 (Canada) = 12U (USA) - both are age 12 and under
 */

export type Region = 'usa' | 'canada'

/**
 * Format age for display based on region
 * @param ageYears - Age stored in database (e.g., 9, 11, 13)
 * @param region - 'usa' or 'canada'
 * @returns Formatted string (e.g., "8U" or "U9")
 */
export function formatAgeGroup(ageYears: number, region: Region = 'usa'): string {
  if (region === 'usa') {
    // USA format: 8U (even numbers)
    // age_years=9 -> 8U, age_years=11 -> 10U
    return `${ageYears - 1}U`
  } else {
    // Canada format: U9, U10, U11, etc.
    return `U${ageYears}`
  }
}

/**
 * Parse age group string back to integer
 * @param ageGroup - Formatted string (e.g., "8U" or "U9")
 * @returns Age in years (e.g., 9)
 */
export function parseAgeGroup(ageGroup: string): number {
  // Handle both formats: "8U" and "U9"
  const match = ageGroup.match(/(\d+)U|U(\d+)/)
  if (!match) throw new Error(`Invalid age group format: ${ageGroup}`)

  const usaFormat = match[1] // "8U" -> "8"
  const canadaFormat = match[2] // "U9" -> "9"

  if (usaFormat) {
    // USA format: 8U means 9 years (8 and under)
    return parseInt(usaFormat) + 1
  } else {
    // Canada format: U9 means 9 years
    return parseInt(canadaFormat)
  }
}

/**
 * Get all available age groups for a region
 */
export function getAgeGroupOptions(region: Region = 'usa'): Array<{ value: number; label: string }> {
  const ages = region === 'usa'
    ? [8, 10, 12, 14, 16, 18] // USA: even numbers only
    : [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] // Canada: every year

  return ages.map(age => {
    const ageYears = region === 'usa' ? age + 1 : age
    return {
      value: ageYears,
      label: formatAgeGroup(ageYears, region)
    }
  })
}

// Examples:
// formatAgeGroup(9, 'usa') => "8U"
// formatAgeGroup(9, 'canada') => "U9"
// parseAgeGroup("8U") => 9
// parseAgeGroup("U9") => 9
// getAgeGroupOptions('usa') => [{value: 9, label: "8U"}, {value: 11, label: "10U"}, ...]
// getAgeGroupOptions('canada') => [{value: 9, label: "U9"}, {value: 10, label: "U10"}, ...]
```

### Example: Game Event Types

```typescript
// lib/types/game-events.ts
import { z } from 'zod'
import type { Database } from './database'

// Inferred from database schema
export type GameEvent = Database['public']['Tables']['game_events']['Row']
export type GameEventInsert = Database['public']['Tables']['game_events']['Insert']
export type GameEventUpdate = Database['public']['Tables']['game_events']['Update']

// Zod validation schemas
export const shotEventSchema = z.object({
  shot_type: z.enum(['wrist', 'slap', 'snap', 'backhand', 'deflection', 'one_timer']),
  result: z.enum(['goal', 'save', 'miss_high', 'miss_wide', 'blocked', 'post']),
  shot_quality: z.enum(['high', 'medium', 'low']),
  rebound: z.boolean().optional(),
})

export const breakoutEventSchema = z.object({
  success: z.boolean(),
  type: z.enum(['up_boards', 'center_ice', 'cross_ice', 'carry']),
  exit_zone: z.enum(['left', 'center', 'right']).optional(),
})

export const turnoverEventSchema = z.object({
  type: z.enum(['bad_pass', 'lost_puck', 'forced']),
  recovery: z.boolean().optional(),
})

export const gameEventCreateSchema = z.object({
  game_id: z.string().uuid(),
  event_type: z.enum(['shot', 'goal', 'breakout', 'turnover', 'zone_entry', 'faceoff', 'penalty', 'defensive_breakdown']),
  x_coord: z.number().int().min(0).max(200).optional(),
  y_coord: z.number().int().min(0).max(100).optional(),
  period: z.number().int().min(1).max(5),
  game_time_seconds: z.number().int().min(0).max(1200).optional(),
  player_id: z.string().uuid().optional(),
  situation: z.enum(['even_strength', 'power_play', 'penalty_kill', 'empty_net']).default('even_strength'),
  zone: z.enum(['defensive', 'neutral', 'offensive']).optional(),
  details: z.record(z.any()),
  notes: z.string().optional(),
})

export type ShotEventDetails = z.infer<typeof shotEventSchema>
export type BreakoutEventDetails = z.infer<typeof breakoutEventSchema>
export type TurnoverEventDetails = z.infer<typeof turnoverEventSchema>
export type GameEventCreate = z.infer<typeof gameEventCreateSchema>
```

---

## TDD Workflow Examples

### Example 1: Unit Test - Age Group Utilities

**Test First** (`tests/unit/age-groups.test.ts`):
```typescript
import { describe, it, expect } from 'vitest'
import { formatAgeGroup, parseAgeGroup, getAgeGroupOptions } from '@/lib/utils/age-groups'

describe('Age Group Utilities', () => {
  describe('formatAgeGroup', () => {
    it('should format USA age groups correctly', () => {
      expect(formatAgeGroup(9, 'usa')).toBe('8U')
      expect(formatAgeGroup(11, 'usa')).toBe('10U')
      expect(formatAgeGroup(13, 'usa')).toBe('12U')
      expect(formatAgeGroup(19, 'usa')).toBe('18U')
    })

    it('should format Canadian age groups correctly', () => {
      expect(formatAgeGroup(9, 'canada')).toBe('U9')
      expect(formatAgeGroup(10, 'canada')).toBe('U10')
      expect(formatAgeGroup(11, 'canada')).toBe('U11')
      expect(formatAgeGroup(18, 'canada')).toBe('U18')
    })

    it('should default to USA format', () => {
      expect(formatAgeGroup(9)).toBe('8U')
    })
  })

  describe('parseAgeGroup', () => {
    it('should parse USA format', () => {
      expect(parseAgeGroup('8U')).toBe(9)
      expect(parseAgeGroup('10U')).toBe(11)
      expect(parseAgeGroup('12U')).toBe(13)
    })

    it('should parse Canadian format', () => {
      expect(parseAgeGroup('U9')).toBe(9)
      expect(parseAgeGroup('U10')).toBe(10)
      expect(parseAgeGroup('U11')).toBe(11)
    })

    it('should throw on invalid format', () => {
      expect(() => parseAgeGroup('invalid')).toThrow('Invalid age group format')
    })
  })

  describe('getAgeGroupOptions', () => {
    it('should return USA age groups (2-year bands)', () => {
      const options = getAgeGroupOptions('usa')
      expect(options).toHaveLength(6)
      expect(options[0]).toEqual({ value: 9, label: '8U' })
      expect(options[1]).toEqual({ value: 11, label: '10U' })
      expect(options[5]).toEqual({ value: 19, label: '18U' })
    })

    it('should return Canadian age groups (every year)', () => {
      const options = getAgeGroupOptions('canada')
      expect(options.length).toBeGreaterThan(10)
      expect(options.find(o => o.label === 'U9')).toBeDefined()
      expect(options.find(o => o.label === 'U10')).toBeDefined()
      expect(options.find(o => o.label === 'U11')).toBeDefined()
    })
  })

  describe('USA and Canada equivalence', () => {
    it('should have equivalent age values', () => {
      // U9 (Canada) = 8U (USA) = age 9
      expect(parseAgeGroup('U9')).toBe(parseAgeGroup('8U'))
      expect(parseAgeGroup('U11')).toBe(parseAgeGroup('10U'))
      expect(parseAgeGroup('U13')).toBe(parseAgeGroup('12U'))
    })
  })
})
```

**Implementation** (`lib/utils/age-groups.ts`):
*(Already shown above in TypeScript section)*

---

### Example 2: Unit Test - Shot Quality Calculator

**Test First** (`tests/unit/shot-quality.test.ts`):
```typescript
import { describe, it, expect } from 'vitest'
import { calculateShotQuality } from '@/lib/analytics/shot-quality'

describe('calculateShotQuality', () => {
  it('should classify slot shots as high danger', () => {
    const quality = calculateShotQuality({ x: 90, y: 45 })
    expect(quality).toBe('high')
  })

  it('should classify point shots as low danger', () => {
    const quality = calculateShotQuality({ x: 160, y: 50 })
    expect(quality).toBe('low')
  })

  it('should classify faceoff dot shots as medium danger', () => {
    const quality = calculateShotQuality({ x: 110, y: 30 })
    expect(quality).toBe('medium')
  })

  it('should handle edge cases (behind goal line)', () => {
    const quality = calculateShotQuality({ x: 10, y: 50 })
    expect(quality).toBe('low')
  })
})
```

**Implementation** (`lib/analytics/shot-quality.ts`):
```typescript
type ShotQuality = 'high' | 'medium' | 'low'

interface Coordinates {
  x: number  // 0-200
  y: number  // 0-100
}

// High danger area: "home plate" in front of net (80-110 x, 35-65 y)
// Medium danger: Faceoff circles, mid-slot
// Low danger: Point, behind net, extreme angles

export function calculateShotQuality({ x, y }: Coordinates): ShotQuality {
  // Offensive zone is roughly x: 133-200 (67-200 feet from center)

  // High danger: slot area
  if (x >= 80 && x <= 110 && y >= 35 && y <= 65) {
    return 'high'
  }

  // High danger: very close to net
  if (x >= 60 && x <= 80 && y >= 40 && y <= 60) {
    return 'high'
  }

  // Low danger: point shots
  if (x >= 140) {
    return 'low'
  }

  // Low danger: behind goal line or extreme angles
  if (x < 60 || y < 20 || y > 80) {
    return 'low'
  }

  // Medium danger: everything else (faceoff dots, mid-slot)
  return 'medium'
}
```

### Example 3: Integration Test - Game Event CRUD with RLS

**Test First** (`tests/integration/game-events.test.ts`):
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Test helpers
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

describe('Game Events - Database Operations', () => {
  let testGameId: string
  let testUserId: string

  beforeEach(async () => {
    // Setup: Create test game and user
    const { data: game } = await supabase.from('games').insert({
      team_id: 'test-team-id',
      opponent_name: 'Test Opponent',
      game_date: new Date().toISOString(),
    }).select().single()

    testGameId = game!.id
  })

  afterEach(async () => {
    // Cleanup
    await supabase.from('games').delete().eq('id', testGameId)
  })

  it('should create a shot event', async () => {
    const { data, error } = await supabase
      .from('game_events')
      .insert({
        game_id: testGameId,
        event_type: 'shot',
        x_coord: 95,
        y_coord: 50,
        period: 1,
        situation: 'even_strength',
        details: {
          shot_type: 'wrist',
          result: 'save',
          shot_quality: 'high',
        },
      })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data.event_type).toBe('shot')
    expect(data.details.shot_type).toBe('wrist')
  })

  it('should calculate shot quality on insert (via trigger)', async () => {
    const { data } = await supabase
      .from('game_events')
      .insert({
        game_id: testGameId,
        event_type: 'shot',
        x_coord: 95,  // Slot
        y_coord: 50,
        period: 1,
        details: {},
      })
      .select()
      .single()

    expect(data.details.shot_quality).toBe('high')
  })

  it('should enforce RLS - users can only see their team events', async () => {
    // TODO: Test RLS policies
  })

  it('should track edit history when event is updated', async () => {
    const { data: event } = await supabase
      .from('game_events')
      .insert({
        game_id: testGameId,
        event_type: 'shot',
        x_coord: 95,
        y_coord: 50,
        period: 1,
        details: { shot_type: 'wrist' },
      })
      .select()
      .single()

    // Update the event
    await supabase
      .from('game_events')
      .update({ details: { shot_type: 'slap' } })
      .eq('id', event!.id)

    // Check edit history
    const { data: history } = await supabase
      .from('event_edit_history')
      .select()
      .eq('event_id', event!.id)

    expect(history).toHaveLength(1)
    expect(history![0].action).toBe('update')
    expect(history![0].previous_data.details.shot_type).toBe('wrist')
  })
})
```

### Example 4: E2E Test - Live Game Tracking Flow

**Test First** (`tests/e2e/game-tracking.spec.ts`):
```typescript
import { test, expect } from '@playwright/test'

test.describe('Live Game Tracking', () => {
  test('should log a shot event during a game', async ({ page }) => {
    // Setup: Login and navigate to tracking page
    await page.goto('/login')
    await page.fill('[name="email"]', 'coach@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')

    // Navigate to game tracking
    await page.goto('/games/test-game-id/track')

    // Wait for ice surface to load
    await expect(page.locator('svg.ice-surface')).toBeVisible()

    // Click "Shot" quick action
    await page.click('button:has-text("Shot")')

    // Tap location on ice surface (center slot)
    await page.locator('svg.ice-surface').click({ position: { x: 190, y: 100 } })

    // Select player (jersey #12)
    await page.click('button:has-text("12")')

    // Select result (Save)
    await page.click('button:has-text("Save")')

    // Verify event logged
    await expect(page.locator('text=Recent: Shot - #12 - Save')).toBeVisible()

    // Verify live stats updated
    await expect(page.locator('text=Shots: 1')).toBeVisible()
  })

  test('should edit a logged event post-game', async ({ page }) => {
    // Navigate to completed game
    await page.goto('/games/test-game-id/edit')

    // Find event in list
    await page.click('text=Shot - #12 - Save')

    // Edit player number
    await page.click('button:has-text("Edit")')
    await page.click('button:has-text("Change Player")')
    await page.click('button:has-text("14")')
    await page.click('button:has-text("Save Changes")')

    // Verify update
    await expect(page.locator('text=Shot - #14 - Save')).toBeVisible()
  })

  test('should work offline', async ({ page, context }) => {
    // Go offline
    await context.setOffline(true)

    await page.goto('/games/test-game-id/track')

    // Log a shot (should work offline)
    await page.click('button:has-text("Shot")')
    await page.locator('svg.ice-surface').click({ position: { x: 190, y: 100 } })
    await page.click('button:has-text("12")')
    await page.click('button:has-text("Save")')

    // Verify offline indicator
    await expect(page.locator('text=Offline - will sync when connected')).toBeVisible()

    // Go back online
    await context.setOffline(false)

    // Verify sync
    await expect(page.locator('text=Synced')).toBeVisible({ timeout: 5000 })
  })
})
```

---

## Next Steps

1. **Initialize project** with setup above
2. **Create database migrations** (start with organizations, teams, players)
3. **Write first tests** (user auth, team CRUD)
4. **Implement features** to pass tests
5. **Iterate**: Red → Green → Refactor

Ready to start building? Which part should we tackle first?
- [ ] Project initialization & setup
- [ ] Database migrations for core entities
- [ ] First feature with TDD (e.g., team management)
- [ ] Ice surface component prototype
