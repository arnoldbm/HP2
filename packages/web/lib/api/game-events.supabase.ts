/**
 * Supabase Implementation of Game Events API
 *
 * Wraps direct Supabase calls to implement the IGameEventsAPI interface.
 * This allows the web app to use the platform-agnostic store with Supabase as the backend.
 */

import { supabase } from '../db/supabase'
import type { Database } from '../types/database'
import type { IGameEventsAPI } from '@hockeypilot/shared'
import type { GameEvent, GameEventRow } from '@hockeypilot/shared'
import type { SupabaseClient } from '@supabase/supabase-js'

type GameEventInsert = Database['public']['Tables']['game_events']['Insert']

/**
 * Supabase implementation of game events API
 */
export class SupabaseGameEventsAPI implements IGameEventsAPI {
  constructor(private client: SupabaseClient<Database> = supabase) {}

  /**
   * Save a new game event
   */
  async saveGameEvent(event: GameEvent): Promise<GameEventRow> {
    // Debug: Check if we have a valid session
    const {
      data: { session },
    } = await this.client.auth.getSession()
    console.log('📊 Saving event with session:', session ? 'AUTHENTICATED' : 'NOT AUTHENTICATED')
    if (session) {
      console.log('User ID:', session.user.id)
    } else {
      console.error('❌ No session found! User is not authenticated.')
    }

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

    const { data, error } = await this.client
      .from('game_events')
      .insert(eventData)
      .select()
      .single()

    if (error) {
      console.error('Error saving game event:', error)

      // If it's a 403 (Forbidden) error, sign out the user
      // This typically means the session expired or RLS policy denied access
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        console.error('🔒 RLS policy denied access - signing out user')
        await this.client.auth.signOut()
      }

      throw error
    }

    return this.mapDbRowToGameEventRow(data)
  }

  /**
   * Update an existing game event
   */
  async updateGameEvent(eventId: string, updates: Partial<GameEvent>): Promise<GameEventRow> {
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

    const { data, error } = await this.client
      .from('game_events')
      .update(updateData)
      .eq('id', eventId)
      .select()
      .single()

    if (error) {
      console.error('Error updating game event:', error)

      // If it's a 403 (Forbidden) error, sign out the user
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        console.error('🔒 RLS policy denied access - signing out user')
        await this.client.auth.signOut()
      }

      throw error
    }

    return this.mapDbRowToGameEventRow(data)
  }

  /**
   * Delete a game event
   */
  async deleteGameEvent(eventId: string): Promise<void> {
    const { error } = await this.client
      .from('game_events')
      .delete()
      .eq('id', eventId)

    if (error) {
      console.error('Error deleting game event:', error)

      // If it's a 403 (Forbidden) error, sign out the user
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        console.error('🔒 RLS policy denied access - signing out user')
        await this.client.auth.signOut()
      }

      throw error
    }
  }

  /**
   * Get all events for a game
   */
  async getGameEvents(gameId: string): Promise<GameEventRow[]> {
    const { data, error } = await this.client
      .from('game_events')
      .select('*')
      .eq('game_id', gameId)
      .order('event_timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching game events:', error)

      // If it's a 403 (Forbidden) error, sign out the user
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        console.error('🔒 RLS policy denied access - signing out user')
        await this.client.auth.signOut()
      }

      throw error
    }

    return data.map(row => this.mapDbRowToGameEventRow(row))
  }

  /**
   * Convert Supabase database row to GameEventRow type
   */
  private mapDbRowToGameEventRow(row: Database['public']['Tables']['game_events']['Row']): GameEventRow {
    return {
      id: row.id,
      game_id: row.game_id,
      event_type: row.event_type as any,
      x_coord: row.x_coord,
      y_coord: row.y_coord,
      period: row.period,
      game_time_seconds: row.game_time_seconds,
      player_id: row.player_id,
      situation: row.situation as any,
      details: (row.details as any) || {},
      event_timestamp: row.event_timestamp,
      tracked_by: row.tracked_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
      notes: row.notes,
      zone: row.zone as any,
    }
  }
}

/**
 * Default instance for web app
 */
export const gameEventsAPI = new SupabaseGameEventsAPI()
