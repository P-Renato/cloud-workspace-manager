CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY,

    user_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,

    status VARCHAR(20)
        NOT NULL
        DEFAULT 'stopped'
        CHECK (status IN ('stopped', 'running', 'error')),

    container_id VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workspaces_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);