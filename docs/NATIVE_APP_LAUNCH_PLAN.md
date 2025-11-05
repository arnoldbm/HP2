# Native App Launch Plan - Web + iOS + Android

**Goal**: Launch simultaneously on Web, iOS, and Android with unified subscriptions
**Timeline**: 8-10 weeks to launch
**Priority**: High - Complete monetization from day 1

---

## 📱 Launch Strategy

### Multi-Platform Launch

**Launch Platforms**:
- ✅ **Web**: Next.js app (existing) - PWA capable
- ✅ **iOS**: React Native + Expo - Submit to App Store
- ✅ **Android**: React Native + Expo - Submit to Google Play

**Unified Experience**:
- Same features across all platforms
- Shared authentication (Supabase)
- Cross-platform subscriptions (RevenueCat)
- Sync data across devices

---

## 🏗️ Architecture: Monorepo with Shared Code

### Project Structure

```
hp2/
├── packages/
│   ├── shared/                 # Shared business logic (NEW)
│   │   ├── src/
│   │   │   ├── api/           # API calls (Supabase)
│   │   │   ├── stores/        # Zustand stores
│   │   │   ├── types/         # TypeScript types
│   │   │   ├── utils/         # Utilities
│   │   │   ├── validation/    # Zod schemas
│   │   │   └── subscriptions/ # RevenueCat logic
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                    # Next.js app (EXISTING)
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   │
│   └── mobile/                 # React Native app (NEW)
│       ├── app/               # Expo Router screens
│       ├── components/        # React Native components
│       ├── ios/               # iOS native code
│       ├── android/           # Android native code
│       ├── app.json           # Expo config
│       └── package.json
│
├── package.json               # Root workspace config
└── turbo.json                # Turborepo config
```

**Why Monorepo?**:
- Share types, utilities, API calls, stores
- Single source of truth for business logic
- Easier to keep web and mobile in sync
- Unified testing and deployment

**Tool**: **Turborepo** (by Vercel, great with Next.js)

---

## 💰 Monetization: RevenueCat from Day 1

### RevenueCat Configuration

**Products** (configure in RevenueCat dashboard):
```
Premium Monthly:
  - iOS: $14.99 (product ID: premium_monthly_1499)
  - Android: $14.99 (product ID: premium_monthly_1499)
  - Web: $14.99 (Stripe price ID: price_...)

Pro Monthly:
  - iOS: $29.99 (product ID: pro_monthly_2999)
  - Android: $29.99 (product ID: pro_monthly_2999)
  - Web: $29.99 (Stripe price ID: price_...)
```

**Why Same Price?**:
- Simpler marketing message
- Fairer to users (no platform discrimination)
- Accept lower margin on mobile for better conversions

**Revenue Split**:
- iOS/Android: 70% to you (30% to Apple/Google)
- Web: 97% to you (3% to Stripe)
- RevenueCat: Free up to $10k MTR, then 1%

---

## 🛠️ Implementation Plan

### Phase 1: Monorepo Setup (Week 1)

**Tasks**:
1. Set up Turborepo
2. Extract shared code from web app
3. Configure workspaces

**Files to Create**:

```json
// package.json (root)
{
  "name": "hp2-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^1.11.0"
  }
}

// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

**Shared Package Setup**:

```json
// packages/shared/package.json
{
  "name": "@hp2/shared",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "zustand": "^4.4.7",
    "zod": "^3.22.4"
  }
}
```

**Extract to Shared**:
- `lib/stores/` → `packages/shared/src/stores/`
- `lib/validation/` → `packages/shared/src/validation/`
- `lib/db/` → `packages/shared/src/api/`
- `types/` → `packages/shared/src/types/`

---

### Phase 2: RevenueCat Integration (Week 2)

**Tasks**:
1. Create RevenueCat account
2. Configure products (iOS, Android, Web/Stripe)
3. Implement shared subscription logic
4. Set up webhooks

**RevenueCat Setup**:

1. **Create Account**: https://app.revenuecat.com
2. **Create Project**: "Hockey Practice Planner"
3. **Add Products**:
   ```
   Premium:
     - iOS App Store: premium_monthly_1499 ($14.99)
     - Google Play: premium_monthly_1499 ($14.99)
     - Stripe: Connect Stripe account, use price_...

   Pro:
     - iOS App Store: pro_monthly_2999 ($29.99)
     - Google Play: pro_monthly_2999 ($29.99)
     - Stripe: price_...
   ```
4. **Entitlements**:
   - `premium`: Grants access to Premium features
   - `pro`: Grants access to Pro features

**Shared Subscription Code**:

```typescript
// packages/shared/src/subscriptions/revenuecat.ts
import Purchases, { LOG_LEVEL } from 'react-native-purchases'

const REVENUECAT_API_KEYS = {
  ios: process.env.REVENUECAT_IOS_API_KEY!,
  android: process.env.REVENUECAT_ANDROID_API_KEY!,
  web: process.env.REVENUECAT_WEB_API_KEY!, // For Stripe via RevenueCat
}

export async function initializeRevenueCat(platform: 'ios' | 'android' | 'web') {
  await Purchases.configure({
    apiKey: REVENUECAT_API_KEYS[platform],
  })

  Purchases.setLogLevel(LOG_LEVEL.DEBUG) // Development only
}

export async function getSubscriptionStatus(userId: string) {
  try {
    await Purchases.logIn(userId)
    const customerInfo = await Purchases.getCustomerInfo()

    return {
      isPremium: !!customerInfo.entitlements.active['premium'],
      isPro: !!customerInfo.entitlements.active['pro'],
      tier: customerInfo.entitlements.active['pro'] ? 'pro' :
            customerInfo.entitlements.active['premium'] ? 'premium' : 'free',
      expirationDate: customerInfo.entitlements.active['premium']?.expirationDate ||
                      customerInfo.entitlements.active['pro']?.expirationDate,
    }
  } catch (error) {
    console.error('Failed to get subscription status:', error)
    return { isPremium: false, isPro: false, tier: 'free' }
  }
}

export async function purchasePackage(packageType: 'premium' | 'pro') {
  try {
    const offerings = await Purchases.getOfferings()
    const offering = offerings.current

    if (!offering) {
      throw new Error('No offerings available')
    }

    const packageToBuy = packageType === 'premium'
      ? offering.monthly  // Assuming monthly is Premium
      : offering.annual   // Assuming annual is Pro (or configure as needed)

    if (!packageToBuy) {
      throw new Error('Package not found')
    }

    const { customerInfo } = await Purchases.purchasePackage(packageToBuy)

    return {
      success: true,
      customerInfo,
      isPremium: !!customerInfo.entitlements.active['premium'],
      isPro: !!customerInfo.entitlements.active['pro'],
    }
  } catch (error: any) {
    if (error.userCancelled) {
      return { success: false, cancelled: true }
    }

    console.error('Purchase failed:', error)
    return { success: false, error: error.message }
  }
}

export async function restorePurchases() {
  try {
    const customerInfo = await Purchases.restorePurchases()
    return {
      success: true,
      isPremium: !!customerInfo.entitlements.active['premium'],
      isPro: !!customerInfo.entitlements.active['pro'],
    }
  } catch (error) {
    console.error('Restore failed:', error)
    return { success: false }
  }
}
```

**Webhook Handler** (for server-side validation):

```typescript
// packages/web/app/api/webhooks/revenuecat/route.ts
import { supabaseAdmin } from '@hp2/shared/api/supabase'

export async function POST(req: Request) {
  const event = await req.json()

  // Verify webhook (RevenueCat sends authorization header)
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.REVENUECAT_WEBHOOK_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { type, event: webhookEvent } = event

  switch (type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
      await handleSubscriptionActive(webhookEvent)
      break

    case 'CANCELLATION':
    case 'EXPIRATION':
      await handleSubscriptionInactive(webhookEvent)
      break

    case 'PRODUCT_CHANGE':
      await handleProductChange(webhookEvent)
      break
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}

async function handleSubscriptionActive(event: any) {
  const userId = event.app_user_id // This is your Supabase user ID
  const entitlements = event.entitlements

  // Determine tier
  let tier = 'free'
  if (entitlements.pro?.is_active) {
    tier = 'pro'
  } else if (entitlements.premium?.is_active) {
    tier = 'premium'
  }

  // Update subscription in database
  await supabaseAdmin
    .from('subscriptions')
    .upsert({
      user_id: userId,
      tier,
      status: 'active',
      revenuecat_customer_id: event.original_app_user_id,
      current_period_end: event.expiration_at_ms
        ? new Date(event.expiration_at_ms).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    })
}

async function handleSubscriptionInactive(event: any) {
  const userId = event.app_user_id

  await supabaseAdmin
    .from('subscriptions')
    .update({
      tier: 'free',
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
}
```

---

### Phase 3: React Native App Setup (Week 3)

**Tasks**:
1. Initialize Expo project
2. Set up Expo Router (file-based routing)
3. Install dependencies
4. Configure for iOS and Android

**Initialize**:

```bash
cd packages
npx create-expo-app mobile --template tabs
cd mobile

# Install dependencies
npm install @supabase/supabase-js
npm install zustand
npm install react-native-purchases  # RevenueCat SDK
npm install expo-router
npm install @react-native-async-storage/async-storage
npm install react-native-safe-area-context
npm install react-native-gesture-handler
npm install react-native-reanimated

# Link to shared package
npm install @hp2/shared@*
```

**Configure Expo** (`app.json`):

```json
{
  "expo": {
    "name": "Hockey Practice Planner",
    "slug": "hockey-practice-planner",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "hp2",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.hockeyplanner.hp2",
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.hockeyplanner.hp2",
      "versionCode": 1
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "react-native-purchases",
        {
          "iosApiKey": "REVENUECAT_IOS_KEY",
          "androidApiKey": "REVENUECAT_ANDROID_KEY"
        }
      ]
    ]
  }
}
```

---

### Phase 4: Core React Native Screens (Weeks 4-6)

**Screen Structure** (using Expo Router):

```
packages/mobile/app/
├── (auth)/              # Auth flow
│   ├── login.tsx
│   ├── signup.tsx
│   └── forgot-password.tsx
│
├── (tabs)/              # Main app tabs
│   ├── _layout.tsx      # Tab navigator
│   ├── teams.tsx        # Teams list
│   ├── track-game.tsx   # Game tracking
│   ├── analytics.tsx    # Analytics dashboard
│   └── settings.tsx     # Settings
│
├── teams/               # Team management
│   ├── [id]/
│   │   ├── index.tsx    # Team details
│   │   ├── roster.tsx   # Player roster
│   │   └── settings.tsx # Team settings
│   └── new.tsx          # Create team
│
├── upgrade.tsx          # Paywall/upgrade screen
└── _layout.tsx          # Root layout
```

**Key Screens to Build**:

1. **Auth Screens** (Week 4)
   - Login
   - Signup
   - Password reset
   - Use shared Supabase auth

2. **Teams & Roster** (Week 4-5)
   - Teams list
   - Create team
   - Player roster (add/edit/delete)
   - Reuse shared stores and API calls

3. **Game Tracking** (Week 5)
   - Ice surface with touch tracking
   - Player selector
   - Event logging
   - Real-time updates (optimistic UI)

4. **Analytics** (Week 5)
   - Shot charts
   - Player stats
   - Game summary

5. **Settings & Subscription** (Week 6)
   - User profile
   - Billing (link to RevenueCat portal)
   - Subscription status
   - Upgrade/downgrade

**Example Screen** (Game Tracking):

```tsx
// packages/mobile/app/(tabs)/track-game.tsx
import { View, Text, TouchableOpacity } from 'react-native'
import { useGameTrackingStore } from '@hp2/shared/stores/game-tracking'
import { IceSurface } from '../components/IceSurface'
import { PlayerSelector } from '../components/PlayerSelector'

export default function TrackGameScreen() {
  const { currentGame, selectedPlayer, logEvent } = useGameTrackingStore()

  const handleIceTouch = (x: number, y: number) => {
    if (!selectedPlayer) return

    logEvent({
      type: 'shot',
      player_id: selectedPlayer.id,
      x,
      y,
      // ... other data
    })
  }

  return (
    <View className="flex-1 bg-white">
      {/* Player Selector */}
      <PlayerSelector />

      {/* Ice Surface */}
      <IceSurface onTouch={handleIceTouch} />

      {/* Event Log */}
      <View className="p-4">
        <Text className="font-bold text-lg">Recent Events</Text>
        {/* ... */}
      </View>
    </View>
  )
}
```

---

### Phase 5: Paywall & Usage Limits (Week 6)

**Implement Usage Checks**:

```typescript
// packages/shared/src/subscriptions/limits.ts
export async function canTrackGame(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  // Get subscription status from RevenueCat
  const { tier } = await getSubscriptionStatus(userId)

  if (tier === 'premium' || tier === 'pro') {
    return { allowed: true }
  }

  // Free tier: Check games tracked
  const { count } = await supabase
    .from('games')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (count >= 3) {
    return {
      allowed: false,
      reason: 'Free tier limited to 3 games. Upgrade for unlimited tracking!',
    }
  }

  return { allowed: true }
}
```

**Paywall Screen**:

```tsx
// packages/mobile/app/upgrade.tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { purchasePackage } from '@hp2/shared/subscriptions/revenuecat'
import { useState } from 'react'

export default function UpgradeScreen() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (tier: 'premium' | 'pro') => {
    setLoading(true)
    const result = await purchasePackage(tier)

    if (result.success) {
      // Navigate back or show success
      router.back()
    } else if (!result.cancelled) {
      alert('Purchase failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-4">Upgrade to Premium</Text>
      <Text className="text-gray-600 mb-8">
        You've reached your free game limit. Upgrade to track unlimited games!
      </Text>

      {/* Premium Card */}
      <View className="border-2 border-blue-500 rounded-lg p-6 mb-4">
        <Text className="text-2xl font-bold mb-2">Premium</Text>
        <Text className="text-4xl font-bold mb-4">$14.99<Text className="text-lg text-gray-500">/mo</Text></Text>

        <View className="mb-6">
          <Text>✅ Unlimited game tracking</Text>
          <Text>✅ AI practice plans</Text>
          <Text>✅ Advanced analytics</Text>
          <Text>✅ 3 teams</Text>
        </View>

        <TouchableOpacity
          onPress={() => handleUpgrade('premium')}
          disabled={loading}
          className="bg-blue-600 py-4 rounded-lg"
        >
          <Text className="text-white text-center font-bold">
            {loading ? 'Processing...' : 'Upgrade to Premium'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pro Card */}
      <View className="border-2 border-purple-500 rounded-lg p-6">
        {/* ... similar structure ... */}
      </View>

      <TouchableOpacity className="mt-4 py-2">
        <Text className="text-center text-gray-500">Restore Purchases</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
```

---

### Phase 6: App Store Preparation (Week 7)

**iOS App Store**:

1. **Create App in App Store Connect**:
   - Name: "Hockey Practice Planner"
   - SKU: hp2-ios
   - Bundle ID: com.hockeyplanner.hp2

2. **Configure In-App Purchases**:
   - Premium Monthly: $14.99 (premium_monthly_1499)
   - Pro Monthly: $29.99 (pro_monthly_2999)

3. **App Screenshots** (Required):
   - 6.5" iPhone (1284 x 2778) - 3-10 screenshots
   - 12.9" iPad Pro (2048 x 2732) - 3-10 screenshots

4. **App Store Listing**:
   - Title: "Hockey Practice Planner"
   - Subtitle: "AI-Powered Practice Plans"
   - Description: 600-800 word description
   - Keywords: hockey, practice, coaching, analytics
   - Category: Sports
   - Age Rating: 4+

5. **Privacy Policy & Terms**:
   - Host on website: hockeyplanner.com/privacy
   - Link in App Store Connect

**Android Play Store**:

1. **Create App in Play Console**:
   - App name: "Hockey Practice Planner"
   - Package: com.hockeyplanner.hp2

2. **Configure In-App Products**:
   - Same IDs and prices as iOS

3. **Store Listing**:
   - Similar to iOS
   - Screenshot sizes: different requirements

4. **Content Rating**:
   - Fill out questionnaire (likely Everyone)

---

### Phase 7: Testing & Beta (Week 8)

**iOS TestFlight**:
```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Upload to TestFlight (automatic with EAS)
```

**Android Internal Testing**:
```bash
# Build for Play Store internal testing
eas build --platform android --profile preview
```

**Beta Testers**:
- Invite 10-20 coaches
- Test on various devices
- Collect feedback
- Fix critical bugs

---

### Phase 8: Launch! (Week 9-10)

**Checklist**:
- ✅ All features working on all platforms
- ✅ RevenueCat subscriptions tested (use sandbox)
- ✅ App Store/Play Store listings complete
- ✅ Screenshots and videos ready
- ✅ Privacy policy and terms published
- ✅ Customer support email set up
- ✅ Analytics configured (RevenueCat + PostHog/Amplitude)

**Submit for Review**:
- iOS: 1-2 weeks review time
- Android: 1-3 days review time

**Launch Day**:
1. Apps approved and live
2. Announce on social media
3. Email waiting list
4. Monitor for issues
5. Respond to reviews

---

## 📊 Updated Timeline

| Week | Web | Mobile | Monetization |
|------|-----|--------|--------------|
| 1 | Set up monorepo, extract shared code | - | RevenueCat account setup |
| 2 | Update web to use shared code | - | Configure products in RevenueCat |
| 3 | Stripe integration (for web via RevenueCat) | Initialize Expo project | RevenueCat webhooks |
| 4 | Test web subscriptions | Auth screens | Usage limits |
| 5 | Polish web UX | Teams & roster screens | Paywall UI (web) |
| 6 | Game tracking updates | Game tracking screen | Paywall UI (mobile) |
| 7 | Analytics improvements | Analytics screen | App Store setup |
| 8 | Beta testing (web) | Beta testing (mobile) | Test purchases |
| 9 | Launch prep | TestFlight/Internal testing | Monitor revenue |
| 10 | **LAUNCH** | Submit to stores | Go live! |

---

## 💰 Cost Breakdown

**Development Tools**:
- Expo: Free (EAS Build: $99/mo for unlimited builds)
- RevenueCat: Free up to $10k MTR
- Apple Developer: $99/year
- Google Play: $25 one-time

**Ongoing**:
- RevenueCat: 1% of revenue after $10k MTR
- Apple/Google: 30% of mobile subscriptions (15% after year 1)
- Stripe: 2.9% + $0.30 per web transaction
- Hosting: ~$50/mo (Vercel + Supabase)

**Total First Year** (assuming $50k revenue):
- Platform fees: ~$12k (30% of ~$40k mobile)
- RevenueCat: ~$400 (1% of revenue)
- Stripe: ~$300 (3% of ~$10k web)
- Development: $99 + $99 + $25 = $223
- **Net Revenue**: ~$37k (74%)

---

## 🎯 Success Metrics

**Launch Goals** (First 3 Months):
- 1,000+ downloads (combined platforms)
- 100+ active users (tracked at least 1 game)
- 15+ paying subscribers (15% conversion)
- $200+ MRR (Monthly Recurring Revenue)
- 4.5+ star rating on App Store/Play Store

**Year 1 Goals**:
- 10,000+ downloads
- 1,000+ active users
- 150+ paying subscribers
- $2,500+ MRR ($30k ARR)

---

## 🚀 Next Steps

Ready to start implementation?

**Immediate Actions**:
1. Set up Turborepo monorepo
2. Extract shared code from web app
3. Create RevenueCat account
4. Initialize React Native app with Expo

**Should I start with Phase 1 (Monorepo Setup)?**
