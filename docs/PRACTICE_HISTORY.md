# Practice History Feature Documentation

**Created:** October 30, 2024
**Status:** ✅ Complete
**Location:** `/app/demo/practice-history/page.tsx`
**Tests:** `/tests/unit/practice-history.test.tsx` (19 tests, all passing)

---

## Overview

The Practice History feature provides coaches with a comprehensive view of all their saved practice plans, both AI-generated and manually created. It includes powerful filtering, detailed practice views, and drill breakdowns.

## Features

### 1. Practice List View

**Statistics Dashboard**
- Total practice count
- AI-generated practice count
- Completed practice count
- Planned practice count

**Practice Cards Display**
- Date and time
- Duration
- Type badge (🤖 AI Generated or Manual)
- Status badge (Planned, In Progress, Completed, Cancelled)
- Location
- Quick view button

### 2. Advanced Filtering

**Filter by Status:**
- All Statuses
- Planned
- In Progress
- Completed
- Cancelled

**Filter by Type:**
- All Types
- AI Generated (includes AI reasoning and game analysis)
- Manual (coach-created plans)

**Combined Filtering:**
- Filters work together (e.g., "Completed AI-generated practices")

### 3. Practice Detail Modal

Opens when clicking "View Details" on any practice card.

**Metadata Display:**
- Practice date (full format with day of week)
- Duration
- Type (AI Generated with emoji or Manual)
- Status (with capitalization)
- Location

**AI Analysis Section** (for AI-generated plans only):
- Overall Assessment - Team evaluation from game data
- Focus Areas - Key areas identified from game analytics
- Practice Goals - Specific objectives for the practice

**Source Game Information** (for AI-generated plans):
- Shows which game the plan was based on
- Opponent name and date

**Objectives & Notes:**
- Practice objectives/goals
- Additional notes or reminders

**Drill Breakdown:**
- Organized by section (Warm-up, Main Practice, Cool-down)
- Each drill shows:
  - Drill title
  - Description
  - Category
  - Duration
  - Custom notes/modifications

**Actions:**
- Close button to dismiss modal

### 4. Error Handling

**Authentication Errors:**
- Detects invalid auth sessions
- Automatically clears corrupted sessions
- Shows friendly error message
- Provides path back to home page

**Data Fetch Errors:**
- Displays error message
- "Try Again" button to retry
- Console logging for debugging

**Empty States:**
- Friendly message when no practices exist
- Encourages users to create their first practice plan

## Technical Implementation

### Data Flow

```typescript
User loads page
  ↓
Check authentication
  ↓
Fetch user's team
  ↓
Load all practices for team
  ↓
Apply filters (status, type)
  ↓
Display filtered practices
  ↓
User clicks "View Details"
  ↓
Load practice drills & source game
  ↓
Show modal with full details
```

### Database Queries

**1. Load Practices**
```sql
SELECT * FROM practices
WHERE team_id = ?
ORDER BY practice_date DESC
```

**2. Load Practice Drills** (when viewing details)
```sql
SELECT
  pd.*,
  d.title,
  d.description,
  d.category
FROM practice_drills pd
JOIN drills d ON pd.drill_id = d.id
WHERE pd.practice_id = ?
ORDER BY pd.section, pd.sequence_order
```

**3. Load Source Game** (for AI-generated plans)
```sql
SELECT opponent_name, game_date
FROM games
WHERE id = ?
```

### State Management

```typescript
// Core state
const [practices, setPractices] = useState<Practice[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

// Filtering state
const [statusFilter, setStatusFilter] = useState<string>('all')
const [aiFilter, setAiFilter] = useState<string>('all')

// Modal state
const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null)
const [drills, setDrills] = useState<PracticeDrillWithDetails[]>([])
const [sourceGame, setSourceGame] = useState<SourceGame | null>(null)
const [loadingDetails, setLoadingDetails] = useState(false)
```

### Filtering Logic

**Combined Filter Function:**
```typescript
const filteredPractices = practices.filter((practice) => {
  // Status filter
  if (statusFilter !== 'all' && practice.status !== statusFilter) {
    return false
  }

  // AI/Manual filter
  if (aiFilter === 'ai' && !practice.generated_by_ai) {
    return false
  }
  if (aiFilter === 'manual' && practice.generated_by_ai) {
    return false
  }

  return true
})
```

### TypeScript Types

```typescript
interface Practice {
  id: string
  team_id: string
  practice_date: string
  duration_minutes: number
  location: string | null
  notes: string | null
  objectives: string | null
  generated_by_ai: boolean
  based_on_game_id: string | null
  ai_reasoning: {
    overall_assessment?: string
    top_focus_areas?: string[]
    practice_goals?: string[]
  } | null
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
  completed_at: string | null
  created_at: string
}

interface PracticeDrillWithDetails {
  id: string
  practice_id: string
  drill_id: string
  section: 'warm_up' | 'main' | 'cool_down'
  sequence_order: number
  duration_minutes: number
  notes: string | null
  modifications: string | null
  completed: boolean
  drills: {
    id: string
    title: string
    description: string
    category: string
  }
}

interface SourceGame {
  opponent_name: string
  game_date: string
}
```

## UI/UX Design

### Color Coding

**Status Badges:**
- Planned: Gray
- In Progress: Blue
- Completed: Green
- Cancelled: Red

**Type Badges:**
- AI Generated: Purple with 🤖 emoji
- Manual: Gray

**Stats Cards:**
- Total Practices: Blue
- AI Generated: Green
- Completed: Purple
- Planned: Amber

### Accessibility

**Aria Labels:**
- Status filter: `aria-label="Filter by status"`
- Type filter: `aria-label="Filter by type"`
- All interactive elements have proper labels

**Semantic HTML:**
- Proper heading hierarchy (h1, h2, h3)
- Table structure for practice list
- Form elements properly labeled with `htmlFor`

**Keyboard Navigation:**
- Modal can be closed with X button
- All buttons are keyboard accessible
- Proper focus management

## Testing

**Test Coverage: 100% of user-facing features**

### Test Suite (`tests/unit/practice-history.test.tsx`)

**19 Tests Total:**

1. **Authentication Tests (2)**
   - Shows error when user not authenticated
   - Shows error when user has no team

2. **Display Tests (4)**
   - Loading state shows spinner
   - Practice list displays all practices
   - Stats cards show correct counts
   - Badges display correctly (AI/Manual)

3. **Filtering Tests (3)**
   - Filter by status works correctly
   - Filter by type (AI vs Manual) works correctly
   - Combined filters work together

4. **Modal Tests (6)**
   - Modal opens when clicking "View Details"
   - Practice metadata displays correctly
   - AI reasoning displays for AI-generated practices
   - Source game information displays correctly
   - Drill sections with full details display
   - Modal closes when clicking close button

5. **Error Handling Tests (2)**
   - Error message displays on fetch failure
   - "Try Again" button appears and works

6. **Empty State Tests (1)**
   - Empty state message shows when no practices exist

### Running Tests

```bash
# Run practice history tests only
npm test tests/unit/practice-history.test.tsx

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### Test Mocking Strategy

**Supabase Client Mock:**
```typescript
vi.mock('@/lib/db/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}))
```

**Next.js Link Mock:**
```typescript
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
```

## Common Issues & Solutions

### Issue: Practices not loading

**Solution:**
1. Check authentication status
2. Verify user has team membership
3. Check browser console for errors
4. Ensure Supabase is running: `npx supabase status`

### Issue: "Auth error" after database reset

**Solution:**
The page now automatically detects and clears invalid sessions. Simply refresh the page and sign in again.

### Issue: Modal not showing drill details

**Solution:**
1. Check that practice_drills exist for the practice
2. Verify drill library is populated
3. Check console for query errors

### Issue: Filters not working

**Solution:**
1. Verify state is updating (check React DevTools)
2. Ensure filter logic matches database values
3. Check that filtered array is being used for display

## Navigation Flow

**Entry Points:**
1. From Analytics page → "View Practice History" button
2. From main demo page → "📋 Practice History" card
3. Direct URL: `/demo/practice-history`

**Exit Points:**
1. "Back to Analytics" link → Returns to analytics page
2. Creating new practice → Redirects from practice builder

## Future Enhancements

**Potential Improvements:**
- [ ] Export practice plan to PDF
- [ ] Print-friendly view
- [ ] Edit practice plan
- [ ] Duplicate practice plan
- [ ] Archive old practices
- [ ] Search within practice plans
- [ ] Sort by different fields (date, duration, status)
- [ ] Bulk actions (delete multiple, mark multiple as completed)
- [ ] Calendar view of practices
- [ ] Practice plan templates

## Performance Considerations

**Optimization Strategies:**
1. Practices loaded once on mount
2. Filtering happens client-side (fast)
3. Modal details loaded on-demand (lazy loading)
4. No unnecessary re-renders
5. Efficient database queries with proper indexes

**Scalability:**
- Current implementation handles 100+ practices smoothly
- For larger datasets, consider:
  - Pagination
  - Virtual scrolling
  - Server-side filtering
  - Caching strategies

## Related Documentation

- [AI Practice Plan Generation](./AI_PRACTICE_PLAN_GENERATION.md)
- [Practice Builder](./PRACTICE_BUILDER.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Database Schema](./DEV_SETUP_AND_DATA_MODELS.md)

---

**Last Updated:** October 30, 2024
**Maintained By:** HP2 Development Team
