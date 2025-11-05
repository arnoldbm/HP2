/**
 * Configured Game Tracking Store for Web App
 *
 * Exports a game tracking store configured with the Supabase API implementation.
 */

import { createGameTrackingStore } from '@hockeypilot/shared'
import { gameEventsAPI } from '../api/game-events.supabase'

/**
 * Game tracking store configured with Supabase API for web app
 */
export const useGameTrackingStore = createGameTrackingStore(gameEventsAPI)

// Re-export types for convenience
export type {
  GameTrackingStore,
  GameState,
  GameStatus,
  EventType,
  GameSituation,
  ShotResult,
  ShotType,
} from '@hockeypilot/shared'
