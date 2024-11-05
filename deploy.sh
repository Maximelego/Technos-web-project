#!/bin/bash

FRONTEND_APP_DIR="./frontend"
ROOR_DIR="$PWD"

cd "$FRONTEND_APP_DIR" || exit 1

chmod +x ./build.sh
./build.sh "production"

cd "$ROOR_DIR" || exit 1
