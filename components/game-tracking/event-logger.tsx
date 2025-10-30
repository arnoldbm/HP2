'use client'

import React, { useState, useEffect } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import { IceSurface } from './ice-surface'
import { PlayerSelector } from './player-selector'
import { QuickEventButtons } from './quick-event-buttons'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'
import type { ShotResult } from '@/lib/stores/game-tracking-store'

export interface EventLoggerProps {
  showZones?: boolean
  showSlot?: boolean
  // Remove fixed width/height props - now fully responsive
}

export function EventLogger({
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

  // Control bottom sheet for player selection
  const [showPlayerSheet, setShowPlayerSheet] = useState(false)

  // Open player selection bottom sheet when step changes to select_player
  useEffect(() => {
    if (loggingFlow.step === 'select_player') {
      setShowPlayerSheet(true)
    } else {
      setShowPlayerSheet(false)
    }
  }, [loggingFlow.step])

  // Handle ice surface click
  const handleIceClick = (coords: Coordinates) => {
    if (loggingFlow.step === 'select_location') {
      setCoordinates(coords)
    }
  }

  // Handle event type selection
  const handleEventTypeSelect = (eventType: string, prefilledDetails?: Record<string, unknown>) => {
    startEventLogging(eventType as any, undefined, prefilledDetails)
  }

  // Handle player selection
  const handlePlayerSelect = (playerId: string) => {
    setPlayer(playerId)
    setShowPlayerSheet(false) // Close the bottom sheet

    // If this is not a shot, complete immediately
    // For shots with pre-filled result (like goal), also complete immediately
    if (loggingFlow.eventType !== 'shot' || loggingFlow.details.result) {
      // Auto-complete for non-shot events or shots with result already set
      setTimeout(() => {
        completeEvent()
      }, 100)
    }
  }

  // Handle bottom sheet close
  const handlePlayerSheetClose = () => {
    setShowPlayerSheet(false)
    cancelEventLogging()
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
          <div className="space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col">
            {/* Ice Surface for visualization - Maximum size */}
            <div className="bg-white rounded-lg shadow p-2 md:p-3 landscape:p-1.5 landscape:flex-1 landscape:min-h-0">
              <div className="w-full landscape:h-full landscape:flex landscape:items-center landscape:justify-center">
                <IceSurface
                  showZones={showZones}
                  showSlot={showSlot}
                  responsive={true}
                  events={events.map((e) => ({
                    id: e.id,
                    x: e.coordinates?.x || 0,
                    y: e.coordinates?.y || 0,
                    type: e.eventType as any,
                  }))}
                />
              </div>
            </div>

            {/* Quick Event Buttons - Below ice surface in portrait only (hidden in landscape, shown in sidebar) */}
            <div className="bg-white rounded-lg shadow p-2 md:p-3 landscape:hidden">
              <h3 className="text-xs font-medium text-gray-700 mb-2">Log Event</h3>
              <QuickEventButtons onEventSelect={handleEventTypeSelect} showIcons={true} />
            </div>
          </div>
        )

      case 'select_location':
        return (
          <div className="space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col">
            {/* Prompt - Hidden in landscape, shown in portrait */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden">
              <p className="text-blue-900 font-medium text-xs md:text-sm">
                Tap the ice surface where the {loggingFlow.eventType} occurred
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-2 md:p-3 landscape:p-1.5 landscape:flex-1 landscape:min-h-0">
              <div className="w-full landscape:h-full landscape:flex landscape:items-center landscape:justify-center">
                <IceSurface
                  onClick={handleIceClick}
                  showZones={showZones}
                  showSlot={showSlot}
                  responsive={true}
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
              className="w-full py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium landscape:hidden"
            >
              Cancel
            </button>
          </div>
        )

      case 'select_player':
        // Player selection now happens in bottom sheet
        // Show the ice surface with a prompt
        return (
          <div className="space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col">
            {/* Prompt - Hidden in landscape, shown in portrait */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden">
              <p className="text-blue-900 font-medium text-xs md:text-sm">
                Selecting player for {loggingFlow.eventType}...
              </p>
              {loggingFlow.coordinates && (
                <p className="text-xs text-blue-700 mt-1">
                  Location: ({loggingFlow.coordinates.x.toFixed(0)}, {loggingFlow.coordinates.y.toFixed(0)})
                </p>
              )}
            </div>

            {/* Show ice surface with events in background */}
            <div className="bg-white rounded-lg shadow p-2 md:p-3 opacity-50 landscape:opacity-100 landscape:p-1.5 landscape:flex-1 landscape:min-h-0">
              <div className="w-full landscape:h-full landscape:flex landscape:items-center landscape:justify-center">
                <IceSurface
                  showZones={showZones}
                  showSlot={showSlot}
                  responsive={true}
                  events={events.map((e) => ({
                    id: e.id,
                    x: e.coordinates?.x || 0,
                    y: e.coordinates?.y || 0,
                    type: e.eventType as any,
                  }))}
                />
              </div>
            </div>
          </div>
        )

      case 'select_details':
        // Shot result selection
        if (loggingFlow.eventType === 'shot' || loggingFlow.eventType === 'goal') {
          return (
            <div className="space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col landscape:justify-center">
              {/* Prompt - Hidden in landscape, shown in portrait */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden">
                <p className="text-blue-900 font-medium text-xs md:text-sm">Select shot result</p>
              </div>

              <div className="bg-white rounded-lg shadow p-2 md:p-3 landscape:p-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleShotResultSelect('goal')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Goal
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('save')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('miss_wide')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Miss Wide
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('miss_high')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Miss High
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('blocked')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Blocked
                  </button>
                  <button
                    onClick={() => handleShotResultSelect('post')}
                    className="py-4 md:py-5 px-3 md:px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-lg shadow transition-colors touch-manipulation text-sm md:text-base"
                  >
                    Post
                  </button>
                </div>

                <button
                  onClick={cancelEventLogging}
                  className="w-full mt-2 py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium landscape:hidden"
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

  return (
    <>
      <div className="w-full">{renderContent()}</div>

      {/* Bottom Sheet for Player Selection */}
      <BottomSheet
        isOpen={showPlayerSheet}
        onClose={handlePlayerSheetClose}
        title="Select Player"
        snapPoint={70}
        showHandle={true}
        closeOnBackdropClick={true}
      >
        <PlayerSelector
          players={players}
          onSelect={handlePlayerSelect}
          quickSelect={true}
        />
      </BottomSheet>
    </>
  )
}
