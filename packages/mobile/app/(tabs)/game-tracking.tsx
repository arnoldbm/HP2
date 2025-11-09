import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { IceSurface } from '@/components/game-tracking/IceSurface'
import { PlayerSelector, type Player } from '@/components/game-tracking/PlayerSelector'
import { EventContextMenu } from '@/components/game-tracking/EventContextMenu'
import { AppText, Button } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'
import type { EventType, EventDetails, getEventLabel } from '@hockeypilot/shared'
import { getEventLabel as getLabel } from '@hockeypilot/shared'

interface Team {
  id: string
  name: string
  age_group: string
}

interface Game {
  id: string
  team_id: string
  opponent_name: string
  game_date: string
  location?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
}

interface GameEvent {
  id: string
  game_id: string
  player_id: string
  event_type: EventType
  x_coord: number
  y_coord: number
  period: number
  event_timestamp: string
  details?: EventDetails
}

interface GameTrackingScreenProps {
  team?: Team
  players?: Player[]
  game?: Game
  events?: GameEvent[]
  onCreateEvent?: (event: Partial<GameEvent>) => void
}

export function GameTrackingScreen(props: GameTrackingScreenProps = {}) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  const [team, setTeam] = useState<Team | null>(props.team ?? null)
  const [players, setPlayers] = useState<Player[]>(props.players ?? [])
  const [game, setGame] = useState<Game | null>(props.game ?? null)
  const [events, setEvents] = useState<GameEvent[]>(props.events ?? [])

  // Game setup state
  const [opponent, setOpponent] = useState('')
  const [opponentError, setOpponentError] = useState('')

  // Event logging state
  const [pendingLocation, setPendingLocation] = useState<Coordinates | null>(null)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null)
  const [showPlayerSelector, setShowPlayerSelector] = useState(false)
  const [showEventTypeSelector, setShowEventTypeSelector] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)

  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [score, setScore] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState(1)

  // Ice surface state
  const [endsSwapped, setEndsSwapped] = useState(false)

  // Load team and players (only if not provided via props)
  useEffect(() => {
    if (!props.team) {
      loadTeam()
    }
  }, [])

  useEffect(() => {
    if (team && !props.players) {
      loadPlayers()
    }
  }, [team])

  useEffect(() => {
    if (game && !props.events) {
      loadEvents()
    }
  }, [game])

  // Reload players when screen comes into focus (e.g., after adding players on web)
  useFocusEffect(
    useCallback(() => {
      if (team && !props.players) {
        loadPlayers()
      }
    }, [team, props.players])
  )

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  const loadTeam = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .limit(1)
        .single()

      if (error) throw error
      setTeam(data)
    } catch (error) {
      console.error('Error loading team:', error)
    }
  }

  const loadPlayers = async () => {
    if (!team) return

    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', team.id)
        .order('jersey_number')

      if (error) throw error

      const formattedPlayers: Player[] = data.map((p) => ({
        id: p.id,
        jerseyNumber: p.jersey_number,
        firstName: p.first_name,
        lastName: p.last_name,
        position: p.position as 'forward' | 'defense' | 'goalie',
      }))

      setPlayers(formattedPlayers)
    } catch (error) {
      console.error('Error loading players:', error)
    }
  }

  const loadEvents = async () => {
    if (!game) return

    try {
      const { data, error } = await supabase
        .from('game_events')
        .select('*')
        .eq('game_id', game.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setEvents(data || [])

      // Calculate score from shot events with result='goal'
      const goals =
        data?.filter(
          (e) =>
            e.event_type === 'shot' &&
            e.details &&
            'result' in e.details &&
            e.details.result === 'goal'
        ).length || 0
      setScore(goals)
    } catch (error) {
      console.error('Error loading events:', error)
    }
  }

  const handleStartGame = async () => {
    if (!opponent.trim()) {
      setOpponentError('Opponent name is required')
      return
    }

    if (!team) return

    try {
      const { data, error } = await supabase
        .from('games')
        .insert({
          team_id: team.id,
          opponent_name: opponent.trim(),
          game_date: new Date().toISOString(),
          status: 'in_progress',
        })
        .select()
        .single()

      if (error) throw error

      setGame(data)
      setIsTimerRunning(true)
      setOpponentError('')
    } catch (error) {
      console.error('Error creating game:', error)
      Alert.alert('Error', 'Failed to start game')
    }
  }

  // Coordinate transformation functions for swapped ends
  const transformCoords = (coords: Coordinates): Coordinates => {
    if (!endsSwapped) return coords
    return { x: 200 - coords.x, y: coords.y }
  }

  const inverseTransformCoords = (coords: Coordinates): Coordinates => {
    if (!endsSwapped) return coords
    return { x: 200 - coords.x, y: coords.y }
  }

  const handleIceTap = (coords: Coordinates) => {
    if (players.length === 0) return

    // Don't allow event logging if game is completed
    if (game?.status === 'completed') {
      Alert.alert('Game Complete', 'This game has ended. Cannot add more events.')
      return
    }

    // Store the inverse-transformed coordinates (actual ice position)
    const actualCoords = inverseTransformCoords(coords)
    setPendingLocation(actualCoords)
    setShowPlayerSelector(true)
  }

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId)
    setShowPlayerSelector(false)
    setShowEventTypeSelector(true)
  }

  const handleEventTypeSelect = (eventType: EventType) => {
    setSelectedEventType(eventType)
    setShowEventTypeSelector(false)
    setShowContextMenu(true)
  }

  const handleContextComplete = async (details: EventDetails) => {
    if (!game || !pendingLocation || !selectedPlayerId || !selectedEventType) return

    try {
      const { data, error } = await supabase
        .from('game_events')
        .insert({
          game_id: game.id,
          player_id: selectedPlayerId,
          event_type: selectedEventType,
          x_coord: pendingLocation.x,
          y_coord: pendingLocation.y,
          period: currentPeriod,
          event_timestamp: new Date().toISOString(),
          details,
        })
        .select()
        .single()

      if (error) throw error

      setEvents((prev) => [...prev, data])

      // Update score if it's a shot with result=goal
      if (selectedEventType === 'shot' && 'result' in details && details.result === 'goal') {
        setScore((prev) => prev + 1)
      }

      // Reset state
      setPendingLocation(null)
      setSelectedPlayerId(null)
      setSelectedEventType(null)
      setShowContextMenu(false)
    } catch (error) {
      console.error('Error logging event:', error)
      Alert.alert('Error', 'Failed to log event')
    }
  }

  const handleCancelPlayerSelection = () => {
    setPendingLocation(null)
    setShowPlayerSelector(false)
  }

  const handleCancelEventTypeSelection = () => {
    setSelectedPlayerId(null)
    setShowEventTypeSelector(false)
  }

  const handleCancelContextMenu = () => {
    setSelectedEventType(null)
    setShowContextMenu(false)
  }

  const handleDeleteEvent = async (eventId: string, index: number) => {
    try {
      const { error } = await supabase
        .from('game_events')
        .delete()
        .eq('id', eventId)

      if (error) throw error

      const deletedEvent = events[index]
      setEvents((prev) => prev.filter((e) => e.id !== eventId))

      // Update score if it was a shot with result=goal
      if (
        deletedEvent.event_type === 'shot' &&
        deletedEvent.details &&
        'result' in deletedEvent.details &&
        deletedEvent.details.result === 'goal'
      ) {
        setScore((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      Alert.alert('Error', 'Failed to delete event')
    }
  }

  const handlePauseResume = () => {
    setIsTimerRunning((prev) => !prev)
  }

  const getPeriodLabel = (period: number) => {
    if (period <= 3) return `P${period}`
    return `OT${period - 3}`
  }

  const handleEndPeriod = () => {
    if (currentPeriod === 3) {
      // After period 3, ask if going to overtime
      Alert.alert(
        'End of Regulation',
        'Is the game going to overtime?',
        [
          {
            text: 'End Game',
            style: 'destructive',
            onPress: handleEndGame
          },
          {
            text: 'Overtime',
            onPress: () => {
              setCurrentPeriod(4) // OT1
              setElapsedTime(0)
              setIsTimerRunning(false)
            }
          },
        ]
      )
    } else if (currentPeriod >= 4) {
      // After any overtime period, end the game
      Alert.alert(
        'End Overtime Period',
        'Overtime period complete. End game?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'End Game',
            style: 'destructive',
            onPress: handleEndGame
          },
        ]
      )
    } else {
      // Periods 1 and 2 - just confirm
      Alert.alert(
        `End ${getPeriodLabel(currentPeriod)}`,
        `Are you sure you want to end ${getPeriodLabel(currentPeriod)}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'End Period',
            onPress: () => {
              setCurrentPeriod((prev) => prev + 1)
              setElapsedTime(0)
              setIsTimerRunning(false)
            }
          },
        ]
      )
    }
  }

  const handleEndGame = async () => {
    if (!game) return

    Alert.alert(
      'End Game',
      'Are you sure you want to end this game?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Game',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('games')
                .update({ status: 'completed' })
                .eq('id', game.id)

              if (error) throw error

              // Update local game state to reflect completion
              setGame({ ...game, status: 'completed' })
              setIsTimerRunning(false)
              Alert.alert('Game Ended', 'Game has been ended successfully')
            } catch (error) {
              console.error('Error ending game:', error)
              Alert.alert('Error', 'Failed to end game')
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate dynamic ice surface sizing
  const calculateIceContainerStyle = () => {
    // Fixed UI elements heights
    const TAB_BAR_HEIGHT = 50
    const EVENT_HISTORY_HEIGHT = 50
    const PADDING = 4 // Minimal padding to maximize ice surface

    // Available space for ice surface
    const availableHeight = screenHeight - TAB_BAR_HEIGHT - EVENT_HISTORY_HEIGHT - PADDING * 2
    const availableWidth = screenWidth - PADDING * 2

    // Ice surface has 2:1 aspect ratio (200ft x 100ft)
    const ICE_ASPECT_RATIO = 2

    // Calculate the best fit
    let iceWidth = availableWidth
    let iceHeight = iceWidth / ICE_ASPECT_RATIO

    // If height-constrained, size by height instead
    if (iceHeight > availableHeight) {
      iceHeight = availableHeight
      iceWidth = iceHeight * ICE_ASPECT_RATIO
    }

    // Calculate padding to center the ice surface
    const horizontalPadding = (screenWidth - iceWidth) / 2
    const verticalPadding = (availableHeight - iceHeight) / 2 + PADDING

    return {
      paddingHorizontal: horizontalPadding,
      paddingTop: verticalPadding,
      paddingBottom: PADDING,
    }
  }

  // No team selected
  if (!team) {
    return (
      <View style={styles.centerContainer}>
        <AppText variant="body">Select a team to start tracking games</AppText>
      </View>
    )
  }

  // No players available
  if (players.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <AppText variant="body">No players available</AppText>
        <AppText variant="caption" style={styles.helperText}>
          Add players to your team roster to start tracking games
        </AppText>
      </View>
    )
  }

  // Completed game summary
  if (game?.status === 'completed') {
    const goalEvents = events.filter(
      (e) => e.event_type === 'shot' && e.details && 'result' in e.details && e.details.result === 'goal'
    )

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.completedGameContainer}
      >
        <AppText variant="title" weight="bold" style={styles.completedTitle}>
          Game Complete
        </AppText>

        <AppText variant="body" style={styles.completedSubtitle}>
          {team.name} vs {game.opponent_name}
        </AppText>

        <View style={styles.summaryCard}>
          <AppText variant="body" weight="bold" style={styles.summaryLabel}>
            Final Score
          </AppText>
          <View style={styles.scoreContainer}>
            <AppText style={styles.scoreText}>
              {goalEvents.length}
            </AppText>
          </View>

          <View style={styles.statsSection}>
            <AppText variant="body" weight="semibold" style={styles.statsSectionTitle}>
              Total Events Logged
            </AppText>
            <AppText variant="body" style={styles.summaryValue}>
              {events.length} events
            </AppText>

            <AppText variant="caption" style={styles.statsBreakdown}>
              Shots: {events.filter((e) => e.event_type === 'shot').length} |{' '}
              Turnovers: {events.filter((e) => e.event_type === 'turnover').length} |{' '}
              Zone Entries: {events.filter((e) => e.event_type === 'zone_entry').length}
            </AppText>
          </View>
        </View>

        <Button onPress={() => {
          setGame(null)
          setEvents([])
          setOpponent('')
          setScore(0)
          setCurrentPeriod(1)
          setElapsedTime(0)
        }}>
          Start New Game
        </Button>
      </ScrollView>
    )
  }

  // Game setup form
  if (!game) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.setupContainer}>
        <AppText variant="title" weight="bold" style={styles.title}>
          Start New Game
        </AppText>

        <AppText variant="body" style={styles.teamName}>
          {team.name}
        </AppText>

        <View style={styles.inputContainer}>
          <AppText variant="body" weight="semibold" style={styles.label}>
            Opponent
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="Opponent name"
            value={opponent}
            onChangeText={(text) => {
              setOpponent(text)
              setOpponentError('')
            }}
            autoCapitalize="words"
          />
          {opponentError && (
            <AppText variant="caption" style={styles.errorText}>
              {opponentError}
            </AppText>
          )}
        </View>

        <Button onPress={handleStartGame}>
          Start Game
        </Button>
      </ScrollView>
    )
  }

  // Active game tracking
  const dynamicIceStyle = calculateIceContainerStyle()

  return (
    <View style={styles.container}>
      {/* Game Header */}
      <View style={styles.gameHeader}>
        <View style={styles.headerRow}>
          <View style={styles.scoreSection}>
            <AppText variant="caption" style={styles.headerLabel}>SCORE</AppText>
            <AppText variant="title" weight="bold" style={styles.scoreValue}>{score}</AppText>
          </View>

          <View style={styles.periodSection}>
            <AppText variant="caption" style={styles.headerLabel}>PERIOD</AppText>
            <AppText variant="title" weight="bold" style={styles.periodValue}>
              {getPeriodLabel(currentPeriod)}
            </AppText>
          </View>

          <View style={styles.timerSection}>
            <AppText variant="caption" style={styles.headerLabel}>TIME</AppText>
            <AppText variant="title" weight="bold" style={styles.timerValue}>
              {formatTime(elapsedTime)}
            </AppText>
          </View>
        </View>

        <View style={styles.headerControls}>
          <TouchableOpacity
            onPress={handlePauseResume}
            style={styles.pauseButton}
          >
            <AppText variant="body" weight="semibold" style={styles.pauseButtonText}>
              {isTimerRunning ? 'Pause' : 'Resume'}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEndPeriod}
            style={styles.endPeriodButton}
          >
            <AppText variant="body" weight="semibold" style={styles.endPeriodButtonText}>
              End {getPeriodLabel(currentPeriod)}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ice Surface - Takes most of the space */}
      <View style={[styles.iceContainer, dynamicIceStyle]}>
        <IceSurface
          onTap={handleIceTap}
          showSlot={true}
          endsSwapped={endsSwapped}
          events={events
            .filter((e) => e.period === currentPeriod)
            .map((e) => {
              // Transform coordinates for display when ends are swapped
              const displayCoords = transformCoords({ x: e.x_coord, y: e.y_coord })
              return {
                id: e.id,
                x: displayCoords.x,
                y: displayCoords.y,
                type: e.event_type,
              }
            })}
        />
      </View>

      {/* Event History */}
      <View style={styles.historyContainer}>
        <AppText variant="caption" weight="bold" style={styles.historyTitle}>
          Event History
        </AppText>
        <ScrollView horizontal style={styles.historyList}>
          {events.length === 0 ? (
            <AppText variant="caption" style={styles.emptyText}>
              Tap ice to log
            </AppText>
          ) : (
            events.slice(-5).reverse().map((event, index) => {
              const player = players.find((p) => p.id === event.player_id)
              return (
                <View key={event.id} style={styles.eventChip}>
                  <AppText variant="caption" weight="semibold">
                    {event.event_type.toUpperCase()}
                  </AppText>
                  {player && (
                    <AppText variant="caption" style={styles.chipPlayer}>
                      #{player.jerseyNumber}
                    </AppText>
                  )}
                  <TouchableOpacity
                    testID={`delete-event-${index}`}
                    onPress={() => handleDeleteEvent(event.id, index)}
                    style={styles.chipDeleteButton}
                  >
                    <AppText variant="caption" style={styles.deleteText}>
                      ×
                    </AppText>
                  </TouchableOpacity>
                </View>
              )
            })
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setEndsSwapped(!endsSwapped)}
          style={styles.flipIceButton}
        >
          <AppText variant="caption" weight="semibold" style={styles.flipIceButtonText}>
            ⇄
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEndPeriod}
          style={styles.compactEndGameButton}
        >
          <AppText variant="caption" weight="semibold" style={styles.endGameButtonText}>
            {getPeriodLabel(currentPeriod)}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Player Selector Modal */}
      <Modal
        visible={showPlayerSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCancelPlayerSelection}
        supportedOrientations={['portrait', 'landscape']}
      >
        <PlayerSelector
          players={players}
          onSelect={handlePlayerSelect}
          onCancel={handleCancelPlayerSelection}
          title="Who made the play?"
        />
      </Modal>

      {/* Event Type Selector Modal */}
      <Modal
        visible={showEventTypeSelector}
        animationType="fade"
        onRequestClose={handleCancelEventTypeSelection}
        transparent
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.eventTypeModalCentered}>
            <AppText variant="subtitle" weight="bold" style={styles.modalTitle}>
              What happened?
            </AppText>

            <ScrollView style={styles.eventTypeScrollView}>
              <View style={styles.eventTypeButtonGrid}>
                {/* Offensive Events */}
                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('shot')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('shot')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('zone_entry')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('zone_entry')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('breakout')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('breakout')}
                  </AppText>
                </TouchableOpacity>

                {/* Defensive Events */}
                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('zone_exit')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('zone_exit')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('blocked_shot')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('blocked_shot')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('takeaway')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('takeaway')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('turnover')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('turnover')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('goal_against')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('goal_against')}
                  </AppText>
                </TouchableOpacity>

                {/* Special Events */}
                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('faceoff')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('faceoff')}
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.eventTypeButton}
                  onPress={() => handleEventTypeSelect('penalty')}
                >
                  <AppText variant="body" weight="semibold">
                    {getLabel('penalty')}
                  </AppText>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelEventTypeSelection}
            >
              <AppText variant="body" weight="semibold" style={styles.cancelText}>
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Event Context Menu */}
      {selectedEventType && (
        <EventContextMenu
          visible={showContextMenu}
          eventType={selectedEventType}
          onComplete={handleContextComplete}
          onCancel={handleCancelContextMenu}
        />
      )}
    </View>
  )
}

export default GameTrackingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // Game Header Styles
  gameHeader: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  scoreSection: {
    alignItems: 'center',
  },
  periodSection: {
    alignItems: 'center',
  },
  timerSection: {
    alignItems: 'center',
  },
  headerLabel: {
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreValue: {
    color: '#3B82F6',
    fontSize: 28,
  },
  periodValue: {
    color: '#10B981',
    fontSize: 28,
  },
  timerValue: {
    color: '#6B7280',
    fontSize: 28,
  },
  headerControls: {
    flexDirection: 'row',
    gap: 8,
  },
  pauseButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pauseButtonText: {
    color: '#FFFFFF',
  },
  endPeriodButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  endPeriodButtonText: {
    color: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
  },
  setupContainer: {
    padding: 16,
  },
  completedGameContainer: {
    padding: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },
  title: {
    marginBottom: 8,
  },
  completedTitle: {
    marginBottom: 4,
    textAlign: 'center',
  },
  completedSubtitle: {
    marginBottom: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  teamName: {
    marginBottom: 24,
    color: '#6B7280',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    marginTop: 4,
  },
  helperText: {
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryLabel: {
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  statsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statsSectionTitle: {
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  statsBreakdown: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  compactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  compactScoreContainer: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  compactTimerButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  iceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  historyTitle: {
    marginRight: 8,
  },
  historyList: {
    flex: 1,
  },
  eventChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    gap: 4,
  },
  chipPlayer: {
    color: '#6B7280',
  },
  chipDeleteButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#DC2626',
    fontSize: 12,
    lineHeight: 14,
  },
  emptyText: {
    color: '#6B7280',
    paddingHorizontal: 8,
  },
  compactEndGameButton: {
    backgroundColor: '#DC2626',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  endGameButtonText: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  eventTypeModalCentered: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '95%',
    maxWidth: 700,
    maxHeight: '85%',
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  eventTypeScrollView: {
    flexGrow: 0,
    flexShrink: 1,
  },
  eventTypeButtonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 12,
  },
  eventTypeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
    minHeight: 52,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cancelText: {
    color: '#374151',
  },
  flipIceButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  flipIceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
})
