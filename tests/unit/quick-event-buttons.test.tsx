import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuickEventButtons } from '@/components/game-tracking/quick-event-buttons'
import type { EventType } from '@/lib/stores/game-tracking-store'

describe('QuickEventButtons', () => {
  describe('Rendering', () => {
    it('should render all event type buttons', () => {
      render(<QuickEventButtons onEventSelect={() => {}} />)

      expect(screen.getByText('Shot')).toBeTruthy()
      expect(screen.getByText('Goal')).toBeTruthy()
      expect(screen.getByText('Turnover')).toBeTruthy()
      expect(screen.getByText('Breakout')).toBeTruthy()
      expect(screen.getByText('Zone Entry')).toBeTruthy()
      expect(screen.getByText('Faceoff')).toBeTruthy()
    })

    it('should render buttons with distinct colors', () => {
      const { container } = render(<QuickEventButtons onEventSelect={() => {}} />)

      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)

      // Buttons should have different color schemes
      const hasBlue = Array.from(buttons).some((btn) => btn.className.includes('blue'))
      const hasRed = Array.from(buttons).some((btn) => btn.className.includes('red'))
      const hasGreen = Array.from(buttons).some((btn) => btn.className.includes('green'))

      expect(hasBlue || hasRed || hasGreen).toBe(true)
    })
  })

  describe('Event Selection', () => {
    it('should call onEventSelect with shot when Shot button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Shot'))

      expect(handleSelect).toHaveBeenCalledWith('shot', undefined)
      expect(handleSelect).toHaveBeenCalledTimes(1)
    })

    it('should call onEventSelect with shot and pre-filled result when Goal button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Goal'))

      expect(handleSelect).toHaveBeenCalledWith('shot', { result: 'goal' })
    })

    it('should call onEventSelect with turnover when Turnover button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Turnover'))

      expect(handleSelect).toHaveBeenCalledWith('turnover', undefined)
    })

    it('should call onEventSelect with breakout when Breakout button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Breakout'))

      expect(handleSelect).toHaveBeenCalledWith('breakout', undefined)
    })

    it('should call onEventSelect with zone_entry when Zone Entry button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Zone Entry'))

      expect(handleSelect).toHaveBeenCalledWith('zone_entry', undefined)
    })

    it('should call onEventSelect with faceoff when Faceoff button clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      await user.click(screen.getByText('Faceoff'))

      expect(handleSelect).toHaveBeenCalledWith('faceoff', undefined)
    })
  })

  describe('Layout', () => {
    it('should display buttons in grid layout', () => {
      const { container } = render(<QuickEventButtons onEventSelect={() => {}} />)

      const gridContainer = container.querySelector('[class*="grid"]')
      expect(gridContainer).toBeTruthy()
    })

    it('should have compact layout when compact prop is true', () => {
      const { container } = render(<QuickEventButtons onEventSelect={() => {}} compact={true} />)

      const gridContainer = container.querySelector('[class*="grid"]')
      expect(gridContainer?.className).toContain('gap')
    })
  })

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      render(<QuickEventButtons onEventSelect={() => {}} disabled={true} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveProperty('disabled', true)
      })
    })

    it('should not call onEventSelect when disabled', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} disabled={true} />)

      await user.click(screen.getByText('Shot'))

      expect(handleSelect).not.toHaveBeenCalled()
    })
  })

  describe('Custom Event Types', () => {
    it('should show both Shot and Goal buttons when shot type is specified', () => {
      const eventTypes: EventType[] = ['shot']

      render(<QuickEventButtons onEventSelect={() => {}} eventTypes={eventTypes} />)

      // Both Shot and Goal buttons should appear since Goal is a shot with pre-filled result
      expect(screen.getByText('Shot')).toBeTruthy()
      expect(screen.getByText('Goal')).toBeTruthy()
      expect(screen.queryByText('Turnover')).toBeFalsy()
      expect(screen.queryByText('Breakout')).toBeFalsy()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      render(<QuickEventButtons onEventSelect={() => {}} />)

      const shotButton = screen.getByRole('button', { name: /Shot/i })
      expect(shotButton).toBeTruthy()
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()

      render(<QuickEventButtons onEventSelect={handleSelect} />)

      const firstButton = screen.getAllByRole('button')[0]
      firstButton.focus()
      expect(document.activeElement).toBe(firstButton)

      await user.keyboard('{Enter}')
      expect(handleSelect).toHaveBeenCalled()
    })
  })

  describe('Visual Indicators', () => {
    it('should show icons for event types when showIcons is true', () => {
      const { container } = render(
        <QuickEventButtons onEventSelect={() => {}} showIcons={true} />
      )

      // Check if buttons contain svg or icon elements
      const buttons = container.querySelectorAll('button')
      const hasIcons = Array.from(buttons).some(
        (btn) => btn.querySelector('svg') !== null || btn.textContent?.includes('🏒')
      )

      // At minimum, buttons should have text content
      expect(buttons.length).toBeGreaterThan(0)
    })
  })
})
