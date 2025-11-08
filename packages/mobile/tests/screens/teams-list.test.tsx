import React from 'react'
import { Alert } from 'react-native'
import { renderWithProviders, screen, waitFor } from '../helpers'
import TeamsListScreen from '@/app/(tabs)/teams'
import { supabase } from '@/lib/supabase'

// Mock Expo Router
const mockPush = jest.fn()
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
    from: jest.fn(),
  },
}))

// Mock Alert
jest.spyOn(Alert, 'alert')

describe('TeamsListScreen', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' }

  const mockTeamMemberships = [
    {
      role: 'head_coach',
      teams: {
        id: 'team-1',
        name: 'Mighty Ducks',
        age_years: 10,
        level: 'A',
        season: '2024-25',
        region: 'USA',
        organization_id: 'org-1',
      },
    },
    {
      role: 'assistant_coach',
      teams: {
        id: 'team-2',
        name: 'Lightning',
        age_years: 12,
        level: 'AA',
        season: '2024-25',
        region: 'CAN',
        organization_id: 'org-1',
      },
    },
  ]

  const mockTeamsWithDisplay = [
    {
      id: 'team-1',
      name: 'Mighty Ducks',
      age_years: 10,
      age_group_display: '10U',
      level: 'A',
      season: '2024-25',
      region: 'USA',
      organization_id: 'org-1',
    },
    {
      id: 'team-2',
      name: 'Lightning',
      age_years: 12,
      age_group_display: '12U',
      level: 'AA',
      season: '2024-25',
      region: 'CAN',
      organization_id: 'org-1',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockPush.mockClear()

    // Default mock for getSession
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner while fetching teams', async () => {
      // Mock auth success but delay the teams fetch
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      let resolveTeams: any
      const teamsPromise = new Promise((resolve) => {
        resolveTeams = resolve
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        in: jest.fn().mockImplementation(() => teamsPromise),
      }))

      renderWithProviders(<TeamsListScreen />)

      // Should show loading state
      expect(screen.getByText(/loading/i)).toBeTruthy()

      // Resolve the promise
      resolveTeams({ data: [], error: null })

      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).toBeNull()
      })
    })
  })

  describe('Teams List Display', () => {
    it('displays list of teams with their details', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: mockTeamMemberships,
              error: null,
            }),
          }
        }
        if (table === 'teams_with_age_display') {
          return {
            select: jest.fn().mockReturnThis(),
            in: jest.fn().mockResolvedValue({
              data: mockTeamsWithDisplay,
              error: null,
            }),
          }
        }
        if (table === 'players') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 15,
              error: null,
            }),
          }
        }
        if (table === 'games') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 8,
              error: null,
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText('Mighty Ducks')).toBeTruthy()
      })

      // Check team details
      expect(screen.getByText('Mighty Ducks')).toBeTruthy()
      expect(screen.getByText('Lightning')).toBeTruthy()
      expect(screen.getByText('10U')).toBeTruthy()
      expect(screen.getByText('12U')).toBeTruthy()
      expect(screen.getByText('2024-25')).toBeTruthy()
    })

    it('displays team stats (player and game counts)', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: [mockTeamMemberships[0]],
              error: null,
            }),
          }
        }
        if (table === 'teams_with_age_display') {
          return {
            select: jest.fn().mockReturnThis(),
            in: jest.fn().mockResolvedValue({
              data: [mockTeamsWithDisplay[0]],
              error: null,
            }),
          }
        }
        if (table === 'players') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 18,
              error: null,
            }),
          }
        }
        if (table === 'games') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 12,
              error: null,
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText('Mighty Ducks')).toBeTruthy()
      })

      // Check stats are displayed
      expect(screen.getByText(/18/)).toBeTruthy() // player count
      expect(screen.getByText(/players/i)).toBeTruthy()
      expect(screen.getByText(/12/)).toBeTruthy() // game count
      expect(screen.getByText(/games/i)).toBeTruthy()
    })
  })

  describe('Empty State', () => {
    it('shows empty state when user has no teams', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: [],
              error: null,
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText(/no teams yet/i)).toBeTruthy()
      })

      // Should show create team button
      expect(screen.getByText(/create team/i)).toBeTruthy()
    })
  })

  describe('Error Handling', () => {
    it('shows error message when teams fetch fails', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText(/failed to load teams/i)).toBeTruthy()
      })
    })

    it('redirects to login when user is not authenticated', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' },
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/(auth)/login')
      })
    })
  })

  describe('Navigation', () => {
    it('navigates to team detail when team is tapped', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      ;(supabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: [mockTeamMemberships[0]],
              error: null,
            }),
          }
        }
        if (table === 'teams_with_age_display') {
          return {
            select: jest.fn().mockReturnThis(),
            in: jest.fn().mockResolvedValue({
              data: [mockTeamsWithDisplay[0]],
              error: null,
            }),
          }
        }
        if (table === 'players') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 15,
              error: null,
            }),
          }
        }
        if (table === 'games') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 8,
              error: null,
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText('Mighty Ducks')).toBeTruthy()
      })

      // Tap on the team card
      const teamCard = screen.getByText('Mighty Ducks')
      teamCard.props.onPress?.()

      expect(mockPush).toHaveBeenCalledWith('/teams/team-1')
    })
  })

  describe('Pull to Refresh', () => {
    it('refreshes teams list when pulled down', async () => {
      ;(supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const mockFrom = jest.fn()
      ;(supabase.from as jest.Mock) = mockFrom

      mockFrom.mockImplementation((table: string) => {
        if (table === 'team_members') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              data: [mockTeamMemberships[0]],
              error: null,
            }),
          }
        }
        if (table === 'teams_with_age_display') {
          return {
            select: jest.fn().mockReturnThis(),
            in: jest.fn().mockResolvedValue({
              data: [mockTeamsWithDisplay[0]],
              error: null,
            }),
          }
        }
        if (table === 'players') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 15,
              error: null,
            }),
          }
        }
        if (table === 'games') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({
              count: 8,
              error: null,
            }),
          }
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }
      })

      renderWithProviders(<TeamsListScreen />)

      await waitFor(() => {
        expect(screen.getByText('Mighty Ducks')).toBeTruthy()
      })

      // Clear the mock calls from initial load
      mockFrom.mockClear()

      // Find the FlatList and trigger refresh
      const flatList = screen.getByTestId('teams-flat-list')
      await flatList.props.onRefresh()

      await waitFor(() => {
        // Verify that teams were fetched again
        expect(mockFrom).toHaveBeenCalledWith('team_members')
      })
    })
  })
})
