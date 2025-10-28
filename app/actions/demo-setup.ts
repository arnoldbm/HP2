'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import type { Player } from '@/lib/stores/game-tracking-store'

/**
 * Server action to set up demo data for the game tracking demo
 * Returns gameId and players
 */
export async function setupDemoGameData() {
  try {
    // 1. Create or get organization
    let org = await supabaseAdmin
      .from('organizations')
      .select()
      .eq('slug', 'demo-hockey-club')
      .single()

    if (!org.data) {
      const { data, error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          name: 'Demo Hockey Club',
          slug: 'demo-hockey-club',
        })
        .select()
        .single()

      if (orgError) throw orgError
      org.data = data
    }

    // 2. Create or get team
    let team = await supabaseAdmin
      .from('teams')
      .select()
      .eq('organization_id', org.data.id)
      .eq('name', 'Demo Team')
      .single()

    if (!team.data) {
      const { data, error: teamError } = await supabaseAdmin
        .from('teams')
        .insert({
          organization_id: org.data.id,
          name: 'Demo Team',
          age_years: 14,
          level: 'aa',
          season: '2024-25',
          region: 'usa',
        })
        .select()
        .single()

      if (teamError) throw teamError
      team.data = data
    }

    // 3. Create demo players (if they don't exist)
    const demoPlayers = [
      { jersey_number: 7, first_name: 'Connor', last_name: 'McDavid', position: 'forward' as const },
      { jersey_number: 97, first_name: 'Connor', last_name: 'Bedard', position: 'forward' as const },
      { jersey_number: 88, first_name: 'David', last_name: 'Pastrnak', position: 'forward' as const },
      { jersey_number: 13, first_name: 'Matthew', last_name: 'Tkachuk', position: 'forward' as const },
      { jersey_number: 29, first_name: 'Leon', last_name: 'Draisaitl', position: 'forward' as const },
      { jersey_number: 44, first_name: 'Erik', last_name: 'Karlsson', position: 'defense' as const },
      { jersey_number: 65, first_name: 'Cale', last_name: 'Makar', position: 'defense' as const },
      { jersey_number: 8, first_name: 'Quinn', last_name: 'Hughes', position: 'defense' as const },
      { jersey_number: 55, first_name: 'Mark', last_name: 'Scheifele', position: 'forward' as const },
      { jersey_number: 19, first_name: 'Auston', last_name: 'Matthews', position: 'forward' as const },
      { jersey_number: 1, first_name: 'Igor', last_name: 'Shesterkin', position: 'goalie' as const },
      { jersey_number: 31, first_name: 'Carey', last_name: 'Price', position: 'goalie' as const },
    ]

    // Check if players exist
    let players = await supabaseAdmin
      .from('players')
      .select()
      .eq('team_id', team.data.id)

    if (!players.data || players.data.length === 0) {
      const { data, error: playersError } = await supabaseAdmin
        .from('players')
        .insert(
          demoPlayers.map((p) => ({
            team_id: team.data.id,
            ...p,
          }))
        )
        .select()

      if (playersError) throw playersError
      players.data = data
    }

    // 4. Create a demo game (if it doesn't exist)
    // Get the most recent demo game or create one
    let game = await supabaseAdmin
      .from('games')
      .select()
      .eq('team_id', team.data.id)
      .eq('opponent_name', 'Rival Team')
      .eq('status', 'in_progress')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!game.data) {
      const { data, error: gameError } = await supabaseAdmin
        .from('games')
        .insert({
          team_id: team.data.id,
          opponent_name: 'Rival Team',
          game_date: new Date().toISOString(),
          is_home: true,
          status: 'in_progress',
          final_score_us: 0,
          final_score_them: 0,
        })
        .select()
        .single()

      if (gameError) throw gameError
      game.data = data
    }

    // Map players to the store format
    const mappedPlayers: Player[] = players.data.map((p) => ({
      id: p.id,
      jerseyNumber: p.jersey_number,
      firstName: p.first_name,
      lastName: p.last_name,
      position: p.position as any,
    }))

    return {
      gameId: game.data.id,
      players: mappedPlayers,
    }
  } catch (error) {
    console.error('Error setting up demo data:', error)
    throw error
  }
}
