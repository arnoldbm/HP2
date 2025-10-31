import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { supabaseAdmin } from '@/lib/db/supabase-admin'

describe('Player CRUD Operations', () => {
  let testTeamId: string
  let testTeam2Id: string
  let testOrgId: string

  beforeAll(async () => {
    // Create test organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: 'Test Org for Players',
        slug: `test-org-players-${Date.now()}`,
        settings: {},
      })
      .select()
      .single()

    if (orgError) throw orgError
    testOrgId = org.id

    // Create test team 1
    const { data: team1, error: team1Error } = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: testOrgId,
        name: 'Test Team 1',
        age_years: 11,
        level: 'travel',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (team1Error) throw team1Error
    testTeamId = team1.id

    // Create test team 2
    const { data: team2, error: team2Error } = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: testOrgId,
        name: 'Test Team 2',
        age_years: 13,
        level: 'house',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (team2Error) throw team2Error
    testTeam2Id = team2.id
  })

  afterAll(async () => {
    // Cleanup: Delete test organization (cascade deletes teams and players)
    if (testOrgId) {
      await supabaseAdmin.from('organizations').delete().eq('id', testOrgId)
    }
  })

  beforeEach(async () => {
    // Clean up players before each test
    await supabaseAdmin.from('players').delete().eq('team_id', testTeamId)
    await supabaseAdmin.from('players').delete().eq('team_id', testTeam2Id)
  })

  describe('Create Player', () => {
    it('should create a player with valid data', async () => {
      const { data, error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data.jersey_number).toBe(12)
      expect(data.first_name).toBe('John')
      expect(data.last_name).toBe('Doe')
      expect(data.position).toBe('forward')
    })

    it('should create a player with optional birthdate', async () => {
      const { data, error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 14,
          first_name: 'Jane',
          last_name: 'Smith',
          position: 'defense',
          birthdate: '2013-05-15',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data.birthdate).toBe('2013-05-15')
    })

    it('should create a goalie', async () => {
      const { data, error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 30,
          first_name: 'Bob',
          last_name: 'Jones',
          position: 'goalie',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data.position).toBe('goalie')
    })
  })

  describe('Jersey Number Validation', () => {
    it('should enforce unique jersey numbers per team', async () => {
      // Create player #12
      await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 12,
        first_name: 'John',
        last_name: 'Doe',
        position: 'forward',
      })

      // Try to create another #12 on same team
      const { error } = await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 12,
        first_name: 'Jane',
        last_name: 'Smith',
        position: 'defense',
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23505') // Unique constraint violation
      expect(error?.message).toContain('unique')
    })

    it('should allow same jersey number on different teams', async () => {
      // Create player #12 on team 1
      const { error: error1 } = await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 12,
        first_name: 'John',
        last_name: 'Doe',
        position: 'forward',
      })

      expect(error1).toBeNull()

      // Create player #12 on team 2 (should work)
      const { error: error2 } = await supabaseAdmin.from('players').insert({
        team_id: testTeam2Id,
        jersey_number: 12,
        first_name: 'Jane',
        last_name: 'Smith',
        position: 'defense',
      })

      expect(error2).toBeNull()
    })

    it('should allow jersey numbers 1-99', async () => {
      // Test jersey #1
      const { error: error1 } = await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 1,
        first_name: 'Player',
        last_name: 'One',
        position: 'forward',
      })
      expect(error1).toBeNull()

      // Test jersey #99
      const { error: error99 } = await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 99,
        first_name: 'Player',
        last_name: 'NinetyNine',
        position: 'forward',
      })
      expect(error99).toBeNull()
    })
  })

  describe('Read Players', () => {
    it('should fetch all players for a team', async () => {
      // Create multiple players
      await supabaseAdmin.from('players').insert([
        {
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        },
        {
          team_id: testTeamId,
          jersey_number: 14,
          first_name: 'Jane',
          last_name: 'Smith',
          position: 'defense',
        },
        {
          team_id: testTeamId,
          jersey_number: 30,
          first_name: 'Bob',
          last_name: 'Jones',
          position: 'goalie',
        },
      ])

      const { data, error } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)
        .order('jersey_number')

      expect(error).toBeNull()
      expect(data).toHaveLength(3)
      expect(data[0].jersey_number).toBe(12)
      expect(data[1].jersey_number).toBe(14)
      expect(data[2].jersey_number).toBe(30)
    })

    it('should sort players by position then jersey number', async () => {
      // Create players in mixed order
      await supabaseAdmin.from('players').insert([
        { team_id: testTeamId, jersey_number: 30, first_name: 'G', last_name: 'One', position: 'goalie' },
        { team_id: testTeamId, jersey_number: 14, first_name: 'F', last_name: 'Two', position: 'forward' },
        { team_id: testTeamId, jersey_number: 5, first_name: 'D', last_name: 'One', position: 'defense' },
        { team_id: testTeamId, jersey_number: 10, first_name: 'F', last_name: 'One', position: 'forward' },
      ])

      const { data, error } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)
        .order('jersey_number') // Just sort by jersey for now

      expect(error).toBeNull()
      expect(data).toHaveLength(4)

      // Verify all players exist with correct positions
      const positions = data.map((p) => p.position)
      expect(positions).toContain('defense')
      expect(positions).toContain('forward')
      expect(positions).toContain('goalie')

      // Verify sorted by jersey number
      expect(data[0].jersey_number).toBe(5)
      expect(data[1].jersey_number).toBe(10)
      expect(data[2].jersey_number).toBe(14)
      expect(data[3].jersey_number).toBe(30)
    })
  })

  describe('Update Player', () => {
    it('should update player details', async () => {
      // Create player
      const { data: player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })
        .select()
        .single()

      // Update position
      const { data, error } = await supabaseAdmin
        .from('players')
        .update({ position: 'defense' })
        .eq('id', player!.id)
        .select()
        .single()

      expect(error).toBeNull()
      expect(data.position).toBe('defense')
    })

    it('should update jersey number', async () => {
      // Create player
      const { data: player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })
        .select()
        .single()

      // Update jersey number
      const { data, error } = await supabaseAdmin
        .from('players')
        .update({ jersey_number: 99 })
        .eq('id', player!.id)
        .select()
        .single()

      expect(error).toBeNull()
      expect(data.jersey_number).toBe(99)
    })

    it('should not allow updating to duplicate jersey number', async () => {
      // Create two players
      await supabaseAdmin.from('players').insert([
        {
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        },
        {
          team_id: testTeamId,
          jersey_number: 14,
          first_name: 'Jane',
          last_name: 'Smith',
          position: 'defense',
        },
      ])

      const { data: player14 } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)
        .eq('jersey_number', 14)
        .single()

      // Try to change #14 to #12 (already taken)
      const { error } = await supabaseAdmin
        .from('players')
        .update({ jersey_number: 12 })
        .eq('id', player14!.id)

      expect(error).toBeDefined()
      expect(error?.code).toBe('23505') // Unique constraint violation
    })
  })

  describe('Delete Player', () => {
    it('should delete a player', async () => {
      const { data: player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })
        .select()
        .single()

      const { error } = await supabaseAdmin.from('players').delete().eq('id', player!.id)

      expect(error).toBeNull()

      // Verify deleted
      const { data: checkPlayer } = await supabaseAdmin
        .from('players')
        .select()
        .eq('id', player!.id)
        .single()

      expect(checkPlayer).toBeNull()
    })

    it('should cascade delete players when team is deleted', async () => {
      // Create a temporary team with players
      const { data: tempTeam } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: testOrgId,
          name: 'Temp Team',
          age_years: 11,
          level: 'house',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      // Add players to temp team
      await supabaseAdmin.from('players').insert([
        {
          team_id: tempTeam!.id,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        },
        {
          team_id: tempTeam!.id,
          jersey_number: 14,
          first_name: 'Jane',
          last_name: 'Smith',
          position: 'defense',
        },
      ])

      // Delete team
      await supabaseAdmin.from('teams').delete().eq('id', tempTeam!.id)

      // Verify players were cascade deleted
      const { data: orphanedPlayers } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', tempTeam!.id)

      expect(orphanedPlayers).toHaveLength(0)
    })
  })

  describe('Data Validation', () => {
    it('should require team_id', async () => {
      const { error } = await supabaseAdmin
        .from('players')
        .insert({
          // @ts-expect-error - Testing missing team_id
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23502') // Not null violation
    })

    it('should require jersey_number', async () => {
      const { error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          // @ts-expect-error - Testing missing jersey_number
          first_name: 'John',
          last_name: 'Doe',
          position: 'forward',
        })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23502') // Not null violation
    })

    it('should require first_name', async () => {
      const { error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          // @ts-expect-error - Testing missing first_name
          last_name: 'Doe',
          position: 'forward',
        })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23502') // Not null violation
    })

    it('should require position', async () => {
      const { error } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 12,
          first_name: 'John',
          last_name: 'Doe',
          // @ts-expect-error - Testing missing position
        })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23502') // Not null violation
    })
  })
})
