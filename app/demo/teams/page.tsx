'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getUserTeams, getTeamStats } from '@/app/actions/teams'
import { useTeam } from '@/lib/contexts/team-context'

interface TeamWithStats {
  id: string
  name: string
  age_group_display: string
  level: string
  season: string
  region: string
  role: string
  playerCount?: number
  gameCount?: number
}

export default function TeamsPage() {
  const router = useRouter()
  const { selectTeam } = useTeam()
  const [teams, setTeams] = useState<TeamWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.log('Auth error, clearing session:', userError)
          await supabase.auth.signOut()
          setError('Please sign in to view teams')
          setIsLoading(false)
          return
        }

        const result = await getUserTeams(user.id)

        if (result.success && result.teams) {
          // Load stats for each team
          const teamsWithStats = await Promise.all(
            result.teams.map(async (team) => {
              const stats = await getTeamStats(team.id)
              return {
                ...team,
                playerCount: stats.playerCount,
                gameCount: stats.gameCount,
              }
            })
          )
          setTeams(teamsWithStats)
        } else {
          // Empty teams list is OK, don't show error
          if (result.teams && result.teams.length === 0) {
            setTeams([])
          } else {
            setError(result.error || 'Failed to load teams')
          }
        }
      } catch (err) {
        console.error('Error loading teams:', err)
        setError('An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Teams</h1>
            <p className="mt-2 text-gray-600">
              Manage your hockey teams and rosters
            </p>
          </div>
          <button
            onClick={() => router.push('/demo/teams/new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            + Create Team
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Teams Grid */}
        {teams.length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center text-white">
              <svg
                className="mx-auto h-16 w-16 mb-4 opacity-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Welcome to Team Management!</h3>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Teams are the foundation of your coaching experience. Create a team to start tracking games, managing rosters, and generating AI-powered practice plans.
              </p>
            </div>

            {/* Onboarding Steps */}
            <div className="p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Getting Started is Easy
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Create Your Team</h5>
                  <p className="text-sm text-gray-600">
                    Set up your team with name, age group, level, and region
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Add Your Roster</h5>
                  <p className="text-sm text-gray-600">
                    Add players with positions and jersey numbers
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Start Tracking</h5>
                  <p className="text-sm text-gray-600">
                    Track games and get AI-powered practice plans
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h5 className="font-semibold text-gray-900 mb-4">What you can do with teams:</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Track live games</strong> with detailed event logging</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Manage player rosters</strong> with positions and numbers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Generate AI practice plans</strong> based on game performance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>View analytics</strong> and track team progress over time</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={() => router.push('/demo/teams/new')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Team
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer"
                onClick={() => router.push(`/demo/teams/${team.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{team.season}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {team.age_group_display}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Level:</span>
                    <span className="font-medium text-gray-900 uppercase">
                      {team.level}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Region:</span>
                    <span className="font-medium text-gray-900 uppercase">
                      {team.region}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Role:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      {team.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="mt-4 flex gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">{team.playerCount || 0}</span>
                    <span className="ml-1">players</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">{team.gameCount || 0}</span>
                    <span className="ml-1">games</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/demo/teams/${team.id}/roster`)
                    }}
                    className="flex-1 text-center text-blue-600 hover:bg-blue-50 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    👥 Roster
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      selectTeam(team.id)
                      router.push('/demo/game-tracking')
                    }}
                    className="flex-1 text-center text-green-600 hover:bg-green-50 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    🏒 Track Game
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/demo/teams/${team.id}/settings`)
                    }}
                    className="text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    title="Team Settings"
                  >
                    ⚙️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
