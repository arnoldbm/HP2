import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerSelector } from '@/components/game-tracking/player-selector'
import type { Player } from '@/lib/stores/game-tracking-store-configured'

const mockPlayers: Player[] = [
  { id: '1', jerseyNumber: 7, firstName: 'John', lastName: 'Doe', position: 'forward' },
  { id: '2', jerseyNumber: 12, firstName: 'Jane', lastName: 'Smith', position: 'defense' },
  { id: '3', jerseyNumber: 23, firstName: 'Bob', lastName: 'Johnson', position: 'forward' },
  { id: '4', jerseyNumber: 1, firstName: 'Tim', lastName: 'Howard', position: 'goalie' },
]

describe('PlayerSelector', () => {
  describe('Rendering', () => {
    it('should render all player jersey numbers', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} />)

      expect(screen.getByText('7')).toBeTruthy()
      expect(screen.getByText('12')).toBeTruthy()
      expect(screen.getByText('23')).toBeTruthy()
      expect(screen.getByText('1')).toBeTruthy()
    })

    it('should display player names on buttons', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} />)

      expect(screen.getByText(/Doe/)).toBeTruthy()
      expect(screen.getByText(/Smith/)).toBeTruthy()
      expect(screen.getByText(/Johnson/)).toBeTruthy()
      expect(screen.getByText(/Howard/)).toBeTruthy()
    })

    it('should render empty state when no players', () => {
      render(<PlayerSelector players={[]} onSelect={() => {}} />)

      expect(screen.getByText(/No players/i)).toBeTruthy()
    })

    it('should display title when provided', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} title="Select Shooter" />)

      expect(screen.getByText('Select Shooter')).toBeTruthy()
    })
  })

  describe('Player Selection', () => {
    it('should call onSelect with player ID when clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<PlayerSelector players={mockPlayers} onSelect={handleSelect} />)

      const player7Button = screen.getByRole('button', { name: /7.*Doe/i })
      await user.click(player7Button)

      expect(handleSelect).toHaveBeenCalledWith('1')
      expect(handleSelect).toHaveBeenCalledTimes(1)
    })

    it('should work for multiple player clicks', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<PlayerSelector players={mockPlayers} onSelect={handleSelect} />)

      await user.click(screen.getByRole('button', { name: /12.*Smith/i }))
      await user.click(screen.getByRole('button', { name: /23.*Johnson/i }))

      expect(handleSelect).toHaveBeenCalledTimes(2)
      expect(handleSelect).toHaveBeenNthCalledWith(1, '2')
      expect(handleSelect).toHaveBeenNthCalledWith(2, '3')
    })
  })

  describe('Position Filtering', () => {
    it('should show only forwards when filterPosition is forward', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={() => {}}
          filterPosition="forward"
        />
      )

      expect(screen.getByText('7')).toBeTruthy() // John Doe
      expect(screen.getByText('23')).toBeTruthy() // Bob Johnson
      expect(screen.queryByText('12')).toBeFalsy() // Jane Smith (defense)
      expect(screen.queryByText('1')).toBeFalsy() // Tim Howard (goalie)
    })

    it('should show only defense when filterPosition is defense', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={() => {}}
          filterPosition="defense"
        />
      )

      expect(screen.getByText('12')).toBeTruthy() // Jane Smith
      expect(screen.queryByText('7')).toBeFalsy()
      expect(screen.queryByText('23')).toBeFalsy()
      expect(screen.queryByText('1')).toBeFalsy()
    })

    it('should show only goalies when filterPosition is goalie', () => {
      render(
        <PlayerSelector
          players={mockPlayers}
          onSelect={() => {}}
          filterPosition="goalie"
        />
      )

      expect(screen.getByText('1')).toBeTruthy() // Tim Howard
      expect(screen.queryByText('7')).toBeFalsy()
      expect(screen.queryByText('12')).toBeFalsy()
      expect(screen.queryByText('23')).toBeFalsy()
    })
  })

  describe('Player Sorting', () => {
    it('should sort players by jersey number by default', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} />)

      const buttons = screen.getAllByRole('button')
      const jerseyNumbers = buttons.map((btn) =>
        parseInt(btn.textContent?.match(/\d+/)?.[0] || '0')
      )

      // Should be sorted: 1, 7, 12, 23
      expect(jerseyNumbers[0]).toBe(1)
      expect(jerseyNumbers[1]).toBe(7)
      expect(jerseyNumbers[2]).toBe(12)
      expect(jerseyNumbers[3]).toBe(23)
    })
  })

  describe('Quick Select Mode', () => {
    it('should use larger button size in quickSelect mode', () => {
      const { container } = render(
        <PlayerSelector players={mockPlayers} onSelect={() => {}} quickSelect={true} />
      )

      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)

      // Should have min-h-[88px] for quick tapping (larger than default 80px)
      buttons.forEach((btn) => {
        expect(btn.className).toContain('min-h-[88px]')
      })
    })

    it('should use larger text for jersey numbers in quickSelect mode', () => {
      const { container } = render(
        <PlayerSelector players={mockPlayers} onSelect={() => {}} quickSelect={true} />
      )

      // Check jersey number spans have larger text
      const jerseySpans = container.querySelectorAll('button > span:first-child')
      jerseySpans.forEach((span) => {
        expect(span.className).toContain('text-3xl')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} />)

      const button = screen.getByRole('button', { name: /7.*Doe/i })
      expect(button).toBeTruthy()
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<PlayerSelector players={mockPlayers} onSelect={handleSelect} />)

      const firstButton = screen.getAllByRole('button')[0]
      firstButton.focus()
      expect(document.activeElement).toBe(firstButton)

      await user.keyboard('{Enter}')
      expect(handleSelect).toHaveBeenCalled()
    })
  })

  describe('Cancel Action', () => {
    it('should render cancel button when onCancel provided', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} onCancel={() => {}} />)

      expect(screen.getByText(/Cancel/i)).toBeTruthy()
    })

    it('should call onCancel when cancel button clicked', async () => {
      const user = userEvent.setup()
      const handleCancel = vi.fn()

      render(
        <PlayerSelector players={mockPlayers} onSelect={() => {}} onCancel={handleCancel} />
      )

      await user.click(screen.getByText(/Cancel/i))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })

    it('should not render cancel button when onCancel not provided', () => {
      render(<PlayerSelector players={mockPlayers} onSelect={() => {}} />)

      expect(screen.queryByText(/Cancel/i)).toBeFalsy()
    })
  })
})
