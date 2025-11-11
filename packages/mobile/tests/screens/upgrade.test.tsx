import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Purchases from 'react-native-purchases'
import UpgradeScreen from '@/app/upgrade'
import { useSubscription } from '@/lib/hooks/useSubscription'

// Mock modules
const mockBack = jest.fn()
const mockReplace = jest.fn()
const mockRefresh = jest.fn()
const mockGetOfferings = jest.fn()
const mockPurchasePackage = jest.fn()
const mockRestorePurchases = jest.fn()

jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
    replace: mockReplace,
    push: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(() => ({})),
  Link: 'Link',
  Stack: 'Stack',
  Tabs: 'Tabs',
}))

jest.mock('react-native-purchases', () => ({
  getOfferings: () => mockGetOfferings(),
  purchasePackage: () => mockPurchasePackage(),
  restorePurchases: () => mockRestorePurchases(),
}))

jest.mock('@/lib/hooks/useSubscription')

const mockUseSubscription = useSubscription as jest.MockedFunction<
  typeof useSubscription
>
const { useLocalSearchParams } = require('expo-router')

describe('UpgradeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Reset function mocks
    mockBack.mockClear()
    mockReplace.mockClear()
    mockRefresh.mockClear()
    mockGetOfferings.mockClear()
    mockPurchasePackage.mockClear()
    mockRestorePurchases.mockClear()

    // Set default return values
    useLocalSearchParams.mockReturnValue({})

    mockUseSubscription.mockReturnValue({
      tier: 'free',
      isActive: false,
      expiresAt: null,
      willRenew: false,
      isLoading: false,
      error: null,
      refresh: mockRefresh,
    })

    mockGetOfferings.mockResolvedValue({ current: { availablePackages: [] } })
  })

  describe('Rendering', () => {
    it('should render upgrade screen with title', () => {
      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/upgrade/i)).toBeTruthy()
    })

    it('should render Premium pricing card', () => {
      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/premium/i)).toBeTruthy()
      expect(getByText(/\$14\.99/)).toBeTruthy()
    })

    it('should render Pro pricing card', () => {
      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/^pro$/i)).toBeTruthy()
      expect(getByText(/\$29\.99/)).toBeTruthy()
    })

    it('should render "Restore Purchases" button', () => {
      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/restore purchases/i)).toBeTruthy()
    })

    it('should render close button', () => {
      const { getByLabelText } = render(<UpgradeScreen />)

      const closeButton = getByLabelText(/close/i)
      expect(closeButton).toBeTruthy()
    })
  })

  describe('Premium Features', () => {
    it('should list premium features', () => {
      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/unlimited.*game.*tracking/i)).toBeTruthy()
      expect(getByText(/unlimited.*teams/i)).toBeTruthy()
      expect(getByText(/analytics.*dashboard/i)).toBeTruthy()
    })
  })

  describe('Pro Features', () => {
    it('should list pro features including premium features', () => {
      const { getByText } = render(<UpgradeScreen />)

      // Everything from Premium
      expect(getByText(/unlimited.*game.*tracking/i)).toBeTruthy()
      expect(getByText(/unlimited.*teams/i)).toBeTruthy()

      // Pro-specific features
      expect(getByText(/unlimited.*ai/i)).toBeTruthy()
      expect(getByText(/season.*analytics/i)).toBeTruthy()
    })
  })

  describe('Purchase Flow', () => {
    it('should call RevenueCat purchasePackage when Premium is selected', async () => {
      const mockOfferings = {
        current: {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: {
                identifier: 'premium_monthly',
                title: 'Premium Monthly',
                price: 14.99,
                priceString: '$14.99',
              },
            },
          ],
        },
      }

      const mockPurchaseResult = {
        customerInfo: {
          entitlements: {
            active: {
              premium: { identifier: 'premium', isActive: true },
            },
          },
        },
        productIdentifier: 'premium_monthly',
      }

      mockGetOfferings.mockResolvedValue(mockOfferings as any)
      mockPurchasePackage.mockResolvedValue(mockPurchaseResult as any)

      const { getByText } = render(<UpgradeScreen />)

      // Find and tap "Get Premium" button
      const premiumButton = getByText(/get premium/i)
      fireEvent.press(premiumButton)

      await waitFor(() => {
        expect(mockPurchasePackage).toHaveBeenCalled()
      })
    })

    it('should show loading state during purchase', async () => {
      const mockOfferings = {
        current: {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: {
                identifier: 'premium_monthly',
                title: 'Premium Monthly',
                price: 14.99,
                priceString: '$14.99',
              },
            },
          ],
        },
      }

      mockGetOfferings.mockResolvedValue(mockOfferings as any)
      mockPurchasePackage.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      )

      const { getByText } = render(<UpgradeScreen />)

      const premiumButton = getByText(/get premium/i)
      fireEvent.press(premiumButton)

      await waitFor(() => {
        expect(getByText(/upgrading/i)).toBeTruthy()
      })
    })

    it('should navigate back on successful purchase', async () => {
      const mockOfferings = {
        current: {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: {
                identifier: 'premium_monthly',
                title: 'Premium Monthly',
                price: 14.99,
                priceString: '$14.99',
              },
            },
          ],
        },
      }

      const mockPurchaseResult = {
        customerInfo: {
          entitlements: {
            active: {
              premium: { identifier: 'premium', isActive: true },
            },
          },
        },
        productIdentifier: 'premium_monthly',
      }

      mockGetOfferings.mockResolvedValue(mockOfferings as any)
      mockPurchasePackage.mockResolvedValue(mockPurchaseResult as any)

      const { getByText } = render(<UpgradeScreen />)

      const premiumButton = getByText(/get premium/i)
      fireEvent.press(premiumButton)

      await waitFor(() => {
        expect(mockBack).toHaveBeenCalled()
      })
    })

    it('should handle purchase cancellation gracefully', async () => {
      const mockOfferings = {
        current: {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: { identifier: 'premium_monthly' },
            },
          ],
        },
      }

      const cancelError = {
        code: 'PURCHASE_CANCELLED',
        message: 'User cancelled purchase',
      }

      mockGetOfferings.mockResolvedValue(mockOfferings as any)
      mockPurchasePackage.mockRejectedValue(cancelError)

      const { getByText, queryByText } = render(<UpgradeScreen />)

      const premiumButton = getByText(/get premium/i)
      fireEvent.press(premiumButton)

      await waitFor(() => {
        // Should not show error alert for cancellation
        expect(queryByText(/error/i)).toBeFalsy()
      })
    })

    it('should show error message for failed purchase', async () => {
      const mockOfferings = {
        current: {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: { identifier: 'premium_monthly' },
            },
          ],
        },
      }

      const error = new Error('Payment failed')
      mockGetOfferings.mockResolvedValue(mockOfferings as any)
      mockPurchasePackage.mockRejectedValue(error)

      const { getByText } = render(<UpgradeScreen />)

      const premiumButton = getByText(/get premium/i)
      fireEvent.press(premiumButton)

      await waitFor(() => {
        expect(getByText(/failed/i)).toBeTruthy()
      })
    })
  })

  describe('Restore Purchases', () => {
    it('should call RevenueCat restorePurchases when restore button is tapped', async () => {
      const mockCustomerInfo = {
        entitlements: {
          active: {
            premium: { identifier: 'premium', isActive: true },
          },
        },
      }

      mockRestorePurchases.mockResolvedValue(mockCustomerInfo as any)

      const { getByText } = render(<UpgradeScreen />)

      const restoreButton = getByText(/restore purchases/i)
      fireEvent.press(restoreButton)

      await waitFor(() => {
        expect(mockRestorePurchases).toHaveBeenCalled()
      })
    })

    it('should show success message when purchases are restored', async () => {
      const mockCustomerInfo = {
        entitlements: {
          active: {
            premium: { identifier: 'premium', isActive: true },
          },
        },
      }

      mockRestorePurchases.mockResolvedValue(mockCustomerInfo as any)

      const { getByText } = render(<UpgradeScreen />)

      const restoreButton = getByText(/restore purchases/i)
      fireEvent.press(restoreButton)

      await waitFor(() => {
        expect(getByText(/restored/i)).toBeTruthy()
      })
    })

    it('should handle restore failure', async () => {
      const error = new Error('No purchases to restore')
      mockRestorePurchases.mockRejectedValue(error)

      const { getByText } = render(<UpgradeScreen />)

      const restoreButton = getByText(/restore purchases/i)
      fireEvent.press(restoreButton)

      await waitFor(() => {
        expect(getByText(/no.*purchases.*found/i)).toBeTruthy()
      })
    })
  })

  describe('Navigation', () => {
    it('should navigate back when close button is pressed', () => {
      const { getByLabelText } = render(<UpgradeScreen />)

      const closeButton = getByLabelText(/close/i)
      fireEvent.press(closeButton)

      expect(mockBack).toHaveBeenCalled()
    })
  })

  describe('Context-aware messaging', () => {
    it('should show games limit message when reached', () => {
      useLocalSearchParams.mockReturnValue({
        reason: 'games_limit',
      })

      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/reached.*free.*game.*tracking.*limit/i)).toBeTruthy()
    })

    it('should show teams limit message when reached', () => {
      useLocalSearchParams.mockReturnValue({
        reason: 'teams_limit',
      })

      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/add.*more.*teams/i)).toBeTruthy()
    })

    it('should show generic upgrade message by default', () => {
      useLocalSearchParams.mockReturnValue({})

      const { getByText } = render(<UpgradeScreen />)

      expect(getByText(/unlock.*all.*features/i)).toBeTruthy()
    })
  })
})
