-- Fix RLS policies for team_members table
-- The table had RLS enabled but no policies, blocking the game_events INSERT policy subquery

-- Allow authenticated users to view team memberships
-- This is needed for the game_events RLS policies to work
CREATE POLICY "Users can view all team memberships" ON team_members
  FOR SELECT TO authenticated
  USING (true);

-- Allow users to view their own memberships
CREATE POLICY "Users can view their own memberships" ON team_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Allow team admins/coaches to add members
CREATE POLICY "Team members can add other members" ON team_members
  FOR INSERT TO authenticated
  WITH CHECK (
    team_id IN (
      SELECT team_id FROM team_members
      WHERE user_id = auth.uid()
      AND role IN ('head_coach', 'assistant_coach')
    )
  );
