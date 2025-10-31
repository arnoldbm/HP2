'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { TeamForm } from '@/components/teams/team-form'
import { createTeam } from '@/app/actions/teams'
import { setupUserOrganization } from '@/app/actions/organizations'
import type { TeamCreateInput } from '@/lib/validation/team-schemas'

export default function NewTeamPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [orgId, setOrgId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Initialize: Get or create user's organization
  useEffect(() => {
    const initializeOrg = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.log('Auth error, clearing session:', userError)
          await supabase.auth.signOut()
          setError('Please sign in to create a team')
          setIsLoading(false)
          return
        }

        setUserId(user.id)

        // Get user profile for full name
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('user_id', user.id)
          .single()

        const fullName = profile?.full_name || user.email?.split('@')[0] || 'Coach'

        // Setup user organization (idempotent)
        const result = await setupUserOrganization({
          userId: user.id,
          fullName: fullName,
        })

        if (result.success && result.organization) {
          setOrgId(result.organization.id)
        } else {
          setError('Failed to initialize organization')
        }
      } catch (err) {
        console.error('Error initializing:', err)
        setError('Failed to initialize')
      } finally {
        setIsLoading(false)
      }
    }

    initializeOrg()
  }, [])

  const handleSuccess = async (data: TeamCreateInput) => {
    setError(null)

    try {
      if (!userId) {
        setError('User not authenticated')
        return
      }

      const result = await createTeam(data, userId)

      if (result.success && result.team) {
        // Success! Redirect to team page (or roster page when we have it)
        router.push(`/demo/teams`)
      } else {
        setError(result.error || 'Failed to create team')
      }
    } catch (err) {
      console.error('Error creating team:', err)
      setError('An unexpected error occurred')
    }
  }

  const handleCancel = () => {
    router.push('/demo/teams')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!orgId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error || 'Failed to load organization'}</p>
          <button
            onClick={() => router.push('/demo/teams')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Team</h1>
          <p className="mt-2 text-gray-600">
            Set up your hockey team with age group, skill level, and season information.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error creating team</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <TeamForm
            organizationId={orgId}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Need help?</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>
              <strong>Age Group</strong>: Select based on your region (USA: 8U, 10U, 12U |
              Canada: U9, U11, U13)
            </li>
            <li>
              <strong>Skill Level</strong>: House (recreational), Travel, or competitive tiers
              (A, AA, AAA)
            </li>
            <li>
              <strong>Season</strong>: Format YYYY-YY (e.g., 2024-25 for 2024-2025 season)
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
