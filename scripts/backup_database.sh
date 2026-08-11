#!/bin/bash

set -e

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

BACKUP_DIR="$PROJECT_ROOT/backups"

DATABASE="cloud_workspace"
USER="cloud_workspace"
HOST="192.168.122.47"

FILE="$BACKUP_DIR/cloud_workspace_${TIMESTAMP}.sql"

echo "Starting backup..."

PGPASSWORD="cloud-workspace123" \
pg_dump \
-h "$HOST" \
-U "$USER" \
-d "$DATABASE" \
> "$FILE"

gzip "$FILE"

echo "Backup completed."

ls -lh "$BACKUP_DIR"