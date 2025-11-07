'use client'

import React from 'react'
import type { EventType } from '@/lib/stores/game-tracking-store-configured'

export interface QuickEventButtonsProps {
  onEventSelect: (eventType: EventType, prefilledDetails?: Record<string, unknown>) => void
  disabled?: boolean
  compact?: boolean
  eventTypes?: EventType[]
  showIcons?: boolean
  selectedEventType?: EventType | null
  sidebarMode?: boolean
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
    type: 'zone_exit',
    label: 'Zone Exit',
    color: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    bgHover: 'hover:bg-cyan-50',
    icon: '🧊',
  },
  {
    type: 'blocked_shot',
    label: 'Blocked Shot',
    color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    bgHover: 'hover:bg-indigo-50',
    icon: '🧍‍♂️',
  },
  {
    type: 'takeaway',
    label: 'Takeaway',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    bgHover: 'hover:bg-emerald-50',
    icon: '⚔️',
  },
  {
    type: 'faceoff',
    label: 'Faceoff',
    color: 'bg-purple-500 hover:bg-purple-600 text-white',
    bgHover: 'hover:bg-purple-50',
    icon: '⚫',
  },
  {
    type: 'penalty',
    label: 'Penalty',
    color: 'bg-orange-500 hover:bg-orange-600 text-white',
    bgHover: 'hover:bg-orange-50',
    icon: '🚨',
  },
  {
    type: 'goal_against',
    label: 'Goal Against',
    color: 'bg-rose-600 hover:bg-rose-700 text-white',
    bgHover: 'hover:bg-rose-50',
    icon: '🧱',
  },
]

export function QuickEventButtons({
  onEventSelect,
  disabled = false,
  compact = false,
  eventTypes,
  showIcons = false,
  selectedEventType = null,
  sidebarMode = false,
}: QuickEventButtonsProps) {
  // Filter event buttons if specific types are provided
  let buttons = eventTypes
    ? defaultEventButtons.filter((btn) => eventTypes.includes(btn.type))
    : defaultEventButtons

  // In sidebar mode, remove Goal and Faceoff buttons
  if (sidebarMode) {
    buttons = buttons.filter((btn) =>
      !(btn.label === 'Goal' || btn.label === 'Faceoff')
    )
  }

  return (
    <div
      className={`grid ${
        compact ? 'grid-cols-2 gap-2' : sidebarMode ? 'grid-cols-1 gap-2' : 'grid-cols-2 sm:grid-cols-3 gap-3'
      } w-full`}
    >
      {buttons.map((button, index) => {
        // Check if this button is selected (handle both direct match and Goal button which is shot with result='goal')
        const isSelected = selectedEventType === button.type &&
          (!button.prefilledDetails || selectedEventType === 'shot')

        return (
          <button
            key={`${button.type}-${index}`}
            onClick={() => onEventSelect(button.type, button.prefilledDetails)}
            disabled={disabled}
            className={`
              ${button.color}
              ${sidebarMode ? 'py-2.5 px-2 text-xs' : compact ? 'py-3 px-3 text-sm' : 'py-5 md:py-4 px-4 md:px-6 text-base'}
              font-semibold rounded-lg
              shadow-md
              transition-all duration-150
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!disabled ? 'hover:shadow-lg' : ''}
              touch-manipulation
              ${sidebarMode ? 'min-h-[48px]' : 'min-h-[56px]'}
              ${isSelected ? 'ring-[6px] ring-yellow-300 scale-110 shadow-2xl brightness-110' : ''}
            `}
            aria-label={button.label}
          >
            <div className="flex items-center justify-center gap-1.5">
              {showIcons && button.icon && !sidebarMode && (
                <span className='text-xl md:text-2xl'>{button.icon}</span>
              )}
              <span className={sidebarMode ? 'text-xs' : 'text-sm md:text-base'}>{button.label}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
