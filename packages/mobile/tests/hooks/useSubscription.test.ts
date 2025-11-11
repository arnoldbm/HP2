import { renderHook, waitFor } from '@testing-library/react-native'
import Purchases from 'react-native-purchases'
import { useSubscription } from '@/lib/hooks/useSubscription'
import type { CustomerInfo } from 'react-native-purchases'

// Mock RevenueCat
jest.mock('react-native-purchases')

const mockPurchases = Purchases as jest.Mocked<typeof Purchases>

describe('useSubscription', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should start in loading state', () => {
      mockPurchases.getCustomerInfo.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      )

      const { result } = renderHook(() => useSubscription())

      expect(result.current.isLoading).toBe(true)
      expect(result.current.tier).toBe('free') // Default
      expect(result.current.isActive).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Free Tier', () => {
    it('should return free tier when no active subscriptions', async () => {
      const mockCustomerInfo: Partial<CustomerInfo> = {
        entitlements: {
          active: {},
          all: {},
        },
      }

      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo as CustomerInfo
      )

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('free')
      expect(result.current.isActive).toBe(false)
      expect(result.current.expiresAt).toBe(null)
      expect(result.current.willRenew).toBe(false)
    })
  })

  describe('Premium Tier', () => {
    it('should return premium tier when premium entitlement is active', async () => {
      const expirationDate = new Date('2025-12-31')
      const mockCustomerInfo: Partial<CustomerInfo> = {
        entitlements: {
          active: {
            premium: {
              identifier: 'premium',
              isActive: true,
              willRenew: true,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: expirationDate.toISOString(),
              store: 'APP_STORE',
              productIdentifier: 'premium_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: null,
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
          },
          all: {},
        },
      }

      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo as CustomerInfo
      )

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('premium')
      expect(result.current.isActive).toBe(true)
      expect(result.current.expiresAt).toEqual(expirationDate)
      expect(result.current.willRenew).toBe(true)
    })

    it('should handle premium subscription that will not renew', async () => {
      const expirationDate = new Date('2025-12-31')
      const mockCustomerInfo: Partial<CustomerInfo> = {
        entitlements: {
          active: {
            premium: {
              identifier: 'premium',
              isActive: true,
              willRenew: false,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: expirationDate.toISOString(),
              store: 'APP_STORE',
              productIdentifier: 'premium_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: '2025-11-15T00:00:00Z',
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
          },
          all: {},
        },
      }

      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo as CustomerInfo
      )

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('premium')
      expect(result.current.isActive).toBe(true)
      expect(result.current.willRenew).toBe(false)
    })
  })

  describe('Pro Tier', () => {
    it('should return pro tier when pro entitlement is active', async () => {
      const expirationDate = new Date('2025-12-31')
      const mockCustomerInfo: Partial<CustomerInfo> = {
        entitlements: {
          active: {
            pro: {
              identifier: 'pro',
              isActive: true,
              willRenew: true,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: expirationDate.toISOString(),
              store: 'APP_STORE',
              productIdentifier: 'pro_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: null,
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
          },
          all: {},
        },
      }

      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo as CustomerInfo
      )

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('pro')
      expect(result.current.isActive).toBe(true)
      expect(result.current.expiresAt).toEqual(expirationDate)
      expect(result.current.willRenew).toBe(true)
    })

    it('should prioritize pro over premium if both are active', async () => {
      const expirationDate = new Date('2025-12-31')
      const mockCustomerInfo: Partial<CustomerInfo> = {
        entitlements: {
          active: {
            premium: {
              identifier: 'premium',
              isActive: true,
              willRenew: true,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: expirationDate.toISOString(),
              store: 'APP_STORE',
              productIdentifier: 'premium_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: null,
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
            pro: {
              identifier: 'pro',
              isActive: true,
              willRenew: true,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: expirationDate.toISOString(),
              store: 'APP_STORE',
              productIdentifier: 'pro_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: null,
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
          },
          all: {},
        },
      }

      mockPurchases.getCustomerInfo.mockResolvedValue(
        mockCustomerInfo as CustomerInfo
      )

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('pro')
    })
  })

  describe('Error Handling', () => {
    it('should handle errors when fetching customer info', async () => {
      const error = new Error('Failed to fetch customer info')
      mockPurchases.getCustomerInfo.mockRejectedValue(error)

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('free') // Default to free on error
      expect(result.current.isActive).toBe(false)
      expect(result.current.error).toEqual(error)
    })
  })

  describe('Refresh', () => {
    it('should provide a refresh function to reload subscription status', async () => {
      const mockCustomerInfo1: Partial<CustomerInfo> = {
        entitlements: { active: {}, all: {} },
      }
      const mockCustomerInfo2: Partial<CustomerInfo> = {
        entitlements: {
          active: {
            premium: {
              identifier: 'premium',
              isActive: true,
              willRenew: true,
              periodType: 'NORMAL',
              latestPurchaseDate: '2025-01-01T00:00:00Z',
              originalPurchaseDate: '2025-01-01T00:00:00Z',
              expirationDate: '2025-12-31T00:00:00Z',
              store: 'APP_STORE',
              productIdentifier: 'premium_monthly',
              isSandbox: true,
              unsubscribeDetectedAt: null,
              billingIssueDetectedAt: null,
              ownershipType: 'PURCHASED',
            },
          },
          all: {},
        },
      }

      mockPurchases.getCustomerInfo
        .mockResolvedValueOnce(mockCustomerInfo1 as CustomerInfo)
        .mockResolvedValueOnce(mockCustomerInfo2 as CustomerInfo)

      const { result } = renderHook(() => useSubscription())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.tier).toBe('free')

      // Refresh subscription status
      await result.current.refresh()

      await waitFor(() => {
        expect(result.current.tier).toBe('premium')
      })
    })
  })
})
