'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/db/supabase'

interface Team {
  id: string
  name: string
  age_group_display: string
  level: string
  season: string
}

interface TeamContextValue {
  selectedTeamId: string | null
  currentTeam: Team | null
  selectTeam: (teamId: string | null) => void
  isLoading: boolean
  error: string | null
}

const TeamContext = createContext<TeamContextValue | undefined>(undefined)

interface TeamProviderProps {
  children: ReactNode
  initialTeamId?: string | null
}

export function TeamProvider({ children, initialTeamId }: TeamProviderProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Get current user on mount
  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          setError(userError.message)
          return
        }

        if (user) {
          setUserId(user.id)
        }
      } catch (err) {
        console.error('Error getting user:', err)
        setError('Failed to get user')
      }
    }

    getUser()
  }, [])

  // Initialize selected team from localStorage or initialTeamId
  useEffect(() => {
    if (!userId) return

    // Prefer explicit initialTeamId over localStorage
    if (initialTeamId) {
      setSelectedTeamId(initialTeamId)
      return
    }

    // Load from localStorage
    const stored = localStorage.getItem(`current_team_${userId}`)
    if (stored) {
      setSelectedTeamId(stored)
    }
  }, [userId, initialTeamId])

  // Fetch team data when selectedTeamId changes
  useEffect(() => {
    if (!selectedTeamId) {
      setCurrentTeam(null)
      return
    }

    async function fetchTeam() {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('teams_with_age_display')
          .select('*')
          .eq('id', selectedTeamId)
          .single()

        if (fetchError) {
          setError(fetchError.message)
          setCurrentTeam(null)
        } else {
          setCurrentTeam(data)
        }
      } catch (err) {
        console.error('Error fetching team:', err)
        setError('Failed to fetch team')
        setCurrentTeam(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [selectedTeamId])

  // Save to localStorage when selectedTeamId changes
  useEffect(() => {
    if (!userId) return

    if (selectedTeamId) {
      localStorage.setItem(`current_team_${userId}`, selectedTeamId)
    } else {
      localStorage.removeItem(`current_team_${userId}`)
    }
  }, [userId, selectedTeamId])

  const selectTeam = (teamId: string | null) => {
    setSelectedTeamId(teamId)
  }

  const value: TeamContextValue = {
    selectedTeamId,
    currentTeam,
    selectTeam,
    isLoading,
    error,
  }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error('useTeam must be used within TeamProvider')
  }
  return context
}
