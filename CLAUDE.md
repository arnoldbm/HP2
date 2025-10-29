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
| `README.md` | GitHub repository overview, project status, quick start | 2025-10-27 |
| `CLAUDE.md` | This file - central documentation hub for AI context | 2025-10-27 |
| `docs/HOCKEY_PRACTICE_APP_PLAN.md` | Complete product plan, features, user flows, monetization | 2024-01-XX |
| `docs/DEV_SETUP_AND_DATA_MODELS.md` | Dev environment setup, database schema, TDD approach | 2024-01-XX |
| `docs/CHANGELOG.md` | Complete project changelog with all changes by phase | 2025-10-27 |

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
| `app/demo/analytics/page.tsx` | Analytics dashboard with filters | - | ✅ DONE |

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
✅ Decided in planning:
- [x] User auth (email/password)
- [x] Organization + Team + Player management
- [x] **Live game tracking** (shots + defensive events + special teams)
- [x] **Interactive ice surface** (SVG, tap-to-log)
- [x] **Live stats during game** (running totals, expandable panel)
- [x] **Event editing** (undo during game, full edit post-game)
- [x] **Offline support** (PWA + IndexedDB + background sync)
- [x] **Post-game analytics** (shot charts, heat maps, breakout stats)
- [x] Basic drill library (100+ pre-loaded drills)
- [x] Manual practice plan builder
- [x] AI practice plan generation (integrates tracking data)
- [x] Practice history

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

### Phase 3: Post-Game Analytics ✅ **COMPLETE**
**Data Analysis & Visualization**
- [x] Analytics calculation functions (21 tests)
- [x] Shot chart with location visualization on ice surface
- [x] Shot quality breakdown (high/medium/low danger)
- [x] Breakout analysis (success rates by type)
- [x] Period-by-period trends (shots, goals, turnovers)
- [x] Shooting percentage by situation (ES/PP/PK)
- [x] Analytics dashboard with filters (period, situation)
- [x] Demo page: `/demo/analytics` - Full analytics dashboard
- [x] Auto-generated insights (breakout performance, period analysis)

### Phase 4-6: Practice Planning & AI (Weeks 6-8)
- [ ] Drill library with search
- [ ] Practice plan builder (drag-and-drop)
- [ ] OpenAI integration
- [ ] AI practice plan generation (uses tracking data)

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

### To Decide 🤔
- [ ] Game situation detection (PP/PK): Manual buttons or auto-detect from penalties?
- [ ] Free tier: 3 games or unlimited tracking with limited analytics?
- [ ] Premium pricing: $14.99 or $19.99/month?
- [ ] Should AI explain WHY it chose drills (show tracked data)?
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

## 📝 TODO: HIGH-PRIORITY ITEMS

### Immediate Next Steps
- [ ] Initialize Next.js project with setup from `docs/DEV_SETUP_AND_DATA_MODELS.md`
- [ ] Setup Supabase local dev environment
- [ ] Create first migration (organizations, teams, players)
- [ ] Write + implement age group utilities (TDD practice)
- [ ] Setup testing infrastructure (Vitest + Playwright configs)

### Before Phase 2 (Ice Surface)
- [ ] Prototype ice surface tap interactions (SVG coordinate mapping)
- [ ] Design event logging flow (minimize taps, maximize speed)
- [ ] Test offline sync mechanism (simulate poor WiFi)
- [ ] Create ice surface coordinate system diagram

### Before Launch
- [ ] Seed drill library with 100+ drills
- [ ] Create AI prompt templates for practice plan generation
- [ ] Design onboarding flow for new coaches
- [ ] Beta test with 3-5 real teams (full season)
- [ ] Performance testing (can handle 50+ events per game?)

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

**Current Status**: Phase 3 Complete - Analytics Dashboard Live! 🎉
**Next Milestone**: Practice Planning & AI Integration (Phase 4-6)
**Target MVP Completion**: On track! 50% complete
**Target Beta Launch**: 10-12 weeks from start

**Progress Tracker**:
- [x] Product planning (features, user flows, monetization)
- [x] Database schema design
- [x] TDD approach defined
- [x] Tech stack decisions
- [x] Project initialization (100%)
- [x] Phase 1: Foundation (100%)
- [x] Phase 2: Game Tracking & Event Logger (100%) ✅
  - [x] Database layer with 7 migrations
  - [x] Event logger UI with 6 components
  - [x] Live stats and event list
  - [x] Database persistence with optimistic updates
  - [x] 234 tests passing (2 skipped)
- [x] Phase 3: Post-Game Analytics (100%) ✅
  - [x] Analytics calculation functions
  - [x] 4 visualization components (shot chart, quality, breakouts, trends)
  - [x] Analytics dashboard with filters
  - [x] 21 analytics tests passing
- [ ] Phase 4-6: Practice Planning (0%)

**Demo Pages Available**:
- 🎨 `/demo/ice-surface` - Interactive ice surface visualization
- 🏒 `/demo/game-tracking` - Complete event logger with live stats & database persistence
- 📊 `/demo/analytics` - Post-game analytics dashboard with charts & insights

**Test Coverage**: 234/236 tests passing (99.2% success rate)

---

**Last Updated**: 2025-10-27
**Maintained By**: Brock Arnold + Claude
**Project Name**: HP2 (Hockey Practice Planner v2)

---

## 🎯 QUICK START FOR NEW SESSIONS

**Claude, if you're reading this in a new session:**

1. This is a hockey practice planning app with live game tracking
2. We're using TDD (tests first, always!)
3. Key docs: `docs/HOCKEY_PRACTICE_APP_PLAN.md` + `docs/DEV_SETUP_AND_DATA_MODELS.md`
4. **Current phase: Phase 3 COMPLETE** - Event tracking + Analytics working!
5. **Next up**: Phase 4-6 - Practice Planning & AI Integration
6. Critical decisions:
   - Age groups stored as integers, formatted by region
   - Goal is a shot with result='goal' (not separate event type)
   - Database persistence with optimistic updates
7. MVP scope is locked - see "MVP SCOPE" section above

**What's working now?**
- ✅ Live game tracking with 6 event types
- ✅ Database persistence (save/load from Supabase)
- ✅ Post-game analytics dashboard (shot charts, breakout analysis, trends)
- ✅ 234/236 tests passing
- ✅ 3 demo pages: ice surface, game tracking, analytics

**Try it:**
- `npm run dev` → http://localhost:3000/demo/game-tracking
- Track some events, then view analytics at `/demo/analytics`

**Ask the user**: "What would you like to work on next?"
- Continue to Phase 4 (Practice Planning)?
- Add more analytics features?
- Implement offline support (PWA)?
- Something else?
