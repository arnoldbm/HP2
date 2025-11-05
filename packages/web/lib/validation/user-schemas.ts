import { z } from 'zod'

/**
 * Zod schema for updating user profile
 * Fields: full_name (optional), avatar_url (optional)
 */
export const updateUserProfileSchema = z.object({
  full_name: z.string().min(1, 'Name must be at least 1 character').max(100, 'Name must be less than 100 characters').optional().or(z.literal('')),
  avatar_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>

/**
 * User profile data returned from database
 */
export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}
