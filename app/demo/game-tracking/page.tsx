'use client'

import { useEffect } from 'react'
import { useGameTrackingStore, type Player } from '@/lib/stores/game-tracking-store'
import { EventLogger } from '@/components/game-tracking/event-logger'
import { LiveStats } from '@/components/game-tracking/live-stats'
import { RecentEventsList } from '@/components/game-tracking/recent-events-list'

// Mock players for demo
const mockPlayers: Player[] = [
  { id: '1', jerseyNumber: 7, firstName: 'Connor', lastName: 'McDavid', position: 'forward' },
  { id: '2', jerseyNumber: 97, firstName: 'Connor', lastName: 'Bedard', position: 'forward' },
  { id: '3', jerseyNumber: 88, firstName: 'David', lastName: 'Pastrnak', position: 'forward' },
  { id: '4', jerseyNumber: 13, firstName: 'Matthew', lastName: 'Tkachuk', position: 'forward' },
  { id: '5', jerseyNumber: 29, firstName: 'Leon', lastName: 'Draisaitl', position: 'forward' },
  { id: '6', jerseyNumber: 44, firstName: 'Erik', lastName: 'Karlsson', position: 'defense' },
  { id: '7', jerseyNumber: 65, firstName: 'Cale', lastName: 'Makar', position: 'defense' },
  { id: '8', jerseyNumber: 8, firstName: 'Quinn', lastName: 'Hughes', position: 'defense' },
  { id: '9', jerseyNumber: 55, fontSize: 'Mark', lastName: 'Scheifele', position: 'forward' },
  { id: '10', jerseyNumber: 19, firstName: 'Auston', lastName: 'Matthews', position: 'forward' },
  { id: '11', jerseyNumber: 1, firstName: 'Igor', lastName: 'Shesterkin', position: 'goalie' },
  { id: '12', jerseyNumber: 31, firstName: 'Carey', lastName: 'Price', position: 'goalie' },
]

export default function GameTrackingDemoPage() {
  const { setGameState, setPlayers } = useGameTrackingStore()

  useEffect(() => {
    // Initialize demo data
    setGameState({
      gameId: 'demo-game-1',
      period: 1,
      gameTimeSeconds: 1200,
      score: { us: 0, them: 0 },
      situation: 'even_strength',
    })

    setPlayers(mockPlayers)
  }, [setGameState, setPlayers])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Live Game Tracking Demo
          </h1>
          <p className="text-gray-600">
            The complete event logging system - click Quick Event buttons or tap the ice to log events
          </p>
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
          <h2 className="text-xl font-bold mb-4">What's Next?</h2>

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
              <span className="text-gray-400">○</span>
              <span>Database persistence (save events to Supabase)</span>
            </li>
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
        </div>
      </div>
    </div>
  )
}
