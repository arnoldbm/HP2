# 🤖 CLAUDE.md - AI Assistant Context & Documentation Hub

**PURPOSE**: This file helps Claude (and you!) quickly reference critical project documentation, decisions, and architecture. Update this IMMEDIATELY when creating important docs to prevent context loss across sessions.

---

## 📚 CRITICAL DOCUMENTATION PATTERN
**ALWAYS ADD IMPORTANT DOCS HERE!** When you create or discover:
- Architecture diagrams → Add reference path here
- Database schemas → Add reference path here
- Problem solutions → Add reference path here
- Setup guides → Add reference path here

This prevents context loss! Update this file IMMEDIATELY when creating important docs.

---

## 📂 CORE DOCUMENTATION FILES

### Planning & Product Specs
| File | Purpose | Last Updated |
|------|---------|--------------|
| `README.md` | GitHub repository overview, project status, quick start | 2025-10-28 |
| `CLAUDE.md` | This file - central documentation hub for AI context | 2025-10-29 |
| `docs/HOCKEY_PRACTICE_APP_PLAN.md` | Complete product plan, features, user flows, monetization | 2024-01-XX |
| `docs/DEV_SETUP_AND_DATA_MODELS.md` | Dev environment setup, database schema, TDD approach | 2024-01-XX |
| `docs/CHANGELOG.md` | Complete project changelog with all changes by phase | 2025-10-28 |

### Database & Architecture
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
| `lib/types/database.ts` | Auto-generated TypeScript types from Supabase | ✅ DONE |
| Architecture diagram | System architecture overview | TODO |

### Testing
| File | Purpose | Status |
|------|---------|--------|
| `vitest.config.ts` | Vitest test configuration | ✅ DONE |
| `playwright.config.ts` | E2E test configuration | ✅ DONE |
| `tests/unit/setup.test.ts` | Smoke test for Vitest | ✅ DONE (2 tests) |
| `tests/unit/age-groups.test.ts` | Age group utilities tests | ✅ DONE (9 tests) |
| `tests/unit/shot-quality.test.ts` | Shot quality calculator | ✅ DONE (16 tests) |
| `tests/unit/ice-surface-coordinates.test.ts` | Ice coordinate utilities | ✅ DONE (49 tests) |
| `tests/unit/event-validation.test.ts` | Zod event schemas | ✅ DONE (33 tests) |
| `tests/unit/breakout-analytics.test.ts` | Breakout statistics | ✅ DONE (17 tests) |
| `tests/unit/ice-surface.test.tsx` | Ice surface component | ✅ DONE (20 tests) |
| `tests/unit/player-selector.test.tsx` | Player selector component | ✅ DONE (17 tests) |
| `tests/unit/quick-event-buttons.test.tsx` | Quick event buttons | ✅ DONE (16 tests) |
| `tests/unit/analytics.test.ts` | Analytics calculation functions | ✅ DONE (21 tests) |
| `tests/integration/game-events.test.ts` | Game event CRUD with RLS | ✅ DONE (23 tests, 2 skipped) |
| `tests/integration/game-event-persistence.test.ts` | Event save/load with optimistic updates | ✅ DONE (11 tests) |
| `tests/e2e/game-tracking.spec.ts` | Live tracking E2E tests | TODO |

**Current Test Count: 234 tests passing (2 skipped) = 236 total**
- Unit: 200 tests
- Integration: 34 tests (2 skipped due to JWT limitation)

### Game Tracking Components
| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `components/game-tracking/ice-surface.tsx` | Interactive SVG ice surface with tap-to-log | 20 | ✅ DONE |
| `components/game-tracking/player-selector.tsx` | Quick player selection grid by jersey # | 17 | ✅ DONE |
| `components/game-tracking/quick-event-buttons.tsx` | 6 event type buttons (shot, turnover, etc.) | 16 | ✅ DONE |
| `components/game-tracking/event-logger.tsx` | Multi-step event logging orchestrator | - | ✅ DONE |
| `components/game-tracking/live-stats.tsx` | Real-time stats dashboard | - | ✅ DONE |
| `components/game-tracking/recent-events-list.tsx` | Event list with undo/delete | - | ✅ DONE |
| `lib/stores/game-tracking-store.ts` | Zustand state management with DB persistence | - | ✅ DONE |
| `lib/db/game-event-persistence.ts` | Save/load events from Supabase with optimistic updates | 11 | ✅ DONE |

### Analytics Components
| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `lib/analytics/game-analytics.ts` | Analytics calculation functions (shots, breakouts, periods) | 21 | ✅ DONE |
| `components/analytics/shot-chart.tsx` | Shot location visualization on ice surface | - | ✅ DONE |
| `components/analytics/shot-quality-chart.tsx` | Shot quality breakdown with bar charts | - | ✅ DONE |
| `components/analytics/breakout-analysis.tsx` | Breakout performance with pie/bar charts | - | ✅ DONE |
| `components/analytics/period-trends.tsx` | Period-by-period trends with line/bar charts | - | ✅ DONE |
| `app/demo/analytics/page.tsx` | Analytics dashboard with filters & game selector | - | ✅ DONE |

### Practice Planning Components
| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `app/demo/drills/page.tsx` | Drill library with search, filters, and pagination | - | ✅ DONE |
| `components/drills/drill-card.tsx` | Individual drill display card | - | ✅ DONE |
| `app/api/generate-practice-plan/route.ts` | AI practice plan generation API (OpenAI GPT-4o) | - | ✅ DONE |

### Authentication Components
| Component | Purpose | Status |
|-----------|---------|--------|
| `components/auth/auth-form.tsx` | Reusable auth form with sign up/sign in modes | ✅ DONE |
| `components/auth/auth-modal.tsx` | Modal wrapper for auth form with mode toggling | ✅ DONE |
| `app/auth/reset-password/page.tsx` | Password reset page with email verification | ✅ DONE |
| `app/demo/game-tracking/page.tsx` | Demo page with auth gates and session management | ✅ DONE |
| `app/actions/demo-setup.ts` | Server action for creating user-specific demo data | ✅ DONE |

**Authentication Features:**
- Email/password authentication via Supabase Auth
- Email confirmation required before sign-in
- Password reset flow with email verification
- Session management with auto-redirect on 403/RLS errors
- Local email testing via Mailpit (localhost:54324)
- User-specific data isolation via team memberships
- Auto-signout on RLS policy violations

---

## 🎯 PROJECT OVERVIEW

**What are we building?**
A hockey practice planning app with live game tracking that generates AI-powered, data-driven practice plans for youth hockey coaches.

**Key Differentiator**: Real-time game event tracking (shots, breakouts, turnovers) → Objective analytics → AI-generated practice plans targeting specific weaknesses.

**Target Market**: North American youth hockey (ages 8-18, USA & Canada)

**Business Model**: Freemium SaaS
- Free: 3 tracked games/season
- Premium: $14.99/mo (unlimited tracking + analytics)
- Pro: $29.99/mo (season trends + comparative analytics)

---

## 🏗️ ARCHITECTURE DECISIONS

### Tech Stack
```
Frontend:  Next.js 14+ (App Router, TypeScript strict)
Backend:   Supabase (PostgreSQL + Auth + RLS + Edge Functions)
Testing:   Vitest (unit/integration) + Playwright (E2E)
State:     Zustand
Forms:     React Hook Form + Zod
UI:        TailwindCSS + shadcn/ui
Offline:   IndexedDB (Dexie.js) + Service Workers (PWA)
Canvas:    Konva.js (interactive ice surface)
Charts:    Recharts (heat maps, analytics)
AI:        OpenAI GPT-4 (practice plan generation)
Payments:  Stripe (Checkout + Customer Portal)
```

### Database Design Philosophy
- **Polymorphic events table**: Single `game_events` table with JSONB `details` column (easier queries, simpler to extend)
- **Spatial data**: Ice coordinates (x: 0-200, y: 0-100) for heat maps
- **Audit trail**: `event_edit_history` table for all event edits
- **Pre-computed analytics**: `game_analytics` table (avoid expensive real-time calculations)
- **RLS everywhere**: Row-level security for multi-tenant data isolation

### Age Group Handling (USA vs Canada)
**Critical decision**: Store age as INTEGER, format on display

| USA | Canada | Stored Value |
|-----|--------|--------------|
| 8U  | U9     | 9            |
| 10U | U11    | 11           |
| 12U | U13    | 13           |

- Teams have `region` field ('usa' or 'canada')
- TypeScript utilities: `formatAgeGroup()`, `parseAgeGroup()`
- Database function: `format_age_group(age_years, region)`

**Why integers?** Single source of truth, easy comparisons, regional formatting at display layer.

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 241-300, 708-790)

---

## 🧪 TEST-DRIVEN DEVELOPMENT APPROACH

### TDD Philosophy
**Write tests FIRST, then implement features**

1. Write failing test
2. Implement minimal code to pass test
3. Refactor for quality
4. Repeat

### Test Coverage Goals
- Core business logic: **100%**
- Database operations: **100%**
- API routes: **95%+**
- UI components: **80%+**
- E2E critical paths: **100%**

### Example TDD Files (templates ready)
- `tests/unit/age-groups.test.ts` - Age group formatting/parsing
- `tests/unit/shot-quality.test.ts` - Shot quality calculator (high/medium/low danger)
- `tests/integration/game-events.test.ts` - Event CRUD with RLS
- `tests/e2e/game-tracking.spec.ts` - Live tracking flow

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 843-1170)

---

## 📊 DATABASE SCHEMA QUICK REFERENCE

### Core Entities Hierarchy
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

### Key Tables

**game_events** (polymorphic design):
```sql
- event_type: 'shot' | 'breakout' | 'turnover' | 'zone_entry' | ...
- x_coord, y_coord (0-200, 0-100)
- period, game_time_seconds
- player_id
- situation: 'even_strength' | 'power_play' | 'penalty_kill'
- details: JSONB (event-specific data)
```

**Shot event details**:
```json
{
  "shot_type": "wrist",
  "result": "save",
  "shot_quality": "high"
}
```

**Breakout event details**:
```json
{
  "success": true,
  "type": "up_boards",
  "exit_zone": "left"
}
```

### Ice Surface Coordinates
```
Defensive Zone ← → Offensive Zone
(0,0)           (100,100)         (200,100)
Left corner     Center ice        Right corner

High-danger zone (slot): x: 80-110, y: 35-65
```

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 206-702)

---

## 🎨 MVP SCOPE (Phase 1 - 6-8 weeks)

### Must-Have Features
✅ Completed:
- [x] **User auth (email/password)** - Full authentication system with email confirmation and password reset
- [x] **Organization + Team + Player management** - Database schema with RLS policies
- [x] **Live game tracking** - Shots + defensive events (breakouts, turnovers, zone entries, faceoffs)
- [x] **Interactive ice surface** - SVG with tap-to-log coordinates (0-200 x 0-100)
- [x] **Live stats during game** - Running totals, success rates, expandable panel
- [x] **Event editing** - Undo last event, delete specific events during/after games
- [x] **Post-game analytics** - Shot charts, heat maps, breakout stats, period trends
- [x] **Game management** - Create games with opponent/location, switch between games in analytics
- [x] **Drill library** - 255 pre-loaded drills with search, filters, and categorization
- [x] **AI practice plan generation** - OpenAI GPT-4o integration analyzing game data to recommend drills

🚧 In Progress / Deferred:
- [ ] **Offline support** (PWA + IndexedDB + background sync) - Deferred to post-MVP
- [ ] **Practice plan saving** - Save AI-generated plans to database (practices, practice_drills tables)
- [ ] **Manual practice plan builder** - Drag-and-drop drill selection interface
- [ ] **Practice history** - View past practices with drill details

### Post-MVP (Deferred)
- [ ] Stripe integration (launch free tier only)
- [ ] Multi-tracker collaboration (merging data from multiple stat trackers)
- [ ] Season-long analytics trends
- [ ] Comparative analytics (vs league benchmarks)
- [ ] Video drill library
- [ ] Native mobile apps (PWA sufficient for MVP)

See: `docs/HOCKEY_PRACTICE_APP_PLAN.md` (lines 501-528)

---

## 🚀 IMPLEMENTATION PHASES

### Phase 0: Planning ✅ **COMPLETE**
- [x] Product planning document
- [x] Data model design
- [x] TDD approach defined
- [x] Tech stack decisions
- [x] Project initialization

### Phase 1: Foundation ✅ **COMPLETE**
- [x] Initialize Next.js project
- [x] Setup Supabase local dev
- [x] Configure Vitest + Playwright
- [x] First migration: organizations, teams, players
- [x] Setup RLS policies
- [x] Built core utilities (age groups, shot quality, coordinates, breakout analytics)
- [x] 114 unit tests passing (100% coverage on utilities)
- [ ] Auth UI setup (deferred to when needed)

### Phase 2: Game Tracking & Event Logger ✅ **COMPLETE**
**THE DIFFERENTIATOR FEATURE**

**Database Layer:**
- [x] Game tracking migration (games, events, analytics, audit log)
- [x] Polymorphic events table with JSONB details
- [x] Shot quality auto-calculation trigger
- [x] Audit logging trigger
- [x] RLS policies with service role bypass
- [x] Event validation schemas (Zod)
- [x] Integration tests (34 passing, 2 skipped)
- [x] Removed 'goal' event type (now shot with result='goal')

**UI Components & Event Logger:**
- [x] Interactive SVG ice surface component (20 tests)
- [x] Screen-to-ice coordinate conversion
- [x] Event logging state management (Zustand store)
- [x] Player selector component (17 tests)
- [x] Quick event buttons (16 tests)
- [x] Multi-step event logging flow orchestrator
- [x] Shot tracking interface (tap-to-log flow)
- [x] Defensive event tracking UI (turnover, breakout, zone entry, faceoff)
- [x] Live stats display (running totals, success rates)
- [x] Event editing UI (undo last, delete specific events)
- [x] Event list view (chronological, recent 10)
- [x] Demo page: `/demo/game-tracking` - Full working event logger
- [x] Database persistence (save to Supabase with optimistic updates)

**Deferred to Post-MVP:**
- [ ] Offline storage (IndexedDB)
- [ ] Background sync (PWA)

### Phase 3: Post-Game Analytics + Authentication ✅ **COMPLETE**

**Data Analysis & Visualization:**
- [x] Analytics calculation functions (21 tests)
- [x] Shot chart with location visualization on ice surface
- [x] Shot quality breakdown (high/medium/low danger)
- [x] Breakout analysis (success rates by type)
- [x] Period-by-period trends (shots, goals, turnovers)
- [x] Shooting percentage by situation (ES/PP/PK)
- [x] Analytics dashboard with filters (period, situation)
- [x] Demo page: `/demo/analytics` - Full analytics dashboard
- [x] Auto-generated insights (breakout performance, period analysis)

**Authentication System:**
- [x] Email/password authentication via Supabase Auth
- [x] User registration with full name field
- [x] Email confirmation required before sign-in
- [x] Password reset flow with email verification
- [x] Password reset page: `/auth/reset-password`
- [x] Session management with `onAuthStateChange` listeners
- [x] Auto-redirect on 403/RLS policy violations
- [x] Auth components: `AuthForm`, `AuthModal`
- [x] User-specific demo data (each user gets own org/team/game)
- [x] Fixed RLS policies on `team_members` table (added SELECT policies)
- [x] Local email testing via Mailpit (localhost:54324)
- [x] Updated Supabase config for password reset redirects

### Phase 4-6: Practice Planning & AI 🚧 **IN PROGRESS** (~70% COMPLETE)

**Database Foundation:** ✅ **COMPLETE**
- [x] Database schema (drills, practices, practice_drills tables)
- [x] Full RLS policies for multi-tenant practice planning
- [x] Helper functions (calculate_practice_duration, get_practice_drill_counts)
- [x] 255-drill library with AI integration metadata
  - 16 categories (shooting, passing, skating, breakouts, forechecking, backchecking, defensive_zone, power_play, penalty_kill, transition, faceoffs, warm_up, cool_down, conditioning, small_area_games, scrimmage)
  - Each drill includes: title, description, duration, age range, skill level
  - AI metadata: `addresses_situations` JSONB field mapping drills to game analytics issues
  - Searchable tags array for filtering
- [x] Seed data loaded into database (255 drills)

**UI & Features:** ✅ **MAJOR PROGRESS**
- [x] **Drill library UI** with search and filters (`/demo/drills`)
  - Search by title, description, tags
  - Filter by category, skill level, age range, duration
  - 10 drills per page with pagination
  - Expandable drill details view
  - RLS-tested with user authentication
- [x] **OpenAI integration** with GPT-4o model
  - API route: `/api/generate-practice-plan`
  - Analyzes game performance data (shots, breakouts, turnovers)
  - Fetches age-appropriate drills from database
  - Returns structured practice plans with reasoning
- [x] **AI practice plan generation** integrated into analytics
  - "Generate AI Practice Plan" button on analytics page
  - Displays AI reasoning (top 3 focus areas, goals)
  - Shows drill recommendations by section (warm-up, skills, scrimmage, cool-down)
  - Links recommendations to specific game stats
- [ ] **Practice plan saving** to database (practices, practice_drills tables)
- [ ] **Manual practice plan builder** (drag-and-drop drill selection)
- [ ] **Practice history view** (view past practices)
- [ ] **Mobile-friendly practice plan display**

See: `docs/HOCKEY_PRACTICE_APP_PLAN.md` (lines 509-574)

---

## 🔑 CRITICAL DECISIONS LOG

### Decided ✅
| Decision | Rationale | Impact |
|----------|-----------|--------|
| Polymorphic events table | Simpler queries, easier to extend event types | All events in one table with JSONB details |
| Age stored as integer | Single source of truth, regional formatting at display layer | USA/Canada both supported seamlessly |
| MVP includes BOTH shots + defense tracking | Real coach feedback - defensive tracking is crucial | Larger Phase 2, but complete feature |
| Event editing in MVP | Stat trackers make mistakes during fast-paced games | Edit UI + audit log in MVP |
| Live stats during game | Coaches want to see progress in real-time | Expandable stats panel |
| SVG over Canvas for ice surface | Easier tap interactions, accessibility | Use Konva.js or plain SVG |
| Offline-first with PWA | Rinks often have poor WiFi | IndexedDB + service workers required |
| Single tracker in MVP | Multi-tracker collaboration is complex | Defer merging to post-MVP |
| Goal is a shot with result='goal' | Eliminates redundancy, simplifies queries, cleaner data model | Removed 'goal' event type, pre-fill result in UI |
| Database persistence with optimistic updates | Instant UI feedback, background sync to Supabase | Better UX, handles slow connections |
| Recharts for analytics | Pre-installed, good docs, sufficient for MVP needs | Bar/line/pie charts for all analytics |
| AI explains drill choices | Coaches need to trust AI recommendations | Shows focus areas, links drills to specific game stats |
| Explicit game creation with metadata | Better organization, clearer game history | Create game with opponent name & location before tracking |
| Game selector in analytics | Support multiple games per team | Dropdown to switch between games, auto-loads most recent |
| Replace browser dialogs with inline forms | Better UX, editable inputs, mobile-friendly | React forms instead of prompt()/alert() |
| OpenAI GPT-4o for practice plans | Latest model, best at structured output | JSON mode for reliable parsing |

### To Decide 🤔
- [ ] Game situation detection (PP/PK): Manual buttons or auto-detect from penalties?
- [ ] Free tier: 3 games or unlimited tracking with limited analytics?
- [ ] Premium pricing: $14.99 or $19.99/month?
- [x] ~~Should AI explain WHY it chose drills (show tracked data)?~~ ✅ YES - implemented with reasoning display
- [ ] Ice surface: Konva.js or plain SVG + React?
- [ ] Video hosting: YouTube embeds or self-hosted?

---

## 🐛 COMMON PROBLEMS & SOLUTIONS

### Problem: Age group confusion between USA and Canada
**Solution**: Store as integer (9), format on display based on team's `region` field.
- USA: `formatAgeGroup(9, 'usa')` → "8U"
- Canada: `formatAgeGroup(9, 'canada')` → "U9"

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 708-790)

---

### Problem: Game events are diverse (shots, turnovers, breakouts, etc.)
**Solution**: Polymorphic table with JSONB `details` column instead of separate tables.
- Easier queries: `SELECT * FROM game_events WHERE game_id = ?`
- Type-safe with Zod schemas for each event type
- Easy to add new event types without migrations

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 362-449)

---

### Problem: Should 'Goal' be a separate event type or a shot with result='goal'?
**Solution**: Treat goal as a shot with result='goal', not a separate event type.
- Eliminates redundancy in data model
- Simplifies queries: `WHERE event_type = 'shot' AND details->>'result' = 'goal'`
- UI preserves UX: Goal button pre-fills result field
- Migration: Converted existing 'goal' events to 'shot' with result='goal'

See: `supabase/migrations/20251027235333_remove_goal_event_type.sql`

---

### Problem: Real-time analytics are expensive to compute
**Solution**: Pre-compute analytics after game completion, store in `game_analytics` table.
- Triggered by game status change to 'completed'
- Includes: shot charts, breakout success rates, AI insights
- Serve from cache for instant loading

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 634-675)

---

### Problem: Rinks have poor WiFi, need offline tracking
**Solution**: PWA with IndexedDB + background sync
- All events stored locally first (IndexedDB via Dexie.js)
- `sync_queue` table tracks pending changes
- Background Sync API syncs when online
- Visual indicator: "Offline - will sync when connected"

See: `docs/DEV_SETUP_AND_DATA_MODELS.md` (lines 677-702)

---

### Problem: Analytics page showing 0 events, how does it know which game?
**Solution**: Auto-load most recent game and provide game selector dropdown.
- Analytics page fetches all games for user's team on mount
- Auto-selects most recent game by game_date
- Loads events from database for selected game
- Dropdown allows switching between games
- Game display format: "vs {opponent_name} - {date} @ {location}"
- Resolves issue where analytics relied only on Zustand store

See: `app/demo/analytics/page.tsx` (lines 30-80)

---

### Problem: Browser dialogs (prompt/alert) are poor UX for game creation
**Solution**: Replace with inline React forms.
- Show/hide form with useState toggle
- Controlled inputs for opponent name (required) and location (optional)
- Submit button with loading state
- Cancel button to dismiss form
- Auto-focus first input for keyboard accessibility
- Form validation before submission
- Better mobile experience

See: `components/game-tracking/live-stats.tsx` (lines 36-119, 216-274)

---

## 📝 TODO: HIGH-PRIORITY ITEMS

### Phase 4-6 Next Steps (Practice Planning)
- [ ] **Implement practice plan saving** - Save AI-generated plans to database (practices, practice_drills tables)
- [ ] **Build manual practice plan builder** - Drag-and-drop drill selection interface
- [ ] **Create practice history view** - List all past practices with drill details
- [ ] **Mobile-friendly practice display** - Responsive practice plan view for mobile devices
- [ ] **Write tests for practice planning** - Unit tests for AI integration, practice CRUD operations

### Before Launch
- [x] **Seed drill library with 255 drills** ✅ (exceeded goal!)
- [x] **Create AI prompt templates for practice plan generation** ✅
- [x] **Implement AI practice plan generation** ✅
- [ ] **Design onboarding flow for new coaches**
- [ ] **Beta test with 3-5 real teams** (full season)
- [ ] **Performance testing** (can handle 50+ events per game?)
- [ ] **E2E tests** for critical paths (game tracking, analytics, practice planning)

---

## 🔗 EXTERNAL RESOURCES

### Supabase
- [Local Development Docs](https://supabase.com/docs/guides/cli/local-development)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Type Generation](https://supabase.com/docs/guides/api/generating-types)

### Testing
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/)

### Hockey Analytics References
- Shot quality models (xG - expected goals)
- Standard ice rink dimensions (200ft x 85ft)
- Hockey analytics blogs for drill inspiration

---

## 💡 TIPS FOR CLAUDE (AI Assistant)

### When starting a new session:
1. **Always read this file first** to understand project context
2. Check `docs/HOCKEY_PRACTICE_APP_PLAN.md` for product decisions
3. Check `docs/DEV_SETUP_AND_DATA_MODELS.md` for technical details
4. Review "Critical Decisions Log" to avoid re-litigating choices

### When creating new documentation:
1. **Update this file IMMEDIATELY** with the new doc path
2. Add to appropriate section (Database, Testing, etc.)
3. Update "Last Updated" dates
4. If solving a problem, add to "Common Problems & Solutions"

### When making important decisions:
1. **Add to "Critical Decisions Log"** with rationale
2. Update relevant planning docs
3. Consider impact on testing strategy
4. Document any tradeoffs made

### TDD Workflow:
1. Write test first (red)
2. Implement minimal code (green)
3. Refactor (clean)
4. Update docs if needed
5. Commit with descriptive message

---

## 📊 PROJECT STATUS

**Current Status**: Phase 4-6 In Progress - AI Practice Plan Generation Live! 🤖✨
**Next Milestone**: Practice Plan Saving & History Views
**Target MVP Completion**: On track! ~80% complete 🎉
**Target Beta Launch**: 10-12 weeks from start

**Progress Tracker**:
- [x] Product planning (features, user flows, monetization)
- [x] Database schema design
- [x] TDD approach defined
- [x] Tech stack decisions
- [x] Project initialization (100%)
- [x] **Phase 1: Foundation (100%)** ✅
  - [x] Next.js + Supabase + Vitest + Playwright
  - [x] 114 unit tests for core utilities
- [x] **Phase 2: Game Tracking & Event Logger (100%)** ✅
  - [x] Database layer with 9 migrations
  - [x] Event logger UI with 6 components
  - [x] Live stats and event list
  - [x] Database persistence with optimistic updates
  - [x] 234 tests passing (2 skipped)
- [x] **Phase 3: Post-Game Analytics + Authentication (100%)** ✅
  - [x] Analytics dashboard with 4 visualization components
  - [x] Shot charts, breakout analysis, period trends
  - [x] Full authentication system (email/password, reset flow)
  - [x] Session management and RLS security
  - [x] Game management (create games, switch between games)
  - [x] 21 analytics tests
- [ ] **Phase 4-6: Practice Planning & AI (70%)** 🚧
  - [x] Database schema (drills, practices, practice_drills)
  - [x] 255-drill library with AI metadata loaded
  - [x] RLS policies for multi-tenant practice planning
  - [x] **Drill library UI** with search, filters, pagination
  - [x] **OpenAI GPT-4o integration** for AI-generated plans
  - [x] **AI practice plan generation** button in analytics
  - [x] **Practice plan display** with AI reasoning & drill recommendations
  - [ ] Practice plan saving to database
  - [ ] Manual practice plan builder
  - [ ] Practice history views

**Demo Pages Available**:
- 🎨 `/demo/ice-surface` - Interactive ice surface visualization
- 🏒 `/demo/game-tracking` - Complete event logger with live stats & database persistence (requires auth)
- 📊 `/demo/analytics` - Post-game analytics dashboard with charts, insights, & AI practice plans
- 📚 `/demo/drills` - Drill library with 255 drills, search, and filters

**Local Development Tools**:
- 🗄️ http://localhost:54323 - Supabase Studio (database GUI)
- 📧 http://localhost:54324 - Mailpit (email inbox for testing auth flows)

**Test Coverage**: 234/236 tests passing (99.2% success rate)

---

**Last Updated**: 2025-10-29
**Maintained By**: Brock Arnold + Claude
**Project Name**: HP2 (Hockey Practice Planner v2)

---

## 🎯 QUICK START FOR NEW SESSIONS

**Claude, if you're reading this in a new session:**

1. This is a hockey practice planning app with live game tracking
2. We're using TDD (tests first, always!)
3. Key docs: `docs/HOCKEY_PRACTICE_APP_PLAN.md` + `docs/DEV_SETUP_AND_DATA_MODELS.md`
4. **Current phase: Phase 4-6 (70% complete)** 🚧 - AI Practice Plan Generation LIVE!
5. Critical decisions:
   - Age groups stored as integers, formatted by region
   - Goal is a shot with result='goal' (not separate event type)
   - Database persistence with optimistic updates
   - AI explains WHY it chose drills (focus areas + game stats)
   - Explicit game creation with metadata (opponent, location)
   - Game selector in analytics for multi-game support
6. MVP scope is locked - see "MVP SCOPE" section above

**What's working now?**
- ✅ Live game tracking with 6 event types
- ✅ Database persistence (save/load from Supabase)
- ✅ Post-game analytics dashboard (shot charts, breakout analysis, trends)
- ✅ Game management (create games, switch between games)
- ✅ Drill library with 255 drills (search, filters, pagination)
- ✅ **AI practice plan generation** (OpenAI GPT-4o)
  - Analyzes game data (shots, breakouts, turnovers)
  - Recommends drills by section (warm-up, skills, scrimmage, cool-down)
  - Explains reasoning (focus areas, expected improvements)
- ✅ 234/236 tests passing
- ✅ 4 demo pages: ice surface, game tracking, analytics, drills

**Try it:**
- `npm run dev` → http://localhost:3000/demo/game-tracking
- Create a new game, track some events
- View analytics at `/demo/analytics`
- Click "Generate AI Practice Plan" to see AI recommendations
- Browse drills at `/demo/drills`

**Next steps:**
- Practice plan saving (persist AI plans to database)
- Manual practice plan builder (drag-and-drop)
- Practice history view
- Mobile-friendly practice display

**Ask the user**: "What would you like to work on next?"
