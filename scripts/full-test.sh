#!/usr/bin/env bash

set -e

echo
echo "=============================="
echo "LOGIN"
echo "=============================="
./login.sh >/dev/null
echo "✓ Login"

echo
echo "=============================="
echo "CREATE"
echo "=============================="
./create-workspace.sh

echo
echo "=============================="
echo "LIST"
echo "=============================="
./list-workspaces.sh

echo
echo "=============================="
echo "GET"
echo "=============================="
./get-workspace.sh

echo
echo "=============================="
echo "START"
echo "=============================="
./start-workspace.sh

echo
echo "=============================="
echo "METADATA"
echo "=============================="
./metadata.sh

echo
echo "=============================="
echo "LOGS"
echo "=============================="
./logs.sh

echo
echo "=============================="
echo "STOP"
echo "=============================="
./stop-workspace.sh

echo
echo "=============================="
echo "DELETE"
echo "=============================="
./delete-workspace.sh

echo
echo "=============================="
echo "FINAL LIST"
echo "=============================="
./list-workspaces.sh

echo
echo "✓ ALL TESTS PASSED"