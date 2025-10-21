# HP2 - Hockey Practice Planner v2

> AI-powered practice planning with live game tracking for youth hockey coaches

[![Status](https://img.shields.io/badge/status-planning-blue.svg)](https://github.com/yourusername/HP2)
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

## 🎯 Key Features (Planned)

- ✅ **Live Game Event Tracking**
  - Interactive ice surface for tap-to-log shot tracking
  - Defensive event tracking (breakouts, turnovers, zone entries)
  - Live stats during games
  - Post-game editing and correction
  - Works offline with automatic sync

- ✅ **Post-Game Analytics**
  - Shot chart heat maps
  - Breakout success rates by zone
  - Turnover location analysis
  - AI-generated insights

- ✅ **AI-Powered Practice Planning**
  - Generates practice plans based on tracked game data
  - Suggests drills that address specific weaknesses
  - Considers age group, skill level, and ice time
  - Drill library with 200+ hockey drills

- ✅ **Team Management**
  - Multi-team organization support
  - Player roster management
  - Practice history tracking
  - Supports both USA and Canadian age groups

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

**Current Phase**: Planning & Design ✅

We're following a **Test-Driven Development (TDD)** approach with comprehensive planning before implementation.

**Progress**:
- [x] Product planning (features, user flows, monetization)
- [x] Database schema design
- [x] TDD approach defined
- [x] Tech stack decisions
- [ ] Project initialization
- [ ] Phase 1: Foundation (0%)
- [ ] Phase 2: Game Tracking (0%)
- [ ] Phase 3: Analytics (0%)
- [ ] Phase 4-6: Practice Planning (0%)

**Target MVP**: 6-8 weeks from start
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

## 🚀 Getting Started (Coming Soon)

Currently in planning phase. Setup instructions will be added once project initialization begins.

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
