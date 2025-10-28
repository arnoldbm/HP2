import { supabase } from './supabase'
import type { Database } from '@/lib/types/database'
import type { GameEvent } from '@/lib/stores/game-tracking-store'
import type { SupabaseClient } from '@supabase/supabase-js'

type GameEventRow = Database['public']['Tables']['game_events']['Row']
type GameEventInsert = Database['public']['Tables']['game_events']['Insert']

/**
 * Save a game event to the database
 */
export async function saveGameEvent(
  event: GameEvent,
  client: SupabaseClient<Database> = supabase
) {
  const eventData: GameEventInsert = {
    game_id: event.gameId,
    event_type: event.eventType as any,
    x_coord: event.coordinates?.x || null,
    y_coord: event.coordinates?.y || null,
    period: event.period,
    game_time_seconds: event.gameTimeSeconds,
    player_id: event.playerId || null,
    situation: event.situation as any,
    details: event.details as any,
  }

  const { data, error } = await client
    .from('game_events')
    .insert(eventData)
    .select()
    .single()

  if (error) {
    console.error('Error saving game event:', error)
    throw error
  }

  return data
}

/**
 * Update an existing game event
 */
export async function updateGameEvent(
  eventId: string,
  updates: Partial<GameEvent>,
  client: SupabaseClient<Database> = supabase
) {
  const updateData: Partial<GameEventInsert> = {}

  if (updates.coordinates) {
    updateData.x_coord = updates.coordinates.x
    updateData.y_coord = updates.coordinates.y
  }

  if (updates.playerId !== undefined) {
    updateData.player_id = updates.playerId || null
  }

  if (updates.details) {
    updateData.details = updates.details as any
  }

  if (updates.period) {
    updateData.period = updates.period
  }

  if (updates.gameTimeSeconds !== undefined) {
    updateData.game_time_seconds = updates.gameTimeSeconds
  }

  if (updates.situation) {
    updateData.situation = updates.situation as any
  }

  const { data, error } = await client
    .from('game_events')
    .update(updateData)
    .eq('id', eventId)
    .select()
    .single()

  if (error) {
    console.error('Error updating game event:', error)
    throw error
  }

  return data
}

/**
 * Delete a game event
 */
export async function deleteGameEvent(
  eventId: string,
  client: SupabaseClient<Database> = supabase
) {
  const { error } = await client
    .from('game_events')
    .delete()
    .eq('id', eventId)

  if (error) {
    console.error('Error deleting game event:', error)
    throw error
  }
}

/**
 * Fetch all events for a game
 */
export async function getGameEvents(
  gameId: string,
  client: SupabaseClient<Database> = supabase
) {
  const { data, error } = await client
    .from('game_events')
    .select('*')
    .eq('game_id', gameId)
    .order('event_timestamp', { ascending: true })

  if (error) {
    console.error('Error fetching game events:', error)
    throw error
  }

  return data
}

/**
 * Convert database row to GameEvent type
 */
export function mapRowToGameEvent(row: GameEventRow): GameEvent {
  return {
    id: row.id,
    gameId: row.game_id,
    eventType: row.event_type as any,
    coordinates:
      row.x_coord !== null && row.y_coord !== null
        ? { x: row.x_coord, y: row.y_coord }
        : undefined,
    playerId: row.player_id || undefined,
    period: row.period,
    gameTimeSeconds: row.game_time_seconds || 0,
    situation: row.situation as any,
    details: (row.details as any) || {},
    timestamp: row.event_timestamp || new Date().toISOString(),
    trackedBy: row.tracked_by || undefined,
  }
}
