'use client'

import React, { useState } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store-configured'
import { supabase } from '@/lib/db/supabase'

export function LiveStats() {
  const { gameState, setGameState, getShotStats, getBreakoutStats, events, loadEvents } = useGameTrackingStore()
  const [creatingGame, setCreatingGame] = useState(false)
  const [showNewGameForm, setShowNewGameForm] = useState(false)
  const [opponentName, setOpponentName] = useState('')
  const [location, setLocation] = useState('')
  const [isExpanded, setIsExpanded] = useState(false) // Collapsed by default on mobile

  const shotStats = getShotStats()
  const breakoutStats = getBreakoutStats()

  const turnovers = events.filter((e) => e.eventType === 'turnover').length
  const zoneEntries = events.filter((e) => e.eventType === 'zone_entry').length
  const faceoffs = events.filter((e) => e.eventType === 'faceoff').length

  const handleEndPeriod = () => {
    if (gameState.period < 3) {
      setGameState({ period: gameState.period + 1 })
    } else {
      alert('Game is over! (Period 3 complete)')
    }
  }

  const handleEndGame = () => {
    if (confirm('Are you sure you want to end the game? You can still view analytics.')) {
      // Just mark period as complete - in a real app we'd update game status in DB
      alert('Game ended! Go to Analytics page to view post-game data and generate AI practice plan.')
    }
  }

  const handleNewGameClick = () => {
    if (events.length > 0) {
      const confirmed = confirm(
        'Starting a new game will save the current game and start fresh. Continue?'
      )
      if (!confirmed) return
    }
    setOpponentName('')
    setLocation('')
    setShowNewGameForm(true)
  }

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!opponentName.trim()) {
      alert('Please enter an opponent name')
      return
    }

    try {
      setCreatingGame(true)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please sign in to create a new game')
        return
      }

      // Get user's team
      const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .single()

      if (!teamMember) {
        alert('No team found for user')
        return
      }

      // Create new game
      const { data: newGame, error } = await supabase
        .from('games')
        .insert({
          team_id: teamMember.team_id,
          opponent_name: opponentName.trim(),
          game_date: new Date().toISOString(),
          location: location.trim() !== '' ? location.trim() : null,
          status: 'scheduled',
        })
        .select()
        .single()

      if (error) throw error

      console.log('✅ New game created:', newGame.id, 'vs', opponentName)

      // Store the new game ID in localStorage (user-specific)
      const storageKey = `current_game_${user.id}`
      localStorage.setItem(storageKey, newGame.id)

      // Reset game state with new game ID
      setGameState({
        gameId: newGame.id,
        period: 1,
        gameTimeSeconds: 1200,
        score: { us: 0, them: 0 },
        situation: 'even_strength',
      })

      // Load events (should be empty for new game)
      await loadEvents(newGame.id)

      // Close form and reset
      setShowNewGameForm(false)
      setOpponentName('')
      setLocation('')

      alert(`New game created vs ${opponentName.trim()}! Ready to track events.`)
    } catch (error) {
      console.error('❌ Error creating new game:', error)
      alert('Failed to create new game. Please try again.')
    } finally {
      setCreatingGame(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header with expand/collapse button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">Live Stats</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          aria-label={isExpanded ? 'Collapse stats' : 'Expand stats'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Period and Score - Always visible */}
      <div className="mb-4 p-3 md:p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs md:text-sm text-gray-600">Period</span>
            <p className="text-xl md:text-2xl font-bold">{gameState.period}</p>
          </div>
          <div className="text-center">
            <span className="text-xs md:text-sm text-gray-600">Score</span>
            <p className="text-2xl md:text-3xl font-bold">
              {gameState.score.us} - {gameState.score.them}
            </p>
          </div>
          <div>
            <span className="text-xs md:text-sm text-gray-600">Situation</span>
            <p className="text-xs md:text-sm font-medium capitalize">{gameState.situation.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Collapsed Summary - Mobile only */}
      {!isExpanded && (
        <div className="md:hidden text-sm text-gray-600 mb-4 flex items-center gap-4">
          <span>Shots: <strong className="text-gray-900">{shotStats.total}</strong></span>
          <span>Events: <strong className="text-gray-900">{events.length}</strong></span>
          <span className="text-xs text-gray-500">Tap ▼ for details</span>
        </div>
      )}

      {/* Stats Grid - Collapsible on mobile, always visible on desktop */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Shot Stats */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Shots</h3>
          <p className="text-3xl font-bold text-blue-600">{shotStats.total}</p>
          <div className="text-xs text-blue-700 mt-2 space-y-1">
            <div>On Goal: {shotStats.onGoal}</div>
            <div>Goals: {shotStats.goals}</div>
            <div>Saves: {shotStats.saves}</div>
          </div>
        </div>

        {/* Breakout Stats */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-900 mb-2">Breakouts</h3>
          <p className="text-3xl font-bold text-green-600">{breakoutStats.total}</p>
          <div className="text-xs text-green-700 mt-2 space-y-1">
            <div>Success: {breakoutStats.successful}</div>
            <div>Failed: {breakoutStats.failed}</div>
            <div>Rate: {breakoutStats.successRate.toFixed(0)}%</div>
          </div>
        </div>

        {/* Turnover Stats */}
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-red-900 mb-2">Turnovers</h3>
          <p className="text-3xl font-bold text-red-600">{turnovers}</p>
        </div>

        {/* Zone Entry Stats */}
        <div className="p-4 bg-amber-50 rounded-lg">
          <h3 className="text-sm font-medium text-amber-900 mb-2">Zone Entries</h3>
          <p className="text-3xl font-bold text-amber-600">{zoneEntries}</p>
        </div>

        {/* Faceoff Stats */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-purple-900 mb-2">Faceoffs</h3>
          <p className="text-3xl font-bold text-purple-600">{faceoffs}</p>
        </div>

        {/* Total Events */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-gray-700">{events.length}</p>
        </div>
      </div>

      {/* Game Controls - Also collapsible on mobile */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Game Controls</h3>
        <div className="space-y-3">
          {/* Period/Game controls */}
          <div className="flex gap-3">
            <button
              onClick={handleEndPeriod}
              disabled={gameState.period >= 3}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {gameState.period >= 3 ? 'Period 3 Complete' : `End Period ${gameState.period}`}
            </button>
            <button
              onClick={handleEndGame}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              End Game
            </button>
          </div>

          {/* New Game button/form */}
          {!showNewGameForm ? (
            <button
              onClick={handleNewGameClick}
              disabled={creatingGame}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              🆕 Start New Game
            </button>
          ) : (
            <form onSubmit={handleCreateGame} className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-semibold text-purple-900">Create New Game</h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opponent Name *
                </label>
                <input
                  type="text"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  placeholder="e.g., Hawks, Red Wings"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Home Arena, Away Rink"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={creatingGame}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {creatingGame ? 'Creating...' : 'Create Game'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewGameForm(false)}
                  disabled={creatingGame}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>{/* End collapsible section */}
    </div>
  )
}
