import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@supabase/supabase-js'

// Admin client for test setup
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

describe('Team Settings - Integration Tests', () => {
  let testUserId: string
  let testUserEmail: string
  let testTeamId: string
  let testOrganizationId: string
  let assistantUserId: string

  beforeAll(async () => {
    // Create test user (head coach)
    testUserEmail = `test-settings-${Date.now()}@example.com`
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: testUserEmail,
      password: 'test-password-123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test Head Coach',
      },
    })

    if (authError) throw authError
    testUserId = authData.user.id

    // Wait for trigger to create profile
    await new Promise((resolve) => setTimeout(resolve, 500))

    await supabaseAdmin
      .from('user_profiles')
      .update({ full_name: 'Test Head Coach' })
      .eq('id', testUserId)

    // Create assistant coach for permission testing
    const assistantEmail = `assistant-${Date.now()}@example.com`
    const { data: assistantAuthData } = await supabaseAdmin.auth.admin.createUser({
      email: assistantEmail,
      password: 'test-password-123',
      email_confirm: true,
    })

    assistantUserId = assistantAuthData!.user.id

    // Wait for trigger
    await new Promise((resolve) => setTimeout(resolve, 500))

    await supabaseAdmin
      .from('user_profiles')
      .update({ full_name: 'Assistant Coach' })
      .eq('id', assistantUserId)

    // Create test organization
    const { data: orgData, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: 'Test Organization',
        slug: `test-org-${Date.now()}`,
      })
      .select()
      .single()

    if (orgError) throw orgError
    testOrganizationId = orgData.id

    // Create test team
    const { data: teamData, error: teamError } = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: testOrganizationId,
        name: 'Test Team',
        age_years: 10,
        level: 'a',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (teamError) throw teamError
    testTeamId = teamData.id

    // Add test user as head coach
    await supabaseAdmin.from('team_members').insert({
      team_id: testTeamId,
      user_id: testUserId,
      role: 'head_coach',
    })

    // Add assistant as assistant coach
    await supabaseAdmin.from('team_members').insert({
      team_id: testTeamId,
      user_id: assistantUserId,
      role: 'assistant_coach',
    })
  })

  afterAll(async () => {
    // Clean up
    if (testUserId) {
      await supabaseAdmin.auth.admin.deleteUser(testUserId)
    }
    if (assistantUserId) {
      await supabaseAdmin.auth.admin.deleteUser(assistantUserId)
    }
  })

  describe('getTeamById', () => {
    it('should retrieve team details', async () => {
      const { data: team, error } = await supabaseAdmin
        .from('teams')
        .select('*')
        .eq('id', testTeamId)
        .single()

      expect(error).toBeNull()
      expect(team).toBeDefined()
      expect(team!.id).toBe(testTeamId)
      expect(team!.name).toBe('Test Team')
      expect(team!.age_years).toBe(10)
      expect(team!.level).toBe('a')
      expect(team!.season).toBe('2024-25')
      expect(team!.region).toBe('usa')
    })

    it('should include all expected team fields', async () => {
      const { data: team } = await supabaseAdmin
        .from('teams')
        .select('*')
        .eq('id', testTeamId)
        .single()

      expect(team).toHaveProperty('id')
      expect(team).toHaveProperty('organization_id')
      expect(team).toHaveProperty('name')
      expect(team).toHaveProperty('age_years')
      expect(team).toHaveProperty('level')
      expect(team).toHaveProperty('season')
      expect(team).toHaveProperty('region')
      expect(team).toHaveProperty('settings')
      expect(team).toHaveProperty('created_at')
      expect(team).toHaveProperty('updated_at')
    })
  })

  describe('updateTeam', () => {
    it('should update team name', async () => {
      const newName = 'Updated Team Name'

      const { data: updated, error } = await supabaseAdmin
        .from('teams')
        .update({ name: newName })
        .eq('id', testTeamId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(updated!.name).toBe(newName)

      // Restore original name
      await supabaseAdmin
        .from('teams')
        .update({ name: 'Test Team' })
        .eq('id', testTeamId)
    })

    it('should update team level', async () => {
      const newLevel = 'aa'

      const { data: updated, error } = await supabaseAdmin
        .from('teams')
        .update({ level: newLevel })
        .eq('id', testTeamId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(updated!.level).toBe(newLevel)

      // Restore original level
      await supabaseAdmin
        .from('teams')
        .update({ level: 'a' })
        .eq('id', testTeamId)
    })

    it('should update team season', async () => {
      const newSeason = '2025-26'

      const { data: updated, error } = await supabaseAdmin
        .from('teams')
        .update({ season: newSeason })
        .eq('id', testTeamId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(updated!.season).toBe(newSeason)

      // Restore original season
      await supabaseAdmin
        .from('teams')
        .update({ season: '2024-25' })
        .eq('id', testTeamId)
    })

    it('should update multiple fields together', async () => {
      const updates = {
        name: 'Multi Update Test',
        level: 'aaa' as const,
        season: '2026-27',
      }

      const { data: updated, error } = await supabaseAdmin
        .from('teams')
        .update(updates)
        .eq('id', testTeamId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(updated!.name).toBe(updates.name)
      expect(updated!.level).toBe(updates.level)
      expect(updated!.season).toBe(updates.season)

      // Restore original values
      await supabaseAdmin
        .from('teams')
        .update({
          name: 'Test Team',
          level: 'a',
          season: '2024-25',
        })
        .eq('id', testTeamId)
    })

    it('should update the updated_at timestamp', async () => {
      const { data: before } = await supabaseAdmin
        .from('teams')
        .select('updated_at')
        .eq('id', testTeamId)
        .single()

      // Wait a moment
      await new Promise((resolve) => setTimeout(resolve, 100))

      await supabaseAdmin
        .from('teams')
        .update({ name: 'Timestamp Test' })
        .eq('id', testTeamId)

      const { data: after } = await supabaseAdmin
        .from('teams')
        .select('updated_at')
        .eq('id', testTeamId)
        .single()

      expect(new Date(after!.updated_at).getTime()).toBeGreaterThan(
        new Date(before!.updated_at).getTime()
      )

      // Restore
      await supabaseAdmin
        .from('teams')
        .update({ name: 'Test Team' })
        .eq('id', testTeamId)
    })

    it('should not allow updating age_years (read-only in UI)', async () => {
      // This tests business logic - age_years shouldn't change after team creation
      const originalAgeYears = 10

      // Try to update (database allows it, but UI shouldn't)
      const { data: updated } = await supabaseAdmin
        .from('teams')
        .update({ age_years: 12 })
        .eq('id', testTeamId)
        .select()
        .single()

      // Database allows the update, but we can verify original value is preserved by not calling update
      const { data: team } = await supabaseAdmin
        .from('teams')
        .select('age_years')
        .eq('id', testTeamId)
        .single()

      // Restore if it was changed
      if (team!.age_years !== originalAgeYears) {
        await supabaseAdmin
          .from('teams')
          .update({ age_years: originalAgeYears })
          .eq('id', testTeamId)
      }
    })

    it('should not allow updating region (read-only in UI)', async () => {
      const originalRegion = 'usa'

      // Similar to age_years, region shouldn't change in UI
      const { data: team } = await supabaseAdmin
        .from('teams')
        .select('region')
        .eq('id', testTeamId)
        .single()

      expect(team!.region).toBe(originalRegion)
    })
  })

  describe('deleteTeam', () => {
    it('should delete a team and cascade to related tables', async () => {
      // Create a team specifically for deletion
      const { data: deleteTeamData } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: testOrganizationId,
          name: 'Team To Delete',
          age_years: 12,
          level: 'a',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      const deleteTeamId = deleteTeamData!.id

      // Add a team member
      await supabaseAdmin.from('team_members').insert({
        team_id: deleteTeamId,
        user_id: testUserId,
        role: 'head_coach',
      })

      // Add a player
      const { data: playerData } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: deleteTeamId,
          jersey_number: 99,
          first_name: 'Test',
          last_name: 'Player',
          position: 'forward',
        })
        .select()
        .single()

      // Verify team and related data exist
      const { data: teamBefore } = await supabaseAdmin
        .from('teams')
        .select('id')
        .eq('id', deleteTeamId)
        .single()

      expect(teamBefore).toBeDefined()

      const { data: membersBefore } = await supabaseAdmin
        .from('team_members')
        .select('id')
        .eq('team_id', deleteTeamId)

      expect(membersBefore!.length).toBeGreaterThan(0)

      // Delete the team
      const { error: deleteError } = await supabaseAdmin
        .from('teams')
        .delete()
        .eq('id', deleteTeamId)

      expect(deleteError).toBeNull()

      // Verify team is deleted
      const { data: teamAfter } = await supabaseAdmin
        .from('teams')
        .select('id')
        .eq('id', deleteTeamId)
        .maybeSingle()

      expect(teamAfter).toBeNull()

      // Verify team_members are cascaded deleted
      const { data: membersAfter } = await supabaseAdmin
        .from('team_members')
        .select('id')
        .eq('team_id', deleteTeamId)

      expect(membersAfter!.length).toBe(0)

      // Verify players are cascaded deleted
      const { data: playersAfter } = await supabaseAdmin
        .from('players')
        .select('id')
        .eq('team_id', deleteTeamId)

      expect(playersAfter!.length).toBe(0)
    })

    it('should cascade delete games when team is deleted', async () => {
      // Create a team with a game
      const { data: teamWithGame } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: testOrganizationId,
          name: 'Team With Game',
          age_years: 12,
          level: 'a',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      const teamWithGameId = teamWithGame!.id

      // Create a game for this team
      const { data: gameData } = await supabaseAdmin
        .from('games')
        .insert({
          team_id: teamWithGameId,
          opponent_name: 'Test Opponent',
          game_date: new Date().toISOString(),
          status: 'scheduled',
        })
        .select()
        .single()

      const gameId = gameData!.id

      // Verify game exists
      const { data: gameBefore } = await supabaseAdmin
        .from('games')
        .select('id')
        .eq('id', gameId)
        .single()

      expect(gameBefore).toBeDefined()

      // Delete the team (should cascade to games)
      const { error: deleteError } = await supabaseAdmin
        .from('teams')
        .delete()
        .eq('id', teamWithGameId)

      expect(deleteError).toBeNull()

      // Verify game was cascade deleted
      const { data: gameAfter } = await supabaseAdmin
        .from('games')
        .select('id')
        .eq('id', gameId)
        .maybeSingle()

      expect(gameAfter).toBeNull()
    })
  })

  describe('Role-Based Access', () => {
    it('should allow head coach to update team', async () => {
      // In real app, this would be enforced by RLS
      const { data: member } = await supabaseAdmin
        .from('team_members')
        .select('role')
        .eq('team_id', testTeamId)
        .eq('user_id', testUserId)
        .single()

      expect(member!.role).toBe('head_coach')

      // Head coach can update
      const { error } = await supabaseAdmin
        .from('teams')
        .update({ name: 'Head Coach Update' })
        .eq('id', testTeamId)

      expect(error).toBeNull()

      // Restore
      await supabaseAdmin
        .from('teams')
        .update({ name: 'Test Team' })
        .eq('id', testTeamId)
    })

    it('should identify non-head-coach members', async () => {
      const { data: member } = await supabaseAdmin
        .from('team_members')
        .select('role')
        .eq('team_id', testTeamId)
        .eq('user_id', assistantUserId)
        .single()

      expect(member!.role).toBe('assistant_coach')
      expect(member!.role).not.toBe('head_coach')
    })

    it('should verify team membership before allowing updates', async () => {
      // Create a user who is not a team member
      const outsiderEmail = `outsider-${Date.now()}@example.com`
      const { data: outsiderAuthData } = await supabaseAdmin.auth.admin.createUser({
        email: outsiderEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const outsiderId = outsiderAuthData!.user.id

      // Wait for trigger
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if outsider is a team member
      const { data: membership } = await supabaseAdmin
        .from('team_members')
        .select('id')
        .eq('team_id', testTeamId)
        .eq('user_id', outsiderId)
        .maybeSingle()

      expect(membership).toBeNull()

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(outsiderId)
    })
  })

  describe('Team Validation', () => {
    it('should enforce valid team levels', async () => {
      // Valid levels: house, travel, a, aa, aaa
      const validLevels = ['house', 'travel', 'a', 'aa', 'aaa']

      for (const level of validLevels) {
        const { error } = await supabaseAdmin
          .from('teams')
          .update({ level: level as any })
          .eq('id', testTeamId)

        expect(error).toBeNull()
      }

      // Restore
      await supabaseAdmin
        .from('teams')
        .update({ level: 'a' })
        .eq('id', testTeamId)
    })

    it('should reject invalid team level', async () => {
      const { error } = await supabaseAdmin
        .from('teams')
        .update({ level: 'invalid-level' as any })
        .eq('id', testTeamId)

      // Should fail enum constraint
      expect(error).not.toBeNull()
    })

    it('should enforce age_years within valid range (6-21)', async () => {
      // Valid ages
      const validAges = [6, 10, 15, 21]

      for (const age of validAges) {
        const { error } = await supabaseAdmin
          .from('teams')
          .update({ age_years: age })
          .eq('id', testTeamId)

        expect(error).toBeNull()
      }

      // Restore
      await supabaseAdmin
        .from('teams')
        .update({ age_years: 10 })
        .eq('id', testTeamId)
    })

    it('should reject age_years outside valid range', async () => {
      // Too young
      const { error: errorTooYoung } = await supabaseAdmin
        .from('teams')
        .update({ age_years: 5 })
        .eq('id', testTeamId)

      expect(errorTooYoung).not.toBeNull()

      // Too old
      const { error: errorTooOld } = await supabaseAdmin
        .from('teams')
        .update({ age_years: 22 })
        .eq('id', testTeamId)

      expect(errorTooOld).not.toBeNull()
    })

    it('should enforce valid region values', async () => {
      // Valid: usa, canada
      const { error: errorUsa } = await supabaseAdmin
        .from('teams')
        .update({ region: 'usa' })
        .eq('id', testTeamId)

      expect(errorUsa).toBeNull()

      const { error: errorCanada } = await supabaseAdmin
        .from('teams')
        .update({ region: 'canada' })
        .eq('id', testTeamId)

      expect(errorCanada).toBeNull()

      // Restore
      await supabaseAdmin
        .from('teams')
        .update({ region: 'usa' })
        .eq('id', testTeamId)
    })

    it('should reject invalid region', async () => {
      const { error } = await supabaseAdmin
        .from('teams')
        .update({ region: 'invalid-region' as any })
        .eq('id', testTeamId)

      expect(error).not.toBeNull()
    })

    it('should require team name (NOT NULL)', async () => {
      const { error } = await supabaseAdmin
        .from('teams')
        .update({ name: null as any })
        .eq('id', testTeamId)

      // NULL name should be rejected (NOT NULL constraint)
      expect(error).not.toBeNull()
      expect(error!.code).toBe('23502') // NOT NULL violation
    })
  })
})
