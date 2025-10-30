# Practice Builder Feature Documentation

**Created:** October 30, 2024
**Status:** ✅ Complete
**Location:** `/app/demo/practice-builder/page.tsx`
**Migration:** `supabase/migrations/20251031000000_seed_sample_drills.sql`

---

## Overview

The Practice Builder is a drag-and-drop interface that allows coaches to create custom practice plans by selecting drills from a searchable library and organizing them into structured practice sections.

## Key Features

### 1. Practice Metadata Form

**Required Fields:**
- Practice Date (defaults to today)
- Total Duration (15-180 minutes, default: 60)

**Optional Fields:**
- Location (rink name, facility)
- Objectives (practice goals)
- Notes (reminders, equipment needs, etc.)

**Real-time Feedback:**
- Duration tracker shows time remaining/over
- Visual indicators:
  - 🟢 Green: Perfect match (0 min remaining)
  - 🔵 Blue: Time remaining
  - 🔴 Red: Over allocated time

### 2. Drill Library

**27 Sample Drills** across 11 categories:
- **Skating** (3 drills) - Figure 8, Crossovers, Stops & Starts
- **Passing** (3 drills) - Triangle Passing, Stationary Grid, Give & Go
- **Shooting** (3 drills) - Wrist Shots, One-Timers, Shooting Off Rush
- **Breakouts** (3 drills) - D-to-D, Reverse, Under Pressure
- **Transition** (3 drills) - Puck Protection, Stickhandling, Neutral Zone Regroup
- **Small Area Games** (2 drills) - 2v2 Cross-Ice, 3v3 in Zone
- **Defensive Zone** (2 drills) - 1v1 Defense, Corner Battles
- **Forechecking** (2 drills) - Cycle Drill, Net Front Presence
- **Power Play** (1 drill) - Breakout & Entry
- **Penalty Kill** (1 drill) - Box Formation
- **Conditioning** (2 drills) - Suicide Skates, Continuous 1v1
- **Warm-up** (1 drill) - Dynamic Skating
- **Cool-down** (1 drill) - Easy Skate & Stretch

**Search Functionality:**
- Real-time search as you type
- Searches drill titles and descriptions
- Case-insensitive matching

**Category Filter:**
- Dropdown to filter by specific category
- "All Categories" option to see everything
- Categories sorted alphabetically

**Drill Card Information:**
- Title
- Description (2-line preview)
- Duration (default time)
- Category badge
- Skill level badge (if not 'all')
- Drag handle (hover effect)

### 3. Drag-and-Drop Interface

**HTML5 Drag & Drop API** (no external libraries)

**Drag Sources:**
- Drill library cards
- Practice section drills (to move between sections)

**Drop Targets:**
- Warm-up section
- Main Practice section
- Cool-down section

**Visual Feedback:**
- Hover effects on draggable items
- Drop zone highlights on drag-over
- Cursor changes to indicate drag state

**Behavior:**
- Drag from library → Adds drill to section
- Drag between sections → Moves drill to new section
- Maintains sequence order automatically

### 4. Practice Sections

**Three Sections:**
1. **Warm-up** - Preparation and activation drills
2. **Main Practice** - Core skill development
3. **Cool-down** - Recovery and stretching

**Section Features:**
- Shows total time for section
- Drag-and-drop zone (dashed border)
- Empty state message when no drills
- Automatic sequence numbering (#1, #2, #3...)

**Per-Drill Controls:**
- **Duration Input** - Override default drill duration (1-60 min)
- **Notes Input** - Add modifications, focus points, variations
- **Remove Button** - Delete drill from section (red X)
- **Drill Metadata Display:**
  - Title (bold)
  - Description (full text)
  - Category badge

### 5. Time Management

**Automatic Calculation:**
- Sums all drill durations across sections
- Compares to total practice duration
- Updates in real-time as drills are added/removed/modified

**Display:**
- "X min remaining" (blue) when under budget
- "0 min remaining" (green) when perfect match
- "X min over" (red) when over budget

**Workflow:**
1. Set total practice duration
2. Add drills to sections
3. Adjust individual drill durations
4. Monitor time tracker
5. Remove or shorten drills if over time

### 6. Save Functionality

**Save Button:**
- Disabled when:
  - No drills selected
  - No practice date set
  - Currently saving
- Enabled when all requirements met

**Save Process:**
1. Validates required fields
2. Inserts practice record
3. Inserts all practice_drills records
4. Shows success message
5. Redirects to Practice History after 2 seconds

**Database Transactions:**
```typescript
// 1. Create practice
const practice = await supabase
  .from('practices')
  .insert({
    team_id,
    practice_date,
    duration_minutes,
    location,
    notes,
    objectives,
    generated_by_ai: false,
    status: 'planned',
  })
  .select()
  .single()

// 2. Insert all drills
const drillsToInsert = practiceDrills.map((pd, idx) => ({
  practice_id: practice.id,
  drill_id: pd.drillId,
  section: pd.section,
  sequence_order: idx,
  duration_minutes: pd.duration_minutes,
  notes: pd.notes || null,
  modifications: null,
  completed: false,
}))

await supabase
  .from('practice_drills')
  .insert(drillsToInsert)
```

## Technical Implementation

### Component Architecture

```
PracticeBuilderPage (main component)
├── Practice Metadata Form
├── Drill Library (sidebar)
│   ├── Search Input
│   ├── Category Filter
│   └── Drill Cards (draggable)
└── Practice Sections (main area)
    ├── PracticeSection (Warm-up)
    ├── PracticeSection (Main)
    └── PracticeSection (Cool-down)
```

### State Management

```typescript
// Auth & Team
const [userId, setUserId] = useState<string | null>(null)
const [teamId, setTeamId] = useState<string | null>(null)

// Practice metadata
const [practiceMetadata, setPracticeMetadata] = useState<PracticeMetadata>({
  practice_date: new Date().toISOString().split('T')[0],
  duration_minutes: 60,
  location: '',
  notes: '',
  objectives: '',
})

// Drill library
const [allDrills, setAllDrills] = useState<Drill[]>([])
const [filteredDrills, setFilteredDrills] = useState<Drill[]>([])
const [searchTerm, setSearchTerm] = useState('')
const [categoryFilter, setCategoryFilter] = useState<string>('all')

// Practice plan
const [practiceDrills, setPracticeDrills] = useState<PracticeDrill[]>([])
const [draggedDrill, setDraggedDrill] = useState<Drill | PracticeDrill | null>(null)
const [draggedFrom, setDraggedFrom] = useState<'library' | 'practice' | null>(null)

// Save state
const [saving, setSaving] = useState(false)
const [saveSuccess, setSaveSuccess] = useState(false)
```

### Drag & Drop Implementation

**Event Handlers:**

```typescript
// When drag starts from library
const handleDragStart = (drill: Drill, from: 'library' | 'practice') => {
  setDraggedDrill(drill)
  setDraggedFrom(from)
}

// Allow drop on section
const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault()
}

// When dropped on a section
const handleDropOnSection = (section: 'warm_up' | 'main' | 'cool_down') => {
  if (!draggedDrill) return

  if (draggedFrom === 'library') {
    // Adding new drill from library
    const newPracticeDrill: PracticeDrill = {
      drillId: drill.id,
      drill: drill,
      section,
      duration_minutes: drill.duration_minutes,
      notes: '',
      sequence_order: practiceDrills.filter(pd => pd.section === section).length,
    }
    setPracticeDrills([...practiceDrills, newPracticeDrill])
  } else if (draggedFrom === 'practice') {
    // Moving between sections
    setPracticeDrills(practiceDrills.map(pd =>
      pd.drillId === existingDrill.drillId && pd.section === existingDrill.section
        ? { ...pd, section, sequence_order: /* new order */ }
        : pd
    ))
  }

  setDraggedDrill(null)
  setDraggedFrom(null)
}
```

### TypeScript Types

```typescript
interface Drill {
  id: string
  title: string
  description: string
  category: string
  duration_minutes: number
  skill_level: string
  age_min: number | null
  age_max: number | null
}

interface PracticeDrill {
  drillId: string
  drill: Drill
  section: 'warm_up' | 'main' | 'cool_down'
  duration_minutes: number
  notes: string
  sequence_order: number
}

interface PracticeMetadata {
  practice_date: string
  duration_minutes: number
  location: string
  notes: string
  objectives: string
}
```

## Database Schema

### Drills Table

```sql
CREATE TABLE drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category drill_category NOT NULL,

  -- Duration and logistics
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0 AND duration_minutes <= 120),
  players_min INTEGER CHECK (players_min > 0),
  players_max INTEGER CHECK (players_max >= players_min),

  -- Age and skill appropriateness
  age_min INTEGER CHECK (age_min >= 6 AND age_min <= 21),
  age_max INTEGER CHECK (age_max >= age_min AND age_max <= 21),
  skill_level skill_level DEFAULT 'all',

  -- AI integration
  addresses_situations JSONB DEFAULT '{}'
);
```

### Drill Categories Enum

```sql
CREATE TYPE drill_category AS ENUM (
  'shooting',
  'passing',
  'skating',
  'breakouts',
  'forechecking',
  'backchecking',
  'defensive_zone',
  'power_play',
  'penalty_kill',
  'transition',
  'faceoffs',
  'warm_up',
  'cool_down',
  'conditioning',
  'small_area_games',
  'puck_skills',
  'other'
);
```

### Skill Levels Enum

```sql
CREATE TYPE skill_level AS ENUM (
  'beginner',
  'intermediate',
  'advanced',
  'all'
);
```

## Sample Drills Migration

**File:** `supabase/migrations/20251031000000_seed_sample_drills.sql`

**Contents:**
- 27 professionally curated hockey drills
- Age-appropriate (8-18 years)
- Duration ranges: 8-15 minutes
- Skill levels: beginner, intermediate, advanced
- Addresses common game situations

**Example Drill:**
```sql
INSERT INTO drills (
  title,
  description,
  category,
  duration_minutes,
  players_min,
  players_max,
  age_min,
  age_max,
  skill_level,
  addresses_situations
) VALUES (
  'Triangle Passing',
  'Three players form a triangle and pass while moving up ice. Focus on head-up passing, quick hands, and skating with the puck.',
  'passing',
  10,
  9,
  18,
  10,
  18,
  'intermediate',
  '{"passing_accuracy": true, "puck_control": true}'
);
```

## User Workflow

### Creating a Practice Plan

**Step 1: Set Practice Details**
1. Select practice date
2. Set duration (default 60 min)
3. Add location (optional)
4. Write objectives (optional)
5. Add notes (optional)

**Step 2: Browse Drills**
1. Use search to find specific drills
2. Filter by category if needed
3. Review drill descriptions

**Step 3: Build Practice**
1. Drag warm-up drills to Warm-up section
2. Drag main drills to Main Practice section
3. Drag cool-down drills to Cool-down section
4. Watch time tracker

**Step 4: Customize**
1. Adjust drill durations as needed
2. Add notes for specific modifications
3. Remove drills that don't fit
4. Ensure time equals practice duration

**Step 5: Save**
1. Review complete practice plan
2. Click "Save Practice Plan"
3. Wait for success message
4. Redirected to Practice History

## UI/UX Best Practices

### Visual Design

**Color Scheme:**
- Library sidebar: White with gray borders
- Drop zones: Dashed borders (blue on hover)
- Time tracker: Blue/Green/Red based on status
- Category badges: Gray
- Skill level badges: Blue

**Typography:**
- Drill titles: Bold, 16px
- Descriptions: Regular, 14px
- Section headers: Bold, 20px
- Metadata labels: Medium, 14px

**Spacing:**
- Consistent 16px/24px padding
- 8px gaps between elements
- 24px margins between sections

### Accessibility

**Keyboard Support:**
- All form inputs are keyboard accessible
- Tab order is logical
- Enter/Space to activate buttons

**Screen Readers:**
- Semantic HTML structure
- Proper heading hierarchy
- Form labels properly associated
- Alt text for visual indicators

**Visual Indicators:**
- High contrast colors
- Clear hover states
- Focus outlines on interactive elements

### Responsive Design

**Desktop (1024px+):**
- 3-column layout (library | sections)
- Full drill descriptions visible
- All controls easily accessible

**Tablet (768px-1023px):**
- 2-column layout (library stacks on top)
- Slightly condensed drill cards

**Mobile (< 768px):**
- Single column layout
- Drill library collapses/expands
- Touch-friendly drag targets
- *Note: Mobile drag-and-drop can be improved*

## Performance Considerations

### Optimization Strategies

1. **Drill Loading:**
   - Loads once on component mount
   - Cached in state
   - ~27 drills load instantly

2. **Search/Filter:**
   - Client-side filtering (fast)
   - Debouncing not needed (small dataset)
   - Minimal re-renders

3. **Drag & Drop:**
   - Native HTML5 API (lightweight)
   - No external library overhead
   - Smooth animations

4. **State Updates:**
   - Immutable state patterns
   - Efficient array operations
   - No unnecessary re-renders

### Scalability

**Current Limits:**
- 27 drills: Instant loading
- 100+ drills: Still fast client-side filtering
- 500+ drills: Consider pagination/virtual scrolling

**Future Optimizations:**
- Virtual scrolling for large drill libraries
- Server-side search for 1000+ drills
- Drill preview caching
- Image lazy loading (when drill images added)

## Common Issues & Solutions

### Issue: Drills not loading

**Solution:**
1. Check Supabase connection
2. Verify migration ran: `npx supabase db reset`
3. Check console for errors
4. Verify drills table has data:
   ```sql
   SELECT COUNT(*) FROM drills;
   ```

### Issue: Can't drag drills

**Solution:**
1. Ensure `draggable` attribute is set
2. Check browser console for JavaScript errors
3. Verify drag event handlers are attached
4. Try in different browser (drag-and-drop browser support)

### Issue: Time tracking incorrect

**Solution:**
1. Check all drill durations are numbers
2. Verify calculation logic:
   ```typescript
   const total = practiceDrills.reduce((sum, pd) => sum + pd.duration_minutes, 0)
   ```
3. Ensure state updates properly on duration change

### Issue: Save fails

**Solution:**
1. Check authentication (must be signed in)
2. Verify team membership exists
3. Check browser console for error details
4. Ensure all required fields are filled
5. Check Supabase RLS policies

## Authentication & Authorization

**Requirements:**
- User must be authenticated
- User must belong to a team
- Practice saved to user's team

**Error Handling:**
```typescript
// Auth check with error recovery
const { data: { user }, error: userError } = await supabase.auth.getUser()

if (userError) {
  console.log('Auth error, clearing session:', userError)
  await supabase.auth.signOut()
  setError('Please sign in to create practice plans')
  return
}
```

## Future Enhancements

**Planned Features:**
- [ ] Drill preview with diagrams
- [ ] Favorite drills for quick access
- [ ] Practice plan templates
- [ ] Duplicate existing practice plans
- [ ] Drill recommendations based on team needs
- [ ] Print view for practice sheets
- [ ] Mobile-optimized drag-and-drop
- [ ] Bulk drill import
- [ ] Custom drill creation
- [ ] Drill video integration
- [ ] Share practice plans with other coaches

**Advanced Features:**
- [ ] AI-suggested drill ordering
- [ ] Equipment requirements tracking
- [ ] Player positioning diagrams
- [ ] Practice plan versioning
- [ ] Collaborative planning (multiple coaches)
- [ ] Integration with game analytics

## Related Documentation

- [Practice History](./PRACTICE_HISTORY.md)
- [AI Practice Plan Generation](./AI_PRACTICE_PLAN_GENERATION.md)
- [Database Schema](./DEV_SETUP_AND_DATA_MODELS.md)
- [Testing Guide](./TESTING_GUIDE.md)

---

**Last Updated:** October 30, 2024
**Maintained By:** HP2 Development Team
