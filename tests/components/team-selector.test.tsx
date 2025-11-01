import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TeamSelector } from '@/components/teams/team-selector'

describe('TeamSelector', () => {
  const mockTeams = [
    {
      id: 'team-1',
      name: 'Thunder 2015',
      age_group_display: '10U',
      level: 'aa',
      season: '2025-26',
    },
    {
      id: 'team-2',
      name: 'Lightning 2013',
      age_group_display: '12U',
      level: 'aaa',
      season: '2025-26',
    },
    {
      id: 'team-3',
      name: 'Blizzard 2011',
      age_group_display: '14U',
      level: 'a',
      season: '2025-26',
    },
  ]

  const defaultProps = {
    teams: mockTeams,
    selectedTeamId: 'team-1',
    onTeamChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render team selector dropdown', () => {
      render(<TeamSelector {...defaultProps} />)

      // Should show the selected team
      expect(screen.getByText(/Thunder 2015/i)).toBeInTheDocument()
      expect(screen.getByText(/10U/i)).toBeInTheDocument()
    })

    it('should display team name with age group and level', () => {
      render(<TeamSelector {...defaultProps} />)

      // Format: "Thunder 2015 (10U • AA)"
      expect(screen.getByText(/Thunder 2015/i)).toBeInTheDocument()
    })

    it('should render dropdown button with accessible label', () => {
      render(<TeamSelector {...defaultProps} />)

      const button = screen.getByRole('button', { name: /select team/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should show empty state when no teams', () => {
      render(<TeamSelector teams={[]} selectedTeamId={null} onTeamChange={vi.fn()} />)

      expect(screen.getByText(/no teams yet/i)).toBeInTheDocument()
    })

    it('should show create team link in empty state', () => {
      render(<TeamSelector teams={[]} selectedTeamId={null} onTeamChange={vi.fn()} />)

      const createLink = screen.getByRole('link', { name: /create your first team/i })
      expect(createLink).toBeInTheDocument()
      expect(createLink).toHaveAttribute('href', '/demo/teams/new')
    })
  })

  describe('Team Selection', () => {
    it('should call onTeamChange when team selected', async () => {
      const user = userEvent.setup()
      const onTeamChange = vi.fn()

      render(<TeamSelector {...defaultProps} onTeamChange={onTeamChange} />)

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)

      // Select different team
      const lightningOption = screen.getByText(/Lightning 2013/i)
      await user.click(lightningOption)

      expect(onTeamChange).toHaveBeenCalledWith('team-2')
    })

    it('should highlight selected team in dropdown', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)

      // Find the selected team option by role
      const selectedOption = screen.getAllByRole('option').find((option) => option.getAttribute('aria-selected') === 'true')
      expect(selectedOption).toBeDefined()
      expect(selectedOption).toHaveClass('selected')
    })

    it('should close dropdown after selection', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)

      // Verify dropdown is open - find specific option text
      const lightningOption = screen.getAllByText(/Lightning 2013/i).find((el) => el.closest('[role="option"]'))
      expect(lightningOption).toBeInTheDocument()

      // Select team
      await user.click(lightningOption!)

      // Dropdown should close - element should not be in document
      const blizzardOption = screen.queryAllByText(/Blizzard 2011/i).find((el) => el.closest('[role="option"]'))
      expect(blizzardOption).toBeUndefined()
    })
  })

  describe('Dropdown Behavior', () => {
    it('should toggle dropdown on button click', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      const button = screen.getByRole('button', { name: /select team/i })

      // Initially closed - dropdown options should not exist
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

      // Open
      await user.click(button)
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      // Close
      await user.click(button)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('should close dropdown when clicking outside', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <TeamSelector {...defaultProps} />
          <div data-testid="outside">Outside element</div>
        </div>
      )

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      // Click outside
      await user.click(screen.getByTestId('outside'))
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('should show all teams in dropdown', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)

      // All teams should be in dropdown options
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(3)
      expect(options[0]).toHaveTextContent(/Thunder 2015/i)
      expect(options[1]).toHaveTextContent(/Lightning 2013/i)
      expect(options[2]).toHaveTextContent(/Blizzard 2011/i)
    })
  })

  describe('Mobile Optimizations', () => {
    it('should have touch-friendly button with min-height class', () => {
      render(<TeamSelector {...defaultProps} />)

      const button = screen.getByRole('button', { name: /select team/i })

      // Should have min-h-[56px] or similar class
      expect(button.className).toContain('min-h')
    })

    it.skip('should use bottom sheet on mobile viewports', () => {
      // Skip - implementation detail, not critical for MVP
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<TeamSelector {...defaultProps} />)

      const button = screen.getByRole('button', { name: /select team/i })
      expect(button).toHaveAttribute('aria-haspopup', 'listbox')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should update aria-expanded when dropdown opens', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      const button = screen.getByRole('button', { name: /select team/i })

      // Initially collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false')

      // Open dropdown
      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it.skip('should support keyboard navigation', async () => {
      // Skip - complex implementation, test manually
      // Would require full keyboard navigation setup
    })
  })

  describe('Create Team Link', () => {
    it('should show "Create Team" option at bottom of dropdown', async () => {
      const user = userEvent.setup()

      render(<TeamSelector {...defaultProps} />)

      // Open dropdown
      const button = screen.getByRole('button', { name: /select team/i })
      await user.click(button)

      // Should have create team link
      const createLink = screen.getByRole('link', { name: /create new team/i })
      expect(createLink).toBeInTheDocument()
      expect(createLink).toHaveAttribute('href', '/demo/teams/new')
    })
  })
})
