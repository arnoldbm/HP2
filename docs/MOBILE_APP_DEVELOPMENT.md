# Mobile App Development Plan - Phase 3-5

**Status**: Phase 4 In Progress (Week 4-5) 🚧
**Timeline**: 3-4 weeks
**Approach**: Test-Driven Development (TDD)
**Last Updated**: 2025-11-08

---

## 🎯 Overview

Building React Native mobile app (iOS + Android) using Expo, sharing business logic with web app via `@hockeypilot/shared` package.

**Key Principles**:
- Write tests FIRST, then implement (TDD)
- Reuse shared code (stores, API, validation, types)
- Mobile-first design (touch-optimized)
- Offline-capable (Phase 2 feature)

**Current Focus**: Building core screens (auth, teams, game tracking)

---

## ✅ Phase 3: React Native App Setup (Week 3) - COMPLETE

**Status**: ✅ Complete

**Completed Tasks**:
1. ✅ Created Expo app with tabs template
2. ✅ Installed core dependencies (Supabase, Zustand, RevenueCat, etc.)
3. ✅ Linked `@hockeypilot/shared` package
4. ✅ Configured `app.json` with bundle identifiers:
   - iOS: `com.hockeypilot.app`
   - Android: `com.hockeypilot.app`
5. ✅ Verified TypeScript imports from shared package
6. ✅ Configured Turborepo integration

**Current Structure**:
```
packages/mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigator (explore, index)
│   ├── _layout.tsx        # Root layout
│   ├── +html.tsx          # Web HTML wrapper
│   ├── +not-found.tsx     # 404 page
│   └── modal.tsx          # Example modal
├── components/            # React Native components
├── constants/             # App constants
├── assets/               # Images, icons, fonts
├── app.json              # Expo config
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

---

## 🚧 Phase 4: Core React Native Screens (Weeks 4-6)

**Overall Status**: 🚧 In Progress (60% complete)

---

### ✅ 4.1 Setup Testing Infrastructure - COMPLETE

**Status**: ✅ Complete

**Test Framework**: Jest + React Native Testing Library (included with Expo)

**Completed Tasks**:
1. ✅ Configured Jest for React Native
2. ✅ Set up test utilities and helpers
3. ✅ Created mock factories for common data
4. ✅ Configured coverage reporting
5. ✅ Added React Navigation mocks (useFocusEffect, useNavigation)
6. ✅ Added Supabase global mocks

**Files Created**:
- ✅ `tests/setup.ts` - Test configuration with global mocks
- ✅ `tests/helpers.tsx` - Test utilities (renderWithProviders, wait, etc.)
- ✅ `tests/mocks/data.ts` - Mock data factories (teams, players, games)
- ✅ `jest.config.js` - Jest configuration

**Test Results**:
- Current: 61/83 tests passing (73% pass rate)
- Remaining failures are TDD-style tests for incomplete features

---

### ✅ 4.2 Supabase Client Configuration - COMPLETE

**Status**: ✅ Complete

**Completed Tasks**:
1. ✅ Created Supabase client with AsyncStorage
2. ✅ Set up auth state management
3. ✅ Created auth context provider
4. ✅ Wrote tests for auth flows (all passing)

**Files Created**:
- ✅ `lib/supabase.ts` - Supabase client config
- ✅ `lib/contexts/auth-context.tsx` - Auth context
- ✅ `tests/lib/auth-context.test.tsx` - Auth context tests (100% passing)

**Implementation Notes**:
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
```

---

### ✅ 4.3 Auth Screens - COMPLETE

**Status**: ✅ Complete

**Screens Created**:
1. ✅ `app/(auth)/login.tsx` - Email/password login
2. ✅ `app/(auth)/signup.tsx` - Create account
3. ✅ `app/(auth)/forgot-password.tsx` - Password reset

**Features Implemented**:
- ✅ Form validation (email format, password requirements)
- ✅ Error handling and display
- ✅ Loading states during auth operations
- ✅ Navigation to app on successful login/signup
- ✅ "Forgot password" link in login screen
- ✅ Success message after password reset email sent

**Tests Written** (All Passing):
1. ✅ `tests/app/login-screen.test.tsx`:
   - Renders login form
   - Validates email format
   - Calls signInWithPassword on submit
   - Shows errors for invalid credentials
   - "Forgot password" navigation

2. ✅ `tests/app/signup-screen.test.tsx`:
   - Renders signup form
   - Validates email and password
   - Calls signUp on submit
   - Shows errors appropriately

3. ✅ `tests/app/forgot-password-screen.test.tsx`:
   - Renders password reset form
   - Validates email format
   - Calls resetPasswordForEmail
   - Shows success message

**UI Components Created**:
- ✅ `components/ui/Input.tsx` - Text input with label
- ✅ `components/ui/Button.tsx` - Primary button with loading state
- ✅ `components/ui/Text.tsx` - Typography variants (title, body, caption)
- Error display inline in forms

---

### 🚧 4.4 Teams & Roster Screens - PARTIAL

**Status**: 🚧 Partial (30% complete)

**Screens Created**:
1. ✅ `app/(tabs)/teams.tsx` - Teams list
2. ⏳ `app/teams/new.tsx` - Create team (NOT YET)
3. ⏳ `app/teams/[id]/index.tsx` - Team details (NOT YET)
4. ⏳ `app/teams/[id]/roster.tsx` - Player roster (NOT YET)
5. ⏳ `app/teams/[id]/settings.tsx` - Team settings (NOT YET)

**Features Implemented**:
- ✅ List all user's teams with stats (player count, game count)
- ✅ Pull-to-refresh to reload teams
- ✅ Loading states
- ✅ Empty state when no teams
- ✅ Error handling
- ✅ Age group display formatting (10U, 12U, etc.)
- ⏳ Create/edit/delete teams (NOT YET)
- ⏳ Team navigation (NOT YET)
- ⏳ Roster management (NOT YET)

**Tests Written** (TDD - Some Failing):
1. `tests/screens/teams-list.test.tsx`:
   - Renders teams list
   - Shows empty state for no teams
   - Navigates to team details on tap
   - "Create team" button works
   - Displays team name, age group, level

2. `tests/screens/create-team.test.tsx`:
   - Renders create team form
   - Validates required fields
   - Creates team via API
   - Navigates to team details on success
   - Shows error on failure

3. `tests/screens/roster.test.tsx`:
   - Renders player list
   - Shows empty state for no players
   - "Add player" button works
   - Deletes player with confirmation
   - Edits player details
   - Sorts by jersey number

**UI Components Needed**:
- `components/teams/TeamCard.tsx` - Team list item
- `components/teams/PlayerCard.tsx` - Player list item
- `components/teams/TeamForm.tsx` - Team create/edit form
- `components/teams/PlayerForm.tsx` - Player create/edit form

**Shared Code Used**:
- `@hockeypilot/shared` - Team/player types, validation schemas
- Team API calls (need to create in shared package)
- Age group utilities

---

### ✅ 4.5 Game Tracking Screen - FUNCTIONAL (with bugs fixed)

**Status**: ✅ Core Features Working (75% complete)

**Screens Created**:
1. ✅ `app/(tabs)/game-tracking.tsx` - Main game tracking (WORKING)
2. ⏳ `app/games/new.tsx` - Start new game (NOT YET - using inline form)
3. ⏳ `app/games/[id]/index.tsx` - View/edit game (NOT YET)

**Features Implemented**:
- ✅ Interactive ice surface (tap to log events)
- ✅ Player selector (modal with player list)
- ✅ Event logging (shot, goal, turnover, faceoff, penalty, zone entry)
- ✅ Real-time event list with timestamps
- ✅ Database persistence (Supabase)
- ✅ Optimistic UI updates
- ✅ Team selector
- ✅ Game setup form (opponent, date, location)
- ✅ Start/end game controls
- ✅ Completed game summary with stats breakdown
- ✅ "Start New Game" button after game ends
- ✅ Player refresh on tab focus (syncs with web)
- ✅ Proper game state management
- ✅ Compact UI layout (fits on iPhone screen)
- ⏳ Period management (NOT YET)
- ⏳ Game timer (NOT YET)
- ⏳ Score display during active game (NOT YET)

**Recent Bug Fixes** (2025-11-08):
1. ✅ Fixed completed game state - local state now updates when game ends
2. ✅ Fixed UI layout - reduced spacing to fit button on screen without scrolling
3. ✅ Fixed player refresh - players reload when navigating to Game tab
4. ✅ Fixed useFocusEffect tests - added React Navigation mocks

**Tests Written** (TDD - Many Failing):
1. `tests/components/IceSurface.test.tsx`:
   - Renders SVG ice surface
   - Handles touch events
   - Converts screen coordinates to ice coordinates
   - Displays event markers
   - Shows zones (defensive, neutral, offensive)
   - Shows slot area (high danger)

2. `tests/components/PlayerSelector.test.tsx`:
   - Renders player list
   - Filters by position
   - Selects player on tap
   - Shows jersey numbers
   - Sorts by jersey number
   - Quick select mode (larger buttons)

3. `tests/screens/track-game.test.tsx`:
   - Renders game tracking screen
   - Logs shot event
   - Logs goal event
   - Logs turnover event
   - Updates event list in real-time
   - Saves to database
   - Handles offline mode (Phase 2)

4. `tests/integration/game-tracking-flow.test.tsx`:
   - Complete flow: start game → log events → save
   - Player selection → event type → location
   - Period transitions
   - End game

**UI Components Created**:
- ✅ `components/game-tracking/IceSurface.tsx` - Interactive ice rink with SVG (CRITICAL)
- ✅ `components/game-tracking/PlayerSelector.tsx` - Player picker modal
- ⏳ `components/game-tracking/EventLog.tsx` - Recent events list (inline, not separate component)
- ⏳ `components/game-tracking/EventTypeSelector.tsx` - Shot, Goal, etc. (inline, not separate component)
- ⏳ `components/game-tracking/GameHeader.tsx` - Score, period, time (NOT YET)

**Shared Code Used**:
- ✅ `@hockeypilot/shared/utils/ice-surface-coordinates` - Coordinate conversion
- ✅ Supabase client for database persistence
- ⏳ `@hockeypilot/shared/stores/game-tracking-store` - Not yet using store (direct state management)

**Technical Implementation**:
- ✅ React Native SVG for ice surface
- ✅ TouchableOpacity for tap handling
- ✅ Modal for player selection
- ✅ FlatList for event list
- ✅ Portrait mode optimized
- ✅ Compact spacing for iPhone screens

---

### 4.6 Analytics/Post-Game Screen

**Goal**: View game analytics and player stats

**Screens**:
1. `app/(tabs)/analytics.tsx` - Recent games list
2. `app/games/[id]/analytics.tsx` - Game analytics detail

**Features**:
- Shot chart (ice surface with markers)
- Player stats table (sortable)
- Team stats summary
- Shot quality metrics
- Turnover analysis
- Breakout success rate

**Tests to Write** (TDD):
1. `tests/screens/analytics.test.tsx`:
   - Renders games list
   - Shows game summary cards
   - Navigates to game detail
   - Displays basic stats (shots, goals, etc.)

2. `tests/screens/game-analytics.test.tsx`:
   - Renders shot chart
   - Displays player stats table
   - Sorts players by stat
   - Shows shot quality breakdown
   - Calculates shooting percentage
   - Displays turnover locations

3. `tests/components/ShotChart.test.tsx`:
   - Renders ice surface with shot markers
   - Differentiates goals from misses
   - Shows shot quality zones (slot vs perimeter)
   - Handles empty state (no shots)

**UI Components Needed**:
- `components/analytics/ShotChart.tsx` - Ice surface with shots
- `components/analytics/PlayerStatsTable.tsx` - Sortable table
- `components/analytics/StatCard.tsx` - Single stat display
- `components/analytics/GameSummary.tsx` - Overview card

**Shared Code Used**:
- `@hockeypilot/shared/analytics/game-analytics` - Stats calculations
- `@hockeypilot/shared/analytics/shot-quality` - Shot quality metrics
- Already tested in shared package!

---

### 4.7 Settings Screen

**Goal**: User settings, team preferences, subscription status

**Screens**:
1. `app/(tabs)/settings.tsx` - Main settings
2. `app/settings/profile.tsx` - User profile
3. `app/settings/subscription.tsx` - Billing & subscription

**Features**:
- User profile (name, email, avatar)
- Team switching
- Notification preferences
- App theme (light/dark)
- Subscription status
- Logout

**Tests to Write** (TDD):
1. `tests/screens/settings.test.tsx`:
   - Renders settings menu
   - Navigates to profile
   - Navigates to subscription
   - Logs out user
   - Shows current team

2. `tests/screens/profile.test.tsx`:
   - Renders user profile
   - Updates name
   - Updates email
   - Uploads avatar (optional)

**UI Components Needed**:
- `components/settings/SettingsItem.tsx` - Menu item
- `components/settings/SettingsSection.tsx` - Grouped items
- `components/ui/Avatar.tsx` - User avatar

---

## 🔐 Phase 5: Paywall & Usage Limits (Week 6)

### 5.1 Subscription Management

**Goal**: Check subscription status, enforce limits, handle upgrades

**Tasks**:
1. Create subscription hook (`useSubscription`)
2. Implement usage limit checks
3. Create paywall screen
4. Test purchase flows (sandbox)

**Files to Create**:
- `lib/hooks/useSubscription.ts` - Subscription hook
- `lib/subscriptions/limits.ts` - Usage limit logic
- `app/upgrade.tsx` - Paywall screen
- `tests/hooks/useSubscription.test.ts` - Hook tests
- `tests/subscriptions/limits.test.ts` - Limits tests
- `tests/screens/upgrade.test.tsx` - Paywall tests

**Features**:
- Check subscription tier (free/premium/pro)
- Enforce game tracking limits (3 for free)
- Show upgrade prompt when limit reached
- Purchase flow (RevenueCat)
- Restore purchases

**Tests to Write** (TDD):
1. `tests/hooks/useSubscription.test.ts`:
   - Returns subscription status
   - Returns tier (free/premium/pro)
   - Handles loading state
   - Handles error state

2. `tests/subscriptions/limits.test.ts`:
   - Free tier: 3 games limit
   - Premium tier: unlimited games
   - Pro tier: unlimited games + teams
   - Blocks when limit reached

3. `tests/screens/upgrade.test.tsx`:
   - Renders upgrade options
   - Shows Premium card ($14.99)
   - Shows Pro card ($29.99)
   - Handles purchase tap
   - Shows loading during purchase
   - Restores purchases

**UI Components Needed**:
- `components/subscription/UpgradeCard.tsx` - Pricing card
- `components/subscription/FeatureList.tsx` - Feature checklist
- `components/subscription/UpgradePrompt.tsx` - Inline upgrade CTA

---

## 📋 Implementation Checklist

### Week 4: Foundation & Auth - ✅ COMPLETE
- [x] Set up Jest testing infrastructure
- [x] Create test helpers and mocks
- [x] Configure Supabase client for React Native
- [x] Create auth context provider
- [x] Build UI component library (Button, Input, Text, etc.)
- [x] Create login screen (TDD)
- [x] Create signup screen (TDD)
- [x] Create forgot password screen (TDD)
- [x] Test auth flows end-to-end

### Week 5: Teams & Game Tracking - 🚧 PARTIAL (60% complete)
- [x] Create teams list screen (TDD)
- [ ] Create team details screen (TDD)
- [ ] Create roster management screen (TDD)
- [x] Build IceSurface component (TDD) ⭐ CRITICAL
- [x] Build PlayerSelector component (TDD)
- [x] Create game tracking screen (TDD)
- [x] Fix game tracking bugs (completed game state, UI layout, player refresh)
- [ ] Test complete game tracking flow (partial - some tests failing)
- [ ] Create analytics screen (TDD)
- [ ] Build shot chart component (TDD)

### Week 6: Settings & Paywall - ⏳ NOT STARTED
- [ ] Create settings screen (TDD)
- [ ] Create profile screen (TDD)
- [ ] Implement subscription hook
- [ ] Create usage limit logic
- [ ] Create upgrade/paywall screen (TDD)
- [ ] Test purchase flow (sandbox)
- [ ] Test restore purchases
- [ ] Integration testing (all screens)

---

## 🎨 Design System

### Typography
- **Title**: 24px, Bold
- **Heading**: 20px, Semibold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Label**: 12px, Medium

### Colors (from web app)
- **Primary**: Blue (game tracking, CTAs)
- **Success**: Green (goals, success states)
- **Warning**: Yellow (warnings, alerts)
- **Error**: Red (errors, turnovers)
- **Ice Surface**: Light blue background, dark blue lines

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

### Components
Use shadcn/ui style components adapted for React Native:
- Consistent padding/margins
- Rounded corners (8px default)
- Shadow for cards
- Consistent button heights (48px)

---

## 🧪 Testing Strategy

### Unit Tests
- Individual components in isolation
- Custom hooks
- Utility functions
- 80%+ coverage goal

### Integration Tests
- Screen flows (login → teams → game tracking)
- Navigation between screens
- API calls with mocked Supabase
- 90%+ coverage goal

### E2E Tests (Detox - Phase 2)
- Critical user journeys
- Purchase flows
- Offline mode

### Test Naming Convention
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render component with default props', () => {})
  })

  describe('User Interactions', () => {
    it('should call handler when button is pressed', () => {})
  })

  describe('Edge Cases', () => {
    it('should handle empty state', () => {})
  })
})
```

---

## 🚀 Running the App

### Development
```bash
# From monorepo root
cd packages/mobile

# Start Expo dev server
npm start

# Or run on specific platform
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # Web browser
```

### Testing
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Specific test file
npm test -- PlayerSelector
```

### Building
```bash
# Development build
eas build --profile development --platform ios

# Preview build (for TestFlight)
eas build --profile preview --platform ios

# Production build
eas build --profile production --platform ios
```

---

## 📊 Progress Tracking

**Phase 3**: ✅ Complete (100%)
**Phase 4**: 🚧 In Progress (60% complete)
  - 4.1 Testing Infrastructure: ✅ Complete
  - 4.2 Supabase Client: ✅ Complete
  - 4.3 Auth Screens: ✅ Complete
  - 4.4 Teams & Roster: 🚧 Partial (30% - teams list done, roster not started)
  - 4.5 Game Tracking: ✅ Functional (75% - core features working, some features incomplete)
  - 4.6 Analytics: ⏳ Not Started
  - 4.7 Settings: ⏳ Not Started
**Phase 5**: ⏳ Not Started (0%)

**Total Progress**: 53% (Phase 3 complete + 60% of Phase 4)

**Test Coverage**: 61/83 tests passing (73% pass rate)
- Passing tests cover all implemented features
- Failing tests are TDD-style tests for incomplete features

---

## 📝 Notes & Decisions

### Key Architectural Decisions

1. **Expo Router for Navigation**
   - File-based routing (like Next.js)
   - Easier to understand and maintain
   - Deep linking built-in

2. **Shared Business Logic**
   - All stores, API calls, validation in `@hockeypilot/shared`
   - Mobile app is primarily UI layer
   - Reduces duplication, easier testing

3. **AsyncStorage for Token Persistence**
   - Secure token storage
   - Auto-refresh handled by Supabase
   - Works offline

4. **React Native SVG for Ice Surface**
   - Better performance than Canvas
   - Declarative API
   - Easier to test

5. **TDD Approach**
   - Write tests first
   - Ensures testability
   - Documents expected behavior
   - Catches regressions early

### Deferred to Phase 2
- Offline mode (IndexedDB sync)
- Push notifications
- Social sharing
- Team collaboration (multiple trackers)

---

## 🎯 What's Next?

Based on current progress (53% complete), recommended next steps:

### Option A: Complete Game Tracking Features ⭐ RECOMMENDED
Focus on polishing game tracking since core functionality is working:
1. Add period management (1st, 2nd, 3rd periods)
2. Add game timer with pause/resume
3. Add live score display during active game
4. Complete missing GameTrackingScreen tests
5. Polish UI/UX based on user testing

**Why**: Game tracking is the killer feature. Making it excellent before moving on ensures a strong foundation.

### Option B: Build Team Management
Complete the teams & roster functionality:
1. Team details screen
2. Roster management (add/edit/delete players)
3. Team navigation
4. Complete TeamsListScreen tests

**Why**: Users need to manage rosters to use game tracking effectively.

### Option C: Add Analytics Screen
Build post-game analytics:
1. Shot chart component (ice surface with markers)
2. Player stats table
3. Game summary cards
4. Use existing analytics code from `@hockeypilot/shared`

**Why**: Helps users see value from tracked games, increases engagement.

### Option D: Settings & Profile
Build basic settings:
1. User profile editing
2. Team switching
3. App preferences
4. Logout functionality

**Why**: Essential for production app, relatively straightforward to implement.

---

**Last Updated**: 2025-11-08
**Next Review**: After completing one of the options above
**Maintained By**: Brock Arnold + Claude
