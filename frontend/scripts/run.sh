#!/bin/bash

APP_DIR="./app"

cd "$APP_DIR" || exit 1

npm install
npm run start

cd ..