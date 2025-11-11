/**
 * Subscription types and constants
 */

export type SubscriptionTier = 'free' | 'premium' | 'pro'

export interface SubscriptionStatus {
  tier: SubscriptionTier
  isActive: boolean
  expiresAt: Date | null
  willRenew: boolean
  isLoading: boolean
  error: Error | null
}

export interface SubscriptionLimits {
  maxGamesPerSeason: number | null // null = unlimited
  maxTeams: number | null // null = unlimited
  maxAIPlansPerMonth: number | null // null = unlimited
  hasAnalyticsDashboard: boolean
  hasSeasonAnalytics: boolean
  hasPDFExport: boolean
}

// RevenueCat product identifiers
// These should match the products configured in RevenueCat dashboard
export const SUBSCRIPTION_PRODUCTS = {
  PREMIUM_MONTHLY: 'premium_monthly',
  PREMIUM_YEARLY: 'premium_yearly',
  PRO_MONTHLY: 'pro_monthly',
  PRO_YEARLY: 'pro_yearly',
} as const

// Entitlement identifiers (used to check access)
export const ENTITLEMENTS = {
  PREMIUM: 'premium',
  PRO: 'pro',
} as const

// Subscription tier limits
export const TIER_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    maxGamesPerSeason: 3,
    maxTeams: 1,
    maxAIPlansPerMonth: 0,
    hasAnalyticsDashboard: false,
    hasSeasonAnalytics: false,
    hasPDFExport: false,
  },
  premium: {
    maxGamesPerSeason: null, // unlimited
    maxTeams: null, // unlimited
    maxAIPlansPerMonth: 10,
    hasAnalyticsDashboard: true,
    hasSeasonAnalytics: false,
    hasPDFExport: true,
  },
  pro: {
    maxGamesPerSeason: null, // unlimited
    maxTeams: null, // unlimited
    maxAIPlansPerMonth: null, // unlimited
    hasAnalyticsDashboard: true,
    hasSeasonAnalytics: true,
    hasPDFExport: true,
  },
}

// Pricing display
export interface SubscriptionPricing {
  monthly: string
  yearly: string
  yearlyPerMonth: string
  savings: string
}

export const PRICING: Record<'premium' | 'pro', SubscriptionPricing> = {
  premium: {
    monthly: '$14.99',
    yearly: '$119',
    yearlyPerMonth: '$9.92',
    savings: 'Save $61/year',
  },
  pro: {
    monthly: '$29.99',
    yearly: '$249',
    yearlyPerMonth: '$20.75',
    savings: 'Save $111/year',
  },
}
