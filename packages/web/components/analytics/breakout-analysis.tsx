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
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import type { BreakoutAnalytics } from '@/lib/analytics/game-analytics'

export interface BreakoutAnalysisProps {
  analytics: BreakoutAnalytics
  height?: number
}

const SUCCESS_COLOR = '#10b981' // green
const FAILED_COLOR = '#ef4444' // red

const TYPE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

export function BreakoutAnalysis({ analytics, height = 300 }: BreakoutAnalysisProps) {
  // Prepare data for success/fail pie chart
  const pieData = [
    { name: 'Successful', value: analytics.successful, color: SUCCESS_COLOR },
    { name: 'Failed', value: analytics.failed, color: FAILED_COLOR },
  ]

  // Prepare data for breakout types bar chart
  const typeData = Object.entries(analytics.byType).map(([type, stats]) => ({
    type: type.replace('_', ' '),
    total: stats.total,
    successful: stats.successful,
    successRate: stats.successRate,
  }))

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Breakouts</div>
          <div className="text-2xl font-bold">{analytics.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Successful</div>
          <div className="text-2xl font-bold text-green-600">{analytics.successful}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-bold text-red-600">{analytics.failed}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Success/Fail pie chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Overall Success Rate</h3>
          {analytics.total > 0 ? (
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              No breakout data available
            </div>
          )}
        </div>

        {/* Breakout types bar chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Success by Breakout Type</h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={height}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="type"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white border border-gray-200 rounded p-3 shadow-lg">
                          <p className="font-semibold capitalize">{data.type}</p>
                          <p className="text-sm text-gray-600">Total: {data.total}</p>
                          <p className="text-sm text-green-600">
                            Successful: {data.successful}
                          </p>
                          <p className="text-sm font-medium">
                            Success Rate: {data.successRate.toFixed(1)}%
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="total" name="Total Attempts" fill="#3b82f6" />
                <Bar
                  yAxisId="left"
                  dataKey="successful"
                  name="Successful"
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              No breakout type data available
            </div>
          )}
        </div>
      </div>

      {/* Detailed breakdown table */}
      {typeData.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Breakout Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Successful
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Failed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {typeData
                .sort((a, b) => b.total - a.total)
                .map((row) => {
                  const failed = row.total - row.successful
                  return (
                    <tr key={row.type}>
                      <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                        {row.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600">
                        {row.successful}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-600">
                        {failed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{row.successRate.toFixed(1)}%</span>
                          <div className="ml-3 w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${row.successRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Insights */}
      {analytics.total > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Insights</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            {analytics.successRate >= 70 && (
              <li>✓ Excellent breakout execution - success rate above 70%</li>
            )}
            {analytics.successRate < 50 && (
              <li>⚠ Breakout struggles - consider practicing zone exits</li>
            )}
            {typeData.length > 0 && (
              <li>
                Most used:{' '}
                <span className="font-medium capitalize">
                  {typeData.sort((a, b) => b.total - a.total)[0].type}
                </span>{' '}
                ({typeData.sort((a, b) => b.total - a.total)[0].total} attempts)
              </li>
            )}
            {typeData.length > 0 && (
              <li>
                Most effective:{' '}
                <span className="font-medium capitalize">
                  {typeData.sort((a, b) => b.successRate - a.successRate)[0].type}
                </span>{' '}
                ({typeData.sort((a, b) => b.successRate - a.successRate)[0].successRate.toFixed(1)}
                % success rate)
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
