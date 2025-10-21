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
| `README.md` | GitHub repository overview, project status, quick start | 2024-01-XX |
| `CLAUDE.md` | This file - central documentation hub for AI context | 2024-01-XX |
| `docs/HOCKEY_PRACTICE_APP_PLAN.md` | Complete product plan, features, user flows, monetization | 2024-01-XX |
| `docs/DEV_SETUP_AND_DATA_MODELS.md` | Dev environment setup, database schema, TDD approach | 2024-01-XX |

### Database & Architecture
| File | Purpose | Status |
|------|---------|--------|
| `supabase/migrations/001_initial_schema.sql` | Core database schema | TODO |
| `lib/types/database.ts` | Auto-generated TypeScript types from Supabase | TODO |
| Architecture diagram | System architecture overview | TODO |

### Testing
| File | Purpose | Status |
|------|---------|--------|
| `vitest.config.ts` | Vitest test configuration | TODO |
| `playwright.config.ts` | E2E test configuration | TODO |
| `tests/unit/age-groups.test.ts` | Age group utilities tests | TODO |
| `tests/integration/game-events.test.ts` | Game event CRUD tests | TODO |
| `tests/e2e/game-tracking.spec.ts` | Live tracking E2E tests | TODO |

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

### Current Phase: **Phase 0 - Planning** ✅
- [x] Product planning document
- [x] Data model design
- [x] TDD approach defined
- [x] Tech stack decisions
- [ ] Project initialization

### Phase 1: Foundation (Weeks 1-2)
- [ ] Initialize Next.js project
- [ ] Setup Supabase local dev
- [ ] Configure Vitest + Playwright
- [ ] First migration: organizations, teams, players
- [ ] Setup RLS policies
- [ ] Auth setup

### Phase 2: Ice Surface & Game Tracking (Weeks 3-4)
**THE DIFFERENTIATOR FEATURE**
- [ ] Interactive SVG ice surface component
- [ ] Shot tracking interface (tap-to-log flow)
- [ ] Defensive event tracking UI
- [ ] Live stats display (running totals)
- [ ] Event editing UI (undo + post-game edit)
- [ ] Event list view (chronological, filterable)
- [ ] Offline storage (IndexedDB)
- [ ] Background sync

### Phase 3: Post-Game Analytics (Week 5)
- [ ] Shot chart heat map generation
- [ ] Defensive analytics (breakout success, turnover locations)
- [ ] Analytics dashboard UI
- [ ] Auto-generated insights engine

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

**Current Status**: Planning & Design ✅
**Next Milestone**: Project initialization + first feature (TDD)
**Target MVP Completion**: 6-8 weeks from start
**Target Beta Launch**: 10-12 weeks from start

**Progress Tracker**:
- [x] Product planning (features, user flows, monetization)
- [x] Database schema design
- [x] TDD approach defined
- [x] Tech stack decisions
- [ ] Project initialization (0%)
- [ ] Phase 1: Foundation (0%)
- [ ] Phase 2: Game Tracking (0%)
- [ ] Phase 3: Analytics (0%)
- [ ] Phase 4-6: Practice Planning (0%)

---

**Last Updated**: 2024-01-XX
**Maintained By**: Brock Arnold + Claude
**Project Name**: HP2 (Hockey Practice Planner v2)

---

## 🎯 QUICK START FOR NEW SESSIONS

**Claude, if you're reading this in a new session:**

1. This is a hockey practice planning app with live game tracking
2. We're using TDD (tests first, always!)
3. Key docs: `docs/HOCKEY_PRACTICE_APP_PLAN.md` + `docs/DEV_SETUP_AND_DATA_MODELS.md`
4. Current phase: Project initialization (ready to start coding)
5. Critical decision: Age groups stored as integers, formatted by region
6. MVP scope is locked - see "MVP SCOPE" section above

**Ask the user**: "What would you like to work on today?"
- Project initialization?
- First TDD feature (age group utils)?
- Database migrations?
- Ice surface prototype?
