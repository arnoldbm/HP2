-- Remove 'goal' from event_type enum since a goal is really just a shot with result='goal'
-- This simplifies the data model and stats calculations

-- 1. Update any existing 'goal' events to be 'shot' events with result='goal'
UPDATE game_events
SET
  event_type = 'shot',
  details = CASE
    WHEN details IS NULL THEN '{"result": "goal"}'::jsonb
    WHEN details ? 'result' THEN details
    ELSE details || '{"result": "goal"}'::jsonb
  END
WHERE event_type = 'goal';

-- 2. Drop and recreate the event_type enum without 'goal'
ALTER TABLE game_events ALTER COLUMN event_type TYPE TEXT;
DROP TYPE event_type;
CREATE TYPE event_type AS ENUM (
  'shot',
  'breakout',
  'turnover',
  'zone_entry',
  'faceoff',
  'penalty'
);
ALTER TABLE game_events ALTER COLUMN event_type TYPE event_type USING event_type::event_type;

-- 3. Update the shot quality calculator trigger to only check for 'shot' events
CREATE OR REPLACE FUNCTION calculate_shot_quality()
RETURNS TRIGGER AS $$
BEGIN
  -- Only calculate for shot events with coordinates
  IF (NEW.event_type = 'shot') AND NEW.x_coord IS NOT NULL AND NEW.y_coord IS NOT NULL THEN
    -- High danger: slot area (80-110 x, 35-65 y)
    IF NEW.x_coord >= 80 AND NEW.x_coord <= 110 AND NEW.y_coord >= 35 AND NEW.y_coord <= 65 THEN
      NEW.details = jsonb_set(COALESCE(NEW.details, '{}'::jsonb), '{shot_quality}', '"high"');
    -- Medium danger: mid-range areas
    ELSIF NEW.x_coord >= 60 AND NEW.x_coord <= 130 AND NEW.y_coord >= 20 AND NEW.y_coord <= 80 THEN
      NEW.details = jsonb_set(COALESCE(NEW.details, '{}'::jsonb), '{shot_quality}', '"medium"');
    -- Low danger: everywhere else
    ELSE
      NEW.details = jsonb_set(COALESCE(NEW.details, '{}'::jsonb), '{shot_quality}', '"low"');
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
