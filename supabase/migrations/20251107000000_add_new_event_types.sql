-- Migration: Add new event types for comprehensive game tracking
-- Created: 2025-11-07
-- Purpose: Add zone_exit, blocked_shot, takeaway, and goal_against event types

-- 1. Convert column to TEXT temporarily
ALTER TABLE game_events ALTER COLUMN event_type TYPE TEXT;

-- 2. Drop the old enum type
DROP TYPE event_type;

-- 3. Create new enum with all event types (including new ones)
CREATE TYPE event_type AS ENUM (
  'shot',
  'breakout',
  'turnover',
  'zone_entry',
  'zone_exit',      -- NEW: Defensive zone exits (controlled/uncontrolled)
  'blocked_shot',   -- NEW: Defensive shot blocking
  'takeaway',       -- NEW: Positive defensive plays
  'faceoff',        -- EXISTING: Enhanced with more context
  'penalty',        -- EXISTING: Now fully supported
  'goal_against'    -- NEW: Opponent goals (defensive accountability)
);

-- 4. Convert column back to enum type
ALTER TABLE game_events ALTER COLUMN event_type TYPE event_type USING event_type::event_type;

-- Add indexes for new event types to improve query performance
CREATE INDEX IF NOT EXISTS idx_game_events_zone_exit
  ON game_events(event_type) WHERE event_type = 'zone_exit';

CREATE INDEX IF NOT EXISTS idx_game_events_blocked_shot
  ON game_events(event_type) WHERE event_type = 'blocked_shot';

CREATE INDEX IF NOT EXISTS idx_game_events_takeaway
  ON game_events(event_type) WHERE event_type = 'takeaway';

CREATE INDEX IF NOT EXISTS idx_game_events_penalty
  ON game_events(event_type) WHERE event_type = 'penalty';

CREATE INDEX IF NOT EXISTS idx_game_events_goal_against
  ON game_events(event_type) WHERE event_type = 'goal_against';

-- Add composite index for event type + game_id (common query pattern)
CREATE INDEX IF NOT EXISTS idx_game_events_type_game
  ON game_events(event_type, game_id);

-- Update table comment
COMMENT ON TABLE game_events IS
  'Polymorphic game events table. Supports event types: shot, breakout, turnover, zone_entry, zone_exit, blocked_shot, takeaway, faceoff, penalty, goal_against. Event-specific data stored in details JSONB column.';

COMMENT ON COLUMN game_events.event_type IS
  'Event type: shot | breakout | turnover | zone_entry | zone_exit | blocked_shot | takeaway | faceoff | penalty | goal_against';

COMMENT ON COLUMN game_events.details IS
  'Event-specific data stored as JSONB. Schema varies by event_type. May include smart tags (outcome_tags, skill_tags, drill_tags) for AI learning.';

-- Add helpful view for event type distribution per game
CREATE OR REPLACE VIEW game_event_type_summary AS
SELECT
  game_id,
  event_type,
  COUNT(*) as event_count,
  COUNT(DISTINCT player_id) as unique_players,
  MIN(game_time_seconds) as first_occurrence,
  MAX(game_time_seconds) as last_occurrence
FROM game_events
GROUP BY game_id, event_type;

COMMENT ON VIEW game_event_type_summary IS
  'Summary of event types per game for quick analytics';
