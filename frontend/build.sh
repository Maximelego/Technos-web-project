#!/bin/bash

# Variables
FOLDER_NAME="../backend"
ENVIRONNMENT="$1"
DEV="development"
PROD="production"

function build_backend() {
  if [ ! -d "$FOLDER_NAME" ]; then
    echo "[ERROR] - The backend folder does not exist !"
    exit 1
  fi

  # Moving to the cloned repository and executing the build script.
  cd "$FOLDER_NAME" || exit 1
  chmod +x "./build.sh"
  ./build.sh "bundle"
  cd ..
  cd "frontend" || exit 1
}


function run_dev() {
  # Building the backend containers.
  build_backend

  # Launching the current application.
  chmod +x ./scripts/run.sh
  ./scripts/run.sh
}

function run_prod() {
  # Building the backend repository.
  build_backend

  # Running the compose file
  docker compose -f ./docker-compose.yml up -d
}

# Cleaning eventual remainder files
chmod +x ./scripts/clean.sh
./scripts/clean.sh

if [[ -n "$ENVIRONNMENT" ]]; then
  if [[ "$ENVIRONNMENT" == "$DEV" ]]; then
    run_dev
  elif [[ "$ENVIRONNMENT" == "$PROD" ]]; then
    run_prod
  fi
else
  run_dev
fi
