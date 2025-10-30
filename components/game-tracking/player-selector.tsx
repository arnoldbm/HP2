'use client'

import React from 'react'
import type { Player } from '@/lib/stores/game-tracking-store'

export interface PlayerSelectorProps {
  players: Player[]
  onSelect: (playerId: string) => void
  onCancel?: () => void
  title?: string
  filterPosition?: 'forward' | 'defense' | 'goalie'
  quickSelect?: boolean
}

export function PlayerSelector({
  players,
  onSelect,
  onCancel,
  title = 'Select Player',
  filterPosition,
  quickSelect = false,
}: PlayerSelectorProps) {
  // Filter players by position if specified
  const filteredPlayers = filterPosition
    ? players.filter((p) => p.position === filterPosition)
    : players

  // Sort by jersey number
  const sortedPlayers = [...filteredPlayers].sort(
    (a, b) => a.jerseyNumber - b.jerseyNumber
  )

  if (players.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No players available</p>
        {onCancel && (
          <button
            onClick={onCancel}
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Title - Only show if not in modal/sheet with title */}
      {!quickSelect && title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      {/* Player Grid - Optimized for mobile touch */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3 p-4">
        {sortedPlayers.map((player) => (
          <button
            key={player.id}
            onClick={() => onSelect(player.id)}
            className={`
              flex flex-col items-center justify-center
              p-3 md:p-4 rounded-lg border-2 border-gray-300
              hover:border-blue-500 hover:bg-blue-50
              active:bg-blue-100 active:border-blue-600
              transition-all duration-150
              touch-manipulation
              ${quickSelect ? 'min-h-[88px]' : 'min-h-[80px]'}
            `}
            aria-label={`Player ${player.jerseyNumber} ${player.lastName}`}
          >
            {/* Jersey Number - Larger on mobile for easier scanning */}
            <span
              className={`
                font-bold text-gray-900
                ${quickSelect ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}
              `}
            >
              {player.jerseyNumber}
            </span>

            {/* Player Name */}
            <span className="text-xs md:text-sm text-gray-600 mt-1 text-center truncate w-full px-1">
              {player.lastName}
            </span>

            {/* Position Badge */}
            <span
              className={`
                text-[10px] md:text-xs uppercase font-medium mt-1
                ${
                  player.position === 'forward'
                    ? 'text-blue-600'
                    : player.position === 'defense'
                      ? 'text-green-600'
                      : 'text-purple-600'
                }
              `}
            >
              {player.position[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Cancel Button - Hidden when using bottom sheet (bottom sheet has its own close) */}
      {onCancel && !quickSelect && (
        <div className="mt-4 mb-4 flex justify-center px-4">
          <button
            onClick={onCancel}
            className="w-full md:w-auto px-6 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
