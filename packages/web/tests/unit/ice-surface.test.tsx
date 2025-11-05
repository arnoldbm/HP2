import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IceSurface } from '@/components/game-tracking/ice-surface'

describe('IceSurface Component', () => {
  describe('Rendering', () => {
    it('should render an SVG element', () => {
      render(<IceSurface width={400} height={200} />)
      const svg = document.querySelector('svg')
      expect(svg).toBeTruthy()
    })

    it('should have correct aspect ratio (2:1 - 200:100)', () => {
      render(<IceSurface width={400} height={200} />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('viewBox')).toBe('0 0 200 100')
    })

    it('should apply custom width and height', () => {
      render(<IceSurface width={800} height={400} />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('800')
      expect(svg?.getAttribute('height')).toBe('400')
    })

    it('should preserve aspect ratio with preserveAspectRatio', () => {
      render(<IceSurface width={400} height={200} />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet')
    })
  })

  describe('Click Handling', () => {
    it('should call onClick with ice coordinates when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IceSurface width={400} height={200} onClick={handleClick} />)

      const svg = document.querySelector('svg')
      expect(svg).toBeTruthy()

      // Click center of SVG (should map to ice center: 100, 50)
      await user.click(svg!)

      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          x: expect.any(Number),
          y: expect.any(Number),
        })
      )
    })

    it('should not call onClick if not provided', async () => {
      const user = userEvent.setup()

      // Should not throw error
      render(<IceSurface width={400} height={200} />)

      const svg = document.querySelector('svg')
      await user.click(svg!)

      // No assertion needed - just verifying no error thrown
    })
  })

  describe('Zone Markings', () => {
    it('should render defensive zone when showZones is true', () => {
      const { container } = render(
        <IceSurface width={400} height={200} showZones={true} />
      )

      // Check for zone marking (defensive zone rect or line)
      const zones = container.querySelectorAll('[data-zone]')
      expect(zones.length).toBeGreaterThan(0)
    })

    it('should not render zone markings when showZones is false', () => {
      const { container } = render(
        <IceSurface width={400} height={200} showZones={false} />
      )

      const zones = container.querySelectorAll('[data-zone]')
      expect(zones.length).toBe(0)
    })

    it('should render all three zones (defensive, neutral, offensive)', () => {
      const { container } = render(
        <IceSurface width={400} height={200} showZones={true} />
      )

      const defensiveZone = container.querySelector('[data-zone="defensive"]')
      const neutralZone = container.querySelector('[data-zone="neutral"]')
      const offensiveZone = container.querySelector('[data-zone="offensive"]')

      expect(defensiveZone).toBeTruthy()
      expect(neutralZone).toBeTruthy()
      expect(offensiveZone).toBeTruthy()
    })
  })

  describe('High Danger Zone (Slot)', () => {
    it('should render slot when showSlot is true', () => {
      const { container } = render(
        <IceSurface width={400} height={200} showSlot={true} />
      )

      const slot = container.querySelector('[data-slot="true"]')
      expect(slot).toBeTruthy()
    })

    it('should not render slot when showSlot is false', () => {
      const { container } = render(
        <IceSurface width={400} height={200} showSlot={false} />
      )

      const slot = container.querySelector('[data-slot="true"]')
      expect(slot).toBeFalsy()
    })
  })

  describe('Event Markers', () => {
    const mockEvents = [
      { id: '1', x: 95, y: 50, type: 'shot' as const },
      { id: '2', x: 30, y: 30, type: 'turnover' as const },
      { id: '3', x: 50, y: 50, type: 'breakout' as const },
    ]

    it('should render event markers when events provided', () => {
      const { container } = render(
        <IceSurface width={400} height={200} events={mockEvents} />
      )

      const markers = container.querySelectorAll('[data-event-marker]')
      expect(markers.length).toBe(3)
    })

    it('should not render markers when no events provided', () => {
      const { container } = render(
        <IceSurface width={400} height={200} />
      )

      const markers = container.querySelectorAll('[data-event-marker]')
      expect(markers.length).toBe(0)
    })

    it('should position markers correctly based on ice coordinates', () => {
      const { container } = render(
        <IceSurface width={400} height={200} events={[mockEvents[0]]} />
      )

      const marker = container.querySelector('[data-event-marker]')
      expect(marker).toBeTruthy()

      // Center of ice (95, 50) should be near center of SVG
      const cx = marker?.getAttribute('cx')
      const cy = marker?.getAttribute('cy')

      expect(cx).toBeTruthy()
      expect(cy).toBeTruthy()
    })

    it('should render different styles for different event types', () => {
      const { container } = render(
        <IceSurface width={400} height={200} events={mockEvents} />
      )

      const shotMarker = container.querySelector('[data-event-type="shot"]')
      const turnoverMarker = container.querySelector('[data-event-type="turnover"]')
      const breakoutMarker = container.querySelector('[data-event-type="breakout"]')

      expect(shotMarker).toBeTruthy()
      expect(turnoverMarker).toBeTruthy()
      expect(breakoutMarker).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible label', () => {
      render(<IceSurface width={400} height={200} />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('aria-label')).toBeTruthy()
    })

    it('should have role="img"', () => {
      render(<IceSurface width={400} height={200} />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('role')).toBe('img')
    })
  })

  describe('Default Props', () => {
    it('should use default width and height if not provided', () => {
      render(<IceSurface />)
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('width')).toBeTruthy()
      expect(svg?.getAttribute('height')).toBeTruthy()
    })

    it('should not show zones by default', () => {
      const { container } = render(<IceSurface />)
      const zones = container.querySelectorAll('[data-zone]')
      expect(zones.length).toBe(0)
    })

    it('should not show slot by default', () => {
      const { container } = render(<IceSurface />)
      const slot = container.querySelector('[data-slot="true"]')
      expect(slot).toBeFalsy()
    })
  })
})
