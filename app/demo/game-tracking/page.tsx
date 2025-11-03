'use client'

import { useEffect, useState } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { EventLogger } from '@/components/game-tracking/event-logger'
import { RecentEventsList } from '@/components/game-tracking/recent-events-list'
import { QuickEventButtons } from '@/components/game-tracking/quick-event-buttons'
import { AuthModal } from '@/components/auth/auth-modal'
import { supabase } from '@/lib/db/supabase'
import { useTeam } from '@/lib/contexts/team-context'
import type { Player } from '@/lib/stores/game-tracking-store'

interface GameInfo {
  opponent_name: string
  game_date: string
  location: string | null
}

export default function GameTrackingDemoPage() {
  const { gameState, setGameState, setPlayers, loadEvents, loggingFlow } = useGameTrackingStore()
  const { selectedTeamId, selectTeam } = useTeam()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null)
  const [isEditingGameInfo, setIsEditingGameInfo] = useState(false)
  const [editOpponentName, setEditOpponentName] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [savingGameInfo, setSavingGameInfo] = useState(false)
  const [creatingGame, setCreatingGame] = useState(false)
  const [showNewGameForm, setShowNewGameForm] = useState(false)
  const [newGameOpponent, setNewGameOpponent] = useState('')
  const [newGameLocation, setNewGameLocation] = useState('')
  const [endsSwapped, setEndsSwapped] = useState(false)
  const [mobileView, setMobileView] = useState<'ice' | 'events'>('ice')
  const [showPeriodEndConfirm, setShowPeriodEndConfirm] = useState(false)
  const [showPeriod3EndDialog, setShowPeriod3EndDialog] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [supportsFullscreen, setSupportsFullscreen] = useState(false)

  // Check if game is completed
  const isGameCompleted = gameState.status === 'completed'

  // Check if fullscreen is supported
  useEffect(() => {
    const doc = document as any
    const docEl = document.documentElement as any
    const isSupported = !!(
      docEl.requestFullscreen ||
      docEl.webkitRequestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.msRequestFullscreen
    )
    setSupportsFullscreen(isSupported)
  }, [])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any
      setIsFullscreen(!!(document.fullscreenElement || doc.webkitFullscreenElement))
    }

    // Listen to both standard and webkit fullscreen events (for Safari)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Toggle fullscreen mode
  const toggleFullscreen = async () => {
    try {
      const doc = document as any
      const docEl = document.documentElement as any

      if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
        // Enter fullscreen
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen()
        } else if (docEl.webkitRequestFullscreen) {
          // Safari iOS
          await docEl.webkitRequestFullscreen()
        }
      } else {
        // Exit fullscreen
        if (doc.exitFullscreen) {
          await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          // Safari iOS
          await doc.webkitExitFullscreen()
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

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

        // Determine which team to use
        let teamId: string

        if (selectedTeamId) {
          // Use the selected team from context
          teamId = selectedTeamId
        } else {
          // No team selected - get user's first team and auto-select it
          const { data: teamMembers, error: teamError } = await supabase
            .from('team_members')
            .select('team_id')
            .eq('user_id', user.id)
            .limit(1)

          if (teamError) {
            console.error('Error fetching team membership:', teamError)
            throw new Error(`Failed to fetch team membership: ${teamError.message}`)
          }

          if (!teamMembers || teamMembers.length === 0) {
            throw new Error('No team found for user. Please create a team first.')
          }

          teamId = teamMembers[0].team_id
          // Auto-select this team in context
          selectTeam(teamId)
        }

        // Load players from roster for this team
        const { data: dbPlayers, error: playersError } = await supabase
          .from('players')
          .select('id, jersey_number, first_name, last_name, position')
          .eq('team_id', teamId)
          .order('jersey_number')

        if (playersError) {
          console.error('Error loading roster:', playersError)
          throw new Error(`Failed to load roster: ${playersError.message}`)
        }

        // Check if roster is empty
        if (!dbPlayers || dbPlayers.length === 0) {
          throw new Error('no_players')
        }

        // Map database players to store format
        const players: Player[] = dbPlayers.map((p) => ({
          id: p.id,
          jerseyNumber: p.jersey_number,
          firstName: p.first_name,
          lastName: p.last_name,
          position: p.position as any,
        }))

        let gameId: string | null = null

        // 1. Try to load the current game from localStorage (team-specific)
        const storageKey = `current_game_${teamId}`
        const storedGameId = localStorage.getItem(storageKey)

        if (storedGameId) {
          // Verify the stored game still exists and belongs to this team
          const { data: storedGame } = await supabase
            .from('games')
            .select('id')
            .eq('id', storedGameId)
            .eq('team_id', teamId)
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
            .eq('team_id', teamId)
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
              team_id: teamId,
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

        // Fetch game status from database
        const { data: gameData } = await supabase
          .from('games')
          .select('status')
          .eq('id', gameId)
          .single()

        // Initialize game state
        setGameState({
          gameId,
          period: 1,
          gameTimeSeconds: 1200,
          score: { us: 0, them: 0 },
          situation: 'even_strength',
          status: gameData?.status || 'in_progress',
        })

        // Load players
        setPlayers(players)

        // Load existing events from database
        await loadEvents(gameId)

        setLoading(false)
      } catch (err) {
        console.error('Failed to initialize game tracking:', err)

        // Handle empty roster error specially
        if (err instanceof Error && err.message === 'no_players') {
          setError('empty_roster')
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load game tracking. Please refresh the page.')
        }
        setLoading(false)
      }
    }

    initializeDemo()
  }, [isAuthenticated, selectedTeamId, setGameState, setPlayers, loadEvents, selectTeam])

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
    // Special handling for empty roster
    if (error === 'empty_roster') {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
            <h2 className="text-yellow-900 font-bold text-lg mb-2">⚠️ No Players in Roster</h2>
            <p className="text-yellow-700 mb-4">
              You need to add players to your roster before you can track a game.
            </p>
            <p className="text-yellow-700 mb-4">
              Game tracking requires players to log events like shots, goals, and turnovers.
            </p>
            <div className="flex gap-3">
              <a
                href={selectedTeamId ? `/demo/teams/${selectedTeamId}/roster` : '/demo/teams'}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                {selectedTeamId ? 'Add Players to Roster' : 'Go to Teams'}
              </a>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Regular error display
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

  const handleEndPeriodClick = () => {
    // Show confirmation dialog
    setShowPeriodEndConfirm(true)
  }

  const handleConfirmEndPeriod = () => {
    setShowPeriodEndConfirm(false)

    // If ending period 3, show overtime/end game dialog
    if (gameState.period === 3) {
      setShowPeriod3EndDialog(true)
    } else if (gameState.period === 4) {
      // Ending overtime ends the game
      handleEndGame()
    } else if (gameState.period < 4) {
      // Normal period end (periods 1, 2)
      setGameState({ period: gameState.period + 1 })
    }
  }

  const handlePeriod3Choice = (choice: 'overtime' | 'end') => {
    setShowPeriod3EndDialog(false)

    if (choice === 'overtime') {
      // Go to overtime (period 4)
      setGameState({ period: 4 })
    } else {
      // End game
      handleEndGame()
    }
  }

  const handleEndGame = async () => {
    if (!gameState.gameId) return

    try {
      const { error } = await supabase
        .from('games')
        .update({ status: 'completed' })
        .eq('id', gameState.gameId)

      if (error) throw error

      setGameState({ status: 'completed' })
    } catch (error) {
      console.error('❌ Error ending game:', error)
      alert('Failed to end game. Please try again.')
    }
  }

  const handleNewGameClick = () => {
    const { events } = useGameTrackingStore.getState()
    if (events.length > 0) {
      const confirmed = confirm('Starting a new game will save the current game and start fresh. Continue?')
      if (!confirmed) return
    }
    setNewGameOpponent('')
    setNewGameLocation('')
    setShowNewGameForm(true)
  }

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newGameOpponent.trim()) {
      alert('Please enter an opponent name')
      return
    }

    try {
      setCreatingGame(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please sign in to create a new game')
        return
      }

      // Use the selected team from context
      let teamId = selectedTeamId

      // If no team selected, get user's first team
      if (!teamId) {
        const { data: teamMembers } = await supabase
          .from('team_members')
          .select('team_id')
          .eq('user_id', user.id)
          .limit(1)

        if (!teamMembers || teamMembers.length === 0) {
          alert('No team found. Please create a team first.')
          return
        }

        teamId = teamMembers[0].team_id
        selectTeam(teamId) // Auto-select this team
      }

      const { data: newGame, error } = await supabase
        .from('games')
        .insert({
          team_id: teamId,
          opponent_name: newGameOpponent.trim(),
          game_date: new Date().toISOString(),
          location: newGameLocation.trim() !== '' ? newGameLocation.trim() : null,
          status: 'in_progress',
        })
        .select()
        .single()

      if (error) throw error

      console.log('✅ New game created:', newGame.id, 'vs', newGameOpponent)

      const storageKey = `current_game_${teamId}`
      localStorage.setItem(storageKey, newGame.id)

      setGameState({
        gameId: newGame.id,
        period: 1,
        gameTimeSeconds: 1200,
        score: { us: 0, them: 0 },
        situation: 'even_strength',
        status: 'in_progress',
      })

      await loadEvents(newGame.id)

      // Update game info state
      setGameInfo({
        opponent_name: newGameOpponent.trim(),
        game_date: newGame.game_date,
        location: newGameLocation.trim() !== '' ? newGameLocation.trim() : null,
      })

      setShowNewGameForm(false)
      setNewGameOpponent('')
      setNewGameLocation('')

      alert(`New game created vs ${newGameOpponent.trim()}! Ready to track events.`)
    } catch (error) {
      console.error('❌ Error creating new game:', error)
      alert('Failed to create new game. Please try again.')
    } finally {
      setCreatingGame(false)
    }
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header - Fixed at top on mobile landscape */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 md:p-4 shadow-lg landscape:py-1.5">
          <div className="flex items-center justify-between gap-2 md:gap-3">
            <div className="flex-1 min-w-0">
              {gameInfo && (
                <div className="flex items-center gap-2 landscape:gap-1">
                  <span className="text-lg md:text-2xl landscape:text-base">🏒</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm md:text-xl font-bold truncate landscape:text-xs">
                      vs {gameInfo.opponent_name}
                    </h2>
                    <div className="hidden md:flex items-center gap-2 text-xs text-blue-100">
                      <span>
                        {new Date(gameInfo.game_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      {gameInfo.location && <span>@ {gameInfo.location}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* View Toggle - Single button to switch between ice and events */}
            <button
              onClick={() => setMobileView(mobileView === 'ice' ? 'events' : 'ice')}
              className={`px-2 py-1 rounded text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap ${
                mobileView === 'events'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              📋 Events
            </button>

            {/* Game Controls */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Fullscreen Toggle - Mobile Only (if supported) */}
              {supportsFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="md:hidden px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] font-medium transition-colors whitespace-nowrap"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? '⬇️' : '⬆️'}
                </button>
              )}
              <button
                onClick={() => setEndsSwapped(!endsSwapped)}
                className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] md:text-xs font-medium transition-colors whitespace-nowrap"
                title="Change which end is offensive/defensive"
              >
                🔄 Change Ends
              </button>
              <button
                onClick={handleEndPeriodClick}
                disabled={gameState.period > 4 || isGameCompleted}
                className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] md:text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isGameCompleted ? 'Ended ✓' : gameState.period === 4 ? 'End OT' : `End P${gameState.period}`}
              </button>
              <button
                onClick={handleNewGameClick}
                disabled={creatingGame}
                className="px-2 py-1 bg-purple-500/80 hover:bg-purple-600 rounded text-[10px] md:text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                🆕 New
              </button>
            </div>

            <div className="flex items-center gap-2 landscape:gap-1">
              <div className="text-right">
                <div className="text-xs text-blue-100 font-semibold">
                  {gameState.period === 4 ? 'Overtime' : `Period ${gameState.period}`}
                </div>
                <div className="text-xl md:text-2xl font-bold landscape:text-base">
                  {gameState.score.us}-{gameState.score.them}
                </div>
              </div>
              {gameInfo && (
                <button
                  onClick={handleEditGameInfo}
                  className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs landscape:px-1 landscape:text-[10px]"
                  title="Edit"
                >
                  ✏️
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded landscape:px-1 landscape:text-[10px]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Edit Game Info Modal - Only shown when editing */}
        {isEditingGameInfo && gameInfo && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Edit Game Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opponent Name *
                  </label>
                  <input
                    type="text"
                    value={editOpponentName}
                    onChange={(e) => setEditOpponentName(e.target.value)}
                    placeholder="e.g., Hawks, Red Wings"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={savingGameInfo}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g., Home Arena, Away Rink"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={savingGameInfo}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleSaveGameInfo}
                  disabled={savingGameInfo || !editOpponentName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingGameInfo ? 'Saving...' : '💾 Save'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={savingGameInfo}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Game Modal */}
        {showNewGameForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Create New Game</h3>
              <form onSubmit={handleCreateGame} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opponent Name *
                  </label>
                  <input
                    type="text"
                    value={newGameOpponent}
                    onChange={(e) => setNewGameOpponent(e.target.value)}
                    placeholder="e.g., Hawks, Red Wings"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={creatingGame}
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    value={newGameLocation}
                    onChange={(e) => setNewGameLocation(e.target.value)}
                    placeholder="e.g., Home Arena, Away Rink"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={creatingGame}
                  />
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={creatingGame || !newGameOpponent.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creatingGame ? 'Creating...' : 'Create Game'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewGameForm(false)}
                    disabled={creatingGame}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Period End Confirmation Modal */}
        {showPeriodEndConfirm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">
                End {gameState.period === 4 ? 'Overtime' : `Period ${gameState.period}`}?
              </h3>
              <p className="text-gray-600 mb-6">
                {gameState.period === 4 ? (
                  'End overtime and complete the game?'
                ) : (
                  `End period ${gameState.period} and continue to ${
                    gameState.period === 1 ? 'period 2' : gameState.period === 2 ? 'period 3' : 'the next period'
                  }?`
                )}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleConfirmEndPeriod}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Yes, End Period
                </button>
                <button
                  onClick={() => setShowPeriodEndConfirm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Period 3 End: Overtime or End Game Dialog */}
        {showPeriod3EndDialog && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Period 3 Complete</h3>
              <p className="text-gray-600 mb-6">
                Is this the end of the game, or will there be overtime?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handlePeriod3Choice('end')}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-left"
                >
                  <div className="font-semibold">End Game</div>
                  <div className="text-sm text-green-100">Game is complete</div>
                </button>
                <button
                  onClick={() => handlePeriod3Choice('overtime')}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-left"
                >
                  <div className="font-semibold">Overtime</div>
                  <div className="text-sm text-blue-100">Continue to overtime period</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Layout - Toggle-based view */}
        <div className="h-[calc(100vh-48px)]">
          {/* Ice Surface - Shown when ice view is selected */}
          <div className={`h-full overflow-auto p-3 ${
            mobileView === 'ice' ? 'block' : 'hidden'
          }`}>
            <EventLogger endsSwapped={endsSwapped} />
          </div>

          {/* Recent Events - Shown when events view is selected */}
          <div className={`h-full overflow-auto p-3 ${
            mobileView === 'events' ? 'block' : 'hidden'
          }`}>
            <RecentEventsList />
          </div>

          {/* Right Sidebar - No longer used (toggle replaces it) */}
          <div className="hidden">
            {/* Game Completed Message */}
            {isGameCompleted && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-2">
                <div className="flex items-start gap-1">
                  <span className="text-lg">🏁</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-yellow-900 text-xs mb-0.5">
                      Game Ended
                    </h3>
                    <p className="text-[10px] text-yellow-800 leading-tight">
                      Start a new game to add events
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Event Buttons - Top of sidebar in landscape */}
            {!isGameCompleted && (
              <div className="bg-white rounded-lg shadow p-2">
                <h3 className="text-xs font-medium text-gray-700 mb-2">Log Event</h3>
                <QuickEventButtons
                  onEventSelect={(eventType, prefilledDetails) => {
                    useGameTrackingStore.getState().startEventLogging(eventType as any, undefined, prefilledDetails)
                  }}
                  showIcons={true}
                  sidebarMode={true}
                  selectedEventType={loggingFlow.step !== 'idle' ? loggingFlow.eventType : null}
                />
              </div>
            )}

            {/* Recent Events */}
            <RecentEventsList />
          </div>
        </div>

        {/* Feature Highlights - Hidden on mobile for space */}
        <div className="hidden lg:block mt-8 bg-white rounded-lg shadow-lg p-6">
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

        {/* Workflow Info - Hidden on mobile for space */}
        <div className="hidden lg:block mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
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

        {/* Next Steps - Hidden on mobile for space */}
        <div className="hidden lg:block mt-8 bg-white rounded-lg shadow-lg p-6">
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
