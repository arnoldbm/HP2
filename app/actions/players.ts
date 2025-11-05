'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import { playerCreateSchema, playerUpdateSchema, type PlayerCreateInput } from '@/lib/validation/player-schemas'

/**
 * Create Player
 *
 * Add a new player to a team roster
 *
 * @param input - Player creation data
 * @param userId - User ID performing the action
 * @returns Created player
 */
export async function createPlayer(input: PlayerCreateInput, userId: string): Promise<{
  success: boolean
  player?: {
    id: string
    team_id: string
    jersey_number: number
    first_name: string
    last_name: string
    position: string
    birthdate: string | null
  }
  error?: string
  requiresVerification?: boolean
}> {
  try {
    // Check if user's email is verified (using our custom field)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('email_verified')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return {
        success: false,
        error: 'User profile not found',
      }
    }

    if (!profile.email_verified) {
      return {
        success: false,
        error: 'Please verify your email address before adding players',
        requiresVerification: true,
      }
    }

    // Validate input
    const validatedData = playerCreateSchema.parse(input)

    // Check if jersey number is already taken on this team
    const { data: existingPlayer } = await supabaseAdmin
      .from('players')
      .select('id')
      .eq('team_id', validatedData.team_id)
      .eq('jersey_number', validatedData.jersey_number)
      .single()

    if (existingPlayer) {
      return {
        success: false,
        error: `Jersey number ${validatedData.jersey_number} is already taken on this team`,
      }
    }

    // Create player
    const { data: player, error: playerError } = await supabaseAdmin
      .from('players')
      .insert({
        team_id: validatedData.team_id,
        jersey_number: validatedData.jersey_number,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        position: validatedData.position,
        birthdate: validatedData.birthdate || null,
      })
      .select()
      .single()

    if (playerError) {
      console.error('Failed to create player:', playerError)
      return {
        success: false,
        error: 'Failed to create player',
      }
    }

    return {
      success: true,
      player,
    }
  } catch (error) {
    console.error('Unexpected error in createPlayer:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get Team Roster
 *
 * Fetch all players for a team, sorted by position then jersey number
 *
 * @param teamId - Team ID
 * @returns Array of players
 */
export async function getTeamRoster(teamId: string): Promise<{
  success: boolean
  players?: Array<{
    id: string
    team_id: string
    jersey_number: number
    first_name: string
    last_name: string
    position: string
    birthdate: string | null
    created_at: string
  }>
  error?: string
}> {
  try {
    const { data: players, error } = await supabaseAdmin
      .from('players')
      .select()
      .eq('team_id', teamId)
      .order('jersey_number') // Simple sort by jersey number

    if (error) {
      console.error('Failed to fetch team roster:', error)
      return {
        success: false,
        error: 'Failed to fetch roster',
      }
    }

    return {
      success: true,
      players: players || [],
    }
  } catch (error) {
    console.error('Unexpected error in getTeamRoster:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Update Player
 *
 * Update player details
 *
 * @param playerId - Player ID
 * @param input - Player update data
 * @param userId - User ID performing the action
 * @returns Updated player
 */
export async function updatePlayer(
  playerId: string,
  input: { jersey_number?: number; first_name?: string; last_name?: string; position?: string; birthdate?: string },
  userId: string
): Promise<{
  success: boolean
  player?: any
  error?: string
  requiresVerification?: boolean
}> {
  try {
    // Check if user's email is verified (using our custom field)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('email_verified')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return {
        success: false,
        error: 'User profile not found',
      }
    }

    if (!profile.email_verified) {
      return {
        success: false,
        error: 'Please verify your email address before editing players',
        requiresVerification: true,
      }
    }

    // Validate input
    const validatedData = playerUpdateSchema.parse(input)

    // If updating jersey number, check if it's already taken
    if (validatedData.jersey_number) {
      // Get the player's team_id first
      const { data: currentPlayer } = await supabaseAdmin
        .from('players')
        .select('team_id')
        .eq('id', playerId)
        .single()

      if (currentPlayer) {
        const { data: existingPlayer } = await supabaseAdmin
          .from('players')
          .select('id')
          .eq('team_id', currentPlayer.team_id)
          .eq('jersey_number', validatedData.jersey_number)
          .neq('id', playerId) // Exclude current player
          .single()

        if (existingPlayer) {
          return {
            success: false,
            error: `Jersey number ${validatedData.jersey_number} is already taken on this team`,
          }
        }
      }
    }

    const { data: player, error } = await supabaseAdmin
      .from('players')
      .update(validatedData)
      .eq('id', playerId)
      .select()
      .single()

    if (error) {
      console.error('Failed to update player:', error)
      return {
        success: false,
        error: 'Failed to update player',
      }
    }

    return {
      success: true,
      player,
    }
  } catch (error) {
    console.error('Unexpected error in updatePlayer:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Delete Player
 *
 * Remove a player from the roster
 *
 * @param playerId - Player ID
 * @param userId - User ID performing the action
 * @returns Success status
 */
export async function deletePlayer(playerId: string, userId: string): Promise<{
  success: boolean
  error?: string
  requiresVerification?: boolean
}> {
  try {
    // Check if user's email is verified (using our custom field)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('email_verified')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return {
        success: false,
        error: 'User profile not found',
      }
    }

    if (!profile.email_verified) {
      return {
        success: false,
        error: 'Please verify your email address before deleting players',
        requiresVerification: true,
      }
    }

    const { error } = await supabaseAdmin.from('players').delete().eq('id', playerId)

    if (error) {
      console.error('Failed to delete player:', error)
      return {
        success: false,
        error: 'Failed to delete player',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in deletePlayer:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
