import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { TeamProvider, useTeam } from '@/lib/contexts/team-context'
import { supabase } from '@/lib/db/supabase'

// Mock Supabase
vi.mock('@/lib/db/supabase', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getUser: vi.fn(),
    },
  },
}))

describe('TeamContext', () => {
  const mockUser = { id: 'test-user-id' }
  const mockTeam = {
    id: 'team-1',
    name: 'Thunder 2015',
    age_group_display: '10U',
    level: 'aa',
    season: '2025-26',
  }

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()

    // Mock getUser to return test user
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    } as any)

    // Mock database queries
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: mockTeam, error: null }),
    } as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('useTeam Hook', () => {
    it('should throw error when used outside TeamProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        renderHook(() => useTeam())
      }).toThrow('useTeam must be used within TeamProvider')

      consoleSpy.mockRestore()
    })

    it('should provide team context when used within provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      expect(result.current).toBeDefined()
      expect(result.current).toHaveProperty('selectedTeamId')
      expect(result.current).toHaveProperty('currentTeam')
      expect(result.current).toHaveProperty('selectTeam')
      expect(result.current).toHaveProperty('isLoading')
    })
  })

  describe('Initial State', () => {
    it('should start with null team if no initialTeamId', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      expect(result.current.selectedTeamId).toBeNull()
      expect(result.current.currentTeam).toBeNull()
    })

    it('should start with initialTeamId if provided', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider initialTeamId="team-1">{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.selectedTeamId).toBe('team-1')
      })
    })

    it('should fetch team data on mount if initialTeamId provided', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider initialTeamId="team-1">{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.currentTeam).toEqual(mockTeam)
      })
    })
  })

  describe('Team Selection', () => {
    it('should update selectedTeamId when selectTeam called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      act(() => {
        result.current.selectTeam('team-2')
      })

      expect(result.current.selectedTeamId).toBe('team-2')
    })

    it('should fetch team data when team selected', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      act(() => {
        result.current.selectTeam('team-1')
      })

      await waitFor(() => {
        expect(result.current.currentTeam).toEqual(mockTeam)
      })
    })

    it('should set isLoading true while fetching team', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      act(() => {
        result.current.selectTeam('team-1')
      })

      // Should be loading immediately after selectTeam
      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })
  })

  describe('localStorage Persistence', () => {
    it('should save selectedTeamId to localStorage', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.selectedTeamId).toBeNull() // Wait for initial render
      })

      act(() => {
        result.current.selectTeam('team-1')
      })

      await waitFor(() => {
        const stored = localStorage.getItem('current_team_test-user-id')
        expect(stored).toBe('team-1')
      })
    })

    it('should load selectedTeamId from localStorage on mount', async () => {
      // Pre-populate localStorage
      localStorage.setItem('current_team_test-user-id', 'team-from-storage')

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.selectedTeamId).toBe('team-from-storage')
      })
    })

    it('should prefer initialTeamId over localStorage', async () => {
      // Pre-populate localStorage
      localStorage.setItem('current_team_test-user-id', 'team-from-storage')

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider initialTeamId="explicit-team">{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.selectedTeamId).toBe('explicit-team')
      })
    })

    it('should clear localStorage when team set to null', async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider initialTeamId="team-1">{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      // Wait for initial team to be set
      await waitFor(() => {
        expect(result.current.selectedTeamId).toBe('team-1')
      })

      await waitFor(() => {
        expect(localStorage.getItem('current_team_test-user-id')).toBe('team-1')
      })

      // Then clear it
      act(() => {
        result.current.selectTeam(null)
      })

      await waitFor(() => {
        expect(localStorage.getItem('current_team_test-user-id')).toBeNull()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle team fetch errors gracefully', async () => {
      // Mock database error
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Team not found' },
        }),
      } as any)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      act(() => {
        result.current.selectTeam('non-existent-team')
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.currentTeam).toBeNull()
        expect(result.current.error).toBe('Team not found')
      })
    })

    it('should handle auth errors', async () => {
      // Mock auth error
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' },
      } as any)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      await waitFor(() => {
        expect(result.current.error).toBe('Not authenticated')
      })
    })
  })

  describe('Team Data Caching', () => {
    it('should not refetch if same team selected twice', async () => {
      const mockSelect = vi.fn().mockReturnThis()
      const mockEq = vi.fn().mockReturnThis()
      const mockSingle = vi.fn().mockResolvedValue({ data: mockTeam, error: null })

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
        eq: mockEq,
        single: mockSingle,
      } as any)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TeamProvider>{children}</TeamProvider>
      )

      const { result } = renderHook(() => useTeam(), { wrapper })

      // Select team first time
      act(() => {
        result.current.selectTeam('team-1')
      })

      await waitFor(() => {
        expect(result.current.currentTeam).toEqual(mockTeam)
      })

      const callCountAfterFirst = mockSingle.mock.calls.length

      // Select same team again
      act(() => {
        result.current.selectTeam('team-1')
      })

      // Should not trigger additional fetch
      expect(mockSingle.mock.calls.length).toBe(callCountAfterFirst)
    })
  })
})
