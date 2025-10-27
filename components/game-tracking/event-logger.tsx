'use client'

import React from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { IceSurface } from './ice-surface'
import { PlayerSelector } from './player-selector'
import { QuickEventButtons } from './quick-event-buttons'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'
import type { ShotResult } from '@/lib/stores/game-tracking-store'

export interface EventLoggerProps {
  width?: number
  height?: number
  showZones?: boolean
  showSlot?: boolean
}

export function EventLogger({
  width = 600,
  height = 300,
  showZones = true,
  showSlot = true,
}: EventLoggerProps) {
  const {
    loggingFlow,
    players,
    events,
    startEventLogging,
    setCoordinates,
    setPlayer,
    setEventDetails,
    completeEvent,
    cancelEventLogging,
  } = useGameTrackingStore()

  // Handle ice surface click
  const handleIceClick = (coords: Coordinates) => {
    if (loggingFlow.step === 'select_location') {
      setCoordinates(coords)
    }
  }

  // Handle event type selection
  const handleEventTypeSelect = (eventType: string) => {
    startEventLogging(eventType as any)
  }

  // Handle player selection
  const handlePlayerSelect = (playerId: string) => {
    setPlayer(playerId)

    // If this is not a shot, complete immediately
    if (loggingFlow.eventType !== 'shot' && loggingFlow.eventType !== 'goal') {
      // Auto-complete for non-shot events
      setTimeout(() => {
        completeEvent()
      }, 100)
    }
  }

  // Handle shot result selection
  const handleShotResultSelect = (result: ShotResult) => {
    setEventDetails({ result })
    completeEvent()
  }

  // Render based on current step
  const renderContent = () => {
    switch (loggingFlow.step) {
      case 'idle':
        return (
          <div className="space-y-6">
            {/* Ice Surface for visualization */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ice Surface</h3>
              <div className="flex justify-center">
                <IceSurface
                  width={width}
                  height={height}
                  showZones={showZones}
                  showSlot={showSlot}
                  events={events.map((e) => ({
                    id: e.id,
                    x: e.coordinates?.x || 0,
                    y: e.coordinates?.y || 0,
                    type: e.eventType as any,
                  }))}
                />
              </div>
            </div>

            {/* Quick Event Buttons */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Log Event</h3>
              <QuickEventButtons onEventSelect={handleEventTypeSelect} />
            </div>
          </div>
        )

      case 'select_location':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-medium">
                Tap the ice surface where the {loggingFlow.eventType} occurred
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-center">
                <IceSurface
                  width={width}
                  height={height}
                  onClick={handleIceClick}
                  showZones={showZones}
                  showSlot={showSlot}
                  events={events.map((e) => ({
                    id: e.id,
                    x: e.coordinates?.x || 0,
                    y: e.coordinates?.y || 0,
                    type: e.eventType as any,
                  }))}
                />
              </div>
            </div>

            <button
              onClick={cancelEventLogging}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        )

      case 'select_player':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-medium">
                Select player for {loggingFlow.eventType}
              </p>
              {loggingFlow.coordinates && (
                <p className="text-sm text-blue-700 mt-1">
                  Location: ({loggingFlow.coordinates.x}, {loggingFlow.coordinates.y})
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <PlayerSelector
                players={players}
                onSelect={handlePlayerSelect}
                onCancel={cancelEventLogging}
                quickSelect={true}
              />
            </div>
          </div>
        )

      case 'select_details':
        // Shot result selection
        if (loggingFlow.eventType === 'shot' || loggingFlow.eventType === 'goal') {
          return (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 font-medium">Select shot result</p>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleShotResultSelect('goal')}
                    className="py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow"
                  >
                    Goal
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('save')}
                    className="py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('miss_wide')}
                    className="py-4 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow"
                  >
                    Miss Wide
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('miss_high')}
                    className="py-4 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow"
                  >
                    Miss High
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('blocked')}
                    className="py-4 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow"
                  >
                    Blocked
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('post')}
                    className="py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow"
                  >
                    Post
                  </button>
                </div>

                <button
                  onClick={cancelEventLogging}
                  className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        }
        return null

      default:
        return null
    }
  }

  return <div className="w-full">{renderContent()}</div>
}
