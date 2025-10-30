'use client'

import { useEffect, useState } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { EventLogger } from '@/components/game-tracking/event-logger'
import { LiveStats } from '@/components/game-tracking/live-stats'
import { RecentEventsList } from '@/components/game-tracking/recent-events-list'
import { AuthModal } from '@/components/auth/auth-modal'
import { setupDemoGameData } from '@/app/actions/demo-setup'
import { supabase } from '@/lib/db/supabase'

interface GameInfo {
  opponent_name: string
  game_date: string
  location: string | null
}

export default function GameTrackingDemoPage() {
  const { gameState, setGameState, setPlayers, loadEvents } = useGameTrackingStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [isEditingGameInfo, setIsEditingGameInfo] = useState(false)
  const [editOpponentName, setEditOpponentName] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [savingGameInfo, setSavingGameInfo] = useState(false)

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        // If there's an error (like 403), clear the session
        if (error) {
          console.log('Auth error, clearing session:', error)
          await supabase.auth.signOut()
          setIsAuthenticated(false)
          setCheckingAuth(false)
          return
        }

        setIsAuthenticated(!!user)
        setCheckingAuth(false)
      } catch (err) {
        console.error('Auth check failed:', err)
        // Clear any invalid session
        await supabase.auth.signOut()
        setIsAuthenticated(false)
        setCheckingAuth(false)
      }

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session?.user)
      })

      return () => {
        subscription.unsubscribe()
      }
    }

    checkAuth()
  }, [])

  // Initialize demo once authenticated
  useEffect(() => {
    if (!isAuthenticated) return

    async function initializeDemo() {
      try {
        // Get the current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error('User not found')
        }

        // Set up demo data (creates org, team, players if they don't exist)
        const { players } = await setupDemoGameData(user.id)

        // Get user's team
        const { data: teamMember } = await supabase
          .from('team_members')
          .select('team_id')
          .eq('user_id', user.id)
          .single()

        if (!teamMember) {
          throw new Error('No team found for user')
        }

        let gameId: string | null = null

        // 1. Try to load the current game from localStorage (user-specific)
        const storageKey = `current_game_${user.id}`
        const storedGameId = localStorage.getItem(storageKey)

        if (storedGameId) {
          // Verify the stored game still exists and belongs to this user's team
          const { data: storedGame } = await supabase
            .from('games')
            .select('id')
            .eq('id', storedGameId)
            .eq('team_id', teamMember.team_id)
            .maybeSingle()

          if (storedGame) {
            gameId = storedGame.id
            console.log('✅ Loaded game from localStorage:', gameId)
          } else {
            // Stored game doesn't exist anymore, clear localStorage
            localStorage.removeItem(storageKey)
            console.log('⚠️ Stored game not found, cleared localStorage')
          }
        }

        // 2. If no stored game, load the most recent game for this team
        if (!gameId) {
          const { data: recentGame } = await supabase
            .from('games')
            .select('id')
            .eq('team_id', teamMember.team_id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

          if (recentGame) {
            gameId = recentGame.id
            // Store it in localStorage for next time
            localStorage.setItem(storageKey, gameId)
            console.log('✅ Loaded most recent game:', gameId)
          }
        }

        // 3. If still no game, create a default one
        if (!gameId) {
          const { data: newGame, error: gameError } = await supabase
            .from('games')
            .insert({
              team_id: teamMember.team_id,
              opponent_name: 'Rival Team',
              game_date: new Date().toISOString(),
              is_home: true,
              status: 'in_progress',
            })
            .select()
            .single()

          if (gameError) throw gameError
          gameId = newGame.id
          // Store it in localStorage
          localStorage.setItem(storageKey, gameId)
          console.log('✅ Created new default game:', gameId)
        }

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
  }, [isAuthenticated, setGameState, setPlayers, loadEvents])

  // Fetch game info when gameId is available
  useEffect(() => {
    if (!gameState.gameId) return

    async function fetchGameInfo() {
      try {
        const { data: game, error } = await supabase
          .from('games')
          .select('opponent_name, game_date, location')
          .eq('id', gameState.gameId)
          .single()

        if (error) throw error

        if (game) {
          setGameInfo(game)
        }
      } catch (err) {
        console.error('Failed to fetch game info:', err)
      }
    }

    fetchGameInfo()
  }, [gameState.gameId])

  // Show auth modal if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏒 Hockey Practice Planner</h1>
          <p className="text-lg text-gray-600 mb-8">
            Track games in real-time and get AI-powered practice plans
          </p>
          <AuthModal
            initialMode="signup"
            onSuccess={() => {
              // Auth state will be updated by the listener
              setIsAuthenticated(true)
            }}
          />
        </div>
      </div>
    )
  }

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }

  const handleEditGameInfo = () => {
    if (gameInfo) {
      setEditOpponentName(gameInfo.opponent_name)
      setEditLocation(gameInfo.location || '')
      setIsEditingGameInfo(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditingGameInfo(false)
    setEditOpponentName('')
    setEditLocation('')
  }

  const handleSaveGameInfo = async () => {
    if (!gameState.gameId || !editOpponentName.trim()) {
      alert('Opponent name is required')
      return
    }

    try {
      setSavingGameInfo(true)

      const { error } = await supabase
        .from('games')
        .update({
          opponent_name: editOpponentName.trim(),
          location: editLocation.trim() !== '' ? editLocation.trim() : null,
        })
        .eq('id', gameState.gameId)

      if (error) throw error

      // Update local state
      setGameInfo({
        ...gameInfo!,
        opponent_name: editOpponentName.trim(),
        location: editLocation.trim() !== '' ? editLocation.trim() : null,
      })

      setIsEditingGameInfo(false)
      console.log('✅ Game info updated successfully')
    } catch (error) {
      console.error('❌ Error updating game info:', error)
      alert('Failed to update game info. Please try again.')
    } finally {
      setSavingGameInfo(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Live Game Tracking
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Events saved to Supabase in real-time
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs md:text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                Connected
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors self-start md:self-auto"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Game Info Header - Mobile Optimized */}
        {gameInfo && (
          <div className="mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-4 md:p-6 text-white">
            {!isEditingGameInfo ? (
              // Display Mode
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
                    <span className="text-2xl md:text-3xl font-bold">🏒</span>
                    <h2 className="text-xl md:text-2xl font-bold">
                      vs {gameInfo.opponent_name}
                    </h2>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-blue-100 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>
                        {new Date(gameInfo.game_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {gameInfo.location && (
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{gameInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
                  <div className="text-left md:text-right">
                    <div className="text-xs md:text-sm text-blue-100 mb-1">Period {gameState.period}</div>
                    <div className="text-3xl md:text-4xl font-bold">
                      {gameState.score.us} - {gameState.score.them}
                    </div>
                  </div>
                  <button
                    onClick={handleEditGameInfo}
                    className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
                    title="Edit game info"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold">🏒</span>
                  <h3 className="text-xl font-bold">Edit Game Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Opponent Name *
                    </label>
                    <input
                      type="text"
                      value={editOpponentName}
                      onChange={(e) => setEditOpponentName(e.target.value)}
                      placeholder="e.g., Hawks, Red Wings"
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                      disabled={savingGameInfo}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="e.g., Home Arena, Away Rink"
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                      disabled={savingGameInfo}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveGameInfo}
                    disabled={savingGameInfo || !editOpponentName.trim()}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingGameInfo ? 'Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={savingGameInfo}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <div className="flex-1"></div>
                  <div className="text-right">
                    <div className="text-sm text-blue-100 mb-1">Period {gameState.period}</div>
                    <div className="text-3xl font-bold">
                      {gameState.score.us} - {gameState.score.them}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* Main Layout - Mobile-First */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Event Logger - Full width on mobile */}
          <div className="lg:col-span-2">
            <EventLogger />
          </div>

          {/* Stats & Events - Stack on mobile */}
          <div className="space-y-4 md:space-y-6">
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

          <h3 className="text-lg font-semibold mt-6 mb-3">View Analytics</h3>
          <div className="mb-4">
            <a
              href="/demo/analytics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              📊 View Post-Game Analytics Dashboard
            </a>
            <p className="text-sm text-gray-600 mt-2">
              See shot charts, breakout analysis, and period-by-period trends from your tracked events
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Offline support (IndexedDB + background sync)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Period clock and game situation tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">○</span>
              <span>Event editing UI (post-game corrections)</span>
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
