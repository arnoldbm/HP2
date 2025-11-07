/**
 * EventContextMenu Component
 *
 * Modal component that displays context-specific fields for each event type.
 * Provides quick logging with minimal required fields and optional detailed context.
 */

import React, { useState } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native'
import { AppText } from '@/components/ui'
import type {
  EventType,
  EventDetails,
  ShotDetails,
  BreakoutDetails,
  TurnoverDetails,
  ZoneEntryDetails,
  ZoneExitDetails,
  BlockedShotDetails,
  TakeawayDetails,
  FaceoffDetails,
  PenaltyDetails,
  GoalAgainstDetails,
} from '@hockeypilot/shared'

interface EventContextMenuProps {
  visible: boolean
  eventType: EventType
  onComplete: (details: EventDetails) => void
  onCancel: () => void
}

export function EventContextMenu({
  visible,
  eventType,
  onComplete,
  onCancel,
}: EventContextMenuProps) {
  // Generic state for all event types
  const [details, setDetails] = useState<Partial<EventDetails>>({})

  const handleComplete = () => {
    onComplete(details as EventDetails)
    setDetails({}) // Reset
  }

  const renderFields = () => {
    switch (eventType) {
      case 'shot':
        return renderShotFields()
      case 'breakout':
        return renderBreakoutFields()
      case 'turnover':
        return renderTurnoverFields()
      case 'zone_entry':
        return renderZoneEntryFields()
      case 'zone_exit':
        return renderZoneExitFields()
      case 'blocked_shot':
        return renderBlockedShotFields()
      case 'takeaway':
        return renderTakeawayFields()
      case 'faceoff':
        return renderFaceoffFields()
      case 'penalty':
        return renderPenaltyFields()
      case 'goal_against':
        return renderGoalAgainstFields()
      default:
        return null
    }
  }

  // ========================================
  // SHOT FIELDS
  // ========================================
  const renderShotFields = () => {
    const shotDetails = details as Partial<ShotDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Result
        </AppText>
        <View style={styles.buttonRow}>
          {(['goal', 'save', 'miss', 'blocked', 'post'] as const).map((result) => (
            <TouchableOpacity
              key={result}
              style={[
                styles.optionButton,
                shotDetails.result === result && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, result })}
            >
              <AppText
                variant="body"
                weight={shotDetails.result === result ? 'semibold' : 'regular'}
              >
                {result.charAt(0).toUpperCase() + result.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Shot Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['wrist', 'backhand', 'slap', 'snap', 'one_timer', 'tip', 'deflection'] as const).map(
            (type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  shotDetails.shot_type === type && styles.optionButtonSelected,
                ]}
                onPress={() => setDetails({ ...details, shot_type: type })}
              >
                <AppText
                  variant="caption"
                  weight={shotDetails.shot_type === type ? 'semibold' : 'regular'}
                >
                  {type.replace('_', ' ')}
                </AppText>
              </TouchableOpacity>
            )
          )}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Context (Optional)
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { key: 'rebound', label: 'Rebound' },
            { key: 'rush', label: 'Rush' },
            { key: 'screen', label: 'Screen' },
          ].map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.optionButton,
                shotDetails[key as keyof ShotDetails] && styles.optionButtonSelected,
              ]}
              onPress={() =>
                setDetails({
                  ...details,
                  [key]: !shotDetails[key as keyof ShotDetails],
                })
              }
            >
              <AppText
                variant="body"
                weight={shotDetails[key as keyof ShotDetails] ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // BREAKOUT FIELDS
  // ========================================
  const renderBreakoutFields = () => {
    const breakoutDetails = details as Partial<BreakoutDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Success
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { value: true, label: 'Success' },
            { value: false, label: 'Failed' },
          ].map(({ value, label }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionButton,
                breakoutDetails.success === value && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, success: value })}
            >
              <AppText
                variant="body"
                weight={breakoutDetails.success === value ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['up_boards', 'center_ice', 'd_to_d', 'reverse', 'chip'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                breakoutDetails.breakout_type === type && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, breakout_type: type })}
            >
              <AppText
                variant="caption"
                weight={breakoutDetails.breakout_type === type ? 'semibold' : 'regular'}
              >
                {type.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Exit Zone
        </AppText>
        <View style={styles.buttonRow}>
          {(['left', 'center', 'right'] as const).map((zone) => (
            <TouchableOpacity
              key={zone}
              style={[
                styles.optionButton,
                breakoutDetails.exit_zone === zone && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, exit_zone: zone })}
            >
              <AppText
                variant="body"
                weight={breakoutDetails.exit_zone === zone ? 'semibold' : 'regular'}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Pressure
        </AppText>
        <View style={styles.buttonRow}>
          {(['none', 'low', 'high'] as const).map((pressure) => (
            <TouchableOpacity
              key={pressure}
              style={[
                styles.optionButton,
                breakoutDetails.pressure === pressure && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, pressure })}
            >
              <AppText
                variant="body"
                weight={breakoutDetails.pressure === pressure ? 'semibold' : 'regular'}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // TURNOVER FIELDS
  // ========================================
  const renderTurnoverFields = () => {
    const turnoverDetails = details as Partial<TurnoverDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Zone
        </AppText>
        <View style={styles.buttonRow}>
          {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
            <TouchableOpacity
              key={zone}
              style={[
                styles.optionButton,
                turnoverDetails.zone === zone && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, zone })}
            >
              <AppText
                variant="body"
                weight={turnoverDetails.zone === zone ? 'semibold' : 'regular'}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Caused By
        </AppText>
        <View style={styles.buttonRow}>
          {(['bad_pass', 'lost_puck', 'hit', 'pressure', 'offside'] as const).map((cause) => (
            <TouchableOpacity
              key={cause}
              style={[
                styles.optionButton,
                turnoverDetails.caused_by === cause && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, caused_by: cause })}
            >
              <AppText
                variant="caption"
                weight={turnoverDetails.caused_by === cause ? 'semibold' : 'regular'}
              >
                {cause.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Pressure
        </AppText>
        <View style={styles.buttonRow}>
          {(['none', 'low', 'high'] as const).map((pressure) => (
            <TouchableOpacity
              key={pressure}
              style={[
                styles.optionButton,
                turnoverDetails.pressure === pressure && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, pressure })}
            >
              <AppText
                variant="body"
                weight={turnoverDetails.pressure === pressure ? 'semibold' : 'regular'}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // ZONE ENTRY FIELDS
  // ========================================
  const renderZoneEntryFields = () => {
    const entryDetails = details as Partial<ZoneEntryDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Success
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { value: true, label: 'Success' },
            { value: false, label: 'Failed' },
          ].map(({ value, label }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionButton,
                entryDetails.success === value && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, success: value })}
            >
              <AppText
                variant="body"
                weight={entryDetails.success === value ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['carry', 'dump', 'pass', 'chip'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                entryDetails.entry_type === type && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, entry_type: type })}
            >
              <AppText
                variant="body"
                weight={entryDetails.entry_type === type ? 'semibold' : 'regular'}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Zone
        </AppText>
        <View style={styles.buttonRow}>
          {(['left', 'center', 'right'] as const).map((zone) => (
            <TouchableOpacity
              key={zone}
              style={[
                styles.optionButton,
                entryDetails.zone === zone && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, zone })}
            >
              <AppText
                variant="body"
                weight={entryDetails.zone === zone ? 'semibold' : 'regular'}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // ZONE EXIT FIELDS (NEW)
  // ========================================
  const renderZoneExitFields = () => {
    const exitDetails = details as Partial<ZoneExitDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Controlled?
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' },
          ].map(({ value, label }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionButton,
                exitDetails.controlled === value && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, controlled: value })}
            >
              <AppText
                variant="body"
                weight={exitDetails.controlled === value ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Exit Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['pass', 'carry', 'dump', 'clear'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                exitDetails.exit_type === type && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, exit_type: type })}
            >
              <AppText
                variant="body"
                weight={exitDetails.exit_type === type ? 'semibold' : 'regular'}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Pressure
        </AppText>
        <View style={styles.buttonRow}>
          {(['none', 'low', 'high'] as const).map((pressure) => (
            <TouchableOpacity
              key={pressure}
              style={[
                styles.optionButton,
                exitDetails.pressure === pressure && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, pressure })}
            >
              <AppText
                variant="body"
                weight={exitDetails.pressure === pressure ? 'semibold' : 'regular'}
              >
                {pressure.charAt(0).toUpperCase() + pressure.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // BLOCKED SHOT FIELDS (NEW)
  // ========================================
  const renderBlockedShotFields = () => {
    const blockedDetails = details as Partial<BlockedShotDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Who Blocked?
        </AppText>
        <View style={styles.buttonRow}>
          {(['defense', 'forward'] as const).map((position) => (
            <TouchableOpacity
              key={position}
              style={[
                styles.optionButton,
                blockedDetails.blocker_position === position && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, blocker_position: position })}
            >
              <AppText
                variant="body"
                weight={blockedDetails.blocker_position === position ? 'semibold' : 'regular'}
              >
                {position.charAt(0).toUpperCase() + position.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Shot From
        </AppText>
        <View style={styles.buttonRow}>
          {(['point', 'slot', 'rush', 'other'] as const).map((from) => (
            <TouchableOpacity
              key={from}
              style={[
                styles.optionButton,
                blockedDetails.shot_from === from && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, shot_from: from })}
            >
              <AppText
                variant="body"
                weight={blockedDetails.shot_from === from ? 'semibold' : 'regular'}
              >
                {from.charAt(0).toUpperCase() + from.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // TAKEAWAY FIELDS (NEW)
  // ========================================
  const renderTakeawayFields = () => {
    const takeawayDetails = details as Partial<TakeawayDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Zone
        </AppText>
        <View style={styles.buttonRow}>
          {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
            <TouchableOpacity
              key={zone}
              style={[
                styles.optionButton,
                takeawayDetails.zone === zone && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, zone })}
            >
              <AppText
                variant="body"
                weight={takeawayDetails.zone === zone ? 'semibold' : 'regular'}
              >
                {zone.charAt(0).toUpperCase() + zone.slice(1)}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['stick_check', 'intercept', 'body_check'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.optionButton,
                takeawayDetails.takeaway_type === type && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, takeaway_type: type })}
            >
              <AppText
                variant="caption"
                weight={takeawayDetails.takeaway_type === type ? 'semibold' : 'regular'}
              >
                {type.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // FACEOFF FIELDS (ENHANCED)
  // ========================================
  const renderFaceoffFields = () => {
    const faceoffDetails = details as Partial<FaceoffDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Result
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { value: true, label: 'Won' },
            { value: false, label: 'Lost' },
          ].map(({ value, label }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionButton,
                faceoffDetails.won === value && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, won: value })}
            >
              <AppText
                variant="body"
                weight={faceoffDetails.won === value ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Zone
        </AppText>
        <View style={styles.buttonRow}>
          {(['defensive', 'neutral', 'offensive'] as const).map((zone) => (
            <TouchableOpacity
              key={zone}
              style={[
                styles.optionButton,
                faceoffDetails.zone === zone && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, zone })}
            >
              <AppText
                variant="caption"
                weight={faceoffDetails.zone === zone ? 'semibold' : 'regular'}
              >
                {zone.charAt(0).toUpperCase()}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Location
        </AppText>
        <View style={styles.buttonRow}>
          {['left_circle', 'right_circle', 'center'].map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.optionButton,
                faceoffDetails.location === location && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, location })}
            >
              <AppText
                variant="caption"
                weight={faceoffDetails.location === location ? 'semibold' : 'regular'}
              >
                {location.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  // ========================================
  // PENALTY FIELDS (NEW)
  // ========================================
  const renderPenaltyFields = () => {
    const penaltyDetails = details as Partial<PenaltyDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Penalty
        </AppText>
        <View style={styles.buttonRow}>
          {[
            { value: false, label: 'Taken' },
            { value: true, label: 'Drawn' },
          ].map(({ value, label }) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.optionButton,
                penaltyDetails.drawn === value && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, drawn: value })}
            >
              <AppText
                variant="body"
                weight={penaltyDetails.drawn === value ? 'semibold' : 'regular'}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Infraction
        </AppText>
        <View style={styles.buttonRow}>
          {['hooking', 'tripping', 'high_sticking', 'slashing', 'interference'].map(
            (infraction) => (
              <TouchableOpacity
                key={infraction}
                style={[
                  styles.optionButton,
                  penaltyDetails.infraction === infraction && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  setDetails({
                    ...details,
                    infraction,
                    severity: 'minor',
                    duration_minutes: 2,
                  })
                }
              >
                <AppText
                  variant="caption"
                  weight={penaltyDetails.infraction === infraction ? 'semibold' : 'regular'}
                >
                  {infraction.replace('_', ' ')}
                </AppText>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    )
  }

  // ========================================
  // GOAL AGAINST FIELDS (NEW)
  // ========================================
  const renderGoalAgainstFields = () => {
    const goalDetails = details as Partial<GoalAgainstDetails>
    return (
      <View style={styles.fieldsContainer}>
        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Situation
        </AppText>
        <View style={styles.buttonRow}>
          {(['even_strength', 'power_play', 'penalty_kill', 'empty_net'] as const).map((sit) => (
            <TouchableOpacity
              key={sit}
              style={[
                styles.optionButton,
                goalDetails.situation === sit && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, situation: sit })}
            >
              <AppText
                variant="caption"
                weight={goalDetails.situation === sit ? 'semibold' : 'regular'}
              >
                {sit.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppText variant="body" weight="semibold" style={styles.fieldLabel}>
          Breakdown Type
        </AppText>
        <View style={styles.buttonRow}>
          {(['lost_coverage', 'bad_clear', 'bad_pass', 'other'] as const).map((breakdown) => (
            <TouchableOpacity
              key={breakdown}
              style={[
                styles.optionButton,
                goalDetails.breakdown_type === breakdown && styles.optionButtonSelected,
              ]}
              onPress={() => setDetails({ ...details, breakdown_type: breakdown })}
            >
              <AppText
                variant="caption"
                weight={goalDetails.breakdown_type === breakdown ? 'semibold' : 'regular'}
              >
                {breakdown.replace('_', ' ')}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onCancel}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title" weight="bold">
            Event Context
          </AppText>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <AppText variant="body" style={styles.closeText}>
              ✕
            </AppText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {renderFields()}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleComplete}>
            <AppText variant="body" weight="semibold" style={styles.saveButtonText}>
              Save Event
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  fieldsContainer: {
    gap: 16,
  },
  fieldLabel: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
  },
})
