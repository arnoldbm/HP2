'use client'

import React, { useState } from 'react'
import type { PlayerStats } from '@/lib/analytics/game-analytics'

export interface PlayerStatsTableProps {
  stats: PlayerStats[]
}

type SortField = 'playerName' | 'shots' | 'goals' | 'shootingPct' | 'turnovers' | 'breakouts' | 'faceoffWinPct' | 'totalEvents'
type SortDirection = 'asc' | 'desc'

export function PlayerStatsTable({ stats }: PlayerStatsTableProps) {
  const [sortField, setSortField] = useState<SortField>('totalEvents')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  if (stats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Player Statistics</h2>
        <p className="text-center text-gray-500 py-8">No player stats available</p>
      </div>
    )
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // New field, default to descending
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedStats = [...stats].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    // Handle string comparison for playerName
    if (sortField === 'playerName') {
      aVal = a.playerName.toLowerCase()
      bVal = b.playerName.toLowerCase()
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕</span>
    }
    return <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
  }

  const getPositionBadge = (position: string) => {
    const colors = {
      forward: 'bg-blue-100 text-blue-800',
      defense: 'bg-green-100 text-green-800',
      goalie: 'bg-purple-100 text-purple-800',
    }
    const color = colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800'

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
        {position[0].toUpperCase()}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Player Statistics</h2>
        <p className="text-sm text-gray-600 mt-1">Click column headers to sort</p>
      </div>

      {/* Mobile: Card view */}
      <div className="md:hidden">
        {sortedStats.map((player, index) => (
          <div key={player.playerId} className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">#{player.jerseyNumber}</span>
                <div>
                  <div className="font-semibold">{player.playerName}</div>
                  {getPositionBadge(player.position)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Total Events</div>
                <div className="text-lg font-bold">{player.totalEvents}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-gray-600">Shots</div>
                <div className="font-semibold">{player.shots}</div>
              </div>
              <div>
                <div className="text-gray-600">Goals</div>
                <div className="font-semibold text-green-600">{player.goals}</div>
              </div>
              <div>
                <div className="text-gray-600">SH%</div>
                <div className="font-semibold">
                  {player.shots > 0 ? `${player.shootingPct.toFixed(1)}%` : '-'}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Turnovers</div>
                <div className="font-semibold text-red-600">{player.turnovers}</div>
              </div>
              <div>
                <div className="text-gray-600">Breakouts</div>
                <div className="font-semibold">{player.breakouts}</div>
              </div>
              <div>
                <div className="text-gray-600">Zone Entries</div>
                <div className="font-semibold">{player.zoneEntries}</div>
              </div>
              {player.faceoffs > 0 && (
                <>
                  <div>
                    <div className="text-gray-600">Faceoffs</div>
                    <div className="font-semibold">{player.faceoffs}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">FO Wins</div>
                    <div className="font-semibold">{player.faceoffWins}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">FO%</div>
                    <div className="font-semibold">{player.faceoffWinPct.toFixed(1)}%</div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('playerName')}
              >
                <div className="flex items-center gap-1">
                  Player <SortIcon field="playerName" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pos
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('shots')}
              >
                <div className="flex items-center justify-center gap-1">
                  Shots <SortIcon field="shots" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('goals')}
              >
                <div className="flex items-center justify-center gap-1">
                  Goals <SortIcon field="goals" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('shootingPct')}
              >
                <div className="flex items-center justify-center gap-1">
                  SH% <SortIcon field="shootingPct" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('turnovers')}
              >
                <div className="flex items-center justify-center gap-1">
                  TO <SortIcon field="turnovers" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('breakouts')}
              >
                <div className="flex items-center justify-center gap-1">
                  BO <SortIcon field="breakouts" />
                </div>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ZE
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('faceoffWinPct')}
              >
                <div className="flex items-center justify-center gap-1">
                  FO% <SortIcon field="faceoffWinPct" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalEvents')}
              >
                <div className="flex items-center justify-center gap-1">
                  Events <SortIcon field="totalEvents" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStats.map((player, index) => (
              <tr key={player.playerId} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                  {player.jerseyNumber}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {player.playerName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {getPositionBadge(player.position)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {player.shots}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-semibold text-green-600">
                  {player.goals}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {player.shots > 0 ? `${player.shootingPct.toFixed(1)}%` : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-red-600">
                  {player.turnovers}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {player.breakouts}
                  {player.breakouts > 0 && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({player.breakoutSuccessPct.toFixed(0)}%)
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {player.zoneEntries}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  {player.faceoffs > 0 ? (
                    <span>
                      {player.faceoffWins}/{player.faceoffs}
                      <span className="text-xs text-gray-500 ml-1">
                        ({player.faceoffWinPct.toFixed(0)}%)
                      </span>
                    </span>
                  ) : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-semibold">
                  {player.totalEvents}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <div className="flex flex-wrap gap-4">
          <span><strong>SH%:</strong> Shooting Percentage</span>
          <span><strong>TO:</strong> Turnovers</span>
          <span><strong>BO:</strong> Breakouts</span>
          <span><strong>ZE:</strong> Zone Entries</span>
          <span><strong>FO%:</strong> Faceoff Win %</span>
        </div>
      </div>
    </div>
  )
}
