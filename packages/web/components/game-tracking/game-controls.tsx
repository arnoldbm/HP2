'use client'

import React, { useState } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store-configured'
import { supabase } from '@/lib/db/supabase'

export function GameControls() {
  const { gameState, setGameState, events, loadEvents } = useGameTrackingStore()
  const [creatingGame, setCreatingGame] = useState(false)
  const [showNewGameForm, setShowNewGameForm] = useState(false)
  const [opponentName, setOpponentName] = useState('')
  const [location, setLocation] = useState('')

  const isGameCompleted = gameState.status === 'completed'

  const handleEndPeriod = () => {
    if (gameState.period < 3) {
      setGameState({ period: gameState.period + 1 })
    } else {
      alert('Game is over! (Period 3 complete)')
    }
  }

  const handleEndGame = async () => {
    if (!gameState.gameId) return

    if (confirm('Are you sure you want to end the game? You can still view analytics but cannot add new events.')) {
      try {
        // Update game status to completed in database
        const { error } = await supabase
          .from('games')
          .update({ status: 'completed' })
          .eq('id', gameState.gameId)

        if (error) throw error

        // Update local game state
        setGameState({ status: 'completed' })

        alert('Game ended! Go to Analytics page to view post-game data and generate AI practice plan.')
      } catch (error) {
        console.error('❌ Error ending game:', error)
        alert('Failed to end game. Please try again.')
      }
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
        status: 'in_progress',
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
    <div className="bg-white rounded-lg shadow p-2 md:p-3">
      <h3 className="text-xs font-semibold text-gray-900 mb-2">Game Controls</h3>
      <div className="space-y-2">
        {/* Period/Game controls */}
        <div className="flex gap-2">
          <button
            onClick={handleEndPeriod}
            disabled={gameState.period >= 3 || isGameCompleted}
            className="flex-1 px-2 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gameState.period >= 3 ? 'P3 Done' : `End P${gameState.period}`}
          </button>
          <button
            onClick={handleEndGame}
            disabled={isGameCompleted}
            className="flex-1 px-2 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGameCompleted ? 'Ended' : 'End Game'}
          </button>
        </div>

        {/* New Game button/form */}
        {!showNewGameForm ? (
          <button
            onClick={handleNewGameClick}
            disabled={creatingGame}
            className="w-full px-2 py-1.5 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🆕 New Game
          </button>
        ) : (
          <form onSubmit={handleCreateGame} className="bg-purple-50 border border-purple-200 rounded p-2 space-y-2">
            <h4 className="text-xs font-semibold text-purple-900">New Game</h4>

            <div>
              <input
                type="text"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                placeholder="Opponent *"
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                autoFocus
                required
              />
            </div>

            <div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (optional)"
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-1.5">
              <button
                type="submit"
                disabled={creatingGame}
                className="flex-1 px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {creatingGame ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewGameForm(false)}
                disabled={creatingGame}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
