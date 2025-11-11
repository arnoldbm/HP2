import { checkGamesLimit, checkTeamsLimit, getRemainingGames, checkFeatureAccess } from '@/lib/subscriptions/limits'
import type { SubscriptionTier } from '@/lib/subscriptions/types'

describe('Subscription Limits', () => {
  describe('checkGamesLimit', () => {
    describe('Free Tier', () => {
      it('should allow tracking when under the limit (0/3 games)', () => {
        const result = checkGamesLimit('free', 0)
        expect(result.canTrack).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.gamesRemaining).toBe(3)
      })

      it('should allow tracking when at 2/3 games', () => {
        const result = checkGamesLimit('free', 2)
        expect(result.canTrack).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.gamesRemaining).toBe(1)
      })

      it('should block tracking when at limit (3/3 games)', () => {
        const result = checkGamesLimit('free', 3)
        expect(result.canTrack).toBe(false)
        expect(result.isLimitReached).toBe(true)
        expect(result.gamesRemaining).toBe(0)
        expect(result.requiresUpgrade).toBe(true)
      })

      it('should block tracking when over limit (4/3 games)', () => {
        const result = checkGamesLimit('free', 4)
        expect(result.canTrack).toBe(false)
        expect(result.isLimitReached).toBe(true)
        expect(result.gamesRemaining).toBe(0)
      })
    })

    describe('Premium Tier', () => {
      it('should allow unlimited game tracking', () => {
        const result = checkGamesLimit('premium', 100)
        expect(result.canTrack).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.gamesRemaining).toBe(null) // unlimited
        expect(result.requiresUpgrade).toBeUndefined()
      })

      it('should work with 0 games', () => {
        const result = checkGamesLimit('premium', 0)
        expect(result.canTrack).toBe(true)
        expect(result.isLimitReached).toBe(false)
      })
    })

    describe('Pro Tier', () => {
      it('should allow unlimited game tracking', () => {
        const result = checkGamesLimit('pro', 1000)
        expect(result.canTrack).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.gamesRemaining).toBe(null) // unlimited
      })
    })
  })

  describe('checkTeamsLimit', () => {
    describe('Free Tier', () => {
      it('should allow adding team when at 0/1 teams', () => {
        const result = checkTeamsLimit('free', 0)
        expect(result.canAdd).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.teamsRemaining).toBe(1)
      })

      it('should block adding team when at 1/1 teams', () => {
        const result = checkTeamsLimit('free', 1)
        expect(result.canAdd).toBe(false)
        expect(result.isLimitReached).toBe(true)
        expect(result.teamsRemaining).toBe(0)
        expect(result.requiresUpgrade).toBe(true)
      })

      it('should block adding team when over limit (2/1 teams)', () => {
        const result = checkTeamsLimit('free', 2)
        expect(result.canAdd).toBe(false)
        expect(result.isLimitReached).toBe(true)
        expect(result.teamsRemaining).toBe(0)
      })
    })

    describe('Premium Tier', () => {
      it('should allow unlimited teams', () => {
        const result = checkTeamsLimit('premium', 50)
        expect(result.canAdd).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.teamsRemaining).toBe(null) // unlimited
      })
    })

    describe('Pro Tier', () => {
      it('should allow unlimited teams', () => {
        const result = checkTeamsLimit('pro', 100)
        expect(result.canAdd).toBe(true)
        expect(result.isLimitReached).toBe(false)
        expect(result.teamsRemaining).toBe(null) // unlimited
      })
    })
  })

  describe('getRemainingGames', () => {
    it('should return remaining games for free tier', () => {
      expect(getRemainingGames('free', 0)).toBe(3)
      expect(getRemainingGames('free', 1)).toBe(2)
      expect(getRemainingGames('free', 2)).toBe(1)
      expect(getRemainingGames('free', 3)).toBe(0)
      expect(getRemainingGames('free', 4)).toBe(0) // Can't go negative
    })

    it('should return null for premium tier (unlimited)', () => {
      expect(getRemainingGames('premium', 0)).toBe(null)
      expect(getRemainingGames('premium', 100)).toBe(null)
    })

    it('should return null for pro tier (unlimited)', () => {
      expect(getRemainingGames('pro', 0)).toBe(null)
      expect(getRemainingGames('pro', 1000)).toBe(null)
    })
  })

  describe('checkFeatureAccess', () => {
    describe('Analytics Dashboard', () => {
      it('should deny access for free tier', () => {
        expect(checkFeatureAccess('free', 'analyticsDashboard')).toBe(false)
      })

      it('should allow access for premium tier', () => {
        expect(checkFeatureAccess('premium', 'analyticsDashboard')).toBe(true)
      })

      it('should allow access for pro tier', () => {
        expect(checkFeatureAccess('pro', 'analyticsDashboard')).toBe(true)
      })
    })

    describe('Season Analytics', () => {
      it('should deny access for free tier', () => {
        expect(checkFeatureAccess('free', 'seasonAnalytics')).toBe(false)
      })

      it('should deny access for premium tier', () => {
        expect(checkFeatureAccess('premium', 'seasonAnalytics')).toBe(false)
      })

      it('should allow access for pro tier only', () => {
        expect(checkFeatureAccess('pro', 'seasonAnalytics')).toBe(true)
      })
    })

    describe('PDF Export', () => {
      it('should deny access for free tier', () => {
        expect(checkFeatureAccess('free', 'pdfExport')).toBe(false)
      })

      it('should allow access for premium tier', () => {
        expect(checkFeatureAccess('premium', 'pdfExport')).toBe(true)
      })

      it('should allow access for pro tier', () => {
        expect(checkFeatureAccess('pro', 'pdfExport')).toBe(true)
      })
    })

    describe('AI Practice Plans', () => {
      it('should deny AI plans for free tier', () => {
        expect(checkFeatureAccess('free', 'aiPracticePlans')).toBe(false)
      })

      it('should allow AI plans for premium tier (with monthly limit)', () => {
        expect(checkFeatureAccess('premium', 'aiPracticePlans')).toBe(true)
      })

      it('should allow AI plans for pro tier (unlimited)', () => {
        expect(checkFeatureAccess('pro', 'aiPracticePlans')).toBe(true)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle negative game counts gracefully', () => {
      const result = checkGamesLimit('free', -1)
      expect(result.canTrack).toBe(true)
      expect(result.gamesRemaining).toBe(3)
    })

    it('should handle negative team counts gracefully', () => {
      const result = checkTeamsLimit('free', -1)
      expect(result.canAdd).toBe(true)
      expect(result.teamsRemaining).toBe(1)
    })

    it('should handle very large numbers for unlimited tiers', () => {
      const result1 = checkGamesLimit('premium', 999999)
      expect(result1.canTrack).toBe(true)

      const result2 = checkTeamsLimit('pro', 999999)
      expect(result2.canAdd).toBe(true)
    })
  })
})
