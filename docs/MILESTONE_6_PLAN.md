# Milestone 6: User Settings & Team Switching - Implementation Plan

**Created**: 2025-11-03
**Status**: Planning
**Goal**: Enable user profile management, team settings, and role-based permissions

---

## 📋 Overview

Complete the final milestone of Phase 7 by adding user settings, team management features, and role-based access controls.

**Existing Foundation** (Already Built):
- ✅ `team_members` table with roles: `head_coach`, `assistant_coach`, `manager`, `stat_tracker`
- ✅ `user_profiles` table with: `email`, `full_name`, `avatar_url`
- ✅ Team context and team switching (Milestone 4)
- ✅ RLS enabled on all tables

**What We're Building**:
1. User settings page (edit profile)
2. Team settings page (edit team details, manage members)
3. Role-based permissions (RLS policies)
4. Team member invitation system
5. Comprehensive testing (~40 tests)

---

## 🎯 Implementation Tasks

### Task 1: User Settings Page (Priority 1)

**Goal**: Allow users to view and edit their profile

**Schema** (Already Exists):
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Files to Create**:
- `lib/validation/user-schemas.ts` - Zod schema for profile updates
- `app/actions/users.ts` - Server actions: `updateUserProfile()`, `getUserProfile()`
- `app/demo/settings/page.tsx` - User settings page
- `components/settings/profile-form.tsx` - Profile edit form component
- `tests/integration/user-settings.test.ts` - 10 tests

**Features**:
- Display current user email (read-only, from auth.users)
- Edit full name
- Edit avatar URL (or future: upload avatar)
- Form validation with Zod
- Success/error notifications

**Test Coverage**:
- ✅ Load current user profile
- ✅ Update full name
- ✅ Update avatar URL
- ✅ Validate required fields
- ✅ Handle update errors
- ✅ RLS: Users can only update their own profile

---

### Task 2: Team Settings Page - Basic Info (Priority 2)

**Goal**: Allow head coaches to edit team details

**Schema** (Already Exists):
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age_years INTEGER NOT NULL CHECK (age_years BETWEEN 6 AND 21),
  level team_level NOT NULL, -- 'house', 'travel', 'aaa', 'aa', 'a'
  season TEXT NOT NULL,
  region TEXT DEFAULT 'usa' CHECK (region IN ('usa', 'canada')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Files to Create/Modify**:
- `app/demo/teams/[teamId]/settings/page.tsx` - Team settings page
- `components/teams/team-settings-form.tsx` - Team edit form (reuse TeamForm?)
- Update `app/actions/teams.ts` - Add `updateTeam()` server action
- `tests/integration/team-settings.test.ts` - 10 tests

**Features**:
- Edit team name
- Edit age group (USA vs Canada format)
- Edit skill level
- Edit season
- Edit region (USA/Canada)
- Only head_coach can edit
- Form validation (reuse team-schemas.ts)

**Test Coverage**:
- ✅ Head coach can update team details
- ✅ Assistant coach cannot update (RLS blocks)
- ✅ Validate team name required
- ✅ Validate age group range
- ✅ Validate season format
- ✅ Success/error handling

---

### Task 3: Team Member Management (Priority 3)

**Goal**: Allow head coaches to add/remove team members with roles

**Schema** (Already Exists):
```sql
CREATE TYPE team_role AS ENUM ('head_coach', 'assistant_coach', 'manager', 'stat_tracker');

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role team_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, user_id)
);
```

**Files to Create**:
- `app/actions/team-members.ts` - Server actions:
  - `getTeamMembers(teamId)` - Get all members for a team
  - `addTeamMember(teamId, email, role)` - Add user by email
  - `updateTeamMemberRole(memberId, role)` - Change member's role
  - `removeTeamMember(memberId)` - Remove member from team
- `components/teams/team-members-list.tsx` - Display team members with roles
- `components/teams/add-team-member-form.tsx` - Form to add members
- Add to `app/demo/teams/[teamId]/settings/page.tsx` - Team members section
- `tests/integration/team-members.test.ts` - 15 tests

**Features**:
- List all team members with their roles
- Add new member by email address
  - Look up user by email
  - If user doesn't exist, show error "User not found"
  - Assign role: head_coach, assistant_coach, manager, stat_tracker
- Change member's role (dropdown)
- Remove member from team
- Only head_coach can manage members
- Cannot remove yourself if you're the only head_coach

**Test Coverage**:
- ✅ List team members
- ✅ Add assistant coach by email
- ✅ Add manager by email
- ✅ Add stat_tracker by email
- ✅ Change member role
- ✅ Remove member
- ✅ Cannot remove last head_coach
- ✅ Only head_coach can add/remove (RLS)
- ✅ Cannot add duplicate member
- ✅ Handle non-existent user email

---

### Task 4: Role-Based Access Control (RLS Policies) (Priority 4)

**Goal**: Restrict database operations based on team_role

**Current State**: Basic RLS is enabled, but policies are permissive

**New RLS Policies Needed**:

```sql
-- Teams: Only head_coach can UPDATE/DELETE
CREATE POLICY "Head coaches can update teams" ON teams
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = teams.id
        AND team_members.user_id = auth.uid()
        AND team_members.role = 'head_coach'
    )
  );

-- Team Members: Only head_coach can manage
CREATE POLICY "Head coaches can manage team members" ON team_members
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = team_members.team_id
        AND tm.user_id = auth.uid()
        AND tm.role = 'head_coach'
    )
  );

-- Players: head_coach and assistant_coach can manage
CREATE POLICY "Coaches can manage players" ON players
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = players.team_id
        AND team_members.user_id = auth.uid()
        AND team_members.role IN ('head_coach', 'assistant_coach')
    )
  );

-- Games: All team members can create/track games
CREATE POLICY "Team members can manage games" ON games
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = games.team_id
        AND team_members.user_id = auth.uid()
    )
  );

-- Game Events: All team members can create events
CREATE POLICY "Team members can create events" ON game_events
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM games
      JOIN team_members ON team_members.team_id = games.team_id
      WHERE games.id = game_events.game_id
        AND team_members.user_id = auth.uid()
    )
  );
```

**Files to Create**:
- `supabase/migrations/YYYYMMDD_add_role_based_permissions.sql` - New RLS policies
- `tests/integration/role-based-permissions.test.ts` - 10 tests

**Test Coverage**:
- ✅ Head coach can update team
- ✅ Assistant coach cannot update team
- ✅ Head coach can add team members
- ✅ Assistant coach cannot add team members
- ✅ Both coaches can manage players
- ✅ Manager/stat_tracker cannot manage players
- ✅ All team members can track games
- ✅ Non-members cannot access team data

---

### Task 5: Navigation & UX Polish (Priority 5)

**Goal**: Add settings links and improve navigation

**Updates Needed**:
- Add "Settings" link to navigation bar
- Add "Team Settings" action card to team detail page
- Add user menu dropdown in nav (with Settings, Sign Out)
- Breadcrumbs for settings pages

**Files to Modify**:
- `app/demo/layout.tsx` - Add settings link and user menu
- `app/demo/teams/[teamId]/page.tsx` - Add "Team Settings" card
- `components/ui/user-menu.tsx` - New user dropdown menu

---

## 📊 Test Plan Summary

**Expected Test Count**: ~40 tests

| Test File | Tests | Focus |
|-----------|-------|-------|
| `user-settings.test.ts` | 10 | Profile CRUD, validation |
| `team-settings.test.ts` | 10 | Team updates, permissions |
| `team-members.test.ts` | 15 | Add/remove members, roles |
| `role-based-permissions.test.ts` | 10 | RLS policy enforcement |

**Total**: 45 tests

---

## 🚀 Implementation Order

1. **Start**: User settings page (simple, standalone)
2. **Next**: Team settings page - basic info editing
3. **Then**: Team member management (add/remove users)
4. **Then**: RLS policies for role-based permissions
5. **Finally**: Navigation polish and UX improvements

---

## 📝 Success Criteria

- [x] Users can edit their profile (name, avatar)
- [x] Head coaches can edit team details
- [x] Head coaches can add/remove team members
- [x] Role-based permissions enforced at database level
- [x] Assistant coaches have limited permissions
- [x] All team members can track games
- [x] 40+ tests passing
- [x] Mobile-responsive design
- [x] Documentation updated

---

**Next Step**: Start with Task 1 - User Settings Page
