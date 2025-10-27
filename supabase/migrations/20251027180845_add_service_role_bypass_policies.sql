-- Add Service Role Bypass Policies
-- Service role should have full access to all tables for testing and admin operations

-- Games: Service role can do everything
CREATE POLICY "Service role has full access to games" ON games
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Game Events: Service role can do everything
CREATE POLICY "Service role has full access to game_events" ON game_events
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Event Edit History: Service role can do everything
CREATE POLICY "Service role has full access to event_edit_history" ON event_edit_history
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Game Analytics: Service role can do everything
CREATE POLICY "Service role has full access to game_analytics" ON game_analytics
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Teams: Service role can do everything
CREATE POLICY "Service role has full access to teams" ON teams
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Players: Service role can do everything
CREATE POLICY "Service role has full access to players" ON players
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Organizations: Service role can do everything
CREATE POLICY "Service role has full access to organizations" ON organizations
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Team Members: Service role can do everything
CREATE POLICY "Service role has full access to team_members" ON team_members
  TO service_role
  USING (true)
  WITH CHECK (true);