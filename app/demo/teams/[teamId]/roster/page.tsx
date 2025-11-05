'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabase'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { PlayerForm } from '@/components/teams/player-form'
import { RosterList } from '@/components/teams/roster-list'
import { createPlayer, updatePlayer, deletePlayer, getTeamRoster } from '@/app/actions/players'
import type { PlayerCreateInput } from '@/lib/validation/player-schemas'

interface Player {
  id: string
  jersey_number: number
  first_name: string
  last_name: string
  position: 'forward' | 'defense' | 'goalie'
  birthdate?: string | null
}

export default function TeamRosterPage({ params }: { params: Promise<{ teamId: string }> }) {
  const router = useRouter()
  const [players, setPlayers] = useState<Player[]>([])
  const [team, setTeam] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [teamId, setTeamId] = useState<string | null>(null)

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setTeamId(resolvedParams.teamId)
    }
    loadParams()
  }, [params])

  useEffect(() => {
    if (teamId) {
      loadTeamAndRoster()
    }
  }, [teamId])

  async function loadTeamAndRoster() {
    try {
      setIsLoading(true)
      setError(null)

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.log('Auth error:', userError)
        await supabase.auth.signOut()
        setError('Please sign in to view roster')
        setIsLoading(false)
        return
      }

      setUserId(user.id)

      // Fetch team details
      const { data: teamData, error: teamError } = await supabase
        .from('teams_with_age_display')
        .select()
        .eq('id', teamId)
        .single()

      if (teamError) {
        console.error('Failed to fetch team:', teamError)
        setError('Failed to load team')
        setIsLoading(false)
        return
      }

      setTeam(teamData)

      // Fetch roster
      const result = await getTeamRoster(teamId!)

      if (result.success && result.players) {
        setPlayers(result.players as Player[])
      } else {
        setError(result.error || 'Failed to load roster')
      }
    } catch (err) {
      console.error('Error loading team roster:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPlayer = async (data: PlayerCreateInput) => {
    setError(null)

    if (!userId) {
      setError('Not authenticated')
      return
    }

    const result = await createPlayer(data, userId)

    if (result.success && result.player) {
      setPlayers([...players, result.player as Player])
      setShowAddForm(false)
    } else {
      setError(result.error || 'Failed to add player')
    }
  }

  const handleUpdatePlayer = async (data: PlayerCreateInput) => {
    if (!editingPlayer) return

    setError(null)

    if (!userId) {
      setError('Not authenticated')
      return
    }

    const result = await updatePlayer(editingPlayer.id, {
      jersey_number: data.jersey_number,
      first_name: data.first_name,
      last_name: data.last_name,
      position: data.position,
      birthdate: data.birthdate,
    }, userId)

    if (result.success && result.player) {
      setPlayers(players.map((p) => (p.id === editingPlayer.id ? (result.player as Player) : p)))
      setEditingPlayer(null)
    } else {
      setError(result.error || 'Failed to update player')
    }
  }

  const handleDeletePlayer = async (playerId: string) => {
    setError(null)

    if (!userId) {
      setError('Not authenticated')
      return
    }

    const result = await deletePlayer(playerId, userId)

    if (result.success) {
      setPlayers(players.filter((p) => p.id !== playerId))
    } else {
      setError(result.error || 'Failed to delete player')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roster...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 pb-24">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.push('/demo/teams')} className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1">
            <span>←</span> Back to Teams
          </button>
          {team && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{team.name} Roster</h1>
              <p className="mt-2 text-gray-600">
                {team.age_group_display} • {team.level.toUpperCase()} • {team.season}
              </p>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Add Player Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Player
          </button>
        </div>

        {/* Roster List */}
        <RosterList
          players={players}
          onEdit={(player) => setEditingPlayer(player)}
          onDelete={handleDeletePlayer}
        />

        {/* Add Player Bottom Sheet (Mobile) / Modal (Desktop) */}
        {teamId && (
          <BottomSheet
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            title="Add Player"
          >
            <PlayerForm
              teamId={teamId}
              onSuccess={handleAddPlayer}
              onCancel={() => setShowAddForm(false)}
            />
          </BottomSheet>
        )}

        {/* Edit Player Bottom Sheet (Mobile) / Modal (Desktop) */}
        {editingPlayer && teamId && (
          <BottomSheet
            isOpen={!!editingPlayer}
            onClose={() => setEditingPlayer(null)}
            title="Edit Player"
          >
            <PlayerForm
              teamId={teamId}
              initialData={editingPlayer}
              onSuccess={handleUpdatePlayer}
              onCancel={() => setEditingPlayer(null)}
            />
          </BottomSheet>
        )}
      </div>
    </div>
  )
}
