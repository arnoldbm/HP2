import { z } from 'zod'

/**
 * Team Validation Schemas
 *
 * Zod schemas for creating and updating teams.
 * Used with React Hook Form for client-side validation
 * and server actions for server-side validation.
 */

/**
 * Team Create Schema
 *
 * Validates all required fields for creating a new team
 */
export const teamCreateSchema = z.object({
  organization_id: z.string().uuid('Invalid organization ID'),
  name: z
    .string()
    .min(1, 'Team name is required')
    .max(100, 'Team name must be less than 100 characters'),
  age_years: z
    .number()
    .int('Age must be a whole number')
    .min(6, 'Age must be at least 6')
    .max(21, 'Age must be 21 or less'),
  level: z.enum(['house', 'travel', 'aaa', 'aa', 'a'], {
    errorMap: () => ({ message: 'Please select a skill level' }),
  }),
  season: z
    .string()
    .regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY (e.g., 2024-25)')
    .refine(
      (season) => {
        const [startYear, endYear] = season.split('-').map(Number)
        return endYear === (startYear + 1) % 100
      },
      { message: 'Invalid season format (e.g., 2024-25)' }
    ),
  region: z.enum(['usa', 'canada'], {
    errorMap: () => ({ message: 'Please select a region' }),
  }).default('usa'),
})

export type TeamCreateInput = z.infer<typeof teamCreateSchema>

/**
 * Team Update Schema
 *
 * Similar to create, but all fields optional (for partial updates)
 * Note: age_years cannot be changed once set (business rule)
 */
export const teamUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'Team name is required')
    .max(100, 'Team name must be less than 100 characters')
    .optional(),
  level: z.enum(['house', 'travel', 'aaa', 'aa', 'a']).optional(),
  season: z
    .string()
    .regex(/^\d{4}-\d{2}$/, 'Season must be in format YYYY-YY')
    .optional(),
  // Note: age_years and region are intentionally excluded (cannot be changed)
})

export type TeamUpdateInput = z.infer<typeof teamUpdateSchema>

/**
 * Helper: Get current season string
 *
 * @returns Current season in YYYY-YY format (e.g., "2024-25")
 */
export function getCurrentSeason(): string {
  const now = new Date()
  const month = now.getMonth() + 1 // 0-indexed

  // Hockey season starts in September (month 9)
  // If before September, we're in the season that started last year
  // If September or after, we're in the season starting this year
  const startYear = month < 9 ? now.getFullYear() - 1 : now.getFullYear()
  const endYear = startYear + 1

  return `${startYear}-${String(endYear).slice(2)}` // "2024-25"
}

/**
 * Helper: Parse season string to years
 *
 * @param season - Season string like "2024-25"
 * @returns { startYear: 2024, endYear: 2025 }
 */
export function parseSeason(season: string): { startYear: number; endYear: number } | null {
  const match = season.match(/^(\d{4})-(\d{2})$/)
  if (!match) return null

  const startYear = parseInt(match[1])
  const endYear = 2000 + parseInt(match[2])

  return { startYear, endYear }
}
