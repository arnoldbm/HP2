'use client'

import { useState } from 'react'
import { SwipeableItem } from '@/components/ui/swipeable-item'
import { formatPosition, getPositionAbbreviation } from '@/lib/validation/player-schemas'

interface Player {
  id: string
  jersey_number: number
  first_name: string
  last_name: string
  position: 'forward' | 'defense' | 'goalie'
  birthdate?: string | null
}

interface RosterListProps {
  players: Player[]
  onEdit: (player: Player) => void
  onDelete: (playerId: string) => void
}

export function RosterList({ players, onEdit, onDelete }: RosterListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (playerId: string) => {
    if (confirm('Are you sure you want to remove this player from the roster?')) {
      setDeletingId(playerId)
      try {
        await onDelete(playerId)
      } finally {
        setDeletingId(null)
      }
    }
  }

  if (players.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">No players yet</h3>
        <p className="text-gray-500">Add your first player to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Mobile: Swipeable Cards */}
      <div className="md:hidden">
        {players.map((player) => (
          <SwipeableItem key={player.id} onDelete={() => handleDelete(player.id)}>
            <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">#{player.jersey_number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-gray-900 truncate">
                  {player.first_name} {player.last_name}
                </h4>
                <p className="text-sm text-gray-500">{formatPosition(player.position)}</p>
              </div>
              <button
                onClick={() => onEdit(player)}
                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </SwipeableItem>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                    {player.jersey_number}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {player.first_name} {player.last_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getPositionAbbreviation(player.position)} - {formatPosition(player.position)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => onEdit(player)}
                    className="text-blue-600 hover:text-blue-900"
                    disabled={deletingId === player.id}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={deletingId === player.id}
                  >
                    {deletingId === player.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
