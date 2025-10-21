# Hockey Practice Planner - Product Plan

## Overview
An AI-powered practice planning platform for youth hockey coaches and team managers that generates customized practice plans based on **live game tracking data**, game feedback, practice history, and team profiles.

## The Key Differentiator: Live Game Tracking

**The Problem**: Coaches rely on memory and subjective impressions after games. "We need to work on breakouts" is vague. Which side of the ice? What specific situation? How often did it happen?

**The Solution**: Real-time game tracking on mobile that captures objective data during games. Team managers or volunteers tap events on an interactive ice surface, creating a precise record of what actually happened.

**The Value**:
- **Objective data replaces coach memory**: "You failed 10/14 breakouts on the left side" vs. "Breakouts were bad"
- **Precise practice plans**: AI generates drills that address specific tracked issues (e.g., left-side breakout drills)
- **Visual proof for players**: Show shot charts and heat maps in team meetings
- **Development tracking**: See improvement over time with season-long analytics
- **Coaching credibility**: Parents see data-driven coaching, not guesswork

**Why coaches will pay for this**: Saves 2-3 hours per week (manual stat tracking + practice planning) and dramatically improves practice effectiveness. The tracking feature creates a "moat" - once a team has 5-10 games tracked, they won't switch to a competitor.

## Core Features

### 1. Organizations & Team Management
**Purpose**: Multi-level hierarchy for clubs with multiple teams

- Organization-level settings (club branding, shared drill library)
- Multiple teams per organization
- Team profiles: age group, skill level, season schedule
- Team roster management
- Role-based access: Org Admin, Head Coach, Assistant Coach, Team Manager

**Key Considerations**:
- Allow coaches to belong to multiple teams/orgs
- Team transfer/archiving at season end
- Shared vs team-specific drill libraries

### 2. Player Management
**Purpose**: Track individual player development and needs

- Player profiles: name, number, position(s), birthdate
- Position preferences (primary/secondary)
- Skill ratings (skating, shooting, passing, game sense, etc.)
- Attendance tracking
- Development goals and notes
- Parent/guardian contact info (for team managers)

**Enhanced Ideas**:
- Position grouping for drill assignment (forwards, defense, goalies)
- Skill progression tracking over time
- Injury/absence status
- Ice time/shift tracking integration (future enhancement)

### 3. Live Game Tracking
**Purpose**: Capture objective, real-time game data to drive practice planning

**This is a game-changer feature** based on real coach feedback. Instead of relying solely on memory and subjective impressions, team managers can track key events during the game using a mobile-friendly interface. This data becomes the foundation for targeted, data-driven practice plans.

#### Shot Tracking
**Interface**: Interactive ice surface diagram on mobile device

**Quick Capture** (5-second workflow):
1. Tap ice location where shot was taken
2. Select shooter (jersey number or quick roster)
3. Select result: Goal, Save, Miss, Blocked
4. Auto-timestamp and situation detection (even strength, PP, PK)

**Data Captured**:
- Shot location (x, y coordinates on ice)
- Shooter identity
- Shot type (wrist, slap, snap, backhand, deflection, one-timer)
- Shot result (goal, save, miss high/wide, blocked, post)
- Game situation (5v5, power play, penalty kill, empty net)
- Period and time
- Shot quality indicator (high danger, medium, low based on location)

**Value for Practice Planning**:
- Heat maps show where team shoots from (vs. where they should)
- Identify players who aren't shooting enough
- Reveal shooting percentage by location
- Compare actual shot chart to "optimal" shot chart
- AI suggests drills: "Team only took 2 shots from slot all game → practice net-front drills"

#### Defensive Event Tracking
**Quick-Log Events**:

**Breakouts**:
- Tap zone exit location
- Success (clean exit) or Failure (turnover)
- Breakout type: Up boards, Center ice, Cross-ice pass, Carry
- If failure: where turnover occurred

**Zone Entries Against**:
- Where opponent entered defensive zone
- Entry type: Dump, Carry, Pass
- Result: Controlled/uncontrolled
- Which defender(s) involved

**Defensive Breakdowns**:
- One-tap logging: "Odd-man rush", "Lost coverage", "Weak-side breakdown", "Screen/tip"
- Ice location where breakdown occurred
- Players involved (optional, can add later)

**Turnovers/Giveaways**:
- Ice location
- Turnover type: Bad pass, Lost puck, Forced by opponent
- Situation: Breakout, neutral zone, offensive zone

#### Special Teams Tracking
- Faceoff win/loss (location, who took it)
- Power play shot attempts and quality
- Penalty kill clears vs. extended pressure
- Special teams time of possession

#### Quick Event Buttons
For rapid logging without precision:
- "Great defensive play" (tap player)
- "Odd-man rush against"
- "Sustained O-zone pressure"
- "Failed breakout"
- "Penalty" (auto-link to game clock)

#### Player-Specific Tracking (Optional)
- Ice time estimation (simple +/- buttons per shift)
- Notable plays (good or bad)
- Position played (if rotating)

#### Post-Game Analytics Dashboard

**Shot Analysis**:
- Shot chart heat map (where shots came from)
- Shot quality analysis (% from high-danger areas)
- Shooting percentage by zone
- Comparison to league average shot distribution
- Individual player shot metrics

**Defensive Analysis**:
- Breakout success rate (overall + by zone)
- Turnover heat map (where team lost pucks)
- Zone entry defense (where opponent got in easily)
- High-danger chances against by location

**Trends & Insights**:
- "Team attempted only 3 shots from slot (8% of shots, league avg: 25%)"
- "68% of breakouts failed along left boards"
- "Opponent entered zone easily on right side (9 entries, 7 controlled)"
- "Team turned puck over in neutral zone 12 times"

**AI-Generated Practice Recommendations**:
Based on tracked data:
- "Practice net-front shooting drills (low slot shot volume)"
- "Work on left-side breakouts (68% failure rate)"
- "Defensive zone coverage drills (weak-side breakdowns: 5)"
- "Neutral zone transition drills (12 turnovers in NZ)"

#### Mobile-First Interface Design

**Live Tracking View**:
```
┌─────────────────────────────┐
│  Period 2  |  12:45  |  2-1 │
│  Shots: 12  SOG: 8  Goals: 2│  ← Live stats during game
├─────────────────────────────┤
│                             │
│    [Ice Surface Diagram]    │  ← Tap to log events
│                             │
├─────────────────────────────┤
│ Quick Actions:              │
│ [Shot] [Turnover] [Faceoff]│
│ [Zone Entry] [Breakdown]    │
├─────────────────────────────┤
│ Recent: Shot - #12 - Save   │  ← Last event logged
└─────────────────────────────┘
```

**Live Stats Panel** (expandable during game):
- Running shot totals (attempts, on goal, goals)
- Breakout success rate (live calculation)
- Turnovers count by zone
- Faceoff win percentage
- Power play opportunities and conversions
- Quick comparison to team averages (if available)

**Shot Logging Flow**:
1. Tap "Shot" button or tap ice location
2. Ice surface highlights, tap precise location
3. Quick player selector (jersey numbers in grid)
4. Result buttons appear: [Goal] [Save] [Miss] [Block]
5. Event saved, ready for next

**Ice Surface Representation**:
- SVG-based zoomable ice rink
- Color-coded zones (defensive, neutral, offensive)
- Tap anywhere to register event location
- Heat map overlay option during game

#### Integration with Practice Planning

**Automatic Feedback Generation**:
After game, system analyzes tracked data and auto-generates structured feedback:

```
OFFENSE:
- Shot volume: 18 shots (below target of 25)
- Shot quality: 22% from high-danger areas (league avg: 30%)
- Focus area: Net-front presence

DEFENSE:
- Breakouts: 55% success rate (14/25 failed)
- Problem area: Left-side breakouts (10 failures)
- Zone entries against: 18 (12 controlled - need better gap control)

SPECIAL TEAMS:
- Power play: 1/4 (25%, 6 shots on 4 opportunities)
- PK: 3/3 (100%, good job)

RECOMMENDED DRILLS:
1. Slot shooting drills (address low-danger shot selection)
2. Breakout progression - left side focus
3. 1v1 gap control in neutral zone
4. Power play net-front traffic simulation
```

This data feeds directly into AI practice plan generation with objective evidence.

#### Event Editing & Management
**Post-Game Editing** (Must-Have for MVP):
- View all logged events in chronological list
- Edit event details (change location, player, result, timestamp)
- Delete incorrect events (fat-finger mistakes)
- Add missed events post-game (coach remembers something)
- Bulk delete/edit by period or event type
- Edit history/audit log (who changed what, when)
- Lock game data after coach approves (prevent accidental changes)

**During Game Quick Edit**:
- Undo last event (within 30 seconds)
- Quick correction flow (tap event in recent list → edit)

**Use Cases**:
- "I tapped the wrong player for that shot"
- "That wasn't a turnover, it was a forced dump"
- "I forgot to log the last 2 shots of the period"
- "Coach wants to add a defensive breakdown they noticed"

#### Offline-First Design
- Track game without internet (common in rinks with poor WiFi)
- All data stored in IndexedDB locally
- Syncs when connection restored (background sync API)
- Visual indicator: "Offline - will sync when connected"
- Export raw data as CSV for external analysis
- Local storage limit: 50 games offline (then warn to sync)

#### Team Manager Role
- Dedicated "Stat Tracker" role (doesn't need coaching access)
- Parent volunteer can track game
- ~~Multiple trackers can collaborate~~ (Post-MVP: merging data)
- Coach reviews and approves data post-game
- Permissions: Tracker can edit own tracked events, coach can edit all

### 4. Game Feedback System (Subjective)
**Purpose**: Capture post-game insights to complement objective tracking data

**Feedback Types**:
- Quick feedback: Select from common issues (power play struggles, defensive zone coverage, breakouts, etc.)
- Detailed feedback: Free-form notes on specific situations
- Positive highlights: What worked well
- Individual player notes
- Opponent analysis (optional)
- **NEW**: Review auto-generated insights from live tracking and add context

**Data Collection**:
- Pre-defined categories: Offense, Defense, Special Teams, Skating, Discipline
- Severity/priority levels
- Time-based relevance (address this week vs ongoing focus)
- **Integration**: Combines with live tracking data for complete picture

### 5. Practice History & Tracking
**Purpose**: Learn from past practice effectiveness

- Date, duration, attendance
- Drills executed (with time allocation)
- Coach notes on execution
- Drill effectiveness ratings
- Player engagement scores
- Focus areas addressed

**Key Value**:
- Avoid drill repetition fatigue
- Identify most effective drills for this team
- Balance practice variety with skill reinforcement

### 6. AI-Powered Practice Plan Generator
**Purpose**: Create tailored practice plans based on multiple inputs

**Input Factors**:
- **Live game tracking data** (objective: shot charts, breakout success rates, turnover locations)
- Recent game feedback (subjective coach observations, weighted by recency)
- Team skill level and age group
- Available ice time
- Number of players/coaches
- Equipment availability (cones, nets, pucks, etc.)
- Season phase (early, mid, late, playoffs)
- Practice frequency
- Past practice history (avoid repetition)

**Generation Logic**:
- Template-based plans with AI customization
- Drill sequencing (warm-up → skill development → game situations → cool down)
- Time allocation based on practice duration
- Drill difficulty matching team level
- Variety balancing (don't repeat same drill within X practices)
- Coach-to-player ratio considerations

**Output**:
- Full practice plan with timeline
- Drill descriptions, diagrams, and setup instructions
- Equipment checklist
- Coaching points for each drill
- Printable/shareable PDF
- Mobile-friendly view for on-ice reference

### 7. Drill Library
**Purpose**: Comprehensive, searchable database of hockey drills

**Drill Attributes**:
- Name, description, diagram
- Category: skating, passing, shooting, puck handling, defensive, offensive, transition, goalie
- Tags: age-appropriate, skill level, focus area
- Time estimate
- Space requirements (full ice, half ice, station)
- Player count (3v3, 5v5, small group, individual)
- Equipment needed
- Coaching points
- Video examples (optional premium feature)
- Effectiveness ratings (crowd-sourced + team-specific)
- **NEW**: Linked to game situations (addresses specific shot locations, breakout issues, etc.)

**Library Sources**:
- Pre-populated with 200+ proven drills
- User-submitted drills (moderated)
- Org-specific custom drills
- Favorite/bookmarking system

### 8. Feedback & Recommendation Loop
**Purpose**: Continuous improvement through coach feedback

- Post-practice drill ratings (1-5 stars)
- Quick feedback: "Too easy", "Too hard", "Players loved it", "Needs more time"
- Team-specific drill performance history
- ML model learns team preferences over time
- Recommendation engine improves with usage

### 9. Premium Features (Stripe Integration)
**Purpose**: Monetization via subscription tiers

**Free Tier**:
- 1 team per user
- Manual practice planning (drill library access)
- Basic game feedback tracking (subjective only)
- Limited practice history (last 10 practices)
- **Limited live tracking**: 3 games per season with FULL tracking (shots + defensive events + live stats)

**Premium Tier** ($14.99/month or $119/year):
- Unlimited teams
- **Full live game tracking** (shots, defense, all events)
- **Post-game analytics dashboard** (heat maps, insights)
- AI practice plan generation (10 plans/month with live tracking integration)
- Full practice history
- Advanced analytics dashboard
- PDF export with custom branding
- Priority support

**Pro Tier** ($29.99/month or $249/year):
- Everything in Premium
- Unlimited AI generations
- **Season-long tracking analytics** (trends over time, player development)
- **Comparative analytics** (team vs. league benchmarks)
- Video drill library access
- Team analytics and player development tracking
- Organization-wide features (shared drill library, reporting, multi-team analytics)
- **Export game data** (CSV, JSON for external analysis)
- API access (future: integrate with other tools)
- Multiple stat trackers per game (collaborative tracking)

## User Flows

### Primary Flow: Live Game Tracking → Practice Plan Generation

1. **Pre-Game Setup**
   - Login to app on mobile device
   - Select scheduled game from calendar
   - Confirm roster (mark absent players)
   - Assign stat tracker role (coach, manager, or volunteer)

2. **Live Game Tracking** (during game)
   - Tap events on ice surface diagram as they happen
   - Log shots: location, shooter, result
   - Log defensive events: breakouts, turnovers, zone entries
   - Quick buttons for common events
   - App works offline (syncs later)

3. **Post-Game Review** (immediately after game or next day)
   - Review auto-generated analytics dashboard
   - View shot chart heat maps
   - See breakout success rates and trouble areas
   - Read AI-generated insights
   - Add subjective coach feedback/notes
   - Approve/edit tracked data

4. **Generate Practice Plan** (based on game data)
   - Click "Generate Practice Plan from Last Game"
   - AI analyzes live tracking data + historical patterns
   - Suggests specific drills addressing identified weaknesses
   - Example: "Low slot shot volume detected → Net-front shooting drills"
   - Review generated plan

5. **Customize Plan**
   - Swap drills (see alternatives)
   - Adjust timing
   - Add/remove drills
   - Add custom notes

6. **Execute Practice**
   - Save to practice history
   - Export PDF or share link
   - Print for on-ice use
   - Use mobile view during practice

7. **Post-Practice Feedback Loop**
   - Mark attendance
   - Rate drill effectiveness
   - Add coach notes on what worked
   - System learns: effective drills ranked higher for this team

### Secondary Flows

**Team Setup Flow**:
1. Create organization → Create team → Add players → Set team profile

**Drill Discovery Flow**:
1. Browse drill library → Filter by category/age/skill → Preview drill → Add to favorites

**Quick Game Feedback Flow** (without live tracking):
1. Select game → Use quick feedback form → Flag issues → Generate practice plan

**Subscription Flow**:
1. Hit free tier limit (3 tracked games) → View pricing → Stripe checkout → Unlock unlimited tracking

**Season Analytics Review** (Pro tier):
1. Dashboard → Season view → See trends over time → Identify persistent issues → Adjust coaching focus

## Data Model (Key Entities)

```
Organizations
├── Teams
│   ├── Players
│   ├── Games
│   │   ├── Game Feedback (subjective)
│   │   └── Game Events (live tracking)
│   │       ├── Shots (x, y, player, type, result, timestamp, situation)
│   │       ├── Defensive Events (breakouts, turnovers, zone entries)
│   │       ├── Special Teams Events (faceoffs, PP/PK stats)
│   │       └── Game Analytics (computed: heat maps, success rates)
│   ├── Practices
│   │   └── Practice Drills (many-to-many with ratings)
│   └── Team Profile (skill level, age group, etc.)
├── Users (with roles: Coach, Manager, Stat Tracker)
└── Custom Drills

Drills (global library)
├── Categories
├── Tags
├── Effectiveness Ratings (aggregated)
├── Usage Stats
└── Game Situation Mappings (links drills to tracked issues)

Subscriptions (Stripe)
└── Linked to Users/Organizations

Analytics Cache
├── Team Season Stats (aggregated from all games)
├── Player Development Metrics
└── Drill-to-Outcome Correlations
```

## Tech Stack Recommendations

**Frontend**:
- Next.js 14+ (App Router)
- React Server Components
- TailwindCSS + shadcn/ui
- React Hook Form + Zod validation
- **Konva.js or Fabric.js** (interactive ice surface canvas)
- **D3.js or Recharts** (heat maps and analytics visualizations)
- **PWA support** (offline-first for rink tracking, service workers)

**Backend**:
- Supabase (PostgreSQL + Auth + Storage + RLS)
- Supabase Edge Functions for AI generation
- OpenAI API for practice plan generation
- **PostGIS** (spatial queries for shot location analysis)
- **pg_cron** (scheduled analytics aggregation)

**Authentication**:
- BetterAuth (as mentioned) or Supabase Auth
- Role-based access: Coach, Manager, Stat Tracker

**Payments**:
- Stripe Checkout + Customer Portal
- Stripe Webhooks for subscription management
- Usage-based metering (track games tracked per month)

**AI/ML**:
- OpenAI GPT-4 for practice plan generation
- Vector embeddings for drill similarity/recommendations
- **Statistical analysis**: Shot quality models, expected goals (xG)
- Future: Fine-tuned model on hockey coaching data

**Mobile/Offline**:
- PWA (installable web app)
- IndexedDB for offline game tracking
- Background sync when connection restored
- Push notifications (game reminders, new practice plans)

**Analytics**:
- **Chart.js or Recharts** for visual analytics
- **Heat map generation** (shot charts, turnover locations)
- **CSV/JSON export** for Pro tier

**Deployment**:
- Vercel (frontend + edge functions)
- Supabase hosted database
- Cloudflare for CDN + edge caching

## MVP Scope (Phase 1 - 6-8 weeks)

**Must Have**:
- User auth (email/password)
- Organization + Team creation
- Player roster management
- Basic drill library (100 pre-loaded drills)
- **Live game tracking** (BOTH shot tracking + defensive events)
  - Shot tracking: location, shooter, result, type
  - Defensive events: breakouts (success/fail), turnovers, zone entries
  - Special teams: faceoffs, basic PP/PK tracking
  - **Live stats display during game** (running totals, quick views)
- **Interactive ice surface** (SVG-based, mobile-optimized, tap to log)
- **Event editing system** (post-game editing/deletion of tracked events)
- **Offline tracking support** (PWA with IndexedDB, background sync)
- **Post-game analytics** (shot charts, heat maps, breakout success rates)
- Manual practice plan builder (drag-and-drop drills)
- Practice history
- Game feedback form (subjective, complements tracking data)
- AI plan generation (integrates live tracking data + context)

**Explicitly Post-MVP**:
- Stripe integration (launch free tier only, add paid later)
- **Multi-tracker collaboration** (merging data from multiple stat trackers)
- Advanced season-long analytics
- Video drill content
- Comparative team analytics (vs. league benchmarks)
- Native mobile apps (PWA sufficient for MVP)

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- Database schema + RLS policies (including game_events tables)
- Auth setup with role-based access
- Org/Team/Player CRUD
- Basic UI shell (desktop + mobile responsive)
- PWA setup (manifest, service worker skeleton)

### Phase 2: Ice Surface & Game Tracking (Weeks 3-4)
**This is the differentiator feature**
- Interactive ice surface component (SVG-based for easier interactions)
- Shot tracking interface (tap to log with quick flow)
- Defensive event tracking (breakouts, turnovers, zone entries)
- Event logging system (all event types)
- **Live stats display** (running totals, expandable stats panel)
- **Event editing UI** (during game: undo, post-game: full edit capabilities)
- **Event list view** (chronological, filterable by type/period)
- Offline data storage (IndexedDB)
- Background sync implementation (sync when online)
- Game event data models (with edit history/audit log)
- Basic real-time validation
- Quick buttons for common events

### Phase 3: Post-Game Analytics (Week 5)
- Shot chart heat map generation
- Defensive analytics (breakout success, turnover locations)
- Analytics dashboard UI
- Auto-generated insights engine
- Data export (CSV)

### Phase 4: Drill Library (Week 6)
- Drill database + seed data (200+ drills)
- Drill browsing/search
- Drill detail pages
- Drill-to-game-situation mappings

### Phase 5: Practice Planning (Week 7)
- Manual practice builder
- Practice templates
- Practice history
- Drill drag-and-drop interface

### Phase 6: AI Integration (Week 8)
- Game feedback system (subjective)
- OpenAI integration
- Practice plan generation logic (integrates live tracking data)
- Drill recommendations based on tracked issues
- Example: "Shot chart shows low slot volume → suggest net-front drills"

### Phase 7: Polish (Week 9-10)
- PDF export
- Mobile UX refinement
- Performance optimization
- User onboarding flow
- Documentation

### Phase 8: Monetization (Post-MVP)
- Stripe integration
- Usage limits + paywalls (3 free tracked games)
- Subscription tiers
- Usage metering

### Phase 9: Enhancement (Post-Launch)
- Advanced season-long analytics
- Player development tracking over time
- Comparative team analytics (vs. league benchmarks)
- Video drill library
- Drill rating system
- Collaborative tracking (multiple stat trackers)
- Integrations (scheduling, messaging)

## Key Success Metrics

- **Game tracking adoption**: % of teams using live tracking (target: 60%+)
- **Tracking frequency**: Average games tracked per team per month (target: 3-4)
- User engagement: Practices created per team per month (target: 4+)
- **AI with data**: % of plans using AI generation with live tracking data (target: 75%)
- Drill usage: Most popular drills, drill effectiveness scores
- Retention: Monthly active coaches (target: 80% month-over-month)
- Conversion: Free to paid conversion rate (target: 15%+ within 3 games tracked)
- **Data quality**: % of tracked games with >10 events logged (target: 90%)
- NPS: Coach satisfaction score (target: 50+)
- **Time saved**: Average time to create practice plan (target: <10 minutes with AI)

## Competitive Advantages

1. **Objective game data**: Only app that combines live tracking with practice planning (massive differentiator)
2. **Hockey-specific**: Purpose-built for hockey vs generic sports tools
3. **AI with context**: Generates practice plans from actual tracked game data, not just coach memory
4. **Mobile-first tracking**: Works offline in rinks, syncs later
5. **Actionable insights**: "You failed 68% of left-side breakouts" → specific drill recommendations
6. **Feedback loop**: Gets smarter with usage (both AI and drill effectiveness)
7. **Drill quality**: Curated library from experienced coaches
8. **Data-driven coaching**: Coaches can show players/parents objective evidence of areas to improve
9. **Time savings**: Replaces hours of manual stat tracking + practice planning
10. **Complete solution**: Game tracking → Analytics → Practice planning → Execution in one app

## Additional Considerations

### Data Privacy
- COPPA compliance (youth players under 13)
- Minimal PII collection
- Parental consent flows
- Data retention policies

### Accessibility
- Mobile-first design (coaches use phones on bench)
- Offline mode for printed plans
- Large text for on-ice viewing
- Multi-language support (future)

### Community Features (Future)
- Coach discussion forums
- Drill sharing between organizations
- Best practices blog
- Coach certification/badging

### Integration Opportunities
- Calendar sync (Google, Outlook)
- Team communication tools (TeamSnap, SportsEngine)
- Video analysis platforms
- Rink scheduling systems

## Next Steps

1. **Validate assumptions**: Interview 5-10 coaches to confirm problem/solution fit
2. **Design mockups**: Create wireframes for key flows
3. **Set up development environment**: Initialize Next.js + Supabase project
4. **Build MVP**: Focus on Phase 1-4 features
5. **Beta test**: Recruit 3-5 teams for pilot season
6. **Iterate**: Gather feedback and refine before public launch

## Questions to Resolve

### Live Tracking (DECIDED)
- ✅ **Allow editing/deletion of tracked events post-game?** → YES (must-have for MVP)
- ✅ **How detailed should defensive tracking be in MVP?** → BOTH shots + defensive events (breakouts, turnovers, zone entries)
- ✅ **Show live stats during game or only post-game?** → YES show during game (running totals, expandable panel)
- ✅ **Multiple stat trackers on same game?** → POST-MVP (single tracker for MVP, merging comes later)
- What's the minimum viable tracking interface for fast input? (need to prototype)
- How to handle game situation detection (PP/PK)? Manual buttons or auto-detect from penalties?

### AI & Practice Planning
- How much customization should AI plans allow?
- Should AI explain WHY it chose specific drills (show the tracked data)?
- How to balance AI suggestions with coach preferences?

### Product & Pricing
- Freemium limit: 3 tracked games or unlimited tracking with limited analytics?
- Should organizations pay or individual coaches? (Likely org for multi-team)
- Free tier shot tracking only, or include basic defensive events?
- Premium tier: $14.99 or $19.99? (Value prop is strong with tracking)

### Content & UX
- Should drills have age restrictions (safety)?
- Video hosting: embed YouTube or self-host?
- Diagram creation: visual editor or static images?
- How to handle multiple coaches for same team?
- Should we gamify tracking (badges for tracking all games)?

### Technical
- Ice surface: SVG or Canvas? (SVG = easier interactions, Canvas = better performance)
- Offline storage limit: How many games can be stored offline?
- Analytics computation: Real-time or batch processing?
- How to detect game situation (PP/PK) automatically vs. manual input?

---

**Target Launch**: 10-12 weeks from start for public beta (extended for live tracking feature)
**Initial Market**: North American youth hockey (ages 8-18, house league to AAA)
- **USA**: 8U, 10U, 12U, 14U, 16U, 18U (2-year age bands)
- **Canada**: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year groups)
**Business Model**: Freemium SaaS with monthly/annual subscriptions
**Unique Value Prop**: "Turn game footage in your head into data-driven practice plans"
**Elevator Pitch**: "Track your game in real-time on your phone, get AI-generated practice plans that fix exactly what went wrong. No more guessing what to practice."

## Age Group Conventions

The app supports both USA and Canadian age group conventions:

**USA (2-year bands)**:
- 8U, 10U, 12U, 14U, 16U, 18U
- "8U" = 8 years old and under
- Teams typically have players spanning 2 birth years

**Canada (single-year groups)**:
- U9, U10, U11, U12, U13, U14, U15, U16, U17, U18
- "U9" = Under 9 years old (same as USA 8U)
- Each birth year has its own division due to higher participation

**Technical Implementation**:
- Age stored as integer in database (e.g., 9 = both U9 and 8U)
- Team has `region` field ('usa' or 'canada')
- UI displays age group based on region setting
- Organizations can set default region, overridable per team
