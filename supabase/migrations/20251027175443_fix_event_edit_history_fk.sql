-- Fix Event Edit History Foreign Key
-- Change ON DELETE CASCADE to ON DELETE SET NULL
-- This preserves audit logs even after events are deleted

-- Drop the existing foreign key constraint
ALTER TABLE event_edit_history
  DROP CONSTRAINT event_edit_history_event_id_fkey;

-- Add new foreign key with ON DELETE SET NULL
ALTER TABLE event_edit_history
  ADD CONSTRAINT event_edit_history_event_id_fkey
  FOREIGN KEY (event_id)
  REFERENCES game_events(id)
  ON DELETE SET NULL;

-- Make event_id nullable since it can be set to NULL on delete
ALTER TABLE event_edit_history
  ALTER COLUMN event_id DROP NOT NULL;

-- Add comment explaining the nullable column
COMMENT ON COLUMN event_edit_history.event_id IS
  'Event that was edited. NULL if event has been deleted, preserving audit trail.';