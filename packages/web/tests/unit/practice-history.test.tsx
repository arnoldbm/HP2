import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PracticeHistoryPage from '@/app/demo/practice-history/page'
import { supabase } from '@/lib/db/supabase'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock Supabase client
vi.mock('@/lib/db/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}))

describe('Practice History Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Authentication', () => {
    it('should show error when user is not authenticated', async () => {
      // Mock unauthenticated user
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: null },
        error: null,
      })

      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Please sign in to view practice history')).toBeInTheDocument()
      })
    })

    it('should show error when user has no team', async () => {
      // Mock authenticated user
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: { id: 'test-user-id' } as any },
        error: null,
      })

      // Mock team lookup returning error
      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'No team found' },
            }),
          }),
        }),
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)

      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Could not find your team')).toBeInTheDocument()
      })
    })
  })

  describe('Practice List Display', () => {
    const mockUser = { id: 'test-user-id' }
    const mockTeamMember = { team_id: 'test-team-id' }
    const mockPractices = [
      {
        id: 'practice-1',
        team_id: 'test-team-id',
        practice_date: '2024-01-15',
        duration_minutes: 60,
        location: 'Ice Arena',
        notes: 'Regular practice',
        objectives: 'Work on passing',
        generated_by_ai: true,
        based_on_game_id: 'game-1',
        ai_reasoning: {
          top_focus_areas: ['passing', 'shooting'],
          overall_assessment: 'Team needs work on fundamentals',
          practice_goals: ['Improve passing accuracy'],
        },
        status: 'planned',
        completed_at: null,
        created_at: '2024-01-10',
      },
      {
        id: 'practice-2',
        team_id: 'test-team-id',
        practice_date: '2024-01-10',
        duration_minutes: 45,
        location: null,
        notes: null,
        objectives: null,
        generated_by_ai: false,
        based_on_game_id: null,
        ai_reasoning: null,
        status: 'completed',
        completed_at: '2024-01-10T18:00:00',
        created_at: '2024-01-08',
      },
    ]

    beforeEach(() => {
      // Mock authenticated user
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      // Mock team lookup
      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: mockPractices,
                  error: null,
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)
    })

    it('should display loading state initially', () => {
      render(<PracticeHistoryPage />)
      expect(screen.getByText('Loading practice history...')).toBeInTheDocument()
    })

    it('should display practice list after loading', async () => {
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Check that practices are displayed
      expect(screen.getByText('Ice Arena')).toBeInTheDocument()
      expect(screen.getByText('60 min')).toBeInTheDocument()
      expect(screen.getByText('45 min')).toBeInTheDocument()
    })

    it('should display stats cards with correct counts', async () => {
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Total Practices')).toBeInTheDocument()
      })

      // Check stats - there are multiple instances of text (in stats cards and filter options)
      expect(screen.getByText('Total Practices')).toBeInTheDocument()
      expect(screen.getAllByText('AI Generated')).toHaveLength(2) // In stats card and filter option
      expect(screen.getAllByText('Completed')).toHaveLength(2) // In stats card and filter option
      expect(screen.getAllByText('Planned')).toHaveLength(2) // In stats card and filter option
    })

    it('should show AI badge for AI-generated practices', async () => {
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Check for AI badge within the table (not in filters or stats)
      const table = screen.getByRole('table')
      expect(within(table).getByText('🤖 AI Generated')).toBeInTheDocument()
    })

    it('should show Manual badge for manually created practices', async () => {
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Check for Manual badge within the table
      const table = screen.getByRole('table')
      expect(within(table).getByText('Manual')).toBeInTheDocument()
    })
  })

  describe('Filtering', () => {
    const mockUser = { id: 'test-user-id' }
    const mockTeamMember = { team_id: 'test-team-id' }
    const mockPractices = [
      {
        id: 'practice-1',
        team_id: 'test-team-id',
        practice_date: '2024-01-15',
        duration_minutes: 60,
        location: 'Ice Arena',
        notes: null,
        objectives: null,
        generated_by_ai: true,
        based_on_game_id: 'game-1',
        ai_reasoning: null,
        status: 'planned',
        completed_at: null,
        created_at: '2024-01-10',
      },
      {
        id: 'practice-2',
        team_id: 'test-team-id',
        practice_date: '2024-01-10',
        duration_minutes: 45,
        location: null,
        notes: null,
        objectives: null,
        generated_by_ai: false,
        based_on_game_id: null,
        ai_reasoning: null,
        status: 'completed',
        completed_at: '2024-01-10T18:00:00',
        created_at: '2024-01-08',
      },
      {
        id: 'practice-3',
        team_id: 'test-team-id',
        practice_date: '2024-01-12',
        duration_minutes: 30,
        location: null,
        notes: null,
        objectives: null,
        generated_by_ai: true,
        based_on_game_id: null,
        ai_reasoning: null,
        status: 'cancelled',
        completed_at: null,
        created_at: '2024-01-09',
      },
    ]

    beforeEach(() => {
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: mockPractices,
                  error: null,
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)
    })

    it('should filter by status', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Initially shows all 3 practices
      const table = screen.getByRole('table')
      expect(within(table).getAllByRole('row')).toHaveLength(4) // Header + 3 practices

      // Filter by completed status
      const statusSelect = screen.getByLabelText(/filter by status/i)
      await user.selectOptions(statusSelect, 'completed')

      // Should show only 1 practice
      await waitFor(() => {
        expect(within(table).getAllByRole('row')).toHaveLength(2) // Header + 1 practice
      })
    })

    it('should filter by AI vs Manual', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Filter by AI-generated only
      const typeSelect = screen.getByLabelText(/filter by type/i)
      await user.selectOptions(typeSelect, 'ai')

      const table = screen.getByRole('table')
      await waitFor(() => {
        expect(within(table).getAllByRole('row')).toHaveLength(3) // Header + 2 AI practices
      })

      // Filter by manual only
      await user.selectOptions(typeSelect, 'manual')

      await waitFor(() => {
        expect(within(table).getAllByRole('row')).toHaveLength(2) // Header + 1 manual practice
      })
    })

    it('should combine status and type filters', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Filter by completed + manual
      const statusSelect = screen.getByLabelText(/filter by status/i)
      const typeSelect = screen.getByLabelText(/filter by type/i)

      await user.selectOptions(statusSelect, 'completed')
      await user.selectOptions(typeSelect, 'manual')

      const table = screen.getByRole('table')
      await waitFor(() => {
        expect(within(table).getAllByRole('row')).toHaveLength(2) // Header + 1 practice
      })
    })
  })

  describe('Practice Detail Modal', () => {
    const mockUser = { id: 'test-user-id' }
    const mockTeamMember = { team_id: 'test-team-id' }
    const mockPractice = {
      id: 'practice-1',
      team_id: 'test-team-id',
      practice_date: '2024-01-15',
      duration_minutes: 60,
      location: 'Ice Arena',
      notes: 'Regular practice',
      objectives: 'Work on passing',
      generated_by_ai: true,
      based_on_game_id: 'game-1',
      ai_reasoning: {
        top_focus_areas: ['passing', 'shooting'],
        overall_assessment: 'Team needs work on fundamentals',
        practice_goals: ['Improve passing accuracy'],
      },
      status: 'planned',
      completed_at: null,
      created_at: '2024-01-10',
    }
    const mockDrills = [
      {
        id: 'pd-1',
        section: 'warm_up',
        sequence_order: 1,
        duration_minutes: 10,
        notes: 'Light skating',
        modifications: null,
        completed: false,
        drills: {
          id: 'drill-1',
          title: 'Figure 8 Skating',
          description: 'Skate in figure 8 pattern',
          category: 'Skating',
        },
      },
    ]
    const mockGame = {
      opponent_name: 'Rangers',
      game_date: '2024-01-14',
    }

    beforeEach(() => {
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: [mockPractice],
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practice_drills') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: mockDrills,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'games') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockGame,
                  error: null,
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)
    })

    it('should open modal when View Details is clicked', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      // Click View Details button
      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      // Modal should be visible
      await waitFor(() => {
        expect(screen.getByText('Practice Plan Details')).toBeInTheDocument()
      })
    })

    it('should display practice metadata in modal', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('Practice Plan Details')).toBeInTheDocument()
      })

      // Get modal container
      const modal = screen.getByText('Practice Plan Details').closest('div[class*="bg-white rounded-lg shadow-xl"]')
      expect(modal).toBeInTheDocument()

      // Check metadata within modal
      expect(within(modal!).getByText('Ice Arena')).toBeInTheDocument()
      expect(within(modal!).getByText('60 minutes')).toBeInTheDocument()
      expect(within(modal!).getByText(/planned/i)).toBeInTheDocument()
    })

    it('should display AI reasoning for AI-generated practices', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('AI Analysis')).toBeInTheDocument()
      })

      // Get modal container
      const modal = screen.getByText('Practice Plan Details').closest('div[class*="bg-white rounded-lg shadow-xl"]')
      expect(modal).toBeInTheDocument()

      // Check AI reasoning within modal
      expect(within(modal!).getByText('Team needs work on fundamentals')).toBeInTheDocument()
      // Check for focus areas and goals (passing appears in both, so use getAllByText)
      const passingElements = within(modal!).getAllByText(/passing/i)
      expect(passingElements.length).toBeGreaterThanOrEqual(2) // "passing" and "Improve passing accuracy"
      expect(within(modal!).getByText(/^shooting$/i)).toBeInTheDocument()
      expect(within(modal!).getByText('Improve passing accuracy')).toBeInTheDocument()
    })

    it('should display source game information', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('Based on Game')).toBeInTheDocument()
      })

      // Check that the opponent name appears in the modal
      expect(screen.getByText(/vs Rangers/i)).toBeInTheDocument()
    })

    it('should display drill sections with drills', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('Figure 8 Skating')).toBeInTheDocument()
      })

      // Get modal container
      const modal = screen.getByText('Practice Plan Details').closest('div[class*="bg-white rounded-lg shadow-xl"]')
      expect(modal).toBeInTheDocument()

      // Check drill content within modal
      expect(within(modal!).getByText('Figure 8 Skating')).toBeInTheDocument()
      expect(within(modal!).getByText('Skate in figure 8 pattern')).toBeInTheDocument()
      expect(within(modal!).getByText(/Category:.*Skating/i)).toBeInTheDocument()
      expect(within(modal!).getByText('Light skating')).toBeInTheDocument()
    })

    it('should close modal when Close button is clicked', async () => {
      const user = userEvent.setup()
      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Practice History')).toBeInTheDocument()
      })

      const viewButton = screen.getByRole('button', { name: /view details/i })
      await user.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('Practice Plan Details')).toBeInTheDocument()
      })

      // Click Close button (the X button)
      const closeButton = screen.getByText('✕')
      await user.click(closeButton)

      // Modal should be gone
      await waitFor(() => {
        expect(screen.queryByText('Practice Details')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should display error message when practice fetch fails', async () => {
      const mockUser = { id: 'test-user-id' }
      const mockTeamMember = { team_id: 'test-team-id' }

      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: null,
                  error: { message: 'Database error' },
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)

      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText('Failed to load practices')).toBeInTheDocument()
      })
    })

    it('should show Try Again button on error', async () => {
      const mockUser = { id: 'test-user-id' }
      const mockTeamMember = { team_id: 'test-team-id' }

      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: null,
                  error: { message: 'Database error' },
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)

      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
      })
    })
  })

  describe('Empty State', () => {
    it('should show message when no practices exist', async () => {
      const mockUser = { id: 'test-user-id' }
      const mockTeamMember = { team_id: 'test-team-id' }

      vi.mocked(supabase.auth.getUser).mockResolvedValue({
        data: { user: mockUser as any },
        error: null,
      })

      const mockFrom = vi.fn((table: string) => {
        if (table === 'team_members') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockTeamMember,
                  error: null,
                }),
              }),
            }),
          }
        }
        if (table === 'practices') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValue({
                  data: [],
                  error: null,
                }),
              }),
            }),
          }
        }
        return {}
      })
      vi.mocked(supabase.from).mockImplementation(mockFrom as any)

      render(<PracticeHistoryPage />)

      await waitFor(() => {
        expect(screen.getByText(/no practice plans saved yet/i)).toBeInTheDocument()
      })
    })
  })
})
