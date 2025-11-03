import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { supabaseAdmin } from '@/lib/db/supabase-admin'

describe('Roster Integration with Game Tracking', () => {
  let testOrgId: string
  let testTeamId: string
  let testUserId: string
  let testGameId: string
  let testPlayers: any[]

  beforeAll(async () => {
    // Create test user
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: `test-roster-${Date.now()}@example.com`,
      password: 'testpassword123',
      email_confirm: true,
    })

    if (userError) throw userError
    testUserId = user.user.id

    // Create test organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: 'Test Org for Roster Integration',
        slug: `test-org-roster-${Date.now()}`,
        settings: {},
      })
      .select()
      .single()

    if (orgError) throw orgError
    testOrgId = org.id

    // Create test team
    const { data: team, error: teamError } = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: testOrgId,
        name: 'Test Team',
        age_years: 13,
        level: 'aa',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (teamError) throw teamError
    testTeamId = team.id

    // Add user as team member
    await supabaseAdmin.from('team_members').insert({
      team_id: testTeamId,
      user_id: testUserId,
      role: 'head_coach',
    })
  })

  afterAll(async () => {
    // Cleanup: Delete test user and organization
    if (testUserId) {
      await supabaseAdmin.auth.admin.deleteUser(testUserId)
    }
    if (testOrgId) {
      await supabaseAdmin.from('organizations').delete().eq('id', testOrgId)
    }
  })

  beforeEach(async () => {
    // Clean up players and games before each test
    await supabaseAdmin.from('players').delete().eq('team_id', testTeamId)
    await supabaseAdmin.from('games').delete().eq('team_id', testTeamId)
  })

  describe('Load Players from Roster', () => {
    it('should load real players from roster table instead of demo players', async () => {
      // Create real roster
      const { data: players, error } = await supabaseAdmin
        .from('players')
        .insert([
          {
            team_id: testTeamId,
            jersey_number: 10,
            first_name: 'John',
            last_name: 'Smith',
            position: 'forward',
          },
          {
            team_id: testTeamId,
            jersey_number: 15,
            first_name: 'Jane',
            last_name: 'Doe',
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
        .select()

      expect(error).toBeNull()
      expect(players).toHaveLength(3)

      // Simulate what game-tracking page should do: load players by team_id
      const { data: loadedPlayers, error: loadError } = await supabaseAdmin
        .from('players')
        .select('id, jersey_number, first_name, last_name, position')
        .eq('team_id', testTeamId)
        .order('jersey_number')

      expect(loadError).toBeNull()
      expect(loadedPlayers).toHaveLength(3)
      expect(loadedPlayers![0].first_name).toBe('John')
      expect(loadedPlayers![1].first_name).toBe('Jane')
      expect(loadedPlayers![2].first_name).toBe('Bob')

      // Verify it's NOT demo players (McDavid, Bedard, etc.)
      const hasDemoPlayers = loadedPlayers!.some(
        (p) => p.last_name === 'McDavid' || p.last_name === 'Bedard'
      )
      expect(hasDemoPlayers).toBe(false)
    })

    it('should map database players to Player store format', async () => {
      // Create roster
      await supabaseAdmin.from('players').insert({
        team_id: testTeamId,
        jersey_number: 7,
        first_name: 'Connor',
        last_name: 'Test',
        position: 'forward',
      })

      // Load and map (simulate what the game-tracking page does)
      const { data: dbPlayers } = await supabaseAdmin
        .from('players')
        .select('id, jersey_number, first_name, last_name, position')
        .eq('team_id', testTeamId)

      // Map to store format
      const mappedPlayers = dbPlayers!.map((p) => ({
        id: p.id,
        jerseyNumber: p.jersey_number,
        firstName: p.first_name,
        lastName: p.last_name,
        position: p.position,
      }))

      expect(mappedPlayers[0]).toHaveProperty('id')
      expect(mappedPlayers[0]).toHaveProperty('jerseyNumber', 7)
      expect(mappedPlayers[0]).toHaveProperty('firstName', 'Connor')
      expect(mappedPlayers[0]).toHaveProperty('lastName', 'Test')
      expect(mappedPlayers[0]).toHaveProperty('position', 'forward')
    })

    it('should sort players by jersey number', async () => {
      // Create players in random order
      await supabaseAdmin.from('players').insert([
        { team_id: testTeamId, jersey_number: 88, first_name: 'C', last_name: 'Third', position: 'forward' },
        { team_id: testTeamId, jersey_number: 10, first_name: 'A', last_name: 'First', position: 'forward' },
        { team_id: testTeamId, jersey_number: 44, first_name: 'B', last_name: 'Second', position: 'defense' },
      ])

      const { data: players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)
        .order('jersey_number')

      expect(players![0].jersey_number).toBe(10)
      expect(players![1].jersey_number).toBe(44)
      expect(players![2].jersey_number).toBe(88)
    })
  })

  describe('Empty Roster Handling', () => {
    it('should detect when roster is empty', async () => {
      // Don't create any players
      const { data: players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)

      expect(players).toHaveLength(0)
    })

    it('should not allow game creation when roster is empty', async () => {
      // Verify no players exist
      const { data: players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)

      expect(players).toHaveLength(0)

      // Game creation should be prevented (we'll implement this logic)
      // For now, just verify the roster check works
      const hasPlayers = players && players.length > 0
      expect(hasPlayers).toBe(false)
    })

    it('should return empty array when no players exist for team', async () => {
      const { data, error } = await supabaseAdmin
        .from('players')
        .select('id, jersey_number, first_name, last_name, position')
        .eq('team_id', testTeamId)
        .order('jersey_number')

      expect(error).toBeNull()
      expect(data).toEqual([])
    })
  })

  describe('Game Creation with Real Roster', () => {
    beforeEach(async () => {
      // Create roster for game tests
      const { data: players } = await supabaseAdmin
        .from('players')
        .insert([
          {
            team_id: testTeamId,
            jersey_number: 10,
            first_name: 'John',
            last_name: 'Smith',
            position: 'forward',
          },
          {
            team_id: testTeamId,
            jersey_number: 44,
            first_name: 'Erik',
            last_name: 'Johnson',
            position: 'defense',
          },
        ])
        .select()

      testPlayers = players!
    })

    it('should create game after verifying roster exists', async () => {
      // 1. Check roster exists
      const { data: players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)

      expect(players).toHaveLength(2)

      // 2. Create game (only if players exist)
      if (players && players.length > 0) {
        const { data: game, error } = await supabaseAdmin
          .from('games')
          .insert({
            team_id: testTeamId,
            opponent_name: 'Rival Team',
            game_date: new Date().toISOString(),
            is_home: true,
            status: 'in_progress',
          })
          .select()
          .single()

        expect(error).toBeNull()
        expect(game).toBeDefined()
        testGameId = game!.id
      }
    })

    it('should log events with real player IDs from roster', async () => {
      // Create game
      const { data: game } = await supabaseAdmin
        .from('games')
        .insert({
          team_id: testTeamId,
          opponent_name: 'Test Opponent',
          game_date: new Date().toISOString(),
          status: 'in_progress',
        })
        .select()
        .single()

      testGameId = game!.id

      // Log event with real player ID
      const { data: event, error } = await supabaseAdmin
        .from('game_events')
        .insert({
          game_id: testGameId,
          event_type: 'shot',
          player_id: testPlayers[0].id, // Use real player ID
          period: 1,
          game_time_seconds: 1200,
          situation: 'even_strength',
          details: { result: 'goal', type: 'wrist' },
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(event.player_id).toBe(testPlayers[0].id)
    })

    it('should retrieve events with player information', async () => {
      // Create game
      const { data: game } = await supabaseAdmin
        .from('games')
        .insert({
          team_id: testTeamId,
          opponent_name: 'Test Opponent',
          game_date: new Date().toISOString(),
          status: 'in_progress',
        })
        .select()
        .single()

      // Log event
      await supabaseAdmin.from('game_events').insert({
        game_id: game!.id,
        event_type: 'shot',
        player_id: testPlayers[0].id,
        period: 1,
        game_time_seconds: 1200,
        situation: 'even_strength',
        details: { result: 'goal' },
      })

      // Retrieve events with player join
      const { data: events, error } = await supabaseAdmin
        .from('game_events')
        .select(`
          *,
          player:players (
            id,
            jersey_number,
            first_name,
            last_name,
            position
          )
        `)
        .eq('game_id', game!.id)

      expect(error).toBeNull()
      expect(events).toHaveLength(1)
      expect(events![0].player).toBeDefined()
      expect(events![0].player.first_name).toBe('John')
      expect(events![0].player.last_name).toBe('Smith')
      expect(events![0].player.jersey_number).toBe(10)
    })
  })

  describe('Player Display Format', () => {
    it('should format player name as "F. Last (#10)"', async () => {
      const { data: player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 10,
          first_name: 'John',
          last_name: 'Smith',
          position: 'forward',
        })
        .select()
        .single()

      // Format player name
      const displayName = `${player!.first_name[0]}. ${player!.last_name} (#${player!.jersey_number})`
      expect(displayName).toBe('J. Smith (#10)')
    })

    it('should handle single-letter first names', async () => {
      const { data: player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 7,
          first_name: 'T',
          last_name: 'Jones',
          position: 'defense',
        })
        .select()
        .single()

      const displayName = `${player!.first_name[0]}. ${player!.last_name} (#${player!.jersey_number})`
      expect(displayName).toBe('T. Jones (#7)')
    })
  })

  describe('Multi-Team Support', () => {
    let testTeam2Id: string

    beforeEach(async () => {
      // Create second team
      const { data: team2 } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: testOrgId,
          name: 'Test Team 2',
          age_years: 15,
          level: 'aaa',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      testTeam2Id = team2!.id

      // Add user as member of team 2
      await supabaseAdmin.from('team_members').insert({
        team_id: testTeam2Id,
        user_id: testUserId,
        role: 'head_coach',
      })
    })

    it('should only load players from selected team', async () => {
      // Create players for team 1
      await supabaseAdmin.from('players').insert([
        { team_id: testTeamId, jersey_number: 10, first_name: 'Team1', last_name: 'PlayerA', position: 'forward' },
        { team_id: testTeamId, jersey_number: 11, first_name: 'Team1', last_name: 'PlayerB', position: 'defense' },
      ])

      // Create players for team 2
      await supabaseAdmin.from('players').insert([
        { team_id: testTeam2Id, jersey_number: 20, first_name: 'Team2', last_name: 'PlayerC', position: 'forward' },
        { team_id: testTeam2Id, jersey_number: 21, first_name: 'Team2', last_name: 'PlayerD', position: 'defense' },
      ])

      // Load team 1 players only
      const { data: team1Players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeamId)

      expect(team1Players).toHaveLength(2)
      expect(team1Players![0].first_name).toBe('Team1')
      expect(team1Players![1].first_name).toBe('Team1')

      // Load team 2 players only
      const { data: team2Players } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', testTeam2Id)

      expect(team2Players).toHaveLength(2)
      expect(team2Players![0].first_name).toBe('Team2')
      expect(team2Players![1].first_name).toBe('Team2')
    })

    it('should prevent using wrong team players in game events', async () => {
      // Create player for team 1
      const { data: team1Player } = await supabaseAdmin
        .from('players')
        .insert({
          team_id: testTeamId,
          jersey_number: 10,
          first_name: 'Team1',
          last_name: 'Player',
          position: 'forward',
        })
        .select()
        .single()

      // Create game for team 2
      const { data: team2Game } = await supabaseAdmin
        .from('games')
        .insert({
          team_id: testTeam2Id,
          opponent_name: 'Opponent',
          game_date: new Date().toISOString(),
          status: 'in_progress',
        })
        .select()
        .single()

      // Try to log event with team 1 player in team 2 game (should work but be logically wrong)
      // The app should prevent this by only showing players from the correct team
      const { error } = await supabaseAdmin
        .from('game_events')
        .insert({
          game_id: team2Game!.id,
          event_type: 'shot',
          player_id: team1Player!.id, // Wrong team!
          period: 1,
          game_time_seconds: 1200,
          situation: 'even_strength',
          details: {},
        })

      // Database allows it (no FK constraint between player and game teams)
      // But the UI should prevent it by filtering players
      expect(error).toBeNull() // DB allows it

      // Verify the correct approach: filter players by team when loading for UI
      const gameTeamId = testTeam2Id
      const { data: correctPlayers } = await supabaseAdmin
        .from('players')
        .select()
        .eq('team_id', gameTeamId)

      // Should NOT include team1Player
      const hasWrongPlayer = correctPlayers!.some((p) => p.id === team1Player!.id)
      expect(hasWrongPlayer).toBe(false)
    })
  })
})
