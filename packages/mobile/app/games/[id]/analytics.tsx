import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { AppText, Button } from '@/components/ui'
import { IceSurface } from '@/components/game-tracking/IceSurface'

const SCREEN_WIDTH = Dimensions.get('window').width

interface Game {
  id: string
  opponent_name: string
  game_date: string
  location: string | null
  final_score_us: number | null
  final_score_them: number | null
}

interface GameEvent {
  id: string
  event_type: string
  x_coord: number
  y_coord: number
  period: number
  player_id: string | null
  details: any
}

interface Player {
  id: string
  first_name: string
  last_name: string
  jersey_number: number
  position: string
}

interface PlayerStats {
  player: Player
  shots: number
  goals: number
  turnovers: number
  zone_entries: number
  faceoff_wins: number
  faceoff_losses: number
}

export default function GameAnalyticsScreen() {
  const router = useRouter()
  const { id: gameId } = useLocalSearchParams<{ id: string }>()

  const [game, setGame] = useState<Game | null>(null)
  const [events, setEvents] = useState<GameEvent[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (gameId) {
      fetchGameAnalytics()
    }
  }, [gameId])

  const fetchGameAnalytics = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch game details
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single()

      if (gameError) throw gameError
      setGame(gameData)

      // Fetch game events
      const { data: eventsData, error: eventsError } = await supabase
        .from('game_events')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at', { ascending: true })

      if (eventsError) throw eventsError
      setEvents(eventsData || [])

      // Fetch team players
      const { data: playersData, error: playersError } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', gameData.team_id)
        .order('jersey_number', { ascending: true })

      if (playersError) throw playersError
      setPlayers(playersData || [])
    } catch (err: any) {
      console.error('Error loading game analytics:', err)
      setError(err.message || 'Failed to load game analytics')
    } finally {
      setIsLoading(false)
    }
  }

  const calculatePlayerStats = (): PlayerStats[] => {
    return players.map((player) => {
      const playerEvents = events.filter((e) => e.player_id === player.id)

      const shots = playerEvents.filter((e) => e.event_type === 'shot').length
      const goals = playerEvents.filter(
        (e) => e.event_type === 'shot' && e.details?.result === 'goal'
      ).length
      const turnovers = playerEvents.filter(
        (e) => e.event_type === 'turnover'
      ).length
      const zoneEntries = playerEvents.filter(
        (e) => e.event_type === 'zone_entry'
      ).length

      const faceoffs = playerEvents.filter((e) => e.event_type === 'faceoff')
      const faceoffWins = faceoffs.filter((e) => e.details?.won === true).length
      const faceoffLosses = faceoffs.filter(
        (e) => e.details?.won === false
      ).length

      return {
        player,
        shots,
        goals,
        turnovers,
        zone_entries: zoneEntries,
        faceoff_wins: faceoffWins,
        faceoff_losses: faceoffLosses,
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getShotEvents = () => {
    return events.filter((e) => e.event_type === 'shot')
  }

  const renderShotChart = () => {
    const shotEvents = getShotEvents()
    const goals = shotEvents.filter((e) => e.details?.result === 'goal')
    const misses = shotEvents.filter((e) => e.details?.result !== 'goal')

    return (
      <View style={styles.section}>
        <AppText variant="body" weight="bold" style={styles.sectionTitle}>
          Shot Chart
        </AppText>
        <View style={styles.chartContainer}>
          <IceSurface
            onPress={() => {}}
            shotMarkers={shotEvents.map((e) => ({
              x: e.x_coord,
              y: e.y_coord,
              isGoal: e.details?.result === 'goal',
            }))}
            width={SCREEN_WIDTH - 32}
            height={((SCREEN_WIDTH - 32) * 100) / 200}
          />
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <AppText variant="caption" style={styles.legendText}>
              Goals ({goals.length})
            </AppText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <AppText variant="caption" style={styles.legendText}>
              Misses ({misses.length})
            </AppText>
          </View>
        </View>
      </View>
    )
  }

  const renderPlayerStatsTable = () => {
    const playerStats = calculatePlayerStats()
    const statsWithActivity = playerStats.filter(
      (s) =>
        s.shots > 0 ||
        s.goals > 0 ||
        s.turnovers > 0 ||
        s.zone_entries > 0 ||
        s.faceoff_wins > 0
    )

    if (statsWithActivity.length === 0) {
      return (
        <View style={styles.section}>
          <AppText variant="body" weight="bold" style={styles.sectionTitle}>
            Player Stats
          </AppText>
          <AppText variant="body" style={styles.noStatsText}>
            No player stats available
          </AppText>
        </View>
      )
    }

    return (
      <View style={styles.section}>
        <AppText variant="body" weight="bold" style={styles.sectionTitle}>
          Player Stats
        </AppText>
        {statsWithActivity.map((stat) => (
          <View key={stat.player.id} style={styles.playerStatCard}>
            <View style={styles.playerHeader}>
              <View style={styles.playerNumber}>
                <AppText variant="caption" weight="bold" style={styles.numberText}>
                  #{stat.player.jersey_number}
                </AppText>
              </View>
              <AppText variant="body" weight="semibold" style={styles.playerName}>
                {stat.player.first_name} {stat.player.last_name}
              </AppText>
            </View>
            <View style={styles.statsGrid}>
              {stat.shots > 0 && (
                <View style={styles.statBox}>
                  <AppText variant="caption" style={styles.statValue}>
                    {stat.shots}
                  </AppText>
                  <AppText variant="caption" style={styles.statLabel}>
                    Shots
                  </AppText>
                </View>
              )}
              {stat.goals > 0 && (
                <View style={styles.statBox}>
                  <AppText variant="caption" style={styles.statValueHighlight}>
                    {stat.goals}
                  </AppText>
                  <AppText variant="caption" style={styles.statLabel}>
                    Goals
                  </AppText>
                </View>
              )}
              {stat.turnovers > 0 && (
                <View style={styles.statBox}>
                  <AppText variant="caption" style={styles.statValue}>
                    {stat.turnovers}
                  </AppText>
                  <AppText variant="caption" style={styles.statLabel}>
                    Turnovers
                  </AppText>
                </View>
              )}
              {stat.zone_entries > 0 && (
                <View style={styles.statBox}>
                  <AppText variant="caption" style={styles.statValue}>
                    {stat.zone_entries}
                  </AppText>
                  <AppText variant="caption" style={styles.statLabel}>
                    Entries
                  </AppText>
                </View>
              )}
              {(stat.faceoff_wins > 0 || stat.faceoff_losses > 0) && (
                <View style={styles.statBox}>
                  <AppText variant="caption" style={styles.statValue}>
                    {stat.faceoff_wins}/{stat.faceoff_wins + stat.faceoff_losses}
                  </AppText>
                  <AppText variant="caption" style={styles.statLabel}>
                    Faceoffs
                  </AppText>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <AppText variant="body" style={styles.loadingText}>
          Loading analytics...
        </AppText>
      </View>
    )
  }

  if (error || !game) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="body" style={styles.errorText}>
          {error || 'Game not found'}
        </AppText>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    )
  }

  const score =
    game.final_score_us !== null && game.final_score_them !== null
      ? `${game.final_score_us} - ${game.final_score_them}`
      : 'N/A'

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Game Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold" style={styles.opponent}>
          vs {game.opponent_name}
        </AppText>
        <AppText variant="body" style={styles.gameDate}>
          {formatDate(game.game_date)}
        </AppText>
        <View style={styles.scoreCard}>
          <AppText variant="body" style={styles.scoreLabel}>
            Final Score
          </AppText>
          <AppText variant="title" weight="bold" style={styles.score}>
            {score}
          </AppText>
        </View>
      </View>

      {/* Shot Chart */}
      {renderShotChart()}

      {/* Player Stats */}
      {renderPlayerStatsTable()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingBottom: 32,
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  opponent: {
    marginBottom: 4,
  },
  gameDate: {
    color: '#6B7280',
    marginBottom: 12,
  },
  scoreCard: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#6B7280',
    marginBottom: 4,
  },
  score: {
    color: '#3B82F6',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#6B7280',
  },
  noStatsText: {
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  playerStatCard: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerNumber: {
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#FFFFFF',
  },
  playerName: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    alignItems: 'center',
    minWidth: 60,
  },
  statValue: {
    color: '#111827',
    fontWeight: '600',
    marginBottom: 2,
  },
  statValueHighlight: {
    color: '#10B981',
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 11,
  },
})
