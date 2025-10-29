# AI Practice Plan Generation

**Last Updated:** 2025-10-29

This document explains how the AI-powered practice plan generation feature works in HP2, from game tracking to personalized practice plans.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [User Workflow](#user-workflow)
3. [System Architecture](#system-architecture)
4. [AI Prompt Engineering](#ai-prompt-engineering)
5. [Drill Matching Algorithm](#drill-matching-algorithm)
6. [Database Schema](#database-schema)
7. [Testing Strategy](#testing-strategy)
8. [Future Enhancements](#future-enhancements)

---

## Overview

The AI practice plan generation feature transforms live game tracking data into targeted practice plans. Coaches track shots, breakouts, turnovers, and other events during games, then AI analyzes the data to identify weaknesses and recommend specific drills from a library of 200+ hockey drills.

### Key Differentiator

Unlike generic practice planning tools, HP2's AI:
- **Uses real game data** - Not coach opinions, but objective statistics
- **Explains reasoning** - Shows which stats led to each drill selection
- **Addresses specific weaknesses** - References exact game situations (e.g., "68% breakout failure rate on left side in Period 2")
- **Saves time** - Generates a 60-minute practice plan in ~10 seconds

---

## User Workflow

### Step 1: Track Game Events
**Location:** `/demo/game-tracking`

Coaches use the interactive ice surface to log events during live games:
- **Shots** (with location, result, shot type)
- **Breakouts** (success/failure, type, exit zone)
- **Turnovers** (location, type)
- **Zone entries**, **Faceoffs**, **Penalties**

All events stored with:
- Ice coordinates (x, y on 200x100 grid)
- Period, game time, situation (ES/PP/PK)
- Player, details (JSONB)

### Step 2: View Post-Game Analytics
**Location:** `/demo/analytics`

After the game, coaches review:
- **Shot charts** - Heat maps showing shot locations and quality
- **Breakout analytics** - Success rates by type (up boards, D-to-D, reverse, stretch)
- **Period trends** - Performance by period
- **Situation stats** - Even strength vs power play vs penalty kill

### Step 3: Generate AI Practice Plan
**Location:** `/demo/analytics` → "Generate AI Practice Plan" button

1. Click **"✨ Generate AI Practice Plan"**
2. AI analyzes game data (10-15 seconds)
3. Practice plan appears with:
   - **Top 3 focus areas** (e.g., "Low high-danger shots", "Poor breakout execution")
   - **Overall assessment** (2-3 sentence summary)
   - **Practice goals** (what the team needs to improve)
   - **6-8 drills** organized by section (warm-up, skills, scrimmage, cool-down)

Each drill includes:
- **Title** and **Duration**
- **Addresses** - Which weakness it targets
- **Reason** - Why AI chose this drill (references specific stats)
- **Expected Improvement** - What should improve after this drill

### Step 4: Save Practice Plan
**Location:** Same page, click "💾 Save Practice Plan"

1. Choose practice date (defaults to tomorrow)
2. Add optional notes
3. Click **"Save Practice Plan"**
4. Practice saved to database with:
   - AI reasoning (stored in `ai_reasoning` JSONB)
   - Link to source game (`based_on_game_id`)
   - All drills with sections and sequence order
   - Status: "planned"

### Step 5: View/Edit Practice
**Location:** `/practice-history` (coming soon)

Coaches can:
- View all saved practices
- Edit drill order or durations
- Mark drills as completed during practice
- Rate drill effectiveness

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Game Tracking                            │
│  (Live event logging on interactive ice surface)                │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ├─> game_events table (PostgreSQL)
                      │   - event_type, x_coord, y_coord
                      │   - period, game_time_seconds
                      │   - details (JSONB: shot_type, result, etc.)
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Analytics Engine                            │
│  (Processes events, calculates stats)                            │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ├─> Shot quality stats (high/medium/low danger)
                      ├─> Breakout analytics (success rate by type)
                      ├─> Turnover analysis (count, locations)
                      ├─> Period trends
                      └─> Situation stats (ES/PP/PK)
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI Practice Plan API                        │
│  (/api/generate-practice-plan)                                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ├─> 1. Fetch all global drills (200+)
                      ├─> 2. Build AI prompt with game stats
                      ├─> 3. Call OpenAI GPT-4o
                      ├─> 4. Parse JSON response
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Practice Plan Display                       │
│  (Shows AI reasoning + drill recommendations)                    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ├─> User clicks "Save Practice Plan"
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Database Persistence                        │
│  1. Create practices record                                      │
│  2. Match drill titles to drill IDs (case-insensitive)          │
│  3. Create practice_drills records (section, sequence, duration)│
└─────────────────────────────────────────────────────────────────┘
```

---

## AI Prompt Engineering

### Prompt Structure

The AI prompt is carefully structured to provide context and constraints:

#### 1. **Game Performance Analysis Section**
Presents the data in a coach-friendly format:

```
## GAME PERFORMANCE ANALYSIS

### Shot Quality & Scoring
- Total Shots: 18 (2 goals, 11.1% shooting)
- High Danger Shots: 3 (16.7% of total shots)
⚠️ LOW HIGH-DANGER SHOTS - Need to work on getting to the net

### Breakout Performance
- Success Rate: 45.0% (9/20)
⚠️ POOR BREAKOUT EXECUTION - High priority for practice

Breakout Types:
- up_boards: 40.0% success (2/5)
- d_to_d: 50.0% success (3/6)
- stretch: 33.3% success (1/3)

### Turnovers
- Total Turnovers: 12
⚠️ HIGH TURNOVER COUNT - Need puck protection drills
```

**Key Design Decisions:**
- Uses **warning flags (⚠️)** to highlight critical issues
- Shows **percentages AND raw counts** for context
- Provides **breakout-by-type analysis** (coaches care about specific breakout strategies)

#### 2. **Available Drills Section**
Shows the AI what drills are available:

```
## AVAILABLE DRILLS

You have access to 200+ drills. Each drill has metadata about what game situations it addresses.

Key drills available:
- Breakout Transitions Drill (breakouts, 10min) - intermediate level
- High Slot Shooting (shooting, 15min) - all level
- Puck Protection in Traffic (skating, 12min) - intermediate level
... and 197 more drills
```

**Why This Works:**
- AI sees drill **titles** (for exact matching in response)
- AI sees **categories** and **durations** (for logical practice structure)
- Shows **sample drills** to prime the AI's response format

#### 3. **Task Instructions**
Clear, structured instructions with exact JSON schema:

```
## YOUR TASK

Based on the game performance data above, create a practice plan that addresses the team's weaknesses.

1. IDENTIFY TOP 3 FOCUS AREAS from the analytics
2. SELECT 6-8 DRILLS that address these focus areas:
   - Start with warm-up (5-10 min)
   - Main skills/drills section (35-40 min)
   - Small area game or scrimmage (10-15 min)
   - Cool down (5 min)
3. For EACH drill selection, explain:
   - Which specific weakness it addresses
   - What improvement you expect to see
   - Reference specific stats from the game

4. IMPORTANT: Return ONLY valid JSON in this exact format:
{
  "reasoning": { ... },
  "practice_plan": { ... }
}
```

**Critical Elements:**
- **Numbered list** - Makes it easy for AI to follow
- **Time allocations** - Ensures realistic practice structure
- **JSON schema** - Enforces parseable output
- **"ONLY valid JSON"** - Prevents AI from adding prose before/after JSON

### Prompt Optimization Techniques

#### A. **Conditional Warnings**
Only show warnings when thresholds are crossed:

```typescript
${highDangerPercentage < 30 ? '⚠️ LOW HIGH-DANGER SHOTS - Need to work on getting to the net' : ''}
${shootingPercentage < 10 ? '⚠️ LOW SHOOTING PERCENTAGE - Need to work on shot accuracy and quality' : ''}
${(breakoutAnalytics?.successRate || 0) < 60 ? '⚠️ POOR BREAKOUT EXECUTION - High priority for practice' : ''}
```

This focuses AI attention on actual problems, not false alarms.

#### B. **Structured Data + Natural Language**
Combines tables (easy for AI to parse) with explanatory text (context):

```
Breakout Types:
- up_boards: 40.0% success (2/5)
- d_to_d: 50.0% success (3/6)

⚠️ Up-boards breakouts need improvement
```

#### C. **Response Format Enforcement**
Uses OpenAI's `response_format: { type: 'json_object' }` parameter to guarantee JSON output.

### Example AI Response

```json
{
  "reasoning": {
    "top_focus_areas": [
      "Low high-danger shot percentage (16.7%)",
      "Poor breakout execution (45% success rate)",
      "High turnover count in neutral zone"
    ],
    "overall_assessment": "Team struggled to generate quality scoring chances, with only 3 high-danger shots. Breakout issues led to 12 turnovers, particularly on up-boards exits.",
    "practice_goals": [
      "Increase high-danger shots by improving net-front presence",
      "Improve breakout success rate to 65%+ with emphasis on up-boards timing",
      "Reduce turnovers through better puck protection under pressure"
    ]
  },
  "practice_plan": {
    "total_duration_minutes": 60,
    "sections": [
      {
        "section": "warm_up",
        "drills": [
          {
            "drill_title": "Dynamic Skating Warm-Up",
            "duration_minutes": 8,
            "reason": "Prepares players for high-intensity breakout drills",
            "addresses": "General preparation",
            "expected_improvement": "Increased blood flow, reduced injury risk"
          }
        ]
      },
      {
        "section": "skills",
        "drills": [
          {
            "drill_title": "Breakout Transitions Drill",
            "duration_minutes": 12,
            "reason": "Your team had 45% breakout success, especially weak on up-boards (40%). This drill focuses on timing and support positioning.",
            "addresses": "Poor breakout execution (45% success rate)",
            "expected_improvement": "Better D-to-forward timing on up-boards breakouts, increased support options"
          },
          {
            "drill_title": "High Slot Shooting",
            "duration_minutes": 15,
            "reason": "Only 3 high-danger shots (16.7%) in the game. Need to work on net-front presence and shooting from the slot.",
            "addresses": "Low high-danger shot percentage",
            "expected_improvement": "More shots from prime scoring areas, better screening and tip-ins"
          },
          {
            "drill_title": "Puck Protection in Traffic",
            "duration_minutes": 12,
            "reason": "12 turnovers in the game, many under pressure. This drill teaches body positioning and stick protection.",
            "addresses": "High turnover count (12)",
            "expected_improvement": "Better puck retention under forecheck pressure"
          }
        ]
      },
      {
        "section": "scrimmage",
        "drills": [
          {
            "drill_title": "3v3 Small Area Game",
            "duration_minutes": 10,
            "reason": "Reinforces breakout concepts and puck protection in game-like situations",
            "addresses": "Apply all focus areas in competitive setting",
            "expected_improvement": "Transfer of skills to game situations"
          }
        ]
      },
      {
        "section": "cool_down",
        "drills": [
          {
            "drill_title": "Static Stretching Routine",
            "duration_minutes": 3,
            "reason": "Proper recovery and flexibility maintenance",
            "addresses": "Recovery",
            "expected_improvement": "Reduced soreness, maintained flexibility"
          }
        ]
      }
    ]
  }
}
```

**Notice:**
- AI **references specific stats** ("45% breakout success", "only 3 high-danger shots")
- AI **explains the logic** for each drill selection
- AI **uses exact drill titles** from the available drills list
- Response is **valid JSON** and parseable

---

## Drill Matching Algorithm

After AI generates the practice plan, we need to convert drill titles to drill IDs for database storage.

### Challenge

AI returns drill titles like:
- `"Breakout Transitions Drill"`
- `"High Slot Shooting"`
- `"3v3 Small Area Game"`

We need to match these to records in the `drills` table.

### Solution: Case-Insensitive Map Lookup

```typescript
// 1. Fetch all available drills
const { data: allDrills } = await supabase
  .from('drills')
  .select('id, title')
  .eq('is_global', true)

// 2. Create case-insensitive map
const drillTitleMap = new Map(
  allDrills.map((d) => [d.title.toLowerCase(), d.id])
)

// 3. Match AI-generated titles
for (const drill of aiGeneratedDrills) {
  const drillId = drillTitleMap.get(drill.drill_title.toLowerCase())

  if (!drillId) {
    console.warn(`⚠️ Could not find drill ID for: "${drill.drill_title}"`)
    continue // Skip unmatched drills
  }

  // Create practice_drill record
  practiceDrills.push({
    drill_id: drillId,
    duration_minutes: drill.duration_minutes,
    notes: `${drill.reason}\n\nExpected: ${drill.expected_improvement}`,
    // ...
  })
}
```

### Why This Works

1. **Case-insensitive** - Handles "Breakout Drill" vs "breakout drill"
2. **O(1) lookup** - Map provides constant-time lookup
3. **Graceful failure** - Warns but continues if a drill isn't found
4. **Preserves AI reasoning** - Stores reason + expected improvement in notes

### Edge Cases Handled

| Scenario | Behavior |
|----------|----------|
| Drill title doesn't exist | Logs warning, skips drill, continues with others |
| Case mismatch | Normalized to lowercase for matching |
| Extra whitespace | Title is trimmed before lookup |
| AI invents a drill name | Skipped with warning (coach can manually add later) |

---

## Database Schema

### Tables Involved

#### 1. `practices`
Stores the practice metadata.

```sql
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),

  -- Scheduling
  practice_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0 AND duration_minutes <= 180),
  location TEXT,

  -- Content
  notes TEXT,
  objectives TEXT,  -- Newline-separated practice goals

  -- AI Generation Metadata
  generated_by_ai BOOLEAN DEFAULT false,
  based_on_game_id UUID REFERENCES games(id),
  ai_reasoning JSONB,  -- Stores reasoning, focus_areas, practice_goals

  -- Status
  status practice_status DEFAULT 'planned',  -- 'planned' | 'in_progress' | 'completed' | 'cancelled'
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),

  -- Audit
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
)
```

**Example `ai_reasoning` JSONB:**
```json
{
  "top_focus_areas": [
    "Low high-danger shot percentage (16.7%)",
    "Poor breakout execution (45% success rate)"
  ],
  "overall_assessment": "Team struggled to generate quality scoring chances...",
  "practice_goals": [
    "Increase high-danger shots by improving net-front presence",
    "Improve breakout success rate to 65%+"
  ]
}
```

#### 2. `practice_drills`
Links practices to drills with ordering and metadata.

```sql
CREATE TABLE practice_drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  drill_id UUID NOT NULL REFERENCES drills(id) ON DELETE CASCADE,

  -- Organization
  section practice_section NOT NULL,  -- 'warm_up' | 'skills' | 'scrimmage' | 'cool_down'
  sequence_order INTEGER NOT NULL CHECK (sequence_order > 0),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),

  -- Coach notes for this specific instance
  notes TEXT,  -- Stores AI's "reason" + "expected_improvement"
  modifications TEXT,  -- Coach can note changes made during practice

  -- Execution tracking
  completed BOOLEAN DEFAULT false,
  effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  coach_feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),

  -- Unique constraint: can't have two drills with same sequence in same section
  UNIQUE(practice_id, section, sequence_order)
)
```

**Example records for a saved AI practice plan:**

| practice_id | drill_id | section | sequence | duration | notes |
|-------------|----------|---------|----------|----------|-------|
| practice-123 | drill-456 | warm_up | 1 | 8 | Reason: Prepares players... Expected: Increased blood flow |
| practice-123 | drill-789 | skills | 1 | 12 | Reason: Your team had 45% breakout success... Expected: Better timing |
| practice-123 | drill-321 | skills | 2 | 15 | Reason: Only 3 high-danger shots... Expected: More shots from slot |
| practice-123 | drill-654 | scrimmage | 1 | 10 | Reason: Reinforces breakout concepts... Expected: Transfer to game |
| practice-123 | drill-987 | cool_down | 1 | 3 | Reason: Proper recovery... Expected: Reduced soreness |

#### 3. `drills`
Library of 200+ pre-loaded drills.

```sql
CREATE TABLE drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category drill_category NOT NULL,  -- 'shooting', 'passing', 'breakouts', etc.

  -- Duration and logistics
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0 AND duration_minutes <= 120),
  players_min INTEGER,
  players_max INTEGER,

  -- Age appropriateness
  age_min INTEGER CHECK (age_min >= 6 AND age_min <= 21),
  age_max INTEGER CHECK (age_max >= age_min AND age_max <= 21),
  skill_level skill_level DEFAULT 'all',  -- 'beginner' | 'intermediate' | 'advanced' | 'all'

  -- AI integration
  addresses_situations JSONB DEFAULT '{}',  -- e.g., {"breakout_failures": true, "low_shot_quality": true}

  -- Media
  diagram_url TEXT,
  video_url TEXT,

  -- Organization
  tags TEXT[] DEFAULT '{}',  -- ['puck_handling', 'edges', 'quick_transitions']

  -- Multi-tenancy
  is_global BOOLEAN DEFAULT true,  -- Built-in drills vs org-specific
  organization_id UUID REFERENCES organizations(id),

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
)
```

### RLS Policies

**Practices:**
- Users can **view** practices for teams they're members of
- Coaches can **create, update, delete** practices for their teams
- Other teams' practices are completely hidden

**Practice Drills:**
- Inherit access control from parent practice
- If you can see the practice, you can see its drills

**Drills:**
- Everyone can **view** global drills (`is_global = true`)
- Org members can **view** org-specific drills
- Org admins can **create, update** org-specific drills

---

## Testing Strategy

### Integration Tests
**File:** `tests/integration/practice-planning.test.ts`
**Coverage:** 21 tests

#### Test Categories

**1. Practice Creation (4 tests)**
```typescript
it('should create a manual practice plan')
it('should create an AI-generated practice plan')
it('should enforce duration constraints')
it('should enforce foreign key constraints')
```

**2. Practice Drills Association (6 tests)**
```typescript
it('should add drills to a practice plan')
it('should enforce unique sequence order within section')
it('should allow same sequence order in different sections')
it('should store drill notes and modifications')
it('should cascade delete practice drills when practice is deleted')
```

**3. Drill Title Matching (2 tests)**
```typescript
it('should match drill titles case-insensitively')
it('should find drills by partial title match')
```

**4. Practice Retrieval & Filtering (6 tests)**
```typescript
it('should retrieve all practices for a team')
it('should filter practices by status')
it('should filter practices by AI generation flag')
it('should order practices by date descending')
it('should join practices with drills')
```

**5. RLS Policy Enforcement (3 tests)**
```typescript
it('should allow users to view their team\'s practices')
it('should NOT allow users to view other team\'s practices')
it('should NOT allow users to update other team\'s practices')
```

### Manual Testing Checklist

- [ ] Generate practice plan with minimal game data (1-2 events)
- [ ] Generate practice plan with full game data (50+ events)
- [ ] Verify drill titles match exactly
- [ ] Test save modal validation (missing date)
- [ ] Verify practice appears in database after save
- [ ] Check that `ai_reasoning` JSONB is properly stored
- [ ] Confirm practice_drills records have correct sequence order
- [ ] Test with different team ages (U9, U13, U15, U18)
- [ ] Verify RLS: cannot see other team's practices

### OpenAI API Testing

**Mock Responses:**
For CI/CD, mock OpenAI responses to avoid:
- API costs
- Rate limits
- Non-deterministic responses

```typescript
// In test setup
vi.mock('openai', () => ({
  OpenAI: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{ message: { content: mockPracticePlanJSON } }],
          model: 'gpt-4o',
          usage: { total_tokens: 1500 }
        })
      }
    }
  }))
}))
```

---

## Future Enhancements

### Phase 1 Improvements (Next Sprint)

1. **Practice History View**
   - List all saved practices
   - Filter by date range, status, AI vs manual
   - Click to view full practice details

2. **Manual Practice Plan Builder**
   - Drag-and-drop drills from library
   - Reorder drills within sections
   - Adjust durations on the fly
   - Save custom practice plans

3. **Mobile-Friendly Practice Display**
   - Simplified view optimized for tablets/phones
   - Coaches can use during practice on the ice
   - Large fonts, minimal scrolling
   - Checkboxes to mark drills complete

### Phase 2 Enhancements (Future)

4. **Drill Effectiveness Tracking**
   - After practice, rate each drill (1-5 stars)
   - Add feedback notes
   - AI learns which drills work best for your team

5. **Multi-Game Analysis**
   - Generate practice plans based on last 3-5 games
   - Identify recurring patterns
   - Season-long trend analysis

6. **Custom Drill Library**
   - Coaches can add org-specific drills
   - Upload drill diagrams and videos
   - Tag drills with custom categories

7. **Practice Plan Templates**
   - Save favorite practice structures
   - "Pre-game skate", "Power play focus", "Defensive zone coverage"
   - One-click to create from template

8. **Team Communication**
   - Share practice plan with players/parents
   - Email notifications with practice details
   - Export to PDF or print-friendly format

### Phase 3 Advanced Features (Long-Term)

9. **Video Integration**
   - Link drill videos from YouTube
   - Coaches can record their own drill demos
   - Embedded video player in practice view

10. **AI Coaching Tips**
    - AI suggests coaching points for each drill
    - "Watch for players cheating on D-to-D pass timing"
    - Based on common mistakes for this drill

11. **Season Planning**
    - Generate 10-week practice calendar
    - Progressive skill building
    - Balance offensive/defensive/skating focus

12. **Benchmarking**
    - Compare your team's stats to league averages
    - "Your breakout success is 45%, league average is 58%"
    - Identify competitive advantages

---

## Appendix: Code Examples

### Example: Calling the AI Practice Plan API

```typescript
// From app/demo/analytics/page.tsx

async function generatePracticePlan() {
  const response = await fetch('/api/generate-practice-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamId: 'team-uuid',
      gameId: 'game-uuid',
      analytics: {
        shotQualityStats: {
          totalShots: 18,
          totalGoals: 2,
          shootingPercentage: 11.1,
          highDangerShots: 3,
          highDangerPercentage: 16.7,
          mediumDangerShots: 8,
          lowDangerShots: 7
        },
        breakoutAnalytics: {
          totalBreakouts: 20,
          successfulBreakouts: 9,
          failedBreakouts: 11,
          successRate: 45.0,
          byType: [
            { type: 'up_boards', total: 5, successful: 2, successRate: 40.0 },
            { type: 'd_to_d', total: 6, successful: 3, successRate: 50.0 }
          ]
        },
        turnoverCount: 12,
        periodStats: [...],
        situationStats: {...}
      },
      practiceDuration: 60,
      teamAge: 13
    })
  })

  const result = await response.json()
  // result.practicePlan contains the AI-generated plan
}
```

### Example: Saving Practice Plan to Database

```typescript
async function savePracticePlan() {
  // 1. Get current user and team
  const { data: { user } } = await supabase.auth.getUser()
  const { data: teamMember } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .single()

  // 2. Fetch all drills for matching
  const { data: allDrills } = await supabase
    .from('drills')
    .select('id, title')
    .eq('is_global', true)

  const drillTitleMap = new Map(
    allDrills.map(d => [d.title.toLowerCase(), d.id])
  )

  // 3. Create practice record
  const { data: practice } = await supabase
    .from('practices')
    .insert({
      team_id: teamMember.team_id,
      practice_date: practiceDate,
      duration_minutes: generatedPlan.practice_plan.total_duration_minutes,
      objectives: generatedPlan.reasoning.practice_goals.join('\n'),
      generated_by_ai: true,
      based_on_game_id: gameId,
      ai_reasoning: generatedPlan.reasoning,
      status: 'planned'
    })
    .select()
    .single()

  // 4. Create practice_drills records
  const practiceDrills = []
  let sequenceOrder = 1

  for (const section of generatedPlan.practice_plan.sections) {
    for (const drill of section.drills) {
      const drillId = drillTitleMap.get(drill.drill_title.toLowerCase())

      if (drillId) {
        practiceDrills.push({
          practice_id: practice.id,
          drill_id: drillId,
          section: section.section,
          sequence_order: sequenceOrder++,
          duration_minutes: drill.duration_minutes,
          notes: `${drill.reason}\n\nExpected: ${drill.expected_improvement}`
        })
      }
    }
  }

  await supabase.from('practice_drills').insert(practiceDrills)
}
```

---

## Questions?

For technical questions or feature requests, see:
- `CLAUDE.md` - Project overview and architecture decisions
- `docs/HOCKEY_PRACTICE_APP_PLAN.md` - Full product plan
- `docs/DEV_SETUP_AND_DATA_MODELS.md` - Database schema details

**Last Updated:** 2025-10-29 by Brock Arnold + Claude
