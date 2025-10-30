'use client'

import React from 'react'
import type { EventType } from '@/lib/stores/game-tracking-store'

export interface QuickEventButtonsProps {
  onEventSelect: (eventType: EventType, prefilledDetails?: Record<string, unknown>) => void
  disabled?: boolean
  compact?: boolean
  eventTypes?: EventType[]
  showIcons?: boolean
}

interface EventButton {
  type: EventType
  label: string
  color: string
  bgHover: string
  icon?: string
  prefilledDetails?: Record<string, unknown>
}

const defaultEventButtons: EventButton[] = [
  {
    type: 'shot',
    label: 'Shot',
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
    bgHover: 'hover:bg-blue-50',
    icon: '🏒',
  },
  {
    type: 'shot',
    label: 'Goal',
    color: 'bg-green-500 hover:bg-green-600 text-white',
    bgHover: 'hover:bg-green-50',
    icon: '🎯',
    prefilledDetails: { result: 'goal' },
  },
  {
    type: 'turnover',
    label: 'Turnover',
    color: 'bg-red-500 hover:bg-red-600 text-white',
    bgHover: 'hover:bg-red-50',
    icon: '❌',
  },
  {
    type: 'breakout',
    label: 'Breakout',
    color: 'bg-green-600 hover:bg-green-700 text-white',
    bgHover: 'hover:bg-green-50',
    icon: '⬆️',
  },
  {
    type: 'zone_entry',
    label: 'Zone Entry',
    color: 'bg-amber-500 hover:bg-amber-600 text-white',
    bgHover: 'hover:bg-amber-50',
    icon: '➡️',
  },
  {
    type: 'faceoff',
    label: 'Faceoff',
    color: 'bg-purple-500 hover:bg-purple-600 text-white',
    bgHover: 'hover:bg-purple-50',
    icon: '⚫',
  },
]

export function QuickEventButtons({
  onEventSelect,
  disabled = false,
  compact = false,
  eventTypes,
  showIcons = false,
}: QuickEventButtonsProps) {
  // Filter event buttons if specific types are provided
  const buttons = eventTypes
    ? defaultEventButtons.filter((btn) => eventTypes.includes(btn.type))
    : defaultEventButtons

  return (
    <div
      className={`grid ${
        compact ? 'grid-cols-2 gap-2' : 'grid-cols-2 sm:grid-cols-3 gap-3'
      } w-full`}
    >
      {buttons.map((button, index) => (
        <button
          key={`${button.type}-${index}`}
          onClick={() => onEventSelect(button.type, button.prefilledDetails)}
          disabled={disabled}
          className={`
            ${button.color}
            ${compact ? 'py-3 px-3 text-sm' : 'py-5 md:py-4 px-4 md:px-6 text-base'}
            font-semibold rounded-lg
            shadow-md
            transition-all duration-150
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!disabled ? 'hover:shadow-lg' : ''}
            touch-manipulation
            min-h-[56px]
          `}
          aria-label={button.label}
        >
          <div className="flex items-center justify-center gap-2">
            {showIcons && button.icon && (
              <span className="text-xl md:text-2xl">{button.icon}</span>
            )}
            <span className="text-sm md:text-base">{button.label}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
