#!/bin/bash

# Define the app directory
APP_DIR="./app"

# Check if the app directory exists
if [ ! -d "$APP_DIR" ]; then
    echo "[ERROR] - '$APP_DIR' directory not found."
    exit 1
fi

# Moving to the app directory.
cd $APP_DIR || exit

# Define the virtual environment path
VENV_PATH="./node_modules"

# Check if virtual environment exists
if [ ! -d "$VENV_PATH" ]; then
    echo "[STATUS] - Creating virtual environment in '$VENV_PATH'..."
    npm install
    
    # Check if the venv was successfully created
    if [ ! -d "$VENV_PATH" ]; then
        echo "[ERROR] - Failed to create the virtual environment."
        exit 1
    fi

    echo "[STATUS] - Virtual environment created."
fi

# Run the FastAPI application
echo "[STATUS] - Starting NestJS server..."
npm run start:dev
