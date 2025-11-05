# Payment Integration - Implementation Plan (RevenueCat + Stripe)

**Feature**: Cross-platform subscriptions with RevenueCat (iOS, Android, Web)
**Priority**: High (required for monetization)
**Complexity**: Medium-High

**⚠️ UPDATED**: This plan now uses RevenueCat to manage subscriptions across iOS (Apple IAP), Android (Google Play), and Web (Stripe) for unified native app + web launch.

---

## 📋 Overview

### Business Model
**Freemium** with 3 pricing tiers:

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/mo | • 1 team<br>• 3 tracked games (lifetime)<br>• Basic drill library<br>• Manual practice planning |
| **Premium** | $14.99/mo | • 3 teams<br>• **Unlimited game tracking**<br>• AI practice plan generation<br>• Post-game analytics<br>• Shot charts & heat maps<br>• Player statistics |
| **Pro** | $29.99/mo | • Unlimited teams<br>• Everything in Premium<br>• Season-long analytics<br>• Trend analysis<br>• Comparative benchmarks<br>• Priority support |

### Key Monetization Insight
The "3 free tracked games" limit is strategic:
1. Coaches track 1-2 games to try it out
2. On the 3rd game, they're hooked (data is valuable)
3. Paywall appears: "Upgrade to track unlimited games"
4. Once they have 5+ games tracked, switching cost is high (lock-in)

---

## 🏗️ Architecture

### Data Flow

```
User Signs Up (Free Tier)
  ↓
Tracks 3 Games (free limit)
  ↓
Tries to track 4th game → Paywall Modal
  ↓
Click "Upgrade to Premium" → Stripe Checkout
  ↓
Enter Payment Info → Stripe processes
  ↓
Webhook → Update Supabase subscription status
  ↓
Redirect back to app → Limits removed
  ↓
Track unlimited games ✅
```

### Database Schema

```sql
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,

  -- Subscription details
  tier TEXT NOT NULL CHECK (tier IN ('free', 'premium', 'pro')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),

  -- Billing cycle
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- Usage tracking
  games_tracked_this_month INTEGER DEFAULT 0,
  games_tracked_lifetime INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Indexes
  UNIQUE(user_id)
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Usage tracking table (for metering & analytics)
CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('game_tracked', 'practice_generated', 'ai_request')),

  -- Context
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_usage_events_user ON usage_events(user_id);
CREATE INDEX idx_usage_events_created_at ON usage_events(created_at);
```

---

## 🛠️ Implementation Plan

### Phase 1: Stripe Setup & Customer Creation

**Files to Create**:
- `lib/stripe/client.ts` - Stripe API client (server-side)
- `lib/stripe/products.ts` - Product & price definitions
- `app/actions/subscriptions.ts` - Subscription server actions

**Environment Variables**:
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Product IDs (from Stripe Dashboard)
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
```

**Implementation**:

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
})

// lib/stripe/products.ts
export const STRIPE_PRODUCTS = {
  premium: {
    name: 'Premium',
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    price: 1499, // cents
    interval: 'month' as const,
    features: [
      '3 teams',
      'Unlimited game tracking',
      'AI practice plans',
      'Advanced analytics',
      'Shot charts & heat maps',
    ],
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 2999, // cents
    interval: 'month' as const,
    features: [
      'Unlimited teams',
      'Everything in Premium',
      'Season-long analytics',
      'Trend analysis',
      'Priority support',
    ],
  },
}

// app/actions/subscriptions.ts
'use server'

import { stripe } from '@/lib/stripe/client'
import { supabaseAdmin } from '@/lib/db/supabase-admin'

export async function createStripeCustomer(userId: string, email: string) {
  // Check if customer already exists
  const { data: existing } = await supabaseAdmin
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (existing?.stripe_customer_id) {
    return { customerId: existing.stripe_customer_id }
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId,
    },
  })

  // Save to database
  await supabaseAdmin.from('subscriptions').insert({
    user_id: userId,
    stripe_customer_id: customer.id,
    tier: 'free',
    status: 'active',
  })

  return { customerId: customer.id }
}
```

**Task**: Create Stripe customer on user signup

```typescript
// Trigger in auth signup flow
export async function handleNewUserSignup(userId: string, email: string) {
  // ... existing profile creation logic ...

  // Create Stripe customer
  await createStripeCustomer(userId, email)
}
```

---

### Phase 2: Usage Tracking & Limits

**Files to Create**:
- `lib/subscriptions/usage.ts` - Usage tracking utilities
- `lib/subscriptions/limits.ts` - Tier limit checks

**Implementation**:

```typescript
// lib/subscriptions/limits.ts
export const TIER_LIMITS = {
  free: {
    max_teams: 1,
    max_games_lifetime: 3,
    features: ['basic_drills', 'manual_practice_planning'],
  },
  premium: {
    max_teams: 3,
    max_games_lifetime: Infinity,
    features: ['ai_practice_plans', 'analytics', 'shot_charts'],
  },
  pro: {
    max_teams: Infinity,
    max_games_lifetime: Infinity,
    features: ['season_analytics', 'trends', 'benchmarks', 'priority_support'],
  },
}

export async function checkUsageLimit(
  userId: string,
  action: 'create_game' | 'create_team' | 'generate_practice_plan'
): Promise<{ allowed: boolean; reason?: string; tier: string }> {
  // Get user's subscription
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!subscription) {
    return { allowed: false, reason: 'No subscription found', tier: 'free' }
  }

  const tier = subscription.tier
  const limits = TIER_LIMITS[tier]

  if (action === 'create_game') {
    if (tier === 'free' && subscription.games_tracked_lifetime >= limits.max_games_lifetime) {
      return {
        allowed: false,
        reason: `Free tier limited to ${limits.max_games_lifetime} games. Upgrade to track unlimited games!`,
        tier,
      }
    }
  }

  if (action === 'create_team') {
    const { count } = await supabaseAdmin
      .from('teams')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', subscription.user_id) // Assuming org ID = user ID for now

    if (count && count >= limits.max_teams) {
      return {
        allowed: false,
        reason: `${tier === 'free' ? 'Free' : 'Premium'} tier limited to ${limits.max_teams} team${limits.max_teams > 1 ? 's' : ''}. Upgrade to Pro for unlimited teams!`,
        tier,
      }
    }
  }

  return { allowed: true, tier }
}

// lib/subscriptions/usage.ts
export async function trackUsage(
  userId: string,
  eventType: 'game_tracked' | 'practice_generated' | 'ai_request',
  metadata: {
    teamId?: string
    gameId?: string
    [key: string]: any
  }
) {
  // Insert usage event
  await supabaseAdmin.from('usage_events').insert({
    user_id: userId,
    event_type: eventType,
    team_id: metadata.teamId,
    game_id: metadata.gameId,
    metadata,
  })

  // Update subscription counters
  if (eventType === 'game_tracked') {
    await supabaseAdmin.rpc('increment_games_tracked', { user_id: userId })
  }
}
```

**Database Function**:
```sql
-- Increment games tracked counter
CREATE OR REPLACE FUNCTION increment_games_tracked(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE subscriptions
  SET
    games_tracked_this_month = games_tracked_this_month + 1,
    games_tracked_lifetime = games_tracked_lifetime + 1,
    updated_at = now()
  WHERE subscriptions.user_id = increment_games_tracked.user_id;
END;
$$ LANGUAGE plpgsql;
```

---

### Phase 3: Stripe Checkout Flow

**Files to Create**:
- `app/actions/checkout.ts` - Create checkout session
- `app/demo/upgrade/page.tsx` - Upgrade page with pricing cards
- `components/subscriptions/pricing-card.tsx` - Pricing display
- `components/subscriptions/paywall-modal.tsx` - Limit reached modal

**Implementation**:

```typescript
// app/actions/checkout.ts
'use server'

import { stripe } from '@/lib/stripe/client'
import { STRIPE_PRODUCTS } from '@/lib/stripe/products'

export async function createCheckoutSession(
  userId: string,
  tier: 'premium' | 'pro'
): Promise<{ url: string }> {
  // Get Stripe customer ID
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (!subscription?.stripe_customer_id) {
    throw new Error('Stripe customer not found')
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: subscription.stripe_customer_id,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PRODUCTS[tier].priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/demo/teams?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/demo/upgrade?canceled=true`,
    metadata: {
      supabase_user_id: userId,
      tier,
    },
  })

  return { url: session.url! }
}
```

**Paywall Modal**:
```tsx
// components/subscriptions/paywall-modal.tsx
'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/app/actions/checkout'

export function PaywallModal({
  isOpen,
  onClose,
  limit
}: {
  isOpen: boolean
  onClose: () => void
  limit: string
}) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (tier: 'premium' | 'pro') => {
    setLoading(true)

    try {
      const { url } = await createCheckoutSession(userId, tier)
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Track More Games</h2>
        <p className="text-gray-600 mb-6">{limit}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Premium Card */}
          <div className="border-2 border-blue-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="text-3xl font-bold mb-4">$14.99<span className="text-base text-gray-500">/mo</span></p>

            <ul className="space-y-2 mb-6">
              <li>✅ Unlimited game tracking</li>
              <li>✅ AI practice plans</li>
              <li>✅ Advanced analytics</li>
              <li>✅ 3 teams</li>
            </ul>

            <button
              onClick={() => handleUpgrade('premium')}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Upgrade to Premium'}
            </button>
          </div>

          {/* Pro Card */}
          <div className="border-2 border-purple-500 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$29.99<span className="text-base text-gray-500">/mo</span></p>

            <ul className="space-y-2 mb-6">
              <li>✅ Everything in Premium</li>
              <li>✅ Unlimited teams</li>
              <li>✅ Season analytics</li>
              <li>✅ Priority support</li>
            </ul>

            <button
              onClick={() => handleUpgrade('pro')}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>

        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700">
          Maybe later
        </button>
      </div>
    </div>
  )
}
```

---

### Phase 4: Stripe Webhooks

**Files to Create**:
- `app/api/webhooks/stripe/route.ts` - Webhook endpoint

**Implementation**:

```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/client'
import { supabaseAdmin } from '@/lib/db/supabase-admin'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object)
      break

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object)
      break

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object)
      break

    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object)
      break
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.supabase_user_id
  const tier = session.metadata?.tier

  if (!userId || !tier) return

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

  // Update subscription in database
  await supabaseAdmin
    .from('subscriptions')
    .update({
      stripe_subscription_id: subscription.id,
      tier,
      status: 'active',
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  // Get user ID from customer
  const { data: sub } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!sub) return

  // Update subscription status
  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', sub.user_id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const { data: sub } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!sub) return

  // Downgrade to free tier
  await supabaseAdmin
    .from('subscriptions')
    .update({
      tier: 'free',
      status: 'canceled',
      stripe_subscription_id: null,
      current_period_start: null,
      current_period_end: null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', sub.user_id)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const { data: sub } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!sub) return

  // Mark as past_due
  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', sub.user_id)

  // TODO: Send email notification to user
}
```

**Webhook Configuration** (Stripe Dashboard):
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook secret to `.env.local`

---

### Phase 5: Customer Portal (Manage Subscription)

**Files to Create**:
- `app/demo/billing/page.tsx` - Billing management page
- `app/actions/billing-portal.ts` - Create portal session

**Implementation**:

```typescript
// app/actions/billing-portal.ts
'use server'

import { stripe } from '@/lib/stripe/client'

export async function createBillingPortalSession(userId: string): Promise<{ url: string }> {
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (!subscription?.stripe_customer_id) {
    throw new Error('No Stripe customer found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/demo/billing`,
  })

  return { url: session.url }
}
```

**Billing Page**:
```tsx
// app/demo/billing/page.tsx
export default async function BillingPage() {
  const user = await getCurrentUser()
  const subscription = await getSubscription(user.id)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Plan</h2>
        <p className="text-3xl font-bold mb-4 capitalize">{subscription.tier}</p>

        {subscription.tier !== 'free' && (
          <>
            <p className="text-gray-600 mb-4">
              Your subscription renews on {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>

            <button
              onClick={async () => {
                const { url } = await createBillingPortalSession(user.id)
                window.location.href = url
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Manage Subscription
            </button>
          </>
        )}

        {subscription.tier === 'free' && (
          <a
            href="/demo/upgrade"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Upgrade Now
          </a>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Usage This Month</h2>
        <p className="text-gray-600">
          Games tracked: {subscription.games_tracked_this_month}
        </p>
      </div>
    </div>
  )
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- Usage limit checks
- Tier feature validation
- Webhook event handling

### Integration Tests
- Checkout flow (test mode)
- Webhook processing
- Subscription state updates

### E2E Tests
1. **Free Tier Limit**:
   - Track 3 games
   - Try to track 4th → see paywall
2. **Upgrade Flow**:
   - Click upgrade
   - Complete Stripe checkout (test card)
   - Verify unlimited access
3. **Billing Portal**:
   - Access billing page
   - Open Stripe portal
   - Update payment method

---

## 📊 Success Metrics

- **Conversion Rate**: % of free users who upgrade (target: 15-20%)
- **Churn Rate**: % of paid users who cancel (target: <5% monthly)
- **ARPU**: Average revenue per user (target: $8-12)
- **Webhook Success Rate**: >99.9% of webhooks processed correctly

---

## 🚀 Rollout Plan

### Phase 1: Free Tier Only (Week 1)
- No payments, everyone on free tier
- Implement usage tracking
- Test limit enforcement

### Phase 2: Stripe Setup (Week 2)
- Create products in Stripe
- Implement checkout flow
- Test with Stripe test cards

### Phase 3: Webhooks (Week 3)
- Implement webhook handling
- Test subscription lifecycle
- Error handling & retries

### Phase 4: Beta Launch (Week 4)
- Enable paid tiers for select users
- Monitor conversion funnel
- Fix issues before full launch

### Phase 5: Public Launch (Week 5)
- Enable for all users
- Marketing push
- Monitor metrics closely

---

## 🔒 Security Considerations

- Verify webhook signatures (prevent spoofing)
- Never expose Stripe secret key to client
- Use Stripe customer portal (don't build custom billing UI)
- Validate tier access on every protected action (server-side)
- Rate limit API endpoints

---

## 📝 Documentation Needed

- User guide: "How billing works"
- FAQ: "Can I cancel anytime?", "Do you offer refunds?"
- Developer guide: Stripe integration & webhook flow

---

**Next Steps**: Choose which to implement first - Offline Support or Stripe Integration
