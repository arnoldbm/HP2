import type { GameEvent, ShotResult, Player as PlayerDB } from '../types'

// Client-side player format (camelCase)
export interface Player {
  id: string
  firstName: string
  lastName: string
  jerseyNumber: number
  position: 'forward' | 'defense' | 'goalie'
}

export interface PlayerStats {
  playerId: string
  playerName: string
  jerseyNumber: number
  position: string
  shots: number
  goals: number
  shootingPct: number
  turnovers: number
  breakouts: number
  breakoutSuccessPct: number
  zoneEntries: number
  faceoffs: number
  faceoffWins: number
  faceoffWinPct: number
  totalEvents: number
}

export interface ShotData {
  x: number
  y: number
  result: ShotResult
  shotQuality?: 'high' | 'medium' | 'low'
  period: number
  situation: string
  playerId?: string
}

export interface ShotQualityStats {
  high: { count: number; goals: number; percentage: number }
  medium: { count: number; goals: number; percentage: number }
  low: { count: number; goals: number; percentage: number }
  total: { count: number; goals: number; percentage: number }
}

export interface BreakoutAnalytics {
  total: number
  successful: number
  failed: number
  successRate: number
  byType: Record<string, { total: number; successful: number; successRate: number }>
}

export interface PeriodStats {
  period: number
  shots: number
  goals: number
  turnovers: number
  breakouts: number
  zoneEntries: number
}

export interface TurnoverData {
  x: number
  y: number
  period: number
  situation: string
}

/**
 * Extract shot data from events for visualization
 */
export function extractShotData(events: GameEvent[]): ShotData[] {
  return events
    .filter((e) => e.eventType === 'shot' && e.coordinates)
    .map((event) => ({
      x: event.coordinates!.x,
      y: event.coordinates!.y,
      result: (event.details.result as ShotResult) || 'miss_high',
      shotQuality: event.details.shot_quality as 'high' | 'medium' | 'low' | undefined,
      period: event.period,
      situation: event.situation,
      playerId: event.playerId,
    }))
}

/**
 * Calculate shot quality statistics
 */
export function calculateShotQualityStats(events: GameEvent[]): ShotQualityStats {
  const shots = events.filter((e) => e.eventType === 'shot')

  const stats: ShotQualityStats = {
    high: { count: 0, goals: 0, percentage: 0 },
    medium: { count: 0, goals: 0, percentage: 0 },
    low: { count: 0, goals: 0, percentage: 0 },
    total: { count: shots.length, goals: 0, percentage: 0 },
  }

  shots.forEach((shot) => {
    const quality = shot.details.shot_quality as 'high' | 'medium' | 'low' | undefined
    const isGoal = shot.details.result === 'goal'

    if (isGoal) {
      stats.total.goals++
    }

    if (quality) {
      stats[quality].count++
      if (isGoal) {
        stats[quality].goals++
      }
    }
  })

  // Calculate percentages
  if (stats.high.count > 0) {
    stats.high.percentage = (stats.high.goals / stats.high.count) * 100
  }
  if (stats.medium.count > 0) {
    stats.medium.percentage = (stats.medium.goals / stats.medium.count) * 100
  }
  if (stats.low.count > 0) {
    stats.low.percentage = (stats.low.goals / stats.low.count) * 100
  }
  if (stats.total.count > 0) {
    stats.total.percentage = (stats.total.goals / stats.total.count) * 100
  }

  return stats
}

/**
 * Analyze breakout performance
 */
export function analyzeBreakouts(events: GameEvent[]): BreakoutAnalytics {
  const breakouts = events.filter((e) => e.eventType === 'breakout')

  const analytics: BreakoutAnalytics = {
    total: breakouts.length,
    successful: 0,
    failed: 0,
    successRate: 0,
    byType: {},
  }

  breakouts.forEach((breakout) => {
    const success = breakout.details.success === true
    const type = (breakout.details.type as string) || 'unknown'

    if (success) {
      analytics.successful++
    } else {
      analytics.failed++
    }

    // Track by type
    if (!analytics.byType[type]) {
      analytics.byType[type] = { total: 0, successful: 0, successRate: 0 }
    }
    analytics.byType[type].total++
    if (success) {
      analytics.byType[type].successful++
    }
  })

  // Calculate success rates
  if (analytics.total > 0) {
    analytics.successRate = (analytics.successful / analytics.total) * 100
  }

  Object.keys(analytics.byType).forEach((type) => {
    const typeStats = analytics.byType[type]
    if (typeStats.total > 0) {
      typeStats.successRate = (typeStats.successful / typeStats.total) * 100
    }
  })

  return analytics
}

/**
 * Get period-by-period statistics
 */
export function getPeriodStats(events: GameEvent[], maxPeriod = 3): PeriodStats[] {
  const periodStats: PeriodStats[] = []

  for (let period = 1; period <= maxPeriod; period++) {
    const periodEvents = events.filter((e) => e.period === period)

    periodStats.push({
      period,
      shots: periodEvents.filter((e) => e.eventType === 'shot').length,
      goals: periodEvents.filter(
        (e) => e.eventType === 'shot' && e.details.result === 'goal'
      ).length,
      turnovers: periodEvents.filter((e) => e.eventType === 'turnover').length,
      breakouts: periodEvents.filter((e) => e.eventType === 'breakout').length,
      zoneEntries: periodEvents.filter((e) => e.eventType === 'zone_entry').length,
    })
  }

  return periodStats
}

/**
 * Extract turnover data for heat map
 */
export function extractTurnoverData(events: GameEvent[]): TurnoverData[] {
  return events
    .filter((e) => e.eventType === 'turnover' && e.coordinates)
    .map((event) => ({
      x: event.coordinates!.x,
      y: event.coordinates!.y,
      period: event.period,
      situation: event.situation,
    }))
}

/**
 * Calculate shooting percentage by situation
 */
export function getShootingPercentageBySituation(events: GameEvent[]) {
  const situations = ['even_strength', 'power_play', 'penalty_kill'] as const

  return situations.map((situation) => {
    const shots = events.filter(
      (e) => e.eventType === 'shot' && e.situation === situation
    )
    const goals = shots.filter((s) => s.details.result === 'goal').length

    return {
      situation,
      shots: shots.length,
      goals,
      percentage: shots.length > 0 ? (goals / shots.length) * 100 : 0,
    }
  })
}

/**
 * Calculate per-player statistics from game events
 */
export function calculatePlayerStats(events: GameEvent[], players: Player[]): PlayerStats[] {
  return players.map((player) => {
    // Filter events for this player
    const playerEvents = events.filter((e) => e.playerId === player.id)

    // Shots and goals
    const shots = playerEvents.filter((e) => e.eventType === 'shot')
    const goals = shots.filter((s) => s.details.result === 'goal')
    const shootingPct = shots.length > 0 ? (goals.length / shots.length) * 100 : 0

    // Turnovers
    const turnovers = playerEvents.filter((e) => e.eventType === 'turnover')

    // Breakouts
    const breakouts = playerEvents.filter((e) => e.eventType === 'breakout')
    const successfulBreakouts = breakouts.filter((b) => b.details.success === true)
    const breakoutSuccessPct = breakouts.length > 0 ? (successfulBreakouts.length / breakouts.length) * 100 : 0

    // Zone entries
    const zoneEntries = playerEvents.filter((e) => e.eventType === 'zone_entry')

    // Faceoffs
    const faceoffs = playerEvents.filter((e) => e.eventType === 'faceoff')
    const faceoffWins = faceoffs.filter((f) => f.details.won === true)
    const faceoffWinPct = faceoffs.length > 0 ? (faceoffWins.length / faceoffs.length) * 100 : 0

    return {
      playerId: player.id,
      playerName: `${player.firstName[0]}. ${player.lastName}`,
      jerseyNumber: player.jerseyNumber,
      position: player.position,
      shots: shots.length,
      goals: goals.length,
      shootingPct,
      turnovers: turnovers.length,
      breakouts: breakouts.length,
      breakoutSuccessPct,
      zoneEntries: zoneEntries.length,
      faceoffs: faceoffs.length,
      faceoffWins: faceoffWins.length,
      faceoffWinPct,
      totalEvents: playerEvents.length,
    }
  }).filter(stats => stats.totalEvents > 0) // Only show players with events
   .sort((a, b) => b.totalEvents - a.totalEvents) // Sort by most active players
}
