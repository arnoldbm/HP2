# Mobile App Setup - React Native + Expo

**Date Completed**: 2025-11-05
**Status**: ✅ Phase 1 Complete - Ready for Development
**Related Docs**:
- `NATIVE_APP_LAUNCH_PLAN.md` - Overall launch strategy
- `MOBILE_APP_DEVELOPMENT.md` - Weeks 4-6 development plan

---

## 🎯 Overview

Set up React Native mobile app (iOS + Android) using Expo, sharing business logic with web app via monorepo structure.

**Key Achievement**: Mobile app package is now ready for feature development with testing infrastructure in place.

---

## ✅ What We Completed

### 1. Mobile Package Structure

Created `packages/mobile/` with Expo Router:

```
packages/mobile/
├── app/                         # Expo Router screens (file-based routing)
│   ├── (tabs)/                 # Tab navigator (index, explore)
│   ├── _layout.tsx            # Root layout
│   ├── +html.tsx              # Web HTML wrapper
│   ├── +not-found.tsx         # 404 page
│   └── modal.tsx              # Example modal
├── components/                 # React Native components
├── constants/                  # App constants (Colors, etc.)
├── assets/                     # Images, icons, fonts
├── lib/
│   └── supabase.ts           # ✅ Supabase client config
├── tests/
│   ├── setup.ts              # ✅ Jest setup & global mocks
│   ├── helpers.tsx           # ✅ Test utilities
│   └── mocks/
│       └── data.ts           # ✅ Mock factories
├── jest.config.js            # ✅ Jest configuration
├── app.json                  # ✅ Expo config (bundle IDs)
├── package.json              # ✅ Dependencies + test scripts
├── tsconfig.json             # TypeScript config
└── .env                      # ✅ Environment variables
```

---

### 2. Dependencies Installed

**Production**:
- `@hockeypilot/shared` - Shared business logic
- `@supabase/supabase-js` - Database & auth
- `zustand` - State management
- `react-native-purchases` - RevenueCat SDK (subscriptions)
- `@react-native-async-storage/async-storage` - Secure storage
- `react-native-gesture-handler` - Touch interactions
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe areas
- `expo-router` - File-based navigation

**Development**:
- `jest` - Testing framework
- `@testing-library/react-native` - Component testing
- `react-test-renderer` - React Native renderer
- `@types/jest` - TypeScript types

---

### 3. Configuration Files

#### `app.json` - Expo Configuration

```json
{
  "expo": {
    "name": "HockeyPilot",
    "slug": "hockeypilot",
    "version": "1.0.0",
    "scheme": "hockeypilot",
    "description": "AI-powered hockey practice planner with live game tracking",
    "ios": {
      "bundleIdentifier": "com.hockeypilot.app",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.hockeypilot.app",
      "versionCode": 1
    }
  }
}
```

**Key Details**:
- App name: "HockeyPilot"
- iOS bundle ID: `com.hockeypilot.app`
- Android package: `com.hockeypilot.app`
- URL scheme: `hockeypilot://` (for deep linking)

---

#### `jest.config.js` - Testing Configuration

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@hockeypilot/shared$': '<rootDir>/../shared/src/index.ts',
  },
}
```

**Key Features**:
- 80% coverage threshold for all metrics
- Path aliases configured (`@/`, `@hockeypilot/shared`)
- Transforms Expo and shared package code

---

#### `tests/setup.ts` - Global Test Mocks

Mocks configured for:
- **AsyncStorage** - React Native async storage
- **Supabase** - Auth and database operations
- **Expo Router** - Navigation (`useRouter`, `Link`, etc.)
- **React Native Purchases** - RevenueCat SDK
- **Animated** - Silences native driver warnings

All tests run with these mocks by default.

---

#### `lib/supabase.ts` - Supabase Client

```typescript
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

**Key Features**:
- Uses AsyncStorage for secure token persistence
- Auto-refreshes auth tokens
- Session persists across app restarts
- Works with local Supabase (http://localhost:54321)

---

### 4. Test Infrastructure

#### Test Utilities (`tests/helpers.tsx`)

```typescript
// Custom render with providers
export function renderWithProviders(ui: ReactElement, options?: RenderOptions)

// Async testing helper
export const wait = (ms: number) => Promise

// Suppress console during tests
export function suppressConsole()
```

#### Mock Factories (`tests/mocks/data.ts`)

```typescript
// Individual mocks
createMockUser()
createMockTeam()
createMockPlayer()
createMockGame()
createMockGameEvent()
createMockShotEvent()
createMockGoalEvent()

// Bulk mocks
createMockRoster(count) // Generate N players
createMockGameWithEvents() // Complete game scenario
```

**Usage Example**:
```typescript
import { createMockRoster, renderWithProviders } from '@/tests/helpers'

it('should display player roster', () => {
  const players = createMockRoster(15) // 15 players
  const { getByText } = renderWithProviders(<RosterScreen players={players} />)

  expect(getByText('Player1 Test')).toBeTruthy()
})
```

---

### 5. Environment Variables

**`.env` Configuration**:
```bash
# Supabase (local development)
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# RevenueCat (add when ready)
# EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=
# EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=
```

**Important**:
- Expo requires `EXPO_PUBLIC_` prefix for client-side env vars
- `.env` is for local development only
- Production values set in EAS Build secrets

---

### 6. Monorepo Integration

#### Package Linking

The mobile app imports from the shared package:
```typescript
import { createGameTrackingStore } from '@hockeypilot/shared'
import { ageGroups } from '@hockeypilot/shared'
import { shotQualitySchema } from '@hockeypilot/shared'
```

#### Verified Working

✅ TypeScript can resolve `@hockeypilot/shared`
✅ npm workspaces hoisting works correctly
✅ Jest can import from shared package
✅ Shared package symlinked in `node_modules`

---

### 7. NPM Scripts

Added to `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 🧪 Testing

### Run Tests

```bash
cd packages/mobile

# Run all tests
npm test

# Watch mode (auto-run on file changes)
npm test:watch

# With coverage report
npm test:coverage
```

### Test Structure

Tests live in `tests/` directory:
```
tests/
├── setup.ts              # Global mocks and config
├── helpers.tsx           # Test utilities
├── mocks/
│   └── data.ts          # Mock factories
├── components/          # Component tests (future)
├── screens/             # Screen tests (future)
└── integration/         # Integration tests (future)
```

### Coverage Goals

| Metric | Target |
|--------|--------|
| Statements | 80% |
| Branches | 80% |
| Functions | 80% |
| Lines | 80% |

---

## 🚀 Running the App

### Development Server

```bash
cd packages/mobile
npm start
```

This opens Expo Dev Tools where you can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app (physical device)

### Platform-Specific

```bash
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # Web browser (metro bundler)
```

---

## 🔗 Shared Package Integration

### What's Shared?

The mobile app reuses from `@hockeypilot/shared`:

✅ **Stores**: Zustand stores (game tracking, etc.)
✅ **Types**: TypeScript types (Team, Player, Game, etc.)
✅ **Validation**: Zod schemas (event validation)
✅ **Utils**: Helper functions (ice coordinates, age groups)
✅ **Analytics**: Game stats calculations
✅ **API Interfaces**: Supabase query patterns

### What's NOT Shared?

❌ **UI Components**: React Native vs React DOM (different APIs)
❌ **Navigation**: Expo Router vs Next.js App Router
❌ **Styling**: StyleSheet vs Tailwind CSS

---

## 📋 Next Steps

According to `MOBILE_APP_DEVELOPMENT.md`, the next phase is:

### Week 4: Auth & Foundation
1. Create auth context provider
2. Build UI component library (Button, Input, Text)
3. Create auth screens (login, signup, forgot password)

### Week 5: Teams & Game Tracking
4. Create teams list and roster screens
5. Build IceSurface component (React Native SVG)
6. Build PlayerSelector component
7. Create game tracking screen

### Week 6: Analytics & Settings
8. Create analytics/post-game screen
9. Create settings screen
10. Implement subscription checks (RevenueCat)

**See**: `docs/MOBILE_APP_DEVELOPMENT.md` for detailed implementation plan

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: `EXPO_PUBLIC_SUPABASE_URL is required`
**Fix**: Create `.env` file with Supabase credentials (see section 5)

**Issue**: `Cannot find module '@hockeypilot/shared'`
**Fix**: Run `npm install` from monorepo root to link workspaces

**Issue**: Jest can't resolve shared package
**Fix**: Check `moduleNameMapper` in `jest.config.js` points to correct path

**Issue**: AsyncStorage mock errors
**Fix**: Ensure `tests/setup.ts` is included in `setupFilesAfterEnv`

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| `NATIVE_APP_LAUNCH_PLAN.md` | 10-week launch plan (Phases 1-8) |
| `MOBILE_APP_DEVELOPMENT.md` | Weeks 4-6 detailed development plan |
| `TESTING_GUIDE.md` | Testing philosophy and patterns |
| `DATABASE_REFERENCE.md` | Database schema and RLS policies |
| `CLAUDE.md` | Quick reference for AI assistants |

---

## 📊 Progress Summary

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Monorepo Setup | ✅ Complete | 100% |
| Phase 2: RevenueCat | ⏸️ Deferred | 0% |
| Phase 3: React Native Setup | ✅ Complete | 100% |
| Phase 4: Core Screens (Weeks 4-6) | 🚧 Ready to Start | 0% |
| Phase 5: Paywall | ⏸️ Pending | 0% |

**Overall Mobile Progress**: Phase 3 Complete (33%)

---

## 🎯 Key Decisions Made

### 1. Expo Router vs React Navigation
**Decision**: Use Expo Router (file-based routing)
**Rationale**:
- Simpler mental model (like Next.js)
- Built-in deep linking
- Better TypeScript support

### 2. Jest vs Vitest
**Decision**: Use Jest (with jest-expo preset)
**Rationale**:
- Better React Native support
- Expo's recommended testing framework
- More mature ecosystem

### 3. AsyncStorage vs SecureStore
**Decision**: Use AsyncStorage for auth tokens
**Rationale**:
- Supabase handles encryption
- AsyncStorage is sufficient for auth tokens
- Simpler setup

### 4. Local Supabase vs Production
**Decision**: Point to local Supabase (localhost:54321)
**Rationale**:
- Faster development cycle
- No risk to production data
- Same setup as web app

---

## ✅ Verification Checklist

Before continuing to Phase 4, verify:

- [x] Mobile package created with Expo
- [x] Dependencies installed (Supabase, Zustand, RevenueCat)
- [x] `@hockeypilot/shared` linked and importable
- [x] `app.json` configured with bundle IDs
- [x] `.env` file created with Supabase credentials
- [x] Jest configured and runs successfully
- [x] Test helpers and mocks created
- [x] Supabase client configured with AsyncStorage
- [x] TypeScript compiles without errors
- [x] `npm start` launches Expo dev server

**All items verified ✅** - Ready for Phase 4!

---

**Last Updated**: 2025-11-05
**Completed By**: Brock Arnold + Claude
**Next Milestone**: Auth context provider & UI components
