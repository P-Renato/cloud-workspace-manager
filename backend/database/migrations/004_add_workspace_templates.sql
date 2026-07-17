ALTER TABLE workspaces
ADD COLUMN template_id VARCHAR(50);

ALTER TABLE workspaces
ADD COLUMN image VARCHAR(100);

UPDATE workspaces
SET
    template_id = 'alpine',
    image = 'alpine:latest'
WHERE template_id IS NULL;

ALTER TABLE workspaces
ALTER COLUMN template_id SET NOT NULL;

ALTER TABLE workspaces
ALTER COLUMN image SET NOT NULL;