#!/usr/bin/env bash

set -e

source config.sh

TOKEN=$(
curl -s \
-X POST \
-H "Content-Type: application/json" \
-d "{
  \"email\":\"$EMAIL\",
  \"password\":\"$PASSWORD\"
}" \
$API/auth/login \
| jq -r '.token'
)

echo "$TOKEN"