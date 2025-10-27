-- Fix Audit Logging Trigger
-- Make edited_by nullable to support service role operations and system edits

-- Drop the NOT NULL constraint on edited_by
ALTER TABLE event_edit_history
  ALTER COLUMN edited_by DROP NOT NULL;

-- Add comment explaining the nullable column
COMMENT ON COLUMN event_edit_history.edited_by IS
  'User who made the edit. NULL for system-initiated edits or service role operations.';