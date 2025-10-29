import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

/**
 * Integration Tests for Practice Planning
 *
 * Tests the complete practice planning workflow including:
 * - Practice creation (manual and AI-generated)
 * - Practice drill associations
 * - Drill title matching
 * - RLS policy enforcement
 * - Practice retrieval and filtering
 *
 * These tests use the local Supabase instance.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Service role client for setup/teardown (bypasses RLS)
const supabaseServiceRole = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  {
    auth: {
      storageKey: 'test-practice-service-role-storage',
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Test data IDs
let testOrgId: string
let testTeamId: string
let testUserId: string
let testGameId: string
let testDrillIds: string[] = []

const testRunId = Date.now()
const testOrgSlug = `test-practice-org-${testRunId}`
const testUserEmail = `testcoach-practice-${testRunId}@example.com`

describe.sequential('Practice Planning Integration Tests', () => {
  beforeAll(async () => {
    // Create test organization
    const { data: org, error: orgError } = await supabaseServiceRole
      .from('organizations')
      .insert({
        name: 'Test Practice Org',
        slug: testOrgSlug,
      })
      .select()
      .single()

    if (orgError) throw orgError
    testOrgId = org.id

    // Create test user
    const { data: authUser, error: authError } = await supabaseServiceRole.auth.admin.createUser({
      email: testUserEmail,
      password: 'testpassword123',
      email_confirm: true,
    })

    if (authError) throw authError
    testUserId = authUser.user.id

    // Create test team
    const { data: team, error: teamError } = await supabaseServiceRole
      .from('teams')
      .insert({
        organization_id: testOrgId,
        name: 'Test U13 Practice Team',
        age_years: 13,
        region: 'usa',
        level: 'aaa',
        season: '2024-25',
      })
      .select()
      .single()

    if (teamError) throw teamError
    testTeamId = team.id

    // Add user to team as coach
    await supabaseServiceRole.from('team_members').insert({
      team_id: testTeamId,
      user_id: testUserId,
      role: 'head_coach',
    })

    // Create test game
    const { data: game, error: gameError } = await supabaseServiceRole
      .from('games')
      .insert({
        team_id: testTeamId,
        opponent_name: 'Test Opponent',
        game_date: '2024-02-15T19:00:00Z',
        status: 'completed',
      })
      .select()
      .single()

    if (gameError) throw gameError
    testGameId = game.id

    // Create test drills for matching
    const testDrills = [
      {
        title: 'Breakout Transitions Drill',
        description: 'Practice quick breakout exits',
        category: 'breakouts',
        duration_minutes: 10,
        skill_level: 'intermediate',
        is_global: true,
      },
      {
        title: 'High Slot Shooting',
        description: 'Shooting from high danger areas',
        category: 'shooting',
        duration_minutes: 15,
        skill_level: 'all',
        is_global: true,
      },
      {
        title: 'Puck Protection in Traffic',
        description: 'Maintaining possession under pressure',
        category: 'skating',
        duration_minutes: 12,
        skill_level: 'intermediate',
        is_global: true,
      },
    ]

    for (const drill of testDrills) {
      const { data, error } = await supabaseServiceRole
        .from('drills')
        .insert(drill)
        .select()
        .single()

      if (error) throw error
      testDrillIds.push(data.id)
    }
  })

  afterAll(async () => {
    // Clean up test data
    if (testUserId) {
      await supabaseServiceRole.auth.admin.deleteUser(testUserId)
    }
    if (testOrgId) {
      await supabaseServiceRole.from('organizations').delete().eq('id', testOrgId)
    }
    // Clean up test drills
    if (testDrillIds.length > 0) {
      await supabaseServiceRole.from('drills').delete().in('id', testDrillIds)
    }
  })

  beforeEach(async () => {
    // Clean up practices before each test
    await supabaseServiceRole.from('practices').delete().eq('team_id', testTeamId)
  })

  describe('Practice Creation', () => {
    it('should create a manual practice plan', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: testTeamId,
          practice_date: '2024-03-01T18:00:00Z',
          duration_minutes: 60,
          objectives: 'Work on breakouts and shooting',
          notes: 'Focus on weak side exits',
          generated_by_ai: false,
          status: 'planned',
          created_by: testUserId,
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data?.generated_by_ai).toBe(false)
      expect(data?.status).toBe('planned')
      expect(data?.duration_minutes).toBe(60)
    })

    it('should create an AI-generated practice plan', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: testTeamId,
          practice_date: '2024-03-02T18:00:00Z',
          duration_minutes: 60,
          objectives: 'Address breakout failures\nImprove shot quality',
          notes: 'Based on game vs Test Opponent',
          generated_by_ai: true,
          based_on_game_id: testGameId,
          ai_reasoning: {
            top_focus_areas: ['breakout_execution', 'shot_quality'],
            overall_assessment: 'Team struggled with breakouts',
            practice_goals: ['Improve breakout success rate', 'Increase high danger shots'],
          },
          status: 'planned',
          created_by: testUserId,
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data?.generated_by_ai).toBe(true)
      expect(data?.based_on_game_id).toBe(testGameId)
      expect(data?.ai_reasoning).toMatchObject({
        top_focus_areas: ['breakout_execution', 'shot_quality'],
      })
    })

    it('should enforce duration constraints', async () => {
      const { error } = await supabaseServiceRole.from('practices').insert({
        team_id: testTeamId,
        practice_date: '2024-03-01T18:00:00Z',
        duration_minutes: 200, // Exceeds max 180
        status: 'planned',
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23514') // Check constraint violation
    })

    it('should enforce foreign key constraints', async () => {
      const { error } = await supabaseServiceRole.from('practices').insert({
        team_id: '00000000-0000-0000-0000-000000000000',
        practice_date: '2024-03-01T18:00:00Z',
        duration_minutes: 60,
        status: 'planned',
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23503') // Foreign key violation
    })
  })

  describe('Practice Drills Association', () => {
    let practiceId: string

    beforeEach(async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: testTeamId,
          practice_date: '2024-03-01T18:00:00Z',
          duration_minutes: 60,
          status: 'planned',
        })
        .select()
        .single()

      if (error) throw error
      practiceId = data.id
    })

    it('should add drills to a practice plan', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practice_drills')
        .insert([
          {
            practice_id: practiceId,
            drill_id: testDrillIds[0],
            section: 'warm_up',
            sequence_order: 1,
            duration_minutes: 10,
          },
          {
            practice_id: practiceId,
            drill_id: testDrillIds[1],
            section: 'skills',
            sequence_order: 1,
            duration_minutes: 15,
          },
          {
            practice_id: practiceId,
            drill_id: testDrillIds[2],
            section: 'skills',
            sequence_order: 2,
            duration_minutes: 12,
          },
        ])
        .select()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data?.length).toBe(3)
    })

    it('should enforce unique sequence order within section', async () => {
      // Insert first drill
      await supabaseServiceRole.from('practice_drills').insert({
        practice_id: practiceId,
        drill_id: testDrillIds[0],
        section: 'skills',
        sequence_order: 1,
        duration_minutes: 10,
      })

      // Try to insert another drill with same section and sequence order
      const { error } = await supabaseServiceRole.from('practice_drills').insert({
        practice_id: practiceId,
        drill_id: testDrillIds[1],
        section: 'skills',
        sequence_order: 1, // Duplicate
        duration_minutes: 15,
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23505') // Unique constraint violation
    })

    it('should allow same sequence order in different sections', async () => {
      const { error } = await supabaseServiceRole
        .from('practice_drills')
        .insert([
          {
            practice_id: practiceId,
            drill_id: testDrillIds[0],
            section: 'warm_up',
            sequence_order: 1,
            duration_minutes: 10,
          },
          {
            practice_id: practiceId,
            drill_id: testDrillIds[1],
            section: 'skills',
            sequence_order: 1, // Same order, different section - OK
            duration_minutes: 15,
          },
        ])

      expect(error).toBeNull()
    })

    it('should store drill notes and modifications', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practice_drills')
        .insert({
          practice_id: practiceId,
          drill_id: testDrillIds[0],
          section: 'skills',
          sequence_order: 1,
          duration_minutes: 10,
          notes: 'Focus on quick first pass',
          modifications: 'Add extra pressure with forecheckers',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data?.notes).toBe('Focus on quick first pass')
      expect(data?.modifications).toBe('Add extra pressure with forecheckers')
    })

    it('should cascade delete practice drills when practice is deleted', async () => {
      // Add drills to practice
      await supabaseServiceRole.from('practice_drills').insert([
        {
          practice_id: practiceId,
          drill_id: testDrillIds[0],
          section: 'skills',
          sequence_order: 1,
          duration_minutes: 10,
        },
        {
          practice_id: practiceId,
          drill_id: testDrillIds[1],
          section: 'skills',
          sequence_order: 2,
          duration_minutes: 15,
        },
      ])

      // Delete practice
      await supabaseServiceRole.from('practices').delete().eq('id', practiceId)

      // Verify drills are also deleted
      const { data, error } = await supabaseServiceRole
        .from('practice_drills')
        .select()
        .eq('practice_id', practiceId)

      expect(error).toBeNull()
      expect(data?.length).toBe(0)
    })
  })

  describe('Drill Title Matching', () => {
    it('should match drill titles case-insensitively', async () => {
      // Fetch drills with various case
      const searchTitles = [
        'breakout transitions drill',
        'BREAKOUT TRANSITIONS DRILL',
        'Breakout Transitions Drill',
      ]

      for (const title of searchTitles) {
        const { data, error } = await supabaseServiceRole
          .from('drills')
          .select('id, title')
          .ilike('title', title)
          .single()

        expect(error).toBeNull()
        expect(data).toBeDefined()
        expect(data?.title).toBe('Breakout Transitions Drill')
      }
    })

    it('should find drills by partial title match', async () => {
      const { data, error } = await supabaseServiceRole
        .from('drills')
        .select('id, title')
        .ilike('title', '%shooting%')

      expect(error).toBeNull()
      expect(data?.length).toBeGreaterThan(0)
      expect(data?.some((d) => d.title === 'High Slot Shooting')).toBe(true)
    })
  })

  describe('Practice Retrieval and Filtering', () => {
    beforeEach(async () => {
      // Create multiple practices for filtering tests
      await supabaseServiceRole.from('practices').insert([
        {
          team_id: testTeamId,
          practice_date: '2024-03-01T18:00:00Z',
          duration_minutes: 60,
          status: 'planned',
          generated_by_ai: false,
        },
        {
          team_id: testTeamId,
          practice_date: '2024-03-05T18:00:00Z',
          duration_minutes: 60,
          status: 'completed',
          generated_by_ai: true,
          based_on_game_id: testGameId,
        },
        {
          team_id: testTeamId,
          practice_date: '2024-03-10T18:00:00Z',
          duration_minutes: 45,
          status: 'planned',
          generated_by_ai: false,
        },
      ])
    })

    it('should retrieve all practices for a team', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .select()
        .eq('team_id', testTeamId)

      expect(error).toBeNull()
      expect(data?.length).toBe(3)
    })

    it('should filter practices by status', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .select()
        .eq('team_id', testTeamId)
        .eq('status', 'planned')

      expect(error).toBeNull()
      expect(data?.length).toBe(2)
    })

    it('should filter practices by AI generation flag', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .select()
        .eq('team_id', testTeamId)
        .eq('generated_by_ai', true)

      expect(error).toBeNull()
      expect(data?.length).toBe(1)
      expect(data?.[0].based_on_game_id).toBe(testGameId)
    })

    it('should order practices by date descending', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .select()
        .eq('team_id', testTeamId)
        .order('practice_date', { ascending: false })

      expect(error).toBeNull()
      expect(data?.length).toBe(3)
      expect(new Date(data![0].practice_date).getTime()).toBeGreaterThan(
        new Date(data![1].practice_date).getTime()
      )
    })

    it('should join practices with drills', async () => {
      // Create practice with drills
      const { data: practice } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: testTeamId,
          practice_date: '2024-03-15T18:00:00Z',
          duration_minutes: 60,
          status: 'planned',
        })
        .select()
        .single()

      await supabaseServiceRole.from('practice_drills').insert([
        {
          practice_id: practice!.id,
          drill_id: testDrillIds[0],
          section: 'skills',
          sequence_order: 1,
          duration_minutes: 10,
        },
        {
          practice_id: practice!.id,
          drill_id: testDrillIds[1],
          section: 'skills',
          sequence_order: 2,
          duration_minutes: 15,
        },
      ])

      // Query with join
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .select(
          `
          *,
          practice_drills (
            *,
            drills (
              id,
              title,
              category
            )
          )
        `
        )
        .eq('id', practice!.id)
        .single()

      expect(error).toBeNull()
      expect(data?.practice_drills).toBeDefined()
      expect(data?.practice_drills?.length).toBe(2)
      expect(data?.practice_drills?.[0].drills).toBeDefined()
    })
  })

  describe('RLS Policy Enforcement', () => {
    let otherTeamId: string
    let otherPracticeId: string
    let userClient: ReturnType<typeof createClient<Database>>

    beforeEach(async () => {
      // Create another team that user is NOT a member of
      const { data: otherTeam, error: teamError } = await supabaseServiceRole
        .from('teams')
        .insert({
          organization_id: testOrgId,
          name: 'Other Team U15',
          age_years: 15,
          region: 'usa',
          level: 'aa',
          season: '2024-25',
        })
        .select()
        .single()

      if (teamError) throw teamError
      otherTeamId = otherTeam.id

      // Create practice for other team
      const { data: otherPractice, error: practiceError } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: otherTeamId,
          practice_date: '2024-03-01T18:00:00Z',
          duration_minutes: 60,
          status: 'planned',
        })
        .select()
        .single()

      if (practiceError) throw practiceError
      otherPracticeId = otherPractice.id

      // Create authenticated user client
      userClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          storageKey: 'test-practice-user-storage',
          autoRefreshToken: false,
          persistSession: false,
        },
      })

      await userClient.auth.signInWithPassword({
        email: testUserEmail,
        password: 'testpassword123',
      })
    })

    afterEach(async () => {
      if (userClient) {
        await userClient.auth.signOut()
      }
      // Clean up other team
      if (otherTeamId) {
        await supabaseServiceRole.from('teams').delete().eq('id', otherTeamId)
      }
    })

    it('should allow users to view their team\'s practices', async () => {
      // Create practice for user's team
      await supabaseServiceRole.from('practices').insert({
        team_id: testTeamId,
        practice_date: '2024-03-01T18:00:00Z',
        duration_minutes: 60,
        status: 'planned',
      })

      const { data, error } = await userClient.from('practices').select().eq('team_id', testTeamId)

      expect(error).toBeNull()
      expect(data?.length).toBeGreaterThan(0)
    })

    it('should NOT allow users to view other team\'s practices', async () => {
      const { data, error } = await userClient.from('practices').select().eq('team_id', otherTeamId)

      expect(error).toBeNull()
      expect(data?.length).toBe(0) // RLS filters out other team's practices
    })

    it('should NOT allow users to update other team\'s practices', async () => {
      const { error } = await userClient
        .from('practices')
        .update({ notes: 'Hacked!' })
        .eq('id', otherPracticeId)

      // Update will succeed but affect 0 rows due to RLS
      expect(error).toBeNull()

      // Verify practice was not updated
      const { data } = await supabaseServiceRole
        .from('practices')
        .select()
        .eq('id', otherPracticeId)
        .single()

      expect(data?.notes).not.toBe('Hacked!')
    })
  })

  describe('Practice Status Transitions', () => {
    let practiceId: string

    beforeEach(async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .insert({
          team_id: testTeamId,
          practice_date: '2024-03-01T18:00:00Z',
          duration_minutes: 60,
          status: 'planned',
        })
        .select()
        .single()

      if (error) throw error
      practiceId = data.id
    })

    it('should transition practice from planned to completed', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          completed_by: testUserId,
        })
        .eq('id', practiceId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(data?.status).toBe('completed')
      expect(data?.completed_at).toBeDefined()
      expect(data?.completed_by).toBe(testUserId)
    })

    it('should allow cancelling a practice', async () => {
      const { data, error } = await supabaseServiceRole
        .from('practices')
        .update({
          status: 'cancelled',
        })
        .eq('id', practiceId)
        .select()
        .single()

      expect(error).toBeNull()
      expect(data?.status).toBe('cancelled')
    })
  })
})
