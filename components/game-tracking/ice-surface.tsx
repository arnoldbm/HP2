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
  width?: number
  height?: number
  onClick?: (coords: Coordinates) => void
  showZones?: boolean
  showSlot?: boolean
  events?: IceEvent[]
  className?: string
}

export function IceSurface({
  width = 400,
  height = 200,
  onClick,
  showZones = false,
  showSlot = false,
  events = [],
  className = '',
}: IceSurfaceProps) {
  const svgRef = useRef<SVGSVGElement>(null)

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
      width={width}
      height={height}
      viewBox={`0 0 ${ICE_SURFACE.WIDTH} ${ICE_SURFACE.HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Hockey ice surface"
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
      style={{ border: '1px solid #ccc' }}
    >
      {/* Ice surface background */}
      <rect
        x={0}
        y={0}
        width={ICE_SURFACE.WIDTH}
        height={ICE_SURFACE.HEIGHT}
        fill="#f0f9ff"
        stroke="#9ca3af"
        strokeWidth={0.5}
      />

      {/* Zone markings */}
      {showZones && (
        <>
          {/* Defensive zone */}
          <rect
            x={0}
            y={0}
            width={ICE_SURFACE.ZONES.DEFENSIVE_END}
            height={ICE_SURFACE.HEIGHT}
            fill="rgba(239, 68, 68, 0.1)"
            stroke="#ef4444"
            strokeWidth={0.5}
            data-zone="defensive"
          />

          {/* Neutral zone */}
          <rect
            x={ICE_SURFACE.ZONES.DEFENSIVE_END}
            y={0}
            width={ICE_SURFACE.ZONES.NEUTRAL_END - ICE_SURFACE.ZONES.DEFENSIVE_END}
            height={ICE_SURFACE.HEIGHT}
            fill="rgba(156, 163, 175, 0.1)"
            stroke="#9ca3af"
            strokeWidth={0.5}
            data-zone="neutral"
          />

          {/* Offensive zone */}
          <rect
            x={ICE_SURFACE.ZONES.NEUTRAL_END}
            y={0}
            width={ICE_SURFACE.WIDTH - ICE_SURFACE.ZONES.NEUTRAL_END}
            height={ICE_SURFACE.HEIGHT}
            fill="rgba(59, 130, 246, 0.1)"
            stroke="#3b82f6"
            strokeWidth={0.5}
            data-zone="offensive"
          />
        </>
      )}

      {/* High danger zone (slot) */}
      {showSlot && (
        <rect
          x={ICE_SURFACE.SLOT.MIN_X}
          y={ICE_SURFACE.SLOT.MIN_Y}
          width={ICE_SURFACE.SLOT.MAX_X - ICE_SURFACE.SLOT.MIN_X}
          height={ICE_SURFACE.SLOT.MAX_Y - ICE_SURFACE.SLOT.MIN_Y}
          fill="rgba(239, 68, 68, 0.2)"
          stroke="#dc2626"
          strokeWidth={1}
          strokeDasharray="2,2"
          data-slot="true"
        />
      )}

      {/* Center ice line */}
      <line
        x1={ICE_SURFACE.CENTER.x}
        y1={0}
        x2={ICE_SURFACE.CENTER.x}
        y2={ICE_SURFACE.HEIGHT}
        stroke="#9ca3af"
        strokeWidth={1}
        strokeDasharray="3,3"
      />

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
            r={2}
            fill={getEventColor(event.type)}
            stroke="#fff"
            strokeWidth={0.5}
            data-event-marker="true"
            data-event-type={event.type}
          />
        )
      })}
    </svg>
  )
}
