import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { AppText } from '@/components/ui'

export interface Player {
  id: string
  jerseyNumber: number
  firstName: string
  lastName: string
  position: 'forward' | 'defense' | 'goalie'
}

export interface PlayerSelectorProps {
  players: Player[]
  onSelect: (playerId: string) => void
  onCancel?: () => void
  title?: string
  filterPosition?: 'forward' | 'defense' | 'goalie'
  quickSelect?: boolean
}

export function PlayerSelector({
  players,
  onSelect,
  onCancel,
  title = 'Select Player',
  filterPosition,
  quickSelect = false,
}: PlayerSelectorProps) {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height

  // Filter and sort players
  const sortedPlayers = useMemo(() => {
    const filtered = filterPosition
      ? players.filter((p) => p.position === filterPosition)
      : players

    return [...filtered].sort((a, b) => a.jerseyNumber - b.jerseyNumber)
  }, [players, filterPosition])

  // Calculate card width based on orientation
  const cardWidth = isLandscape ? '15%' : '31%' // 6 columns in landscape, 3 in portrait

  // Get position color
  const getPositionColor = (position: Player['position']) => {
    switch (position) {
      case 'forward':
        return '#3B82F6' // blue
      case 'defense':
        return '#10B981' // green
      case 'goalie':
        return '#A855F7' // purple
      default:
        return '#6B7280' // gray
    }
  }

  // Empty state
  if (players.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText variant="body" style={styles.emptyText}>
          No players available
        </AppText>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <AppText variant="caption" weight="semibold" style={styles.cancelText}>
              Cancel
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      {!quickSelect && title && (
        <View style={styles.titleContainer}>
          <AppText variant="subtitle" weight="bold">
            {title}
          </AppText>
        </View>
      )}

      {/* Player Grid */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {sortedPlayers.map((player) => (
            <TouchableOpacity
              key={player.id}
              testID={`player-card-${player.id}`}
              style={[styles.playerCard, { width: cardWidth }]}
              onPress={() => onSelect(player.id)}
              activeOpacity={0.7}
              accessibilityLabel={`Player ${player.jerseyNumber} ${player.lastName}`}
              accessibilityRole="button"
            >
              {/* Jersey Number */}
              <Text style={[styles.jerseyNumber, quickSelect && styles.jerseyNumberLarge, isLandscape && styles.jerseyNumberSmall]}>
                {player.jerseyNumber}
              </Text>

              {/* Player Name */}
              <Text style={[styles.playerName, isLandscape && styles.playerNameSmall]} numberOfLines={1}>
                {player.firstName[0]}. {player.lastName}
              </Text>

              {/* Position Badge */}
              <Text
                style={[
                  styles.positionBadge,
                  { color: getPositionColor(player.position) },
                  isLandscape && styles.positionBadgeSmall,
                ]}
              >
                {player.position[0].toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Cancel Button */}
      {onCancel && !quickSelect && (
        <View style={styles.cancelContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <AppText variant="body" weight="semibold" style={styles.cancelText}>
              Cancel
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  playerCard: {
    // Width is set dynamically based on orientation
    aspectRatio: 0.8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  jerseyNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },
  jerseyNumberLarge: {
    fontSize: 24,
  },
  jerseyNumberSmall: {
    fontSize: 22,
    fontWeight: '900',
  },
  playerName: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 1,
    textAlign: 'center',
  },
  playerNameSmall: {
    fontSize: 7,
    marginTop: 0,
  },
  positionBadge: {
    fontSize: 8,
    fontWeight: '600',
    marginTop: 1,
    textTransform: 'uppercase',
  },
  positionBadgeSmall: {
    fontSize: 7,
    marginTop: 0,
  },
  cancelContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cancelText: {
    color: '#374151',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#6B7280',
    marginBottom: 16,
  },
})
