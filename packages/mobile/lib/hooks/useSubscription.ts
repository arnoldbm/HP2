import { useState, useEffect, useCallback } from 'react'
import Purchases from 'react-native-purchases'
import type { SubscriptionStatus, SubscriptionTier } from '../subscriptions/types'
import { ENTITLEMENTS } from '../subscriptions/types'

/**
 * Hook to manage subscription status using RevenueCat
 */
export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    tier: 'free',
    isActive: false,
    expiresAt: null,
    willRenew: false,
    isLoading: true,
    error: null,
  })

  const fetchSubscriptionStatus = useCallback(async () => {
    try {
      setStatus((prev) => ({ ...prev, isLoading: true, error: null }))

      const customerInfo = await Purchases.getCustomerInfo()
      const activeEntitlements = customerInfo.entitlements.active

      // Determine tier based on active entitlements
      // Pro tier takes priority over Premium
      let tier: SubscriptionTier = 'free'
      let isActive = false
      let expiresAt: Date | null = null
      let willRenew = false

      if (activeEntitlements[ENTITLEMENTS.PRO]) {
        tier = 'pro'
        isActive = true
        const entitlement = activeEntitlements[ENTITLEMENTS.PRO]
        expiresAt = entitlement.expirationDate
          ? new Date(entitlement.expirationDate)
          : null
        willRenew = entitlement.willRenew
      } else if (activeEntitlements[ENTITLEMENTS.PREMIUM]) {
        tier = 'premium'
        isActive = true
        const entitlement = activeEntitlements[ENTITLEMENTS.PREMIUM]
        expiresAt = entitlement.expirationDate
          ? new Date(entitlement.expirationDate)
          : null
        willRenew = entitlement.willRenew
      }

      setStatus({
        tier,
        isActive,
        expiresAt,
        willRenew,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error('Error fetching subscription status:', error)
      setStatus({
        tier: 'free',
        isActive: false,
        expiresAt: null,
        willRenew: false,
        isLoading: false,
        error: error as Error,
      })
    }
  }, [])

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [fetchSubscriptionStatus])

  return {
    ...status,
    refresh: fetchSubscriptionStatus,
  }
}
