'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { ShotQualityStats } from '@/lib/analytics/game-analytics'

export interface ShotQualityChartProps {
  stats: ShotQualityStats
  height?: number
}

const QUALITY_COLORS = {
  high: '#ef4444', // red - high danger
  medium: '#f59e0b', // amber - medium danger
  low: '#3b82f6', // blue - low danger
}

export function ShotQualityChart({ stats, height = 300 }: ShotQualityChartProps) {
  // Prepare data for the chart
  const chartData = [
    {
      quality: 'High Danger',
      shots: stats.high.count,
      goals: stats.high.goals,
      percentage: stats.high.percentage,
      color: QUALITY_COLORS.high,
    },
    {
      quality: 'Medium Danger',
      shots: stats.medium.count,
      goals: stats.medium.goals,
      percentage: stats.medium.percentage,
      color: QUALITY_COLORS.medium,
    },
    {
      quality: 'Low Danger',
      shots: stats.low.count,
      goals: stats.low.goals,
      percentage: stats.low.percentage,
      color: QUALITY_COLORS.low,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Shots</div>
          <div className="text-2xl font-bold">{stats.total.count}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Goals</div>
          <div className="text-2xl font-bold text-green-600">{stats.total.goals}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Shooting %</div>
          <div className="text-2xl font-bold">{stats.total.percentage.toFixed(1)}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">High Danger %</div>
          <div className="text-2xl font-bold text-red-600">
            {stats.high.percentage.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Shot distribution chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Shot Quality Distribution</h3>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quality" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white border border-gray-200 rounded p-3 shadow-lg">
                      <p className="font-semibold">{data.quality}</p>
                      <p className="text-sm text-gray-600">
                        Shots: {data.shots}
                      </p>
                      <p className="text-sm text-gray-600">
                        Goals: {data.goals}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        Conversion: {data.percentage.toFixed(1)}%
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Bar dataKey="shots" name="Shots" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed breakdown table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shot Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shots
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goals
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: QUALITY_COLORS.high }}
                  />
                  <span className="font-medium">High Danger</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.high.count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.high.goals}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {stats.high.percentage.toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: QUALITY_COLORS.medium }}
                  />
                  <span className="font-medium">Medium Danger</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.medium.count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.medium.goals}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {stats.medium.percentage.toFixed(1)}%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: QUALITY_COLORS.low }}
                  />
                  <span className="font-medium">Low Danger</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.low.count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.low.goals}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {stats.low.percentage.toFixed(1)}%
              </td>
            </tr>
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap">Total</td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.total.count}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stats.total.goals}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {stats.total.percentage.toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
