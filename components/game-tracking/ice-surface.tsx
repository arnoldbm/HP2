'use client'

import React, { useRef, MouseEvent } from 'react'
import {
  screenToIce,
  iceToScreen,
  type Coordinates,
  ICE_SURFACE,
} from '@/lib/utils/ice-surface-coordinates'

export interface IceEvent {
  id: string
  x: number
  y: number
  type: 'shot' | 'goal' | 'turnover' | 'breakout' | 'zone_entry' | 'zone_exit'
}

export interface IceSurfaceProps {
  width?: number | string
  height?: number | string
  onClick?: (coords: Coordinates) => void
  showZones?: boolean
  showSlot?: boolean
  events?: IceEvent[]
  className?: string
  responsive?: boolean // New prop for responsive behavior
  endsSwapped?: boolean // New prop to flip offensive/defensive ends
}

export function IceSurface({
  width,
  height,
  onClick,
  showZones = false,
  showSlot = false,
  events = [],
  className = '',
  responsive = true, // Default to responsive
  endsSwapped = false,
}: IceSurfaceProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // For responsive mode, use 100% width and auto height
  const svgWidth = responsive ? '100%' : (width || 400)
  const svgHeight = responsive ? 'auto' : (height || 200)

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!onClick) return

    const svg = svgRef.current
    if (!svg) return

    // Get click position relative to SVG
    const rect = svg.getBoundingClientRect()
    const screenX = e.clientX - rect.left
    const screenY = e.clientY - rect.top

    // Convert to ice coordinates
    const iceCoords = screenToIce(
      { x: screenX, y: screenY },
      rect.width,
      rect.height
    )

    onClick(iceCoords)
  }

  // Convert event type to color
  const getEventColor = (type: IceEvent['type']): string => {
    switch (type) {
      case 'shot':
      case 'goal':
        return '#3b82f6' // blue
      case 'turnover':
        return '#ef4444' // red
      case 'breakout':
        return '#10b981' // green
      case 'zone_entry':
      case 'zone_exit':
        return '#f59e0b' // amber
      default:
        return '#6b7280' // gray
    }
  }

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${ICE_SURFACE.WIDTH} ${ICE_SURFACE.HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Hockey ice surface"
      onClick={handleClick}
      className={`cursor-pointer ${responsive ? 'max-w-full' : ''} ${className}`}
      style={{ border: '2px solid #666', display: 'block', borderRadius: '8px' }}
    >
      {/* Ice surface background - white ice */}
      <rect
        x={0}
        y={0}
        width={ICE_SURFACE.WIDTH}
        height={ICE_SURFACE.HEIGHT}
        fill="#ffffff"
        rx={4}
      />

      {/* Boards (darker border inside) */}
      <rect
        x={1}
        y={1}
        width={ICE_SURFACE.WIDTH - 2}
        height={ICE_SURFACE.HEIGHT - 2}
        fill="none"
        stroke="#333"
        strokeWidth={2}
        rx={4}
      />

      {/* Goal lines (thin red lines at ends) - 11 feet from boards */}
      <line
        x1={11}
        y1={0}
        x2={11}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#cc0000"
        strokeWidth={1.5}
      />
      <line
        x1={189}
        y1={0}
        x2={189}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#cc0000"
        strokeWidth={1.5}
      />

      {/* Blue line - Defensive zone (64 feet from end) */}
      <line
        x1={64}
        y1={0}
        x2={64}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#0066cc"
        strokeWidth={2}
      />

      {/* Blue line - Offensive zone (136 feet from end) */}
      <line
        x1={136}
        y1={0}
        x2={136}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#0066cc"
        strokeWidth={2}
      />

      {/* Red center line */}
      <line
        x1={ICE_SURFACE.CENTER.x}
        y1={0}
        x2={ICE_SURFACE.CENTER.x}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#cc0000"
        strokeWidth={2}
      />

      {/* Center ice circle (15 foot radius) */}
      <circle
        cx={100}
        cy={50}
        r={15}
        fill="none"
        stroke="#0066cc"
        strokeWidth={1.5}
      />

      {/* Center ice dot */}
      <circle
        cx={100}
        cy={50}
        r={1}
        fill="#0066cc"
      />

      {/* Defensive zone faceoff circles - 20 feet from goal line, 22 feet from boards */}
      <circle
        cx={31}
        cy={26}
        r={15}
        fill="none"
        stroke="#cc0000"
        strokeWidth={1.5}
      />
      <circle
        cx={31}
        cy={74}
        r={15}
        fill="none"
        stroke="#cc0000"
        strokeWidth={1.5}
      />

      {/* Offensive zone faceoff circles */}
      <circle
        cx={169}
        cy={26}
        r={15}
        fill="none"
        stroke="#cc0000"
        strokeWidth={1.5}
      />
      <circle
        cx={169}
        cy={74}
        r={15}
        fill="none"
        stroke="#cc0000"
        strokeWidth={1.5}
      />

      {/* Faceoff dots in end zone circles */}
      <circle cx={31} cy={26} r={1.5} fill="#cc0000" />
      <circle cx={31} cy={74} r={1.5} fill="#cc0000" />
      <circle cx={169} cy={26} r={1.5} fill="#cc0000" />
      <circle cx={169} cy={74} r={1.5} fill="#cc0000" />

      {/* Neutral zone faceoff dots - 5 feet outside blue lines */}
      <circle cx={69} cy={26} r={1.5} fill="#cc0000" />
      <circle cx={69} cy={74} r={1.5} fill="#cc0000" />
      <circle cx={131} cy={26} r={1.5} fill="#cc0000" />
      <circle cx={131} cy={74} r={1.5} fill="#cc0000" />

      {/* Goal creases - Defensive (4 foot radius semi-circle) */}
      <path
        d="M 7 45 A 6 6 0 0 1 7 55 L 11 55 L 11 45 Z"
        fill="rgba(173, 216, 230, 0.4)"
        stroke="#0066cc"
        strokeWidth={1.5}
      />

      {/* Goal creases - Offensive */}
      <path
        d="M 193 45 A 6 6 0 0 0 193 55 L 189 55 L 189 45 Z"
        fill="rgba(173, 216, 230, 0.4)"
        stroke="#0066cc"
        strokeWidth={1.5}
      />

      {/* Optional zone shading */}
      {showZones && (
        <>
          {/* Defensive zone shading */}
          <rect
            x={0}
            y={0}
            width={64}
            height={ICE_SURFACE.HEIGHT}
            fill="rgba(200, 220, 255, 0.15)"
            data-zone="defensive"
          />

          {/* Offensive zone shading */}
          <rect
            x={136}
            y={0}
            width={64}
            height={ICE_SURFACE.HEIGHT}
            fill="rgba(255, 220, 220, 0.15)"
            data-zone="offensive"
          />
        </>
      )}

      {/* High danger zone (slot) */}
      {showSlot && (() => {
        // Calculate slot position based on whether ends are swapped
        const slotMinX = endsSwapped ? (200 - ICE_SURFACE.SLOT.MAX_X) : ICE_SURFACE.SLOT.MIN_X
        const slotMaxX = endsSwapped ? (200 - ICE_SURFACE.SLOT.MIN_X) : ICE_SURFACE.SLOT.MAX_X
        const slotWidth = slotMaxX - slotMinX
        const slotCenterX = slotMinX + slotWidth / 2

        return (
          <>
            <rect
              x={slotMinX}
              y={ICE_SURFACE.SLOT.MIN_Y}
              width={slotWidth}
              height={ICE_SURFACE.SLOT.MAX_Y - ICE_SURFACE.SLOT.MIN_Y}
              fill="rgba(255, 100, 100, 0.2)"
              stroke="#cc0000"
              strokeWidth={1}
              strokeDasharray="2,2"
              data-slot="true"
            />
            <text
              x={slotCenterX}
              y={ICE_SURFACE.SLOT.MIN_Y - 2}
              fontSize="4"
              fill="#cc0000"
              textAnchor="middle"
              fontWeight="bold"
            >
              HIGH DANGER
            </text>
          </>
        )
      })()}

      {/* Zone labels */}
      <text
        x={32}
        y={8}
        fontSize="6"
        fill="#666"
        textAnchor="middle"
        fontWeight="bold"
        opacity={0.7}
      >
        {endsSwapped ? 'OFFENSIVE ZONE' : 'DEFENSIVE ZONE'}
      </text>
      <text
        x={100}
        y={8}
        fontSize="6"
        fill="#666"
        textAnchor="middle"
        fontWeight="bold"
        opacity={0.7}
      >
        NEUTRAL ZONE
      </text>
      <text
        x={168}
        y={8}
        fontSize="6"
        fill="#666"
        textAnchor="middle"
        fontWeight="bold"
        opacity={0.7}
      >
        {endsSwapped ? 'DEFENSIVE ZONE' : 'OFFENSIVE ZONE'}
      </text>

      {/* Event markers */}
      {events.map((event) => {
        const screenPos = iceToScreen(
          { x: event.x, y: event.y },
          ICE_SURFACE.WIDTH,
          ICE_SURFACE.HEIGHT
        )

        return (
          <circle
            key={event.id}
            cx={event.x}
            cy={event.y}
            r={3}
            fill={getEventColor(event.type)}
            stroke="#fff"
            strokeWidth={1}
            opacity={0.8}
            data-event-marker="true"
            data-event-type={event.type}
          />
        )
      })}
    </svg>
  )
}
