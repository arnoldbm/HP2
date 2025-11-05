/**
 * @hockeypilot/shared
 *
 * Shared code between web and mobile apps
 * - Types
 * - API clients
 * - Business logic
 * - Zustand stores
 * - Validation schemas
 */

// Export types
export * from './types'

// Export validation schemas
export * from './validation/event-schemas'
export * from './validation/player-schemas'
export * from './validation/team-schemas'
export * from './validation/user-schemas'

// Export utils
export * from './utils/age-groups'
export * from './utils/ice-surface-coordinates'
export * from './utils/organization-setup'

// Export analytics
export * from './analytics/shot-quality'
export * from './analytics/breakout-analytics'
export {
  type PlayerStats,
  type ShotData,
  type ShotQualityStats,
  type BreakoutAnalytics,
  type PeriodStats,
  type TurnoverData,
  extractShotData,
  calculateShotQualityStats,
  analyzeBreakouts,
  getPeriodStats,
  extractTurnoverData,
  getShootingPercentageBySituation,
  calculatePlayerStats,
} from './analytics/game-analytics'
