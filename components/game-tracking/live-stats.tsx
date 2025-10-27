'use client'

import React from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'

export function LiveStats() {
  const { gameState, getShotStats, getBreakoutStats, events } = useGameTrackingStore()

  const shotStats = getShotStats()
  const breakoutStats = getBreakoutStats()

  const turnovers = events.filter((e) => e.eventType === 'turnover').length
  const zoneEntries = events.filter((e) => e.eventType === 'zone_entry').length
  const faceoffs = events.filter((e) => e.eventType === 'faceoff').length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Live Game Stats</h2>

      {/* Period and Score */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Period</span>
            <p className="text-2xl font-bold">{gameState.period}</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Score</span>
            <p className="text-3xl font-bold">
              {gameState.score.us} - {gameState.score.them}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Situation</span>
            <p className="text-sm font-medium">{gameState.situation.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Shot Stats */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Shots</h3>
          <p className="text-3xl font-bold text-blue-600">{shotStats.total}</p>
          <div className="text-xs text-blue-700 mt-2 space-y-1">
            <div>On Goal: {shotStats.onGoal}</div>
            <div>Goals: {shotStats.goals}</div>
            <div>Saves: {shotStats.saves}</div>
          </div>
        </div>

        {/* Breakout Stats */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-900 mb-2">Breakouts</h3>
          <p className="text-3xl font-bold text-green-600">{breakoutStats.total}</p>
          <div className="text-xs text-green-700 mt-2 space-y-1">
            <div>Success: {breakoutStats.successful}</div>
            <div>Failed: {breakoutStats.failed}</div>
            <div>Rate: {breakoutStats.successRate.toFixed(0)}%</div>
          </div>
        </div>

        {/* Turnover Stats */}
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-red-900 mb-2">Turnovers</h3>
          <p className="text-3xl font-bold text-red-600">{turnovers}</p>
        </div>

        {/* Zone Entry Stats */}
        <div className="p-4 bg-amber-50 rounded-lg">
          <h3 className="text-sm font-medium text-amber-900 mb-2">Zone Entries</h3>
          <p className="text-3xl font-bold text-amber-600">{zoneEntries}</p>
        </div>

        {/* Faceoff Stats */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-purple-900 mb-2">Faceoffs</h3>
          <p className="text-3xl font-bold text-purple-600">{faceoffs}</p>
        </div>

        {/* Total Events */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-gray-700">{events.length}</p>
        </div>
      </div>
    </div>
  )
}
