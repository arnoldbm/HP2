import { supabaseAdmin } from './supabase'
import type { Player } from '@/lib/stores/game-tracking-store'

/**
 * Set up demo data for the game tracking demo
 * Returns gameId and players
 */
export async function setupDemoGameData() {
  try {
    // 1. Create or get organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .upsert({
        name: 'Demo Hockey Club',
        slug: 'demo-hockey-club',
      })
      .select()
      .single()

    if (orgError) throw orgError

    // 2. Create or get team
    const { data: team, error: teamError } = await supabaseAdmin
      .from('teams')
      .upsert({
        organization_id: org.id,
        name: 'Demo Team',
        age_years: 14,
        level: 'aa',
        season: '2024-25',
        region: 'usa',
      })
      .select()
      .single()

    if (teamError) throw teamError

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

    const { data: players, error: playersError } = await supabaseAdmin
      .from('players')
      .upsert(
        demoPlayers.map((p) => ({
          team_id: team.id,
          ...p,
        })),
        {
          onConflict: 'team_id,jersey_number',
        }
      )
      .select()

    if (playersError) throw playersError

    // 4. Create a demo game (if it doesn't exist)
    const { data: game, error: gameError } = await supabaseAdmin
      .from('games')
      .upsert({
        team_id: team.id,
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

    // Map players to the store format
    const mappedPlayers: Player[] = players.map((p) => ({
      id: p.id,
      jerseyNumber: p.jersey_number,
      firstName: p.first_name,
      lastName: p.last_name,
      position: p.position as any,
    }))

    return {
      gameId: game.id,
      players: mappedPlayers,
    }
  } catch (error) {
    console.error('Error setting up demo data:', error)
    throw error
  }
}

/**
 * Clean up demo game events (for testing)
 */
export async function clearDemoGameEvents(gameId: string) {
  const { error } = await supabaseAdmin
    .from('game_events')
    .delete()
    .eq('game_id', gameId)

  if (error) {
    console.error('Error clearing demo events:', error)
    throw error
  }
}
