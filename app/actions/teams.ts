'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import { teamCreateSchema, teamUpdateSchema, type TeamCreateInput } from '@/lib/validation/team-schemas'

/**
 * Get Team Statistics
 * Returns player count and game count for a team
 */
export async function getTeamStats(teamId: string): Promise<{
  playerCount: number
  gameCount: number
  error: string | null
}> {
  try {
    // Get player count
    const { count: playerCount, error: playersError } = await supabaseAdmin
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', teamId)

    if (playersError) {
      console.error('Error counting players:', playersError)
      return { playerCount: 0, gameCount: 0, error: playersError.message }
    }

    // Get game count
    const { count: gameCount, error: gamesError } = await supabaseAdmin
      .from('games')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', teamId)

    if (gamesError) {
      console.error('Error counting games:', gamesError)
      return { playerCount: playerCount || 0, gameCount: 0, error: gamesError.message }
    }

    return {
      playerCount: playerCount || 0,
      gameCount: gameCount || 0,
      error: null,
    }
  } catch (error) {
    console.error('Error getting team stats:', error)
    return { playerCount: 0, gameCount: 0, error: 'Failed to get team stats' }
  }
}

/**
 * Create Team
 *
 * Create a new team and add the user as head coach
 *
 * @param input - Team creation data
 * @param userId - User ID to add as head coach
 * @returns Created team and membership
 */
export async function createTeam(input: TeamCreateInput, userId: string): Promise<{
  success: boolean
  team?: {
    id: string
    name: string
    age_years: number
    level: string
    season: string
    region: string
  }
  membership?: {
    id: string
    role: string
  }
  error?: string
}> {
  try {
    // Validate input
    const validatedData = teamCreateSchema.parse(input)

    // 1. Create team
    const { data: team, error: teamError } = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: validatedData.organization_id,
        name: validatedData.name,
        age_years: validatedData.age_years,
        level: validatedData.level,
        season: validatedData.season,
        region: validatedData.region,
      })
      .select()
      .single()

    if (teamError) {
      console.error('Failed to create team:', teamError)
      return {
        success: false,
        error: 'Failed to create team',
      }
    }

    // 2. Add user as head coach
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: userId,
        role: 'head_coach',
      })
      .select('id, role')
      .single()

    if (membershipError) {
      console.error('Failed to add user as head coach:', membershipError)
      // Rollback: delete the team
      await supabaseAdmin.from('teams').delete().eq('id', team.id)
      return {
        success: false,
        error: 'Failed to add user as head coach',
      }
    }

    return {
      success: true,
      team,
      membership,
    }
  } catch (error) {
    console.error('Unexpected error in createTeam:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get User's Teams
 *
 * Fetch all teams the user belongs to
 */
export async function getUserTeams(userId: string): Promise<{
  success: boolean
  teams?: Array<{
    id: string
    name: string
    age_years: number
    age_group_display: string
    level: string
    season: string
    region: string
    organization_id: string
    role: string
  }>
  error?: string
}> {
  try {
    const { data: memberships, error } = await supabaseAdmin
      .from('team_members')
      .select(
        `
        role,
        teams:team_id (
          id,
          name,
          age_years,
          level,
          season,
          region,
          organization_id
        )
      `
      )
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to fetch user teams:', error)
      return {
        success: false,
        error: 'Failed to fetch teams',
      }
    }

    // Use the teams_with_age_display view for formatted age groups
    const teamIds = memberships?.map((m: any) => m.teams.id) || []

    if (teamIds.length === 0) {
      return {
        success: true,
        teams: [],
      }
    }

    const { data: teamsWithDisplay, error: displayError } = await supabaseAdmin
      .from('teams_with_age_display')
      .select('*')
      .in('id', teamIds)

    if (displayError) {
      console.error('Failed to fetch teams with display:', displayError)
      // Fallback to basic data
      const teams =
        memberships?.map((m: any) => ({
          ...m.teams,
          age_group_display: `${m.teams.age_years}`, // Fallback
          role: m.role,
        })) || []

      return {
        success: true,
        teams,
      }
    }

    // Merge role information
    const teams = teamsWithDisplay.map((team) => {
      const membership = memberships?.find((m: any) => m.teams.id === team.id)
      return {
        ...team,
        role: membership?.role || 'member',
      }
    })

    return {
      success: true,
      teams,
    }
  } catch (error) {
    console.error('Unexpected error in getUserTeams:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get Team by ID
 *
 * Fetch a single team by ID (with user access check)
 */
export async function getTeamById(
  teamId: string,
  userId: string
): Promise<{
  success: boolean
  team?: {
    id: string
    name: string
    age_years: number
    age_group_display: string
    level: string
    season: string
    region: string
    organization_id: string
    role: string
  }
  error?: string
}> {
  try {
    // First verify the user has access to this team
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('team_members')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (membershipError || !membership) {
      return {
        success: false,
        error: 'Team not found or you do not have access',
      }
    }

    // Fetch team with formatted age group
    const { data: team, error: teamError } = await supabaseAdmin
      .from('teams_with_age_display')
      .select('*')
      .eq('id', teamId)
      .single()

    if (teamError || !team) {
      console.error('Failed to fetch team:', teamError)
      return {
        success: false,
        error: 'Failed to fetch team details',
      }
    }

    return {
      success: true,
      team: {
        ...team,
        role: membership.role,
      },
    }
  } catch (error) {
    console.error('Unexpected error in getTeamById:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Update Team
 *
 * Update team details (name, level, season)
 * Note: age_years and region cannot be changed
 */
export async function updateTeam(
  teamId: string,
  input: { name?: string; level?: string; season?: string }
): Promise<{
  success: boolean
  team?: any
  error?: string
}> {
  try {
    // Validate input
    const validatedData = teamUpdateSchema.parse(input)

    const { data: team, error } = await supabaseAdmin
      .from('teams')
      .update(validatedData)
      .eq('id', teamId)
      .select()
      .single()

    if (error) {
      console.error('Failed to update team:', error)
      return {
        success: false,
        error: 'Failed to update team',
      }
    }

    return {
      success: true,
      team,
    }
  } catch (error) {
    console.error('Unexpected error in updateTeam:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Delete Team
 *
 * Delete a team (requires head_coach role)
 */
export async function deleteTeam(teamId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { error } = await supabaseAdmin.from('teams').delete().eq('id', teamId)

    if (error) {
      console.error('Failed to delete team:', error)
      return {
        success: false,
        error: 'Failed to delete team',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in deleteTeam:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get Team Members
 *
 * Fetch all members of a team with their user profile info
 */
export async function getTeamMembers(teamId: string): Promise<{
  success: boolean
  members?: Array<{
    id: string
    user_id: string
    role: string
    created_at: string
    email: string
    full_name: string | null
  }>
  error?: string
}> {
  try {
    const { data: members, error } = await supabaseAdmin
      .from('team_members')
      .select(`
        id,
        user_id,
        role,
        created_at,
        user_profiles:user_id (
          email,
          full_name
        )
      `)
      .eq('team_id', teamId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Failed to fetch team members:', error)
      return {
        success: false,
        error: 'Failed to fetch team members',
      }
    }

    // Transform the data to flatten user_profiles
    const formattedMembers = members?.map((member: any) => ({
      id: member.id,
      user_id: member.user_id,
      role: member.role,
      created_at: member.created_at,
      email: member.user_profiles?.email || '',
      full_name: member.user_profiles?.full_name || null,
    })) || []

    return {
      success: true,
      members: formattedMembers,
    }
  } catch (error) {
    console.error('Unexpected error in getTeamMembers:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Add Team Member
 *
 * Add a user to a team by email
 */
export async function addTeamMember(
  teamId: string,
  email: string,
  role: 'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker'
): Promise<{
  success: boolean
  member?: any
  error?: string
}> {
  try {
    // 1. Find user by email
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle()

    if (profileError) {
      console.error('Error finding user:', profileError)
      return {
        success: false,
        error: 'Error finding user',
      }
    }

    if (!profile) {
      return {
        success: false,
        error: 'No user found with this email address',
      }
    }

    // 2. Check if already a member
    const { data: existingMember } = await supabaseAdmin
      .from('team_members')
      .select('id')
      .eq('team_id', teamId)
      .eq('user_id', profile.id)
      .maybeSingle()

    if (existingMember) {
      return {
        success: false,
        error: 'User is already a member of this team',
      }
    }

    // 3. Add as team member
    const { data: member, error: memberError } = await supabaseAdmin
      .from('team_members')
      .insert({
        team_id: teamId,
        user_id: profile.id,
        role: role,
      })
      .select()
      .single()

    if (memberError) {
      console.error('Failed to add team member:', memberError)
      return {
        success: false,
        error: 'Failed to add team member',
      }
    }

    return {
      success: true,
      member,
    }
  } catch (error) {
    console.error('Unexpected error in addTeamMember:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Remove Team Member
 *
 * Remove a user from a team
 */
export async function removeTeamMember(
  teamId: string,
  userId: string
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // Check if this is the last head_coach
    const { data: headCoaches } = await supabaseAdmin
      .from('team_members')
      .select('id, user_id')
      .eq('team_id', teamId)
      .eq('role', 'head_coach')

    if (headCoaches && headCoaches.length === 1 && headCoaches[0].user_id === userId) {
      return {
        success: false,
        error: 'Cannot remove the last head coach. Assign another head coach first.',
      }
    }

    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to remove team member:', error)
      return {
        success: false,
        error: 'Failed to remove team member',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in removeTeamMember:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Update Team Member Role
 *
 * Change a team member's role
 */
export async function updateTeamMemberRole(
  teamId: string,
  userId: string,
  newRole: 'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker'
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // If changing FROM head_coach, check if there's another head_coach
    const { data: currentMember } = await supabaseAdmin
      .from('team_members')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (currentMember?.role === 'head_coach' && newRole !== 'head_coach') {
      // Check if there are other head coaches
      const { data: headCoaches } = await supabaseAdmin
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('role', 'head_coach')

      if (headCoaches && headCoaches.length === 1) {
        return {
          success: false,
          error: 'Cannot change role. Team must have at least one head coach.',
        }
      }
    }

    const { error } = await supabaseAdmin
      .from('team_members')
      .update({ role: newRole })
      .eq('team_id', teamId)
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to update team member role:', error)
      return {
        success: false,
        error: 'Failed to update role',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in updateTeamMemberRole:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
