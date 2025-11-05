'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { getUserTeams } from '@/app/actions/teams'
import { TeamProvider, useTeam } from '@/lib/contexts/team-context'
import { TeamSelector } from '@/components/teams/team-selector'
import { EmailVerificationBanner } from '@/components/auth/email-verification-banner'
import { UserMenu } from '@/components/navigation/user-menu'

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
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [emailVerified, setEmailVerified] = useState<boolean>(true)
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

        // Get user profile to check custom email_verified field
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('email, email_verified')
          .eq('id', user.id)
          .single()

        const email = profile?.email || user.email || null
        const verified = profile?.email_verified ?? false
        setUserEmail(email)
        setEmailVerified(verified)

        console.log('🔍 LAYOUT DEBUG:', {
          email,
          verified,
          profileEmailVerified: profile?.email_verified,
          supabaseEmailConfirmedAt: user.email_confirmed_at,
          willShowBanner: !verified && !!email,
        })

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
                HockeyPilot
              </button>
            </div>

            {/* Team Selector - Always visible */}
            {!isLoading && (
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

              {/* User Menu Dropdown */}
              <UserMenu
                userEmail={userEmail}
                emailVerified={emailVerified}
                currentPath={pathname}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Email Verification Banner */}
      {(() => {
        const shouldShow = !isLoading && userEmail && !emailVerified
        console.log('🎨 BANNER RENDER CHECK:', {
          isLoading,
          userEmail,
          emailVerified,
          shouldShow,
        })
        return shouldShow ? <EmailVerificationBanner email={userEmail} /> : null
      })()}

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
