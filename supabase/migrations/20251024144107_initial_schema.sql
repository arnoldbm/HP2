-- Initial Schema for HP2 Hockey Practice Planner
-- Creates core entities: organizations, teams, players
-- Implements USA/Canada age group handling

-- ===========================================
-- ORGANIZATIONS
-- ===========================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_organizations_slug ON organizations(slug);

-- ===========================================
-- USER PROFILES (extends Supabase auth.users)
-- ===========================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===========================================
-- ORGANIZATION MEMBERS
-- ===========================================

CREATE TYPE org_role AS ENUM ('owner', 'admin', 'coach', 'manager', 'stat_tracker');

CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role org_role NOT NULL DEFAULT 'coach',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);

-- ===========================================
-- TEAMS
-- ===========================================

CREATE TYPE team_level AS ENUM ('house', 'travel', 'aaa', 'aa', 'a');

-- Age stored as integer to support both USA and Canada conventions
-- USA: 8U, 10U, 12U, 14U, 16U, 18U (2-year bands)
-- Canada: U9, U10, U11, U12, U13, U14, U15, U16, U17, U18 (single-year)
--
-- Examples:
--   age_years = 9 means "U9" (Canada) or "8U" (USA)
--   age_years = 11 means "U11" (Canada) or "10U" (USA)
--   age_years = 13 means "U13" (Canada) or "12U" (USA)

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,

  -- Age group stored as integer for flexibility
  age_years INTEGER NOT NULL CHECK (age_years BETWEEN 6 AND 21),

  level team_level NOT NULL,
  season TEXT NOT NULL,  -- e.g., "2024-25"

  -- Regional settings (determines display format)
  region TEXT DEFAULT 'usa' CHECK (region IN ('usa', 'canada')),
  -- 'usa': age_years=9 displays as "8U"
  -- 'canada': age_years=9 displays as "U9"

  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_teams_org ON teams(organization_id);
CREATE INDEX idx_teams_age ON teams(age_years);

-- Helper function to format age group for display
CREATE OR REPLACE FUNCTION format_age_group(age_years INTEGER, region TEXT)
RETURNS TEXT AS $$
BEGIN
  IF region = 'usa' THEN
    -- USA format: 8U (even numbers)
    -- age_years=9 -> 8U, age_years=11 -> 10U
    RETURN (age_years - 1)::TEXT || 'U';
  ELSE
    -- Canada format: U9, U10, U11, etc.
    RETURN 'U' || age_years::TEXT;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- View for formatted age groups
CREATE VIEW teams_with_age_display AS
SELECT
  t.*,
  format_age_group(t.age_years, t.region) as age_group_display
FROM teams t;

-- ===========================================
-- TEAM MEMBERS
-- ===========================================

CREATE TYPE team_role AS ENUM ('head_coach', 'assistant_coach', 'manager', 'stat_tracker');

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role team_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);

-- ===========================================
-- PLAYERS
-- ===========================================

CREATE TYPE player_position AS ENUM ('forward', 'defense', 'goalie');

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  jersey_number INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position player_position NOT NULL,
  birthdate DATE,
  metadata JSONB DEFAULT '{}',  -- skill ratings, notes, etc.
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, jersey_number)
);

CREATE INDEX idx_players_team ON players(team_id);

-- ===========================================
-- UPDATED_AT TRIGGER
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- ROW LEVEL SECURITY (RLS) - Basic Setup
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- TODO: Add comprehensive RLS policies in next migration
-- For now, allow authenticated users to read all (will be refined)
CREATE POLICY "Allow authenticated read access" ON organizations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON teams
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON players
  FOR SELECT TO authenticated USING (true);
