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

export default function LoginScreen() {
  const router = useRouter()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      setFormError('Email and password are required')
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    const result = await signIn({ email, password })

    setIsSubmitting(false)

    if (result.error) {
      setFormError(result.error)
      return
    }

    router.replace('/(tabs)')
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <AppText variant="title" weight="bold" style={styles.heading}>
            Welcome back
          </AppText>
          <AppText variant="body" style={styles.subheading}>
            Sign in to access your teams, practice plans, and live tracking.
          </AppText>

          <View style={styles.spacing} />

          <Input
            label="Email"
            placeholder="coach@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            textContentType="username"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            textContentType="password"
          />

          {formError ? (
            <AppText variant="caption" style={styles.errorText}>
              {formError}
            </AppText>
          ) : null}

          <View style={styles.actions}>
            <Button onPress={handleSubmit} isLoading={isSubmitting}>
              Sign In
            </Button>
          </View>

          <View style={styles.links}>
            <Link href="/(auth)/forgot-password" style={styles.link}>
              <AppText variant="caption" weight="semibold" style={styles.linkText}>
                Forgot password?
              </AppText>
            </Link>
            <View style={styles.linkRow}>
              <AppText variant="caption">Need an account? </AppText>
              <Link href="/(auth)/signup" style={styles.link}>
                <AppText variant="caption" weight="semibold" style={styles.linkText}>
                  Create one
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
    gap: 12,
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
})
