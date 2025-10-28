import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { supabaseAdmin } from '@/lib/db/supabase-admin'
import {
  saveGameEvent,
  updateGameEvent,
  deleteGameEvent,
  getGameEvents,
  mapRowToGameEvent,
} from '@/lib/db/game-events'
import type { GameEvent } from '@/lib/stores/game-tracking-store'

describe('Game Event Persistence', () => {
  let testOrgId: string
  let testTeamId: string
  let testGameId: string
  let testPlayerId: string

  // Setup test data before each test
  beforeEach(async () => {
    // Create test organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({ name: 'Test Org', slug: `test-org-${Date.now()}` })
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
        age_years: 14,
        level: 'aa',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (teamError) throw teamError
    testTeamId = team.id

    // Create test player
    const { data: player, error: playerError } = await supabaseAdmin
      .from('players')
      .insert({
        team_id: testTeamId,
        jersey_number: 99,
        first_name: 'Test',
        last_name: 'Player',
        position: 'forward',
      })
      .select()
      .single()

    if (playerError) throw playerError
    testPlayerId = player.id

    // Create test game
    const { data: game, error: gameError } = await supabaseAdmin
      .from('games')
      .insert({
        team_id: testTeamId,
        opponent_name: 'Test Opponent',
        game_date: new Date().toISOString(),
        is_home: true,
        status: 'in_progress',
        final_score_us: 0,
        final_score_them: 0,
      })
      .select()
      .single()

    if (gameError) throw gameError
    testGameId = game.id
  })

  // Cleanup after each test
  afterEach(async () => {
    // Delete in reverse order of foreign key dependencies
    if (testGameId) {
      await supabaseAdmin.from('game_events').delete().eq('game_id', testGameId)
      await supabaseAdmin.from('games').delete().eq('id', testGameId)
    }
    if (testPlayerId) {
      await supabaseAdmin.from('players').delete().eq('id', testPlayerId)
    }
    if (testTeamId) {
      await supabaseAdmin.from('teams').delete().eq('id', testTeamId)
    }
    if (testOrgId) {
      await supabaseAdmin.from('organizations').delete().eq('id', testOrgId)
    }
  })

  describe('saveGameEvent', () => {
    it('should save a shot event with coordinates', async () => {
      const testEvent: GameEvent = {
        id: 'temp_123',
        gameId: testGameId,
        eventType: 'shot',
        coordinates: { x: 150, y: 50 },
        playerId: testPlayerId,
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: {
          shot_type: 'wrist',
          result: 'save',
        },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      expect(savedEvent).toBeDefined()
      expect(savedEvent.id).toBeDefined()
      expect(savedEvent.game_id).toBe(testGameId)
      expect(savedEvent.event_type).toBe('shot')
      expect(savedEvent.x_coord).toBe(150)
      expect(savedEvent.y_coord).toBe(50)
      expect(savedEvent.player_id).toBe(testPlayerId)
      expect(savedEvent.period).toBe(1)
      expect(savedEvent.game_time_seconds).toBe(1200)
      expect(savedEvent.situation).toBe('even_strength')
      expect(savedEvent.details).toMatchObject({ shot_type: 'wrist', result: 'save' })
    })

    it('should save a breakout event without coordinates', async () => {
      const testEvent: GameEvent = {
        id: 'temp_124',
        gameId: testGameId,
        eventType: 'breakout',
        playerId: testPlayerId,
        period: 2,
        gameTimeSeconds: 900,
        situation: 'power_play',
        details: {
          success: true,
          type: 'up_boards',
        },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      expect(savedEvent).toBeDefined()
      expect(savedEvent.event_type).toBe('breakout')
      expect(savedEvent.x_coord).toBeNull()
      expect(savedEvent.y_coord).toBeNull()
      expect(savedEvent.details).toEqual({ success: true, type: 'up_boards' })
    })

    it('should save a goal (shot with result=goal)', async () => {
      const testEvent: GameEvent = {
        id: 'temp_125',
        gameId: testGameId,
        eventType: 'shot',
        coordinates: { x: 180, y: 50 },
        playerId: testPlayerId,
        period: 3,
        gameTimeSeconds: 300,
        situation: 'even_strength',
        details: {
          shot_type: 'slap',
          result: 'goal',
        },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      expect(savedEvent).toBeDefined()
      expect(savedEvent.event_type).toBe('shot')
      expect(savedEvent.details).toMatchObject({ result: 'goal' })
    })
  })

  describe('getGameEvents', () => {
    it('should retrieve all events for a game in order', async () => {
      // Save multiple events
      const event1: GameEvent = {
        id: 'temp_1',
        gameId: testGameId,
        eventType: 'shot',
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: {},
        timestamp: new Date(Date.now() - 2000).toISOString(),
      }

      const event2: GameEvent = {
        id: 'temp_2',
        gameId: testGameId,
        eventType: 'turnover',
        period: 1,
        gameTimeSeconds: 1150,
        situation: 'even_strength',
        details: {},
        timestamp: new Date(Date.now() - 1000).toISOString(),
      }

      await saveGameEvent(event1, supabaseAdmin)
      await saveGameEvent(event2, supabaseAdmin)

      const events = await getGameEvents(testGameId, supabaseAdmin)

      expect(events).toHaveLength(2)
      expect(events[0].event_type).toBe('shot')
      expect(events[1].event_type).toBe('turnover')
    })

    it('should return empty array for game with no events', async () => {
      const events = await getGameEvents(testGameId, supabaseAdmin)
      expect(events).toEqual([])
    })
  })

  describe('updateGameEvent', () => {
    it('should update event coordinates', async () => {
      const testEvent: GameEvent = {
        id: 'temp_126',
        gameId: testGameId,
        eventType: 'shot',
        coordinates: { x: 100, y: 50 },
        playerId: testPlayerId,
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: {},
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      const updatedEvent = await updateGameEvent(
        savedEvent.id,
        { coordinates: { x: 120, y: 60 } },
        supabaseAdmin
      )

      expect(updatedEvent.x_coord).toBe(120)
      expect(updatedEvent.y_coord).toBe(60)
    })

    it('should update event details', async () => {
      const testEvent: GameEvent = {
        id: 'temp_127',
        gameId: testGameId,
        eventType: 'shot',
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: { result: 'save' },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      const updatedEvent = await updateGameEvent(
        savedEvent.id,
        { details: { result: 'goal', shot_type: 'wrist' } },
        supabaseAdmin
      )

      expect(updatedEvent.details).toEqual({ result: 'goal', shot_type: 'wrist' })
    })
  })

  describe('deleteGameEvent', () => {
    it('should delete an event', async () => {
      const testEvent: GameEvent = {
        id: 'temp_128',
        gameId: testGameId,
        eventType: 'shot',
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: {},
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)

      await deleteGameEvent(savedEvent.id, supabaseAdmin)

      const events = await getGameEvents(testGameId, supabaseAdmin)
      expect(events).toHaveLength(0)
    })
  })

  describe('mapRowToGameEvent', () => {
    it('should map database row to GameEvent with coordinates', async () => {
      const testEvent: GameEvent = {
        id: 'temp_129',
        gameId: testGameId,
        eventType: 'shot',
        coordinates: { x: 150, y: 50 },
        playerId: testPlayerId,
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: { shot_type: 'wrist' },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)
      const mappedEvent = mapRowToGameEvent(savedEvent)

      expect(mappedEvent.id).toBe(savedEvent.id)
      expect(mappedEvent.gameId).toBe(testGameId)
      expect(mappedEvent.eventType).toBe('shot')
      expect(mappedEvent.coordinates).toEqual({ x: 150, y: 50 })
      expect(mappedEvent.playerId).toBe(testPlayerId)
      expect(mappedEvent.period).toBe(1)
      expect(mappedEvent.gameTimeSeconds).toBe(1200)
      expect(mappedEvent.situation).toBe('even_strength')
      expect(mappedEvent.details).toMatchObject({ shot_type: 'wrist' })
      expect(mappedEvent.timestamp).toBeDefined()
    })

    it('should map database row without coordinates', async () => {
      const testEvent: GameEvent = {
        id: 'temp_130',
        gameId: testGameId,
        eventType: 'faceoff',
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: { won: true },
        timestamp: new Date().toISOString(),
      }

      const savedEvent = await saveGameEvent(testEvent, supabaseAdmin)
      const mappedEvent = mapRowToGameEvent(savedEvent)

      expect(mappedEvent.coordinates).toBeUndefined()
      expect(mappedEvent.eventType).toBe('faceoff')
    })
  })

  describe('Full CRUD workflow', () => {
    it('should create, read, update, and delete an event', async () => {
      // Create
      const newEvent: GameEvent = {
        id: 'temp_131',
        gameId: testGameId,
        eventType: 'shot',
        coordinates: { x: 100, y: 50 },
        playerId: testPlayerId,
        period: 1,
        gameTimeSeconds: 1200,
        situation: 'even_strength',
        details: { shot_type: 'wrist', result: 'save' },
        timestamp: new Date().toISOString(),
      }

      const created = await saveGameEvent(newEvent, supabaseAdmin)
      expect(created.id).toBeDefined()

      // Read
      const events = await getGameEvents(testGameId, supabaseAdmin)
      expect(events).toHaveLength(1)
      expect(events[0].id).toBe(created.id)

      // Update
      const updated = await updateGameEvent(
        created.id,
        { details: { shot_type: 'slap', result: 'goal' } },
        supabaseAdmin
      )
      expect(updated.details).toMatchObject({ shot_type: 'slap', result: 'goal' })

      // Delete
      await deleteGameEvent(created.id, supabaseAdmin)
      const afterDelete = await getGameEvents(testGameId, supabaseAdmin)
      expect(afterDelete).toHaveLength(0)
    })
  })
})
