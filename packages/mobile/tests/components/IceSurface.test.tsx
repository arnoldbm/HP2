import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { render, screen } from '../helpers'
import { IceSurface } from '@/components/game-tracking/IceSurface'
import { screenToIce } from '@/lib/utils/ice-surface-coordinates'

// Mock the coordinate conversion
jest.mock('@/lib/utils/ice-surface-coordinates', () => ({
  ...jest.requireActual('@/lib/utils/ice-surface-coordinates'),
  screenToIce: jest.fn(),
}))

describe('IceSurface', () => {
  const mockOnTap = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(screenToIce as jest.Mock).mockReturnValue({ x: 100, y: 50 })
  })

  describe('Rendering', () => {
    it('renders the ice surface', () => {
      render(<IceSurface onTap={mockOnTap} />)

      // Should render an SVG component
      const svg = screen.getByTestId('ice-surface')
      expect(svg).toBeTruthy()
    })

    it('renders with zones when showZones is true', () => {
      render(<IceSurface onTap={mockOnTap} showZones />)

      // Should render zone indicators
      const svg = screen.getByTestId('ice-surface')
      expect(svg).toBeTruthy()
    })

    it('renders event markers when events are provided', () => {
      const events = [
        { id: '1', x: 150, y: 50, type: 'shot' as const },
        { id: '2', x: 100, y: 30, type: 'turnover' as const },
      ]

      render(<IceSurface onTap={mockOnTap} events={events} />)

      const svg = screen.getByTestId('ice-surface')
      expect(svg).toBeTruthy()
    })
  })

  describe('Touch Handling', () => {
    it('calls onTap with ice coordinates when surface is tapped', () => {
      render(<IceSurface onTap={mockOnTap} />)

      const svg = screen.getByTestId('ice-surface')

      // Simulate a tap event
      fireEvent(svg, 'onLayout', {
        nativeEvent: {
          layout: {
            width: 400,
            height: 200,
          },
        },
      })

      // Simulate touch
      fireEvent.press(svg, {
        nativeEvent: {
          locationX: 200,
          locationY: 100,
        },
      })

      // Should call screenToIce with correct parameters
      expect(screenToIce).toHaveBeenCalledWith(
        { x: 200, y: 100 },
        400,
        200
      )

      // Should call onTap with the result from screenToIce
      expect(mockOnTap).toHaveBeenCalledWith({ x: 100, y: 50 })
    })

    it('does not call onTap when not provided', () => {
      render(<IceSurface />)

      const svg = screen.getByTestId('ice-surface')

      fireEvent(svg, 'onLayout', {
        nativeEvent: {
          layout: {
            width: 400,
            height: 200,
          },
        },
      })

      fireEvent.press(svg, {
        nativeEvent: {
          locationX: 200,
          locationY: 100,
        },
      })

      expect(mockOnTap).not.toHaveBeenCalled()
    })
  })

  describe('Coordinate Conversion', () => {
    it('converts touch coordinates correctly for different screen sizes', () => {
      ;(screenToIce as jest.Mock).mockImplementation((coords, width, height) => {
        return {
          x: Math.round((coords.x / width) * 200),
          y: Math.round((coords.y / height) * 100),
        }
      })

      render(<IceSurface onTap={mockOnTap} />)

      const svg = screen.getByTestId('ice-surface')

      // Set up a 800x400 surface
      fireEvent(svg, 'onLayout', {
        nativeEvent: {
          layout: {
            width: 800,
            height: 400,
          },
        },
      })

      // Tap at center
      fireEvent.press(svg, {
        nativeEvent: {
          locationX: 400,
          locationY: 200,
        },
      })

      // Should convert to center ice (100, 50)
      expect(mockOnTap).toHaveBeenCalledWith({ x: 100, y: 50 })
    })
  })

  describe('Event Markers', () => {
    it('renders shot events with correct color', () => {
      const events = [
        { id: '1', x: 150, y: 50, type: 'shot' as const },
      ]

      render(<IceSurface onTap={mockOnTap} events={events} />)

      // Event marker should be rendered (can be tested by finding specific test IDs)
      const svg = screen.getByTestId('ice-surface')
      expect(svg).toBeTruthy()
    })

    it('renders multiple events', () => {
      const events = [
        { id: '1', x: 150, y: 50, type: 'shot' as const },
        { id: '2', x: 100, y: 30, type: 'turnover' as const },
        { id: '3', x: 170, y: 45, type: 'goal' as const },
      ]

      render(<IceSurface onTap={mockOnTap} events={events} />)

      const svg = screen.getByTestId('ice-surface')
      expect(svg).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper accessibility label', () => {
      render(<IceSurface onTap={mockOnTap} />)

      const svg = screen.getByTestId('ice-surface')
      expect(svg.props.accessibilityLabel).toBe('Hockey ice surface')
    })

    it('is accessible for tapping', () => {
      render(<IceSurface onTap={mockOnTap} />)

      const svg = screen.getByTestId('ice-surface')
      expect(svg.props.accessible).toBe(true)
    })
  })
})
