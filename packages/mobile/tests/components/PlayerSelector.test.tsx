import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { render, screen } from '../helpers'
import { PlayerSelector } from '@/components/game-tracking/PlayerSelector'

describe('PlayerSelector', () => {
  const mockPlayers = [
    {
      id: '1',
      jerseyNumber: 7,
      firstName: 'John',
      lastName: 'Doe',
      position: 'forward' as const,
    },
    {
      id: '2',
      jerseyNumber: 12,
      firstName: 'Jane',
      lastName: 'Smith',
      position: 'defense' as const,
    },
    {
      id: '3',
      jerseyNumber: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      position: 'forward' as const,
    },
    {
      id: '4',
      jerseyNumber: 30,
      firstName: 'Alice',
      lastName: 'Williams',
      position: 'goalie' as const,
    },
  ]

  const mockOnSelect = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders all players', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      // Check that all jersey numbers are displayed
      expect(screen.getByText('7')).toBeTruthy()
      expect(screen.getByText('12')).toBeTruthy()
      expect(screen.getByText('3')).toBeTruthy()
      expect(screen.getByText('30')).toBeTruthy()
    })

    it('renders players sorted by jersey number', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      const jerseyNumbers = screen.getAllByTestId(/player-card/)
      expect(jerseyNumbers).toHaveLength(4)

      // First card should be #3
      expect(jerseyNumbers[0]).toHaveTextContent(/^3/)
      // Second card should be #7
      expect(jerseyNumbers[1]).toHaveTextContent(/^7/)
      // Third card should be #12
      expect(jerseyNumbers[2]).toHaveTextContent(/^12/)
      // Fourth card should be #30
      expect(jerseyNumbers[3]).toHaveTextContent(/^30/)
    })

    it('renders player names with first initial', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      expect(screen.getByText(/J\. Doe/)).toBeTruthy()
      expect(screen.getByText(/J\. Smith/)).toBeTruthy()
      expect(screen.getByText(/B\. Johnson/)).toBeTruthy()
      expect(screen.getByText(/A\. Williams/)).toBeTruthy()
    })

    it('renders position indicators', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      const forwardBadges = screen.getAllByText('F')
      const defenseBadges = screen.getAllByText('D')
      const goalieBadges = screen.getAllByText('G')

      expect(forwardBadges).toHaveLength(2)
      expect(defenseBadges).toHaveLength(1)
      expect(goalieBadges).toHaveLength(1)
    })

    it('renders title when provided', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          title="Who took the shot?"
        />
      )

      expect(screen.getByText('Who took the shot?')).toBeTruthy()
    })

    it('does not render title in quick select mode', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          title="Who took the shot?"
          quickSelect
        />
      )

      expect(screen.queryByText('Who took the shot?')).toBeNull()
    })
  })

  describe('Player Selection', () => {
    it('calls onSelect when a player is tapped', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      const player1Card = screen.getByTestId('player-card-1')
      fireEvent.press(player1Card)

      expect(mockOnSelect).toHaveBeenCalledWith('1')
    })

    it('calls onSelect with correct player id for different players', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      const player2Card = screen.getByTestId('player-card-2')
      fireEvent.press(player2Card)

      expect(mockOnSelect).toHaveBeenCalledWith('2')

      const player3Card = screen.getByTestId('player-card-3')
      fireEvent.press(player3Card)

      expect(mockOnSelect).toHaveBeenCalledWith('3')
    })
  })

  describe('Filtering', () => {
    it('filters players by position when filterPosition is provided', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          filterPosition="forward"
        />
      )

      // Should only show forwards
      expect(screen.getByText('7')).toBeTruthy() // John Doe
      expect(screen.getByText('3')).toBeTruthy() // Bob Johnson
      expect(screen.queryByText('12')).toBeNull() // Jane Smith (defense)
      expect(screen.queryByText('30')).toBeNull() // Alice Williams (goalie)
    })

    it('filters players by defense position', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          filterPosition="defense"
        />
      )

      // Should only show defense
      expect(screen.getByText('12')).toBeTruthy() // Jane Smith
      expect(screen.queryByText('7')).toBeNull()
      expect(screen.queryByText('3')).toBeNull()
      expect(screen.queryByText('30')).toBeNull()
    })

    it('filters players by goalie position', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          filterPosition="goalie"
        />
      )

      // Should only show goalie
      expect(screen.getByText('30')).toBeTruthy() // Alice Williams
      expect(screen.queryByText('7')).toBeNull()
      expect(screen.queryByText('3')).toBeNull()
      expect(screen.queryByText('12')).toBeNull()
    })
  })

  describe('Cancel Button', () => {
    it('renders cancel button when onCancel is provided', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          onCancel={mockOnCancel}
        />
      )

      const cancelButton = screen.getByText('Cancel')
      expect(cancelButton).toBeTruthy()
    })

    it('does not render cancel button when onCancel is not provided', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      expect(screen.queryByText('Cancel')).toBeNull()
    })

    it('calls onCancel when cancel button is pressed', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          onCancel={mockOnCancel}
        />
      )

      const cancelButton = screen.getByText('Cancel')
      fireEvent.press(cancelButton)

      expect(mockOnCancel).toHaveBeenCalled()
    })

    it('hides cancel button in quick select mode even when onCancel is provided', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={mockOnSelect}
          onCancel={mockOnCancel}
          quickSelect
        />
      )

      expect(screen.queryByText('Cancel')).toBeNull()
    })
  })

  describe('Empty State', () => {
    it('shows message when no players are available', () => {
      render(<PlayerSelector players={[]} onSelect={mockOnSelect} />)

      expect(screen.getByText('No players available')).toBeTruthy()
    })

    it('shows cancel button in empty state when onCancel is provided', () => {
      render(
        <PlayerSelector
          players={[]}
          onSelect={mockOnSelect}
          onCancel={mockOnCancel}
        />
      )

      const cancelButton = screen.getByText('Cancel')
      expect(cancelButton).toBeTruthy()

      fireEvent.press(cancelButton)
      expect(mockOnCancel).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has accessible labels for player cards', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={mockOnSelect} />)

      const player1Card = screen.getByTestId('player-card-1')
      expect(player1Card.props.accessibilityLabel).toContain('7')
      expect(player1Card.props.accessibilityLabel).toContain('Doe')
    })
  })
})
