/**
 * Event Mappers
 *
 * Utility functions to convert between database row format (snake_case)
 * and client format (camelCase)
 */

import type { GameEvent, GameEventRow } from '../types'

/**
 * Convert database row to GameEvent client format
 */
export function mapRowToGameEvent(row: GameEventRow): GameEvent {
  return {
    id: row.id,
    gameId: row.game_id,
    eventType: row.event_type,
    coordinates:
      row.x_coord !== null && row.y_coord !== null
        ? { x: row.x_coord, y: row.y_coord }
        : undefined,
    playerId: row.player_id || undefined,
    period: row.period,
    gameTimeSeconds: row.game_time_seconds || 0,
    situation: row.situation || 'even_strength',
    details: row.details || {},
    timestamp: row.event_timestamp || new Date().toISOString(),
    trackedBy: row.tracked_by || undefined,
  }
}
