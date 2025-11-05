import { z } from 'zod'

/**
 * Player Position Enum
 * Matches database enum: player_position
 */
export const playerPositionEnum = z.enum(['forward', 'defense', 'goalie'])
export type PlayerPosition = z.infer<typeof playerPositionEnum>

/**
 * Player Creation Schema
 *
 * Validation rules:
 * - team_id: Required UUID
 * - jersey_number: Required, 1-99 (standard hockey range)
 * - first_name: Required, 1-50 chars
 * - last_name: Required, 1-50 chars
 * - position: Required, one of: forward, defense, goalie
 * - birthdate: Optional, valid date string
 */
export const playerCreateSchema = z.object({
  team_id: z.string().uuid('Invalid team ID'),
  jersey_number: z
    .number({ required_error: 'Jersey number is required', invalid_type_error: 'Jersey number is required' })
    .int('Jersey number must be an integer')
    .min(1, 'Jersey number must be at least 1')
    .max(99, 'Jersey number must be at most 99'),
  first_name: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters')
    .trim(),
  last_name: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters')
    .trim(),
  position: playerPositionEnum,
  birthdate: z
    .union([z.string(), z.null()])
    .optional()
    .transform((val) => (val === '' || val === null ? undefined : val))
    .pipe(z.string().date().optional()),
})

export type PlayerCreateInput = z.infer<typeof playerCreateSchema>

/**
 * Player Update Schema
 * Same as create but all fields optional except ID
 */
export const playerUpdateSchema = z.object({
  jersey_number: z
    .number()
    .int('Jersey number must be an integer')
    .min(1, 'Jersey number must be at least 1')
    .max(99, 'Jersey number must be at most 99')
    .optional(),
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be at most 50 characters')
    .trim()
    .optional(),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be at most 50 characters')
    .trim()
    .optional(),
  position: playerPositionEnum.optional(),
  birthdate: z
    .union([z.string(), z.null()])
    .optional()
    .transform((val) => (val === '' || val === null ? undefined : val))
    .pipe(z.string().date().optional()),
})

export type PlayerUpdateInput = z.infer<typeof playerUpdateSchema>

/**
 * Helper: Format player position for display
 */
export function formatPosition(position: PlayerPosition): string {
  const map: Record<PlayerPosition, string> = {
    forward: 'Forward',
    defense: 'Defense',
    goalie: 'Goalie',
  }
  return map[position]
}

/**
 * Helper: Get position abbreviation
 */
export function getPositionAbbreviation(position: PlayerPosition): string {
  const map: Record<PlayerPosition, string> = {
    forward: 'F',
    defense: 'D',
    goalie: 'G',
  }
  return map[position]
}
