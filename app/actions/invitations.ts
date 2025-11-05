'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import { sendTeamInvitationEmail } from '@/lib/email/resend'
import crypto from 'crypto'

/**
 * Create Team Invitation
 *
 * Generates an invitation with a unique token and optionally sends an email
 */
export async function createTeamInvitation(
  teamId: string,
  email: string,
  role: 'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker',
  invitedBy: string,
  sendEmail: boolean = true
): Promise<{
  success: boolean
  invitation?: {
    id: string
    token: string
    inviteLink: string
  }
  error?: string
  requiresVerification?: boolean
}> {
  try {
    // 0. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Invalid email address format. Please provide a valid email (e.g., user@example.com)',
      }
    }

    // 1. Check if inviting user's email is verified (using our custom field)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('email_verified')
      .eq('id', invitedBy)
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
        error: 'Please verify your email address before inviting team members',
        requiresVerification: true,
      }
    }

    // 2. Check if user is already a member
    const { data: existingProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingProfile) {
      const { data: existingMember } = await supabaseAdmin
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', existingProfile.id)
        .maybeSingle()

      if (existingMember) {
        return {
          success: false,
          error: 'User is already a member of this team',
        }
      }
    }

    // 3. Check for pending invitation
    const { data: pendingInvite } = await supabaseAdmin
      .from('team_invitations')
      .select('id')
      .eq('team_id', teamId)
      .eq('email', email)
      .eq('status', 'pending')
      .maybeSingle()

    if (pendingInvite) {
      return {
        success: false,
        error: 'An invitation is already pending for this email',
      }
    }

    // 4. Generate secure token
    const token = crypto.randomBytes(32).toString('hex')

    // 5. Create invitation
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('team_invitations')
      .insert({
        team_id: teamId,
        email: email.toLowerCase(),
        role,
        token,
        invited_by: invitedBy,
      })
      .select('id, token')
      .single()

    if (inviteError || !invitation) {
      console.error('Failed to create invitation:', inviteError)
      return {
        success: false,
        error: 'Failed to create invitation',
      }
    }

    // 6. Generate invite link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const inviteLink = `${baseUrl}/invite/${invitation.token}`

    // 7. Send email if requested
    if (sendEmail) {
      // Get team and inviter info
      const { data: team } = await supabaseAdmin
        .from('teams')
        .select('name')
        .eq('id', teamId)
        .single()

      const { data: inviter } = await supabaseAdmin
        .from('user_profiles')
        .select('full_name, email')
        .eq('id', invitedBy)
        .single()

      if (team && inviter) {
        await sendTeamInvitationEmail(email, {
          inviteeName: email.split('@')[0], // Use email username if name unknown
          inviterName: inviter.full_name || inviter.email,
          teamName: team.name,
          role: role.replace('_', ' '),
          inviteLink,
        })
      }
    }

    return {
      success: true,
      invitation: {
        id: invitation.id,
        token: invitation.token,
        inviteLink,
      },
    }
  } catch (error) {
    console.error('Unexpected error creating invitation:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get My Invitations
 *
 * Fetch all pending invitations for a user's email
 */
export async function getMyInvitations(email: string): Promise<{
  success: boolean
  invitations?: Array<{
    id: string
    team_id: string
    team_name: string
    token: string
    email: string
    role: string
    status: string
    created_at: string
    expires_at: string
    invited_by_name: string | null
  }>
  error?: string
}> {
  try {
    const { data: invitations, error } = await supabaseAdmin
      .from('team_invitations')
      .select('id, team_id, token, email, role, status, created_at, expires_at, invited_by')
      .eq('email', email.toLowerCase())
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch my invitations:', error)
      return {
        success: false,
        error: 'Failed to fetch invitations',
      }
    }

    if (!invitations || invitations.length === 0) {
      return {
        success: true,
        invitations: [],
      }
    }

    // Get team names
    const teamIds = invitations.map((inv) => inv.team_id)
    const { data: teams } = await supabaseAdmin
      .from('teams')
      .select('id, name')
      .in('id', teamIds)

    // Get inviter names
    const inviterIds = invitations.map((inv) => inv.invited_by)
    const { data: inviters } = await supabaseAdmin
      .from('user_profiles')
      .select('id, full_name, email')
      .in('id', inviterIds)

    const formattedInvitations = invitations.map((inv) => {
      const team = teams?.find((t) => t.id === inv.team_id)
      const inviter = inviters?.find((i) => i.id === inv.invited_by)
      return {
        id: inv.id,
        team_id: inv.team_id,
        team_name: team?.name || 'Unknown Team',
        token: inv.token,
        email: inv.email,
        role: inv.role,
        status: inv.status,
        created_at: inv.created_at,
        expires_at: inv.expires_at,
        invited_by_name: inviter?.full_name || inviter?.email || null,
      }
    })

    return {
      success: true,
      invitations: formattedInvitations,
    }
  } catch (error) {
    console.error('Unexpected error fetching my invitations:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get Team Invitations
 *
 * Fetch all invitations for a team
 */
export async function getTeamInvitations(teamId: string): Promise<{
  success: boolean
  invitations?: Array<{
    id: string
    email: string
    role: string
    status: string
    created_at: string
    expires_at: string
    invited_by_name: string | null
  }>
  error?: string
}> {
  try {
    const { data: invitations, error } = await supabaseAdmin
      .from('team_invitations')
      .select('id, email, role, status, created_at, expires_at, invited_by')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch invitations:', error)
      return {
        success: false,
        error: 'Failed to fetch invitations',
      }
    }

    if (!invitations || invitations.length === 0) {
      return {
        success: true,
        invitations: [],
      }
    }

    // Get inviter names
    const inviterIds = invitations.map((inv) => inv.invited_by)
    const { data: inviters } = await supabaseAdmin
      .from('user_profiles')
      .select('id, full_name, email')
      .in('id', inviterIds)

    const formattedInvitations = invitations.map((inv) => {
      const inviter = inviters?.find((i) => i.id === inv.invited_by)
      return {
        id: inv.id,
        email: inv.email,
        role: inv.role,
        status: inv.status,
        created_at: inv.created_at,
        expires_at: inv.expires_at,
        invited_by_name: inviter?.full_name || inviter?.email || null,
      }
    })

    return {
      success: true,
      invitations: formattedInvitations,
    }
  } catch (error) {
    console.error('Unexpected error fetching invitations:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Revoke Team Invitation
 *
 * Cancel a pending invitation
 */
export async function revokeTeamInvitation(invitationId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { error } = await supabaseAdmin
      .from('team_invitations')
      .update({ status: 'revoked' })
      .eq('id', invitationId)

    if (error) {
      console.error('Failed to revoke invitation:', error)
      return {
        success: false,
        error: 'Failed to revoke invitation',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error revoking invitation:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Get Invitation by Token
 *
 * Fetch invitation details for acceptance
 */
export async function getInvitationByToken(token: string): Promise<{
  success: boolean
  invitation?: {
    id: string
    team_id: string
    team_name: string
    email: string
    role: string
    status: string
    expires_at: string
    invited_by_name: string | null
  }
  error?: string
}> {
  try {
    const { data: invitation, error } = await supabaseAdmin
      .from('team_invitations')
      .select('id, team_id, email, role, status, expires_at, invited_by')
      .eq('token', token)
      .maybeSingle()

    if (error) {
      console.error('Failed to fetch invitation:', error)
      return {
        success: false,
        error: 'Failed to fetch invitation',
      }
    }

    if (!invitation) {
      return {
        success: false,
        error: 'Invitation not found',
      }
    }

    // Check if expired
    if (new Date(invitation.expires_at) < new Date()) {
      return {
        success: false,
        error: 'This invitation has expired',
      }
    }

    // Check if already accepted or revoked
    if (invitation.status !== 'pending') {
      return {
        success: false,
        error: `This invitation has been ${invitation.status}`,
      }
    }

    // Get team name and inviter name
    const { data: team } = await supabaseAdmin
      .from('teams')
      .select('name')
      .eq('id', invitation.team_id)
      .single()

    const { data: inviter } = await supabaseAdmin
      .from('user_profiles')
      .select('full_name, email')
      .eq('id', invitation.invited_by)
      .maybeSingle()

    return {
      success: true,
      invitation: {
        id: invitation.id,
        team_id: invitation.team_id,
        team_name: team?.name || 'Unknown Team',
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
        expires_at: invitation.expires_at,
        invited_by_name: inviter?.full_name || inviter?.email || null,
      },
    }
  } catch (error) {
    console.error('Unexpected error fetching invitation:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Accept Team Invitation
 *
 * Accept invitation and add user to team
 */
export async function acceptTeamInvitation(
  token: string,
  userId: string
): Promise<{
  success: boolean
  teamId?: string
  error?: string
}> {
  try {
    // 1. Get and validate invitation
    const inviteResult = await getInvitationByToken(token)
    if (!inviteResult.success || !inviteResult.invitation) {
      return {
        success: false,
        error: inviteResult.error || 'Invalid invitation',
      }
    }

    const invitation = inviteResult.invitation

    // 2. Get user email
    const { data: userProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('email')
      .eq('id', userId)
      .single()

    if (!userProfile) {
      return {
        success: false,
        error: 'User profile not found',
      }
    }

    // 3. Verify email matches (case-insensitive)
    if (userProfile.email.toLowerCase() !== invitation.email.toLowerCase()) {
      return {
        success: false,
        error: 'This invitation was sent to a different email address',
      }
    }

    // 4. Check if already a member
    const { data: existingMember } = await supabaseAdmin
      .from('team_members')
      .select('id')
      .eq('team_id', invitation.team_id)
      .eq('user_id', userId)
      .maybeSingle()

    if (existingMember) {
      // Mark as accepted anyway
      await supabaseAdmin
        .from('team_invitations')
        .update({ status: 'accepted', accepted_at: new Date().toISOString() })
        .eq('id', invitation.id)

      return {
        success: true,
        teamId: invitation.team_id,
      }
    }

    // 5. Add user to team
    const { error: memberError } = await supabaseAdmin
      .from('team_members')
      .insert({
        team_id: invitation.team_id,
        user_id: userId,
        role: invitation.role as any,
      })

    if (memberError) {
      console.error('Failed to add team member:', memberError)
      return {
        success: false,
        error: 'Failed to add you to the team',
      }
    }

    // 6. Mark invitation as accepted
    await supabaseAdmin
      .from('team_invitations')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', invitation.id)

    return {
      success: true,
      teamId: invitation.team_id,
    }
  } catch (error) {
    console.error('Unexpected error accepting invitation:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
