'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getInvitationByToken, acceptTeamInvitation } from '@/app/actions/invitations'

interface InvitationData {
  id: string
  team_id: string
  team_name: string
  email: string
  role: string
  status: string
  expires_at: string
  invited_by_name: string | null
}

export default function InviteAcceptPage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadInvitation()
  }, [token])

  async function loadInvitation() {
    try {
      setIsLoading(true)
      setError(null)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError) {
        console.error('Error getting user:', userError)
      }

      setCurrentUser(user)

      // Get invitation details
      const result = await getInvitationByToken(token)

      if (!result.success || !result.invitation) {
        setError(result.error || 'Invitation not found')
        setIsLoading(false)
        return
      }

      setInvitation(result.invitation)
    } catch (err) {
      console.error('Error loading invitation:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAccept() {
    if (!currentUser) {
      // Redirect to sign in with return URL
      router.push(`/auth/signin?returnUrl=/invite/${token}`)
      return
    }

    if (!invitation) return

    setIsAccepting(true)
    setError(null)

    try {
      const result = await acceptTeamInvitation(token, currentUser.id)

      if (result.success && result.teamId) {
        // Success! Redirect to team page
        router.push(`/demo/teams/${result.teamId}`)
      } else {
        setError(result.error || 'Failed to accept invitation')
      }
    } catch (err) {
      console.error('Error accepting invitation:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsAccepting(false)
    }
  }

  function formatRole(role: string) {
    return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h1>
              <p className="text-gray-600">{error || 'This invitation link is not valid'}</p>
            </div>
            <button
              onClick={() => router.push('/demo/teams')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Teams
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏒</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Team Invitation</h1>
            <p className="text-blue-100">You've been invited to join a team</p>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Team</label>
                <p className="text-lg font-semibold text-gray-900">{invitation.team_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Your Role</label>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {formatRole(invitation.role)}
                </div>
              </div>

              {invitation.invited_by_name && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Invited By</label>
                  <p className="text-gray-900">{invitation.invited_by_name}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Invitation Email</label>
                <p className="text-gray-900">{invitation.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Expires</label>
                <p className="text-gray-900">{new Date(invitation.expires_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            {!currentUser ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Please sign in or create an account to accept this invitation
                </p>
                <button
                  onClick={() => router.push(`/auth/signin?returnUrl=/invite/${token}`)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push(`/auth/signup?returnUrl=/invite/${token}`)}
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-md font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleAccept}
                  disabled={isAccepting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isAccepting ? 'Accepting...' : 'Accept Invitation'}
                </button>
                <button
                  onClick={() => router.push('/demo/teams')}
                  disabled={isAccepting}
                  className="w-full bg-white text-gray-600 px-6 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            HP2 Hockey Practice Planner
          </p>
        </div>
      </div>
    </div>
  )
}
