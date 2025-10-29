-- Practice Planning Schema Migration
-- Creates tables for drills, practices, and practice plans
-- Supports both AI-generated and manual practice planning

-- ===========================================
-- DRILLS TABLE
-- ===========================================

CREATE TYPE drill_category AS ENUM (
  'shooting',
  'passing',
  'skating',
  'breakouts',
  'forechecking',
  'backchecking',
  'defensive_zone',
  'power_play',
  'penalty_kill',
  'transition',
  'faceoffs',
  'warm_up',
  'cool_down',
  'conditioning',
  'small_area_games',
  'scrimmage'
);

CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'all');

CREATE TABLE drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category drill_category NOT NULL,

  -- Duration and logistics
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0 AND duration_minutes <= 120),
  players_min INTEGER CHECK (players_min > 0),
  players_max INTEGER CHECK (players_max >= players_min),

  -- Age and skill appropriateness
  age_min INTEGER CHECK (age_min >= 6 AND age_min <= 21),
  age_max INTEGER CHECK (age_max >= age_min AND age_max <= 21),
  skill_level skill_level DEFAULT 'all',

  -- AI integration: What game situations does this drill address?
  -- Examples: {"breakout_failures": true, "low_shot_quality": true, "turnover_neutral_zone": true}
  addresses_situations JSONB DEFAULT '{}',

  -- Media and resources
  diagram_url TEXT,
  video_url TEXT,

  -- Search and organization
  tags TEXT[] DEFAULT '{}',  -- e.g., ["puck_handling", "edges", "quick_transitions"]

  -- Multi-tenancy
  is_global BOOLEAN DEFAULT true,  -- true for built-in drills, false for org-specific
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Constraints
  CHECK (is_global = true OR organization_id IS NOT NULL),
  CHECK (age_min IS NULL OR age_max IS NOT NULL)  -- If age_min set, age_max must be set
);

CREATE INDEX idx_drills_category ON drills(category);
CREATE INDEX idx_drills_skill_level ON drills(skill_level);
CREATE INDEX idx_drills_age_range ON drills(age_min, age_max) WHERE age_min IS NOT NULL;
CREATE INDEX idx_drills_organization ON drills(organization_id) WHERE organization_id IS NOT NULL;
CREATE INDEX idx_drills_tags ON drills USING GIN(tags);
CREATE INDEX idx_drills_addresses_situations ON drills USING GIN(addresses_situations);

-- ===========================================
-- PRACTICES TABLE
-- ===========================================

CREATE TYPE practice_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');

CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,

  -- Practice details
  practice_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0 AND duration_minutes <= 180),
  location TEXT,

  -- Coach notes
  notes TEXT,
  objectives TEXT,  -- What we want to work on today

  -- AI generation metadata
  generated_by_ai BOOLEAN DEFAULT false,
  based_on_game_id UUID REFERENCES games(id) ON DELETE SET NULL,
  ai_prompt TEXT,  -- The prompt sent to OpenAI
  ai_reasoning JSONB,  -- Why AI chose these drills (structured data)
  /*
    Example ai_reasoning:
    {
      "game_analysis": {
        "breakout_success_rate": 45,
        "high_danger_shots": 3,
        "turnovers_neutral": 8
      },
      "focus_areas": ["breakout_execution", "shot_quality", "puck_possession"],
      "drill_selections": [
        {
          "drill_id": "uuid",
          "reason": "Addresses breakout failures on left side (68% fail rate in last game)",
          "expected_improvement": "Better D-to-D passes, quicker breakout reads"
        }
      ]
    }
  */

  -- Practice status
  status practice_status DEFAULT 'planned',
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),

  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_practices_team ON practices(team_id);
CREATE INDEX idx_practices_date ON practices(practice_date DESC);
CREATE INDEX idx_practices_status ON practices(status);
CREATE INDEX idx_practices_game ON practices(based_on_game_id) WHERE based_on_game_id IS NOT NULL;

-- ===========================================
-- PRACTICE_DRILLS (Join Table)
-- ===========================================

CREATE TYPE practice_section AS ENUM (
  'warm_up',
  'skills',
  'drills',
  'small_area_games',
  'scrimmage',
  'cool_down'
);

CREATE TABLE practice_drills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_id UUID NOT NULL REFERENCES practices(id) ON DELETE CASCADE,
  drill_id UUID NOT NULL REFERENCES drills(id) ON DELETE CASCADE,

  -- Ordering and timing
  section practice_section NOT NULL,
  sequence_order INTEGER NOT NULL CHECK (sequence_order > 0),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),

  -- Coach notes for this specific drill instance
  notes TEXT,
  modifications TEXT,  -- How this drill was modified for this practice

  -- Execution tracking (for completed practices)
  completed BOOLEAN DEFAULT false,
  effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  coach_feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure ordering is unique within a practice
  UNIQUE(practice_id, section, sequence_order)
);

CREATE INDEX idx_practice_drills_practice ON practice_drills(practice_id);
CREATE INDEX idx_practice_drills_drill ON practice_drills(drill_id);
CREATE INDEX idx_practice_drills_order ON practice_drills(practice_id, section, sequence_order);

-- ===========================================
-- TRIGGERS FOR UPDATED_AT
-- ===========================================

CREATE TRIGGER update_drills_updated_at BEFORE UPDATE ON drills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_practices_updated_at BEFORE UPDATE ON practices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

ALTER TABLE drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_drills ENABLE ROW LEVEL SECURITY;

-- Drills: Everyone can view global drills, org members can view org-specific drills
CREATE POLICY "Users can view global drills" ON drills
  FOR SELECT TO authenticated
  USING (is_global = true);

CREATE POLICY "Users can view their org's drills" ON drills
  FOR SELECT TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Org admins can create org drills" ON drills
  FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Org admins can update org drills" ON drills
  FOR UPDATE TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Practices: Users can view/manage practices for their teams
CREATE POLICY "Users can view their team's practices" ON practices
  FOR SELECT TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Coaches can create practices for their teams" ON practices
  FOR INSERT TO authenticated
  WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid()
      AND role IN ('head_coach', 'assistant_coach')
    )
  );

CREATE POLICY "Coaches can update their team's practices" ON practices
  FOR UPDATE TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid()
      AND role IN ('head_coach', 'assistant_coach')
    )
  );

CREATE POLICY "Coaches can delete their team's practices" ON practices
  FOR DELETE TO authenticated
  USING (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid()
      AND role IN ('head_coach', 'assistant_coach')
    )
  );

-- Practice Drills: Users can view/manage drills for their team's practices
CREATE POLICY "Users can view practice drills for their team's practices" ON practice_drills
  FOR SELECT TO authenticated
  USING (
    practice_id IN (
      SELECT p.id FROM practices p
      JOIN team_members tm ON tm.team_id = p.team_id
      WHERE tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Coaches can manage practice drills for their team's practices" ON practice_drills
  FOR ALL TO authenticated
  USING (
    practice_id IN (
      SELECT p.id FROM practices p
      JOIN team_members tm ON tm.team_id = p.team_id
      WHERE tm.user_id = auth.uid()
      AND tm.role IN ('head_coach', 'assistant_coach')
    )
  )
  WITH CHECK (
    practice_id IN (
      SELECT p.id FROM practices p
      JOIN team_members tm ON tm.team_id = p.team_id
      WHERE tm.user_id = auth.uid()
      AND tm.role IN ('head_coach', 'assistant_coach')
    )
  );

-- ===========================================
-- HELPER FUNCTIONS
-- ===========================================

-- Function to calculate total practice duration from drills
CREATE OR REPLACE FUNCTION calculate_practice_duration(practice_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(duration_minutes), 0)::INTEGER
  FROM practice_drills
  WHERE practice_id = practice_uuid;
$$ LANGUAGE SQL STABLE;

-- Function to get drill count by section
CREATE OR REPLACE FUNCTION get_practice_drill_counts(practice_uuid UUID)
RETURNS JSONB AS $$
  SELECT jsonb_object_agg(section, drill_count)
  FROM (
    SELECT section, COUNT(*) as drill_count
    FROM practice_drills
    WHERE practice_id = practice_uuid
    GROUP BY section
  ) counts;
$$ LANGUAGE SQL STABLE;
