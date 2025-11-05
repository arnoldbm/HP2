'use server'

import { supabaseAdmin } from '@/lib/db/supabase-admin'
import type { Player } from '@/lib/stores/game-tracking-store-configured'

/**
 * Server action to set up demo data for the game tracking demo
 * Creates organization, team, players, and game for the authenticated user
 * Returns gameId and players
 *
 * Note: userId must be passed from client since server actions can't reliably read auth cookies
 */
export async function setupDemoGameData(userId: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }
    // 1. Create or get user's organization
    // Use user ID to create a unique slug for each user
    const orgSlug = `demo-org-${userId.substring(0, 8)}`

    let org = await supabaseAdmin
      .from('organizations')
      .select()
      .eq('slug', orgSlug)
      .maybeSingle()

    if (!org.data) {
      const { data, error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          name: 'My Hockey Club',
          slug: orgSlug,
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
      .limit(1)
      .maybeSingle()

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

    // 3. Add user as team member (head_coach role)
    const existingMembership = await supabaseAdmin
      .from('team_members')
      .select()
      .eq('team_id', team.data.id)
      .eq('user_id', userId)
      .maybeSingle()

    if (!existingMembership.data) {
      console.log('Creating team membership for user:', userId, 'team:', team.data.id)
      const { error: memberError } = await supabaseAdmin.from('team_members').insert({
        team_id: team.data.id,
        user_id: userId,
        role: 'head_coach',
      })

      if (memberError) {
        console.error('Failed to create team membership:', memberError)
        throw memberError
      }
      console.log('✅ Team membership created successfully')
    } else {
      console.log('✅ Team membership already exists')
    }

    // 4. Create demo players (if they don't exist)
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

    // 5. Create a demo game (if it doesn't exist)
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
