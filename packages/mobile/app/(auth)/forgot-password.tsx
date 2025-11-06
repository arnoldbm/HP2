import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Link } from 'expo-router'

import { Button, Input, AppText } from '@/components/ui'
import { useAuth } from '@/lib/contexts/auth-context'

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!email) {
      setFormError('Email is required')
      return
    }

    setFormError(null)
    setInfoMessage(null)
    setIsSubmitting(true)

    const result = await resetPassword(email)

    setIsSubmitting(false)

    if (result.error) {
      setFormError(result.error)
      return
    }

    setInfoMessage('If that email is registered, a reset link is on the way.')
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <AppText variant="title" weight="bold" style={styles.heading}>
            Reset your password
          </AppText>
          <AppText variant="body" style={styles.subheading}>
            Enter the email you use for HockeyPilot and we’ll send you reset instructions.
          </AppText>

          <View style={styles.spacing} />

          <Input
            label="Email"
            placeholder="coach@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
          />

          {formError ? (
            <AppText variant="caption" style={styles.errorText}>
              {formError}
            </AppText>
          ) : null}

          {infoMessage ? (
            <AppText variant="caption" style={styles.infoText}>
              {infoMessage}
            </AppText>
          ) : null}

          <View style={styles.actions}>
            <Button onPress={handleSubmit} isLoading={isSubmitting}>
              Send reset link
            </Button>
          </View>

          <View style={styles.links}>
            <Link href="/(auth)/login" style={styles.link}>
              <AppText variant="caption" weight="semibold" style={styles.linkText}>
                Back to sign in
              </AppText>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    gap: 16,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  heading: {
    color: '#0f172a',
  },
  subheading: {
    color: '#475569',
  },
  spacing: {
    height: 8,
  },
  actions: {
    marginTop: 8,
  },
  links: {
    alignItems: 'flex-start',
    marginTop: 16,
  },
  link: {
    textDecorationLine: 'underline',
  },
  linkText: {
    color: '#1d4ed8',
  },
  errorText: {
    color: '#ef4444',
  },
  infoText: {
    color: '#1d4ed8',
  },
})
