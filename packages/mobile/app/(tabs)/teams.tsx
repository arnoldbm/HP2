import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'

interface Team {
  id: string
  name: string
  age_years: number
  age_group_display: string
  level: string
  season: string
  region: string
  organization_id: string
  role: string
  playerCount?: number
  gameCount?: number
}

export default function TeamsListScreen() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTeams = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      setError(null)

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.log('Auth error:', userError)
        router.push('/(auth)/login')
        return
      }

      // Get user's team memberships
      const { data: memberships, error: membershipError } = await supabase
        .from('team_members')
        .select(
          `
          role,
          teams:team_id (
            id,
            name,
            age_years,
            level,
            season,
            region,
            organization_id
          )
        `
        )
        .eq('user_id', user.id)

      if (membershipError) {
        console.error('Failed to fetch team memberships:', membershipError)
        setError('Failed to load teams')
        return
      }

      // If no teams, show empty state
      if (!memberships || memberships.length === 0) {
        setTeams([])
        return
      }

      // Get team IDs
      const teamIds = memberships.map((m: any) => m.teams.id)

      // Fetch teams with age display
      const { data: teamsWithDisplay, error: displayError } = await supabase
        .from('teams_with_age_display')
        .select('*')
        .in('id', teamIds)

      if (displayError) {
        console.error('Failed to fetch teams with display:', displayError)
        // Fallback to basic data
        const basicTeams = memberships.map((m: any) => ({
          ...m.teams,
          age_group_display: `${m.teams.age_years}U`,
          role: m.role,
        }))
        setTeams(basicTeams)
        return
      }

      // Merge role information and fetch stats
      const teamsWithRoles = teamsWithDisplay.map((team) => {
        const membership = memberships.find((m: any) => m.teams.id === team.id)
        return {
          ...team,
          role: membership?.role || 'member',
        }
      })

      // Fetch stats for each team (player count and game count)
      const teamsWithStats = await Promise.all(
        teamsWithRoles.map(async (team) => {
          // Get player count
          const { count: playerCount } = await supabase
            .from('players')
            .select('*', { count: 'exact', head: true })
            .eq('team_id', team.id)

          // Get game count
          const { count: gameCount } = await supabase
            .from('games')
            .select('*', { count: 'exact', head: true })
            .eq('team_id', team.id)

          return {
            ...team,
            playerCount: playerCount || 0,
            gameCount: gameCount || 0,
          }
        })
      )

      setTeams(teamsWithStats)
    } catch (err) {
      console.error('Error loading teams:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [router])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const handleRefresh = useCallback(() => {
    fetchTeams(true)
  }, [fetchTeams])

  const handleTeamPress = useCallback(
    (teamId: string) => {
      router.push(`/teams/${teamId}`)
    },
    [router]
  )

  const formatRole = (role: string) => {
    return role.replace(/_/g, ' ').toUpperCase()
  }

  const renderTeamCard = ({ item: team }: { item: Team }) => (
    <TouchableOpacity
      style={styles.teamCard}
      onPress={() => handleTeamPress(team.id)}
      activeOpacity={0.7}
    >
      <View style={styles.teamHeader}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamSeason}>{team.season}</Text>
        </View>
        <View style={styles.ageGroupBadge}>
          <Text style={styles.ageGroupText}>{team.age_group_display}</Text>
        </View>
      </View>

      <View style={styles.teamDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Level:</Text>
          <Text style={styles.detailValue}>{team.level.toUpperCase()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Region:</Text>
          <Text style={styles.detailValue}>{team.region.toUpperCase()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Role:</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{formatRole(team.role)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.teamStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{team.playerCount}</Text>
          <Text style={styles.statLabel}>players</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{team.gameCount}</Text>
          <Text style={styles.statLabel}>games</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Teams Yet</Text>
      <Text style={styles.emptyText}>
        Create your first team to start tracking games and generating practice plans
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/teams/new')}
      >
        <Text style={styles.createButtonText}>Create Team</Text>
      </TouchableOpacity>
    </View>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading teams...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchTeams()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          testID="teams-flat-list"
          data={teams}
          renderItem={renderTeamCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={teams.length === 0 ? styles.emptyList : styles.listContent}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 300,
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  teamSeason: {
    fontSize: 14,
    color: '#6B7280',
  },
  ageGroupBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ageGroupText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  teamDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  roleBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
  },
  teamStats: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
})
