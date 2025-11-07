import React, { useState, useCallback } from 'react'
import { View, StyleSheet, LayoutChangeEvent } from 'react-native'
import Svg, {
  Rect,
  Line,
  Circle,
  G,
  Text as SvgText,
  Path,
} from 'react-native-svg'
import {
  screenToIce,
  iceToScreen,
  type Coordinates,
  ICE_SURFACE,
} from '@/lib/utils/ice-surface-coordinates'

export interface IceEvent {
  id: string
  x: number
  y: number
  type: 'shot' | 'goal' | 'turnover' | 'breakout' | 'zone_entry'
}

export interface IceSurfaceProps {
  onTap?: (coords: Coordinates) => void
  showZones?: boolean
  showSlot?: boolean
  events?: IceEvent[]
  endsSwapped?: boolean
}

export function IceSurface({
  onTap,
  showZones = false,
  showSlot = false,
  events = [],
  endsSwapped = false,
}: IceSurfaceProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }, [])

  const handlePress = useCallback(
    (event: any) => {
      if (!onTap || !dimensions.width || !dimensions.height) return

      const { locationX, locationY } = event.nativeEvent

      // Convert screen coordinates to ice coordinates
      const iceCoords = screenToIce(
        { x: locationX, y: locationY },
        dimensions.width,
        dimensions.height
      )

      onTap(iceCoords)
    },
    [onTap, dimensions]
  )

  // Convert event type to color
  const getEventColor = (type: IceEvent['type']): string => {
    switch (type) {
      case 'shot':
      case 'goal':
        return '#3B82F6' // blue
      case 'turnover':
        return '#EF4444' // red
      case 'breakout':
        return '#10B981' // green
      case 'zone_entry':
        return '#F59E0B' // amber
      default:
        return '#6B7280' // gray
    }
  }

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
      testID="ice-surface"
      accessible
      accessibilityLabel="Hockey ice surface"
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${ICE_SURFACE.WIDTH} ${ICE_SURFACE.HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        onPress={handlePress}
      >
        {/* Ice surface background - white ice */}
        <Rect
          x={0}
          y={0}
          width={ICE_SURFACE.WIDTH}
          height={ICE_SURFACE.HEIGHT}
          fill="#FFFFFF"
          rx={4}
        />

        {/* Boards (darker border inside) */}
        <Rect
          x={1}
          y={1}
          width={ICE_SURFACE.WIDTH - 2}
          height={ICE_SURFACE.HEIGHT - 2}
          fill="none"
          stroke="#333333"
          strokeWidth={2}
          rx={4}
        />

        {/* Goal lines (thin red lines at ends) - 11 feet from boards */}
        <Line
          x1={11}
          y1={0}
          x2={11}
          y2={ICE_SURFACE.HEIGHT}
          stroke="#CC0000"
          strokeWidth={1.5}
        />
        <Line
          x1={189}
          y1={0}
          x2={189}
          y2={ICE_SURFACE.HEIGHT}
          stroke="#CC0000"
          strokeWidth={1.5}
        />

        {/* Blue line - Defensive zone (64 feet from end) */}
        <Line
          x1={64}
          y1={0}
          x2={64}
          y2={ICE_SURFACE.HEIGHT}
          stroke="#0066CC"
          strokeWidth={2}
        />

        {/* Blue line - Offensive zone (136 feet from end) */}
        <Line
          x1={136}
          y1={0}
          x2={136}
          y2={ICE_SURFACE.HEIGHT}
          stroke="#0066CC"
          strokeWidth={2}
        />

        {/* Center red line */}
        <Line
          x1={100}
          y1={0}
          x2={100}
          y2={ICE_SURFACE.HEIGHT}
          stroke="#CC0000"
          strokeWidth={2}
        />

        {/* Face-off circles */}
        {/* Defensive zone circles */}
        <Circle cx={31} cy={30} r={15} fill="none" stroke="#CC0000" strokeWidth={1.5} />
        <Circle cx={31} cy={70} r={15} fill="none" stroke="#CC0000" strokeWidth={1.5} />

        {/* Offensive zone circles */}
        <Circle cx={169} cy={30} r={15} fill="none" stroke="#CC0000" strokeWidth={1.5} />
        <Circle cx={169} cy={70} r={15} fill="none" stroke="#CC0000" strokeWidth={1.5} />

        {/* Center ice circle */}
        <Circle cx={100} cy={50} r={15} fill="none" stroke="#0066CC" strokeWidth={1.5} />

        {/* Center ice dot */}
        <Circle cx={100} cy={50} r={1} fill="#0066CC" />

        {/* Faceoff dots in end zone circles */}
        <Circle cx={31} cy={30} r={1.5} fill="#CC0000" />
        <Circle cx={31} cy={70} r={1.5} fill="#CC0000" />
        <Circle cx={169} cy={30} r={1.5} fill="#CC0000" />
        <Circle cx={169} cy={70} r={1.5} fill="#CC0000" />

        {/* Neutral zone faceoff dots - 5 feet outside blue lines */}
        <Circle cx={69} cy={30} r={1.5} fill="#CC0000" />
        <Circle cx={69} cy={70} r={1.5} fill="#CC0000" />
        <Circle cx={131} cy={30} r={1.5} fill="#CC0000" />
        <Circle cx={131} cy={70} r={1.5} fill="#CC0000" />

        {/* Goal creases - Defensive (4 foot radius semi-circle) */}
        <Path
          d="M 7 45 A 6 6 0 0 1 7 55 L 11 55 L 11 45 Z"
          fill="rgba(173, 216, 230, 0.4)"
          stroke="#0066CC"
          strokeWidth={1.5}
        />

        {/* Goal creases - Offensive */}
        <Path
          d="M 193 45 A 6 6 0 0 0 193 55 L 189 55 L 189 45 Z"
          fill="rgba(173, 216, 230, 0.4)"
          stroke="#0066CC"
          strokeWidth={1.5}
        />

        {/* High danger zone (slot) */}
        {showSlot && (() => {
          const slotMinX = endsSwapped ? (200 - ICE_SURFACE.SLOT.MAX_X) : ICE_SURFACE.SLOT.MIN_X
          const slotMaxX = endsSwapped ? (200 - ICE_SURFACE.SLOT.MIN_X) : ICE_SURFACE.SLOT.MAX_X
          const slotWidth = slotMaxX - slotMinX
          const slotCenterX = slotMinX + slotWidth / 2

          return (
            <G>
              <Rect
                x={slotMinX}
                y={ICE_SURFACE.SLOT.MIN_Y}
                width={slotWidth}
                height={ICE_SURFACE.SLOT.MAX_Y - ICE_SURFACE.SLOT.MIN_Y}
                fill="rgba(255, 100, 100, 0.2)"
                stroke="#CC0000"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
              <SvgText
                x={slotCenterX}
                y={ICE_SURFACE.SLOT.MIN_Y - 2}
                fontSize={4}
                fill="#CC0000"
                textAnchor="middle"
                fontWeight="bold"
              >
                HIGH DANGER
              </SvgText>
            </G>
          )
        })()}

        {/* Zone labels */}
        <SvgText
          x={32}
          y={8}
          fontSize={6}
          fill="#666666"
          textAnchor="middle"
          fontWeight="bold"
          opacity={0.7}
        >
          {endsSwapped ? 'OFFENSIVE ZONE' : 'DEFENSIVE ZONE'}
        </SvgText>
        <SvgText
          x={100}
          y={8}
          fontSize={6}
          fill="#666666"
          textAnchor="middle"
          fontWeight="bold"
          opacity={0.7}
        >
          NEUTRAL ZONE
        </SvgText>
        <SvgText
          x={168}
          y={8}
          fontSize={6}
          fill="#666666"
          textAnchor="middle"
          fontWeight="bold"
          opacity={0.7}
        >
          {endsSwapped ? 'DEFENSIVE ZONE' : 'OFFENSIVE ZONE'}
        </SvgText>

        {/* Event markers */}
        {events.map((event) => {
          const screenCoords = dimensions.width
            ? iceToScreen(
                { x: event.x, y: event.y },
                ICE_SURFACE.WIDTH,
                ICE_SURFACE.HEIGHT
              )
            : { x: event.x, y: event.y }

          return (
            <Circle
              key={event.id}
              cx={event.x}
              cy={event.y}
              r={3}
              fill={getEventColor(event.type)}
              opacity={0.7}
            />
          )
        })}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2, // 200:100 ratio (2:1)
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#666666',
    overflow: 'hidden',
  },
})
