# HP2 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Phase 7 Milestone 5: Roster Integration] - 2025-11-03

### 🎉 Major Milestone: Roster Integration with Game Tracking & Analytics Complete!

This release completes Milestone 5 of Phase 7, connecting the roster management system to game tracking and analytics. The app now uses real player data from team rosters instead of hardcoded demo players.

### Added

#### Player Statistics Component
- **PlayerStatsTable** (`components/analytics/player-stats-table.tsx`)
  - Sortable table showing per-player performance stats
  - Mobile: Card layout with touch-friendly design
  - Desktop: Full table with sortable columns
  - Stats tracked: shots, goals, shooting %, turnovers, breakouts, zone entries, faceoffs
  - Position badges with color coding (F=blue, D=green, G=purple)
  - Only shows players with recorded events
  - Auto-sorts by total events (most active players first)
  - 0 tests (UI component, no dedicated tests yet)

#### Analytics Enhancements
- **Player Stats Calculation** (`lib/analytics/game-analytics.ts`)
  - `calculatePlayerStats()` function to aggregate per-player metrics
  - `PlayerStats` interface with comprehensive stat tracking
  - Added `playerId` to `ShotData` interface for player attribution
  - Calculates shooting %, breakout success %, faceoff win %
  - Filters to only show players with events

- **Shot Chart Player Names** (`components/analytics/shot-chart.tsx`)
  - Added player names to shot tooltips
  - Shows "F. Last - result - Period X" format
  - Helps identify which players took which shots

#### Empty Roster Handling
- **Prevention & User Guidance** (`app/demo/game-tracking/page.tsx`)
  - Detects empty roster before game creation
  - Custom error UI with helpful messaging: "⚠️ No Players in Roster"
  - Prevents game tracking without players (events need player assignment)
  - Direct link to add players to roster
  - Graceful error handling with user-friendly CTAs

### Changed

#### Game Tracking
- **Real Roster Loading** (`app/demo/game-tracking/page.tsx`)
  - Removed `setupDemoGameData()` - no more hardcoded demo players
  - Added direct roster queries from `players` table using `selectedTeamId`
  - Players filtered by currently selected team
  - Error handling for roster loading failures
  - Game creation now uses team context (`selectedTeamId`) instead of querying team_members

- **Multi-Team Support Fixes**
  - Changed new game creation to use `selectedTeamId` from context
  - Fixed `.single()` query that failed with multiple teams (changed to `.limit(1)`)
  - Changed localStorage key from `current_game_${userId}` to `current_game_${teamId}`
  - Ensures each team has independent game tracking state

#### Player Display Format
- **Standardized Naming Convention** - "F. Last (#10)" format across app
  - **PlayerSelector** (`components/game-tracking/player-selector.tsx`)
    - Changed from `{player.lastName}` to `{player.firstName[0]}. {player.lastName}`
  - **RecentEventsList** (`components/game-tracking/recent-events-list.tsx`)
    - Changed from `#{jerseyNumber} {lastName}` to `{firstName[0]}. {lastName} (#{jerseyNumber})`
  - **Analytics** - All player stats show "F. Last" format

#### Analytics Page
- **Team Switching Fixes** (`app/demo/analytics/page.tsx`)
  - Fixed bug where switching teams showed old game data from previous team
  - Now always loads most recent game for newly selected team (not old `gameState.gameId`)
  - Added player loading on team change using `selectedTeamId`
  - Clears players array if team has no roster
  - Resets loading state when team changes
  - Better console logging for debugging multi-team scenarios
  - Integrated PlayerStatsTable component below period trends

### Fixed

#### Multi-Team Bugs
- **"No team found for user" Error** (`app/demo/game-tracking/page.tsx`)
  - **Problem**: New game creation used `.single()` query which failed when user had multiple teams
  - **Fix**: Use `selectedTeamId` from TeamContext instead of querying team_members
  - **Fallback**: If no team selected, query with `.limit(1)` instead of `.single()`

- **Team Switching in Analytics**
  - **Problem**: When switching teams, analytics showed old game from previous team
  - **Root Cause**: Code tried to reuse `gameState.gameId` which belonged to Team A when viewing Team B
  - **Fix**: Always load first game of newly selected team, ignore old gameId
  - **Effect**: Player stats now correctly match the displayed game

### Test Coverage
- **New Tests**: 13 integration tests in `tests/integration/roster-game-tracking.test.ts`
  - Roster loading from database (not demo players)
  - Empty roster prevention
  - Player name format validation
  - Multi-team data isolation
  - Team switching behavior
- **Total Tests**: 384 passing, 25 skipped (409 total)
- **Success Rate**: 93.9%
- **New Test File**: `tests/integration/roster-game-tracking.test.ts` (13 tests)

### Files Added
- `components/analytics/player-stats-table.tsx` - Sortable player statistics table
- `tests/integration/roster-game-tracking.test.ts` - Roster integration tests (13 tests)

### Files Modified
- `app/demo/game-tracking/page.tsx` - Roster loading, empty roster handling, multi-team fixes
- `app/demo/analytics/page.tsx` - Player loading, team switching fixes, PlayerStatsTable integration
- `components/game-tracking/player-selector.tsx` - Player name format update
- `components/game-tracking/recent-events-list.tsx` - Player name format update
- `components/analytics/shot-chart.tsx` - Player names in tooltips
- `lib/analytics/game-analytics.ts` - Player stats calculation function
- `docs/PHASE_7_PROGRESS.md` - Updated with Milestone 5 completion
- `docs/CLAUDE.md` - Updated project status and features
- `docs/CHANGELOG.md` - This file
- `docs/COMPONENTS_INVENTORY.md` - Added PlayerStatsTable component

### Technical Decisions
1. **Empty Roster Prevention**: Prevent game creation rather than allowing empty games (events need player assignment)
2. **Player Display Format**: Standardized "F. Last (#10)" format for consistency across all components
3. **No Position Filtering**: Show all players in selector (coaches decide who plays what position)
4. **Team Context for Games**: Use `selectedTeamId` from context instead of querying team_members
5. **localStorage per Team**: Changed from per-user to per-team for multi-team support (`current_game_${teamId}`)
6. **Always Load Fresh Game**: When switching teams, load most recent game for that team (don't reuse old gameId)

### Documentation Updates
- Updated `docs/CLAUDE.md`:
  - Updated MVP completion to ~95%
  - Updated test coverage to 384/409 tests (93.9%)
  - Updated current phase to "Milestones 1-5 Complete"
  - Added Milestone 5 to recent milestones
  - Updated features list
  - Updated next steps to focus on Milestone 6

- Updated `docs/PHASE_7_PROGRESS.md`:
  - Marked Milestone 5 as COMPLETE
  - Added comprehensive implementation details
  - Updated test coverage (142 tests total)
  - Updated progress percentage to 92%
  - Added "Milestone 5 Highlights" section
  - Updated "Next Steps" to focus on Milestone 6

- Updated `docs/COMPONENTS_INVENTORY.md`:
  - Added PlayerStatsTable component
  - Updated test coverage for integration tests

### Next Steps
**Phase 7 Milestone 6**: User Settings & Team Switching
- [ ] Design user settings page layout
- [ ] Implement team membership management (add coaches, stats keepers)
- [ ] Add role-based access controls (head coach vs assistant coach permissions)
- [ ] Create team settings page (edit team details, manage members)
- [ ] Test multi-team workflows and permission boundaries

---

## [Phase 3 Complete + Authentication] - 2025-10-28

### 🎉 Major Milestone: Full Authentication System + Phase 3 Complete!

This release adds a production-ready authentication system with email confirmation and password reset, completing Phase 3 with both analytics and auth working together.

### Added

#### Authentication System
- **Auth Components**
  - `components/auth/auth-form.tsx` - Reusable authentication form with sign up/sign in modes
    - Email/password authentication
    - Full name field for user registration
    - Password reset functionality
    - Resend confirmation email
    - Improved error messages with specific handling for common auth errors
    - Local development email link (localhost:54324)
  - `components/auth/auth-modal.tsx` - Modal wrapper with mode toggling
  - `app/auth/reset-password/page.tsx` - Password reset page with email verification
    - Session validation from reset link
    - Password confirmation with validation
    - Auto-redirect to demo page after success

- **Authentication Features**
  - Email confirmation required before sign-in
  - Password reset flow with email verification
  - Session management with `onAuthStateChange` listeners
  - Auto-redirect on 403/RLS policy violations
  - Auto-signout when RLS policies deny access
  - User-specific data isolation via team memberships

- **Demo Setup for Authenticated Users**
  - Updated `app/actions/demo-setup.ts` to accept userId parameter
  - Each user gets their own organization (unique slug: `demo-org-{userId}`)
  - Auto-creates team membership linking user to team
  - Server-side user verification

- **Updated Demo Pages**
  - `app/demo/game-tracking/page.tsx` now requires authentication
  - Auth state checking on mount
  - Sign out button with proper session cleanup
  - Auth modal shown when not authenticated
  - Loading states for auth checks

#### Database & Security
- **Fixed RLS Policies** (`supabase/migrations/20251028_fix_team_members_rls.sql`)
  - Added SELECT policies to `team_members` table (was blocking RLS subqueries)
  - Policy: "Users can view all team memberships" (needed for game_events RLS to work)
  - Policy: "Users can view their own memberships"
  - Policy: "Team members can add other members"

- **Demo Game Support** (`supabase/migrations/20251028104517_add_demo_game_support.sql`)
  - Database migrations for demo game setup

- **Enhanced Error Handling** (`lib/db/game-events.ts`)
  - All database operations now detect RLS errors (code 42501)
  - Auto-signout on RLS policy violations
  - Clear error logging for debugging

#### Configuration
- **Updated Supabase Config** (`supabase/config.toml`)
  - Added `additional_redirect_urls` for password reset redirects
  - URLs: `http://127.0.0.1:3000/auth/reset-password`, `http://localhost:3000/auth/reset-password`
  - Enables proper password reset flow

### Changed

#### Authentication Flow
- All database operations now include authentication checks
- Session validation before API calls
- Improved error messages guiding users to create accounts after database resets
- Better handling of expired or invalid sessions

### Fixed

- **RLS Policy Issue**: `team_members` table had RLS enabled but no SELECT policies, causing `game_events` INSERT policy subqueries to fail
- **Password Reset Redirects**: Emails now properly redirect to `/auth/reset-password` page
- **Session Persistence**: Auth state properly synced across page loads and refreshes

### Documentation Updates
- Updated `README.md`:
  - Added "Local Development Tools" section
  - Documented Supabase Studio (localhost:54323)
  - Documented Mailpit email inbox (localhost:54324)

- Updated `CLAUDE.md`:
  - Added authentication components section
  - Added 2 new migrations to database section
  - Updated dates to 2025-10-28
  - Updated Phase 3 to include authentication
  - Updated project status to ~60% complete
  - Added local development tools URLs
  - Updated quick start section for new sessions

---

## [Phase 3 Complete - Analytics] - 2025-10-27

### 🎉 Major Milestone: Post-Game Analytics Dashboard Complete!

This marks the completion of Phase 3, delivering a fully functional analytics dashboard that visualizes game tracking data with multiple chart types and intelligent insights.

### Added

#### Analytics Calculation Functions (`lib/analytics/game-analytics.ts`)
- `extractShotData()` - Extract shot locations and metadata for visualization
- `calculateShotQualityStats()` - Calculate shooting percentages by danger level (high/medium/low)
- `analyzeBreakouts()` - Analyze breakout success rates overall and by type
- `getPeriodStats()` - Aggregate events by period for trend analysis
- `extractTurnoverData()` - Get turnover locations for heat map visualization
- `getShootingPercentageBySituation()` - Analyze shooting by game situation (ES/PP/PK)
- 21 comprehensive unit tests covering all analytics functions

#### Visualization Components
- **Shot Chart** (`components/analytics/shot-chart.tsx`)
  - Shot location visualization overlaid on ice surface
  - Color-coded by result (goal=green, save=blue, miss=red/amber, blocked=gray, post=purple)
  - Size indicates shot quality (high=12px, medium=8px, low=6px)
  - Interactive tooltips showing shot details
  - Legend and stats overlay

- **Shot Quality Chart** (`components/analytics/shot-quality-chart.tsx`)
  - Bar chart showing shot distribution by danger level
  - Summary cards for total shots, goals, shooting %, high danger %
  - Detailed table with conversion rates by quality
  - Recharts integration for responsive visualizations

- **Breakout Analysis** (`components/analytics/breakout-analysis.tsx`)
  - Pie chart showing success/fail breakdown
  - Bar chart by breakout type with success rates
  - Auto-generated insights (most used type, most effective type)
  - Detailed table with all breakout types

- **Period Trends** (`components/analytics/period-trends.tsx`)
  - Bar chart for shots and goals by period
  - Line chart showing event activity trends over periods
  - Period-by-period comparison table
  - Auto-generated insights (most offensive pressure, turnover trends)

#### Analytics Dashboard (`app/demo/analytics/page.tsx`)
- Complete analytics dashboard integrating all visualization components
- Filters by period (1, 2, 3, all)
- Filters by situation (even strength, power play, penalty kill, all)
- Real-time event counting
- Situation stats quick view
- Navigation from game tracking page
- Empty state with helpful messaging

### Changed

#### Data Model Simplification
- **Removed 'goal' as separate event type** - Goals are now shots with `result='goal'`
  - Migration: `supabase/migrations/20251027235333_remove_goal_event_type.sql`
  - Updated existing 'goal' events to 'shot' with result='goal'
  - Modified database enum to remove 'goal'
  - Updated shot quality trigger to only check 'shot' events
  - Preserved UX: Goal button pre-fills result field in UI

- Updated `lib/stores/game-tracking-store.ts`:
  - Removed 'goal' from EventType enum
  - Added `prefilledDetails` parameter to `startEventLogging()`
  - Simplified `getShotStats()` to only filter 'shot' events

- Updated `components/game-tracking/quick-event-buttons.tsx`:
  - Goal button creates 'shot' with `prefilledDetails: { result: 'goal' }`
  - Added `prefilledDetails` parameter to interface

- Updated `components/game-tracking/event-logger.tsx`:
  - Auto-completes events when result is pre-filled
  - Passes `prefilledDetails` to store

#### Test Updates
- Fixed 8 tests in `tests/unit/quick-event-buttons.test.tsx`
- Fixed test in `tests/integration/game-event-persistence.test.ts`
- Fixed 2 tests in `tests/integration/game-events.test.ts`
- All tests now expect second parameter (prefilledDetails) in event selection

#### UI Enhancements
- Added "View Post-Game Analytics Dashboard" button to game tracking page
- Updated demo page descriptions and feature lists
- Improved navigation between tracking and analytics

### Documentation Updates
- Updated `CLAUDE.md`:
  - Added new migration to database section
  - Updated test count: 234 passing (2 skipped) = 236 total
  - Added analytics components to documentation
  - Updated Phase 2 status to 100% complete
  - Updated Phase 3 status to 100% complete
  - Updated progress tracker and project status
  - Added decision about "Goal is a shot with result='goal'"
  - Updated demo pages list
  - Updated "Quick Start for New Sessions" section

- Updated `README.md`:
  - Changed status badge to "in development"
  - Added tests badge showing 234 passing
  - Reorganized Key Features into Implemented/In Progress/Planned
  - Updated Project Status to show Phase 3 complete
  - Added comprehensive "Getting Started" section with setup instructions
  - Added testing and database management commands

### Test Coverage
- **Total Tests**: 234 passing, 2 skipped (236 total)
- **Success Rate**: 99.2%
- **Unit Tests**: 200 tests
- **Integration Tests**: 34 tests (2 skipped)
- **New Tests**: 21 analytics tests added

### Technical Decisions
1. **Goal Event Simplification**: Treating goals as shots with result='goal' eliminates data model redundancy
2. **Recharts Library**: Using pre-installed Recharts for all analytics visualizations (bar, line, pie charts)
3. **Client-Side Analytics**: Computing analytics in real-time from event data (no pre-computation needed for MVP)
4. **Optimistic Updates**: Maintained for analytics - events appear instantly, sync in background

### Files Added
- `lib/analytics/game-analytics.ts`
- `components/analytics/shot-chart.tsx`
- `components/analytics/shot-quality-chart.tsx`
- `components/analytics/breakout-analysis.tsx`
- `components/analytics/period-trends.tsx`
- `app/demo/analytics/page.tsx`
- `tests/unit/analytics.test.ts`
- `supabase/migrations/20251027235333_remove_goal_event_type.sql`
- `docs/CHANGELOG.md` (this file)

### Files Modified
- `lib/stores/game-tracking-store.ts`
- `components/game-tracking/quick-event-buttons.tsx`
- `components/game-tracking/event-logger.tsx`
- `app/demo/game-tracking/page.tsx`
- `tests/unit/quick-event-buttons.test.tsx`
- `tests/integration/game-event-persistence.test.ts`
- `tests/integration/game-events.test.ts`
- `CLAUDE.md`
- `README.md`

### Next Steps
Phase 4-6: Practice Planning & AI Integration
- [ ] Build drill library with search functionality
- [ ] Create practice plan builder interface
- [ ] Integrate OpenAI for AI-powered practice plan generation
- [ ] Connect tracked game data to drill recommendations

---

## [Phase 2 Complete] - 2025-10-27

### 🎉 Major Milestone: Live Game Tracking Complete!

This marks the completion of Phase 2, delivering a fully functional game tracking system with database persistence.

### Added
- Interactive ice surface component with tap-to-log functionality
- Event logger with 6 event types (shot, turnover, breakout, zone_entry, faceoff, penalty)
- Player selector with quick-select grid by jersey number
- Live stats dashboard showing real-time game metrics
- Recent events list with undo/delete functionality
- Database persistence with optimistic updates
- 7 database migrations for complete game tracking schema
- Demo page at `/demo/game-tracking`

### Test Coverage
- 213 tests passing
- Unit tests for all components
- Integration tests for database operations
- RLS policy tests

---

## [Phase 1 Complete] - 2025-10-24

### 🎉 Major Milestone: Foundation Complete!

### Added
- Next.js 15 project initialization with TypeScript
- Supabase local development environment
- Testing infrastructure (Vitest + Playwright)
- Core utility functions:
  - Age group formatting (USA/Canada)
  - Shot quality calculation
  - Ice surface coordinates
  - Breakout analytics
- Database schema for organizations, teams, players
- RLS policies for multi-tenant data isolation
- TypeScript type generation from database

### Test Coverage
- 114 unit tests passing
- 100% coverage on core utilities

---

## [Phase 0 Complete] - 2025-10-23

### Planning & Design Phase

### Added
- Complete product planning document
- Database schema design
- TDD approach definition
- Tech stack decisions
- Architecture documentation
- `CLAUDE.md` - Central documentation hub
- `docs/HOCKEY_PRACTICE_APP_PLAN.md`
- `docs/DEV_SETUP_AND_DATA_MODELS.md`

---

**Legend**:
- ✅ Complete
- 🚧 In Progress
- 📋 Planned
- 🐛 Bug Fix
- 🎉 Major Milestone
