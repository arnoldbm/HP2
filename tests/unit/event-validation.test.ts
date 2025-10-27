import { describe, it, expect } from 'vitest'
import {
  shotEventDetailsSchema,
  breakoutEventDetailsSchema,
  turnoverEventDetailsSchema,
  zoneEntryEventDetailsSchema,
  faceoffEventDetailsSchema,
  gameEventCreateSchema,
} from '@/lib/validation/event-schemas'
import { ZodError } from 'zod'

describe('Event Validation Schemas', () => {
  describe('shotEventDetailsSchema', () => {
    it('should validate a valid shot event', () => {
      const validShot = {
        shot_type: 'wrist',
        result: 'save',
        shot_quality: 'high',
        rebound: false,
      }
      const result = shotEventDetailsSchema.parse(validShot)
      expect(result).toEqual(validShot)
    })

    it('should allow optional rebound field', () => {
      const shotWithoutRebound = {
        shot_type: 'slap',
        result: 'goal',
        shot_quality: 'medium',
      }
      const result = shotEventDetailsSchema.parse(shotWithoutRebound)
      expect(result.rebound).toBeUndefined()
    })

    it('should reject invalid shot_type', () => {
      const invalidShot = {
        shot_type: 'invalid_type',
        result: 'save',
        shot_quality: 'high',
      }
      expect(() => shotEventDetailsSchema.parse(invalidShot)).toThrow(ZodError)
    })

    it('should reject invalid result', () => {
      const invalidShot = {
        shot_type: 'wrist',
        result: 'invalid_result',
        shot_quality: 'high',
      }
      expect(() => shotEventDetailsSchema.parse(invalidShot)).toThrow(ZodError)
    })

    it('should reject invalid shot_quality', () => {
      const invalidShot = {
        shot_type: 'wrist',
        result: 'save',
        shot_quality: 'invalid_quality',
      }
      expect(() => shotEventDetailsSchema.parse(invalidShot)).toThrow(ZodError)
    })

    it('should validate all valid shot types', () => {
      const shotTypes = ['wrist', 'slap', 'snap', 'backhand', 'deflection', 'one_timer']
      shotTypes.forEach(type => {
        const shot = { shot_type: type, result: 'save', shot_quality: 'medium' }
        expect(() => shotEventDetailsSchema.parse(shot)).not.toThrow()
      })
    })

    it('should validate all valid results', () => {
      const results = ['goal', 'save', 'miss_high', 'miss_wide', 'blocked', 'post']
      results.forEach(result => {
        const shot = { shot_type: 'wrist', result, shot_quality: 'medium' }
        expect(() => shotEventDetailsSchema.parse(shot)).not.toThrow()
      })
    })
  })

  describe('breakoutEventDetailsSchema', () => {
    it('should validate a valid breakout event', () => {
      const validBreakout = {
        success: true,
        type: 'up_boards',
        exit_zone: 'left',
      }
      const result = breakoutEventDetailsSchema.parse(validBreakout)
      expect(result).toEqual(validBreakout)
    })

    it('should allow optional exit_zone', () => {
      const breakout = {
        success: false,
        type: 'center_ice',
      }
      const result = breakoutEventDetailsSchema.parse(breakout)
      expect(result.exit_zone).toBeUndefined()
    })

    it('should validate all breakout types', () => {
      const types = ['up_boards', 'center_ice', 'cross_ice', 'carry']
      types.forEach(type => {
        const breakout = { success: true, type }
        expect(() => breakoutEventDetailsSchema.parse(breakout)).not.toThrow()
      })
    })

    it('should validate all exit zones', () => {
      const zones = ['left', 'center', 'right']
      zones.forEach(zone => {
        const breakout = { success: true, type: 'up_boards', exit_zone: zone }
        expect(() => breakoutEventDetailsSchema.parse(breakout)).not.toThrow()
      })
    })

    it('should reject invalid breakout type', () => {
      const invalid = { success: true, type: 'invalid_type' }
      expect(() => breakoutEventDetailsSchema.parse(invalid)).toThrow(ZodError)
    })
  })

  describe('turnoverEventDetailsSchema', () => {
    it('should validate a valid turnover event', () => {
      const validTurnover = {
        type: 'bad_pass',
        recovery: false,
      }
      const result = turnoverEventDetailsSchema.parse(validTurnover)
      expect(result).toEqual(validTurnover)
    })

    it('should allow optional recovery field', () => {
      const turnover = {
        type: 'lost_puck',
      }
      const result = turnoverEventDetailsSchema.parse(turnover)
      expect(result.recovery).toBeUndefined()
    })

    it('should validate all turnover types', () => {
      const types = ['bad_pass', 'lost_puck', 'forced']
      types.forEach(type => {
        const turnover = { type }
        expect(() => turnoverEventDetailsSchema.parse(turnover)).not.toThrow()
      })
    })

    it('should reject invalid turnover type', () => {
      const invalid = { type: 'invalid_type' }
      expect(() => turnoverEventDetailsSchema.parse(invalid)).toThrow(ZodError)
    })
  })

  describe('zoneEntryEventDetailsSchema', () => {
    it('should validate a valid zone entry event', () => {
      const validEntry = {
        entry_type: 'carry',
        controlled: true,
      }
      const result = zoneEntryEventDetailsSchema.parse(validEntry)
      expect(result).toEqual(validEntry)
    })

    it('should validate all entry types', () => {
      const types = ['dump', 'carry', 'pass']
      types.forEach(type => {
        const entry = { entry_type: type, controlled: true }
        expect(() => zoneEntryEventDetailsSchema.parse(entry)).not.toThrow()
      })
    })

    it('should reject invalid entry type', () => {
      const invalid = { entry_type: 'invalid_type', controlled: true }
      expect(() => zoneEntryEventDetailsSchema.parse(invalid)).toThrow(ZodError)
    })
  })

  describe('faceoffEventDetailsSchema', () => {
    it('should validate a valid faceoff event', () => {
      const validFaceoff = {
        won: true,
        location: 'offensive_left',
      }
      const result = faceoffEventDetailsSchema.parse(validFaceoff)
      expect(result).toEqual(validFaceoff)
    })

    it('should require won field', () => {
      const invalid = { location: 'center_ice' }
      expect(() => faceoffEventDetailsSchema.parse(invalid)).toThrow(ZodError)
    })

    it('should require location field', () => {
      const invalid = { won: true }
      expect(() => faceoffEventDetailsSchema.parse(invalid)).toThrow(ZodError)
    })
  })

  describe('gameEventCreateSchema', () => {
    const validBaseEvent = {
      game_id: '123e4567-e89b-12d3-a456-426614174000',
      event_type: 'shot',
      period: 1,
      situation: 'even_strength',
      details: { shot_type: 'wrist', result: 'save', shot_quality: 'high' },
    }

    it('should validate a complete valid game event', () => {
      const validEvent = {
        ...validBaseEvent,
        x_coord: 95,
        y_coord: 50,
        game_time_seconds: 1200,
        player_id: '123e4567-e89b-12d3-a456-426614174001',
        zone: 'offensive',
        notes: 'Great shot attempt',
      }
      const result = gameEventCreateSchema.parse(validEvent)
      expect(result).toEqual(validEvent)
    })

    it('should validate minimal required fields', () => {
      const result = gameEventCreateSchema.parse(validBaseEvent)
      expect(result.game_id).toBe(validBaseEvent.game_id)
      expect(result.event_type).toBe(validBaseEvent.event_type)
    })

    it('should reject invalid game_id format', () => {
      const invalid = { ...validBaseEvent, game_id: 'not-a-uuid' }
      expect(() => gameEventCreateSchema.parse(invalid)).toThrow(ZodError)
    })

    it('should validate all event types', () => {
      const types = ['shot', 'goal', 'breakout', 'turnover', 'zone_entry', 'faceoff', 'penalty', 'defensive_breakdown']
      types.forEach(type => {
        const event = { ...validBaseEvent, event_type: type }
        expect(() => gameEventCreateSchema.parse(event)).not.toThrow()
      })
    })

    it('should enforce x_coord range (0-200)', () => {
      const invalidLow = { ...validBaseEvent, x_coord: -1 }
      const invalidHigh = { ...validBaseEvent, x_coord: 201 }
      expect(() => gameEventCreateSchema.parse(invalidLow)).toThrow(ZodError)
      expect(() => gameEventCreateSchema.parse(invalidHigh)).toThrow(ZodError)
    })

    it('should enforce y_coord range (0-100)', () => {
      const invalidLow = { ...validBaseEvent, y_coord: -1 }
      const invalidHigh = { ...validBaseEvent, y_coord: 101 }
      expect(() => gameEventCreateSchema.parse(invalidLow)).toThrow(ZodError)
      expect(() => gameEventCreateSchema.parse(invalidHigh)).toThrow(ZodError)
    })

    it('should enforce period range (1-5)', () => {
      const invalidLow = { ...validBaseEvent, period: 0 }
      const invalidHigh = { ...validBaseEvent, period: 6 }
      expect(() => gameEventCreateSchema.parse(invalidLow)).toThrow(ZodError)
      expect(() => gameEventCreateSchema.parse(invalidHigh)).toThrow(ZodError)
    })

    it('should enforce game_time_seconds range (0-1200)', () => {
      const invalidLow = { ...validBaseEvent, game_time_seconds: -1 }
      const invalidHigh = { ...validBaseEvent, game_time_seconds: 1201 }
      expect(() => gameEventCreateSchema.parse(invalidLow)).toThrow(ZodError)
      expect(() => gameEventCreateSchema.parse(invalidHigh)).toThrow(ZodError)
    })

    it('should validate all situations', () => {
      const situations = ['even_strength', 'power_play', 'penalty_kill', 'empty_net']
      situations.forEach(situation => {
        const event = { ...validBaseEvent, situation }
        expect(() => gameEventCreateSchema.parse(event)).not.toThrow()
      })
    })

    it('should validate all zones', () => {
      const zones = ['defensive', 'neutral', 'offensive']
      zones.forEach(zone => {
        const event = { ...validBaseEvent, zone }
        expect(() => gameEventCreateSchema.parse(event)).not.toThrow()
      })
    })

    it('should default situation to even_strength', () => {
      const eventWithoutSituation = {
        game_id: validBaseEvent.game_id,
        event_type: validBaseEvent.event_type,
        period: validBaseEvent.period,
        details: validBaseEvent.details,
      }
      const result = gameEventCreateSchema.parse(eventWithoutSituation)
      expect(result.situation).toBe('even_strength')
    })
  })
})
