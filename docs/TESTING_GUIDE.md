# Testing Guide

**Created:** October 30, 2024
**Testing Framework:** Vitest + React Testing Library
**E2E Framework:** Playwright
**Current Test Coverage:** Practice History (19 tests), Analytics API (comprehensive)

---

## Overview

This guide covers our testing philosophy, setup, patterns, and best practices for the HP2 (Hockey Practice Planner) application.

## Testing Philosophy

### Test-Driven Development (TDD)

**Our Approach:**
1. Write tests FIRST (red)
2. Implement minimal code to pass (green)
3. Refactor for quality (clean)
4. Repeat

**Why TDD:**
- Ensures testable code architecture
- Documents intended behavior
- Catches regressions early
- Improves code design
- Builds confidence in changes

### Coverage Goals

- **Core business logic:** 100%
- **Database operations:** 100%
- **API routes:** 95%+
- **UI components:** 80%+
- **E2E critical paths:** 100%

## Testing Stack

### Unit & Integration Tests

**Vitest** - Fast, modern testing framework
- ESM support out of the box
- Compatible with Jest API
- Fast watch mode
- Native TypeScript support

**React Testing Library** - Component testing
- User-centric queries
- Encourages accessible markup
- Async utilities
- No implementation details

**Testing Library User Event** - User interactions
- Simulates real user behavior
- Async by default
- Proper event sequencing

### E2E Tests

**Playwright** - End-to-end testing
- Multi-browser support
- Auto-wait functionality
- Network mocking
- Screenshot/video recording

## Configuration Files

### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## Test Structure

### File Organization

```
tests/
├── setup.ts                    # Global test setup
├── unit/                       # Unit tests
│   ├── practice-history.test.tsx
│   ├── age-groups.test.ts
│   └── shot-quality.test.ts
├── integration/                # Integration tests
│   ├── game-events.test.ts
│   └── auth-flow.test.ts
└── e2e/                       # End-to-end tests
    ├── game-tracking.spec.ts
    └── practice-builder.spec.ts
```

### Naming Conventions

**Test Files:**
- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.test.ts`
- E2E tests: `*.spec.ts`

**Test Names:**
```typescript
describe('Feature Name', () => {
  describe('Sub-feature or Component', () => {
    it('should do something specific', () => {
      // Test implementation
    })
  })
})
```

## Writing Unit Tests

### Example: Practice History Tests

**File:** `tests/unit/practice-history.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PracticeHistoryPage from '@/app/demo/practice-history/page'
import { supabase } from '@/lib/db/supabase'

// Mock Supabase
vi.mock('@/lib/db/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Practice History Page', () => {
  describe('Authentication', () => {
    it('should show error when user not authenticated', async () => {
      // Arrange
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: null },
        error: null,
      })

      // Act
      render(<PracticeHistoryPage />)

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/please sign in/i)).toBeInTheDocument()
      })
    })
  })

  describe('Practice List Display', () => {
    beforeEach(() => {
      // Setup common mocks
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: { id: 'test-user' } as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { team_id: 'test-team' },
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: [
                    // Mock practice data
                  ],
                  error: null,
                }),
              }),
            }),
          }
        }
        return {}
      })

      vi.mocked(supabase.from).mockImplementation(mockFrom as any)
    })

    it('should display practice list', async () => {
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })
    })
  })
})
```

### Common Testing Patterns

#### 1. Testing Async Operations

```typescript
it('should load data on mount', async () => {
  render(<Component />)

  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  // Check data is displayed
  expect(screen.getByText('Expected Data')).toBeInTheDocument()
})
```

#### 2. Testing User Interactions

```typescript
it('should filter items when button clicked', async () => {
  const user = userEvent.setup()
  render(<Component />)

  const filterButton = screen.getByRole('button', { name: /filter/i })
  await user.click(filterButton)

  await waitFor(() => {
    expect(screen.getByText('Filtered Result')).toBeInTheDocument()
  })
})
```

#### 3. Testing Form Inputs

```typescript
it('should update input value', async () => {
  const user = userEvent.setup()
  render(<Component />)

  const input = screen.getByLabelText(/email/i)
  await user.type(input, 'test@example.com')

  expect(input).toHaveValue('test@example.com')
})
```

#### 4. Testing Error States

```typescript
it('should display error message on failure', async () => {
  // Mock API to return error
  vi.mocked(supabase.from).mockImplementation(() => ({
    select: vi.fn().mockRejectedValue(new Error('Network error')),
  }))

  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
```

#### 5. Testing with Multiple Elements

```typescript
it('should handle duplicate text correctly', async () => {
  render(<Component />)

  // When text appears multiple times, use getAllByText
  const elements = screen.getAllByText('Common Text')
  expect(elements).toHaveLength(2)

  // Or use within() to scope searches
  const table = screen.getByRole('table')
  expect(within(table).getByText('Specific Text')).toBeInTheDocument()
})
```

## Testing Best Practices

### DO ✅

1. **Test User Behavior, Not Implementation**
   ```typescript
   // Good: Tests what user sees
   expect(screen.getByText('Submit')).toBeInTheDocument()

   // Bad: Tests implementation detail
   expect(component.state.isSubmitting).toBe(false)
   ```

2. **Use Accessible Queries**
   ```typescript
   // Preferred order (most to least accessible)
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email/i)
   screen.getByPlaceholderText(/enter email/i)
   screen.getByText(/submit/i)
   screen.getByTestId('submit-button') // Last resort
   ```

3. **Wait for Async Updates**
   ```typescript
   await waitFor(() => {
     expect(screen.getByText('Loaded')).toBeInTheDocument()
   })
   ```

4. **Use beforeEach for Common Setup**
   ```typescript
   describe('Feature', () => {
     beforeEach(() => {
       // Common setup for all tests
       vi.clearAllMocks()
     })
   })
   ```

5. **Test Edge Cases**
   ```typescript
   it('should handle empty array')
   it('should handle null values')
   it('should handle very long strings')
   it('should handle special characters')
   ```

### DON'T ❌

1. **Don't Test Implementation Details**
   ```typescript
   // Bad
   expect(wrapper.find('div').length).toBe(3)

   // Good
   expect(screen.getAllByRole('listitem')).toHaveLength(3)
   ```

2. **Don't Use act() Directly** (React Testing Library handles it)
   ```typescript
   // Bad
   act(() => {
     fireEvent.click(button)
   })

   // Good
   await user.click(button)
   ```

3. **Don't Query Before Render**
   ```typescript
   // Bad
   const button = screen.getByRole('button')
   render(<Component />)

   // Good
   render(<Component />)
   const button = screen.getByRole('button')
   ```

4. **Don't Forget to Clean Up**
   ```typescript
   // Vitest handles most cleanup, but for subscriptions:
   afterEach(() => {
     subscription.unsubscribe()
   })
   ```

## Mocking Strategies

### Mocking Supabase

```typescript
vi.mock('@/lib/db/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(),
  },
}))

// In test
vi.mocked(supabase.auth.getUser).mockResolvedValue({
  data: { user: mockUser },
  error: null,
})
```

### Mocking Next.js Components

```typescript
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}))
```

### Mocking External Libraries

```typescript
vi.mock('some-library', () => ({
  someFunction: vi.fn(() => 'mocked result'),
}))
```

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test tests/unit/practice-history.test.tsx

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npx playwright test

# Run E2E tests in UI mode
npx playwright test --ui
```

### VS Code Integration

Add to `.vscode/settings.json`:
```json
{
  "vitest.enable": true,
  "vitest.commandLine": "npm test"
}
```

## Debugging Tests

### Common Issues

**1. "Cannot find module" errors**
```bash
# Check tsconfig.json paths
# Ensure vitest.config.ts has correct aliases
```

**2. "act() warnings"**
```typescript
// Use userEvent instead of fireEvent
// Wrap state updates in waitFor()
```

**3. "Element not found"**
```typescript
// Use waitFor for async renders
await waitFor(() => {
  expect(screen.getByText('...')).toBeInTheDocument()
})

// Check if element is in document
screen.debug() // Prints current DOM
```

**4. Tests timing out**
```typescript
// Increase timeout
it('slow test', async () => {
  // test code
}, 10000) // 10 second timeout
```

### Debug Techniques

```typescript
// Print current DOM
screen.debug()

// Print specific element
screen.debug(screen.getByRole('button'))

// Log queries to understand what's available
screen.logTestingPlaygroundURL()

// Use getByRole to see all available roles
screen.getByRole('') // Will fail but show all roles
```

## Test Coverage

### Viewing Coverage

```bash
npm test -- --coverage
```

Opens HTML report in `coverage/index.html`

### Coverage Thresholds

Add to `vitest.config.ts`:
```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
})
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Example Test Suites

### Current Test Suites

1. **Practice History** (`tests/unit/practice-history.test.tsx`)
   - 19 tests
   - Authentication, Display, Filtering, Modal, Errors, Empty State
   - 100% passing

2. **AI Practice Plan Generation** (integration tests in API route)
   - Game analytics parsing
   - Drill selection logic
   - AI prompt generation
   - Database persistence

### Planned Test Suites

1. **Practice Builder**
   - Drag and drop functionality
   - Drill search and filtering
   - Time tracking calculations
   - Save to database

2. **Game Tracking**
   - Event logging
   - Live stats calculation
   - Event editing
   - Offline storage

3. **Age Group Utilities**
   - USA format (8U, 10U, etc.)
   - Canada format (U9, U11, etc.)
   - Parsing and formatting
   - Edge cases

## Resources

### Documentation

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

### Best Practices

- [Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Write Tests. Not Too Many. Mostly Integration.](https://kentcdodds.com/blog/write-tests)

---

**Last Updated:** October 30, 2024
**Maintained By:** HP2 Development Team
