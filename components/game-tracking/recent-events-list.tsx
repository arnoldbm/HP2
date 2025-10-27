'use client'

import React from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'

export function RecentEventsList() {
  const { events, players, undoLastEvent, deleteEvent } = useGameTrackingStore()

  // Get last 10 events in reverse chronological order
  const recentEvents = [...events].reverse().slice(0, 10)

  const getPlayerName = (playerId: string | undefined) => {
    if (!playerId) return 'Unknown'
    const player = players.find((p) => p.id === playerId)
    return player ? `#${player.jerseyNumber} ${player.lastName}` : 'Unknown'
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'shot':
      case 'goal':
        return 'bg-blue-100 text-blue-800'
      case 'turnover':
        return 'bg-red-100 text-red-800'
      case 'breakout':
        return 'bg-green-100 text-green-800'
      case 'zone_entry':
        return 'bg-amber-100 text-amber-800'
      case 'faceoff':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatEventDetails = (event: any) => {
    const parts: string[] = []

    if (event.playerId) {
      parts.push(getPlayerName(event.playerId))
    }

    if (event.coordinates) {
      parts.push(`(${event.coordinates.x}, ${event.coordinates.y})`)
    }

    if (event.details.result) {
      parts.push(event.details.result)
    }

    if (event.details.success !== undefined) {
      parts.push(event.details.success ? '✓ Success' : '✗ Failed')
    }

    return parts.join(' • ')
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Events</h2>
        <p className="text-center text-gray-500 py-8">No events logged yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Events</h2>
        <button
          onClick={undoLastEvent}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Undo Last
        </button>
      </div>

      <div className="space-y-2">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${getEventColor(
                    event.eventType
                  )}`}
                >
                  {event.eventType.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  P{event.period} • {Math.floor(event.gameTimeSeconds / 60)}:
                  {(event.gameTimeSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm text-gray-700">{formatEventDetails(event)}</p>
            </div>

            <button
              onClick={() => deleteEvent(event.id)}
              className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
              aria-label="Delete event"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {events.length > 10 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Showing last 10 of {events.length} events
        </p>
      )}
    </div>
  )
}
