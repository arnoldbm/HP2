/**
 * Ice Surface Coordinate Helpers
 *
 * Utilities for working with ice surface coordinates in the game tracking system.
 *
 * Coordinate System:
 * - x: 0-200 (left to right, defensive zone → offensive zone)
 * - y: 0-100 (bottom to top)
 * - Based on NHL standard rink dimensions (200 feet x 85 feet)
 *
 * Key Locations:
 * - (0, 0) = Defensive zone, bottom-left corner
 * - (100, 50) = Center ice
 * - (200, 100) = Offensive zone, top-right corner
 *
 * Standard Rink Markings:
 * - Goal lines: x = 11, x = 189 (11 feet from boards)
 * - Blue lines: x = 64, x = 136 (64 and 136 feet from end boards)
 * - Center red line: x = 100
 *
 * Zones:
 * - Defensive: x < 64 (0-63)
 * - Neutral: x 64-136
 * - Offensive: x > 136 (137-200)
 *
 * High Danger Area (Slot):
 * - x: 145-175, y: 35-65
 * - Very close to net: x: 175-189, y: 40-60
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
  if (coords.x < 64) return 'defensive'
  if (coords.x <= 136) return 'neutral'
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
 * @returns True if in slot area (x: 145-175, y: 35-65)
 */
export function isInSlot(coords: Coordinates): boolean {
  return (
    coords.x >= 145 &&
    coords.x <= 175 &&
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

  // Very close to net (right in front of crease)
  if (
    coords.x >= 175 &&
    coords.x <= 189 &&
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
// SCREEN COORDINATE CONVERSION
// ===========================================

/**
 * Convert screen coordinates (from click/tap) to ice surface coordinates
 * @param screenCoords - Screen pixel coordinates (relative to SVG container)
 * @param screenWidth - Width of the screen container in pixels
 * @param screenHeight - Height of the screen container in pixels
 * @returns Ice surface coordinates (x: 0-200, y: 0-100)
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
 * @param iceCoords - Ice surface coordinates (x: 0-200, y: 0-100)
 * @param screenWidth - Width of the screen container in pixels
 * @param screenHeight - Height of the screen container in pixels
 * @returns Screen pixel coordinates
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

// ===========================================
// HELPER CONSTANTS
// ===========================================

export const ICE_SURFACE = {
  WIDTH: 200,
  HEIGHT: 100,
  CENTER: { x: 100, y: 50 },
  ZONES: {
    DEFENSIVE_END: 64, // Blue line position (64 feet from end boards)
    NEUTRAL_END: 136,  // Blue line position (136 feet from end boards)
  },
  SLOT: {
    MIN_X: 145, // High danger area in offensive zone
    MAX_X: 175,
    MIN_Y: 35,
    MAX_Y: 65,
  },
} as const
