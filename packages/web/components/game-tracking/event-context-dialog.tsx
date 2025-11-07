'use client'

/**
 * EventContextDialog Component
 *
 * Dialog component that displays context-specific fields for each event type.
 * Provides quick logging with minimal required fields and optional detailed context.
 */

import React, { useState, useEffect } from 'react'
import type {
  EventType,
  EventDetails,
  ShotDetails,
  BreakoutDetails,
  TurnoverDetails,
  ZoneEntryDetails,
  ZoneExitDetails,
  BlockedShotDetails,
  TakeawayDetails,
  FaceoffDetails,
  PenaltyDetails,
  GoalAgainstDetails,
} from '@hockeypilot/shared'

interface EventContextDialogProps {
  open: boolean
  eventType: EventType
  onComplete: (details: EventDetails) => void
  onCancel: () => void
}

export function EventContextDialog({
  open,
  eventType,
  onComplete,
  onCancel,
}: EventContextDialogProps) {
  // Generic state for all event types
  const [details, setDetails] = useState<Partial<EventDetails>>({})

  // Reset details when event type changes or dialog opens
  useEffect(() => {
    if (open) {
      setDetails({})
    }
  }, [open, eventType])

  const handleComplete = () => {
    onComplete(details as EventDetails)
    setDetails({}) // Reset
  }

  // Don't render if not open (after all hooks to follow Rules of Hooks)
  if (!open) return null

  // ========================================
  // OPTION BUTTON COMPONENT
  // ========================================
  const OptionButton = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`
        min-w-[80px] px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        ${
          selected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      {children}
    </button>
  )

  // ========================================
  // RENDER FIELDS BY EVENT TYPE
  // ========================================
  const renderFields = () => {
    switch (eventType) {
      case 'shot':
        return renderShotFields()
      case 'breakout':
        return renderBreakoutFields()
      case 'turnover':
        return renderTurnoverFields()
      case 'zone_entry':
        return renderZoneEntryFields()
      case 'zone_exit':
        return renderZoneExitFields()
      case 'blocked_shot':
        return renderBlockedShotFields()
      case 'takeaway':
        return renderTakeawayFields()
      case 'faceoff':
        return renderFaceoffFields()
      case 'penalty':
        return renderPenaltyFields()
      case 'goal_against':
        return renderGoalAgainstFields()
      default:
        return null
    }
  }

  // ========================================
  // SHOT FIELDS
  // ========================================
  const renderShotFields = () => {
    const shotDetails = details as Partial<ShotDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Result *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['goal', 'save', 'miss', 'blocked', 'post'] as const).map((result) => (
              <OptionButton
                key={result}
                selected={shotDetails.result === result}
                onClick={() => setDetails({ ...details, result })}
              >
                {result.charAt(0).toUpperCase() + result.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shot Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['wrist', 'backhand', 'slap', 'snap', 'one_timer', 'tip', 'deflection'] as const).map(
              (type) => (
                <OptionButton
                  key={type}
                  selected={shotDetails.shot_type === type}
                  onClick={() => setDetails({ ...details, shot_type: type })}
                >
                  {type.replace('_', ' ')}
                </OptionButton>
              )
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Context (Optional)</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { key: 'rebound', label: 'Rebound' },
              { key: 'rush', label: 'Rush' },
              { key: 'screen', label: 'Screen' },
            ].map(({ key, label }) => (
              <OptionButton
                key={key}
                selected={!!shotDetails[key as keyof ShotDetails]}
                onClick={() =>
                  setDetails({
                    ...details,
                    [key]: !shotDetails[key as keyof ShotDetails],
                  })
                }
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // BREAKOUT FIELDS
  // ========================================
  const renderBreakoutFields = () => {
    const breakoutDetails = details as Partial<BreakoutDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Success *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: true, label: 'Success' },
              { value: false, label: 'Failed' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={breakoutDetails.success === value}
                onClick={() => setDetails({ ...details, success: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['up_boards', 'center_ice', 'd_to_d', 'reverse', 'chip'] as const).map((type) => (
              <OptionButton
                key={type}
                selected={breakoutDetails.breakout_type === type}
                onClick={() => setDetails({ ...details, breakout_type: type })}
              >
                {type.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exit Zone *</label>
          <div className="flex gap-2 mt-2">
            {(['left', 'center', 'right'] as const).map((zone) => (
              <OptionButton
                key={zone}
                selected={breakoutDetails.exit_zone === zone}
                onClick={() => setDetails({ ...details, exit_zone: zone })}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pressure *</label>
          <div className="flex gap-2 mt-2">
            {(['none', 'low', 'high'] as const).map((pressure) => (
              <OptionButton
                key={pressure}
                selected={breakoutDetails.pressure === pressure}
                onClick={() => setDetails({ ...details, pressure })}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // TURNOVER FIELDS
  // ========================================
  const renderTurnoverFields = () => {
    const turnoverDetails = details as Partial<TurnoverDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Zone *</label>
          <div className="flex gap-2 mt-2">
            {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
              <OptionButton
                key={zone}
                selected={turnoverDetails.zone === zone}
                onClick={() => setDetails({ ...details, zone })}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Caused By *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['bad_pass', 'lost_puck', 'hit', 'pressure', 'offside'] as const).map((cause) => (
              <OptionButton
                key={cause}
                selected={turnoverDetails.caused_by === cause}
                onClick={() => setDetails({ ...details, caused_by: cause })}
              >
                {cause.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pressure *</label>
          <div className="flex gap-2 mt-2">
            {(['none', 'low', 'high'] as const).map((pressure) => (
              <OptionButton
                key={pressure}
                selected={turnoverDetails.pressure === pressure}
                onClick={() => setDetails({ ...details, pressure })}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // ZONE ENTRY FIELDS
  // ========================================
  const renderZoneEntryFields = () => {
    const entryDetails = details as Partial<ZoneEntryDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Success *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: true, label: 'Success' },
              { value: false, label: 'Failed' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={entryDetails.success === value}
                onClick={() => setDetails({ ...details, success: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['carry', 'dump', 'pass', 'chip'] as const).map((type) => (
              <OptionButton
                key={type}
                selected={entryDetails.entry_type === type}
                onClick={() => setDetails({ ...details, entry_type: type })}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zone *</label>
          <div className="flex gap-2 mt-2">
            {(['left', 'center', 'right'] as const).map((zone) => (
              <OptionButton
                key={zone}
                selected={entryDetails.zone === zone}
                onClick={() => setDetails({ ...details, zone })}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // ZONE EXIT FIELDS (NEW)
  // ========================================
  const renderZoneExitFields = () => {
    const exitDetails = details as Partial<ZoneExitDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Controlled? *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={exitDetails.controlled === value}
                onClick={() => setDetails({ ...details, controlled: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Successful? *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={exitDetails.successful === value}
                onClick={() => setDetails({ ...details, successful: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exit Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['pass', 'carry', 'dump', 'clear'] as const).map((type) => (
              <OptionButton
                key={type}
                selected={exitDetails.exit_type === type}
                onClick={() => setDetails({ ...details, exit_type: type })}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pressure *</label>
          <div className="flex gap-2 mt-2">
            {(['none', 'low', 'high'] as const).map((pressure) => (
              <OptionButton
                key={pressure}
                selected={exitDetails.pressure === pressure}
                onClick={() => setDetails({ ...details, pressure })}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // BLOCKED SHOT FIELDS (NEW)
  // ========================================
  const renderBlockedShotFields = () => {
    const blockedDetails = details as Partial<BlockedShotDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Who Blocked? *</label>
          <div className="flex gap-2 mt-2">
            {(['defense', 'forward'] as const).map((position) => (
              <OptionButton
                key={position}
                selected={blockedDetails.blocker_position === position}
                onClick={() => setDetails({ ...details, blocker_position: position })}
              >
                {position.charAt(0).toUpperCase() + position.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shot From *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['point', 'slot', 'rush', 'other'] as const).map((from) => (
              <OptionButton
                key={from}
                selected={blockedDetails.shot_from === from}
                onClick={() => setDetails({ ...details, shot_from: from })}
              >
                {from.charAt(0).toUpperCase() + from.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // TAKEAWAY FIELDS (NEW)
  // ========================================
  const renderTakeawayFields = () => {
    const takeawayDetails = details as Partial<TakeawayDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Zone *</label>
          <div className="flex gap-2 mt-2">
            {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
              <OptionButton
                key={zone}
                selected={takeawayDetails.zone === zone}
                onClick={() => setDetails({ ...details, zone })}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['stick_check', 'intercept', 'body_check'] as const).map((type) => (
              <OptionButton
                key={type}
                selected={takeawayDetails.takeaway_type === type}
                onClick={() => setDetails({ ...details, takeaway_type: type })}
              >
                {type.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // FACEOFF FIELDS (ENHANCED)
  // ========================================
  const renderFaceoffFields = () => {
    const faceoffDetails = details as Partial<FaceoffDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Result *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: true, label: 'Won' },
              { value: false, label: 'Lost' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={faceoffDetails.won === value}
                onClick={() => setDetails({ ...details, won: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zone *</label>
          <div className="flex gap-2 mt-2">
            {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
              <OptionButton
                key={zone}
                selected={faceoffDetails.zone === zone}
                onClick={() => setDetails({ ...details, zone })}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1).charAt(0)}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['left_circle', 'right_circle', 'center'].map((location) => (
              <OptionButton
                key={location}
                selected={faceoffDetails.location === location}
                onClick={() => setDetails({ ...details, location })}
              >
                {location.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // PENALTY FIELDS (NEW)
  // ========================================
  const renderPenaltyFields = () => {
    const penaltyDetails = details as Partial<PenaltyDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Penalty *</label>
          <div className="flex gap-2 mt-2">
            {[
              { value: false, label: 'Taken' },
              { value: true, label: 'Drawn' },
            ].map(({ value, label }) => (
              <OptionButton
                key={label}
                selected={penaltyDetails.drawn === value}
                onClick={() => setDetails({ ...details, drawn: value })}
              >
                {label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Infraction *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['hooking', 'tripping', 'high_sticking', 'slashing', 'interference'].map(
              (infraction) => (
                <OptionButton
                  key={infraction}
                  selected={penaltyDetails.infraction === infraction}
                  onClick={() =>
                    setDetails({
                      ...details,
                      infraction,
                      severity: 'minor',
                      duration_minutes: 2,
                    })
                  }
                >
                  {infraction.replace('_', ' ')}
                </OptionButton>
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // GOAL AGAINST FIELDS (NEW)
  // ========================================
  const renderGoalAgainstFields = () => {
    const goalDetails = details as Partial<GoalAgainstDetails>
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Situation *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['even_strength', 'power_play', 'penalty_kill', 'empty_net'] as const).map((sit) => (
              <OptionButton
                key={sit}
                selected={goalDetails.situation === sit}
                onClick={() => setDetails({ ...details, situation: sit })}
              >
                {sit.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Breakdown Type *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(['lost_coverage', 'bad_clear', 'bad_pass', 'other'] as const).map((breakdown) => (
              <OptionButton
                key={breakdown}
                selected={goalDetails.breakdown_type === breakdown}
                onClick={() => setDetails({ ...details, breakdown_type: breakdown })}
              >
                {breakdown.replace('_', ' ')}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Event Context</h2>
        </div>

        {/* Body */}
        <div className="p-4">{renderFields()}</div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleComplete}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  )
}
