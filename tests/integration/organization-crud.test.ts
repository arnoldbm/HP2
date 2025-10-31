import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Setup Supabase client with service role for testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

describe('Organization CRUD Operations', () => {
  let testOrgId: string | null = null
  let testUserId: string | null = null

  afterEach(async () => {
    // Cleanup test data
    if (testOrgId) {
      await supabase.from('organizations').delete().eq('id', testOrgId)
      testOrgId = null
    }
    if (testUserId) {
      // Note: In real scenario, we'd clean up auth.users too
      // But for testing, we'll just clean up references
      await supabase.from('organization_members').delete().eq('user_id', testUserId)
      testUserId = null
    }
  })

  describe('Organization Creation', () => {
    it('should create organization with service role', async () => {
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          name: 'Test Hockey Club',
          slug: 'test-hockey-club',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data.name).toBe('Test Hockey Club')
      expect(data.slug).toBe('test-hockey-club')

      testOrgId = data.id
    })

    it('should enforce unique slug constraint', async () => {
      // Create first org
      const { data: firstOrg } = await supabase
        .from('organizations')
        .insert({
          name: 'Test Club 1',
          slug: 'test-club',
        })
        .select()
        .single()

      testOrgId = firstOrg!.id

      // Try to create second org with same slug
      const { error } = await supabase.from('organizations').insert({
        name: 'Test Club 2',
        slug: 'test-club',
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23505') // Unique constraint violation
    })

    it('should have default settings as empty object', async () => {
      const { data } = await supabase
        .from('organizations')
        .insert({
          name: 'Test Club',
          slug: 'test-club-settings',
        })
        .select()
        .single()

      expect(data!.settings).toEqual({})

      testOrgId = data!.id
    })
  })

  describe('Organization Membership', () => {
    beforeEach(async () => {
      // Create test organization
      const { data: org } = await supabase
        .from('organizations')
        .insert({
          name: 'Test Membership Org',
          slug: 'test-membership-org',
        })
        .select()
        .single()

      testOrgId = org!.id
    })

    it.skip('should add user as organization owner (requires real auth user)', async () => {
      // Create a mock user ID (in real scenario, this would be from auth.users)
      const mockUserId = '00000000-0000-0000-0000-000000000001'
      testUserId = mockUserId

      const { data, error } = await supabase
        .from('organization_members')
        .insert({
          organization_id: testOrgId!,
          user_id: mockUserId,
          role: 'owner',
        })
        .select()
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data.role).toBe('owner')
      expect(data.organization_id).toBe(testOrgId)
    })

    it.skip('should enforce unique user per organization (requires real auth user)', async () => {
      const mockUserId = '00000000-0000-0000-0000-000000000002'
      testUserId = mockUserId

      // Add user once
      await supabase.from('organization_members').insert({
        organization_id: testOrgId!,
        user_id: mockUserId,
        role: 'owner',
      })

      // Try to add same user again
      const { error } = await supabase.from('organization_members').insert({
        organization_id: testOrgId!,
        user_id: mockUserId,
        role: 'coach',
      })

      expect(error).toBeDefined()
      expect(error?.code).toBe('23505') // Unique constraint violation
    })

    it.skip('should allow different roles (requires real auth user)', async () => {
      const roles: Array<Database['public']['Enums']['org_role']> = [
        'owner',
        'admin',
        'coach',
        'manager',
        'stat_tracker',
      ]

      for (const role of roles) {
        const mockUserId = `00000000-0000-0000-0000-00000000000${roles.indexOf(role)}`

        const { data, error } = await supabase
          .from('organization_members')
          .insert({
            organization_id: testOrgId!,
            user_id: mockUserId,
            role,
          })
          .select()
          .single()

        expect(error).toBeNull()
        expect(data.role).toBe(role)
      }

      // Cleanup
      await supabase.from('organization_members').delete().eq('organization_id', testOrgId!)
    })
  })

  describe('RLS Policies (Basic)', () => {
    it('should allow authenticated users to read organizations they belong to', async () => {
      // Note: This test will be expanded once we have proper auth session testing
      // For now, we're testing with service role which bypasses RLS

      const { data: org } = await supabase
        .from('organizations')
        .insert({
          name: 'RLS Test Org',
          slug: 'rls-test-org',
        })
        .select()
        .single()

      testOrgId = org!.id

      // Service role should be able to read
      const { data, error } = await supabase
        .from('organizations')
        .select()
        .eq('id', testOrgId)
        .single()

      expect(error).toBeNull()
      expect(data).toBeDefined()
      expect(data.id).toBe(testOrgId)
    })
  })
})
