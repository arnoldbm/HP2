import { create } from 'zustand'
import type { Coordinates } from '@/lib/utils/ice-surface-coordinates'

// Event types matching database schema
export type EventType =
  | 'shot'
  | 'goal'
  | 'breakout'
  | 'turnover'
  | 'zone_entry'
  | 'faceoff'
  | 'penalty'

export type ShotResult = 'goal' | 'save' | 'miss_high' | 'miss_wide' | 'blocked' | 'post'
export type ShotType = 'wrist' | 'slap' | 'snap' | 'backhand' | 'deflection' | 'one_timer'
export type GameSituation = 'even_strength' | 'power_play' | 'penalty_kill' | 'empty_net'

export interface GameEvent {
  id: string
  gameId: string
  eventType: EventType
  coordinates?: Coordinates
  playerId?: string
  period: number
  gameTimeSeconds: number
  situation: GameSituation
  details: Record<string, unknown>
  timestamp: string
  trackedBy?: string
}

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
}

interface EventLoggingFlow {
  step: 'idle' | 'select_location' | 'select_player' | 'select_details' | 'complete'
  eventType: EventType | null
  coordinates: Coordinates | null
  playerId: string | null
  details: Record<string, unknown>
}

interface GameTrackingStore {
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
  startEventLogging: (eventType: EventType, coordinates?: Coordinates) => void
  setCoordinates: (coordinates: Coordinates) => void
  setPlayer: (playerId: string) => void
  setEventDetails: (details: Record<string, unknown>) => void
  completeEvent: () => void
  cancelEventLogging: () => void

  // Event management
  addEvent: (event: GameEvent) => void
  updateEvent: (eventId: string, updates: Partial<GameEvent>) => void
  deleteEvent: (eventId: string) => void
  undoLastEvent: () => void

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

export const useGameTrackingStore = create<GameTrackingStore>((set, get) => ({
  // Initial state
  gameState: {
    gameId: null,
    period: 1,
    gameTimeSeconds: 1200, // 20:00
    score: { us: 0, them: 0 },
    situation: 'even_strength',
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
  startEventLogging: (eventType, coordinates) =>
    set({
      loggingFlow: {
        step: coordinates ? 'select_player' : 'select_location',
        eventType,
        coordinates: coordinates || null,
        playerId: null,
        details: {},
      },
    }),

  setCoordinates: (coordinates) =>
    set((prev) => ({
      loggingFlow: {
        ...prev.loggingFlow,
        coordinates,
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

  completeEvent: () => {
    const { loggingFlow, gameState, events } = get()

    if (!loggingFlow.eventType || !gameState.gameId) {
      return
    }

    const newEvent: GameEvent = {
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

    set({
      events: [...events, newEvent],
      loggingFlow: initialLoggingFlow,
    })
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

  updateEvent: (eventId, updates) =>
    set((prev) => ({
      events: prev.events.map((e) =>
        e.id === eventId ? { ...e, ...updates } : e
      ),
    })),

  deleteEvent: (eventId) =>
    set((prev) => ({
      events: prev.events.filter((e) => e.id !== eventId),
    })),

  undoLastEvent: () =>
    set((prev) => ({
      events: prev.events.slice(0, -1),
    })),

  // Computed stats
  getEventsByType: (type) => {
    return get().events.filter((e) => e.eventType === type)
  },

  getShotStats: () => {
    const { events } = get()
    const shotEvents = events.filter(
      (e) => e.eventType === 'shot' || e.eventType === 'goal'
    )

    const stats = {
      total: shotEvents.length,
      onGoal: 0,
      goals: 0,
      saves: 0,
      misses: 0,
      blocked: 0,
    }

    shotEvents.forEach((event) => {
      if (event.eventType === 'goal') {
        stats.goals++
        stats.onGoal++
      } else if (event.details.result === 'goal') {
        stats.goals++
        stats.onGoal++
      } else if (event.details.result === 'save') {
        stats.saves++
        stats.onGoal++
      } else if (event.details.result === 'blocked') {
        stats.blocked++
      } else {
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
