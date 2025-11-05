'use client'

import React from 'react'
import { IceSurface } from '@/components/game-tracking/ice-surface'
import type { ShotData } from '@/lib/analytics/game-analytics'
import type { Player } from '@/lib/stores/game-tracking-store-configured'

export interface ShotChartProps {
  shots: ShotData[]
  players?: Player[]
  width?: number
  height?: number
  showZones?: boolean
  showSlot?: boolean
}

const RESULT_COLORS = {
  goal: '#10b981', // green
  save: '#3b82f6', // blue
  miss_high: '#ef4444', // red
  miss_wide: '#f59e0b', // amber
  blocked: '#6b7280', // gray
  post: '#8b5cf6', // purple
}

const QUALITY_SIZES = {
  high: 12,
  medium: 8,
  low: 6,
  default: 7,
}

export function ShotChart({
  shots,
  players = [],
  width = 600,
  height = 300,
  showZones = true,
  showSlot = true,
}: ShotChartProps) {
  // Helper to get player name
  const getPlayerName = (playerId: string | undefined) => {
    if (!playerId) return 'Unknown'
    const player = players.find((p) => p.id === playerId)
    return player ? `${player.firstName[0]}. ${player.lastName}` : 'Unknown'
  }

  // Group shots by result for legend
  const shotsByResult = shots.reduce((acc, shot) => {
    const result = shot.result || 'miss_high'
    acc[result] = (acc[result] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="relative bg-white rounded-lg shadow p-4">
        <svg width={width} height={height} className="mx-auto">
          {/* Ice surface background */}
          <IceSurface
            width={width}
            height={height}
            showZones={showZones}
            showSlot={showSlot}
          />

          {/* Shot markers */}
          {shots.map((shot, index) => {
            const color = RESULT_COLORS[shot.result] || RESULT_COLORS.miss_high
            const size = shot.shotQuality
              ? QUALITY_SIZES[shot.shotQuality]
              : QUALITY_SIZES.default

            // Calculate position (ice surface is 200x100, svg might be different)
            const scaleX = width / 200
            const scaleY = height / 100
            const x = shot.x * scaleX
            const y = shot.y * scaleY

            return (
              <circle
                key={`shot-${index}`}
                cx={x}
                cy={y}
                r={size}
                fill={color}
                fillOpacity={0.7}
                stroke="white"
                strokeWidth={1}
                className="transition-all hover:fill-opacity-100 cursor-pointer"
              >
                <title>
                  {shot.playerId && `${getPlayerName(shot.playerId)} - `}
                  {shot.result.replace('_', ' ')} - Period {shot.period}
                  {shot.shotQuality && ` - ${shot.shotQuality} danger`}
                </title>
              </circle>
            )
          })}
        </svg>

        {/* Stats overlay */}
        <div className="absolute top-4 right-4 bg-white/90 rounded p-3 shadow">
          <div className="text-sm font-medium mb-1">Total Shots</div>
          <div className="text-2xl font-bold">{shots.length}</div>
          <div className="text-xs text-gray-600 mt-1">
            {shots.filter((s) => s.result === 'goal').length} Goals
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(shotsByResult).map(([result, count]) => (
          <div key={result} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-white"
              style={{
                backgroundColor: RESULT_COLORS[result as keyof typeof RESULT_COLORS],
              }}
            />
            <span className="text-sm text-gray-700">
              {result.replace('_', ' ')}: {count}
            </span>
          </div>
        ))}
      </div>

      {/* Shot quality legend */}
      <div className="flex gap-6 justify-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full bg-gray-400"
            style={{ width: QUALITY_SIZES.high * 2, height: QUALITY_SIZES.high * 2 }}
          />
          <span>High Danger</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="rounded-full bg-gray-400"
            style={{ width: QUALITY_SIZES.medium * 2, height: QUALITY_SIZES.medium * 2 }}
          />
          <span>Medium Danger</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="rounded-full bg-gray-400"
            style={{ width: QUALITY_SIZES.low * 2, height: QUALITY_SIZES.low * 2 }}
          />
          <span>Low Danger</span>
        </div>
      </div>
    </div>
  )
}
