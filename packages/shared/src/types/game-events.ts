/**
 * Game Event Types for HockeyPilot
 *
 * Comprehensive type definitions for all game event types and their context.
 * Includes support for Smart Tags (outcome_tags, skill_tags, drill_tags).
 */

// ===========================================
// BASE EVENT TYPES
// ===========================================

export type EventType =
  | 'shot'
  | 'breakout'
  | 'turnover'
  | 'zone_entry'
  | 'zone_exit'      // NEW: Defensive zone exits
  | 'blocked_shot'   // NEW: Defensive shot blocking
  | 'takeaway'       // NEW: Positive defensive plays
  | 'faceoff'        // EXISTING: Enhanced with more context
  | 'penalty'        // NEW: Infractions (taken or drawn)
  | 'goal_against'   // NEW: Opponent goals

// ===========================================
// EVENT DETAILS BY TYPE
// ===========================================

/**
 * Shot Event Details
 * Tracks shots on goal with enhanced context
 */
export interface ShotDetails {
  shot_type: 'wrist' | 'backhand' | 'slap' | 'snap' | 'one_timer' | 'tip' | 'deflection'
  result: 'goal' | 'save' | 'miss' | 'blocked' | 'post'
  shot_quality: 'high' | 'medium' | 'low'
  rebound?: boolean          // Shot off rebound
  rush?: boolean             // Odd-man rush
  screen?: boolean           // Goalie screened
}

/**
 * Breakout Event Details
 * Tracks defensive zone breakouts with pressure context
 */
export interface BreakoutDetails {
  success: boolean
  breakout_type: 'up_boards' | 'center_ice' | 'd_to_d' | 'reverse' | 'chip'
  exit_zone: 'left' | 'center' | 'right'
  pressure: 'none' | 'low' | 'high'
  passes?: number            // Number of passes in breakout sequence
}

/**
 * Turnover Event Details
 * Tracks giveaways with cause and context
 */
export interface TurnoverDetails {
  type: 'giveaway' | 'takeaway'
  zone: 'defensive' | 'neutral' | 'offensive'
  caused_by: 'bad_pass' | 'lost_puck' | 'hit' | 'pressure' | 'offside'
  pressure: 'none' | 'low' | 'high'
  led_to_goal_against?: boolean
}

/**
 * Zone Entry Event Details
 * Tracks offensive blue line entries
 */
export interface ZoneEntryDetails {
  success: boolean
  entry_type: 'carry' | 'dump' | 'pass' | 'chip'
  zone: 'left' | 'center' | 'right'
  defenders_beaten?: number  // 0, 1, 2+
  led_to_chance?: boolean    // Immediate scoring chance created
}

/**
 * Zone Exit Event Details
 * Tracks defensive zone exits beyond breakouts
 */
export interface ZoneExitDetails {
  controlled: boolean        // Clean exit vs dump
  successful: boolean        // Made it past blue line
  exit_type: 'pass' | 'carry' | 'dump' | 'clear'
  pressure: 'none' | 'low' | 'high'
}

/**
 * Blocked Shot Event Details
 * Tracks defensive shot blocking (blocker's perspective)
 */
export interface BlockedShotDetails {
  blocker_position: 'defense' | 'forward'
  shot_from: 'point' | 'slot' | 'rush' | 'other'
}

/**
 * Takeaway Event Details
 * Tracks positive defensive plays (opposite of turnover)
 */
export interface TakeawayDetails {
  zone: 'defensive' | 'neutral' | 'offensive'
  takeaway_type: 'stick_check' | 'intercept' | 'body_check'
  led_to_chance?: boolean    // Immediate scoring chance created
}

/**
 * Faceoff Event Details
 * Enhanced faceoff tracking with technique
 */
export interface FaceoffDetails {
  won: boolean
  zone: 'defensive' | 'neutral' | 'offensive'
  location: string           // "left_circle", "right_circle", "center", etc.
  technique?: 'forehand' | 'backhand' | 'tie_up'
  clean?: boolean           // Clean win vs scramble
}

/**
 * Penalty Event Details
 * Tracks infractions (both taken and drawn)
 */
export interface PenaltyDetails {
  drawn: boolean                    // Penalty drawn vs penalty taken
  severity: 'minor' | 'major' | 'misconduct'
  infraction: string                // "hooking", "tripping", "high_sticking", etc.
  duration_minutes: number          // 2, 4, 5, 10
}

/**
 * Goal Against Event Details
 * Tracks opponent goals for defensive accountability
 */
export interface GoalAgainstDetails {
  situation: 'even_strength' | 'power_play' | 'penalty_kill' | 'empty_net'
  on_ice_players?: string[]         // Array of player UUIDs
  breakdown_type: 'lost_coverage' | 'bad_clear' | 'bad_pass' | 'other'
  goalie_fault?: boolean            // Goalie at fault
}

// ===========================================
// SMART TAGS (AI LEARNING LAYER)
// ===========================================

/**
 * Smart Tags for AI-driven practice planning
 * Optional layer that doesn't slow down tracking flow
 */
export interface EventTags {
  outcome_tags?: string[]    // Why did event succeed/fail
  skill_tags?: string[]      // What skill needs work
  drill_tags?: string[]      // Direct mapping to practice needs
}

// ===========================================
// UNION TYPES
// ===========================================

/**
 * Union type for all event details
 * Use discriminated union with event_type for type safety
 */
export type EventDetails =
  | ShotDetails
  | BreakoutDetails
  | TurnoverDetails
  | ZoneEntryDetails
  | ZoneExitDetails
  | BlockedShotDetails
  | TakeawayDetails
  | FaceoffDetails
  | PenaltyDetails
  | GoalAgainstDetails

/**
 * Type guard helpers for event details
 */
export function isShotDetails(details: EventDetails): details is ShotDetails {
  return 'shot_type' in details && 'result' in details
}

export function isBreakoutDetails(details: EventDetails): details is BreakoutDetails {
  return 'breakout_type' in details && 'exit_zone' in details
}

export function isTurnoverDetails(details: EventDetails): details is TurnoverDetails {
  return 'caused_by' in details && 'type' in details
}

export function isZoneEntryDetails(details: EventDetails): details is ZoneEntryDetails {
  return 'entry_type' in details && 'success' in details
}

export function isZoneExitDetails(details: EventDetails): details is ZoneExitDetails {
  return 'exit_type' in details && 'controlled' in details
}

export function isBlockedShotDetails(details: EventDetails): details is BlockedShotDetails {
  return 'blocker_position' in details && 'shot_from' in details
}

export function isTakeawayDetails(details: EventDetails): details is TakeawayDetails {
  return 'takeaway_type' in details && 'zone' in details
}

export function isFaceoffDetails(details: EventDetails): details is FaceoffDetails {
  return 'won' in details && 'location' in details
}

export function isPenaltyDetails(details: EventDetails): details is PenaltyDetails {
  return 'drawn' in details && 'severity' in details && 'infraction' in details
}

export function isGoalAgainstDetails(details: EventDetails): details is GoalAgainstDetails {
  return 'breakdown_type' in details && 'situation' in details
}

// ===========================================
// EVENT LABELS & UI HELPERS
// ===========================================

/**
 * Get display label for event type
 */
export function getEventLabel(type: EventType): string {
  switch (type) {
    case 'shot':
      return '🏒 Shot'
    case 'breakout':
      return '⬆️ Breakout'
    case 'turnover':
      return '❌ Turnover'
    case 'zone_entry':
      return '⬇️ Zone Entry'
    case 'zone_exit':
      return '🧊 Zone Exit'
    case 'blocked_shot':
      return '🧍‍♂️ Blocked Shot'
    case 'takeaway':
      return '⚔️ Takeaway'
    case 'faceoff':
      return '🧩 Faceoff'
    case 'penalty':
      return '🚨 Penalty'
    case 'goal_against':
      return '🧱 Goal Against'
  }
}

/**
 * Check if event type requires ice coordinates
 */
export function requiresCoordinates(type: EventType): boolean {
  switch (type) {
    case 'shot':
    case 'zone_exit':
    case 'takeaway':
    case 'faceoff':
    case 'goal_against':
      return true
    case 'breakout':
    case 'turnover':
    case 'zone_entry':
    case 'blocked_shot':
    case 'penalty':
      return false
  }
}

/**
 * Get default details for event type
 * Used for quick logging without full context
 */
export function getDefaultDetails(type: EventType): Partial<EventDetails> {
  switch (type) {
    case 'shot':
      return {
        shot_type: 'wrist',
        result: 'save',
        shot_quality: 'medium',
      } as Partial<ShotDetails>

    case 'breakout':
      return {
        success: true,
        breakout_type: 'up_boards',
        exit_zone: 'left',
        pressure: 'low',
      } as Partial<BreakoutDetails>

    case 'turnover':
      return {
        type: 'giveaway',
        zone: 'neutral',
        caused_by: 'bad_pass',
        pressure: 'low',
      } as Partial<TurnoverDetails>

    case 'zone_entry':
      return {
        success: true,
        entry_type: 'carry',
        zone: 'center',
      } as Partial<ZoneEntryDetails>

    case 'zone_exit':
      return {
        controlled: true,
        successful: true,
        exit_type: 'pass',
        pressure: 'low',
      } as Partial<ZoneExitDetails>

    case 'blocked_shot':
      return {
        blocker_position: 'defense',
        shot_from: 'point',
      } as Partial<BlockedShotDetails>

    case 'takeaway':
      return {
        zone: 'neutral',
        takeaway_type: 'stick_check',
      } as Partial<TakeawayDetails>

    case 'faceoff':
      return {
        won: true,
        zone: 'neutral',
        location: 'center',
      } as Partial<FaceoffDetails>

    case 'penalty':
      return {
        drawn: false,
        severity: 'minor',
        infraction: 'hooking',
        duration_minutes: 2,
      } as Partial<PenaltyDetails>

    case 'goal_against':
      return {
        situation: 'even_strength',
        breakdown_type: 'other',
      } as Partial<GoalAgainstDetails>
  }
}
