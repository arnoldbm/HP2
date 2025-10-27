import { describe, it, expect } from 'vitest'
import { calculateShotQuality } from '@/lib/analytics/shot-quality'

describe('calculateShotQuality', () => {
  describe('High danger shots', () => {
    it('should classify slot shots as high danger', () => {
      const quality = calculateShotQuality({ x: 90, y: 45 })
      expect(quality).toBe('high')
    })

    it('should classify center slot shots as high danger', () => {
      const quality = calculateShotQuality({ x: 95, y: 50 })
      expect(quality).toBe('high')
    })

    it('should classify shots very close to net as high danger', () => {
      const quality = calculateShotQuality({ x: 70, y: 50 })
      expect(quality).toBe('high')
    })

    it('should classify top of slot as high danger', () => {
      const quality = calculateShotQuality({ x: 100, y: 40 })
      expect(quality).toBe('high')
    })
  })

  describe('Low danger shots', () => {
    it('should classify point shots as low danger', () => {
      const quality = calculateShotQuality({ x: 160, y: 50 })
      expect(quality).toBe('low')
    })

    it('should classify blue line shots as low danger', () => {
      const quality = calculateShotQuality({ x: 150, y: 45 })
      expect(quality).toBe('low')
    })

    it('should classify shots behind goal line as low danger', () => {
      const quality = calculateShotQuality({ x: 10, y: 50 })
      expect(quality).toBe('low')
    })

    it('should classify extreme angle shots (low y) as low danger', () => {
      const quality = calculateShotQuality({ x: 80, y: 10 })
      expect(quality).toBe('low')
    })

    it('should classify extreme angle shots (high y) as low danger', () => {
      const quality = calculateShotQuality({ x: 80, y: 90 })
      expect(quality).toBe('low')
    })
  })

  describe('Medium danger shots', () => {
    it('should classify faceoff dot shots as medium danger', () => {
      const quality = calculateShotQuality({ x: 110, y: 30 })
      expect(quality).toBe('medium')
    })

    it('should classify mid-slot shots as medium danger', () => {
      const quality = calculateShotQuality({ x: 120, y: 50 })
      expect(quality).toBe('medium')
    })

    it('should classify shots just outside slot as medium danger', () => {
      const quality = calculateShotQuality({ x: 115, y: 55 })
      expect(quality).toBe('medium')
    })

    it('should classify top of circles as medium danger', () => {
      const quality = calculateShotQuality({ x: 130, y: 35 })
      expect(quality).toBe('medium')
    })
  })

  describe('Edge cases', () => {
    it('should handle coordinates at slot boundaries', () => {
      // Right at slot boundary (x: 80-110, y: 35-65)
      expect(calculateShotQuality({ x: 80, y: 35 })).toBe('high')
      expect(calculateShotQuality({ x: 110, y: 65 })).toBe('high')
    })

    it('should handle shots at ice surface boundaries', () => {
      expect(calculateShotQuality({ x: 0, y: 0 })).toBe('low')
      expect(calculateShotQuality({ x: 200, y: 100 })).toBe('low')
    })

    it('should handle shots just outside high danger zone', () => {
      expect(calculateShotQuality({ x: 111, y: 50 })).toBe('medium')
      expect(calculateShotQuality({ x: 90, y: 66 })).toBe('medium')
    })
  })
})
