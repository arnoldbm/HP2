import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { render, screen } from '../helpers'
import { GameTrackingScreen } from '@/app/(tabs)/game-tracking'

// Mock the game tracking components
jest.mock('@/components/game-tracking/IceSurface', () => ({
  IceSurface: ({ onTap, events }: any) => {
    const { View, Text, TouchableOpacity } = require('react-native')
    return (
      <View testID="ice-surface">
        <Text>Ice Surface</Text>
        <TouchableOpacity
          testID="ice-tap"
          onPress={() => onTap?.({ x: 150, y: 50 })}
        >
          <Text>Tap Ice</Text>
        </TouchableOpacity>
        <Text testID="events-count">{events?.length || 0} events</Text>
      </View>
    )
  },
}))

jest.mock('@/components/game-tracking/PlayerSelector', () => ({
  PlayerSelector: ({ onSelect, onCancel, title }: any) => {
    const { View, Text, TouchableOpacity } = require('react-native')
    return (
      <View testID="player-selector">
        <Text>{title || 'Select Player'}</Text>
        <TouchableOpacity
          testID="select-player-1"
          onPress={() => onSelect('player-1')}
        >
          <Text>Player 1</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="cancel-selection" onPress={onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  },
}))

describe('GameTrackingScreen', () => {
  const mockTeam = {
    id: 'team-1',
    name: 'Steel 10u',
    age_group: '10u',
  }

  const mockPlayers = [
    {
      id: 'player-1',
      jerseyNumber: 7,
      firstName: 'John',
      lastName: 'Doe',
      position: 'forward' as const,
    },
    {
      id: 'player-2',
      jerseyNumber: 12,
      firstName: 'Jane',
      lastName: 'Smith',
      position: 'defense' as const,
    },
  ]

  const mockGame = {
    id: 'game-1',
    team_id: 'team-1',
    opponent: 'Eagles',
    date: '2025-01-15',
    location: 'Rink A',
    is_active: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('renders team selector if no team is selected', () => {
      render(<GameTrackingScreen />)

      expect(screen.getByText(/select a team/i)).toBeTruthy()
    })

    it('renders game setup form when team is selected but no active game', () => {
      render(<GameTrackingScreen team={mockTeam} players={mockPlayers} />)

      expect(screen.getByText(/start new game/i)).toBeTruthy()
      expect(screen.getByPlaceholderText(/opponent name/i)).toBeTruthy()
    })

    it('renders ice surface when game is active', () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      expect(screen.getByTestId('ice-surface')).toBeTruthy()
    })
  })

  describe('Game Setup', () => {
    it('allows entering opponent name', () => {
      render(<GameTrackingScreen team={mockTeam} players={mockPlayers} />)

      const opponentInput = screen.getByPlaceholderText(/opponent name/i)
      fireEvent.changeText(opponentInput, 'Eagles')

      expect(opponentInput.props.value).toBe('Eagles')
    })

    it('allows selecting game date', () => {
      render(<GameTrackingScreen team={mockTeam} players={mockPlayers} />)

      const dateInput = screen.getByTestId('game-date-input')
      fireEvent.press(dateInput)

      expect(screen.getByTestId('date-picker')).toBeTruthy()
    })

    it('creates game when start button is pressed', async () => {
      render(<GameTrackingScreen team={mockTeam} players={mockPlayers} />)

      const opponentInput = screen.getByPlaceholderText(/opponent name/i)
      fireEvent.changeText(opponentInput, 'Eagles')

      const startButton = screen.getByText(/start game/i)
      fireEvent.press(startButton)

      await waitFor(() => {
        expect(screen.getByTestId('ice-surface')).toBeTruthy()
      })
    })

    it('shows error if opponent name is empty', async () => {
      render(<GameTrackingScreen team={mockTeam} players={mockPlayers} />)

      const startButton = screen.getByText(/start game/i)
      fireEvent.press(startButton)

      await waitFor(() => {
        expect(screen.getByText(/opponent name is required/i)).toBeTruthy()
      })
    })
  })

  describe('Event Logging', () => {
    it('shows player selector when ice surface is tapped', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      const iceTap = screen.getByTestId('ice-tap')
      fireEvent.press(iceTap)

      await waitFor(() => {
        expect(screen.getByTestId('player-selector')).toBeTruthy()
      })
    })

    it('shows event type selector after player is selected', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      // Tap ice
      const iceTap = screen.getByTestId('ice-tap')
      fireEvent.press(iceTap)

      // Select player
      await waitFor(() => {
        expect(screen.getByTestId('player-selector')).toBeTruthy()
      })

      const selectPlayer = screen.getByTestId('select-player-1')
      fireEvent.press(selectPlayer)

      // Should show event type selector
      await waitFor(() => {
        expect(screen.getByText(/what happened/i)).toBeTruthy()
        expect(screen.getByText(/shot/i)).toBeTruthy()
        expect(screen.getByText(/goal/i)).toBeTruthy()
        expect(screen.getByText(/turnover/i)).toBeTruthy()
      })
    })

    it('logs event when event type is selected', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      // Tap ice
      fireEvent.press(screen.getByTestId('ice-tap'))

      // Select player
      await waitFor(() => {
        expect(screen.getByTestId('player-selector')).toBeTruthy()
      })
      fireEvent.press(screen.getByTestId('select-player-1'))

      // Select event type
      await waitFor(() => {
        expect(screen.getByText(/shot/i)).toBeTruthy()
      })
      fireEvent.press(screen.getByText(/shot/i))

      // Event should be logged
      await waitFor(() => {
        expect(screen.getByTestId('events-count').props.children).toContain('1')
      })
    })

    it('cancels event logging when cancel is pressed on player selector', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      // Tap ice
      fireEvent.press(screen.getByTestId('ice-tap'))

      // Cancel selection
      await waitFor(() => {
        expect(screen.getByTestId('player-selector')).toBeTruthy()
      })
      fireEvent.press(screen.getByTestId('cancel-selection'))

      // Player selector should be hidden
      await waitFor(() => {
        expect(screen.queryByTestId('player-selector')).toBeNull()
      })

      // No events should be logged
      expect(screen.getByTestId('events-count').props.children).toContain('0')
    })
  })

  describe('Event Types', () => {
    it('supports logging shots', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      await logEvent('shot')

      expect(screen.getByText(/shot/i)).toBeTruthy()
    })

    it('supports logging goals', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      await logEvent('goal')

      expect(screen.getByText(/goal/i)).toBeTruthy()
    })

    it('supports logging turnovers', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      await logEvent('turnover')

      expect(screen.getByText(/turnover/i)).toBeTruthy()
    })

    it('updates score when goal is logged', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      // Initial score
      expect(screen.getByTestId('team-score').props.children).toBe(0)

      // Log a goal
      await logEvent('goal')

      // Score should increase
      await waitFor(() => {
        expect(screen.getByTestId('team-score').props.children).toBe(1)
      })
    })
  })

  describe('Event History', () => {
    it('displays event history list', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      await logEvent('shot')
      await logEvent('goal')

      expect(screen.getByText(/event history/i)).toBeTruthy()
      expect(screen.getByTestId('events-count').props.children).toContain('2')
    })

    it('allows deleting events from history', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      await logEvent('shot')

      const deleteButton = screen.getByTestId('delete-event-0')
      fireEvent.press(deleteButton)

      await waitFor(() => {
        expect(screen.getByTestId('events-count').props.children).toContain('0')
      })
    })
  })

  describe('Game Controls', () => {
    it('displays game timer', () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      expect(screen.getByTestId('game-timer')).toBeTruthy()
    })

    it('allows pausing and resuming timer', () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      const pauseButton = screen.getByText(/pause/i)
      fireEvent.press(pauseButton)

      expect(screen.getByText(/resume/i)).toBeTruthy()
    })

    it('allows ending the game', async () => {
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
        />
      )

      const endGameButton = screen.getByText(/end game/i)
      fireEvent.press(endGameButton)

      await waitFor(() => {
        expect(screen.getByText(/game ended/i)).toBeTruthy()
      })
    })
  })

  describe('Data Persistence', () => {
    it('saves events to database', async () => {
      const mockCreateEvent = jest.fn()
      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
          onCreateEvent={mockCreateEvent}
        />
      )

      await logEvent('shot')

      await waitFor(() => {
        expect(mockCreateEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            game_id: 'game-1',
            player_id: 'player-1',
            event_type: 'shot',
            x: 150,
            y: 50,
          })
        )
      })
    })

    it('loads existing events when game is resumed', () => {
      const existingEvents = [
        {
          id: 'event-1',
          game_id: 'game-1',
          player_id: 'player-1',
          event_type: 'shot',
          x: 150,
          y: 50,
        },
      ]

      render(
        <GameTrackingScreen
          team={mockTeam}
          players={mockPlayers}
          game={mockGame}
          events={existingEvents}
        />
      )

      expect(screen.getByTestId('events-count').props.children).toContain('1')
    })
  })

  describe('Empty States', () => {
    it('shows message when no players are available', () => {
      render(<GameTrackingScreen team={mockTeam} players={[]} game={mockGame} />)

      expect(screen.getByText(/no players available/i)).toBeTruthy()
    })

    it('disables event logging when no players are available', () => {
      render(<GameTrackingScreen team={mockTeam} players={[]} game={mockGame} />)

      const iceTap = screen.getByTestId('ice-tap')
      fireEvent.press(iceTap)

      expect(screen.queryByTestId('player-selector')).toBeNull()
    })
  })

  // Helper function to log an event
  async function logEvent(eventType: string) {
    fireEvent.press(screen.getByTestId('ice-tap'))

    await waitFor(() => {
      expect(screen.getByTestId('player-selector')).toBeTruthy()
    })

    fireEvent.press(screen.getByTestId('select-player-1'))

    await waitFor(() => {
      expect(screen.getByText(new RegExp(eventType, 'i'))).toBeTruthy()
    })

    fireEvent.press(screen.getByText(new RegExp(eventType, 'i')))
  }
})
