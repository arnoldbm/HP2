'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Team {
  id: string
  name: string
  age_group_display: string
  level: string
  season: string
}

interface TeamSelectorProps {
  teams: Team[]
  selectedTeamId: string | null
  onTeamChange: (teamId: string) => void
}

export function TeamSelector({ teams, selectedTeamId, onTeamChange }: TeamSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedTeam = teams.find((t) => t.id === selectedTeamId)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Empty state: no teams
  if (teams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No teams yet</p>
        <Link
          href="/demo/teams/new"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Create your first team
        </Link>
      </div>
    )
  }

  const handleTeamSelect = (teamId: string) => {
    onTeamChange(teamId)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select team"
        className="w-full min-h-[56px] px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-between"
      >
        {selectedTeam ? (
          <div className="flex flex-col items-start">
            <span className="font-medium text-gray-900">{selectedTeam.name}</span>
            <span className="text-sm text-gray-500">
              {selectedTeam.age_group_display} • {selectedTeam.level.toUpperCase()}
            </span>
          </div>
        ) : (
          <span className="font-medium text-gray-900">Teams</span>
        )}

        {/* Chevron icon */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div role="listbox" className="py-2">
            {teams.map((team) => (
              <button
                key={team.id}
                type="button"
                role="option"
                aria-selected={team.id === selectedTeamId}
                onClick={() => handleTeamSelect(team.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  team.id === selectedTeamId ? 'bg-blue-50 selected' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        team.id === selectedTeamId ? 'text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      {team.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {team.age_group_display} • {team.level.toUpperCase()} • {team.season}
                    </span>
                  </div>

                  {/* Checkmark for selected team */}
                  {team.id === selectedTeamId && (
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Manage Teams Link */}
            <Link
              href="/demo/teams"
              className="block px-4 py-3 text-left hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium text-gray-700">Manage teams</span>
              </div>
            </Link>

            {/* Create New Team Link */}
            <Link
              href="/demo/teams/new"
              className="block px-4 py-3 text-left hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium text-blue-600">Create new team</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
