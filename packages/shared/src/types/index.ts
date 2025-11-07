/**
 * Shared TypeScript types for HockeyPilot
 */

// Import types needed in this file
import type { EventType } from './game-events'

// Re-export common types
export type Platform = 'web' | 'ios' | 'android'

export type SubscriptionTier = 'free' | 'premium' | 'pro'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete'

// Team-related types (will move from web app later)
export interface Team {
  id: string
  organization_id: string
  name: string
  age_years: number
  level: 'house' | 'travel' | 'a' | 'aa' | 'aaa'
  season: string
  region: 'usa' | 'canada'
  created_at: string
  updated_at: string
}

// Player-related types
export interface Player {
  id: string
  team_id: string
  jersey_number: number
  first_name: string
  last_name: string
  position: 'forward' | 'defense' | 'goalie'
  birthdate?: string
  created_at: string
}

// Game-related types
export interface Game {
  id: string
  team_id: string
  opponent_name: string
  game_date: string
  status: 'scheduled' | 'in_progress' | 'completed'
  created_at: string
}

// Re-export game event types from dedicated module
export * from './game-events'

export type GameSituation = 'even_strength' | 'power_play' | 'penalty_kill' | 'empty_net'

// Database schema (snake_case) - matches actual Supabase schema
export interface GameEventRow {
  id: string
  game_id: string
  event_type: EventType
  x_coord: number | null
  y_coord: number | null
  period: number
  game_time_seconds: number | null
  player_id: string | null
  situation: GameSituation | null
  details: Record<string, any>
  event_timestamp: string | null
  tracked_by: string | null
  created_at: string | null
  updated_at: string | null
  notes: string | null
  zone: string | null
}

// Client-side format (camelCase)
export interface GameEvent {
  id: string
  gameId: string
  eventType: EventType
  coordinates?: { x: number; y: number }
  playerId?: string
  period: number
  gameTimeSeconds: number
  situation: GameSituation
  details: Record<string, unknown>
  timestamp: string
  trackedBy?: string
}

// Subscription types
export interface Subscription {
  id: string
  user_id: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  revenuecat_customer_id?: string
  current_period_end?: string
  games_tracked_lifetime: number
  created_at: string
  updated_at: string
}
