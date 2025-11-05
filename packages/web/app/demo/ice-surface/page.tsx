'use client'

import { useState } from 'react'
import { IceSurface, type IceEvent } from '@/components/game-tracking/ice-surface'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'

export default function IceSurfaceDemoPage() {
  const [showZones, setShowZones] = useState(true)
  const [showSlot, setShowSlot] = useState(true)
  const [events, setEvents] = useState<IceEvent[]>([
    { id: '1', x: 95, y: 50, type: 'shot' },
    { id: '2', x: 85, y: 45, type: 'goal' },
    { id: '3', x: 30, y: 30, type: 'turnover' },
    { id: '4', x: 50, y: 50, type: 'breakout' },
    { id: '5', x: 130, y: 40, type: 'zone_entry' },
  ])
  const [lastClick, setLastClick] = useState<Coordinates | null>(null)

  const handleClick = (coords: Coordinates) => {
    setLastClick(coords)

    // Add a new event marker at the clicked location
    const newEvent: IceEvent = {
      id: String(Date.now()),
      x: coords.x,
      y: coords.y,
      type: 'shot', // Default to shot for demo
    }
    setEvents([...events, newEvent])
  }

  const clearEvents = () => {
    setEvents([])
    setLastClick(null)
  }

  const resetDemo = () => {
    setEvents([
      { id: '1', x: 95, y: 50, type: 'shot' },
      { id: '2', x: 85, y: 45, type: 'goal' },
      { id: '3', x: 30, y: 30, type: 'turnover' },
      { id: '4', x: 50, y: 50, type: 'breakout' },
      { id: '5', x: 130, y: 40, type: 'zone_entry' },
    ])
    setLastClick(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ice Surface Component Demo
          </h1>
          <p className="text-gray-600">
            Interactive hockey ice surface with coordinate mapping, zone visualization, and event tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ice Surface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Ice Surface</h2>
              <p className="text-sm text-gray-600 mb-4">
                Click anywhere on the ice to add a shot marker and see coordinates
              </p>

              <div className="flex justify-center">
                <IceSurface
                  width={600}
                  height={300}
                  onClick={handleClick}
                  showZones={showZones}
                  showSlot={showSlot}
                  events={events}
                />
              </div>

              {lastClick && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Last Click:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-blue-700">X:</span>{' '}
                      <span className="font-mono">{lastClick.x}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Y:</span>{' '}
                      <span className="font-mono">{lastClick.y}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Toggles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Controls</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="zones" className="text-sm font-medium">
                    Show Zones
                  </label>
                  <input
                    id="zones"
                    type="checkbox"
                    checked={showZones}
                    onChange={(e) => setShowZones(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="slot" className="text-sm font-medium">
                    Show High Danger Slot
                  </label>
                  <input
                    id="slot"
                    type="checkbox"
                    checked={showSlot}
                    onChange={(e) => setShowSlot(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={clearEvents}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Clear All Events
                </button>
                <button
                  onClick={resetDemo}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Reset Demo
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Event Legend</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
                  <span className="text-sm">Shot / Goal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
                  <span className="text-sm">Turnover</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  <span className="text-sm">Breakout</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white" />
                  <span className="text-sm">Zone Entry/Exit</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Event Stats</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Events:</span>
                  <span className="font-semibold">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shots:</span>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'shot' || e.type === 'goal').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Turnovers:</span>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'turnover').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Breakouts:</span>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'breakout').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Features Demonstrated</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Click-to-Coordinate</h3>
              <p className="text-sm text-gray-600">
                Click anywhere on the ice and see the exact ice coordinates (0-200 x, 0-100 y)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Zone Visualization</h3>
              <p className="text-sm text-gray-600">
                Toggle defensive (red), neutral (gray), and offensive (blue) zones
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ High Danger Zone</h3>
              <p className="text-sm text-gray-600">
                Show/hide the slot (high danger scoring area) with dashed border
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Event Markers</h3>
              <p className="text-sm text-gray-600">
                Display events with color-coded markers (shots, turnovers, breakouts)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Responsive Design</h3>
              <p className="text-sm text-gray-600">
                SVG scales to any size while maintaining 2:1 aspect ratio
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Screen-to-Ice Conversion</h3>
              <p className="text-sm text-gray-600">
                Accurately converts screen clicks to database-ready coordinates
              </p>
            </div>
          </div>
        </div>

        {/* Coordinate System Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Coordinate System Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Ice Dimensions</h3>
              <ul className="text-sm space-y-1 text-blue-900">
                <li>• X-axis: 0-200 (left to right)</li>
                <li>• Y-axis: 0-100 (bottom to top)</li>
                <li>• Center ice: (100, 50)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Zones</h3>
              <ul className="text-sm space-y-1 text-blue-900">
                <li>• Defensive: x &lt; 67</li>
                <li>• Neutral: x 67-133</li>
                <li>• Offensive: x &gt; 133</li>
                <li>• High Danger Slot: x 80-110, y 35-65</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
