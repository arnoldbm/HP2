'use client'

import React, { useState, useEffect } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { supabase } from '@/lib/db/supabase'
import {
  extractShotData,
  calculateShotQualityStats,
  analyzeBreakouts,
  getPeriodStats,
  getShootingPercentageBySituation,
} from '@/lib/analytics/game-analytics'
import { ShotChart } from '@/components/analytics/shot-chart'
import { ShotQualityChart } from '@/components/analytics/shot-quality-chart'
import { BreakoutAnalysis } from '@/components/analytics/breakout-analysis'
import { PeriodTrends } from '@/components/analytics/period-trends'
import type { GameEvent } from '@/lib/stores/game-tracking-store'

// Types for AI-generated practice plan
interface PracticePlanDrill {
  drill_title: string
  duration_minutes: number
  reason: string
  addresses: string
  expected_improvement: string
}

interface PracticePlanSection {
  section: 'warm_up' | 'skills' | 'drills' | 'small_area_games' | 'scrimmage' | 'cool_down'
  drills: PracticePlanDrill[]
}

interface GeneratedPracticePlan {
  reasoning: {
    top_focus_areas: string[]
    overall_assessment: string
    practice_goals: string[]
  }
  practice_plan: {
    total_duration_minutes: number
    sections: PracticePlanSection[]
  }
}

interface Game {
  id: string
  opponent_name: string
  game_date: string
  location: string | null
}

export default function AnalyticsDemoPage() {
  const { events, gameState, loadEvents, setGameState } = useGameTrackingStore()
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all')
  const [selectedSituation, setSelectedSituation] = useState<string | 'all'>('all')
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPracticePlan | null>(null)
  const [planError, setPlanError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [availableGames, setAvailableGames] = useState<Game[]>([])
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)

  // Save practice plan state
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [savingPractice, setSavingPractice] = useState(false)
  const [practiceDate, setPracticeDate] = useState('')
  const [practiceNotes, setPracticeNotes] = useState('')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load available games on mount
  useEffect(() => {
    async function loadAvailableGames() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          console.log('❌ No user authenticated')
          return
        }

        // Get user's team membership
        const { data: teamMember } = await supabase
          .from('team_members')
          .select('team_id')
          .eq('user_id', user.id)
          .single()

        if (!teamMember) {
          console.log('❌ No team found for user')
          return
        }

        // Get all games for this team
        const { data: games } = await supabase
          .from('games')
          .select('id, opponent_name, game_date, location')
          .eq('team_id', teamMember.team_id)
          .order('game_date', { ascending: false })

        if (games && games.length > 0) {
          console.log('✅ Found', games.length, 'games')
          setAvailableGames(games)

          // If no game selected yet, select the most recent
          let gameIdToLoad = gameState.gameId || games[0].id
          setSelectedGameId(gameIdToLoad)

          // Update store with gameId if not set
          if (!gameState.gameId) {
            setGameState({ gameId: gameIdToLoad })
          }

          // Load events for the selected game
          console.log('📊 Loading events for game:', gameIdToLoad)
          await loadEvents(gameIdToLoad)
          console.log('✅ Loaded', events.length, 'events')
        } else {
          console.log('❌ No games found. Please create a game first.')
        }
      } catch (error) {
        console.error('❌ Error loading games:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAvailableGames()
  }, [])

  // Handle game selection change
  const handleGameChange = async (newGameId: string) => {
    setSelectedGameId(newGameId)
    setGameState({ gameId: newGameId })
    setLoading(true)
    try {
      await loadEvents(newGameId)
      console.log('✅ Switched to game:', newGameId)
    } catch (error) {
      console.error('❌ Error loading game events:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter events based on selected period and situation
  const filteredEvents = events.filter((event) => {
    const periodMatch = selectedPeriod === 'all' || event.period === selectedPeriod
    const situationMatch =
      selectedSituation === 'all' || event.situation === selectedSituation
    return periodMatch && situationMatch
  })

  // Calculate analytics from filtered events
  const shotData = extractShotData(filteredEvents)
  const shotQualityStats = calculateShotQualityStats(filteredEvents)
  const breakoutAnalytics = analyzeBreakouts(filteredEvents)
  const periodStats = getPeriodStats(filteredEvents, 3)
  const situationStats = getShootingPercentageBySituation(filteredEvents)

  // Count turnovers
  const turnoverCount = filteredEvents.filter((e) => e.eventType === 'turnover').length

  // Get unique periods from events
  const periods = Array.from(new Set(events.map((e) => e.period))).sort()

  // Generate AI practice plan
  async function generatePracticePlan() {
    setGeneratingPlan(true)
    setPlanError(null)
    setGeneratedPlan(null)

    try {
      console.log('🤖 Requesting AI practice plan generation...')

      // Build analytics payload
      const analyticsPayload = {
        shotQualityStats: {
          totalShots: shotQualityStats.totalShots,
          totalGoals: shotQualityStats.totalGoals,
          shootingPercentage: shotQualityStats.shootingPercentage,
          highDangerShots: shotQualityStats.highDangerShots,
          highDangerGoals: shotQualityStats.highDangerGoals,
          highDangerPercentage: shotQualityStats.highDangerPercentage,
          mediumDangerShots: shotQualityStats.mediumDangerShots,
          lowDangerShots: shotQualityStats.lowDangerShots,
        },
        breakoutAnalytics: {
          totalBreakouts: breakoutAnalytics.total,
          successfulBreakouts: breakoutAnalytics.successful,
          failedBreakouts: breakoutAnalytics.failed,
          successRate: breakoutAnalytics.successRate,
          byType: breakoutAnalytics.byType,
        },
        turnoverCount,
        periodStats: periodStats.map((p) => ({
          period: p.period,
          shots: p.shots,
          goals: p.goals,
          events: p.events,
        })),
        situationStats: {
          evenStrength: situationStats.find((s) => s.situation === 'even_strength') || {
            shots: 0,
            goals: 0,
            percentage: 0,
          },
          powerPlay: situationStats.find((s) => s.situation === 'power_play') || {
            shots: 0,
            goals: 0,
            percentage: 0,
          },
          penaltyKill: situationStats.find((s) => s.situation === 'penalty_kill') || {
            shots: 0,
            goals: 0,
            percentage: 0,
          },
        },
      }

      const response = await fetch('/api/generate-practice-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: 'demo-team',
          analytics: analyticsPayload,
          practiceDuration: 60,
          teamAge: 13, // U13 team for demo
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate practice plan')
      }

      const result = await response.json()
      console.log('✅ Practice plan generated:', result)

      setGeneratedPlan(result.practicePlan)
    } catch (error) {
      console.error('❌ Error generating practice plan:', error)
      setPlanError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setGeneratingPlan(false)
    }
  }

  // Save practice plan to database
  async function savePracticePlan() {
    if (!generatedPlan || !practiceDate) {
      setSaveError('Please provide a practice date')
      return
    }

    setSavingPractice(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      console.log('💾 Saving practice plan to database...')

      // Get current user and team
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('No authenticated user')
      }

      const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .single()

      if (!teamMember) {
        throw new Error('No team found for user')
      }

      // Fetch all available drills to match titles
      const { data: allDrills, error: drillsError } = await supabase
        .from('drills')
        .select('id, title')
        .eq('is_global', true)

      if (drillsError) {
        throw new Error('Failed to fetch drills')
      }

      // Create a map of drill titles to IDs (case-insensitive)
      const drillTitleMap = new Map(
        allDrills.map((d) => [d.title.toLowerCase(), d.id])
      )

      // Create the practice record
      const { data: practice, error: practiceError } = await supabase
        .from('practices')
        .insert({
          team_id: teamMember.team_id,
          practice_date: new Date(practiceDate).toISOString(),
          duration_minutes: generatedPlan.practice_plan.total_duration_minutes,
          objectives: generatedPlan.reasoning.practice_goals.join('\n'),
          notes: practiceNotes,
          generated_by_ai: true,
          based_on_game_id: selectedGameId,
          ai_reasoning: {
            top_focus_areas: generatedPlan.reasoning.top_focus_areas,
            overall_assessment: generatedPlan.reasoning.overall_assessment,
            practice_goals: generatedPlan.reasoning.practice_goals,
          },
          status: 'planned',
          created_by: user.id,
        })
        .select()
        .single()

      if (practiceError) {
        console.error('Error creating practice:', practiceError)
        throw new Error('Failed to create practice record')
      }

      console.log('✅ Practice created:', practice.id)

      // Now create practice_drill records for each drill
      const practiceDrills = []
      let sequenceOrder = 1

      for (const section of generatedPlan.practice_plan.sections) {
        for (const drill of section.drills) {
          // Find drill ID by title (case-insensitive match)
          const drillId = drillTitleMap.get(drill.drill_title.toLowerCase())

          if (!drillId) {
            console.warn(`⚠️ Could not find drill ID for: "${drill.drill_title}"`)
            continue // Skip drills we can't match
          }

          practiceDrills.push({
            practice_id: practice.id,
            drill_id: drillId,
            section: section.section,
            sequence_order: sequenceOrder++,
            duration_minutes: drill.duration_minutes,
            notes: `${drill.reason}\n\nExpected: ${drill.expected_improvement}`,
          })
        }
      }

      // Insert all practice drills
      const { error: drillsInsertError } = await supabase
        .from('practice_drills')
        .insert(practiceDrills)

      if (drillsInsertError) {
        console.error('Error inserting practice drills:', drillsInsertError)
        throw new Error('Failed to save practice drills')
      }

      console.log('✅ Saved', practiceDrills.length, 'practice drills')

      setSaveSuccess(true)
      setTimeout(() => {
        setShowSaveModal(false)
        setSaveSuccess(false)
        setPracticeDate('')
        setPracticeNotes('')
      }, 2000)
    } catch (error) {
      console.error('❌ Error saving practice plan:', error)
      setSaveError(error instanceof Error ? error.message : 'Failed to save practice plan')
    } finally {
      setSavingPractice(false)
    }
  }

  // Open save modal and set default date (tomorrow)
  function openSaveModal() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setPracticeDate(tomorrow.toISOString().split('T')[0])
    setPracticeNotes('')
    setSaveError(null)
    setSaveSuccess(false)
    setShowSaveModal(true)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Game Analytics Dashboard</h1>
            <a
              href="/demo/practice-history"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Practice History →
            </a>
          </div>
          <p className="text-gray-600">
            Post-game analytics and insights based on tracked events
          </p>

          {/* Game selector */}
          {availableGames.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Game
              </label>
              <select
                value={selectedGameId || ''}
                onChange={(e) => handleGameChange(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {availableGames.map((game) => {
                  const date = new Date(game.game_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                  const location = game.location ? ` @ ${game.location}` : ''
                  return (
                    <option key={game.id} value={game.id}>
                      vs {game.opponent_name} - {date}{location}
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {/* Event count indicator */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              Total Events: <span className="font-semibold">{events.length}</span>
            </span>
            <span className="text-gray-600">
              Filtered Events: <span className="font-semibold">{filteredEvents.length}</span>
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="flex flex-wrap gap-4">
            {/* Period filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) =>
                  setSelectedPeriod(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Periods</option>
                {periods.map((period) => (
                  <option key={period} value={period}>
                    Period {period}
                  </option>
                ))}
              </select>
            </div>

            {/* Situation filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situation
              </label>
              <select
                value={selectedSituation}
                onChange={(e) => setSelectedSituation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Situations</option>
                <option value="even_strength">Even Strength</option>
                <option value="power_play">Power Play</option>
                <option value="penalty_kill">Penalty Kill</option>
              </select>
            </div>

            {/* Reset button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedPeriod('all')
                  setSelectedSituation('all')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Situation stats quick view */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {situationStats.map((stat) => (
              <div key={stat.situation} className="bg-gray-50 rounded p-3">
                <div className="text-xs text-gray-600 uppercase">
                  {stat.situation.replace('_', ' ')}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold">{stat.percentage.toFixed(1)}%</span>
                  <span className="text-sm text-gray-600">
                    ({stat.goals}/{stat.shots})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {events.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 mb-4">
              No game events found. Track some events in the{' '}
              <a href="/demo/game-tracking" className="font-semibold underline">
                game tracking demo
              </a>{' '}
              first.
            </p>
          </div>
        )}

        {/* Shot Analytics Section */}
        {shotData.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Shot Analysis</h2>

            {/* Shot Chart */}
            <div>
              <ShotChart shots={shotData} width={800} height={400} />
            </div>

            {/* Shot Quality Breakdown */}
            <div>
              <ShotQualityChart stats={shotQualityStats} />
            </div>
          </div>
        )}

        {/* Breakout Analysis Section */}
        {breakoutAnalytics.total > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Breakout Performance</h2>
            <BreakoutAnalysis analytics={breakoutAnalytics} />
          </div>
        )}

        {/* Period Trends Section */}
        {periodStats.length > 0 && periodStats.some((p) => p.shots > 0) && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Period-by-Period Trends</h2>
            <PeriodTrends periodStats={periodStats} />
          </div>
        )}

        {/* AI Practice Plan Generation */}
        {events.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2 text-purple-900">
              🤖 AI-Powered Practice Planning
            </h3>
            <p className="text-purple-700 mb-4">
              Let AI analyze this game data and generate a targeted practice plan to address your
              team's weaknesses.
            </p>

            <button
              onClick={generatePracticePlan}
              disabled={generatingPlan}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingPlan ? '🤖 Generating Practice Plan...' : '✨ Generate AI Practice Plan'}
            </button>

            {planError && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800 font-semibold">Error generating practice plan</p>
                <p className="text-red-600 text-sm mt-1">{planError}</p>
                {planError.includes('API key not configured') && (
                  <p className="text-red-600 text-sm mt-2">
                    💡 Add your OpenAI API key to <code className="bg-red-100 px-1">.env.local</code>:
                    <br />
                    <code className="bg-red-100 px-2 py-1 rounded text-xs block mt-1">
                      OPENAI_API_KEY=your-key-here
                    </code>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Generated Practice Plan Display */}
        {generatedPlan && (
          <div className="bg-white border-2 border-green-200 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ✅ AI-Generated Practice Plan
            </h2>

            {/* Reasoning Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Analysis & Focus Areas</h3>
              <p className="text-blue-800 mb-3">{generatedPlan.reasoning.overall_assessment}</p>

              <div className="mb-3">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Top Focus Areas:</h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  {generatedPlan.reasoning.top_focus_areas.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Practice Goals:</h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  {generatedPlan.reasoning.practice_goals.map((goal, idx) => (
                    <li key={idx}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practice Plan Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Practice Plan ({generatedPlan.practice_plan.total_duration_minutes} minutes)
                </h3>
              </div>

              {generatedPlan.practice_plan.sections.map((section, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="text-md font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    {section.section.replace('_', ' ')}
                    <span className="text-sm text-gray-600 font-normal ml-2">
                      ({section.drills.reduce((sum, d) => sum + d.duration_minutes, 0)} min)
                    </span>
                  </h4>

                  <div className="space-y-3">
                    {section.drills.map((drill, drillIdx) => (
                      <div
                        key={drillIdx}
                        className="bg-white border border-gray-200 rounded-md p-3"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{drill.drill_title}</h5>
                          <span className="text-sm text-gray-600 font-semibold ml-2 whitespace-nowrap">
                            {drill.duration_minutes} min
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-semibold text-purple-700">Addresses: </span>
                            <span className="text-gray-700">{drill.addresses}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-blue-700">Why: </span>
                            <span className="text-gray-700">{drill.reason}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-green-700">Expected: </span>
                            <span className="text-gray-700">{drill.expected_improvement}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions for generated plan */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={openSaveModal}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
              >
                💾 Save Practice Plan
              </button>
              <button
                onClick={() => setGeneratedPlan(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}

        {/* Save Practice Plan Modal */}
        {showSaveModal && generatedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Save Practice Plan
              </h3>

              <div className="space-y-4">
                {/* Practice Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Date *
                  </label>
                  <input
                    type="date"
                    value={practiceDate}
                    onChange={(e) => setPracticeDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    disabled={savingPractice}
                  />
                </div>

                {/* Duration (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={`${generatedPlan.practice_plan.total_duration_minutes} minutes`}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                    disabled
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={practiceNotes}
                    onChange={(e) => setPracticeNotes(e.target.value)}
                    placeholder="Add any additional notes about this practice..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={savingPractice}
                  />
                </div>

                {/* Error message */}
                {saveError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-800 text-sm">{saveError}</p>
                  </div>
                )}

                {/* Success message */}
                {saveSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <p className="text-green-800 text-sm font-semibold">
                      ✅ Practice plan saved successfully!
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={savePracticePlan}
                    disabled={savingPractice || !practiceDate}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingPractice ? 'Saving...' : 'Save Practice Plan'}
                  </button>
                  <button
                    onClick={() => setShowSaveModal(false)}
                    disabled={savingPractice}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export/Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                // TODO: Implement PDF export
                alert('PDF export coming soon!')
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                // TODO: Implement sharing
                alert('Share functionality coming soon!')
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Share Analytics
            </button>
            <a
              href="/demo/game-tracking"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Game Tracking
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
