/**
 * Event Validation Schemas using Zod
 *
 * These schemas validate game event data before database insertion.
 * Ensures type safety and data integrity for all tracked events.
 */

import { z } from 'zod'

// ===========================================
// SMART TAGS SCHEMA
// ===========================================

export const eventTagsSchema = z.object({
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

// ===========================================
// SHOT EVENT DETAILS
// ===========================================

export const shotEventDetailsSchema = z.object({
  shot_type: z.enum(['wrist', 'backhand', 'slap', 'snap', 'one_timer', 'tip', 'deflection']),
  result: z.enum(['goal', 'save', 'miss', 'blocked', 'post']),
  shot_quality: z.enum(['high', 'medium', 'low']),
  rebound: z.boolean().optional(),
  rush: z.boolean().optional(),
  screen: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type ShotEventDetails = z.infer<typeof shotEventDetailsSchema>

// ===========================================
// BREAKOUT EVENT DETAILS
// ===========================================

export const breakoutEventDetailsSchema = z.object({
  success: z.boolean(),
  breakout_type: z.enum(['up_boards', 'center_ice', 'd_to_d', 'reverse', 'chip']),
  exit_zone: z.enum(['left', 'center', 'right']),
  pressure: z.enum(['none', 'low', 'high']),
  passes: z.number().int().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type BreakoutEventDetails = z.infer<typeof breakoutEventDetailsSchema>

// ===========================================
// TURNOVER EVENT DETAILS
// ===========================================

export const turnoverEventDetailsSchema = z.object({
  type: z.enum(['giveaway', 'takeaway']),
  zone: z.enum(['defensive', 'neutral', 'offensive']),
  caused_by: z.enum(['bad_pass', 'lost_puck', 'hit', 'pressure', 'offside']),
  pressure: z.enum(['none', 'low', 'high']),
  led_to_goal_against: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type TurnoverEventDetails = z.infer<typeof turnoverEventDetailsSchema>

// ===========================================
// ZONE ENTRY EVENT DETAILS
// ===========================================

export const zoneEntryEventDetailsSchema = z.object({
  success: z.boolean(),
  entry_type: z.enum(['carry', 'dump', 'pass', 'chip']),
  zone: z.enum(['left', 'center', 'right']),
  defenders_beaten: z.number().int().optional(),
  led_to_chance: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type ZoneEntryEventDetails = z.infer<typeof zoneEntryEventDetailsSchema>

// ===========================================
// ZONE EXIT EVENT DETAILS (NEW)
// ===========================================

export const zoneExitEventDetailsSchema = z.object({
  controlled: z.boolean(),
  successful: z.boolean(),
  exit_type: z.enum(['pass', 'carry', 'dump', 'clear']),
  pressure: z.enum(['none', 'low', 'high']),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type ZoneExitEventDetails = z.infer<typeof zoneExitEventDetailsSchema>

// ===========================================
// BLOCKED SHOT EVENT DETAILS (NEW)
// ===========================================

export const blockedShotEventDetailsSchema = z.object({
  blocker_position: z.enum(['defense', 'forward']),
  shot_from: z.enum(['point', 'slot', 'rush', 'other']),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type BlockedShotEventDetails = z.infer<typeof blockedShotEventDetailsSchema>

// ===========================================
// TAKEAWAY EVENT DETAILS (NEW)
// ===========================================

export const takeawayEventDetailsSchema = z.object({
  zone: z.enum(['defensive', 'neutral', 'offensive']),
  takeaway_type: z.enum(['stick_check', 'intercept', 'body_check']),
  led_to_chance: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type TakeawayEventDetails = z.infer<typeof takeawayEventDetailsSchema>

// ===========================================
// FACEOFF EVENT DETAILS (ENHANCED)
// ===========================================

export const faceoffEventDetailsSchema = z.object({
  won: z.boolean(),
  zone: z.enum(['defensive', 'neutral', 'offensive']),
  location: z.string(),
  technique: z.enum(['forehand', 'backhand', 'tie_up']).optional(),
  clean: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type FaceoffEventDetails = z.infer<typeof faceoffEventDetailsSchema>

// ===========================================
// PENALTY EVENT DETAILS (NEW)
// ===========================================

export const penaltyEventDetailsSchema = z.object({
  drawn: z.boolean(),
  severity: z.enum(['minor', 'major', 'misconduct']),
  infraction: z.string(),
  duration_minutes: z.number().int(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type PenaltyEventDetails = z.infer<typeof penaltyEventDetailsSchema>

// ===========================================
// GOAL AGAINST EVENT DETAILS (NEW)
// ===========================================

export const goalAgainstEventDetailsSchema = z.object({
  situation: z.enum(['even_strength', 'power_play', 'penalty_kill', 'empty_net']),
  on_ice_players: z.array(z.string().uuid()).optional(),
  breakdown_type: z.enum(['lost_coverage', 'bad_clear', 'bad_pass', 'other']),
  goalie_fault: z.boolean().optional(),
  // Smart tags
  outcome_tags: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  drill_tags: z.array(z.string()).optional(),
})

export type GoalAgainstEventDetails = z.infer<typeof goalAgainstEventDetailsSchema>

// ===========================================
// GAME EVENT CREATION SCHEMA
// ===========================================

export const gameEventCreateSchema = z.object({
  // Required fields
  game_id: z.string().uuid(),
  event_type: z.enum([
    'shot',
    'breakout',
    'turnover',
    'zone_entry',
    'zone_exit',      // NEW
    'blocked_shot',   // NEW
    'takeaway',       // NEW
    'faceoff',
    'penalty',        // NEW
    'goal_against',   // NEW
  ]),
  period: z.number().int().min(1).max(5),
  situation: z.enum(['even_strength', 'power_play', 'penalty_kill', 'empty_net']).default('even_strength'),
  details: z.any(), // JSONB field, validated separately by event type

  // Optional spatial data
  x_coord: z.number().int().min(0).max(200).optional(),
  y_coord: z.number().int().min(0).max(100).optional(),

  // Optional temporal data
  game_time_seconds: z.number().int().min(0).max(1200).optional(),

  // Optional player/situation context
  player_id: z.string().uuid().optional(),
  zone: z.enum(['defensive', 'neutral', 'offensive']).optional(),

  // Optional metadata
  notes: z.string().optional(),
})

export type GameEventCreate = z.infer<typeof gameEventCreateSchema>

// ===========================================
// EVENT TYPE DISCRIMINATED UNIONS
// ===========================================

/**
 * Validate event details based on event type
 * @param eventType - The type of event
 * @param details - The event details to validate
 * @returns Validated details or throws ZodError
 */
export function validateEventDetails(eventType: string, details: unknown): unknown {
  switch (eventType) {
    case 'shot':
      return shotEventDetailsSchema.parse(details)
    case 'breakout':
      return breakoutEventDetailsSchema.parse(details)
    case 'turnover':
      return turnoverEventDetailsSchema.parse(details)
    case 'zone_entry':
      return zoneEntryEventDetailsSchema.parse(details)
    case 'zone_exit':
      return zoneExitEventDetailsSchema.parse(details)
    case 'blocked_shot':
      return blockedShotEventDetailsSchema.parse(details)
    case 'takeaway':
      return takeawayEventDetailsSchema.parse(details)
    case 'faceoff':
      return faceoffEventDetailsSchema.parse(details)
    case 'penalty':
      return penaltyEventDetailsSchema.parse(details)
    case 'goal_against':
      return goalAgainstEventDetailsSchema.parse(details)
    default:
      // For unknown event types, allow any details
      return details
  }
}

// ===========================================
// HELPER FUNCTIONS
// ===========================================

/**
 * Safe parse that returns success/error objects
 */
export function safeParseGameEvent(data: unknown) {
  return gameEventCreateSchema.safeParse(data)
}

/**
 * Validate and parse a complete game event with type-specific details
 */
export function validateGameEvent(data: unknown): GameEventCreate {
  const event = gameEventCreateSchema.parse(data)

  // Validate event-specific details
  validateEventDetails(event.event_type, event.details)

  return event
}
