#!/usr/bin/env bash

set -e

source config.sh

TOKEN=$(./login.sh)

WORKSPACE_ID=$(
curl -s \
-H "Authorization: Bearer $TOKEN" \
$API/workspaces \
| jq -r '.[0].id'
)

curl -s \
-X PATCH \
-H "Authorization: Bearer $TOKEN" \
$API/workspaces/$WORKSPACE_ID/start \
| jq