/**
 * Game Tracking Store
 *
 * Platform-agnostic Zustand store for live game event tracking.
 * Uses dependency injection for API calls to support both web (Supabase) and mobile (REST API).
 */

import { create } from 'zustand'
import type { IGameEventsAPI } from '../api/game-events.interface'
import type { GameEvent, EventType, GameSituation, ShotResult, ShotType } from '../types'
import type { Coordinates } from '../utils/ice-surface-coordinates'
import { mapRowToGameEvent } from '../utils/event-mappers'

export type { EventType, GameSituation, ShotResult, ShotType }

export type GameStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'

export interface Player {
  id: string
  jerseyNumber: number
  firstName: string
  lastName: string
  position: 'forward' | 'defense' | 'goalie'
}

export interface GameState {
  gameId: string | null
  period: number
  gameTimeSeconds: number
  score: { us: number; them: number }
  situation: GameSituation
  status: GameStatus
}

interface EventLoggingFlow {
  step: 'idle' | 'select_location' | 'select_event_type' | 'select_player' | 'select_details' | 'complete'
  eventType: EventType | null
  coordinates: Coordinates | null
  playerId: string | null
  details: Record<string, unknown>
}

export interface GameTrackingStore {
  // Game state
  gameState: GameState
  players: Player[]
  events: GameEvent[]

  // Event logging flow
  loggingFlow: EventLoggingFlow

  // Actions
  setGameState: (state: Partial<GameState>) => void
  setPlayers: (players: Player[]) => void

  // Event logging flow
  startEventLogging: (eventType: EventType, coordinates?: Coordinates, prefilledDetails?: Record<string, unknown>) => void
  startLocationFirst: () => void // Start flow by clicking ice first
  setCoordinates: (coordinates: Coordinates) => void
  setEventType: (eventType: EventType, prefilledDetails?: Record<string, unknown>) => void
  setPlayer: (playerId: string) => void
  setEventDetails: (details: Record<string, unknown>) => void
  completeEvent: () => Promise<void>
  cancelEventLogging: () => void

  // Event management
  addEvent: (event: GameEvent) => void
  updateEvent: (eventId: string, updates: Partial<GameEvent>) => Promise<void>
  deleteEvent: (eventId: string) => Promise<void>
  undoLastEvent: () => Promise<void>
  loadEvents: (gameId: string) => Promise<void>

  // Computed stats
  getEventsByType: (type: EventType) => GameEvent[]
  getShotStats: () => {
    total: number
    onGoal: number
    goals: number
    saves: number
    misses: number
    blocked: number
  }
  getBreakoutStats: () => {
    total: number
    successful: number
    failed: number
    successRate: number
  }
}

const initialLoggingFlow: EventLoggingFlow = {
  step: 'idle',
  eventType: null,
  coordinates: null,
  playerId: null,
  details: {},
}

/**
 * Create game tracking store with injected API
 * @param api - Platform-specific API implementation (Supabase for web, REST for mobile)
 */
export function createGameTrackingStore(api: IGameEventsAPI) {
  return create<GameTrackingStore>((set, get) => ({
    // Initial state
    gameState: {
      gameId: null,
      period: 1,
      gameTimeSeconds: 1200, // 20:00
      score: { us: 0, them: 0 },
      situation: 'even_strength',
      status: 'in_progress',
    },
    players: [],
    events: [],
    loggingFlow: initialLoggingFlow,

    // Game state actions
    setGameState: (state) =>
      set((prev) => ({
        gameState: { ...prev.gameState, ...state },
      })),

    setPlayers: (players) => set({ players }),

    // Event logging flow
    startEventLogging: (eventType, coordinates, prefilledDetails) =>
      set({
        loggingFlow: {
          step: coordinates ? 'select_player' : 'select_location',
          eventType,
          coordinates: coordinates || null,
          playerId: null,
          details: prefilledDetails || {},
        },
      }),

    // Start flow by allowing user to click ice first
    startLocationFirst: () =>
      set({
        loggingFlow: {
          step: 'select_location',
          eventType: null,
          coordinates: null,
          playerId: null,
          details: {},
        },
      }),

    setCoordinates: (coordinates) =>
      set((prev) => ({
        loggingFlow: {
          ...prev.loggingFlow,
          coordinates,
          // If event type is already set, go to player; otherwise, select event type
          step: prev.loggingFlow.eventType ? 'select_player' : 'select_event_type',
        },
      })),

    // Set event type after location has been selected
    setEventType: (eventType, prefilledDetails) =>
      set((prev) => ({
        loggingFlow: {
          ...prev.loggingFlow,
          eventType,
          details: prefilledDetails || {},
          step: 'select_player',
        },
      })),

    setPlayer: (playerId) =>
      set((prev) => ({
        loggingFlow: {
          ...prev.loggingFlow,
          playerId,
          step: prev.loggingFlow.eventType === 'shot' ? 'select_details' : 'complete',
        },
      })),

    setEventDetails: (details) =>
      set((prev) => ({
        loggingFlow: {
          ...prev.loggingFlow,
          details: { ...prev.loggingFlow.details, ...details },
          step: 'complete',
        },
      })),

    completeEvent: async () => {
      const { loggingFlow, gameState, events } = get()

      if (!loggingFlow.eventType || !gameState.gameId) {
        return
      }

      const tempEvent: GameEvent = {
        id: `temp_${Date.now()}`, // Temporary ID until synced with DB
        gameId: gameState.gameId,
        eventType: loggingFlow.eventType,
        coordinates: loggingFlow.coordinates || undefined,
        playerId: loggingFlow.playerId || undefined,
        period: gameState.period,
        gameTimeSeconds: gameState.gameTimeSeconds,
        situation: gameState.situation,
        details: loggingFlow.details,
        timestamp: new Date().toISOString(),
      }

      // Optimistic update - add to local state immediately
      set({
        events: [...events, tempEvent],
        loggingFlow: initialLoggingFlow,
      })

      // Save to database in background
      try {
        const savedEventRow = await api.saveGameEvent(tempEvent)
        const savedEvent = mapRowToGameEvent(savedEventRow)

        // Update local event with real ID from database
        set((state) => ({
          events: state.events.map((e) =>
            e.id === tempEvent.id ? savedEvent : e
          ),
        }))
      } catch (error) {
        console.error('Failed to save event to database:', error)
        // TODO: Add to sync queue for offline support
      }
    },

    cancelEventLogging: () =>
      set({
        loggingFlow: initialLoggingFlow,
      }),

    // Event management
    addEvent: (event) =>
      set((prev) => ({
        events: [...prev.events, event],
      })),

    updateEvent: async (eventId, updates) => {
      // Optimistic update
      set((prev) => ({
        events: prev.events.map((e) =>
          e.id === eventId ? { ...e, ...updates } : e
        ),
      }))

      // Persist to database
      try {
        await api.updateGameEvent(eventId, updates)
      } catch (error) {
        console.error('Failed to update event in database:', error)
        // TODO: Add to sync queue for offline support
      }
    },

    deleteEvent: async (eventId) => {
      // Optimistic update
      set((prev) => ({
        events: prev.events.filter((e) => e.id !== eventId),
      }))

      // Persist to database (skip temp events)
      if (!eventId.startsWith('temp_')) {
        try {
          await api.deleteGameEvent(eventId)
        } catch (error) {
          console.error('Failed to delete event from database:', error)
          // TODO: Add to sync queue for offline support
        }
      }
    },

    undoLastEvent: async () => {
      const { events } = get()
      if (events.length === 0) return

      const lastEvent = events[events.length - 1]

      // Optimistic update
      set((prev) => ({
        events: prev.events.slice(0, -1),
      }))

      // Delete from database (skip temp events)
      if (!lastEvent.id.startsWith('temp_')) {
        try {
          await api.deleteGameEvent(lastEvent.id)
        } catch (error) {
          console.error('Failed to undo event in database:', error)
          // TODO: Add to sync queue for offline support
        }
      }
    },

    loadEvents: async (gameId) => {
      try {
        const rows = await api.getGameEvents(gameId)
        const events = rows.map(mapRowToGameEvent)

        set({ events })
      } catch (error) {
        console.error('Failed to load events from database:', error)
      }
    },

    // Computed stats
    getEventsByType: (type) => {
      return get().events.filter((e) => e.eventType === type)
    },

    getShotStats: () => {
      const { events } = get()
      const shotEvents = events.filter((e) => e.eventType === 'shot')

      const stats = {
        total: shotEvents.length,
        onGoal: 0,
        goals: 0,
        saves: 0,
        misses: 0,
        blocked: 0,
      }

      shotEvents.forEach((event) => {
        const result = event.details.result as ShotResult | undefined

        if (result === 'goal') {
          stats.goals++
          stats.onGoal++
        } else if (result === 'save') {
          stats.saves++
          stats.onGoal++
        } else if (result === 'blocked') {
          stats.blocked++
        } else {
          // miss_high, miss_wide, post, or undefined
          stats.misses++
        }
      })

      return stats
    },

    getBreakoutStats: () => {
      const { events } = get()
      const breakouts = events.filter((e) => e.eventType === 'breakout')

      const successful = breakouts.filter((e) => e.details.success === true).length
      const failed = breakouts.filter((e) => e.details.success === false).length

      return {
        total: breakouts.length,
        successful,
        failed,
        successRate: breakouts.length > 0 ? (successful / breakouts.length) * 100 : 0,
      }
    },
  }))
}
