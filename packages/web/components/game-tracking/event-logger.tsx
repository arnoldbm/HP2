'use client'

import React, { useState, useEffect } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store-configured'
import { IceSurface } from './ice-surface'
import { PlayerSelector } from './player-selector'
import { QuickEventButtons } from './quick-event-buttons'
import { EventContextDialog } from './event-context-dialog'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'
import type { ShotResult, EventType } from '@/lib/stores/game-tracking-store-configured'
import type { EventDetails } from '@hockeypilot/shared'

export interface EventLoggerProps {
  showZones?: boolean
  showSlot?: boolean
  endsSwapped?: boolean
  // Remove fixed width/height props - now fully responsive
}

export function EventLogger({
  showZones = true,
  showSlot = true,
  endsSwapped = false,
}: EventLoggerProps) {
  const {
    gameState,
    loggingFlow,
    players,
    events,
    startEventLogging,
    startLocationFirst,
    setCoordinates,
    setEventType,
    setPlayer,
    setEventDetails,
    completeEvent,
    cancelEventLogging,
  } = useGameTrackingStore()

  // Filter events to only show current period
  const currentPeriodEvents = events.filter(e => e.period === gameState.period)

  // Coordinate transformation for swapped ends
  const transformCoords = (coords: Coordinates): Coordinates => {
    if (!endsSwapped) return coords
    return { x: 200 - coords.x, y: coords.y }
  }

  // Inverse transformation (when user clicks to log event)
  const inverseTransformCoords = (coords: Coordinates): Coordinates => {
    if (!endsSwapped) return coords
    return { x: 200 - coords.x, y: coords.y }
  }

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
    if (loggingFlow.step === 'idle' || loggingFlow.step === 'select_location') {
      // Transform coordinates if ends are swapped (convert back to canonical form)
      const canonicalCoords = inverseTransformCoords(coords)

      // If in idle state, start the location-first flow
      if (loggingFlow.step === 'idle') {
        startLocationFirst()
      }

      // Set the coordinates
      setCoordinates(canonicalCoords)
    }
  }

  // Handle event type selection
  const handleEventTypeSelect = (eventType: string, prefilledDetails?: Record<string, unknown>) => {
    // If we're in the select_event_type step (after clicking ice), use setEventType
    if (loggingFlow.step === 'select_event_type') {
      setEventType(eventType as any, prefilledDetails)
    } else {
      // Old flow: start with event type first
      startEventLogging(eventType as any, undefined, prefilledDetails)
    }
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

  // Handle context details completion
  const handleContextComplete = (details: EventDetails) => {
    setEventDetails(details)
    completeEvent()
  }

  // State for controlling context dialog
  const [showContextDialog, setShowContextDialog] = useState(false)

  // Show context dialog when step changes to select_details
  useEffect(() => {
    if (loggingFlow.step === 'select_details') {
      setShowContextDialog(true)
    } else {
      setShowContextDialog(false)
    }
  }, [loggingFlow.step])

  // Check if game is completed
  const isGameCompleted = gameState.status === 'completed'

  // Render based on current step
  const renderContent = () => {
    switch (loggingFlow.step) {
      case 'idle':
        return (
          <div className="h-full flex flex-col">
            {/* Game Completed Message */}
            {isGameCompleted && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 md:p-4 mb-2">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🏁</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-yellow-900 text-sm md:text-base mb-1">
                      Game Ended
                    </h3>
                    <p className="text-xs md:text-sm text-yellow-800">
                      This game has been ended. You cannot add new events to a completed game.
                      Use the "New Game" button to start tracking a new game.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ice Surface - Clickable and fills remaining space */}
            <div className={`${isGameCompleted ? 'flex-1' : 'h-full'} bg-white rounded-lg shadow p-2 md:p-3 min-h-0`}>
              <div className="w-full h-full flex items-center justify-center">
                <IceSurface
                  onClick={!isGameCompleted ? handleIceClick : undefined}
                  showZones={showZones}
                  showSlot={showSlot}
                  responsive={true}
                  endsSwapped={endsSwapped}
                  events={currentPeriodEvents.map((e) => {
                    const coords = e.coordinates ? transformCoords(e.coordinates) : { x: 0, y: 0 }
                    return {
                      id: e.id,
                      x: coords.x,
                      y: coords.y,
                      type: e.eventType as any,
                    }
                  })}
                />
              </div>
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
                  endsSwapped={endsSwapped}
                  events={currentPeriodEvents.map((e) => {
                    const coords = e.coordinates ? transformCoords(e.coordinates) : { x: 0, y: 0 }
                    return {
                      id: e.id,
                      x: coords.x,
                      y: coords.y,
                      type: e.eventType as any,
                    }
                  })}
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

      case 'select_event_type':
        return (
          <div className="h-full flex flex-col">
            {/* Prompt */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 mb-2">
              <p className="text-blue-900 font-medium text-xs md:text-sm text-center">
                What type of event occurred?
              </p>
              {loggingFlow.coordinates && (
                <p className="text-xs text-blue-700 mt-1 text-center">
                  Location: ({loggingFlow.coordinates.x.toFixed(0)}, {loggingFlow.coordinates.y.toFixed(0)})
                </p>
              )}
            </div>

            {/* Event Type Buttons */}
            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <QuickEventButtons onEventSelect={handleEventTypeSelect} showIcons={true} />
            </div>

            {/* Cancel Button */}
            <button
              onClick={cancelEventLogging}
              className="mt-2 w-full py-2 text-xs md:text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>

            {/* Ice Surface in background - smaller, for reference */}
            <div className="flex-1 mt-2 bg-white rounded-lg shadow p-2 opacity-50 min-h-0">
              <div className="w-full h-full flex items-center justify-center">
                <IceSurface
                  showZones={showZones}
                  showSlot={showSlot}
                  responsive={true}
                  endsSwapped={endsSwapped}
                  events={currentPeriodEvents.map((e) => {
                    const coords = e.coordinates ? transformCoords(e.coordinates) : { x: 0, y: 0 }
                    return {
                      id: e.id,
                      x: coords.x,
                      y: coords.y,
                      type: e.eventType as any,
                    }
                  })}
                />
              </div>
            </div>
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
                  endsSwapped={endsSwapped}
                  events={currentPeriodEvents.map((e) => {
                    const coords = e.coordinates ? transformCoords(e.coordinates) : { x: 0, y: 0 }
                    return {
                      id: e.id,
                      x: coords.x,
                      y: coords.y,
                      type: e.eventType as any,
                    }
                  })}
                />
              </div>
            </div>
          </div>
        )

      case 'select_details':
        // Context details selection (handled by EventContextDialog)
        // Show ice surface in background
        return (
          <div className="space-y-2 md:space-y-3 landscape:h-full landscape:flex landscape:flex-col">
            {/* Prompt - Hidden in landscape, shown in portrait */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 landscape:hidden">
              <p className="text-blue-900 font-medium text-xs md:text-sm">
                Collecting event details...
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
                  endsSwapped={endsSwapped}
                  events={currentPeriodEvents.map((e) => {
                    const coords = e.coordinates ? transformCoords(e.coordinates) : { x: 0, y: 0 }
                    return {
                      id: e.id,
                      x: coords.x,
                      y: coords.y,
                      type: e.eventType as any,
                    }
                  })}
                />
              </div>
            </div>
          </div>
        )

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

      {/* Event Context Dialog */}
      {loggingFlow.eventType && (
        <EventContextDialog
          open={showContextDialog}
          eventType={loggingFlow.eventType as EventType}
          onComplete={handleContextComplete}
          onCancel={cancelEventLogging}
        />
      )}
    </>
  )
}
