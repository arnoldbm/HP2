import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'

import { Button, Input, AppText } from '@/components/ui'
import { useAuth } from '@/lib/contexts/auth-context'

export default function SignupScreen() {
  const router = useRouter()
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      setFormError('All fields are required')
      return
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    setFormError(null)
    setInfoMessage(null)
    setIsSubmitting(true)

    const result = await signUp({ email, password })

    setIsSubmitting(false)

    if (result.error) {
      setFormError(result.error)
      return
    }

    if (result.emailConfirmationSent) {
      setInfoMessage('Check your email to verify your account before signing in.')
      return
    }

    router.replace('/(tabs)/teams')
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <AppText variant="title" weight="bold" style={styles.heading}>
            Create your account
          </AppText>
          <AppText variant="body" style={styles.subheading}>
            Start tracking games and building data-driven practice plans for your teams.
          </AppText>

          <View style={styles.spacing} />

          <Input
            label="Email"
            placeholder="coach@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            textContentType="username"
          />

          <Input
            label="Password"
            placeholder="Create a secure password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            textContentType="newPassword"
            helperText="Minimum 8 characters"
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            textContentType="newPassword"
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
              Create Account
            </Button>
          </View>

          <View style={styles.links}>
            <View style={styles.linkRow}>
              <AppText variant="caption">Already have an account? </AppText>
              <Link href="/(auth)/login" style={styles.link}>
                <AppText variant="caption" weight="semibold" style={styles.linkText}>
                  Sign in
                </AppText>
              </Link>
            </View>
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
    alignItems: 'center',
    marginTop: 16,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
