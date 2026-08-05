#!/usr/bin/env bash

set -e

source config.sh

TOKEN=$(./login.sh)

curl -s \
-X POST \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name":"Test Workspace",
  "templateId":"alpine"
}' \
$API/workspaces \
| jq