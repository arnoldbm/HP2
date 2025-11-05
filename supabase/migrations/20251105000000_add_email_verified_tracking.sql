-- Add email_verified column to user_profiles
-- This allows us to track email verification independently of Supabase's email_confirmed_at
-- (which auto-confirms when enable_confirmations = false)

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Update existing users - mark them as verified if they have email_confirmed_at set
UPDATE user_profiles
SET email_verified = true
WHERE EXISTS (
  SELECT 1 FROM auth.users
  WHERE auth.users.id = user_profiles.id
  AND auth.users.email_confirmed_at IS NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email_verified ON user_profiles(email_verified);
