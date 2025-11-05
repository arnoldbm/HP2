/**
 * Event Validation Schemas using Zod
 *
 * These schemas validate game event data before database insertion.
 * Ensures type safety and data integrity for all tracked events.
 */

import { z } from 'zod'

// ===========================================
// SHOT EVENT DETAILS
// ===========================================

export const shotEventDetailsSchema = z.object({
  shot_type: z.enum(['wrist', 'slap', 'snap', 'backhand', 'deflection', 'one_timer']),
  result: z.enum(['goal', 'save', 'miss_high', 'miss_wide', 'blocked', 'post']),
  shot_quality: z.enum(['high', 'medium', 'low']),
  rebound: z.boolean().optional(),
})

export type ShotEventDetails = z.infer<typeof shotEventDetailsSchema>

// ===========================================
// BREAKOUT EVENT DETAILS
// ===========================================

export const breakoutEventDetailsSchema = z.object({
  success: z.boolean(),
  type: z.enum(['up_boards', 'center_ice', 'cross_ice', 'carry']),
  exit_zone: z.enum(['left', 'center', 'right']).optional(),
})

export type BreakoutEventDetails = z.infer<typeof breakoutEventDetailsSchema>

// ===========================================
// TURNOVER EVENT DETAILS
// ===========================================

export const turnoverEventDetailsSchema = z.object({
  type: z.enum(['bad_pass', 'lost_puck', 'forced']),
  recovery: z.boolean().optional(),
})

export type TurnoverEventDetails = z.infer<typeof turnoverEventDetailsSchema>

// ===========================================
// ZONE ENTRY EVENT DETAILS
// ===========================================

export const zoneEntryEventDetailsSchema = z.object({
  entry_type: z.enum(['dump', 'carry', 'pass']),
  controlled: z.boolean(),
})

export type ZoneEntryEventDetails = z.infer<typeof zoneEntryEventDetailsSchema>

// ===========================================
// FACEOFF EVENT DETAILS
// ===========================================

export const faceoffEventDetailsSchema = z.object({
  won: z.boolean(),
  location: z.string(),
})

export type FaceoffEventDetails = z.infer<typeof faceoffEventDetailsSchema>

// ===========================================
// GAME EVENT CREATION SCHEMA
// ===========================================

export const gameEventCreateSchema = z.object({
  // Required fields
  game_id: z.string().uuid(),
  event_type: z.enum([
    'shot',
    'goal',
    'breakout',
    'turnover',
    'zone_entry',
    'faceoff',
    'penalty',
    'defensive_breakdown',
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
    case 'goal':
      return shotEventDetailsSchema.parse(details)
    case 'breakout':
      return breakoutEventDetailsSchema.parse(details)
    case 'turnover':
      return turnoverEventDetailsSchema.parse(details)
    case 'zone_entry':
      return zoneEntryEventDetailsSchema.parse(details)
    case 'faceoff':
      return faceoffEventDetailsSchema.parse(details)
    default:
      // For other event types, allow any details (validated later)
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
