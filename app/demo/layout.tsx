'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getUserTeams } from '@/app/actions/teams'
import { TeamProvider, useTeam } from '@/lib/contexts/team-context'
import { TeamSelector } from '@/components/teams/team-selector'

interface Team {
  id: string
  name: string
  age_group_display: string
  level: string
  season: string
}

function DemoLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { selectedTeamId, selectTeam } = useTeam()

  useEffect(() => {
    const loadTeams = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.log('Auth error, clearing session:', userError)
          await supabase.auth.signOut()
          setIsLoading(false)
          return
        }

        const result = await getUserTeams(user.id)

        if (result.success && result.teams) {
          setTeams(result.teams)
        }
      } catch (err) {
        console.error('Error loading teams:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [])

  const handleTeamChange = (teamId: string) => {
    selectTeam(teamId)
  }

  // Don't show team selector on teams list page or team creation page
  const showTeamSelector = pathname !== '/demo/teams' && pathname !== '/demo/teams/new'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <button
                onClick={() => router.push('/demo/teams')}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                HP2
              </button>
            </div>

            {/* Team Selector (only show on non-team pages) */}
            {showTeamSelector && !isLoading && teams.length > 0 && (
              <div className="flex-1 max-w-md mx-8">
                <TeamSelector
                  teams={teams}
                  selectedTeamId={selectedTeamId}
                  onTeamChange={handleTeamChange}
                />
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/demo/teams')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/demo/teams'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Teams
              </button>
              {selectedTeamId && (
                <>
                  <button
                    onClick={() => router.push('/demo/game-tracking')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === '/demo/game-tracking'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Track Game
                  </button>
                  <button
                    onClick={() => router.push('/demo/analytics')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === '/demo/analytics'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => router.push('/demo/practice-history')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === '/demo/practice-history'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Practices
                  </button>
                </>
              )}
              <button
                onClick={() => router.push('/demo/settings')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/demo/settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TeamProvider>
      <DemoLayoutContent>{children}</DemoLayoutContent>
    </TeamProvider>
  )
}
