'use client'

import React, { useState, useEffect } from 'react'
import { useGameTrackingStore } from '@/lib/stores/game-tracking-store'
import {
  extractShotData,
  calculateShotQualityStats,
  analyzeBreakouts,
  getPeriodStats,
  getShootingPercentageBySituation,
} from '@/lib/analytics/game-analytics'
import { ShotChart } from '@/components/analytics/shot-chart'
import { ShotQualityChart } from '@/components/analytics/shot-quality-chart'
import { BreakoutAnalysis } from '@/components/analytics/breakout-analysis'
import { PeriodTrends } from '@/components/analytics/period-trends'
import type { GameEvent } from '@/lib/stores/game-tracking-store'

export default function AnalyticsDemoPage() {
  const { events } = useGameTrackingStore()
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all')
  const [selectedSituation, setSelectedSituation] = useState<string | 'all'>('all')

  // Filter events based on selected period and situation
  const filteredEvents = events.filter((event) => {
    const periodMatch = selectedPeriod === 'all' || event.period === selectedPeriod
    const situationMatch =
      selectedSituation === 'all' || event.situation === selectedSituation
    return periodMatch && situationMatch
  })

  // Calculate analytics from filtered events
  const shotData = extractShotData(filteredEvents)
  const shotQualityStats = calculateShotQualityStats(filteredEvents)
  const breakoutAnalytics = analyzeBreakouts(filteredEvents)
  const periodStats = getPeriodStats(filteredEvents, 3)
  const situationStats = getShootingPercentageBySituation(filteredEvents)

  // Get unique periods from events
  const periods = Array.from(new Set(events.map((e) => e.period))).sort()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Game Analytics Dashboard</h1>
          <p className="text-gray-600">
            Post-game analytics and insights based on tracked events
          </p>

          {/* Event count indicator */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              Total Events: <span className="font-semibold">{events.length}</span>
            </span>
            <span className="text-gray-600">
              Filtered Events: <span className="font-semibold">{filteredEvents.length}</span>
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="flex flex-wrap gap-4">
            {/* Period filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) =>
                  setSelectedPeriod(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Periods</option>
                {periods.map((period) => (
                  <option key={period} value={period}>
                    Period {period}
                  </option>
                ))}
              </select>
            </div>

            {/* Situation filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Situation
              </label>
              <select
                value={selectedSituation}
                onChange={(e) => setSelectedSituation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Situations</option>
                <option value="even_strength">Even Strength</option>
                <option value="power_play">Power Play</option>
                <option value="penalty_kill">Penalty Kill</option>
              </select>
            </div>

            {/* Reset button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedPeriod('all')
                  setSelectedSituation('all')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Situation stats quick view */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {situationStats.map((stat) => (
              <div key={stat.situation} className="bg-gray-50 rounded p-3">
                <div className="text-xs text-gray-600 uppercase">
                  {stat.situation.replace('_', ' ')}
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold">{stat.percentage.toFixed(1)}%</span>
                  <span className="text-sm text-gray-600">
                    ({stat.goals}/{stat.shots})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {events.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 mb-4">
              No game events found. Track some events in the{' '}
              <a href="/demo/game-tracking" className="font-semibold underline">
                game tracking demo
              </a>{' '}
              first.
            </p>
          </div>
        )}

        {/* Shot Analytics Section */}
        {shotData.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Shot Analysis</h2>

            {/* Shot Chart */}
            <div>
              <ShotChart shots={shotData} width={800} height={400} />
            </div>

            {/* Shot Quality Breakdown */}
            <div>
              <ShotQualityChart stats={shotQualityStats} />
            </div>
          </div>
        )}

        {/* Breakout Analysis Section */}
        {breakoutAnalytics.total > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Breakout Performance</h2>
            <BreakoutAnalysis analytics={breakoutAnalytics} />
          </div>
        )}

        {/* Period Trends Section */}
        {periodStats.length > 0 && periodStats.some((p) => p.shots > 0) && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Period-by-Period Trends</h2>
            <PeriodTrends periodStats={periodStats} />
          </div>
        )}

        {/* Export/Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                // TODO: Implement PDF export
                alert('PDF export coming soon!')
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                // TODO: Implement sharing
                alert('Share functionality coming soon!')
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Share Analytics
            </button>
            <a
              href="/demo/game-tracking"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Game Tracking
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
