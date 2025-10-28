'use client'

import { useEffect, useState } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { EventLogger } from '@/components/game-tracking/event-logger'
import { LiveStats } from '@/components/game-tracking/live-stats'
import { RecentEventsList } from '@/components/game-tracking/recent-events-list'
import { setupDemoGameData } from '@/app/actions/demo-setup'

export default function GameTrackingDemoPage() {
  const { setGameState, setPlayers, loadEvents } = useGameTrackingStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initializeDemo() {
      try {
        // Set up demo data in database (creates org, team, players, game)
        const { gameId, players } = await setupDemoGameData()

        // Initialize game state
        setGameState({
          gameId,
          period: 1,
          gameTimeSeconds: 1200,
          score: { us: 0, them: 0 },
          situation: 'even_strength',
        })

        // Load players
        setPlayers(players)

        // Load existing events from database
        await loadEvents(gameId)

        setLoading(false)
      } catch (err) {
        console.error('Failed to initialize demo:', err)
        setError('Failed to load demo. Please refresh the page.')
        setLoading(false)
      }
    }

    initializeDemo()
  }, [setGameState, setPlayers, loadEvents])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading demo data from database...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-900 font-bold text-lg mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Live Game Tracking Demo
          </h1>
          <p className="text-gray-600">
            The complete event logging system - events are saved to Supabase in real-time
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            Connected to database
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event Logger */}
          <div className="lg:col-span-2">
            <EventLogger width={700} height={350} />
          </div>

          {/* Right Column - Stats & Events */}
          <div className="space-y-6">
            {/* Live Stats */}
            <LiveStats />

            {/* Recent Events */}
            <RecentEventsList />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Features Demonstrated</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">✅ Quick Event Logging</h3>
              <p className="text-sm text-blue-700">
                6 event types with color-coded buttons for fast logging during live games
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✅ Interactive Ice Surface</h3>
              <p className="text-sm text-green-700">
                Tap anywhere to log exact location - coordinates mapped to database schema
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">✅ Player Quick Select</h3>
              <p className="text-sm text-purple-700">
                Jersey number grid with position indicators for fast player selection
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">✅ Live Stats Calculation</h3>
              <p className="text-sm text-amber-700">
                Real-time shot stats, breakout success rates, and turnover tracking
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">✅ Event Management</h3>
              <p className="text-sm text-red-700">
                Undo last event, delete specific events, view recent history
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">✅ State Management</h3>
              <p className="text-sm text-gray-700">
                Zustand store for predictable state transitions and event flow
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Event Logging Workflow
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-blue-900">Select Event Type</h3>
                <p className="text-sm text-blue-700">
                  Click a quick event button (Shot, Goal, Turnover, etc.)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-blue-900">Tap Ice Location</h3>
                <p className="text-sm text-blue-700">
                  Tap the ice surface where the event occurred (coordinates auto-captured)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-blue-900">Select Player</h3>
                <p className="text-sm text-blue-700">
                  Choose player from quick-select grid (sorted by jersey number)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-blue-900">Shot Result (if applicable)</h3>
                <p className="text-sm text-blue-700">
                  For shots/goals: select result (Goal, Save, Miss, Blocked, Post)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-green-900">Event Logged!</h3>
                <p className="text-sm text-green-700">
                  Event appears in recent list, stats update immediately, ice surface shows marker
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded border border-blue-300">
            <p className="text-sm text-blue-900">
              <strong>⏱️ Target Time:</strong> 5 seconds per event (as specified in product docs)
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">What's Working Now?</h2>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Event logger with multi-step flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Live stats calculation and display</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Recent events list with undo/delete</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span><strong>Database persistence (events save to Supabase!)</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Optimistic updates (instant UI, background sync)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Load events from database on page load</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Offline support (IndexedDB + background sync)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Post-game analytics dashboard (heat maps, insights)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Period clock and game situation tracking</span>
            </li>
          </ul>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Try it:</strong> Log some events, refresh the page - your events persist! Check Supabase Studio at <code className="bg-white px-1 rounded">localhost:54323</code> to see the data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
