import { test, expect } from '@playwright/test'

/**
 * Complete User Journey E2E Test
 *
 * Tests the critical path from sign up to game analytics:
 * 1. Sign up as a new coach
 * 2. Create a team
 * 3. Add players to roster
 * 4. Track a game with events
 * 5. View analytics
 */

test.describe('Complete User Journey', () => {
  const testEmail = `e2e-test-${Date.now()}@example.com`
  const testPassword = 'TestPassword123!'
  const teamName = 'E2E Test Team'

  test('should complete full user journey from sign up to analytics', async ({ page }) => {
    // ============================================
    // Step 1: Sign Up
    // ============================================
    await test.step('Sign up as new user', async () => {
      await page.goto('/auth/signup')

      await page.fill('input[name="email"]', testEmail)
      await page.fill('input[name="password"]', testPassword)
      await page.fill('input[name="confirmPassword"]', testPassword)

      await page.click('button[type="submit"]')

      // Wait for redirect to teams page or check success message
      await page.waitForURL(/\/demo\/teams/, { timeout: 10000 })
    })

    // ============================================
    // Step 2: Create Team
    // ============================================
    await test.step('Create a new team', async () => {
      // Should be on teams page with empty state
      await expect(page.locator('text=/create.*team/i')).toBeVisible()

      // Click create team button
      await page.click('a[href*="/teams/new"], button:has-text("Create")')

      // Wait for team creation form
      await page.waitForURL(/\/demo\/teams\/new/)

      // Fill out team form
      await page.fill('input[name="name"]', teamName)

      // Select age group (10U / USA)
      await page.selectOption('select[name="age_years"]', '10')

      // Select level
      await page.selectOption('select[name="level"]', 'a')

      // Fill season (should auto-populate, but verify)
      const seasonInput = page.locator('input[name="season"]')
      const seasonValue = await seasonInput.inputValue()
      if (!seasonValue) {
        await seasonInput.fill('2024-25')
      }

      // Submit form
      await page.click('button[type="submit"]')

      // Wait for redirect back to teams list
      await page.waitForURL(/\/demo\/teams(?!\/new)/, { timeout: 10000 })

      // Verify team appears in list
      await expect(page.locator(`text=${teamName}`)).toBeVisible()
    })

    // ============================================
    // Step 3: Add Players to Roster
    // ============================================
    await test.step('Add players to roster', async () => {
      // Navigate to roster page
      // First, select the team from dropdown or click into it
      await page.click(`text=${teamName}`)

      // Should be on team details or can navigate to roster
      // Look for "Roster" link in navigation
      const rosterLink = page.locator('a[href*="/roster"], button:has-text("Roster")')
      if (await rosterLink.isVisible()) {
        await rosterLink.click()
      }

      // Add first player
      await page.click('button:has-text("Add Player")')

      // Fill player form
      await page.fill('input[name="jersey_number"]', '10')
      await page.fill('input[name="first_name"]', 'Alex')
      await page.fill('input[name="last_name"]', 'Johnson')
      await page.selectOption('select[name="position"]', 'forward')

      await page.click('button[type="submit"]:has-text("Save")')

      // Wait for player to appear in roster
      await expect(page.locator('text=/Alex.*Johnson|#10/i')).toBeVisible()

      // Add second player
      await page.click('button:has-text("Add Player")')

      await page.fill('input[name="jersey_number"]', '5')
      await page.fill('input[name="first_name"]', 'Morgan')
      await page.fill('input[name="last_name"]', 'Smith')
      await page.selectOption('select[name="position"]', 'defense')

      await page.click('button[type="submit"]:has-text("Save")')

      await expect(page.locator('text=/Morgan.*Smith|#5/i')).toBeVisible()

      // Add a goalie
      await page.click('button:has-text("Add Player")')

      await page.fill('input[name="jersey_number"]', '1')
      await page.fill('input[name="first_name"]', 'Jordan')
      await page.fill('input[name="last_name"]', 'Davis')
      await page.selectOption('select[name="position"]', 'goalie')

      await page.click('button[type="submit"]:has-text("Save")')

      await expect(page.locator('text=/Jordan.*Davis|#1/i')).toBeVisible()
    })

    // ============================================
    // Step 4: Track a Game
    // ============================================
    await test.step('Track a game with events', async () => {
      // Navigate to game tracking
      await page.click('a[href*="/game-tracking"], button:has-text("Track Game")')

      await page.waitForURL(/\/demo\/game-tracking/)

      // Check if we need to create a new game or if one exists
      const newGameButton = page.locator('button:has-text("New Game")')
      if (await newGameButton.isVisible()) {
        await newGameButton.click()

        // Fill opponent name if prompted
        const opponentInput = page.locator('input[name="opponent"], input[placeholder*="opponent"]')
        if (await opponentInput.isVisible()) {
          await opponentInput.fill('Test Opponents')
          await page.click('button:has-text("Start Game")')
        }
      }

      // Should see ice surface for tracking
      await expect(page.locator('.ice-surface, [data-testid="ice-surface"]')).toBeVisible({ timeout: 10000 })

      // Record a shot event
      // Find player selector and select Alex Johnson (#10)
      const playerButton = page.locator('button:has-text("Alex"), button:has-text("#10")').first()
      if (await playerButton.isVisible()) {
        await playerButton.click()
      }

      // Click on ice surface to record shot (offensive zone, slot area)
      const iceSurface = page.locator('.ice-surface, [data-testid="ice-surface"]')
      const box = await iceSurface.boundingBox()
      if (box) {
        // Click in offensive zone (right side), slot area
        await iceSurface.click({
          position: {
            x: box.width * 0.75, // 75% across (offensive zone)
            y: box.height * 0.5   // 50% down (center)
          }
        })
      }

      // Should see shot recorded
      await expect(page.locator('text=/shot|goal/i')).toBeVisible()

      // Record another event (pass or breakout)
      // Select Morgan Smith (#5)
      const player2Button = page.locator('button:has-text("Morgan"), button:has-text("#5")').first()
      if (await player2Button.isVisible()) {
        await player2Button.click()
      }

      // Click for breakout event (defensive zone)
      if (box) {
        await iceSurface.click({
          position: {
            x: box.width * 0.25, // 25% across (defensive zone)
            y: box.height * 0.5   // Center
          }
        })
      }
    })

    // ============================================
    // Step 5: View Analytics
    // ============================================
    await test.step('View game analytics', async () => {
      // Navigate to analytics page
      await page.click('a[href*="/analytics"], button:has-text("Analytics")')

      await page.waitForURL(/\/demo\/analytics/)

      // Should see analytics dashboard
      await expect(page.locator('text=/shot.*chart|analytics/i')).toBeVisible()

      // Should see player stats
      await expect(page.locator('text=/Alex.*Johnson|Morgan.*Smith/i')).toBeVisible()

      // Should see some statistics
      await expect(page.locator('text=/shots?|goals?|events?/i')).toBeVisible()

      // Verify shot chart is rendered
      const shotChart = page.locator('svg, canvas, [data-testid="shot-chart"]')
      await expect(shotChart).toBeVisible()
    })

    // ============================================
    // Cleanup: Sign Out
    // ============================================
    await test.step('Sign out', async () => {
      // Look for user menu or sign out button
      const userMenu = page.locator('button:has-text("@"), [data-testid="user-menu"]')
      if (await userMenu.isVisible()) {
        await userMenu.click()

        const signOutButton = page.locator('button:has-text("Sign Out")')
        if (await signOutButton.isVisible()) {
          await signOutButton.click()
        }
      }

      // Should redirect to auth page
      await page.waitForURL(/\/auth/, { timeout: 5000 })
    })
  })

  test('should handle empty roster gracefully', async ({ page }) => {
    const emptyRosterEmail = `empty-roster-${Date.now()}@example.com`

    // Sign up
    await page.goto('/auth/signup')
    await page.fill('input[name="email"]', emptyRosterEmail)
    await page.fill('input[name="password"]', testPassword)
    await page.fill('input[name="confirmPassword"]', testPassword)
    await page.click('button[type="submit"]')

    await page.waitForURL(/\/demo\/teams/)

    // Create team
    await page.click('a[href*="/teams/new"], button:has-text("Create")')
    await page.waitForURL(/\/demo\/teams\/new/)

    await page.fill('input[name="name"]', 'Empty Roster Team')
    await page.selectOption('select[name="age_years"]', '10')
    await page.selectOption('select[name="level"]', 'a')

    const seasonInput = page.locator('input[name="season"]')
    const seasonValue = await seasonInput.inputValue()
    if (!seasonValue) {
      await seasonInput.fill('2024-25')
    }

    await page.click('button[type="submit"]')
    await page.waitForURL(/\/demo\/teams(?!\/new)/)

    // Try to track game without roster
    await page.click('a[href*="/game-tracking"]')
    await page.waitForURL(/\/demo\/game-tracking/)

    // Should see error message about empty roster
    await expect(page.locator('text=/no players|add players|empty roster/i')).toBeVisible({ timeout: 5000 })

    // Should have link to roster page
    await expect(page.locator('a[href*="/roster"]')).toBeVisible()
  })

  test('should allow team switching', async ({ page }) => {
    const multiTeamEmail = `multi-team-${Date.now()}@example.com`

    // Sign up
    await page.goto('/auth/signup')
    await page.fill('input[name="email"]', multiTeamEmail)
    await page.fill('input[name="password"]', testPassword)
    await page.fill('input[name="confirmPassword"]', testPassword)
    await page.click('button[type="submit"]')

    await page.waitForURL(/\/demo\/teams/)

    // Create first team
    await page.click('a[href*="/teams/new"], button:has-text("Create")')
    await page.waitForURL(/\/demo\/teams\/new/)

    await page.fill('input[name="name"]', 'Team Alpha')
    await page.selectOption('select[name="age_years"]', '10')
    await page.selectOption('select[name="level"]', 'a')

    let seasonInput = page.locator('input[name="season"]')
    let seasonValue = await seasonInput.inputValue()
    if (!seasonValue) {
      await seasonInput.fill('2024-25')
    }

    await page.click('button[type="submit"]')
    await page.waitForURL(/\/demo\/teams(?!\/new)/)

    // Create second team
    await page.click('a[href*="/teams/new"], button:has-text("Create")')
    await page.waitForURL(/\/demo\/teams\/new/)

    await page.fill('input[name="name"]', 'Team Beta')
    await page.selectOption('select[name="age_years"]', '12')
    await page.selectOption('select[name="level"]', 'aa')

    seasonInput = page.locator('input[name="season"]')
    seasonValue = await seasonInput.inputValue()
    if (!seasonValue) {
      await seasonInput.fill('2024-25')
    }

    await page.click('button[type="submit"]')
    await page.waitForURL(/\/demo\/teams(?!\/new)/)

    // Should see both teams
    await expect(page.locator('text=Team Alpha')).toBeVisible()
    await expect(page.locator('text=Team Beta')).toBeVisible()

    // Use team selector to switch teams
    const teamSelector = page.locator('[data-testid="team-selector"], button:has-text("Team"), select')
    if (await teamSelector.isVisible()) {
      await teamSelector.click()

      // Select different team
      await page.locator('text=Team Alpha').click()

      // Verify Team Alpha is now selected
      await expect(page.locator('text=Team Alpha')).toBeVisible()
    }
  })
})
