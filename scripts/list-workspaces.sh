#!/usr/bin/env bash

set -e

source config.sh

TOKEN=$(./login.sh)

curl -s \
-H "Authorization: Bearer $TOKEN" \
$API/workspaces \
| jq