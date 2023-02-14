-- Type: DO
-- Name: change_type_in_integration
-- Description: Change type field in integration table

BEGIN;

ALTER TABLE omnivore.integrations ALTER COLUMN "type" TYPE text;

COMMIT;
