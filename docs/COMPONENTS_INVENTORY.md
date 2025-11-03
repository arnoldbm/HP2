# Components Inventory

**Last Updated**: 2025-11-03
**Purpose**: Complete inventory of all application components with test coverage and status

---

## Game Tracking Components (Mobile-Optimized 8/10)

| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `components/game-tracking/ice-surface.tsx` | Interactive SVG ice surface with tap-to-log (responsive) | 20 | ✅ DONE + 📱 MOBILE |
| `components/game-tracking/player-selector.tsx` | Quick player selection grid by jersey # (88px touch targets) | 17 | ✅ DONE + 📱 MOBILE |
| `components/game-tracking/quick-event-buttons.tsx` | 6 event type buttons (56px+ touch targets) | 16 | ✅ DONE + 📱 MOBILE |
| `components/game-tracking/event-logger.tsx` | Multi-step event logging orchestrator (bottom sheet) | - | ✅ DONE + 📱 MOBILE |
| `components/game-tracking/live-stats.tsx` | Real-time stats dashboard (collapsible accordion) | - | ✅ DONE + 📱 MOBILE |
| `components/game-tracking/recent-events-list.tsx` | Event list with undo/delete (swipe gestures) | - | ✅ DONE + 📱 MOBILE |
| `components/ui/bottom-sheet.tsx` | Mobile bottom sheet with swipe-down dismiss | - | ✅ DONE |
| `components/ui/swipeable-item.tsx` | Swipe gesture wrapper for mobile actions | - | ✅ DONE |
| `lib/stores/game-tracking-store.ts` | Zustand state management with DB persistence | - | ✅ DONE |
| `lib/db/game-event-persistence.ts` | Save/load events from Supabase with optimistic updates | 11 | ✅ DONE |

---

## Analytics Components

| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `lib/analytics/game-analytics.ts` | Analytics calculation functions (shots, breakouts, periods, player stats) | 21 | ✅ DONE |
| `components/analytics/shot-chart.tsx` | Shot location visualization on ice surface with player names | - | ✅ DONE |
| `components/analytics/shot-quality-chart.tsx` | Shot quality breakdown with bar charts | - | ✅ DONE |
| `components/analytics/breakout-analysis.tsx` | Breakout performance with pie/bar charts | - | ✅ DONE |
| `components/analytics/period-trends.tsx` | Period-by-period trends with line/bar charts | - | ✅ DONE |
| `components/analytics/player-stats-table.tsx` | Sortable player statistics (shots, goals, turnovers, etc.) | - | ✅ DONE + 📱 MOBILE |
| `app/demo/analytics/page.tsx` | Analytics dashboard with filters, game selector, & team switching | - | ✅ DONE |

---

## Practice Planning Components

| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `app/demo/drills/page.tsx` | Drill library with search, filters, and pagination | - | ✅ DONE |
| `components/drills/drill-card.tsx` | Individual drill display card | - | ✅ DONE |
| `app/demo/practice-history/page.tsx` | Practice history with filtering, stats dashboard, and detail modal | 19 | ✅ DONE |
| `app/demo/practice-builder/page.tsx` | Manual practice builder with drag-and-drop drills | - | ✅ DONE |
| `app/api/generate-practice-plan/route.ts` | AI practice plan generation endpoint with GPT-4 integration | - | ✅ DONE |

---

## Authentication Components

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

## Team & Roster Management Components

| Component | Purpose | Tests | Status |
|-----------|---------|-------|--------|
| `lib/utils/organization-setup.ts` | Slug generation utilities for organizations | 17 | ✅ DONE |
| `app/actions/organizations.ts` | Organization setup server action (idempotent) | 7 | ✅ DONE |
| `lib/validation/team-schemas.ts` | Zod schemas for team creation/update with season helpers | - | ✅ DONE |
| `components/teams/team-form.tsx` | Team creation form with React Hook Form + Zod | 20 | ✅ DONE |
| `app/actions/teams.ts` | Team CRUD server actions (create, read, update, delete, getById) | 16 | ✅ DONE |
| `app/demo/teams/page.tsx` | Teams list page with empty state and team cards | - | ✅ DONE |
| `app/demo/teams/new/page.tsx` | Team creation page with org initialization | - | ✅ DONE |
| `app/demo/teams/[teamId]/page.tsx` | Team detail hub with action cards | - | ✅ DONE |
| `lib/validation/player-schemas.ts` | Zod schemas for player creation/update with position enum | - | ✅ DONE |
| `app/actions/players.ts` | Player CRUD server actions with jersey uniqueness validation | 17 | ✅ DONE |
| `components/teams/player-form.tsx` | Player creation/edit form with position button group | 18 | ✅ DONE (4 skipped) |
| `components/teams/roster-list.tsx` | Roster display (mobile cards with swipe-to-delete, desktop table) | - | ✅ DONE |
| `app/demo/teams/[teamId]/roster/page.tsx` | Roster management page with add/edit/delete functionality | - | ✅ DONE |
| `lib/contexts/team-context.tsx` | TeamContext provider with localStorage persistence | 15 | ✅ DONE |
| `components/teams/team-selector.tsx` | TeamSelector dropdown with touch-friendly UI | 17 | ✅ DONE (2 skipped) |
| `app/demo/layout.tsx` | Demo layout with navigation bar and team selector | - | ✅ DONE |

**Team Management Features** (Milestones 1-5 Complete):
- Auto-create organization for new users (slug generation with conflict resolution)
- Team creation form with age group selector (USA vs Canada format switching)
- Skill level selection (House, Travel, A, AA, AAA)
- Season input (auto-populates with current season YYYY-YY format)
- User automatically added as head_coach when creating team
- Teams list page with card layout showing team details
- Team detail hub with action cards for roster, game tracking, analytics, practices
- Empty state with "Create Your First Team" CTA
- **Player roster management**:
  - Add/edit/delete players with jersey number (1-99), name, position, birthdate
  - Position selection (Forward, Defense, Goalie) with button group UI
  - Jersey number uniqueness enforced per team (same number OK on different teams)
  - Mobile-first responsive design (swipeable cards on mobile, table on desktop)
  - Bottom sheet modals for add/edit forms on mobile
  - Empty state with "Add Your First Player" CTA
- **Team selector & context**:
  - Global team state management with React Context
  - localStorage persistence per user (`current_team_{userId}`)
  - Dropdown selector in navigation bar (hidden on teams list/create pages)
  - Touch-friendly UI (56px minimum height)
  - Click-outside-to-close behavior
  - Navigation links: Teams, Track Game, Analytics, Practices
  - Active link highlighting
  - Multi-team support with proper context switching
- **Roster integration** (Milestone 5):
  - Game tracking loads real roster data (not demo players)
  - Empty roster prevention with helpful error messages
  - Player display format standardized to "F. Last (#10)"
  - Player statistics table in analytics dashboard
  - Shot chart shows player names on hover
  - Team switching properly reloads roster and game data
- Mobile-first responsive design throughout
- **129 tests passing (120 passing, 9 skipped)**

---

## Test Coverage Summary

**Current Test Count: 384 tests passing (25 skipped) = 409 total**

### Unit Tests: 285 tests (2 skipped)
- Practice history: 19 tests
- Organization setup: 17 tests
- Team form: 20 tests (4 skipped)
- Player form: 18 tests (4 skipped)
- Team context: 15 tests
- Age groups: 9 tests
- Shot quality: 16 tests
- Ice surface coordinates: 49 tests
- Event validation: 33 tests
- Breakout analytics: 17 tests
- Analytics functions: 21 tests
- Ice surface component: 20 tests
- Player selector: 17 tests
- Quick event buttons: 16 tests

### Component Tests: 17 tests (2 skipped)
- Team selector: 17 tests (2 skipped)

### Integration Tests: 94 tests (5 skipped)
- Game events: 23 tests (2 skipped due to JWT limitation)
- Game event persistence: 11 tests
- Practice planning: 21 tests
- Organization CRUD: 7 tests (3 skipped due to auth user requirement)
- Team CRUD: 16 tests
- Player CRUD: 17 tests
- Roster integration: 13 tests

### E2E Tests: 0 tests
- Game tracking: TODO

---

**See also:**
- `docs/TESTING_GUIDE.md` - Testing philosophy and patterns
- `docs/DATABASE_REFERENCE.md` - Database schema and migrations
