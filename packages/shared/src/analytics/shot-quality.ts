/**
 * Shot Quality Calculator
 *
 * Classifies shots as high/medium/low danger based on location on ice surface.
 * Used for game analytics and expected goals (xG) calculations.
 *
 * Ice Surface Coordinates:
 * - x: 0-200 (left to right, defensive to offensive)
 * - y: 0-100 (bottom to top)
 *
 * High danger area: "Home plate" in front of net (slot)
 * - x: 80-110, y: 35-65
 * - Very close to net: x: 60-80, y: 40-60
 *
 * Low danger areas:
 * - Point shots: x >= 140
 * - Behind goal line: x < 60
 * - Extreme angles: y < 20 or y > 80
 *
 * Medium danger: Everything else (faceoff circles, mid-slot)
 */

import type { Coordinates } from '../utils/ice-surface-coordinates'

export type ShotQuality = 'high' | 'medium' | 'low'

/**
 * Calculate shot quality based on ice coordinates
 * @param coordinates - Shot location on ice surface
 * @returns Shot quality: 'high', 'medium', or 'low'
 */
export function calculateShotQuality({ x, y }: Coordinates): ShotQuality {
  // High danger: slot area (home plate)
  if (x >= 80 && x <= 110 && y >= 35 && y <= 65) {
    return 'high'
  }

  // High danger: very close to net
  if (x >= 60 && x <= 80 && y >= 40 && y <= 60) {
    return 'high'
  }

  // Low danger: point shots (from blue line or beyond)
  if (x >= 140) {
    return 'low'
  }

  // Low danger: behind goal line or extreme angles
  if (x < 60 || y < 20 || y > 80) {
    return 'low'
  }

  // Medium danger: everything else (faceoff dots, mid-slot)
  return 'medium'
}
