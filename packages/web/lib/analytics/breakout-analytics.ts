/**
 * Breakout Analytics Calculator
 *
 * Calculates statistics and insights from breakout events.
 * Used for post-game analytics and practice plan recommendations.
 *
 * Key Metrics:
 * - Overall breakout success rate
 * - Success rate by exit zone (left, center, right)
 * - Success rate by breakout type (up_boards, center_ice, cross_ice, carry)
 * - Identification of weakest areas for targeted practice
 */

export interface BreakoutEvent {
  success: boolean
  type: 'up_boards' | 'center_ice' | 'cross_ice' | 'carry'
  exit_zone?: 'left' | 'center' | 'right'
}

export interface BreakoutStats {
  total: number
  successful: number
  failed: number
  successRate: number
}

export interface BreakoutStatsByZone {
  left: BreakoutStats
  center: BreakoutStats
  right: BreakoutStats
  unknown: BreakoutStats
}

export interface BreakoutStatsByType {
  up_boards: BreakoutStats
  center_ice: BreakoutStats
  cross_ice: BreakoutStats
  carry: BreakoutStats
}

export interface WeakestArea {
  zone: string
  successRate: number
  total: number
  failed: number
}

// ===========================================
// CORE CALCULATIONS
// ===========================================

/**
 * Calculate overall breakout success rate
 * @param breakouts - Array of breakout events
 * @returns Success rate as percentage (0-100)
 */
export function calculateBreakoutSuccessRate(breakouts: BreakoutEvent[]): number {
  if (breakouts.length === 0) return 0

  const successful = breakouts.filter(b => b.success).length
  return (successful / breakouts.length) * 100
}

/**
 * Calculate complete breakout statistics
 * @param breakouts - Array of breakout events
 * @returns Detailed breakout statistics
 */
export function calculateBreakoutStats(breakouts: BreakoutEvent[]): BreakoutStats {
  const total = breakouts.length
  const successful = breakouts.filter(b => b.success).length
  const failed = total - successful
  const successRate = total > 0 ? (successful / total) * 100 : 0

  return {
    total,
    successful,
    failed,
    successRate,
  }
}

// ===========================================
// ZONE-BASED ANALYSIS
// ===========================================

/**
 * Calculate breakout statistics by exit zone
 * @param breakouts - Array of breakout events
 * @returns Statistics grouped by exit zone
 */
export function getBreakoutStatsByZone(breakouts: BreakoutEvent[]): BreakoutStatsByZone {
  const zones = {
    left: [] as BreakoutEvent[],
    center: [] as BreakoutEvent[],
    right: [] as BreakoutEvent[],
    unknown: [] as BreakoutEvent[],
  }

  // Group breakouts by zone
  breakouts.forEach(breakout => {
    const zone = breakout.exit_zone || 'unknown'
    zones[zone].push(breakout)
  })

  // Calculate stats for each zone
  return {
    left: calculateBreakoutStats(zones.left),
    center: calculateBreakoutStats(zones.center),
    right: calculateBreakoutStats(zones.right),
    unknown: calculateBreakoutStats(zones.unknown),
  }
}

// ===========================================
// TYPE-BASED ANALYSIS
// ===========================================

/**
 * Calculate breakout statistics by breakout type
 * @param breakouts - Array of breakout events
 * @returns Statistics grouped by breakout type
 */
export function getBreakoutStatsByType(breakouts: BreakoutEvent[]): BreakoutStatsByType {
  const types = {
    up_boards: [] as BreakoutEvent[],
    center_ice: [] as BreakoutEvent[],
    cross_ice: [] as BreakoutEvent[],
    carry: [] as BreakoutEvent[],
  }

  // Group breakouts by type
  breakouts.forEach(breakout => {
    types[breakout.type].push(breakout)
  })

  // Calculate stats for each type
  return {
    up_boards: calculateBreakoutStats(types.up_boards),
    center_ice: calculateBreakoutStats(types.center_ice),
    cross_ice: calculateBreakoutStats(types.cross_ice),
    carry: calculateBreakoutStats(types.carry),
  }
}

// ===========================================
// INSIGHTS & RECOMMENDATIONS
// ===========================================

/**
 * Identify the weakest breakout area (zone with lowest success rate)
 * @param breakouts - Array of breakout events
 * @returns Weakest area details or null if no breakouts
 */
export function identifyWeakestBreakoutArea(breakouts: BreakoutEvent[]): WeakestArea | null {
  if (breakouts.length === 0) return null

  const statsByZone = getBreakoutStatsByZone(breakouts)

  // Find zone with lowest success rate (excluding zones with no attempts)
  let weakest: WeakestArea | null = null

  const zones: Array<{ name: string; stats: BreakoutStats }> = [
    { name: 'left', stats: statsByZone.left },
    { name: 'center', stats: statsByZone.center },
    { name: 'right', stats: statsByZone.right },
  ]

  zones.forEach(({ name, stats }) => {
    if (stats.total > 0) {
      if (!weakest || stats.successRate < weakest.successRate) {
        weakest = {
          zone: name,
          successRate: stats.successRate,
          total: stats.total,
          failed: stats.failed,
        }
      }
    }
  })

  return weakest
}
