import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { AppText, Button } from '@/components/ui'

interface Game {
  id: string
  opponent_name: string
  game_date: string
  location: string | null
  status: string
  final_score_us: number | null
  final_score_them: number | null
  created_at: string
}

interface GameWithStats extends Game {
  event_count: number
  shot_count: number
  goal_count: number
}

export default function AnalyticsScreen() {
  const router = useRouter()
  const [games, setGames] = useState<GameWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reload games when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchCompletedGames()
    }, [])
  )

  const fetchCompletedGames = async () => {
    try {
      setError(null)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Please log in to view analytics')
        setIsLoading(false)
        return
      }

      // Get user's teams
      const { data: teamMembers } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)

      if (!teamMembers || teamMembers.length === 0) {
        setGames([])
        setIsLoading(false)
        return
      }

      const teamIds = teamMembers.map((tm) => tm.team_id)

      // Fetch completed games
      const { data: gamesData, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .in('team_id', teamIds)
        .eq('status', 'completed')
        .order('game_date', { ascending: false })

      if (gamesError) throw gamesError

      // Fetch event counts for each game
      const gamesWithStats: GameWithStats[] = await Promise.all(
        (gamesData || []).map(async (game) => {
          const { data: events } = await supabase
            .from('game_events')
            .select('event_type')
            .eq('game_id', game.id)

          const eventCount = events?.length || 0
          const shotCount =
            events?.filter((e) => e.event_type === 'shot').length || 0
          const goalCount =
            events?.filter(
              (e) =>
                e.event_type === 'shot' &&
                (e as any).details?.result === 'goal'
            ).length || 0

          return {
            ...game,
            event_count: eventCount,
            shot_count: shotCount,
            goal_count: goalCount,
          }
        })
      )

      setGames(gamesWithStats)
    } catch (err: any) {
      console.error('Error loading games:', err)
      setError(err.message || 'Failed to load games')
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchCompletedGames()
  }

  const handleGamePress = (gameId: string) => {
    router.push(`/games/${gameId}/analytics`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const renderGameCard = ({ item: game }: { item: GameWithStats }) => {
    const score =
      game.final_score_us !== null && game.final_score_them !== null
        ? `${game.final_score_us} - ${game.final_score_them}`
        : 'N/A'

    return (
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => handleGamePress(game.id)}
        activeOpacity={0.7}
      >
        <View style={styles.gameHeader}>
          <AppText variant="body" weight="bold" style={styles.opponent}>
            vs {game.opponent_name}
          </AppText>
          <View style={styles.scoreBadge}>
            <AppText variant="body" weight="bold" style={styles.scoreText}>
              {score}
            </AppText>
          </View>
        </View>

        <View style={styles.gameInfo}>
          <AppText variant="caption" style={styles.infoText}>
            {formatDate(game.game_date)}
            {game.location ? ` • ${game.location}` : ''}
          </AppText>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="caption" style={styles.statValue}>
              {game.shot_count}
            </AppText>
            <AppText variant="caption" style={styles.statLabel}>
              Shots
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText variant="caption" style={styles.statValue}>
              {game.goal_count}
            </AppText>
            <AppText variant="caption" style={styles.statLabel}>
              Goals
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText variant="caption" style={styles.statValue}>
              {game.event_count}
            </AppText>
            <AppText variant="caption" style={styles.statLabel}>
              Events
            </AppText>
          </View>
        </View>

        <View style={styles.viewAnalytics}>
          <AppText variant="caption" style={styles.viewText}>
            View Analytics →
          </AppText>
        </View>
      </TouchableOpacity>
    )
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <AppText variant="title" weight="bold" style={styles.emptyTitle}>
        No Games Yet
      </AppText>
      <AppText variant="body" style={styles.emptyText}>
        Complete a game to see analytics and insights
      </AppText>
      <Button onPress={() => router.push('/game-tracking')}>
        Track a Game
      </Button>
    </View>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <AppText variant="body" style={styles.loadingText}>
          Loading games...
        </AppText>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="body" style={styles.errorText}>
          {error}
        </AppText>
        <Button onPress={fetchCompletedGames}>Try Again</Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          Game Analytics
        </AppText>
        <AppText variant="caption" style={styles.subtitle}>
          {games.length} {games.length === 1 ? 'game' : 'games'} completed
        </AppText>
      </View>

      {/* Games List */}
      <FlatList
        data={games}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          games.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
      />
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  subtitle: {
    color: '#6B7280',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  opponent: {
    flex: 1,
    marginRight: 12,
  },
  scoreBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: '#3B82F6',
  },
  gameInfo: {
    marginBottom: 12,
  },
  infoText: {
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    color: '#6B7280',
  },
  viewAnalytics: {
    alignItems: 'center',
  },
  viewText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
})
