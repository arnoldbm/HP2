import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { AppText, Button } from '@/components/ui'
import { useSubscription } from '@/lib/hooks/useSubscription'
import { PRICING } from '@/lib/subscriptions/types'

interface PricingCardProps {
  tier: 'premium' | 'pro'
  isPopular?: boolean
  onPurchase: () => void
  isPurchasing: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  isPopular,
  onPurchase,
  isPurchasing,
}) => {
  const pricing = PRICING[tier]
  const isPremium = tier === 'premium'
  const isPro = tier === 'pro'

  const features = isPremium
    ? [
        'Unlimited game tracking',
        'Unlimited teams',
        'Post-game analytics dashboard',
        'AI practice plans (10/month)',
        'Full practice history',
        'PDF export with branding',
        'Priority support',
      ]
    : [
        'Everything in Premium',
        'Unlimited AI practice plans',
        'Season-long analytics',
        'Comparative analytics',
        'Player development tracking',
        'Video drill library',
      ]

  return (
    <View
      style={[styles.pricingCard, isPopular && styles.pricingCardPopular]}
    >
      {isPopular && (
        <View style={styles.popularBadge}>
          <AppText variant="caption" weight="bold" style={styles.popularText}>
            MOST POPULAR
          </AppText>
        </View>
      )}

      <AppText variant="title" weight="bold" style={styles.tierName}>
        {isPremium ? 'Premium' : 'Pro'}
      </AppText>

      <View style={styles.priceContainer}>
        <AppText variant="title" weight="bold" style={styles.price}>
          {pricing.monthly}
        </AppText>
        <AppText variant="caption" style={styles.pricePeriod}>
          /month
        </AppText>
      </View>

      <AppText variant="caption" style={styles.annualPrice}>
        or {pricing.yearly}/year ({pricing.savings})
      </AppText>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <AppText variant="caption" style={styles.checkmark}>
              ✓
            </AppText>
            <AppText variant="body" style={styles.featureText}>
              {feature}
            </AppText>
          </View>
        ))}
      </View>

      <Button
        onPress={onPurchase}
        disabled={isPurchasing}
        style={[styles.purchaseButton, isPro && styles.purchaseButtonPro]}
      >
        {isPurchasing ? 'Upgrading...' : `Get ${isPremium ? 'Premium' : 'Pro'}`}
      </Button>
    </View>
  )
}

export default function UpgradeScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{ reason?: string }>()
  const { refresh } = useSubscription()

  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  useEffect(() => {
    loadOfferings()
  }, [])

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      if (offerings.current?.availablePackages) {
        setPackages(offerings.current.availablePackages)
      }
    } catch (error) {
      console.error('Error loading offerings:', error)
    }
  }

  const getContextMessage = () => {
    switch (params.reason) {
      case 'games_limit':
        return 'You have reached your free game tracking limit. Upgrade to track unlimited games!'
      case 'teams_limit':
        return 'Upgrade to Premium or Pro to add more teams to your account.'
      default:
        return 'Unlock all features and track unlimited games with a Premium or Pro subscription.'
    }
  }

  const handlePurchase = async (tier: 'premium' | 'pro') => {
    try {
      setIsPurchasing(true)

      // Find the monthly package for the selected tier
      const packageToPurchase = packages.find((pkg) =>
        pkg.identifier.includes(tier)
      )

      if (!packageToPurchase) {
        Alert.alert('Error', 'Unable to find subscription package')
        return
      }

      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase)

      // Check if the user now has access
      const activeEntitlements = Object.keys(customerInfo.entitlements.active)
      if (activeEntitlements.length > 0) {
        // Refresh subscription status
        await refresh()

        // Show success and navigate back
        Alert.alert(
          'Success!',
          `You are now subscribed to ${tier === 'premium' ? 'Premium' : 'Pro'}!`,
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        )
      }
    } catch (error: any) {
      // Handle user cancellation gracefully
      if (error.code === 'PURCHASE_CANCELLED' || error.userCancelled) {
        // User cancelled, don't show error
        return
      }

      console.error('Purchase error:', error)
      Alert.alert('Purchase Failed', error.message || 'Unable to complete purchase')
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleRestorePurchases = async () => {
    try {
      setIsRestoring(true)

      const customerInfo = await Purchases.restorePurchases()
      const activeEntitlements = Object.keys(customerInfo.entitlements.active)

      if (activeEntitlements.length > 0) {
        // Refresh subscription status
        await refresh()

        Alert.alert(
          'Purchases Restored',
          'Your subscription has been restored!',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        )
      } else {
        Alert.alert(
          'No Purchases Found',
          'No active subscriptions were found to restore.'
        )
      }
    } catch (error: any) {
      console.error('Restore error:', error)
      Alert.alert('Restore Failed', error.message || 'Unable to restore purchases')
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          Upgrade
        </AppText>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityLabel="Close"
        >
          <AppText variant="title" style={styles.closeText}>
            ×
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Context Message */}
        <View style={styles.messageContainer}>
          <AppText variant="body" style={styles.message}>
            {getContextMessage()}
          </AppText>
        </View>

        {/* Pricing Cards */}
        <PricingCard
          tier="premium"
          isPopular
          onPurchase={() => handlePurchase('premium')}
          isPurchasing={isPurchasing}
        />

        <PricingCard
          tier="pro"
          onPurchase={() => handlePurchase('pro')}
          isPurchasing={isPurchasing}
        />

        {/* Restore Purchases */}
        <TouchableOpacity
          onPress={handleRestorePurchases}
          style={styles.restoreButton}
          disabled={isRestoring}
        >
          {isRestoring ? (
            <ActivityIndicator size="small" color="#3B82F6" />
          ) : (
            <AppText variant="body" style={styles.restoreText}>
              Restore Purchases
            </AppText>
          )}
        </TouchableOpacity>

        {/* Terms */}
        <AppText variant="caption" style={styles.terms}>
          Subscriptions auto-renew unless cancelled 24 hours before the end of
          the current period. Manage your subscription in App Store settings.
        </AppText>
      </ScrollView>
    </View>
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
    padding: 4,
  },
  closeText: {
    color: '#6B7280',
    fontSize: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  messageContainer: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  message: {
    color: '#1E40AF',
    textAlign: 'center',
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  pricingCardPopular: {
    borderColor: '#3B82F6',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  tierName: {
    marginBottom: 12,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    color: '#3B82F6',
  },
  pricePeriod: {
    color: '#6B7280',
    marginLeft: 4,
  },
  annualPrice: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    color: '#10B981',
    fontSize: 18,
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    color: '#374151',
  },
  purchaseButton: {
    marginTop: 8,
  },
  purchaseButtonPro: {
    backgroundColor: '#7C3AED',
  },
  restoreButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  restoreText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  terms: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
    lineHeight: 18,
  },
})
