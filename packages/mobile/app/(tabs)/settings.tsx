import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { AppText, Button } from '@/components/ui'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
}

interface Team {
  id: string
  name: string
  age_years: number
  age_group_display: string
  role: string
}

export default function SettingsScreen() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setIsLoading(true)

      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.replace('/login')
        return
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      setUser({
        id: authUser.id,
        email: authUser.email || '',
        full_name: profile?.full_name || null,
      })
      setEditName(profile?.full_name || '')

      // Get user's teams
      const { data: teamMembers } = await supabase
        .from('team_members')
        .select('team_id, role')
        .eq('user_id', authUser.id)

      if (teamMembers && teamMembers.length > 0) {
        const teamIds = teamMembers.map((tm) => tm.team_id)

        const { data: teamsData } = await supabase
          .from('teams_with_age_display')
          .select('*')
          .in('id', teamIds)

        if (teamsData) {
          const teamsWithRoles = teamsData.map((team) => {
            const membership = teamMembers.find((tm) => tm.team_id === team.id)
            return {
              ...team,
              role: membership?.role || 'unknown',
            }
          })
          setTeams(teamsWithRoles)
        }
      }
    } catch (err) {
      console.error('Error loading user data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    try {
      setSaving(true)

      const { error } = await supabase
        .from('user_profiles')
        .update({ full_name: editName.trim() || null })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, full_name: editName.trim() || null })
      setShowEditProfile(false)
      Alert.alert('Success', 'Profile updated successfully')
    } catch (err: any) {
      console.error('Error saving profile:', err)
      Alert.alert('Error', err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await supabase.auth.signOut()
            router.replace('/login')
          } catch (err) {
            console.error('Error logging out:', err)
            Alert.alert('Error', 'Failed to logout')
          }
        },
      },
    ])
  }

  const formatRole = (role: string) => {
    return role
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <AppText variant="body" style={styles.loadingText}>
          Loading settings...
        </AppText>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="body" style={styles.errorText}>
          Not logged in
        </AppText>
        <Button onPress={() => router.replace('/login')}>Go to Login</Button>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          Settings
        </AppText>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <AppText variant="body" weight="bold" style={styles.sectionTitle}>
          Profile
        </AppText>

        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <AppText variant="caption" style={styles.label}>
              Name
            </AppText>
            <AppText variant="body" weight="semibold">
              {user.full_name || 'Not set'}
            </AppText>
          </View>

          <View style={styles.divider} />

          <View style={styles.profileRow}>
            <AppText variant="caption" style={styles.label}>
              Email
            </AppText>
            <AppText variant="body">{user.email}</AppText>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setShowEditProfile(true)}
          >
            <AppText variant="body" weight="semibold" style={styles.editButtonText}>
              Edit Profile
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Teams Section */}
      <View style={styles.section}>
        <AppText variant="body" weight="bold" style={styles.sectionTitle}>
          Your Teams ({teams.length})
        </AppText>

        {teams.length === 0 ? (
          <View style={styles.emptyTeams}>
            <AppText variant="body" style={styles.emptyText}>
              You're not a member of any teams yet
            </AppText>
          </View>
        ) : (
          teams.map((team) => (
            <TouchableOpacity
              key={team.id}
              style={styles.teamCard}
              onPress={() => router.push(`/teams/${team.id}`)}
            >
              <View style={styles.teamInfo}>
                <AppText variant="body" weight="semibold" style={styles.teamName}>
                  {team.name}
                </AppText>
                <AppText variant="caption" style={styles.teamDetails}>
                  {team.age_group_display} • {formatRole(team.role)}
                </AppText>
              </View>
              <AppText variant="caption" style={styles.arrow}>
                →
              </AppText>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <AppText variant="body" weight="bold" style={styles.sectionTitle}>
          About
        </AppText>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <AppText variant="caption" style={styles.label}>
              Version
            </AppText>
            <AppText variant="body">1.0.0</AppText>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AppText variant="body" weight="semibold" style={styles.logoutText}>
            Logout
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditProfile(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <AppText variant="title" weight="bold">
              Edit Profile
            </AppText>
            <TouchableOpacity onPress={() => setShowEditProfile(false)}>
              <AppText variant="title" style={styles.cancelText}>
                ×
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <AppText variant="body" weight="semibold" style={styles.inputLabel}>
                Full Name
              </AppText>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={editName}
                onChangeText={setEditName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <AppText variant="body" weight="semibold" style={styles.inputLabel}>
                Email
              </AppText>
              <View style={styles.disabledInput}>
                <AppText variant="body" style={styles.disabledText}>
                  {user.email}
                </AppText>
              </View>
              <AppText variant="caption" style={styles.helperText}>
                Email cannot be changed
              </AppText>
            </View>
          </View>

          <View style={styles.modalActions}>
            <Button onPress={handleSaveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 24,
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  profileRow: {
    paddingVertical: 8,
  },
  label: {
    color: '#6B7280',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  editButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
  },
  emptyTeams: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    marginBottom: 4,
  },
  teamDetails: {
    color: '#6B7280',
  },
  arrow: {
    color: '#9CA3AF',
    fontSize: 20,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  logoutSection: {
    padding: 16,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#EF4444',
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
  modalContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
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
  disabledInput: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  disabledText: {
    color: '#6B7280',
  },
  helperText: {
    color: '#6B7280',
    marginTop: 4,
  },
  modalActions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
})
