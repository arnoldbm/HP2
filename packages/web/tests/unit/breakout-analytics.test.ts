import { describe, it, expect } from 'vitest'
import {
  calculateBreakoutStats,
  calculateBreakoutSuccessRate,
  getBreakoutStatsByZone,
  getBreakoutStatsByType,
  identifyWeakestBreakoutArea,
} from '@/lib/analytics/breakout-analytics'
import type { BreakoutEvent } from '@/lib/analytics/breakout-analytics'

describe('Breakout Analytics Calculator', () => {
  const sampleBreakouts: BreakoutEvent[] = [
    { success: true, type: 'up_boards', exit_zone: 'left' },
    { success: false, type: 'up_boards', exit_zone: 'left' },
    { success: false, type: 'up_boards', exit_zone: 'left' },
    { success: true, type: 'center_ice', exit_zone: 'center' },
    { success: true, type: 'center_ice', exit_zone: 'center' },
    { success: false, type: 'cross_ice', exit_zone: 'right' },
    { success: true, type: 'carry', exit_zone: 'right' },
  ]

  describe('calculateBreakoutSuccessRate', () => {
    it('should calculate overall success rate correctly', () => {
      const rate = calculateBreakoutSuccessRate(sampleBreakouts)
      expect(rate).toBeCloseTo(57.14, 2) // 4/7 = 57.14%
    })

    it('should return 0 for empty array', () => {
      const rate = calculateBreakoutSuccessRate([])
      expect(rate).toBe(0)
    })

    it('should return 100 for all successful breakouts', () => {
      const allSuccess = [
        { success: true, type: 'up_boards', exit_zone: 'left' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: true, type: 'carry', exit_zone: 'right' },
      ]
      const rate = calculateBreakoutSuccessRate(allSuccess)
      expect(rate).toBe(100)
    })

    it('should return 0 for all failed breakouts', () => {
      const allFailed = [
        { success: false, type: 'up_boards', exit_zone: 'left' },
        { success: false, type: 'center_ice', exit_zone: 'center' },
      ]
      const rate = calculateBreakoutSuccessRate(allFailed)
      expect(rate).toBe(0)
    })
  })

  describe('calculateBreakoutStats', () => {
    it('should calculate complete breakout statistics', () => {
      const stats = calculateBreakoutStats(sampleBreakouts)

      expect(stats.total).toBe(7)
      expect(stats.successful).toBe(4)
      expect(stats.failed).toBe(3)
      expect(stats.successRate).toBeCloseTo(57.14, 2)
    })

    it('should return zero stats for empty array', () => {
      const stats = calculateBreakoutStats([])

      expect(stats.total).toBe(0)
      expect(stats.successful).toBe(0)
      expect(stats.failed).toBe(0)
      expect(stats.successRate).toBe(0)
    })

    it('should handle single breakout', () => {
      const stats = calculateBreakoutStats([
        { success: true, type: 'carry', exit_zone: 'center' },
      ])

      expect(stats.total).toBe(1)
      expect(stats.successful).toBe(1)
      expect(stats.failed).toBe(0)
      expect(stats.successRate).toBe(100)
    })
  })

  describe('getBreakoutStatsByZone', () => {
    it('should calculate stats by exit zone', () => {
      const statsByZone = getBreakoutStatsByZone(sampleBreakouts)

      // Left: 1 success, 2 failures = 33.33%
      expect(statsByZone.left.total).toBe(3)
      expect(statsByZone.left.successful).toBe(1)
      expect(statsByZone.left.failed).toBe(2)
      expect(statsByZone.left.successRate).toBeCloseTo(33.33, 2)

      // Center: 2 success, 0 failures = 100%
      expect(statsByZone.center.total).toBe(2)
      expect(statsByZone.center.successful).toBe(2)
      expect(statsByZone.center.failed).toBe(0)
      expect(statsByZone.center.successRate).toBe(100)

      // Right: 1 success, 1 failure = 50%
      expect(statsByZone.right.total).toBe(2)
      expect(statsByZone.right.successful).toBe(1)
      expect(statsByZone.right.failed).toBe(1)
      expect(statsByZone.right.successRate).toBe(50)
    })

    it('should handle breakouts without exit_zone', () => {
      const breakoutsNoZone: BreakoutEvent[] = [
        { success: true, type: 'carry' },
        { success: false, type: 'up_boards' },
      ]

      const statsByZone = getBreakoutStatsByZone(breakoutsNoZone)

      expect(statsByZone.unknown.total).toBe(2)
      expect(statsByZone.unknown.successful).toBe(1)
      expect(statsByZone.unknown.successRate).toBe(50)
    })

    it('should return zero stats for empty array', () => {
      const statsByZone = getBreakoutStatsByZone([])

      expect(statsByZone.left.total).toBe(0)
      expect(statsByZone.center.total).toBe(0)
      expect(statsByZone.right.total).toBe(0)
    })
  })

  describe('getBreakoutStatsByType', () => {
    it('should calculate stats by breakout type', () => {
      const statsByType = getBreakoutStatsByType(sampleBreakouts)

      // up_boards: 1 success, 2 failures = 33.33%
      expect(statsByType.up_boards.total).toBe(3)
      expect(statsByType.up_boards.successful).toBe(1)
      expect(statsByType.up_boards.failed).toBe(2)
      expect(statsByType.up_boards.successRate).toBeCloseTo(33.33, 2)

      // center_ice: 2 success, 0 failures = 100%
      expect(statsByType.center_ice.total).toBe(2)
      expect(statsByType.center_ice.successful).toBe(2)
      expect(statsByType.center_ice.successRate).toBe(100)

      // cross_ice: 0 success, 1 failure = 0%
      expect(statsByType.cross_ice.total).toBe(1)
      expect(statsByType.cross_ice.successful).toBe(0)
      expect(statsByType.cross_ice.successRate).toBe(0)

      // carry: 1 success, 0 failures = 100%
      expect(statsByType.carry.total).toBe(1)
      expect(statsByType.carry.successful).toBe(1)
      expect(statsByType.carry.successRate).toBe(100)
    })

    it('should return zero stats for empty array', () => {
      const statsByType = getBreakoutStatsByType([])

      expect(statsByType.up_boards.total).toBe(0)
      expect(statsByType.center_ice.total).toBe(0)
      expect(statsByType.cross_ice.total).toBe(0)
      expect(statsByType.carry.total).toBe(0)
    })
  })

  describe('identifyWeakestBreakoutArea', () => {
    it('should identify zone with lowest success rate', () => {
      const weakest = identifyWeakestBreakoutArea(sampleBreakouts)

      expect(weakest.zone).toBe('left')
      expect(weakest.successRate).toBeCloseTo(33.33, 2)
      expect(weakest.total).toBe(3)
    })

    it('should return null for empty array', () => {
      const weakest = identifyWeakestBreakoutArea([])
      expect(weakest).toBeNull()
    })

    it('should ignore zones with no attempts', () => {
      const centerOnly: BreakoutEvent[] = [
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
      ]

      const weakest = identifyWeakestBreakoutArea(centerOnly)

      expect(weakest?.zone).toBe('center')
      expect(weakest?.successRate).toBe(100)
    })

    it('should return zone with failures even if others have 100% success', () => {
      const mixedBreakouts: BreakoutEvent[] = [
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: false, type: 'up_boards', exit_zone: 'left' },
        { success: true, type: 'carry', exit_zone: 'right' },
        { success: true, type: 'carry', exit_zone: 'right' },
      ]

      const weakest = identifyWeakestBreakoutArea(mixedBreakouts)

      expect(weakest?.zone).toBe('left')
      expect(weakest?.successRate).toBe(0)
    })

    it('should handle minimum attempt threshold', () => {
      const fewBreakouts: BreakoutEvent[] = [
        { success: false, type: 'up_boards', exit_zone: 'left' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
        { success: true, type: 'center_ice', exit_zone: 'center' },
      ]

      // Left has 0% but only 1 attempt, center has 100% with 3 attempts
      // Should still identify left as weakest
      const weakest = identifyWeakestBreakoutArea(fewBreakouts)

      expect(weakest?.zone).toBe('left')
    })
  })
})
