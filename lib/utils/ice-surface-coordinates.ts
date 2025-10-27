/**
 * Ice Surface Coordinate Helpers
 *
 * Utilities for working with ice surface coordinates in the game tracking system.
 *
 * Coordinate System:
 * - x: 0-200 (left to right, defensive zone → offensive zone)
 * - y: 0-100 (bottom to top)
 *
 * Key Locations:
 * - (0, 0) = Defensive zone, bottom-left corner
 * - (100, 50) = Center ice
 * - (200, 100) = Offensive zone, top-right corner
 *
 * Zones:
 * - Defensive: x < 67 (0-66)
 * - Neutral: x 67-133
 * - Offensive: x > 133 (134-200)
 *
 * High Danger Area (Slot):
 * - x: 80-110, y: 35-65
 * - Very close to net: x: 60-80, y: 40-60
 */

export interface Coordinates {
  x: number
  y: number
}

export type Zone = 'defensive' | 'neutral' | 'offensive'
export type Quadrant = 'defensive_left' | 'defensive_right' | 'neutral_left' | 'neutral_right' | 'offensive_left' | 'offensive_right'

// ===========================================
// VALIDATION
// ===========================================

/**
 * Check if coordinates are within valid ice surface bounds
 * @param coords - Coordinates to validate
 * @returns True if coordinates are valid
 */
export function isValidCoordinate(coords: Coordinates): boolean {
  return (
    coords.x >= 0 &&
    coords.x <= 200 &&
    coords.y >= 0 &&
    coords.y <= 100
  )
}

/**
 * Normalize coordinates to ensure they're within bounds (clamp)
 * @param coords - Coordinates to normalize
 * @returns Normalized coordinates within valid bounds
 */
export function normalizeCoordinates(coords: Coordinates): Coordinates {
  return {
    x: Math.max(0, Math.min(200, coords.x)),
    y: Math.max(0, Math.min(100, coords.y)),
  }
}

// ===========================================
// ZONE DETECTION
// ===========================================

/**
 * Determine which zone the coordinates are in
 * @param coords - Ice surface coordinates
 * @returns Zone: 'defensive', 'neutral', or 'offensive'
 */
export function getZone(coords: Coordinates): Zone {
  if (coords.x < 67) return 'defensive'
  if (coords.x <= 133) return 'neutral'
  return 'offensive'
}

/**
 * Get the quadrant (zone + side) for coordinates
 * @param coords - Ice surface coordinates
 * @returns Quadrant identifier
 */
export function getQuadrant(coords: Coordinates): Quadrant {
  const zone = getZone(coords)
  const side = coords.y <= 50 ? 'left' : 'right'
  return `${zone}_${side}` as Quadrant
}

// ===========================================
// HIGH DANGER AREA DETECTION
// ===========================================

/**
 * Check if coordinates are in the high-danger slot area
 * @param coords - Ice surface coordinates
 * @returns True if in slot area (x: 80-110, y: 35-65)
 */
export function isInSlot(coords: Coordinates): boolean {
  return (
    coords.x >= 80 &&
    coords.x <= 110 &&
    coords.y >= 35 &&
    coords.y <= 65
  )
}

/**
 * Check if coordinates are in any high danger area
 * Includes slot and very close to net
 * @param coords - Ice surface coordinates
 * @returns True if in high danger area
 */
export function isInHighDangerArea(coords: Coordinates): boolean {
  // Slot area
  if (isInSlot(coords)) return true

  // Very close to net
  if (
    coords.x >= 60 &&
    coords.x <= 80 &&
    coords.y >= 40 &&
    coords.y <= 60
  ) {
    return true
  }

  return false
}

// ===========================================
// CALCULATIONS
// ===========================================

/**
 * Calculate Euclidean distance between two points
 * @param from - Starting coordinates
 * @param to - Ending coordinates
 * @returns Distance in coordinate units
 */
export function getDistance(from: Coordinates, to: Coordinates): number {
  const dx = to.x - from.x
  const dy = to.y - from.y
  return Math.sqrt(dx * dx + dy * dy)
}

// ===========================================
// HELPER CONSTANTS
// ===========================================

export const ICE_SURFACE = {
  WIDTH: 200,
  HEIGHT: 100,
  CENTER: { x: 100, y: 50 },
  ZONES: {
    DEFENSIVE_END: 67,
    NEUTRAL_END: 133,
  },
  SLOT: {
    MIN_X: 80,
    MAX_X: 110,
    MIN_Y: 35,
    MAX_Y: 65,
  },
} as const
