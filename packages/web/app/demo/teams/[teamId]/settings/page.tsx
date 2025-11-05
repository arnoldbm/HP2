'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getTeamById, updateTeam, deleteTeam } from '@/app/actions/teams'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { teamUpdateSchema, type TeamUpdateInput } from '@/lib/validation/team-schemas'

interface TeamData {
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

export default function TeamSettingsPage() {
  const router = useRouter()
  const params = useParams()
  const teamId = params.teamId as string

  const [team, setTeam] = useState<TeamData | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<TeamUpdateInput>({
    resolver: zodResolver(teamUpdateSchema),
  })

  useEffect(() => {
    async function loadTeam() {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          router.push('/demo/teams')
          return
        }

        setUserId(user.id)

        // Get team data
        const result = await getTeamById(teamId, user.id)

        if (result.success && result.team) {
          // Check if user is head coach
          if (result.team.role !== 'head_coach') {
            setError('Only head coaches can access team settings')
            setIsLoading(false)
            return
          }

          setTeam(result.team)
          // Set form defaults
          reset({
            name: result.team.name,
            level: result.team.level,
            season: result.team.season,
          })
        } else {
          setError(result.error || 'Failed to load team')
        }
      } catch (err) {
        console.error('Error loading team:', err)
        setError('An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadTeam()
  }, [teamId, router, reset])

  const onSubmit = async (data: TeamUpdateInput) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateTeam(teamId, data)

      if (result.success) {
        // Reload team data
        const updatedTeam = await getTeamById(teamId, userId!)
        if (updatedTeam.success && updatedTeam.team) {
          setTeam(updatedTeam.team)
          reset({
            name: updatedTeam.team.name,
            level: updatedTeam.team.level,
            season: updatedTeam.team.season,
          })
        }
      } else {
        setError(result.error || 'Failed to update team')
      }
    } catch (err) {
      console.error('Error updating team:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await deleteTeam(teamId)

      if (result.success) {
        router.push('/demo/teams')
      } else {
        setError(result.error || 'Failed to delete team')
        setShowDeleteConfirm(false)
      }
    } catch (err) {
      console.error('Error deleting team:', err)
      setError('An unexpected error occurred')
      setShowDeleteConfirm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team settings...</p>
        </div>
      </div>
    )
  }

  if (error && !team) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(`/demo/teams/${teamId}`)}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-flex items-center"
          >
            ← Back to Team
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Team Settings</h1>
          <p className="text-gray-600 mt-2">{team?.name}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Team Details Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Details</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Team Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Thunder 2024"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                id="level"
                {...register('level')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="a">A</option>
                <option value="aa">AA</option>
                <option value="aaa">AAA</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="rec">Rec</option>
              </select>
              {errors.level && (
                <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
              )}
            </div>

            {/* Season */}
            <div>
              <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
                Season
              </label>
              <input
                id="season"
                type="text"
                {...register('season')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2024-25"
              />
              {errors.season && (
                <p className="mt-1 text-sm text-red-600">{errors.season.message}</p>
              )}
            </div>

            {/* Read-only fields */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Age Group:</span> {team?.age_group_display}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Region:</span> {team?.region.toUpperCase()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Age group and region cannot be changed after team creation
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                disabled={!isDirty || isSubmitting}
                className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow p-6 border-2 border-red-200">
          <h2 className="text-xl font-semibold text-red-900 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete a team, there is no going back. All players, games, and events will be permanently deleted.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isSubmitting}
              className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Delete Team
            </button>
          ) : (
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-900 font-semibold mb-4">
                Are you absolutely sure? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Deleting...' : 'Yes, Delete Team'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
