/**
 * Ice Surface Coordinate Helpers
 *
 * Utilities for working with ice surface coordinates in the game tracking system.
 *
 * Coordinate System:
 * - x: 0-200 (left to right, defensive zone → offensive zone)
 * - y: 0-100 (bottom to top)
 * - Based on NHL standard rink dimensions (200 feet x 85 feet)
 */

export interface Coordinates {
  x: number
  y: number
}

export interface ScreenCoordinates {
  x: number
  y: number
}

export type Zone = 'defensive' | 'neutral' | 'offensive'

export const ICE_SURFACE = {
  WIDTH: 200,
  HEIGHT: 100,
  CENTER: { x: 100, y: 50 },
  ZONES: {
    DEFENSIVE_END: 64,
    NEUTRAL_END: 136,
  },
  SLOT: {
    MIN_X: 145,
    MAX_X: 175,
    MIN_Y: 35,
    MAX_Y: 65,
  },
} as const

/**
 * Normalize coordinates to ensure they're within bounds (clamp)
 */
export function normalizeCoordinates(coords: Coordinates): Coordinates {
  return {
    x: Math.max(0, Math.min(200, coords.x)),
    y: Math.max(0, Math.min(100, coords.y)),
  }
}

/**
 * Determine which zone the coordinates are in
 */
export function getZone(coords: Coordinates): Zone {
  if (coords.x < 64) return 'defensive'
  if (coords.x <= 136) return 'neutral'
  return 'offensive'
}

/**
 * Convert screen coordinates (from touch/tap) to ice surface coordinates
 */
export function screenToIce(
  screenCoords: ScreenCoordinates,
  screenWidth: number,
  screenHeight: number
): Coordinates {
  const x = Math.round((screenCoords.x / screenWidth) * ICE_SURFACE.WIDTH)
  const y = Math.round((screenCoords.y / screenHeight) * ICE_SURFACE.HEIGHT)

  return normalizeCoordinates({ x, y })
}

/**
 * Convert ice surface coordinates to screen coordinates (for rendering)
 */
export function iceToScreen(
  iceCoords: Coordinates,
  screenWidth: number,
  screenHeight: number
): ScreenCoordinates {
  const x = (iceCoords.x / ICE_SURFACE.WIDTH) * screenWidth
  const y = (iceCoords.y / ICE_SURFACE.HEIGHT) * screenHeight

  return { x, y }
}
