import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { AppText, Button } from '@/components/ui'

interface Team {
  id: string
  name: string
  age_years: number
  age_group_display: string
  level: string
  season: string
  region: string
  organization_id: string
}

interface TeamStats {
  playerCount: number
  gameCount: number
}

export default function TeamDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  const [team, setTeam] = useState<Team | null>(null)
  const [stats, setStats] = useState<TeamStats>({ playerCount: 0, gameCount: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchTeamDetails()
    }
  }, [id])

  const fetchTeamDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch team details
      const { data: teamData, error: teamError } = await supabase
        .from('teams_with_age_display')
        .select('*')
        .eq('id', id)
        .single()

      if (teamError) throw teamError

      setTeam(teamData)

      // Fetch player count
      const { count: playerCount } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', id)

      // Fetch game count
      const { count: gameCount } = await supabase
        .from('games')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', id)

      setStats({
        playerCount: playerCount || 0,
        gameCount: gameCount || 0,
      })
    } catch (err) {
      console.error('Error loading team details:', err)
      setError('Failed to load team details')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <AppText variant="body" style={styles.loadingText}>
          Loading team details...
        </AppText>
      </View>
    )
  }

  if (error || !team) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="body" style={styles.errorText}>
          {error || 'Team not found'}
        </AppText>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Team Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold" style={styles.teamName}>
          {team.name}
        </AppText>
        <View style={styles.ageGroupBadge}>
          <AppText variant="body" weight="bold" style={styles.ageGroupText}>
            {team.age_group_display}
          </AppText>
        </View>
      </View>

      {/* Team Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <AppText variant="body" style={styles.infoLabel}>Season</AppText>
          <AppText variant="body" weight="semibold">{team.season}</AppText>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <AppText variant="body" style={styles.infoLabel}>Level</AppText>
          <AppText variant="body" weight="semibold">{team.level.toUpperCase()}</AppText>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <AppText variant="body" style={styles.infoLabel}>Region</AppText>
          <AppText variant="body" weight="semibold">{team.region.toUpperCase()}</AppText>
        </View>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <AppText variant="body" weight="bold" style={styles.statsTitle}>
          Team Statistics
        </AppText>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="title" weight="bold" style={styles.statValue}>
              {stats.playerCount}
            </AppText>
            <AppText variant="caption" style={styles.statLabel}>
              Players
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="title" weight="bold" style={styles.statValue}>
              {stats.gameCount}
            </AppText>
            <AppText variant="caption" style={styles.statLabel}>
              Games Tracked
            </AppText>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          onPress={() => router.push(`/teams/${id}/roster`)}
          style={styles.actionButton}
        >
          Manage Roster
        </Button>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(`/teams/${id}/settings`)}
        >
          <AppText variant="body" weight="semibold" style={styles.secondaryButtonText}>
            Team Settings
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 24,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  teamName: {
    flex: 1,
    marginRight: 16,
  },
  ageGroupBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ageGroupText: {
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#6B7280',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statsTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#3B82F6',
  },
})
