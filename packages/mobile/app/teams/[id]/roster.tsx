import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { AppText, Button } from '@/components/ui'

interface Player {
  id: string
  team_id: string
  jersey_number: number
  first_name: string
  last_name: string
  position: 'forward' | 'defense' | 'goalie'
}

interface PlayerForm {
  jerseyNumber: string
  firstName: string
  lastName: string
  position: 'forward' | 'defense' | 'goalie'
}

export default function RosterScreen() {
  const router = useRouter()
  const { id: teamId } = useLocalSearchParams<{ id: string }>()

  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)

  const [form, setForm] = useState<PlayerForm>({
    jerseyNumber: '',
    firstName: '',
    lastName: '',
    position: 'forward',
  })
  const [formErrors, setFormErrors] = useState<Partial<PlayerForm>>({})

  useEffect(() => {
    if (teamId) {
      fetchPlayers()
    }
  }, [teamId])

  const fetchPlayers = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', teamId)
        .order('jersey_number', { ascending: true })

      if (error) throw error
      setPlayers(data || [])
    } catch (err) {
      console.error('Error loading players:', err)
      Alert.alert('Error', 'Failed to load roster')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      jerseyNumber: '',
      firstName: '',
      lastName: '',
      position: 'forward',
    })
    setFormErrors({})
    setEditingPlayer(null)
  }

  const validateForm = (): boolean => {
    const errors: Partial<PlayerForm> = {}

    if (!form.jerseyNumber || isNaN(Number(form.jerseyNumber))) {
      errors.jerseyNumber = 'Valid number required'
    }
    if (!form.firstName.trim()) {
      errors.firstName = 'First name required'
    }
    if (!form.lastName.trim()) {
      errors.lastName = 'Last name required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddPlayer = () => {
    resetForm()
    setShowAddModal(true)
  }

  const handleEditPlayer = (player: Player) => {
    setForm({
      jerseyNumber: player.jersey_number.toString(),
      firstName: player.first_name,
      lastName: player.last_name,
      position: player.position,
    })
    setEditingPlayer(player)
    setShowAddModal(true)
  }

  const handleSavePlayer = async () => {
    if (!validateForm()) return

    try {
      const playerData = {
        team_id: teamId,
        jersey_number: Number(form.jerseyNumber),
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        position: form.position,
      }

      if (editingPlayer) {
        // Update existing player
        const { error } = await supabase
          .from('players')
          .update(playerData)
          .eq('id', editingPlayer.id)

        if (error) throw error
        Alert.alert('Success', 'Player updated successfully')
      } else {
        // Create new player
        const { error } = await supabase
          .from('players')
          .insert([playerData])

        if (error) throw error
        Alert.alert('Success', 'Player added successfully')
      }

      setShowAddModal(false)
      resetForm()
      fetchPlayers()
    } catch (err: any) {
      console.error('Error saving player:', err)
      Alert.alert('Error', err.message || 'Failed to save player')
    }
  }

  const handleDeletePlayer = (player: Player) => {
    Alert.alert(
      'Delete Player',
      `Are you sure you want to remove ${player.first_name} ${player.last_name} (#${player.jersey_number})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('players')
                .delete()
                .eq('id', player.id)

              if (error) throw error
              fetchPlayers()
              Alert.alert('Success', 'Player removed from roster')
            } catch (err) {
              console.error('Error deleting player:', err)
              Alert.alert('Error', 'Failed to delete player')
            }
          },
        },
      ]
    )
  }

  const renderPlayerCard = ({ item: player }: { item: Player }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => handleEditPlayer(player)}
      activeOpacity={0.7}
    >
      <View style={styles.playerNumber}>
        <AppText variant="title" weight="bold" style={styles.numberText}>
          {player.jersey_number}
        </AppText>
      </View>

      <View style={styles.playerInfo}>
        <AppText variant="body" weight="semibold" style={styles.playerName}>
          {player.first_name} {player.last_name}
        </AppText>
        <View style={styles.positionBadge}>
          <AppText variant="caption" style={styles.positionText}>
            {player.position.toUpperCase()}
          </AppText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePlayer(player)}
      >
        <AppText variant="body" style={styles.deleteText}>×</AppText>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <AppText variant="title" weight="bold" style={styles.emptyTitle}>
        No Players Yet
      </AppText>
      <AppText variant="body" style={styles.emptyText}>
        Add players to your roster to start tracking their performance
      </AppText>
      <Button onPress={handleAddPlayer}>Add First Player</Button>
    </View>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <AppText variant="body" style={styles.loadingText}>
          Loading roster...
        </AppText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold">Roster</AppText>
        <AppText variant="caption" style={styles.playerCount}>
          {players.length} {players.length === 1 ? 'player' : 'players'}
        </AppText>
      </View>

      {/* Player List */}
      <FlatList
        data={players}
        renderItem={renderPlayerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={players.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Add Player Button (Fixed at bottom) */}
      {players.length > 0 && (
        <View style={styles.addButtonContainer}>
          <Button onPress={handleAddPlayer}>Add Player</Button>
        </View>
      )}

      {/* Add/Edit Player Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowAddModal(false)
          resetForm()
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <AppText variant="title" weight="bold">
              {editingPlayer ? 'Edit Player' : 'Add Player'}
            </AppText>
            <TouchableOpacity
              onPress={() => {
                setShowAddModal(false)
                resetForm()
              }}
            >
              <AppText variant="title" style={styles.cancelText}>×</AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              {/* Jersey Number */}
              <View style={styles.inputGroup}>
                <AppText variant="body" weight="semibold" style={styles.label}>
                  Jersey Number *
                </AppText>
                <TextInput
                  style={[styles.input, formErrors.jerseyNumber && styles.inputError]}
                  placeholder="e.g., 7"
                  value={form.jerseyNumber}
                  onChangeText={(text) => setForm({ ...form, jerseyNumber: text })}
                  keyboardType="number-pad"
                  maxLength={3}
                />
                {formErrors.jerseyNumber && (
                  <AppText variant="caption" style={styles.errorText}>
                    {formErrors.jerseyNumber}
                  </AppText>
                )}
              </View>

              {/* First Name */}
              <View style={styles.inputGroup}>
                <AppText variant="body" weight="semibold" style={styles.label}>
                  First Name *
                </AppText>
                <TextInput
                  style={[styles.input, formErrors.firstName && styles.inputError]}
                  placeholder="e.g., Connor"
                  value={form.firstName}
                  onChangeText={(text) => setForm({ ...form, firstName: text })}
                  autoCapitalize="words"
                />
                {formErrors.firstName && (
                  <AppText variant="caption" style={styles.errorText}>
                    {formErrors.firstName}
                  </AppText>
                )}
              </View>

              {/* Last Name */}
              <View style={styles.inputGroup}>
                <AppText variant="body" weight="semibold" style={styles.label}>
                  Last Name *
                </AppText>
                <TextInput
                  style={[styles.input, formErrors.lastName && styles.inputError]}
                  placeholder="e.g., McDavid"
                  value={form.lastName}
                  onChangeText={(text) => setForm({ ...form, lastName: text })}
                  autoCapitalize="words"
                />
                {formErrors.lastName && (
                  <AppText variant="caption" style={styles.errorText}>
                    {formErrors.lastName}
                  </AppText>
                )}
              </View>

              {/* Position */}
              <View style={styles.inputGroup}>
                <AppText variant="body" weight="semibold" style={styles.label}>
                  Position *
                </AppText>
                <View style={styles.positionButtons}>
                  {(['forward', 'defense', 'goalie'] as const).map((position) => (
                    <TouchableOpacity
                      key={position}
                      style={[
                        styles.positionButton,
                        form.position === position && styles.positionButtonActive,
                      ]}
                      onPress={() => setForm({ ...form, position })}
                    >
                      <AppText
                        variant="body"
                        weight="semibold"
                        style={[
                          styles.positionButtonText,
                          form.position === position && styles.positionButtonTextActive,
                        ]}
                      >
                        {position.charAt(0).toUpperCase() + position.slice(1)}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <Button onPress={handleSavePlayer}>
              {editingPlayer ? 'Update Player' : 'Add Player'}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  playerCount: {
    color: '#6B7280',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flex: 1,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  playerNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    color: '#FFFFFF',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    marginBottom: 4,
  },
  positionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  positionText: {
    color: '#6B7280',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButtonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cancelText: {
    color: '#6B7280',
    fontSize: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 4,
  },
  positionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  positionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  positionButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  positionButtonText: {
    color: '#6B7280',
  },
  positionButtonTextActive: {
    color: '#FFFFFF',
  },
  modalActions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
})
