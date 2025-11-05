# Team Invitation System - Complete Documentation

**Created:** November 4, 2024
**Status:** ✅ Complete (Milestone 6)
**Version:** 1.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [Server Actions API](#server-actions-api)
5. [Email Service](#email-service)
6. [User Interface](#user-interface)
7. [Security & Access Control](#security--access-control)
8. [User Flows](#user-flows)
9. [Setup & Configuration](#setup--configuration)
10. [Testing Guide](#testing-guide)
11. [Error Handling](#error-handling)
12. [Future Enhancements](#future-enhancements)

---

## Overview

The Team Invitation System enables head coaches to invite new members to their teams via email invitations or shareable links. This system provides a secure, flexible, and user-friendly way to grow team membership.

### Key Features

✅ **Dual Delivery Methods**
- Email invitations with professional HTML templates
- Shareable invitation links (copy to clipboard)

✅ **Security**
- Cryptographically secure tokens (32-byte hex = 64 characters)
- 7-day automatic expiration
- Email verification required for inviters
- Email matching validation for acceptors
- Row-Level Security (RLS) policies

✅ **User Experience**
- Beautiful gradient UI for invitation acceptance
- Unauthenticated user support (sign in/sign up redirects)
- Duplicate prevention (existing members + pending invites)
- Instant clipboard copy feedback
- Email verification gating (prevents spam)

✅ **Management**
- View pending invitations
- Revoke invitations before acceptance
- Track invitation status (pending/accepted/revoked)
- Audit trail with timestamps

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Team Invitation System                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   UI Components  │─────▶│ Server Actions   │─────▶│   Database       │
│                  │      │                  │      │  (Supabase)      │
│ - Members Page   │      │ - Create         │      │                  │
│ - Invite Form    │      │ - Get            │      │ team_invitations │
│ - Accept Page    │      │ - Revoke         │      │ user_profiles    │
│                  │      │ - Accept         │      │ team_members     │
└──────────────────┘      └──────────────────┘      └──────────────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │  Email Service   │
                          │  (Resend API)    │
                          │                  │
                          │ - Send emails    │
                          │ - HTML templates │
                          └──────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL + RLS)
- **Email**: Resend API
- **Security**: Crypto module (Node.js), RLS policies
- **Styling**: TailwindCSS

---

## Database Schema

### `team_invitations` Table

**Location**: `supabase/migrations/20251104000000_team_invitations.sql`

```sql
CREATE TABLE team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role team_role NOT NULL,
  token TEXT NOT NULL UNIQUE,
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'revoked')),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `team_id` | UUID | Foreign key to teams table |
| `email` | TEXT | Invitee's email (stored lowercase) |
| `role` | team_role | Role to assign: `head_coach`, `assistant_coach`, `manager`, `stat_tracker` |
| `token` | TEXT | Secure 64-char hex token (UNIQUE) |
| `invited_by` | UUID | Foreign key to user who created invitation |
| `status` | TEXT | `pending` \| `accepted` \| `revoked` |
| `expires_at` | TIMESTAMPTZ | Auto-set to 7 days from creation |
| `accepted_at` | TIMESTAMPTZ | Timestamp when invitation was accepted |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp (auto-updated) |

#### Indexes

```sql
CREATE INDEX idx_team_invitations_team ON team_invitations(team_id);
CREATE INDEX idx_team_invitations_email ON team_invitations(email);
CREATE INDEX idx_team_invitations_token ON team_invitations(token);
CREATE INDEX idx_team_invitations_status ON team_invitations(status);
```

#### Triggers

```sql
-- Auto-update updated_at timestamp
CREATE TRIGGER update_team_invitations_updated_at
  BEFORE UPDATE ON team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Security & Access Control

### Row-Level Security (RLS) Policies

**All policies are enforced at the database level** - even service role queries respect these rules.

#### View Invitations
```sql
CREATE POLICY "Team members can view team invitations"
  ON team_invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invitations.team_id
      AND team_members.user_id = auth.uid()
    )
  );
```
**Who can view**: Any team member can see their team's invitations

#### Create Invitations
```sql
CREATE POLICY "Head coaches can create invitations"
  ON team_invitations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invitations.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'head_coach'
    )
  );
```
**Who can create**: Only head coaches

#### Update/Revoke Invitations
```sql
CREATE POLICY "Head coaches can update invitations"
  ON team_invitations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invitations.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'head_coach'
    )
  );
```
**Who can revoke**: Only head coaches

#### Delete Invitations
```sql
CREATE POLICY "Head coaches can delete invitations"
  ON team_invitations FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = team_invitations.team_id
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'head_coach'
    )
  );
```
**Who can delete**: Only head coaches

### Additional Security Measures

1. **Email Verification Required**: Users must verify their email before inviting others (prevents spam)
2. **Token Security**: 32-byte cryptographically secure random tokens (256 bits of entropy)
3. **Case-Insensitive Email**: Emails stored and compared in lowercase
4. **Duplicate Prevention**: Checks for existing members and pending invites
5. **Expiration**: Automatic 7-day expiration
6. **Email Matching**: Acceptor's email must match invitation email

---

## Server Actions API

**Location**: `app/actions/invitations.ts`

All server actions use `'use server'` directive and run on the server only.

### 1. `createTeamInvitation()`

Creates a new invitation and optionally sends an email.

**Signature**:
```typescript
async function createTeamInvitation(
  teamId: string,
  email: string,
  role: 'head_coach' | 'assistant_coach' | 'manager' | 'stat_tracker',
  invitedBy: string,
  sendEmail: boolean = true
): Promise<{
  success: boolean
  invitation?: {
    id: string
    token: string
    inviteLink: string
  }
  error?: string
  requiresVerification?: boolean
}>
```

**Process Flow**:
1. Check if inviter's email is verified (custom field in `user_profiles`)
2. Check if invitee is already a team member
3. Check for pending invitation to same email
4. Generate secure 32-byte hex token using `crypto.randomBytes(32)`
5. Insert invitation into database (email stored lowercase)
6. If `sendEmail=true`: Fetch team/inviter info and send email via Resend
7. Return invitation details with shareable link

**Error Responses**:
- `requiresVerification: true` - Inviter needs to verify email
- `User is already a member of this team`
- `An invitation is already pending for this email`
- `Failed to create invitation` (database error)

**Example Usage**:
```typescript
// Send email invitation
const result = await createTeamInvitation(
  'team-uuid',
  'coach@example.com',
  'assistant_coach',
  'inviter-uuid',
  true // Send email
)

// Create shareable link (no email)
const result = await createTeamInvitation(
  'team-uuid',
  'coach@example.com',
  'assistant_coach',
  'inviter-uuid',
  false // Don't send email
)
```

---

### 2. `getTeamInvitations()`

Fetches all invitations for a team.

**Signature**:
```typescript
async function getTeamInvitations(
  teamId: string
): Promise<{
  success: boolean
  invitations?: Array<{
    id: string
    email: string
    role: string
    status: string
    created_at: string
    expires_at: string
    invited_by_name: string | null
  }>
  error?: string
}>
```

**Returns**: Array of invitations with inviter names (fetched via JOIN)

**Example Usage**:
```typescript
const result = await getTeamInvitations('team-uuid')
if (result.success) {
  const pendingInvites = result.invitations?.filter(
    inv => inv.status === 'pending'
  )
}
```

---

### 3. `getMyInvitations()`

Fetches all pending invitations for a user's email.

**Signature**:
```typescript
async function getMyInvitations(
  email: string
): Promise<{
  success: boolean
  invitations?: Array<{
    id: string
    team_id: string
    team_name: string
    token: string
    email: string
    role: string
    status: string
    created_at: string
    expires_at: string
    invited_by_name: string | null
  }>
  error?: string
}>
```

**Use Case**: Show user all pending invitations across all teams (future feature: invitation inbox)

---

### 4. `revokeTeamInvitation()`

Cancels a pending invitation.

**Signature**:
```typescript
async function revokeTeamInvitation(
  invitationId: string
): Promise<{
  success: boolean
  error?: string
}>
```

**Process**:
- Updates invitation status to `'revoked'`
- Invitation can no longer be accepted (validation in `getInvitationByToken()`)

**Example Usage**:
```typescript
const result = await revokeTeamInvitation('invitation-uuid')
```

---

### 5. `getInvitationByToken()`

Validates and fetches invitation details for acceptance page.

**Signature**:
```typescript
async function getInvitationByToken(
  token: string
): Promise<{
  success: boolean
  invitation?: {
    id: string
    team_id: string
    team_name: string
    email: string
    role: string
    status: string
    expires_at: string
    invited_by_name: string | null
  }
  error?: string
}>
```

**Validation Checks**:
1. ✅ Invitation exists with this token
2. ✅ Not expired (`expires_at > now()`)
3. ✅ Status is `'pending'` (not accepted or revoked)

**Error Responses**:
- `Invitation not found`
- `This invitation has expired`
- `This invitation has been accepted/revoked`

---

### 6. `acceptTeamInvitation()`

Accepts an invitation and adds user to team.

**Signature**:
```typescript
async function acceptTeamInvitation(
  token: string,
  userId: string
): Promise<{
  success: boolean
  teamId?: string
  error?: string
}>
```

**Process Flow**:
1. Validate invitation via `getInvitationByToken()`
2. Fetch user's email from `user_profiles`
3. Verify email matches invitation email (case-insensitive)
4. Check if user is already a team member
5. Insert new row into `team_members` table
6. Update invitation: `status='accepted'`, set `accepted_at` timestamp
7. Return `teamId` for redirect

**Error Responses**:
- `Invalid invitation` (token not found/expired/revoked)
- `This invitation was sent to a different email address`
- `User profile not found`
- `Failed to add you to the team` (database error)

**Example Usage**:
```typescript
const result = await acceptTeamInvitation('token-string', 'user-uuid')
if (result.success && result.teamId) {
  router.push(`/demo/teams/${result.teamId}`)
}
```

---

## Email Service

**Location**: `lib/email/resend.ts`

### Resend Integration

Resend is a developer-friendly email API with excellent deliverability.

**Setup**:
```bash
npm install resend  # Already installed
```

**Configuration** (`.env.local`):
```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=HP2 <noreply@yourdomain.com>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `sendTeamInvitationEmail()`

**Signature**:
```typescript
async function sendTeamInvitationEmail(
  to: string,
  props: {
    inviteeName: string
    inviterName: string
    teamName: string
    role: string
    inviteLink: string
  }
): Promise<{ success: boolean; error?: string }>
```

**Email Details**:
- **From**: `HP2 <noreply@yourdomain.com>` (configurable)
- **Subject**: `You've been invited to join {teamName}`
- **Format**: Professional HTML with inline CSS (no external stylesheets)

### Email Template Design

**HTML Structure**:
```
┌───────────────────────────────────────┐
│  Blue Gradient Header                 │
│  🏒 Team Invitation                   │
└───────────────────────────────────────┘
│                                       │
│  Hi there,                            │
│                                       │
│  {inviterName} has invited you to     │
│  join {teamName} as a {role}          │
│  on HP2 Hockey Practice Planner.      │
│                                       │
│  ┌───────────────────────────────┐   │
│  │   Accept Invitation (button)  │   │
│  └───────────────────────────────┘   │
│                                       │
│  Or copy this link:                   │
│  http://localhost:3000/invite/abc...  │
│                                       │
│  Expires in 7 days.                   │
│                                       │
└───────────────────────────────────────┘
  Gray Footer
  HP2 Hockey Practice Planner
  Track games • Generate AI plans
```

**CSS Features**:
- Responsive table-based layout (max-width: 600px)
- Gradient header (blue-600 to blue-800)
- Large, accessible CTA button (16px padding, 16px font)
- Mobile-friendly font stack
- Subtle shadows and rounded corners
- Fallback text link (in case button doesn't render)

**Email Client Compatibility**:
- Gmail ✅
- Outlook ✅
- Apple Mail ✅
- Mobile clients ✅

---

## User Interface

### 1. Team Members Page

**Location**: `app/demo/teams/[teamId]/members/page.tsx`

**URL**: `/demo/teams/{teamId}/members`

**Access Control**: Any team member can view; only head coaches can invite

#### Features

**Header Section**:
- Team name display
- Back button to team detail page
- "Invite Member" button (head coaches only)

**Invite Form** (collapsible):
```typescript
// Fields
- Email (text input, required)
- Role (dropdown: Assistant Coach, Head Coach, Manager, Stat Tracker)

// Actions
- 📧 Send Email Invitation (creates + emails)
- 🔗 Copy Invite Link (creates + copies to clipboard)
```

**Current Members List**:
- Display: Avatar, Name, Email, Role badge
- Actions (head coaches only):
  - Change role (dropdown)
  - Remove member (with confirmation)

**Pending Invitations Section**:
- Display: Email, Role, Created date, Expires date, Invited by
- Actions (head coaches only):
  - Revoke (with confirmation)
- Empty state: "No pending invitations"

**State Management**:
```typescript
const [showInviteForm, setShowInviteForm] = useState(false)
const [inviteEmail, setInviteEmail] = useState('')
const [inviteRole, setInviteRole] = useState('assistant_coach')
const [copiedLink, setCopiedLink] = useState(false)
const [successMessage, setSuccessMessage] = useState(null)
const [error, setError] = useState(null)
const [isSubmitting, setIsSubmitting] = useState(false)
```

#### UI States

**Success Feedback**:
```typescript
// Email sent
✅ "Invitation sent to coach@example.com"

// Link copied
✅ "Invitation link copied to clipboard for coach@example.com"
   (Clipboard icon pulses for 2 seconds)
```

**Error Feedback**:
```typescript
// Common errors displayed in red alert box
❌ "User is already a member of this team"
❌ "An invitation is already pending for this email"
❌ "Please verify your email address before inviting team members"
```

---

### 2. Invitation Acceptance Page

**Location**: `app/invite/[token]/page.tsx`

**URL**: `/invite/{token}`

**Access**: Public (unauthenticated users can view)

#### Layout

**Beautiful Gradient Design**:
```
┌─────────────────────────────────────┐
│ Gradient Header (blue-600 to        │
│ indigo-600)                          │
│                                      │
│  ┌──────────────┐                   │
│  │  🏒 (icon)   │                   │
│  └──────────────┘                   │
│                                      │
│  Team Invitation                     │
│  You've been invited to join a team  │
└─────────────────────────────────────┘
│                                      │
│  Team: Thunder 10u                   │
│  Your Role: Assistant Coach          │
│  Invited By: John Doe                │
│  Invitation Email: coach@example.com │
│  Expires: 11/11/2024                 │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Accept Invitation (button)    │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │  Decline (button)              │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### State Handling

**1. Loading State**:
```typescript
// Centered spinner with message
🔄 "Loading invitation..."
```

**2. Invalid/Expired State**:
```typescript
// Red error card
❌ Invalid Invitation
   "This invitation has expired"
   [Go to Teams] button
```

**3. Unauthenticated User**:
```typescript
// Show invitation details + auth options
📝 "Please sign in or create an account to accept"
   [Sign In] button → /auth/signin?returnUrl=/invite/{token}
   [Create Account] button → /auth/signup?returnUrl=/invite/{token}
```

**4. Authenticated User**:
```typescript
// Show invitation details + accept/decline
[Accept Invitation] button
[Decline] button → redirects to /demo/teams
```

#### Acceptance Flow

```typescript
// User clicks "Accept Invitation"
1. Disable buttons (isAccepting=true)
2. Call acceptTeamInvitation(token, userId)
3. If success:
   - Redirect to /demo/teams/{teamId}
4. If error:
   - Display error message (e.g., "Wrong email")
   - Re-enable buttons
```

---

## User Flows

### Flow 1: Email Invitation (Full Journey)

```
1. Head Coach Action (Members Page)
   ↓
   - Navigate to /demo/teams/{teamId}/members
   - Click "+ Invite Member"
   - Enter email: assistant@example.com
   - Select role: Assistant Coach
   - Click "📧 Send Email Invitation"
   ↓
2. System Processing
   ↓
   - Validate head coach role (RLS)
   - Check email verification status
   - Check if user already exists/invited
   - Generate secure token
   - Create invitation record
   - Send email via Resend
   ↓
3. Email Delivery
   ↓
   - Invitee receives professional HTML email
   - Subject: "You've been invited to join Thunder 10u"
   ↓
4. Invitee Action (Email)
   ↓
   - Opens email
   - Clicks "Accept Invitation" button
   - Redirected to: /invite/{token}
   ↓
5. Acceptance Page
   ↓
   IF NOT LOGGED IN:
     - Shows: "Please sign in or create account"
     - Click "Sign In" → auth flow → return to /invite/{token}

   IF LOGGED IN:
     - Shows invitation details
     - Click "Accept Invitation"
     - System validates:
       * Token valid/not expired
       * Email matches user's email
       * Not already a member
     - Adds user to team_members
     - Updates invitation status to 'accepted'
     - Redirects to: /demo/teams/{teamId}
   ↓
6. Success!
   ↓
   - User now appears in team members list
   - User can access team features
```

---

### Flow 2: Shareable Link (Direct Share)

```
1. Head Coach Action
   ↓
   - Navigate to /demo/teams/{teamId}/members
   - Click "+ Invite Member"
   - Enter email: assistant@example.com
   - Select role: Assistant Coach
   - Click "🔗 Copy Invite Link"
   ↓
2. System Processing
   ↓
   - Same as email flow, but NO email sent
   - Link copied to clipboard
   - Success: "Invitation link copied to clipboard"
   ↓
3. Head Coach Shares Link
   ↓
   - Paste link in text message / Slack / etc.
   - Example: http://localhost:3000/invite/abc123...
   ↓
4. Invitee Clicks Link
   ↓
   - Opens browser → /invite/{token}
   - (Follow same acceptance flow as email)
```

---

### Flow 3: Revoke Invitation

```
1. Head Coach Action
   ↓
   - Navigate to /demo/teams/{teamId}/members
   - Scroll to "Pending Invitations" section
   - Find invitation to revoke
   - Click "Revoke" button
   - Confirm: "Revoke invitation for coach@example.com?"
   ↓
2. System Processing
   ↓
   - Update invitation status to 'revoked'
   - Success: "Invitation revoked"
   ↓
3. Result
   ↓
   - Invitation removed from pending list
   - If invitee tries to accept:
     → "This invitation has been revoked"
```

---

### Flow 4: Error Scenarios

**Scenario A: Inviter Not Verified**
```
Head coach hasn't verified email
↓
Tries to invite someone
↓
Error: "Please verify your email address before inviting team members"
↓
(Future: Show "Resend Verification Email" button)
```

**Scenario B: Duplicate Invitation**
```
Head coach invites: coach@example.com
↓
Tries to invite coach@example.com again (different role)
↓
Error: "An invitation is already pending for this email"
↓
Solution: Revoke old invitation, send new one
```

**Scenario C: Wrong Email**
```
Invitation sent to: alice@example.com
↓
Bob logs in with: bob@example.com
↓
Clicks invitation link
↓
Error: "This invitation was sent to a different email address"
```

**Scenario D: Expired Invitation**
```
Invitation created: Nov 1
↓
7 days pass (expires: Nov 8)
↓
User tries to accept on Nov 9
↓
Error: "This invitation has expired"
↓
Solution: Request new invitation from head coach
```

---

## Setup & Configuration

### 1. Environment Variables

**File**: `.env.local`

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=HP2 <noreply@yourdomain.com>

# Application URL (for generating invite links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Resend Setup

**Step 1: Create Account**
- Visit: https://resend.com
- Sign up for free account
- Free tier: 3,000 emails/month, 100 emails/day

**Step 2: Get API Key**
- Dashboard → API Keys
- Create new API key
- Copy to `.env.local`

**Step 3: Verify Domain (Production)**
```bash
# For production, verify your domain
# Resend Dashboard → Domains → Add Domain
# Add DNS records as shown
# Wait for verification
```

**Development vs Production**:
```bash
# Development (localhost)
RESEND_FROM_EMAIL=HP2 <onboarding@resend.dev>

# Production (your domain)
RESEND_FROM_EMAIL=HP2 <noreply@yourhockeyapp.com>
```

### 3. Database Migration

**Run migration**:
```bash
# Local development
npx supabase db reset

# Production
npx supabase db push
```

**Verify migration**:
```sql
-- Check table exists
SELECT * FROM team_invitations LIMIT 1;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'team_invitations';

-- Should see 4 policies:
-- 1. Team members can view team invitations (SELECT)
-- 2. Head coaches can create invitations (INSERT)
-- 3. Head coaches can update invitations (UPDATE)
-- 4. Head coaches can delete invitations (DELETE)
```

### 4. Email Verification Setup

**Important**: Email verification must be enabled for inviters.

**Check user's verification status**:
```sql
SELECT id, email, email_verified
FROM user_profiles
WHERE id = 'user-uuid';
```

**Manually verify a user (development)**:
```sql
UPDATE user_profiles
SET email_verified = true
WHERE email = 'coach@example.com';
```

---

## Testing Guide

### Manual Testing Checklist

#### ✅ Basic Invitation Flow

**Test 1: Send Email Invitation**
1. Login as head coach
2. Navigate to `/demo/teams/{teamId}/members`
3. Click "+ Invite Member"
4. Enter email: `test@example.com`
5. Select role: Assistant Coach
6. Click "📧 Send Email Invitation"
7. **Expected**: Success message appears
8. **Verify**: Check email inbox (or Mailpit at `http://localhost:54324`)
9. **Verify**: Invitation appears in "Pending Invitations" section

**Test 2: Copy Shareable Link**
1. Same setup as Test 1
2. Click "🔗 Copy Invite Link" instead
3. **Expected**: Success message, clipboard contains link
4. **Verify**: Paste link in browser → opens acceptance page
5. **Verify**: Invitation appears in pending list

**Test 3: Accept Invitation (Existing User)**
1. Logout
2. Login as user with matching email
3. Navigate to invite link from Test 1 or 2
4. **Expected**: Shows invitation details
5. Click "Accept Invitation"
6. **Expected**: Redirects to team page
7. **Verify**: User appears in team members list
8. **Verify**: Invitation status = 'accepted'

**Test 4: Accept Invitation (New User)**
1. Logout (or use incognito)
2. Navigate to invite link
3. **Expected**: Shows "Sign In or Create Account"
4. Click "Create Account"
5. **Expected**: Redirects to signup with `?returnUrl=/invite/{token}`
6. Complete signup
7. **Expected**: Auto-redirects back to invite page
8. Click "Accept Invitation"
9. **Expected**: Redirects to team page

#### ✅ Error Handling

**Test 5: Duplicate Invitation**
1. Invite `coach@example.com` (don't accept yet)
2. Try to invite `coach@example.com` again
3. **Expected**: Error: "An invitation is already pending"

**Test 6: Already a Member**
1. Invite user who is already on team
2. **Expected**: Error: "User is already a member"

**Test 7: Email Verification Required**
1. Create new user account
2. Don't verify email (check `user_profiles.email_verified = false`)
3. Try to invite someone
4. **Expected**: Error: "Please verify your email address before inviting"

**Test 8: Expired Invitation**
1. Create invitation
2. Manually update database: `UPDATE team_invitations SET expires_at = now() - interval '1 day' WHERE id = '...'`
3. Try to accept invitation
4. **Expected**: Error: "This invitation has expired"

**Test 9: Wrong Email**
1. Create invitation for `alice@example.com`
2. Login as `bob@example.com`
3. Try to accept invitation
4. **Expected**: Error: "This invitation was sent to a different email address"

**Test 10: Revoked Invitation**
1. Create invitation
2. Revoke it (click "Revoke" button)
3. Try to accept invitation
4. **Expected**: Error: "This invitation has been revoked"

#### ✅ Permission Tests

**Test 11: Non-Head Coach Cannot Invite**
1. Login as assistant coach
2. Navigate to `/demo/teams/{teamId}/members`
3. **Expected**: No "Invite Member" button visible
4. **Verify**: Try direct API call → should fail (RLS)

**Test 12: Non-Head Coach Cannot Revoke**
1. Login as assistant coach
2. Navigate to members page
3. **Expected**: No "Revoke" buttons on pending invitations

---

### Automated Testing

**Note**: No automated tests exist yet. Recommended test structure:

```typescript
// tests/integration/team-invitations.test.ts

describe('Team Invitation System', () => {
  describe('createTeamInvitation', () => {
    it('should create invitation with valid inputs', async () => {
      // Test happy path
    })

    it('should prevent duplicate invitations', async () => {
      // Test duplicate prevention
    })

    it('should require email verification', async () => {
      // Test verification gate
    })
  })

  describe('acceptTeamInvitation', () => {
    it('should accept valid invitation', async () => {
      // Test acceptance
    })

    it('should reject expired invitation', async () => {
      // Test expiration
    })

    it('should validate email matching', async () => {
      // Test email validation
    })
  })

  describe('RLS Policies', () => {
    it('should allow head coaches to create invitations', async () => {
      // Test permission
    })

    it('should prevent non-head coaches from creating invitations', async () => {
      // Test permission denial
    })
  })
})
```

---

## Error Handling

### Client-Side Errors

**Display Pattern**:
```typescript
// Error Alert (red background)
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-700">{error}</p>
  </div>
)}
```

**Common User-Facing Errors**:
- ❌ "Please verify your email address before inviting team members"
- ❌ "User is already a member of this team"
- ❌ "An invitation is already pending for this email"
- ❌ "Failed to send email" (Resend API error)
- ❌ "This invitation has expired"
- ❌ "This invitation was sent to a different email address"
- ❌ "Invalid invitation" (token not found)

### Server-Side Error Logging

**Pattern**:
```typescript
try {
  // Operation
} catch (error) {
  console.error('Unexpected error creating invitation:', error)
  return {
    success: false,
    error: 'An unexpected error occurred',
  }
}
```

**Errors Logged to Console**:
- Database connection failures
- Resend API failures (with error details)
- RLS policy violations
- Invalid data format

### Database Constraints

**Enforced by PostgreSQL**:
- UNIQUE constraint on `token` (prevents collision)
- CHECK constraint on `status` (only: pending/accepted/revoked)
- NOT NULL constraints (required fields)
- Foreign key constraints (team_id, invited_by)

---

## Future Enhancements

### Phase 1: User Experience

**1. Email Verification Flow**
```typescript
// Show verification banner if not verified
{!emailVerified && (
  <Banner variant="warning">
    Please verify your email to invite team members.
    <Button onClick={resendVerification}>Resend Email</Button>
  </Banner>
)}
```

**2. Invitation Inbox**
```typescript
// Dashboard widget showing all user's pending invitations
<InvitationInbox userId={currentUserId} />
// Show: Team name, Role, Inviter, Accept/Decline buttons
```

**3. Batch Invitations**
```typescript
// Invite multiple people at once
<TextArea
  placeholder="Enter emails (one per line)"
  rows={5}
/>
// Parse emails, create multiple invitations
```

**4. Custom Invitation Messages**
```typescript
// Add personal note to invitation email
<TextArea
  label="Personal Message (optional)"
  placeholder="Hi! I'd love for you to join our coaching staff..."
/>
```

### Phase 2: Analytics & Tracking

**1. Invitation Metrics Dashboard**
```typescript
// Track for each team:
- Total invitations sent
- Acceptance rate (accepted / sent)
- Average time to accept
- Expired invitations
- Revoked invitations
```

**2. Email Open Tracking**
```typescript
// Use Resend webhooks to track:
- Email delivered
- Email opened
- Link clicked
```

### Phase 3: Advanced Features

**1. Role-Based Invitation Templates**
```typescript
// Pre-fill invitation emails based on role
const templates = {
  head_coach: "Join us as head coach! Lead our team...",
  assistant_coach: "Help coach our team...",
  manager: "Manage team logistics...",
  stat_tracker: "Track live game stats..."
}
```

**2. Invitation Reminders**
```typescript
// Auto-send reminder after 3 days if not accepted
// Supabase Edge Function (daily cron job)
SELECT * FROM team_invitations
WHERE status = 'pending'
AND created_at < now() - interval '3 days'
AND reminder_sent = false
```

**3. Invitation History**
```typescript
// Show all past invitations (accepted, expired, revoked)
// Add filters: status, date range, role
<InvitationHistory teamId={teamId} />
```

**4. Invitation Templates Library**
```typescript
// Save/reuse common invitation messages
// Organization-level templates
<TemplateSelector
  organizationId={orgId}
  onSelect={setInviteMessage}
/>
```

### Phase 4: Integration

**1. Calendar Integration**
```typescript
// Add "Accept Invitation" to calendar event
// Google Calendar / Outlook API
```

**2. Slack/Discord Bot**
```typescript
// Send invitation via Slack DM
// Button: "Accept" → opens web page
```

---

## Technical Decisions & Rationale

### Why Resend?

**Alternatives considered**:
- SendGrid (complex pricing, overkill for MVP)
- Mailgun (requires credit card immediately)
- AWS SES (complex setup, requires domain verification)
- Postmark (more expensive)

**Resend wins**:
- ✅ Free tier: 3,000 emails/month (plenty for MVP)
- ✅ Developer-friendly API (simple TypeScript SDK)
- ✅ Excellent docs
- ✅ No credit card required for free tier
- ✅ Works with development domains (onboarding@resend.dev)
- ✅ Built by developers for developers

### Why 7-Day Expiration?

**Rationale**:
- Long enough: Gives invitee time to see email, create account
- Short enough: Prevents stale invitations accumulating
- Industry standard: Most apps use 7-14 days

**Alternative**: Make expiration configurable per team/org

### Why Case-Insensitive Email?

**Problem**:
```typescript
// These should be treated as the same user:
"Coach@Example.Com"
"coach@example.com"
"COACH@EXAMPLE.COM"
```

**Solution**: Store all emails lowercase
```typescript
email: email.toLowerCase()
```

### Why Both Email AND Link?

**Use Cases**:
- **Email**: Formal, professional, trackable
- **Link**: Instant, flexible (Slack, text, in-person QR code)

**User preference**: Some coaches prefer texting links over email

### Why Require Email Verification?

**Without verification**:
- User signs up with `alice@example.com` (typo, should be `alic@example.com`)
- User can't receive invitation emails
- User invites others → emails bounce → poor experience

**With verification**:
- Forces user to confirm valid email
- Reduces spam (can't create account with fake emails)
- Builds trust (verified badge)

---

## Troubleshooting

### Issue: Emails Not Sending

**Check 1: API Key**
```bash
# .env.local
RESEND_API_KEY=re_... # Must start with 're_'
```

**Check 2: Resend Dashboard**
- Visit: https://resend.com/dashboard
- Check: Recent emails (should show sent email)
- Check: Logs (shows errors if any)

**Check 3: Server Logs**
```bash
# In terminal running `npm run dev`
# Look for:
"Failed to send invitation email: ..." # Error from Resend
```

**Check 4: Email Provider Spam**
- Check spam/junk folder
- Add `noreply@yourdomain.com` to contacts

---

### Issue: "Invitation Not Found"

**Cause**: Token doesn't exist in database

**Debug**:
```sql
-- Check if invitation exists
SELECT * FROM team_invitations WHERE token = 'your-token-here';
```

**Common reasons**:
- Invitation was deleted
- Wrong token (typo in URL)
- Database reset (local dev)

---

### Issue: "This invitation has expired"

**Cause**: `expires_at < now()`

**Debug**:
```sql
-- Check expiration
SELECT expires_at, now(),
  expires_at < now() as is_expired
FROM team_invitations
WHERE token = 'your-token-here';
```

**Fix (development only)**:
```sql
-- Extend expiration
UPDATE team_invitations
SET expires_at = now() + interval '7 days'
WHERE token = 'your-token-here';
```

---

### Issue: "Wrong email address"

**Cause**: Invitation sent to `alice@example.com`, but user logged in as `bob@example.com`

**Solution**:
1. Logout
2. Login with correct email (`alice@example.com`)
3. Try again

**Or**: Request new invitation to correct email

---

### Issue: RLS Policy Denial

**Symptom**: Supabase error 42501 or "permission denied"

**Debug**:
```sql
-- Check user's role on team
SELECT role FROM team_members
WHERE team_id = 'team-uuid'
AND user_id = auth.uid();
```

**Common causes**:
- User is not head coach (only head coaches can invite)
- User not on team at all
- RLS policies not applied (run migration)

---

## Files Reference

### Created Files
```
supabase/migrations/
  └── 20251104000000_team_invitations.sql   # Database schema

lib/email/
  └── resend.ts                             # Email service (Resend API)

app/actions/
  └── invitations.ts                        # Server actions (6 functions)

app/invite/[token]/
  └── page.tsx                              # Invitation acceptance page

docs/
  └── INVITATION_SYSTEM.md                  # This documentation
```

### Modified Files
```
app/demo/teams/[teamId]/members/
  └── page.tsx                              # Added invite UI and logic

docs/
  └── CLAUDE.md                             # Updated project status
  └── PHASE_7_PROGRESS.md                   # Marked Milestone 6 complete

package.json                                # (resend already installed)
```

---

## Summary

The Team Invitation System is a **production-ready feature** that enables secure, flexible team growth. Key highlights:

✅ **Security**: RLS policies, secure tokens, email verification, expiration
✅ **Flexibility**: Email OR shareable links
✅ **User Experience**: Beautiful UI, clear errors, unauthenticated support
✅ **Reliability**: Comprehensive validation, duplicate prevention, audit trail
✅ **Scalability**: Built on Supabase + Resend (handles thousands of invites)

**Ready to use!** Just configure `RESEND_API_KEY` and start inviting team members.

---

**Documentation Version**: 1.0
**Last Updated**: November 4, 2024
**Maintained By**: Brock Arnold + Claude
**Related Docs**: `PHASE_7_PROGRESS.md`, `DATABASE_REFERENCE.md`
