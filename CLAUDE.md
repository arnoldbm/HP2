# 🤖 CLAUDE.md - AI Assistant Quick Start

**PURPOSE**: Quick reference for AI assistants to understand the project and find detailed documentation.

---

## 🎯 PROJECT OVERVIEW

**What**: Hockey practice planning app with live game tracking that generates AI-powered, data-driven practice plans

**Key Differentiator**: Real-time game event tracking → Objective analytics → AI-generated practice plans targeting specific weaknesses

**Target Market**: North American youth hockey (ages 8-18, USA & Canada)

**Business Model**: Freemium SaaS ($14.99/mo Premium, $29.99/mo Pro)

---

## 📚 DOCUMENTATION INDEX

### Core Planning & Setup
| Document | Purpose |
|----------|---------|
| `README.md` | Repository overview, quick start |
| `docs/HOCKEY_PRACTICE_APP_PLAN.md` | Complete product plan, features, monetization |
| `docs/DEV_SETUP_AND_DATA_MODELS.md` | Dev environment, database design, TDD approach |
| `docs/CHANGELOG.md` | Project changelog by phase |

### Technical Reference
| Document | Purpose |
|----------|---------|
| `docs/DATABASE_REFERENCE.md` | **NEW** Schema, migrations, RLS policies |
| `docs/COMPONENTS_INVENTORY.md` | **NEW** All components with test coverage |
| `docs/TROUBLESHOOTING.md` | **NEW** Common problems & solutions |
| `docs/TESTING_GUIDE.md` | Testing philosophy, patterns, best practices |

### Features & Implementation
| Document | Purpose |
|----------|---------|
| `docs/AI_PRACTICE_PLAN_GENERATION.md` | AI integration, prompts, algorithms |
| `docs/PRACTICE_HISTORY.md` | Practice history feature |
| `docs/PRACTICE_BUILDER.md` | Manual practice builder |
| `docs/MOBILE_FIRST_ASSESSMENT.md` | Mobile UX roadmap |
| `docs/GAME_TRACKING_MOBILE.md` | Mobile optimization (8/10 score) |
| `docs/GAME_TRACKING_UX_IMPROVEMENTS.md` | Ice-first flow, PWA setup |
| `docs/PWA_INSTALLATION_GUIDE.md` | End-user PWA install guide |
| `docs/ROSTER_MANAGEMENT.md` | Player roster management |
| `docs/INVITATION_SYSTEM.md` | Team invitation system (email + shareable links) |
| `docs/PHASE_7_PROGRESS.md` | Team management progress tracker |

### Native Mobile App (React Native + Expo)
| Document | Purpose |
|----------|---------|
| `docs/NATIVE_APP_LAUNCH_PLAN.md` | **⭐ START HERE** 10-week launch plan (Phases 1-8) |
| `docs/MOBILE_APP_SETUP.md` | **NEW** Phase 1 & 3 complete - Setup & testing infrastructure |
| `docs/MOBILE_APP_DEVELOPMENT.md` | **NEW** Phase 4-5 plan - Core screens (Weeks 4-6) |

---

## 🏗️ TECH STACK

### Web App (packages/web)
```
Frontend:  Next.js 14+ (App Router, TypeScript)
Backend:   Supabase (PostgreSQL + Auth + RLS)
Testing:   Vitest + Playwright
State:     Zustand
Forms:     React Hook Form + Zod
UI:        TailwindCSS + shadcn/ui
AI:        OpenAI GPT-4o
```

### Mobile App (packages/mobile) - NEW! 📱
```
Framework: React Native + Expo (iOS + Android)
Routing:   Expo Router (file-based)
Testing:   Jest + React Native Testing Library
State:     Zustand (via @hockeypilot/shared)
Backend:   Supabase (shared with web)
UI:        React Native components
Payments:  RevenueCat (cross-platform subscriptions)
```

### Shared Package (packages/shared)
```
Stores:    Zustand stores (game tracking, etc.)
Types:     TypeScript types & interfaces
Validation: Zod schemas
Utils:     Helper functions (ice coordinates, age groups)
Analytics: Game statistics calculations
```

---

## 🔑 CRITICAL DECISIONS (Quick Reference)

| Decision | Rationale |
|----------|-----------|
| **Polymorphic events table** | Simpler queries, easier to extend event types |
| **Age stored as integer** | USA/Canada formatting at display layer only |
| **Goal = shot with result='goal'** | Eliminates redundancy, cleaner data model |
| **Database persistence + optimistic updates** | Better UX, handles slow connections |
| **Mobile-first design** | Coaches track games at rinks on phones |
| **Team context with localStorage** | Multi-team support, persists selection |
| **Ice-click-first event logging** | Ice surface is primary interaction |
| **PWA with fullscreen support** | Works offline, fullscreen on iOS via home screen |
| **Monorepo with shared package** | Single source of truth for business logic |
| **Expo Router for mobile navigation** | File-based routing (like Next.js), simpler mental model |
| **AsyncStorage for auth tokens** | Supabase handles encryption, sufficient for tokens |
| **React Native + Expo (not Capacitor)** | Better native performance, larger ecosystem |

**Full list**: See `docs/TROUBLESHOOTING.md` for detailed explanations

---

## 📊 PROJECT STATUS

### Web App (MVP)
**Phase 7**: ✅ Complete - All milestones done! 🎉
**Test Coverage**: 384/409 tests passing (93.9%)

**Recent Milestones** ✅:
- [x] Organization auto-creation
- [x] Team creation & management
- [x] Player roster management
- [x] Team selector & context (multi-team support)
- [x] Roster integration with game tracking
- [x] Team invitation system (email + shareable links)
- [x] User settings & team switching

### Mobile App (Native iOS + Android) - NEW! 📱
**Phase 3**: ✅ Complete - Setup & testing infrastructure
**Phase 4-5**: 🚧 In Progress - Core screens (Weeks 4-6)

**Completed** ✅:
- [x] Expo app with tabs template
- [x] Jest + React Native Testing Library setup
- [x] Supabase client configured (AsyncStorage)
- [x] Test helpers and mock factories
- [x] Linked to @hockeypilot/shared package
- [x] Bundle IDs configured (com.hockeypilot.app)

**Next Up** 🚧:
- [ ] Auth context provider
- [ ] UI component library (Button, Input, Text)
- [ ] Auth screens (login, signup, forgot password)
- [ ] Teams & roster screens
- [ ] Game tracking with IceSurface component

**See**: `docs/MOBILE_APP_DEVELOPMENT.md` for detailed Phase 4-5 plan

---

## 🛠️ LOCAL DEVELOPMENT

### Quick Start - Web App
```bash
npm run dev          # Start Next.js (http://localhost:3000)
npx supabase start   # Start local Supabase
npm run test         # Run Vitest tests
```

### Quick Start - Mobile App 📱
```bash
cd packages/mobile
npm start            # Start Expo dev server
npm test             # Run Jest tests
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
```

### Demo Pages (Web)
- 🏆 `/demo/teams` - Teams list
- 👥 `/demo/teams/[teamId]/roster` - Roster management
- 🤝 `/demo/teams/[teamId]/members` - Team members & invitations
- ⚙️ `/demo/teams/[teamId]/settings` - Team settings (edit/delete team)
- 👤 `/demo/settings` - User settings (profile, preferences)
- 🏒 `/demo/game-tracking` - Live game tracking
- 📊 `/demo/analytics` - Post-game analytics
- 📚 `/demo/drills` - Drill library
- ⚙️ `/demo/practice-builder` - Manual practice builder
- 📋 `/demo/practice-history` - Practice history

### Development Tools
- 🗄️ http://localhost:54323 - Supabase Studio
- 📧 http://localhost:54324 - Mailpit (email testing)

---

## 💡 QUICK START FOR NEW AI SESSIONS

### 1. First Steps
1. Read this file for project context
2. Check `docs/PHASE_7_PROGRESS.md` for current milestone
3. Review `docs/TROUBLESHOOTING.md` if user reports an issue
4. See `docs/COMPONENTS_INVENTORY.md` for component locations

### 2. When Adding Features
- Write tests FIRST (TDD approach)
- Update `docs/COMPONENTS_INVENTORY.md` if adding components
- Add common problems to `docs/TROUBLESHOOTING.md`
- Update phase progress in `docs/PHASE_7_PROGRESS.md`

### 3. When Troubleshooting
- Check `docs/TROUBLESHOOTING.md` first
- Verify RLS policies in `docs/DATABASE_REFERENCE.md`
- Check component tests in `docs/COMPONENTS_INVENTORY.md`

### 4. When Making Decisions
- Check if already decided (see Critical Decisions above)
- Document rationale for new decisions
- Consider impact on mobile UX
- Update relevant docs

---

## 🧪 TESTING APPROACH

**Philosophy**: Write tests FIRST, then implement features

**Coverage Goals**:
- Core business logic: 100%
- Database operations: 100%
- API routes: 95%+
- UI components: 80%+

**See**: `docs/TESTING_GUIDE.md` for patterns

---

## 🎨 CURRENT FEATURES

### ✅ Completed
- User auth (email/password + reset flow)
- Organization + team + player management
- Team invitation system (email + shareable links with email validation)
- User settings & profile management
- Team settings & management (edit/delete teams)
- Live game tracking (6 event types) with real roster data
- Interactive ice surface (tap-to-log)
- Post-game analytics dashboard with player stats table
- Player statistics breakdown (sortable by shots, goals, turnovers, etc.)
- AI practice plan generation
- Practice history & manual builder
- Team selector with multi-team support
- UserMenu with email verification indicator
- PWA with fullscreen mode
- Mobile-first responsive design

### 🚧 In Progress
- None - MVP complete!

### 📋 Deferred to Post-MVP
- Offline support (IndexedDB + sync)
- Stripe integration
- Multi-tracker collaboration
- Season-long trends
- Comparative analytics

---

## 🐛 COMMON ISSUES

**Quick Links**:
- Age group confusion → `docs/TROUBLESHOOTING.md` (Age Group System)
- 406 errors with multiple teams → `docs/TROUBLESHOOTING.md` (Multi-team Support)
- AI drill matching → `docs/TROUBLESHOOTING.md` (AI & Practice Planning)
- RLS policy violations → `docs/DATABASE_REFERENCE.md` (RLS Policies)

**Full guide**: `docs/TROUBLESHOOTING.md`

---

## 📝 TODO: HIGH-PRIORITY

### Before Next Session
- [ ] None - ready to continue!

### Before Launch
- [ ] Design onboarding flow for new coaches
- [ ] Beta test with 3-5 real teams (full season)
- [ ] Performance testing (50+ events per game)
- [ ] E2E tests for critical paths

---

## 🎯 WHAT TO WORK ON NEXT?

**Current Focus**: 📱 **Native Mobile App Development** (Phase 4-5)

### Mobile App - Week 4: Auth & Foundation 🚧 IN PROGRESS

**Recently Completed** ✅:
- Phase 3: Expo setup with testing infrastructure
- Supabase client configured for React Native
- Test helpers and mock factories

**Next Tasks** (in order):
1. **Auth Context Provider**
   - Create auth context with session management
   - Write tests for auth state changes
   - Handle login/logout flows

2. **UI Component Library**
   - Button, Input, Text components (TDD)
   - Consistent design system
   - 80%+ test coverage

3. **Auth Screens**
   - Login screen (TDD)
   - Signup screen (TDD)
   - Forgot password screen (TDD)

**See**: `docs/MOBILE_APP_DEVELOPMENT.md` for detailed Week 4-6 plan

---

### Alternative Options (if pausing mobile work):

#### Option A: Web App Polish & Testing 🧪
- Write integration tests for team invitation system
- Add E2E tests for critical user flows
- Performance testing with 50+ events per game

#### Option B: Web App Post-MVP Features 🚀
- **Offline Support**: IndexedDB + background sync
- **Stripe Integration**: Payment processing
- **Season Analytics**: Long-term trend analysis

**See**: `docs/PHASE_7_PROGRESS.md` for web app details

---

**Last Updated**: 2025-11-05
**Maintained By**: Brock Arnold + Claude
**Project Name**: HockeyPilot (formerly HP2)

---

## 💬 ASSISTANT INSTRUCTIONS

When the user asks what to work on:
1. **Mobile App**: Check `docs/MOBILE_APP_DEVELOPMENT.md` for current tasks (Phase 4-5)
2. **Web App**: Check `docs/PHASE_7_PROGRESS.md` (complete, see post-MVP options)
3. Offer to continue with the next task in the plan
4. Or ask what specific feature/issue they want to address

When working on mobile app:
1. Follow TDD approach (write tests first!)
2. Reuse code from `@hockeypilot/shared` when possible
3. Check `docs/MOBILE_APP_SETUP.md` for setup verification
4. Run `npm test` in packages/mobile frequently

When encountering an error:
1. Check `docs/TROUBLESHOOTING.md` for known issues
2. Check `docs/DATABASE_REFERENCE.md` for schema/RLS issues
3. Check `docs/COMPONENTS_INVENTORY.md` for component locations
4. Check `docs/MOBILE_APP_SETUP.md` for mobile-specific issues

When adding documentation:
1. Add to appropriate specialized doc (not this file!)
2. Update the Documentation Index above with a link
3. Keep this file under 400 lines
