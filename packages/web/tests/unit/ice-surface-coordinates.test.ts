import { describe, it, expect } from 'vitest'
import {
  isValidCoordinate,
  getZone,
  isInSlot,
  isInHighDangerArea,
  getDistance,
  normalizeCoordinates,
  getQuadrant,
  screenToIce,
  iceToScreen,
} from '@/lib/utils/ice-surface-coordinates'

describe('Ice Surface Coordinate Helpers', () => {
  describe('isValidCoordinate', () => {
    it('should return true for valid coordinates', () => {
      expect(isValidCoordinate({ x: 0, y: 0 })).toBe(true)
      expect(isValidCoordinate({ x: 100, y: 50 })).toBe(true)
      expect(isValidCoordinate({ x: 200, y: 100 })).toBe(true)
    })

    it('should return false for x out of bounds', () => {
      expect(isValidCoordinate({ x: -1, y: 50 })).toBe(false)
      expect(isValidCoordinate({ x: 201, y: 50 })).toBe(false)
    })

    it('should return false for y out of bounds', () => {
      expect(isValidCoordinate({ x: 100, y: -1 })).toBe(false)
      expect(isValidCoordinate({ x: 100, y: 101 })).toBe(false)
    })

    it('should handle boundary values correctly', () => {
      expect(isValidCoordinate({ x: 0, y: 0 })).toBe(true)
      expect(isValidCoordinate({ x: 200, y: 100 })).toBe(true)
    })
  })

  describe('getZone', () => {
    it('should return defensive for x < 67', () => {
      expect(getZone({ x: 0, y: 50 })).toBe('defensive')
      expect(getZone({ x: 33, y: 50 })).toBe('defensive')
      expect(getZone({ x: 66, y: 50 })).toBe('defensive')
    })

    it('should return neutral for x 67-133', () => {
      expect(getZone({ x: 67, y: 50 })).toBe('neutral')
      expect(getZone({ x: 100, y: 50 })).toBe('neutral')
      expect(getZone({ x: 133, y: 50 })).toBe('neutral')
    })

    it('should return offensive for x > 133', () => {
      expect(getZone({ x: 134, y: 50 })).toBe('offensive')
      expect(getZone({ x: 167, y: 50 })).toBe('offensive')
      expect(getZone({ x: 200, y: 50 })).toBe('offensive')
    })

    it('should work regardless of y coordinate', () => {
      expect(getZone({ x: 50, y: 0 })).toBe('defensive')
      expect(getZone({ x: 100, y: 100 })).toBe('neutral')
      expect(getZone({ x: 150, y: 25 })).toBe('offensive')
    })
  })

  describe('isInSlot', () => {
    it('should return true for coordinates in slot area', () => {
      expect(isInSlot({ x: 90, y: 50 })).toBe(true)
      expect(isInSlot({ x: 95, y: 45 })).toBe(true)
      expect(isInSlot({ x: 100, y: 55 })).toBe(true)
    })

    it('should return true at slot boundaries', () => {
      expect(isInSlot({ x: 80, y: 35 })).toBe(true)
      expect(isInSlot({ x: 110, y: 65 })).toBe(true)
    })

    it('should return false for coordinates outside slot', () => {
      expect(isInSlot({ x: 79, y: 50 })).toBe(false)
      expect(isInSlot({ x: 111, y: 50 })).toBe(false)
      expect(isInSlot({ x: 95, y: 34 })).toBe(false)
      expect(isInSlot({ x: 95, y: 66 })).toBe(false)
    })

    it('should return false for extreme coordinates', () => {
      expect(isInSlot({ x: 0, y: 0 })).toBe(false)
      expect(isInSlot({ x: 200, y: 100 })).toBe(false)
    })
  })

  describe('isInHighDangerArea', () => {
    it('should return true for slot area', () => {
      expect(isInHighDangerArea({ x: 95, y: 50 })).toBe(true)
    })

    it('should return true for very close to net', () => {
      expect(isInHighDangerArea({ x: 70, y: 50 })).toBe(true)
      expect(isInHighDangerArea({ x: 65, y: 45 })).toBe(true)
    })

    it('should return false for medium danger areas', () => {
      expect(isInHighDangerArea({ x: 120, y: 50 })).toBe(false)
      expect(isInHighDangerArea({ x: 115, y: 40 })).toBe(false)
    })

    it('should return false for low danger areas', () => {
      expect(isInHighDangerArea({ x: 160, y: 50 })).toBe(false)
      expect(isInHighDangerArea({ x: 10, y: 50 })).toBe(false)
    })
  })

  describe('getDistance', () => {
    it('should calculate distance between two points', () => {
      const result = getDistance({ x: 0, y: 0 }, { x: 3, y: 4 })
      expect(result).toBe(5)
    })

    it('should return 0 for same point', () => {
      expect(getDistance({ x: 50, y: 50 }, { x: 50, y: 50 })).toBe(0)
    })

    it('should handle horizontal distance', () => {
      expect(getDistance({ x: 0, y: 50 }, { x: 10, y: 50 })).toBe(10)
    })

    it('should handle vertical distance', () => {
      expect(getDistance({ x: 50, y: 0 }, { x: 50, y: 10 })).toBe(10)
    })

    it('should calculate diagonal distance correctly', () => {
      const result = getDistance({ x: 0, y: 0 }, { x: 100, y: 100 })
      expect(result).toBeCloseTo(141.42, 2)
    })

    it('should work with decimal coordinates', () => {
      const result = getDistance({ x: 0.5, y: 0.5 }, { x: 3.5, y: 4.5 })
      expect(result).toBe(5)
    })
  })

  describe('normalizeCoordinates', () => {
    it('should return valid coordinates unchanged', () => {
      expect(normalizeCoordinates({ x: 100, y: 50 })).toEqual({ x: 100, y: 50 })
    })

    it('should clamp x to minimum (0)', () => {
      expect(normalizeCoordinates({ x: -10, y: 50 })).toEqual({ x: 0, y: 50 })
    })

    it('should clamp x to maximum (200)', () => {
      expect(normalizeCoordinates({ x: 250, y: 50 })).toEqual({ x: 200, y: 50 })
    })

    it('should clamp y to minimum (0)', () => {
      expect(normalizeCoordinates({ x: 100, y: -10 })).toEqual({ x: 100, y: 0 })
    })

    it('should clamp y to maximum (100)', () => {
      expect(normalizeCoordinates({ x: 100, y: 150 })).toEqual({ x: 100, y: 100 })
    })

    it('should clamp both coordinates if needed', () => {
      expect(normalizeCoordinates({ x: -50, y: 150 })).toEqual({ x: 0, y: 100 })
      expect(normalizeCoordinates({ x: 250, y: -50 })).toEqual({ x: 200, y: 0 })
    })

    it('should handle boundary values correctly', () => {
      expect(normalizeCoordinates({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
      expect(normalizeCoordinates({ x: 200, y: 100 })).toEqual({ x: 200, y: 100 })
    })
  })

  describe('getQuadrant', () => {
    it('should return defensive_left for bottom-left defensive zone', () => {
      expect(getQuadrant({ x: 30, y: 30 })).toBe('defensive_left')
    })

    it('should return defensive_right for top-left defensive zone', () => {
      expect(getQuadrant({ x: 30, y: 70 })).toBe('defensive_right')
    })

    it('should return neutral_left for bottom-middle neutral zone', () => {
      expect(getQuadrant({ x: 100, y: 30 })).toBe('neutral_left')
    })

    it('should return neutral_right for top-middle neutral zone', () => {
      expect(getQuadrant({ x: 100, y: 70 })).toBe('neutral_right')
    })

    it('should return offensive_left for bottom-right offensive zone', () => {
      expect(getQuadrant({ x: 170, y: 30 })).toBe('offensive_left')
    })

    it('should return offensive_right for top-right offensive zone', () => {
      expect(getQuadrant({ x: 170, y: 70 })).toBe('offensive_right')
    })

    it('should handle boundary values correctly', () => {
      expect(getQuadrant({ x: 67, y: 50 })).toBe('neutral_left')
      expect(getQuadrant({ x: 133, y: 51 })).toBe('neutral_right')
    })

    it('should handle center ice correctly', () => {
      expect(getQuadrant({ x: 100, y: 50 })).toBe('neutral_left')
    })
  })

  describe('screenToIce', () => {
    it('should convert top-left corner (0, 0) to ice coordinate (0, 0)', () => {
      const result = screenToIce({ x: 0, y: 0 }, 400, 200)
      expect(result).toEqual({ x: 0, y: 0 })
    })

    it('should convert bottom-right corner to ice coordinate (200, 100)', () => {
      const result = screenToIce({ x: 400, y: 200 }, 400, 200)
      expect(result).toEqual({ x: 200, y: 100 })
    })

    it('should convert center of screen to center of ice (100, 50)', () => {
      const result = screenToIce({ x: 200, y: 100 }, 400, 200)
      expect(result).toEqual({ x: 100, y: 50 })
    })

    it('should handle different screen dimensions (800x400)', () => {
      const result = screenToIce({ x: 400, y: 200 }, 800, 400)
      expect(result).toEqual({ x: 100, y: 50 })
    })

    it('should round coordinates to nearest integer', () => {
      // Screen coordinate that would produce decimal ice coordinates
      const result = screenToIce({ x: 201, y: 101 }, 400, 200)
      expect(Number.isInteger(result.x)).toBe(true)
      expect(Number.isInteger(result.y)).toBe(true)
    })

    it('should handle edge cases near boundaries', () => {
      const result = screenToIce({ x: 1, y: 1 }, 400, 200)
      expect(result.x).toBeGreaterThanOrEqual(0)
      expect(result.x).toBeLessThanOrEqual(200)
      expect(result.y).toBeGreaterThanOrEqual(0)
      expect(result.y).toBeLessThanOrEqual(100)
    })
  })

  describe('iceToScreen', () => {
    it('should convert ice coordinate (0, 0) to screen (0, 0)', () => {
      const result = iceToScreen({ x: 0, y: 0 }, 400, 200)
      expect(result).toEqual({ x: 0, y: 0 })
    })

    it('should convert ice coordinate (200, 100) to screen bottom-right', () => {
      const result = iceToScreen({ x: 200, y: 100 }, 400, 200)
      expect(result).toEqual({ x: 400, y: 200 })
    })

    it('should convert ice center (100, 50) to screen center', () => {
      const result = iceToScreen({ x: 100, y: 50 }, 400, 200)
      expect(result).toEqual({ x: 200, y: 100 })
    })

    it('should handle different screen dimensions (800x400)', () => {
      const result = iceToScreen({ x: 100, y: 50 }, 800, 400)
      expect(result).toEqual({ x: 400, y: 200 })
    })

    it('should be inverse of screenToIce', () => {
      const screenCoord = { x: 123, y: 67 }
      const iceCoord = screenToIce(screenCoord, 400, 200)
      const backToScreen = iceToScreen(iceCoord, 400, 200)

      // Allow for small rounding errors
      expect(Math.abs(backToScreen.x - screenCoord.x)).toBeLessThanOrEqual(2)
      expect(Math.abs(backToScreen.y - screenCoord.y)).toBeLessThanOrEqual(2)
    })

    it('should handle slot coordinates correctly', () => {
      // Center of slot at ice (95, 50)
      const result = iceToScreen({ x: 95, y: 50 }, 400, 200)
      expect(result.x).toBe(190)
      expect(result.y).toBe(100)
    })
  })
})
