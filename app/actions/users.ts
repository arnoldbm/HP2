'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import { updateUserProfileSchema, type UpdateUserProfileInput, type UserProfile } from '@/lib/validation/user-schemas'
import { revalidatePath } from 'next/cache'

/**
 * Get a user's profile by user ID
 * Note: In client components, call this from useEffect after checking auth with supabase.auth.getUser()
 */
export async function getUserProfile(userId?: string): Promise<{ data: UserProfile | null; error: string | null }> {
  try {
    if (!userId) {
      return { data: null, error: 'User ID required' }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      return { data: null, error: profileError.message }
    }

    return { data: profile, error: null }
  } catch (error) {
    console.error('Error getting user profile:', error)
    return { data: null, error: 'Failed to get user profile' }
  }
}

/**
 * Update a user's profile
 * Note: In client components, call this from useEffect after checking auth with supabase.auth.getUser()
 */
export async function updateUserProfile(
  userId: string,
  input: UpdateUserProfileInput
): Promise<{ data: UserProfile | null; error: string | null }> {
  try {
    if (!userId) {
      return { data: null, error: 'User ID required' }
    }

    // Validate input
    const validated = updateUserProfileSchema.safeParse(input)
    if (!validated.success) {
      return { data: null, error: validated.error.errors[0].message }
    }

    // Prepare update data (only include defined fields)
    const updateData: Record<string, string | null> = {}
    if (validated.data.full_name !== undefined) {
      updateData.full_name = validated.data.full_name === '' ? null : validated.data.full_name
    }
    if (validated.data.avatar_url !== undefined) {
      updateData.avatar_url = validated.data.avatar_url === '' ? null : validated.data.avatar_url
    }

    // Update profile
    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (updateError) {
      return { data: null, error: updateError.message }
    }

    // Revalidate settings page
    revalidatePath('/demo/settings')

    return { data: updatedProfile, error: null }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { data: null, error: 'Failed to update user profile' }
  }
}
