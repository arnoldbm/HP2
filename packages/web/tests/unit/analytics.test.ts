import { describe, it, expect } from 'vitest'
import {
  extractShotData,
  calculateShotQualityStats,
  analyzeBreakouts,
  getPeriodStats,
  extractTurnoverData,
  getShootingPercentageBySituation,
} from '@/lib/analytics/game-analytics'
import type { GameEvent } from '@/lib/stores/game-tracking-store-configured'

describe('Game Analytics', () => {
  // Helper to create test events
  const createShotEvent = (
    result: string,
    x: number,
    y: number,
    period: number = 1,
    situation: string = 'even_strength',
    shotQuality?: string
  ): GameEvent => ({
    id: `shot-${Math.random()}`,
    gameId: 'test-game',
    eventType: 'shot',
    coordinates: { x, y },
    playerId: 'player-1',
    period,
    gameTimeSeconds: 600,
    situation,
    details: {
      result,
      ...(shotQuality && { shot_quality: shotQuality }),
    },
    timestamp: new Date().toISOString(),
  })

  const createBreakoutEvent = (
    success: boolean,
    type: string,
    period: number = 1
  ): GameEvent => ({
    id: `breakout-${Math.random()}`,
    gameId: 'test-game',
    eventType: 'breakout',
    coordinates: { x: 50, y: 50 },
    playerId: 'player-1',
    period,
    gameTimeSeconds: 600,
    situation: 'even_strength',
    details: {
      success,
      type,
    },
    timestamp: new Date().toISOString(),
  })

  const createTurnoverEvent = (x: number, y: number, period: number = 1): GameEvent => ({
    id: `turnover-${Math.random()}`,
    gameId: 'test-game',
    eventType: 'turnover',
    coordinates: { x, y },
    playerId: 'player-1',
    period,
    gameTimeSeconds: 600,
    situation: 'even_strength',
    details: {},
    timestamp: new Date().toISOString(),
  })

  describe('extractShotData', () => {
    it('should extract shot data from events', () => {
      const events: GameEvent[] = [
        createShotEvent('goal', 100, 50, 1, 'even_strength', 'high'),
        createShotEvent('save', 150, 60, 2, 'power_play', 'medium'),
      ]

      const shotData = extractShotData(events)

      expect(shotData).toHaveLength(2)
      expect(shotData[0]).toMatchObject({
        x: 100,
        y: 50,
        result: 'goal',
        shotQuality: 'high',
        period: 1,
        situation: 'even_strength',
      })
      expect(shotData[1]).toMatchObject({
        x: 150,
        y: 60,
        result: 'save',
        shotQuality: 'medium',
        period: 2,
        situation: 'power_play',
      })
    })

    it('should filter out non-shot events', () => {
      const events: GameEvent[] = [
        createShotEvent('goal', 100, 50),
        createBreakoutEvent(true, 'up_boards'),
        createTurnoverEvent(75, 40),
      ]

      const shotData = extractShotData(events)

      expect(shotData).toHaveLength(1)
      expect(shotData[0].result).toBe('goal')
    })

    it('should filter out shots without coordinates', () => {
      const eventWithoutCoords: GameEvent = {
        id: 'shot-no-coords',
        gameId: 'test-game',
        eventType: 'shot',
        coordinates: undefined,
        playerId: 'player-1',
        period: 1,
        gameTimeSeconds: 600,
        situation: 'even_strength',
        details: { result: 'goal' },
        timestamp: new Date().toISOString(),
      }

      const shotData = extractShotData([eventWithoutCoords])

      expect(shotData).toHaveLength(0)
    })

    it('should handle shots without shot_quality', () => {
      const events: GameEvent[] = [createShotEvent('goal', 100, 50)]

      const shotData = extractShotData(events)

      expect(shotData).toHaveLength(1)
      expect(shotData[0].shotQuality).toBeUndefined()
    })
  })

  describe('calculateShotQualityStats', () => {
    it('should calculate shot quality statistics correctly', () => {
      const events: GameEvent[] = [
        // High danger: 2 shots, 1 goal = 50%
        createShotEvent('goal', 90, 50, 1, 'even_strength', 'high'),
        createShotEvent('save', 95, 55, 1, 'even_strength', 'high'),
        // Medium danger: 3 shots, 1 goal = 33.3%
        createShotEvent('goal', 120, 70, 1, 'even_strength', 'medium'),
        createShotEvent('save', 125, 75, 1, 'even_strength', 'medium'),
        createShotEvent('miss_high', 130, 80, 1, 'even_strength', 'medium'),
        // Low danger: 2 shots, 0 goals = 0%
        createShotEvent('save', 160, 90, 1, 'even_strength', 'low'),
        createShotEvent('blocked', 170, 95, 1, 'even_strength', 'low'),
      ]

      const stats = calculateShotQualityStats(events)

      // High danger stats
      expect(stats.high.count).toBe(2)
      expect(stats.high.goals).toBe(1)
      expect(stats.high.percentage).toBe(50)

      // Medium danger stats
      expect(stats.medium.count).toBe(3)
      expect(stats.medium.goals).toBe(1)
      expect(stats.medium.percentage).toBeCloseTo(33.33, 1)

      // Low danger stats
      expect(stats.low.count).toBe(2)
      expect(stats.low.goals).toBe(0)
      expect(stats.low.percentage).toBe(0)

      // Total stats
      expect(stats.total.count).toBe(7)
      expect(stats.total.goals).toBe(2)
      expect(stats.total.percentage).toBeCloseTo(28.57, 1)
    })

    it('should handle empty events array', () => {
      const stats = calculateShotQualityStats([])

      expect(stats.total.count).toBe(0)
      expect(stats.total.goals).toBe(0)
      expect(stats.total.percentage).toBe(0)
      expect(stats.high.count).toBe(0)
      expect(stats.medium.count).toBe(0)
      expect(stats.low.count).toBe(0)
    })

    it('should handle shots without quality ratings', () => {
      const events: GameEvent[] = [
        createShotEvent('goal', 100, 50),
        createShotEvent('save', 110, 55),
      ]

      const stats = calculateShotQualityStats(events)

      expect(stats.total.count).toBe(2)
      expect(stats.total.goals).toBe(1)
      expect(stats.high.count).toBe(0)
      expect(stats.medium.count).toBe(0)
      expect(stats.low.count).toBe(0)
    })

    it('should calculate 0% when no goals scored', () => {
      const events: GameEvent[] = [
        createShotEvent('save', 90, 50, 1, 'even_strength', 'high'),
        createShotEvent('miss_high', 95, 55, 1, 'even_strength', 'high'),
      ]

      const stats = calculateShotQualityStats(events)

      expect(stats.high.percentage).toBe(0)
      expect(stats.total.percentage).toBe(0)
    })
  })

  describe('analyzeBreakouts', () => {
    it('should calculate overall breakout statistics', () => {
      const events: GameEvent[] = [
        createBreakoutEvent(true, 'up_boards'),
        createBreakoutEvent(true, 'center_ice'),
        createBreakoutEvent(false, 'up_boards'),
        createBreakoutEvent(false, 'reverse'),
      ]

      const analytics = analyzeBreakouts(events)

      expect(analytics.total).toBe(4)
      expect(analytics.successful).toBe(2)
      expect(analytics.failed).toBe(2)
      expect(analytics.successRate).toBe(50)
    })

    it('should calculate success rates by breakout type', () => {
      const events: GameEvent[] = [
        // Up boards: 2/3 = 66.7%
        createBreakoutEvent(true, 'up_boards'),
        createBreakoutEvent(true, 'up_boards'),
        createBreakoutEvent(false, 'up_boards'),
        // Center ice: 1/1 = 100%
        createBreakoutEvent(true, 'center_ice'),
        // Reverse: 0/2 = 0%
        createBreakoutEvent(false, 'reverse'),
        createBreakoutEvent(false, 'reverse'),
      ]

      const analytics = analyzeBreakouts(events)

      expect(analytics.byType['up_boards'].total).toBe(3)
      expect(analytics.byType['up_boards'].successful).toBe(2)
      expect(analytics.byType['up_boards'].successRate).toBeCloseTo(66.67, 1)

      expect(analytics.byType['center_ice'].total).toBe(1)
      expect(analytics.byType['center_ice'].successful).toBe(1)
      expect(analytics.byType['center_ice'].successRate).toBe(100)

      expect(analytics.byType['reverse'].total).toBe(2)
      expect(analytics.byType['reverse'].successful).toBe(0)
      expect(analytics.byType['reverse'].successRate).toBe(0)
    })

    it('should handle empty breakouts', () => {
      const analytics = analyzeBreakouts([])

      expect(analytics.total).toBe(0)
      expect(analytics.successful).toBe(0)
      expect(analytics.failed).toBe(0)
      expect(analytics.successRate).toBe(0)
      expect(Object.keys(analytics.byType)).toHaveLength(0)
    })

    it('should filter out non-breakout events', () => {
      const events: GameEvent[] = [
        createBreakoutEvent(true, 'up_boards'),
        createShotEvent('goal', 100, 50),
        createTurnoverEvent(75, 40),
      ]

      const analytics = analyzeBreakouts(events)

      expect(analytics.total).toBe(1)
    })
  })

  describe('getPeriodStats', () => {
    it('should calculate stats for each period', () => {
      const events: GameEvent[] = [
        // Period 1: 2 shots (1 goal), 1 turnover
        createShotEvent('goal', 100, 50, 1),
        createShotEvent('save', 110, 55, 1),
        createTurnoverEvent(75, 40, 1),
        // Period 2: 1 shot, 2 turnovers
        createShotEvent('miss_high', 120, 60, 2),
        createTurnoverEvent(80, 45, 2),
        createTurnoverEvent(85, 50, 2),
        // Period 3: 0 events
      ]

      const periodStats = getPeriodStats(events, 3)

      expect(periodStats).toHaveLength(3)

      // Period 1
      expect(periodStats[0].period).toBe(1)
      expect(periodStats[0].shots).toBe(2)
      expect(periodStats[0].goals).toBe(1)
      expect(periodStats[0].turnovers).toBe(1)

      // Period 2
      expect(periodStats[1].period).toBe(2)
      expect(periodStats[1].shots).toBe(1)
      expect(periodStats[1].goals).toBe(0)
      expect(periodStats[1].turnovers).toBe(2)

      // Period 3 (no events)
      expect(periodStats[2].period).toBe(3)
      expect(periodStats[2].shots).toBe(0)
      expect(periodStats[2].goals).toBe(0)
      expect(periodStats[2].turnovers).toBe(0)
    })

    it('should count breakouts and zone entries', () => {
      const events: GameEvent[] = [
        createBreakoutEvent(true, 'up_boards', 1),
        createBreakoutEvent(false, 'reverse', 1),
        {
          id: 'zone-entry-1',
          gameId: 'test-game',
          eventType: 'zone_entry',
          coordinates: { x: 100, y: 50 },
          playerId: 'player-1',
          period: 1,
          gameTimeSeconds: 600,
          situation: 'even_strength',
          details: {},
          timestamp: new Date().toISOString(),
        },
      ]

      const periodStats = getPeriodStats(events, 1)

      expect(periodStats[0].breakouts).toBe(2)
      expect(periodStats[0].zoneEntries).toBe(1)
    })

    it('should handle empty events array', () => {
      const periodStats = getPeriodStats([], 3)

      expect(periodStats).toHaveLength(3)
      periodStats.forEach((stat) => {
        expect(stat.shots).toBe(0)
        expect(stat.goals).toBe(0)
        expect(stat.turnovers).toBe(0)
        expect(stat.breakouts).toBe(0)
        expect(stat.zoneEntries).toBe(0)
      })
    })
  })

  describe('extractTurnoverData', () => {
    it('should extract turnover locations', () => {
      const events: GameEvent[] = [
        createTurnoverEvent(75, 40, 1),
        createTurnoverEvent(85, 50, 2),
      ]

      const turnoverData = extractTurnoverData(events)

      expect(turnoverData).toHaveLength(2)
      expect(turnoverData[0]).toMatchObject({
        x: 75,
        y: 40,
        period: 1,
        situation: 'even_strength',
      })
      expect(turnoverData[1]).toMatchObject({
        x: 85,
        y: 50,
        period: 2,
        situation: 'even_strength',
      })
    })

    it('should filter out turnovers without coordinates', () => {
      const turnoverWithoutCoords: GameEvent = {
        id: 'turnover-no-coords',
        gameId: 'test-game',
        eventType: 'turnover',
        coordinates: undefined,
        playerId: 'player-1',
        period: 1,
        gameTimeSeconds: 600,
        situation: 'even_strength',
        details: {},
        timestamp: new Date().toISOString(),
      }

      const turnoverData = extractTurnoverData([turnoverWithoutCoords])

      expect(turnoverData).toHaveLength(0)
    })

    it('should filter out non-turnover events', () => {
      const events: GameEvent[] = [
        createTurnoverEvent(75, 40),
        createShotEvent('goal', 100, 50),
        createBreakoutEvent(true, 'up_boards'),
      ]

      const turnoverData = extractTurnoverData(events)

      expect(turnoverData).toHaveLength(1)
    })
  })

  describe('getShootingPercentageBySituation', () => {
    it('should calculate shooting percentage by situation', () => {
      const events: GameEvent[] = [
        // Even strength: 1/3 = 33.3%
        createShotEvent('goal', 100, 50, 1, 'even_strength'),
        createShotEvent('save', 110, 55, 1, 'even_strength'),
        createShotEvent('miss_high', 120, 60, 1, 'even_strength'),
        // Power play: 2/2 = 100%
        createShotEvent('goal', 100, 50, 1, 'power_play'),
        createShotEvent('goal', 110, 55, 1, 'power_play'),
        // Penalty kill: 0/1 = 0%
        createShotEvent('blocked', 100, 50, 1, 'penalty_kill'),
      ]

      const situationStats = getShootingPercentageBySituation(events)

      expect(situationStats).toHaveLength(3)

      const evenStrength = situationStats.find((s) => s.situation === 'even_strength')
      expect(evenStrength?.shots).toBe(3)
      expect(evenStrength?.goals).toBe(1)
      expect(evenStrength?.percentage).toBeCloseTo(33.33, 1)

      const powerPlay = situationStats.find((s) => s.situation === 'power_play')
      expect(powerPlay?.shots).toBe(2)
      expect(powerPlay?.goals).toBe(2)
      expect(powerPlay?.percentage).toBe(100)

      const penaltyKill = situationStats.find((s) => s.situation === 'penalty_kill')
      expect(penaltyKill?.shots).toBe(1)
      expect(penaltyKill?.goals).toBe(0)
      expect(penaltyKill?.percentage).toBe(0)
    })

    it('should return 0% when no shots for a situation', () => {
      const events: GameEvent[] = [createShotEvent('goal', 100, 50, 1, 'even_strength')]

      const situationStats = getShootingPercentageBySituation(events)

      const powerPlay = situationStats.find((s) => s.situation === 'power_play')
      expect(powerPlay?.shots).toBe(0)
      expect(powerPlay?.goals).toBe(0)
      expect(powerPlay?.percentage).toBe(0)
    })

    it('should handle empty events array', () => {
      const situationStats = getShootingPercentageBySituation([])

      expect(situationStats).toHaveLength(3)
      situationStats.forEach((stat) => {
        expect(stat.shots).toBe(0)
        expect(stat.goals).toBe(0)
        expect(stat.percentage).toBe(0)
      })
    })
  })
})
