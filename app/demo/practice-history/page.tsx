'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/db/supabase'
import Link from 'next/link'

// Types
interface Practice {
  id: string
  team_id: string
  practice_date: string
  duration_minutes: number
  location: string | null
  notes: string | null
  objectives: string | null
  generated_by_ai: boolean
  based_on_game_id: string | null
  ai_reasoning: {
    top_focus_areas?: string[]
    overall_assessment?: string
    practice_goals?: string[]
  } | null
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
  completed_at: string | null
  created_at: string
}

interface PracticeDrill {
  id: string
  section: 'warm_up' | 'skills' | 'drills' | 'small_area_games' | 'scrimmage' | 'cool_down'
  sequence_order: number
  duration_minutes: number
  notes: string | null
  modifications: string | null
  completed: boolean
  drills: {
    id: string
    title: string
    description: string
    category: string
  }
}

interface Game {
  opponent_name: string
  game_date: string
}

export default function PracticeHistoryPage() {
  const [practices, setPractices] = useState<Practice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null)
  const [practiceDrills, setPracticeDrills] = useState<PracticeDrill[]>([])
  const [sourceGame, setSourceGame] = useState<Game | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [aiFilter, setAiFilter] = useState<string>('all')

  useEffect(() => {
    loadPractices()
  }, [])

  async function loadPractices() {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Please sign in to view practice history')
        setLoading(false)
        return
      }

      // Get user's team
      const { data: teamMember, error: teamError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .single()

      if (teamError) {
        console.error('Error fetching team:', teamError)
        setError('Could not find your team')
        setLoading(false)
        return
      }

      // Fetch all practices for this team
      const { data: practicesData, error: practicesError } = await supabase
        .from('practices')
        .select('*')
        .eq('team_id', teamMember.team_id)
        .order('practice_date', { ascending: false })

      if (practicesError) {
        console.error('Error fetching practices:', practicesError)
        setError('Failed to load practices')
        setLoading(false)
        return
      }

      console.log('✅ Loaded', practicesData.length, 'practices')
      setPractices(practicesData as any)
    } catch (err) {
      console.error('❌ Error loading practices:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function loadPracticeDetails(practice: Practice) {
    setSelectedPractice(practice)
    setLoadingDetails(true)
    setPracticeDrills([])
    setSourceGame(null)

    try {
      // Fetch practice drills with drill details
      const { data: drillsData, error: drillsError } = await supabase
        .from('practice_drills')
        .select(
          `
          id,
          section,
          sequence_order,
          duration_minutes,
          notes,
          modifications,
          completed,
          drills (
            id,
            title,
            description,
            category
          )
        `
        )
        .eq('practice_id', practice.id)
        .order('sequence_order')

      if (drillsError) {
        console.error('Error fetching practice drills:', drillsError)
        throw drillsError
      }

      setPracticeDrills(drillsData as any)

      // If practice was based on a game, fetch game details
      if (practice.based_on_game_id) {
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select('opponent_name, game_date')
          .eq('id', practice.based_on_game_id)
          .single()

        if (!gameError && gameData) {
          setSourceGame(gameData)
        }
      }

      console.log('✅ Loaded practice details:', drillsData.length, 'drills')
    } catch (err) {
      console.error('❌ Error loading practice details:', err)
    } finally {
      setLoadingDetails(false)
    }
  }

  // Filter practices
  const filteredPractices = practices.filter((practice) => {
    const statusMatch = statusFilter === 'all' || practice.status === statusFilter
    const aiMatch =
      aiFilter === 'all' ||
      (aiFilter === 'ai' && practice.generated_by_ai) ||
      (aiFilter === 'manual' && !practice.generated_by_ai)
    return statusMatch && aiMatch
  })

  // Group drills by section
  const drillsBySection = practiceDrills.reduce((acc, drill) => {
    if (!acc[drill.section]) {
      acc[drill.section] = []
    }
    acc[drill.section].push(drill)
    return acc
  }, {} as Record<string, PracticeDrill[]>)

  const sectionOrder: Array<
    'warm_up' | 'skills' | 'drills' | 'small_area_games' | 'scrimmage' | 'cool_down'
  > = ['warm_up', 'skills', 'drills', 'small_area_games', 'scrimmage', 'cool_down']

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading practice history...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadPractices}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice History</h1>
              <p className="text-gray-600">
                View all your saved practice plans and drill selections
              </p>
            </div>
            <Link
              href="/demo/analytics"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Analytics
            </Link>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 uppercase font-semibold">Total Practices</div>
              <div className="text-3xl font-bold text-blue-900 mt-1">{practices.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 uppercase font-semibold">AI Generated</div>
              <div className="text-3xl font-bold text-green-900 mt-1">
                {practices.filter((p) => p.generated_by_ai).length}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 uppercase font-semibold">Completed</div>
              <div className="text-3xl font-bold text-purple-900 mt-1">
                {practices.filter((p) => p.status === 'completed').length}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="text-sm text-amber-600 uppercase font-semibold">Planned</div>
              <div className="text-3xl font-bold text-amber-900 mt-1">
                {practices.filter((p) => p.status === 'planned').length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={aiFilter}
                onChange={(e) => setAiFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="ai">AI Generated</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter('all')
                  setAiFilter('all')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Practices List */}
        {filteredPractices.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 mb-4">
              {practices.length === 0
                ? 'No practice plans saved yet.'
                : 'No practices match your filters.'}
            </p>
            {practices.length === 0 && (
              <Link
                href="/demo/analytics"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Analytics to Generate AI Practice Plan
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPractices.map((practice) => {
                  const practiceDate = new Date(practice.practice_date)
                  const isUpcoming = practiceDate > new Date()

                  return (
                    <tr
                      key={practice.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => loadPracticeDetails(practice)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {practiceDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {practiceDate.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{practice.duration_minutes} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {practice.generated_by_ai ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            🤖 AI Generated
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Manual
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            practice.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : practice.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : practice.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : isUpcoming
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {practice.status === 'planned' && isUpcoming
                            ? 'Upcoming'
                            : practice.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {practice.location || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            loadPracticeDetails(practice)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Practice Detail Modal */}
        {selectedPractice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Practice Plan Details</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(selectedPractice.practice_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPractice(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {loadingDetails ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading practice details...</p>
                  </div>
                ) : (
                  <>
                    {/* Practice Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedPractice.duration_minutes} minutes
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedPractice.generated_by_ai ? '🤖 AI Generated' : 'Manual'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Status</div>
                        <div className="text-lg font-semibold text-gray-900 capitalize">
                          {selectedPractice.status.replace('_', ' ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedPractice.location || '—'}
                        </div>
                      </div>
                    </div>

                    {/* Source Game */}
                    {sourceGame && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm font-semibold text-blue-900 mb-1">
                          Based on Game
                        </div>
                        <div className="text-blue-800">
                          vs {sourceGame.opponent_name} on{' '}
                          {new Date(sourceGame.game_date).toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    {/* AI Reasoning */}
                    {selectedPractice.generated_by_ai && selectedPractice.ai_reasoning && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-purple-900 mb-3">
                          AI Analysis
                        </h3>

                        {selectedPractice.ai_reasoning.overall_assessment && (
                          <div className="mb-3">
                            <div className="text-sm font-semibold text-purple-900 mb-1">
                              Assessment
                            </div>
                            <p className="text-purple-800">
                              {selectedPractice.ai_reasoning.overall_assessment}
                            </p>
                          </div>
                        )}

                        {selectedPractice.ai_reasoning.top_focus_areas && (
                          <div className="mb-3">
                            <div className="text-sm font-semibold text-purple-900 mb-1">
                              Focus Areas
                            </div>
                            <ul className="list-disc list-inside text-purple-800 space-y-1">
                              {selectedPractice.ai_reasoning.top_focus_areas.map((area, idx) => (
                                <li key={idx}>{area}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedPractice.ai_reasoning.practice_goals && (
                          <div>
                            <div className="text-sm font-semibold text-purple-900 mb-1">
                              Practice Goals
                            </div>
                            <ul className="list-disc list-inside text-purple-800 space-y-1">
                              {selectedPractice.ai_reasoning.practice_goals.map((goal, idx) => (
                                <li key={idx}>{goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Objectives & Notes */}
                    {selectedPractice.objectives && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Objectives</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedPractice.objectives}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPractice.notes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedPractice.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Drills by Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Drills</h3>

                      {practiceDrills.length === 0 ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                          <p className="text-yellow-800">No drills associated with this practice</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {sectionOrder.map((section) => {
                            const sectionDrills = drillsBySection[section]
                            if (!sectionDrills || sectionDrills.length === 0) return null

                            return (
                              <div key={section} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="text-md font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                                  {section.replace(/_/g, ' ')}
                                  <span className="text-sm text-gray-600 font-normal ml-2">
                                    (
                                    {sectionDrills.reduce(
                                      (sum, d) => sum + d.duration_minutes,
                                      0
                                    )}{' '}
                                    min)
                                  </span>
                                </h4>

                                <div className="space-y-3">
                                  {sectionDrills.map((drill) => (
                                    <div
                                      key={drill.id}
                                      className="bg-white border border-gray-200 rounded-md p-3"
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <h5 className="font-semibold text-gray-900 flex-1">
                                          {drill.drills.title}
                                        </h5>
                                        <span className="text-sm text-gray-600 font-semibold ml-2 whitespace-nowrap">
                                          {drill.duration_minutes} min
                                        </span>
                                      </div>

                                      <p className="text-sm text-gray-600 mb-2">
                                        {drill.drills.description}
                                      </p>

                                      {drill.notes && (
                                        <div className="mt-2 text-sm bg-blue-50 border border-blue-200 rounded p-2">
                                          <span className="font-semibold text-blue-900">
                                            Notes:{' '}
                                          </span>
                                          <span className="text-blue-800">{drill.notes}</span>
                                        </div>
                                      )}

                                      {drill.modifications && (
                                        <div className="mt-2 text-sm bg-amber-50 border border-amber-200 rounded p-2">
                                          <span className="font-semibold text-amber-900">
                                            Modifications:{' '}
                                          </span>
                                          <span className="text-amber-800">
                                            {drill.modifications}
                                          </span>
                                        </div>
                                      )}

                                      <div className="mt-2 text-xs text-gray-500">
                                        Category: {drill.drills.category}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedPractice(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
