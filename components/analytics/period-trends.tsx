'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { PeriodStats } from '@/lib/analytics/game-analytics'

export interface PeriodTrendsProps {
  periodStats: PeriodStats[]
  height?: number
}

export function PeriodTrends({ periodStats, height = 300 }: PeriodTrendsProps) {
  // Prepare data with period labels
  const chartData = periodStats.map((stat) => ({
    period: `Period ${stat.period}`,
    periodNum: stat.period,
    shots: stat.shots,
    goals: stat.goals,
    turnovers: stat.turnovers,
    breakouts: stat.breakouts,
    zoneEntries: stat.zoneEntries,
    shootingPct: stat.shots > 0 ? ((stat.goals / stat.shots) * 100).toFixed(1) : 0,
  }))

  // Calculate totals
  const totals = periodStats.reduce(
    (acc, stat) => ({
      shots: acc.shots + stat.shots,
      goals: acc.goals + stat.goals,
      turnovers: acc.turnovers + stat.turnovers,
      breakouts: acc.breakouts + stat.breakouts,
      zoneEntries: acc.zoneEntries + stat.zoneEntries,
    }),
    { shots: 0, goals: 0, turnovers: 0, breakouts: 0, zoneEntries: 0 }
  )

  return (
    <div className="space-y-4">
      {/* Period comparison cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Shots</div>
          <div className="text-2xl font-bold">{totals.shots}</div>
          <div className="text-xs text-gray-500 mt-1">
            Avg: {(totals.shots / periodStats.length).toFixed(1)}/period
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Goals</div>
          <div className="text-2xl font-bold text-green-600">{totals.goals}</div>
          <div className="text-xs text-gray-500 mt-1">
            Avg: {(totals.goals / periodStats.length).toFixed(1)}/period
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Turnovers</div>
          <div className="text-2xl font-bold text-red-600">{totals.turnovers}</div>
          <div className="text-xs text-gray-500 mt-1">
            Avg: {(totals.turnovers / periodStats.length).toFixed(1)}/period
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Breakouts</div>
          <div className="text-2xl font-bold">{totals.breakouts}</div>
          <div className="text-xs text-gray-500 mt-1">
            Avg: {(totals.breakouts / periodStats.length).toFixed(1)}/period
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Zone Entries</div>
          <div className="text-2xl font-bold">{totals.zoneEntries}</div>
          <div className="text-xs text-gray-500 mt-1">
            Avg: {(totals.zoneEntries / periodStats.length).toFixed(1)}/period
          </div>
        </div>
      </div>

      {/* Shots and Goals trend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Shots and Goals by Period</h3>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="shots" name="Shots" fill="#3b82f6" />
            <Bar dataKey="goals" name="Goals" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Event trends line chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Event Activity by Period</h3>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="shots"
              name="Shots"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="turnovers"
              name="Turnovers"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="breakouts"
              name="Breakouts"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="zoneEntries"
              name="Zone Entries"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Period-by-period table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shots
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goals
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shooting %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turnovers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Breakouts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zone Entries
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((row) => (
              <tr key={row.periodNum}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{row.period}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.shots}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                  {row.goals}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.shootingPct}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-600">{row.turnovers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.breakouts}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.zoneEntries}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap">Total</td>
              <td className="px-6 py-4 whitespace-nowrap">{totals.shots}</td>
              <td className="px-6 py-4 whitespace-nowrap text-green-600">{totals.goals}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.shots > 0 ? ((totals.goals / totals.shots) * 100).toFixed(1) : 0}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-red-600">{totals.turnovers}</td>
              <td className="px-6 py-4 whitespace-nowrap">{totals.breakouts}</td>
              <td className="px-6 py-4 whitespace-nowrap">{totals.zoneEntries}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Period Analysis</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          {(() => {
            const maxShotsPeriod = chartData.reduce((max, p) =>
              p.shots > max.shots ? p : max
            )
            const minShotsPeriod = chartData.reduce((min, p) =>
              p.shots < min.shots ? p : min
            )
            const maxTurnoversPeriod = chartData.reduce((max, p) =>
              p.turnovers > max.turnovers ? p : max
            )

            return (
              <>
                <li>
                  Most offensive pressure in{' '}
                  <span className="font-medium">{maxShotsPeriod.period}</span> (
                  {maxShotsPeriod.shots} shots)
                </li>
                {maxShotsPeriod.periodNum !== minShotsPeriod.periodNum && (
                  <li>
                    Least offensive pressure in{' '}
                    <span className="font-medium">{minShotsPeriod.period}</span> (
                    {minShotsPeriod.shots} shots)
                  </li>
                )}
                {maxTurnoversPeriod.turnovers > 0 && (
                  <li>
                    Most turnovers in{' '}
                    <span className="font-medium">{maxTurnoversPeriod.period}</span> (
                    {maxTurnoversPeriod.turnovers} turnovers)
                  </li>
                )}
                <li>
                  Average of {(totals.shots / periodStats.length).toFixed(1)} shots per period
                </li>
              </>
            )
          })()}
        </ul>
      </div>
    </div>
  )
}
