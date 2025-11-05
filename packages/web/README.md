# HP2 - Hockey Practice Planner v2

> AI-powered practice planning with live game tracking for youth hockey coaches

[![Status](https://img.shields.io/badge/status-in%20development-green.svg)](https://github.com/yourusername/HP2)
[![Tests](https://img.shields.io/badge/tests-234%20passing-brightgreen.svg)](https://github.com/yourusername/HP2)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🏒 What is HP2?

HP2 is a modern web application that transforms how youth hockey coaches plan practices. By combining **real-time game event tracking** with **AI-powered practice plan generation**, coaches get data-driven recommendations that address their team's specific weaknesses.

### The Problem
Coaches rely on memory and subjective impressions after games. "We need to work on breakouts" is vague. Which side of the ice? What specific situation? How often did it happen?

### The Solution
- **Live Game Tracking**: Track shots, breakouts, turnovers, and zone entries in real-time using a mobile-friendly interface
- **Objective Analytics**: Generate heat maps, success rates, and insights from tracked data
- **AI Practice Plans**: Get customized practice plans that target specific issues identified in game tracking
- **Offline-First**: Works without WiFi (common in hockey rinks) with automatic sync when back online

## 🎯 Key Features

### ✅ Implemented

- **Live Game Event Tracking** ✅
  - Interactive ice surface for tap-to-log shot tracking
  - Defensive event tracking (breakouts, turnovers, zone entries, faceoffs)
  - Live stats during games (running totals, success rates)
  - Event editing (undo/delete during and after games)
  - Database persistence with optimistic updates
  - Demo: `/demo/game-tracking`

- **Post-Game Analytics** ✅
  - Shot chart visualization on ice surface
  - Shot quality breakdown (high/medium/low danger)
  - Breakout success rates by type
  - Period-by-period trends (shots, goals, turnovers)
  - Shooting percentage by situation (ES/PP/PK)
  - Auto-generated insights
  - Dashboard with filters (period, situation)
  - Demo: `/demo/analytics`

- **Team & Player Management** ✅
  - Database schema for organizations, teams, players
  - Supports both USA and Canadian age groups
  - Player selection by jersey number

### 🚧 In Progress

- **AI-Powered Practice Planning** (Phase 4-6)
  - Generates practice plans based on tracked game data
  - Suggests drills that address specific weaknesses
  - Considers age group, skill level, and ice time
  - Drill library with 200+ hockey drills

### 📋 Planned

- **Offline Support** (Post-MVP)
  - Works without WiFi (common in hockey rinks)
  - IndexedDB for local storage
  - Automatic sync when back online

- **Additional Features** (Post-MVP)
  - Season-long analytics trends
  - Comparative analytics (vs league benchmarks)
  - Multi-tracker collaboration
  - Video drill library

## 🏗️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Edge Functions)
- **Testing**: Vitest, React Testing Library, Playwright
- **State Management**: Zustand
- **Offline Support**: IndexedDB (Dexie.js), Service Workers (PWA)
- **Canvas**: Konva.js (interactive ice surface)
- **Charts**: Recharts (analytics visualizations)
- **AI**: OpenAI GPT-4 (practice plan generation)
- **Payments**: Stripe (Checkout + Customer Portal)

## 📊 Project Status

**Current Phase**: Phase 3 Complete - Analytics Dashboard Live! 🎉

We're following a **Test-Driven Development (TDD)** approach with comprehensive testing throughout.

**Progress**:
- [x] Product planning (features, user flows, monetization) - 100%
- [x] Database schema design - 100%
- [x] TDD approach defined - 100%
- [x] Tech stack decisions - 100%
- [x] Project initialization - 100%
- [x] **Phase 1: Foundation** - 100% ✅
  - Next.js + Supabase setup
  - Core utilities (age groups, shot quality, coordinates)
  - Testing infrastructure (Vitest + Playwright)
- [x] **Phase 2: Game Tracking** - 100% ✅
  - Interactive ice surface component
  - Event logger with 6 event types
  - Database persistence with optimistic updates
  - Live stats and event management
- [x] **Phase 3: Post-Game Analytics** - 100% ✅
  - Shot chart visualization
  - Shot quality and breakout analysis
  - Period-by-period trends
  - Analytics dashboard with filters
- [ ] **Phase 4-6: Practice Planning & AI** - 0%
  - Drill library
  - Practice plan builder
  - AI integration with OpenAI

**Test Coverage**: 234/236 tests passing (99.2% success rate)
**MVP Completion**: ~50% (on track!)
**Target Beta Launch**: 10-12 weeks from start

## 📚 Documentation

All project documentation is in the `docs/` directory:

- **[CLAUDE.md](CLAUDE.md)** - Central documentation hub with quick references, decisions log, and context for AI assistants
- **[Product Plan](docs/HOCKEY_PRACTICE_APP_PLAN.md)** - Complete product specification, features, user flows, and monetization strategy
- **[Dev Setup & Data Models](docs/DEV_SETUP_AND_DATA_MODELS.md)** - Development environment setup, database schema, and TDD approach

**Quick Start for Contributors**: Read [CLAUDE.md](CLAUDE.md) first for project overview and context.

## 🎨 Key Differentiators

1. **Objective Game Data**: Only app combining live tracking with practice planning
2. **AI with Context**: Generates plans from actual tracked game data, not coach memory
3. **Mobile-First Tracking**: Works offline in rinks, syncs later
4. **Actionable Insights**: "You failed 68% of left-side breakouts" → specific drill recommendations
5. **Complete Solution**: Game tracking → Analytics → Practice planning → Execution in one app

## 🌎 Market Coverage

**Target Market**: North American youth hockey (ages 8-18)

- **USA Age Groups**: 8U, 10U, 12U, 14U, 16U, 18U (2-year bands)
- **Canada Age Groups**: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year)

The app intelligently handles both conventions with a unified data model.

## 💰 Business Model

**Freemium SaaS** with tiered subscriptions:

- **Free Tier**: 3 tracked games/season with full features (taste the value)
- **Premium** ($14.99/mo): Unlimited tracking, full analytics, AI practice plans
- **Pro** ($29.99/mo): Season trends, comparative analytics, data export

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase CLI (`npm install -g supabase`)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hp2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start Supabase locally**
   ```bash
   npx supabase start
   ```
   This will output your local Supabase credentials. Copy them to `.env.local`.

5. **Run migrations**
   ```bash
   npx supabase db reset
   ```

6. **Generate TypeScript types**
   ```bash
   npm run generate-types
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Try the demos!**
   - Game Tracking: http://localhost:3000/demo/game-tracking
   - Analytics Dashboard: http://localhost:3000/demo/analytics

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests only
npm test tests/integration
```

### Local Development Tools

After running `npx supabase start`, you'll have access to:

**Supabase Studio** (Database GUI)
- URL: http://localhost:54323
- View tables, run SQL queries, manage RLS policies

**Email Inbox** (Inbucket/Mailpit)
- URL: http://localhost:54324
- View all emails sent by the app (confirmation emails, password resets, etc.)
- Useful for testing auth flows without real email delivery

### Database Management

```bash
# Create a new migration
npx supabase migration new migration_name

# Reset database (applies all migrations)
npx supabase db reset

# Generate TypeScript types from database schema
npm run generate-types
```

## 🧪 Testing Strategy

We're committed to **Test-Driven Development**:

- **Core business logic**: 100% coverage
- **Database operations**: 100% coverage
- **API routes**: 95%+ coverage
- **UI components**: 80%+ coverage
- **E2E critical paths**: 100% coverage

Write tests **first**, then implement features.

## 🤝 Contributing

This project is currently in early planning stages. Contribution guidelines will be added once the codebase is initialized.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Youth hockey coaches who provided invaluable feedback on the live tracking feature
- The hockey analytics community for shot quality models and best practices

---

**Built with ❤️ for hockey coaches who want to make every practice count.**

*Note: This project is under active development. Features and documentation are subject to change.*
