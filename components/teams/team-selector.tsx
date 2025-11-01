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
          <span className="text-gray-500">Select a team</span>
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
