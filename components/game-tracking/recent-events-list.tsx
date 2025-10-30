'use client'

import React from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { SwipeableItem } from '@/components/ui/swipeable-item'

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
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold">Recent Events</h2>
        <button
          onClick={undoLastEvent}
          className="px-3 py-2 md:py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors touch-manipulation"
        >
          Undo Last
        </button>
      </div>

      {/* Hint for mobile users */}
      <div className="md:hidden text-xs text-gray-500 mb-3 text-center">
        👈 Swipe left on any event to delete
      </div>

      <div className="space-y-2">
        {recentEvents.map((event) => (
          <SwipeableItem
            key={event.id}
            onSwipeLeft={() => deleteEvent(event.id)}
            leftAction={{
              label: 'Delete',
              icon: '🗑️',
              color: 'bg-red-500',
            }}
            threshold={80}
            className="rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border border-gray-200 bg-white">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getEventColor(
                      event.eventType
                    )}`}
                  >
                    {event.eventType.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    P{event.period} • {Math.floor(event.gameTimeSeconds / 60)}:
                    {(event.gameTimeSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-700 truncate">{formatEventDetails(event)}</p>
              </div>

              {/* Delete button - hidden on mobile (use swipe), visible on desktop */}
              <button
                onClick={() => deleteEvent(event.id)}
                className="hidden md:block ml-4 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
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
          </SwipeableItem>
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
