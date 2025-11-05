import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import {
  createTeamInvitation,
  getTeamInvitations,
  getMyInvitations,
  revokeTeamInvitation,
  getInvitationByToken,
  acceptTeamInvitation,
} from '@/app/actions/invitations'

// Admin client for test setup
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

describe('Team Invitations - Integration Tests', () => {
  let testUserId: string
  let testUserEmail: string
  let testTeamId: string
  let testOrganizationId: string

  beforeAll(async () => {
    // Create test user
    testUserEmail = `test-invite-${Date.now()}@example.com`
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: testUserEmail,
      password: 'test-password-123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test Inviter',
      },
    })

    if (authError) throw authError
    testUserId = authData.user.id

    // Wait for trigger to create profile, then update it with email_verified = true
    await new Promise((resolve) => setTimeout(resolve, 500)) // Wait for trigger

    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .update({
        full_name: 'Test Inviter',
        email_verified: true, // Must be verified to send invitations
      })
      .eq('id', testUserId)

    if (profileError) throw profileError

    // Create test organization
    const { data: orgData, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        name: 'Test Organization',
        slug: `test-org-${Date.now()}`,
      })
      .select()
      .single()

    if (orgError) throw orgError
    testOrganizationId = orgData.id

    // Create test team
    const { data: teamData, error: teamError} = await supabaseAdmin
      .from('teams')
      .insert({
        organization_id: testOrganizationId,
        name: 'Test Team',
        age_years: 10,
        level: 'a',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (teamError) throw teamError
    testTeamId = teamData.id

    // Add user as head coach
    await supabaseAdmin.from('team_members').insert({
      team_id: testTeamId,
      user_id: testUserId,
      role: 'head_coach',
    })
  })

  afterAll(async () => {
    // Clean up (cascade delete will handle related records)
    if (testUserId) {
      await supabaseAdmin.auth.admin.deleteUser(testUserId)
    }
  })

  describe('createTeamInvitation', () => {
    it('should create invitation with valid email', async () => {
      const inviteEmail = `invitee-${Date.now()}@example.com`

      const result = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false // Don't send email in tests
      )

      expect(result.success).toBe(true)
      expect(result.invitation).toBeDefined()
      expect(result.invitation!.token).toBeDefined()
      expect(result.invitation!.inviteLink).toContain('/invite/')
    })

    it('should reject invalid email format', async () => {
      const result = await createTeamInvitation(
        testTeamId,
        'not-an-email',
        'stat_tracker',
        testUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid email address format')
    })

    it('should reject invitation from unverified user', async () => {
      // Create unverified user
      const unverifiedEmail = `unverified-${Date.now()}@example.com`
      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: unverifiedEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const unverifiedUserId = authData.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({
          full_name: 'Unverified User',
          email_verified: false,
        })
        .eq('id', unverifiedUserId)

      const result = await createTeamInvitation(
        testTeamId,
        'someone@example.com',
        'stat_tracker',
        unverifiedUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('verify your email address')
      expect(result.requiresVerification).toBe(true)

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(unverifiedUserId)
    })

    it('should prevent duplicate pending invitations', async () => {
      const inviteEmail = `duplicate-${Date.now()}@example.com`

      // Create first invitation
      const result1 = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      expect(result1.success).toBe(true)

      // Try to create duplicate
      const result2 = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      expect(result2.success).toBe(false)
      expect(result2.error).toContain('invitation is already pending')
    })

    it('should prevent inviting existing team members', async () => {
      // Create a user and add them to the team
      const memberEmail = `member-${Date.now()}@example.com`
      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: memberEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const memberId = authData.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({ full_name: 'Existing Member' })
        .eq('id', memberId)

      await supabaseAdmin.from('team_members').insert({
        team_id: testTeamId,
        user_id: memberId,
        role: 'assistant_coach',
      })

      // Try to invite existing member
      const result = await createTeamInvitation(
        testTeamId,
        memberEmail,
        'stat_tracker',
        testUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('already a member')

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(memberId)
    })

    it('should create invitation with all valid roles', async () => {
      const roles: Array<'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker'> = [
        'head_coach',
        'assistant_coach',
        'manager',
        'stat_tracker',
      ]

      for (const role of roles) {
        const inviteEmail = `role-${role}-${Date.now()}@example.com`

        const result = await createTeamInvitation(testTeamId, inviteEmail, role, testUserId, false)

        expect(result.success).toBe(true)
        expect(result.invitation).toBeDefined()
      }
    })

    it('should generate unique tokens for each invitation', async () => {
      const email1 = `unique1-${Date.now()}@example.com`
      const email2 = `unique2-${Date.now()}@example.com`

      const result1 = await createTeamInvitation(testTeamId, email1, 'stat_tracker', testUserId, false)
      const result2 = await createTeamInvitation(testTeamId, email2, 'stat_tracker', testUserId, false)

      expect(result1.success).toBe(true)
      expect(result2.success).toBe(true)
      expect(result1.invitation!.token).not.toBe(result2.invitation!.token)
    })
  })

  describe('getTeamInvitations', () => {
    it('should retrieve all invitations for a team', async () => {
      // Create multiple invitations
      const email1 = `team-list-1-${Date.now()}@example.com`
      const email2 = `team-list-2-${Date.now()}@example.com`

      await createTeamInvitation(testTeamId, email1, 'stat_tracker', testUserId, false)
      await createTeamInvitation(testTeamId, email2, 'assistant_coach', testUserId, false)

      const result = await getTeamInvitations(testTeamId)

      expect(result.success).toBe(true)
      expect(result.invitations).toBeDefined()
      expect(result.invitations!.length).toBeGreaterThanOrEqual(2)

      const emails = result.invitations!.map((inv) => inv.email)
      expect(emails).toContain(email1)
      expect(emails).toContain(email2)
    })

    it('should include invitation details (email, role, status, dates)', async () => {
      const result = await getTeamInvitations(testTeamId)

      expect(result.success).toBe(true)
      const invitation = result.invitations![0]

      expect(invitation).toHaveProperty('id')
      expect(invitation).toHaveProperty('email')
      expect(invitation).toHaveProperty('role')
      expect(invitation).toHaveProperty('status')
      expect(invitation).toHaveProperty('created_at')
      expect(invitation).toHaveProperty('expires_at')
      expect(invitation).toHaveProperty('invited_by_name')
    })

    it('should return empty array for team with no invitations', async () => {
      // Create a new team with no invitations
      const { data: teamData } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: testOrganizationId,
          name: 'Empty Team',
          age_years: 10,
          level: 'a',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      const result = await getTeamInvitations(teamData.id)

      expect(result.success).toBe(true)
      expect(result.invitations).toEqual([])
    })
  })

  describe('getMyInvitations', () => {
    it('should retrieve pending invitations for user email', async () => {
      const inviteeEmail = `my-invites-${Date.now()}@example.com`

      // Create invitation
      await createTeamInvitation(testTeamId, inviteeEmail, 'stat_tracker', testUserId, false)

      const result = await getMyInvitations(inviteeEmail)

      expect(result.success).toBe(true)
      expect(result.invitations).toBeDefined()
      expect(result.invitations!.length).toBeGreaterThanOrEqual(1)

      const invitation = result.invitations!.find((inv) => inv.email === inviteeEmail)
      expect(invitation).toBeDefined()
      expect(invitation!.team_name).toBe('Test Team')
      expect(invitation!.status).toBe('pending')
    })

    it('should only return pending invitations (not accepted/revoked)', async () => {
      const inviteeEmail = `status-filter-${Date.now()}@example.com`

      // Create invitation and revoke it
      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteeEmail,
        'stat_tracker',
        testUserId,
        false
      )

      await revokeTeamInvitation(invitation!.id)

      // Should not appear in pending invitations
      const result = await getMyInvitations(inviteeEmail)

      expect(result.success).toBe(true)
      const revokedInvite = result.invitations!.find((inv) => inv.email === inviteeEmail)
      expect(revokedInvite).toBeUndefined()
    })

    it('should return empty array if no pending invitations', async () => {
      const noInvitesEmail = `no-invites-${Date.now()}@example.com`

      const result = await getMyInvitations(noInvitesEmail)

      expect(result.success).toBe(true)
      expect(result.invitations).toEqual([])
    })
  })

  describe('revokeTeamInvitation', () => {
    it('should revoke a pending invitation', async () => {
      const inviteEmail = `revoke-test-${Date.now()}@example.com`

      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      const result = await revokeTeamInvitation(invitation!.id)

      expect(result.success).toBe(true)

      // Verify status changed in database
      const { data: dbInvitation } = await supabaseAdmin
        .from('team_invitations')
        .select('status')
        .eq('id', invitation!.id)
        .single()

      expect(dbInvitation!.status).toBe('revoked')
    })

    it('should allow revoking already revoked invitation (idempotent)', async () => {
      const inviteEmail = `revoke-twice-${Date.now()}@example.com`

      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      await revokeTeamInvitation(invitation!.id)
      const result2 = await revokeTeamInvitation(invitation!.id)

      expect(result2.success).toBe(true)
    })
  })

  describe('getInvitationByToken', () => {
    it('should retrieve valid invitation by token', async () => {
      const inviteEmail = `token-lookup-${Date.now()}@example.com`

      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      const result = await getInvitationByToken(invitation!.token)

      expect(result.success).toBe(true)
      expect(result.invitation).toBeDefined()
      expect(result.invitation!.email).toBe(inviteEmail)
      expect(result.invitation!.team_name).toBe('Test Team')
      expect(result.invitation!.role).toBe('stat_tracker')
      expect(result.invitation!.status).toBe('pending')
    })

    it('should reject invalid token', async () => {
      const result = await getInvitationByToken('invalid-token-12345')

      expect(result.success).toBe(false)
      expect(result.error).toContain('not found')
    })

    it('should reject revoked invitation', async () => {
      const inviteEmail = `revoked-token-${Date.now()}@example.com`

      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      await revokeTeamInvitation(invitation!.id)

      const result = await getInvitationByToken(invitation!.token)

      expect(result.success).toBe(false)
      expect(result.error).toContain('revoked')
    })

    it('should reject expired invitation', async () => {
      const inviteEmail = `expired-token-${Date.now()}@example.com`

      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteEmail,
        'stat_tracker',
        testUserId,
        false
      )

      // Manually set expiration to past
      await supabaseAdmin
        .from('team_invitations')
        .update({ expires_at: new Date(Date.now() - 86400000).toISOString() })
        .eq('id', invitation!.id)

      const result = await getInvitationByToken(invitation!.token)

      expect(result.success).toBe(false)
      expect(result.error).toContain('expired')
    })
  })

  describe('acceptTeamInvitation', () => {
    it('should accept valid invitation and add user to team', async () => {
      // Create invitee user
      const inviteeEmail = `accept-invite-${Date.now()}@example.com`
      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: inviteeEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const inviteeUserId = authData!.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({ full_name: 'Invitee User' })
        .eq('id', inviteeUserId)

      // Create invitation
      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteeEmail,
        'stat_tracker',
        testUserId,
        false
      )

      // Accept invitation
      const result = await acceptTeamInvitation(invitation!.token, inviteeUserId)

      expect(result.success).toBe(true)
      expect(result.teamId).toBe(testTeamId)

      // Verify user is now a team member
      const { data: member } = await supabaseAdmin
        .from('team_members')
        .select('*')
        .eq('team_id', testTeamId)
        .eq('user_id', inviteeUserId)
        .single()

      expect(member).toBeDefined()
      expect(member!.role).toBe('stat_tracker')

      // Verify invitation status updated
      const { data: dbInvitation } = await supabaseAdmin
        .from('team_invitations')
        .select('status')
        .eq('id', invitation!.id)
        .single()

      expect(dbInvitation!.status).toBe('accepted')

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(inviteeUserId)
    })

    it('should reject invitation with wrong email', async () => {
      // Create invitee user with different email
      const inviteeEmail = `accept-wrong-${Date.now()}@example.com`
      const wrongEmail = `wrong-${Date.now()}@example.com`

      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: wrongEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const wrongUserId = authData!.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({ full_name: 'Wrong User' })
        .eq('id', wrongUserId)

      // Create invitation for different email
      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteeEmail,
        'stat_tracker',
        testUserId,
        false
      )

      // Try to accept with wrong user
      const result = await acceptTeamInvitation(invitation!.token, wrongUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('different email')

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(wrongUserId)
    })

    it('should prevent accepting already-accepted invitation', async () => {
      // Create invitee user
      const inviteeEmail = `accept-twice-${Date.now()}@example.com`
      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: inviteeEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const inviteeUserId = authData!.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({ full_name: 'Invitee User' })
        .eq('id', inviteeUserId)

      // Create invitation
      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteeEmail,
        'stat_tracker',
        testUserId,
        false
      )

      // Accept first time
      const result1 = await acceptTeamInvitation(invitation!.token, inviteeUserId)
      expect(result1.success).toBe(true)

      // Try to accept second time (should fail because already accepted)
      const result2 = await acceptTeamInvitation(invitation!.token, inviteeUserId)
      expect(result2.success).toBe(false)
      expect(result2.error).toContain('accepted')

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(inviteeUserId)
    })

    it('should reject accepting expired invitation', async () => {
      // Create invitee user
      const inviteeEmail = `accept-expired-${Date.now()}@example.com`
      const { data: authData } = await supabaseAdmin.auth.admin.createUser({
        email: inviteeEmail,
        password: 'test-password-123',
        email_confirm: true,
      })

      const inviteeUserId = authData!.user.id

      // Wait for trigger to create profile
      await new Promise((resolve) => setTimeout(resolve, 500))

      await supabaseAdmin
        .from('user_profiles')
        .update({ full_name: 'Invitee User' })
        .eq('id', inviteeUserId)

      // Create invitation
      const { invitation } = await createTeamInvitation(
        testTeamId,
        inviteeEmail,
        'stat_tracker',
        testUserId,
        false
      )

      // Manually expire invitation
      await supabaseAdmin
        .from('team_invitations')
        .update({ expires_at: new Date(Date.now() - 86400000).toISOString() })
        .eq('id', invitation!.id)

      // Try to accept
      const result = await acceptTeamInvitation(invitation!.token, inviteeUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('expired')

      // Clean up
      await supabaseAdmin.auth.admin.deleteUser(inviteeUserId)
    })
  })

  describe('Email Validation', () => {
    it('should reject emails without @ symbol', async () => {
      const result = await createTeamInvitation(
        testTeamId,
        'notanemail',
        'stat_tracker',
        testUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid email address format')
    })

    it('should reject emails without domain', async () => {
      const result = await createTeamInvitation(
        testTeamId,
        'user@',
        'stat_tracker',
        testUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid email address format')
    })

    it('should reject emails without user part', async () => {
      const result = await createTeamInvitation(
        testTeamId,
        '@example.com',
        'stat_tracker',
        testUserId,
        false
      )

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid email address format')
    })

    it('should accept valid email formats', async () => {
      const validEmails = [
        `simple${Date.now()}@example.com`,
        `with.dot${Date.now()}@example.com`,
        `with+plus${Date.now()}@example.com`,
        `with-dash${Date.now()}@example.com`,
      ]

      for (const email of validEmails) {
        const result = await createTeamInvitation(testTeamId, email, 'stat_tracker', testUserId, false)

        expect(result.success).toBe(true)
      }
    })
  })
})
