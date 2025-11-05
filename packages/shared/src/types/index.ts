/**
 * Shared TypeScript types for HockeyPilot
 */

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

// Event types
export type EventType = 'shot' | 'turnover' | 'breakout' | 'zone_entry' | 'faceoff' | 'blocked_shot'

export interface GameEvent {
  id: string
  game_id: string
  event_type: EventType
  player_id: string
  x: number
  y: number
  period: number
  game_time: string
  metadata: Record<string, any>
  created_at: string
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
