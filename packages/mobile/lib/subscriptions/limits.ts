/**
 * Usage limits and feature access logic for subscription tiers
 */

import type { SubscriptionTier } from './types'
import { TIER_LIMITS } from './types'

export interface GamesLimitResult {
  canTrack: boolean
  isLimitReached: boolean
  gamesRemaining: number | null // null = unlimited
  requiresUpgrade?: boolean
}

export interface TeamsLimitResult {
  canAdd: boolean
  isLimitReached: boolean
  teamsRemaining: number | null // null = unlimited
  requiresUpgrade?: boolean
}

export type Feature =
  | 'analyticsDashboard'
  | 'seasonAnalytics'
  | 'pdfExport'
  | 'aiPracticePlans'

/**
 * Check if user can track a new game based on their subscription tier
 */
export function checkGamesLimit(
  tier: SubscriptionTier,
  currentGamesCount: number
): GamesLimitResult {
  const limits = TIER_LIMITS[tier]
  const maxGames = limits.maxGamesPerSeason

  // Handle negative counts (shouldn't happen, but be defensive)
  const safeCount = Math.max(0, currentGamesCount)

  // Unlimited games for premium/pro
  if (maxGames === null) {
    return {
      canTrack: true,
      isLimitReached: false,
      gamesRemaining: null,
    }
  }

  // Free tier with limit
  const remaining = Math.max(0, maxGames - safeCount)
  const isAtLimit = safeCount >= maxGames

  return {
    canTrack: !isAtLimit,
    isLimitReached: isAtLimit,
    gamesRemaining: remaining,
    requiresUpgrade: isAtLimit ? true : undefined,
  }
}

/**
 * Check if user can add a new team based on their subscription tier
 */
export function checkTeamsLimit(
  tier: SubscriptionTier,
  currentTeamsCount: number
): TeamsLimitResult {
  const limits = TIER_LIMITS[tier]
  const maxTeams = limits.maxTeams

  // Handle negative counts
  const safeCount = Math.max(0, currentTeamsCount)

  // Unlimited teams for premium/pro
  if (maxTeams === null) {
    return {
      canAdd: true,
      isLimitReached: false,
      teamsRemaining: null,
    }
  }

  // Free tier with limit (1 team)
  const remaining = Math.max(0, maxTeams - safeCount)
  const isAtLimit = safeCount >= maxTeams

  return {
    canAdd: !isAtLimit,
    isLimitReached: isAtLimit,
    teamsRemaining: remaining,
    requiresUpgrade: isAtLimit ? true : undefined,
  }
}

/**
 * Get remaining games for the current season
 * Returns null for unlimited tiers
 */
export function getRemainingGames(
  tier: SubscriptionTier,
  currentGamesCount: number
): number | null {
  const limits = TIER_LIMITS[tier]
  const maxGames = limits.maxGamesPerSeason

  if (maxGames === null) {
    return null // unlimited
  }

  const safeCount = Math.max(0, currentGamesCount)
  return Math.max(0, maxGames - safeCount)
}

/**
 * Check if user has access to a specific feature
 */
export function checkFeatureAccess(
  tier: SubscriptionTier,
  feature: Feature
): boolean {
  const limits = TIER_LIMITS[tier]

  switch (feature) {
    case 'analyticsDashboard':
      return limits.hasAnalyticsDashboard

    case 'seasonAnalytics':
      return limits.hasSeasonAnalytics

    case 'pdfExport':
      return limits.hasPDFExport

    case 'aiPracticePlans':
      // Free tier has no AI plans
      // Premium has limited AI plans (10/month)
      // Pro has unlimited
      return limits.maxAIPlansPerMonth !== 0

    default:
      return false
  }
}

/**
 * Get formatted limit message for display
 */
export function getLimitMessage(tier: SubscriptionTier, type: 'games' | 'teams'): string {
  const limits = TIER_LIMITS[tier]

  if (type === 'games') {
    const maxGames = limits.maxGamesPerSeason
    if (maxGames === null) return 'Unlimited games'
    return `${maxGames} game${maxGames === 1 ? '' : 's'} per season`
  }

  if (type === 'teams') {
    const maxTeams = limits.maxTeams
    if (maxTeams === null) return 'Unlimited teams'
    return `${maxTeams} team${maxTeams === 1 ? '' : 's'}`
  }

  return ''
}
