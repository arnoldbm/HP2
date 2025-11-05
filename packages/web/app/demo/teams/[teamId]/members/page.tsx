'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import {
  getTeamById,
  getTeamMembers,
  addTeamMember,
  removeTeamMember,
  updateTeamMemberRole
} from '@/app/actions/teams'
import {
  createTeamInvitation,
  getTeamInvitations,
  revokeTeamInvitation
} from '@/app/actions/invitations'

interface TeamMember {
  id: string
  user_id: string
  role: string
  created_at: string
  email: string
  full_name: string | null
}

interface TeamData {
  id: string
  name: string
  age_group_display: string
  role: string
}

interface TeamInvitation {
  id: string
  email: string
  role: string
  status: string
  created_at: string
  expires_at: string
  invited_by_name: string | null
}

export default function TeamMembersPage() {
  const router = useRouter()
  const params = useParams()
  const teamId = params.teamId as string

  const [team, setTeam] = useState<TeamData | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker'>('assistant_coach')
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    loadTeamAndMembers()
  }, [teamId])

  async function loadTeamAndMembers() {
    try {
      setIsLoading(true)
      setError(null)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push('/demo/teams')
        return
      }

      setCurrentUserId(user.id)

      // Get team data
      const teamResult = await getTeamById(teamId, user.id)

      if (!teamResult.success || !teamResult.team) {
        setError(teamResult.error || 'Failed to load team')
        setIsLoading(false)
        return
      }

      setTeam(teamResult.team)

      // Get team members
      const membersResult = await getTeamMembers(teamId)

      if (membersResult.success && membersResult.members) {
        setMembers(membersResult.members)
      } else {
        setError(membersResult.error || 'Failed to load members')
      }

      // Get pending invitations
      const invitationsResult = await getTeamInvitations(teamId)

      if (invitationsResult.success && invitationsResult.invitations) {
        setInvitations(invitationsResult.invitations.filter(inv => inv.status === 'pending'))
      }
    } catch (err) {
      console.error('Error loading team and members:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function validateEmail(email: string): boolean {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  async function handleSendInvite() {
    if (!currentUserId) return

    // Validate email before submitting
    if (!validateEmail(inviteEmail)) {
      setError('Please enter a valid email address (e.g., user@example.com)')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await createTeamInvitation(
        teamId,
        inviteEmail,
        inviteRole,
        currentUserId,
        true // Send email
      )

      if (result.success) {
        setSuccessMessage(`Invitation sent to ${inviteEmail}`)
        setInviteEmail('')
        setInviteRole('assistant_coach')
        setShowInviteForm(false)
        await loadTeamAndMembers()
      } else {
        setError(result.error || 'Failed to send invitation')
      }
    } catch (err) {
      console.error('Error sending invitation:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCopyLink() {
    if (!currentUserId) return

    // Validate email before submitting
    if (!validateEmail(inviteEmail)) {
      setError('Please enter a valid email address (e.g., user@example.com)')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await createTeamInvitation(
        teamId,
        inviteEmail,
        inviteRole,
        currentUserId,
        false // Don't send email
      )

      if (result.success && result.invitation) {
        await navigator.clipboard.writeText(result.invitation.inviteLink)
        setCopiedLink(true)
        setSuccessMessage(`Invitation link copied to clipboard for ${inviteEmail}`)
        setTimeout(() => setCopiedLink(false), 2000)
        setInviteEmail('')
        setInviteRole('assistant_coach')
        await loadTeamAndMembers()
      } else {
        setError(result.error || 'Failed to create invitation')
      }
    } catch (err) {
      console.error('Error creating invitation:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRemoveMember(userId: string, userName: string) {
    if (!confirm(`Remove ${userName} from the team?`)) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await removeTeamMember(teamId, userId)

      if (result.success) {
        await loadTeamAndMembers()
      } else {
        setError(result.error || 'Failed to remove member')
      }
    } catch (err) {
      console.error('Error removing member:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRoleChange(userId: string, newRole: string) {
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await updateTeamMemberRole(
        teamId,
        userId,
        newRole as 'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker'
      )

      if (result.success) {
        await loadTeamAndMembers()
      } else {
        setError(result.error || 'Failed to update role')
      }
    } catch (err) {
      console.error('Error updating role:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRevokeInvitation(invitationId: string, email: string) {
    if (!confirm(`Revoke invitation for ${email}?`)) {
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await revokeTeamInvitation(invitationId)

      if (result.success) {
        setSuccessMessage('Invitation revoked')
        await loadTeamAndMembers()
      } else {
        setError(result.error || 'Failed to revoke invitation')
      }
    } catch (err) {
      console.error('Error revoking invitation:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canManageMembers = team?.role === 'head_coach'

  function getRoleBadgeColor(role: string) {
    switch (role) {
      case 'head_coach':
        return 'bg-purple-100 text-purple-800'
      case 'assistant_coach':
        return 'bg-blue-100 text-blue-800'
      case 'manager':
        return 'bg-green-100 text-green-800'
      case 'stat_tracker':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function formatRole(role: string) {
    return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    )
  }

  if (error && !team) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-red-900 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => router.push('/demo/teams')}
              className="mt-4 text-red-600 hover:text-red-800 font-medium"
            >
              ← Back to Teams
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(`/demo/teams/${teamId}`)}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-flex items-center"
          >
            ← Back to Team
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
              <p className="text-gray-600 mt-2">{team?.name}</p>
            </div>
            {canManageMembers && (
              <button
                onClick={() => {
                  setShowInviteForm(!showInviteForm)
                  setError(null)
                  setSuccessMessage(null)
                }}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {showInviteForm ? 'Cancel' : '+ Invite Member'}
              </button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Invite Member Form */}
        {showInviteForm && canManageMembers && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Invite Team Member</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  They will receive an invitation to join the team
                </p>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assistant_coach">Assistant Coach</option>
                  <option value="head_coach">Head Coach</option>
                  <option value="manager">Manager</option>
                  <option value="stat_tracker">Stat Tracker</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSendInvite}
                  disabled={isSubmitting || !inviteEmail}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : '📧 Send Email Invitation'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  disabled={isSubmitting || !inviteEmail}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {copiedLink ? '✓ Link Copied!' : '🔗 Copy Invite Link'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowInviteForm(false)
                  setInviteEmail('')
                  setInviteRole('assistant_coach')
                  setError(null)
                  setSuccessMessage(null)
                }}
                disabled={isSubmitting}
                className="w-full px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Pending Invitations */}
        {canManageMembers && invitations.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-amber-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Pending Invitations ({invitations.length})
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {invitations.map((invitation) => (
                <li key={invitation.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-semibold">
                            {invitation.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invitation.email}</p>
                          <p className="text-sm text-gray-600">
                            Invited {new Date(invitation.created_at).toLocaleDateString()} •
                            Expires {new Date(invitation.expires_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(invitation.role)}`}>
                        {formatRole(invitation.role)}
                      </span>
                      <button
                        onClick={() => handleRevokeInvitation(invitation.id, invitation.email)}
                        disabled={isSubmitting}
                        className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Members List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Members ({members.length})
            </h2>
          </div>

          {members.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>No team members yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {members.map((member) => (
                <li key={member.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {(member.full_name || member.email)[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.full_name || member.email.split('@')[0]}
                            {member.user_id === currentUserId && (
                              <span className="ml-2 text-sm text-gray-500">(You)</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {canManageMembers ? (
                        <>
                          <select
                            value={member.role}
                            onChange={(e) => handleRoleChange(member.user_id, e.target.value)}
                            disabled={isSubmitting || member.user_id === currentUserId}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(member.role)} disabled:opacity-60 disabled:cursor-not-allowed`}
                          >
                            <option value="head_coach">Head Coach</option>
                            <option value="assistant_coach">Assistant Coach</option>
                            <option value="manager">Manager</option>
                            <option value="stat_tracker">Stat Tracker</option>
                          </select>
                          {member.user_id !== currentUserId && (
                            <button
                              onClick={() => handleRemoveMember(member.user_id, member.full_name || member.email)}
                              disabled={isSubmitting}
                              className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              Remove
                            </button>
                          )}
                        </>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(member.role)}`}>
                          {formatRole(member.role)}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
