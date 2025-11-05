/**
 * Game Events API Interface
 *
 * Platform-agnostic interface for game event CRUD operations.
 * - Web: Implements with direct Supabase calls
 * - Mobile: Implements with REST API calls to backend
 */

import type { GameEvent, GameEventRow } from '../types'

export interface IGameEventsAPI {
  /**
   * Save a new game event
   * @param event - Game event to save
   * @returns The saved event row from database
   */
  saveGameEvent(event: GameEvent): Promise<GameEventRow>

  /**
   * Update an existing game event
   * @param eventId - ID of event to update
   * @param updates - Partial event data to update
   * @returns The updated event row from database
   */
  updateGameEvent(eventId: string, updates: Partial<GameEvent>): Promise<GameEventRow>

  /**
   * Delete a game event
   * @param eventId - ID of event to delete
   */
  deleteGameEvent(eventId: string): Promise<void>

  /**
   * Get all events for a game
   * @param gameId - ID of game to fetch events for
   * @returns Array of event rows from database
   */
  getGameEvents(gameId: string): Promise<GameEventRow[]>
}
