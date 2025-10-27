-- Fix Audit Trigger for DELETE Operations
-- The issue: When deleting events, the trigger tries to insert a foreign key to a deleted event
-- Solution: Set event_id to NULL for DELETE operations in the audit log

CREATE OR REPLACE FUNCTION log_event_edit()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO event_edit_history (event_id, edited_by, previous_data, changes, action)
    VALUES (
      OLD.id,
      auth.uid(),
      row_to_json(OLD)::jsonb,
      jsonb_build_object(
        'old', row_to_json(OLD)::jsonb,
        'new', row_to_json(NEW)::jsonb
      ),
      'update'
    );
  ELSIF TG_OP = 'DELETE' THEN
    -- Set event_id to NULL for deletes since the event no longer exists
    INSERT INTO event_edit_history (event_id, edited_by, previous_data, changes, action)
    VALUES (
      NULL,  -- Event is being deleted, so we can't reference it
      auth.uid(),
      row_to_json(OLD)::jsonb,
      jsonb_build_object('deleted', row_to_json(OLD)::jsonb),
      'delete'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;