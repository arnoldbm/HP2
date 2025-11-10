-- Replace generic player policies with role-based policies
-- Role-based access control:
-- - Head Coach, Assistant Coach, Manager: Can INSERT, UPDATE, DELETE players
-- - Stat Tracker: Can only READ players (for game tracking)
-- - All authenticated users: Can READ players they have team access to

-- Drop the generic policies we just created
DROP POLICY IF EXISTS "Team members can insert players" ON players;
DROP POLICY IF EXISTS "Team members can update players" ON players;
DROP POLICY IF EXISTS "Team members can delete players" ON players;

-- INSERT: Only coaches and managers can add players
CREATE POLICY "Coaches and managers can insert players" ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = players.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('head_coach', 'assistant_coach', 'manager')
    )
  );

-- UPDATE: Only coaches and managers can edit players
CREATE POLICY "Coaches and managers can update players" ON players
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = players.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('head_coach', 'assistant_coach', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = players.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('head_coach', 'assistant_coach', 'manager')
    )
  );

-- DELETE: Only coaches and managers can remove players
CREATE POLICY "Coaches and managers can delete players" ON players
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = players.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('head_coach', 'assistant_coach', 'manager')
    )
  );

-- Note: The SELECT policy "Allow authenticated read access" already exists
-- from the initial schema migration, which allows all team members (including
-- stat trackers) to read players for game tracking purposes.
