-- Game Tracking Tables Migration
-- Creates tables for live game tracking, events, analytics, and audit logs
-- This is the core differentiator feature of HP2

-- ===========================================
-- GAMES TABLE
-- ===========================================

CREATE TYPE game_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,

  -- Game details
  opponent_name TEXT NOT NULL,
  game_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  is_home BOOLEAN DEFAULT true,

  -- Game status and score
  status game_status DEFAULT 'scheduled',
  final_score_us INTEGER,
  final_score_them INTEGER,

  -- Post-game notes
  notes TEXT,

  -- Lock mechanism (prevent edits after coach approval)
  locked BOOLEAN DEFAULT false,
  locked_at TIMESTAMPTZ,
  locked_by UUID REFERENCES auth.users(id),

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_games_team ON games(team_id);
CREATE INDEX idx_games_date ON games(game_date);
CREATE INDEX idx_games_status ON games(status);

-- ===========================================
-- GAME EVENTS (Polymorphic Table)
-- ===========================================

CREATE TYPE event_type AS ENUM (
  'shot',
  'goal',
  'breakout',
  'turnover',
  'zone_entry',
  'faceoff',
  'penalty',
  'defensive_breakdown',
  'special_teams'
);

CREATE TYPE shot_result AS ENUM ('goal', 'save', 'miss_high', 'miss_wide', 'blocked', 'post');
CREATE TYPE shot_type AS ENUM ('wrist', 'slap', 'snap', 'backhand', 'deflection', 'one_timer');
CREATE TYPE game_situation AS ENUM ('even_strength', 'power_play', 'penalty_kill', 'empty_net');
CREATE TYPE ice_zone AS ENUM ('defensive', 'neutral', 'offensive');

CREATE TABLE game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  event_type event_type NOT NULL,

  -- Spatial data (x, y on ice surface, 0-200 x 0-100 scale)
  -- (0,0) = defensive zone left corner
  -- (100,50) = center ice
  -- (200,100) = offensive zone right corner
  x_coord INTEGER CHECK (x_coord >= 0 AND x_coord <= 200),
  y_coord INTEGER CHECK (y_coord >= 0 AND y_coord <= 100),

  -- Temporal data
  period INTEGER NOT NULL CHECK (period BETWEEN 1 AND 5),  -- 1-3 regulation, 4+ OT
  game_time_seconds INTEGER CHECK (game_time_seconds >= 0 AND game_time_seconds <= 1200),  -- 0-1200 (20:00)
  event_timestamp TIMESTAMPTZ DEFAULT now(),

  -- Player/situation context
  player_id UUID REFERENCES players(id) ON DELETE SET NULL,
  situation game_situation DEFAULT 'even_strength',
  zone ice_zone,

  -- Event-specific details (JSONB for flexibility)
  details JSONB NOT NULL DEFAULT '{}',
  /*
    Shot/Goal details:
    {
      "shot_type": "wrist",
      "result": "save",
      "shot_quality": "high",
      "rebound": false
    }

    Breakout details:
    {
      "success": true,
      "type": "up_boards",
      "exit_zone": "left"
    }

    Turnover details:
    {
      "type": "bad_pass",
      "recovery": false
    }

    Zone Entry details:
    {
      "entry_type": "carry",
      "controlled": true
    }

    Faceoff details:
    {
      "won": true,
      "location": "offensive_left"
    }
  */

  -- Metadata
  notes TEXT,
  tracked_by UUID REFERENCES auth.users(id),

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for game events
CREATE INDEX idx_events_game ON game_events(game_id);
CREATE INDEX idx_events_type ON game_events(event_type);
CREATE INDEX idx_events_player ON game_events(player_id);
CREATE INDEX idx_events_timestamp ON game_events(event_timestamp);
CREATE INDEX idx_events_period ON game_events(period);

-- Spatial index for location-based queries
CREATE INDEX idx_events_coords ON game_events(x_coord, y_coord) WHERE x_coord IS NOT NULL;

-- Composite index for common queries (game + type + period)
CREATE INDEX idx_events_game_type_period ON game_events(game_id, event_type, period);

-- ===========================================
-- EVENT EDIT HISTORY (Audit Log)
-- ===========================================

CREATE TABLE event_edit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES game_events(id) ON DELETE CASCADE,
  edited_by UUID NOT NULL REFERENCES auth.users(id),
  edited_at TIMESTAMPTZ DEFAULT now(),

  -- Snapshot of event before edit
  previous_data JSONB NOT NULL,

  -- What changed
  changes JSONB NOT NULL,

  -- Action type
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete'))
);

CREATE INDEX idx_edit_history_event ON event_edit_history(event_id);
CREATE INDEX idx_edit_history_user ON event_edit_history(edited_by);
CREATE INDEX idx_edit_history_time ON event_edit_history(edited_at DESC);

-- ===========================================
-- GAME ANALYTICS (Pre-computed Stats)
-- ===========================================

CREATE TABLE game_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL UNIQUE REFERENCES games(id) ON DELETE CASCADE,

  -- Shot analytics
  total_shots INTEGER DEFAULT 0,
  shots_on_goal INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  shot_quality_high INTEGER DEFAULT 0,
  shot_quality_medium INTEGER DEFAULT 0,
  shot_quality_low INTEGER DEFAULT 0,
  shooting_percentage DECIMAL(5,2),

  -- Defensive analytics
  total_breakouts INTEGER DEFAULT 0,
  successful_breakouts INTEGER DEFAULT 0,
  breakout_success_rate DECIMAL(5,2),
  turnovers INTEGER DEFAULT 0,
  turnovers_defensive INTEGER DEFAULT 0,
  turnovers_neutral INTEGER DEFAULT 0,
  turnovers_offensive INTEGER DEFAULT 0,

  -- Special teams
  faceoffs_taken INTEGER DEFAULT 0,
  faceoffs_won INTEGER DEFAULT 0,
  faceoff_win_percentage DECIMAL(5,2),
  power_plays INTEGER DEFAULT 0,
  power_play_goals INTEGER DEFAULT 0,

  -- Heat map data (aggregated coordinates)
  shot_locations JSONB DEFAULT '[]',  -- Array of {x, y, result}
  turnover_locations JSONB DEFAULT '[]',

  -- AI-generated insights
  insights TEXT[],
  recommended_drill_categories TEXT[],

  computed_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_game_analytics_game ON game_analytics(game_id);

-- ===========================================
-- TRIGGERS FOR UPDATED_AT
-- ===========================================

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_events_updated_at BEFORE UPDATE ON game_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_analytics_updated_at BEFORE UPDATE ON game_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_edit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_analytics ENABLE ROW LEVEL SECURITY;

-- Games: Users can see games for teams they belong to
CREATE POLICY "Users can view their team's games" ON games
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create games for their teams" ON games
  FOR INSERT TO authenticated
  WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their team's games" ON games
  FOR UPDATE TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Game Events: Users can see events for games their team played
CREATE POLICY "Users can view their team's game events" ON game_events
  FOR SELECT TO authenticated
  USING (
    game_id IN (
      SELECT g.id FROM games g
      JOIN team_members tm ON tm.team_id = g.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create events for their team's games" ON game_events
  FOR INSERT TO authenticated
  WITH CHECK (
    game_id IN (
      SELECT g.id FROM games g
      JOIN team_members tm ON tm.team_id = g.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their team's game events" ON game_events
  FOR UPDATE TO authenticated
  USING (
    game_id IN (
      SELECT g.id FROM games g
      JOIN team_members tm ON tm.team_id = g.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

-- Event Edit History: Users can view edit history for their team's events
CREATE POLICY "Users can view edit history for their team's events" ON event_edit_history
  FOR SELECT TO authenticated
  USING (
    event_id IN (
      SELECT ge.id FROM game_events ge
      JOIN games g ON g.id = ge.game_id
      JOIN team_members tm ON tm.team_id = g.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

-- Game Analytics: Users can view analytics for their team's games
CREATE POLICY "Users can view their team's game analytics" ON game_analytics
  FOR SELECT TO authenticated
  USING (
    game_id IN (
      SELECT g.id FROM games g
      JOIN team_members tm ON tm.team_id = g.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

-- ===========================================
-- HELPER FUNCTIONS
-- ===========================================

-- Function to auto-calculate shot quality on insert/update
CREATE OR REPLACE FUNCTION calculate_shot_quality()
RETURNS TRIGGER AS $$
BEGIN
  -- Only calculate for shot/goal events with coordinates
  IF (NEW.event_type IN ('shot', 'goal')) AND NEW.x_coord IS NOT NULL AND NEW.y_coord IS NOT NULL THEN
    -- High danger: slot area (80-110 x, 35-65 y)
    IF NEW.x_coord >= 80 AND NEW.x_coord <= 110 AND NEW.y_coord >= 35 AND NEW.y_coord <= 65 THEN
      NEW.details = jsonb_set(NEW.details, '{shot_quality}', '"high"'::jsonb);
    -- High danger: very close to net (60-80 x, 40-60 y)
    ELSIF NEW.x_coord >= 60 AND NEW.x_coord <= 80 AND NEW.y_coord >= 40 AND NEW.y_coord <= 60 THEN
      NEW.details = jsonb_set(NEW.details, '{shot_quality}', '"high"'::jsonb);
    -- Low danger: point shots, behind net, extreme angles
    ELSIF NEW.x_coord >= 140 OR NEW.x_coord < 60 OR NEW.y_coord < 20 OR NEW.y_coord > 80 THEN
      NEW.details = jsonb_set(NEW.details, '{shot_quality}', '"low"'::jsonb);
    -- Medium danger: everything else
    ELSE
      NEW.details = jsonb_set(NEW.details, '{shot_quality}', '"medium"'::jsonb);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate shot quality
CREATE TRIGGER auto_calculate_shot_quality
  BEFORE INSERT OR UPDATE ON game_events
  FOR EACH ROW
  EXECUTE FUNCTION calculate_shot_quality();

-- Function to log event edits to history
CREATE OR REPLACE FUNCTION log_event_edit()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO event_edit_history (event_id, edited_by, previous_data, changes, action)
    VALUES (
      OLD.id,
      auth.uid(),
      row_to_json(OLD)::jsonb,
      jsonb_build_object(
        'old', row_to_json(OLD)::jsonb,
        'new', row_to_json(NEW)::jsonb
      ),
      'update'
    );
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO event_edit_history (event_id, edited_by, previous_data, changes, action)
    VALUES (
      OLD.id,
      auth.uid(),
      row_to_json(OLD)::jsonb,
      jsonb_build_object('deleted', row_to_json(OLD)::jsonb),
      'delete'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to log all event edits
CREATE TRIGGER log_game_event_changes
  AFTER UPDATE OR DELETE ON game_events
  FOR EACH ROW
  EXECUTE FUNCTION log_event_edit();
