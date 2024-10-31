# Define the app directory
$APP_DIR = "./app"

# Check if the app directory exists
if (!(Test-Path -Path $APP_DIR -PathType Container)) {
    Write-Host "[ERROR] - '$APP_DIR' directory not found."
    exit 1
}

# Move to the app directory
Set-Location -Path $APP_DIR

# Define the virtual environment path
$VENV_PATH = Join-Path -Path $APP_DIR -ChildPath "node_modules"

# Check if the virtual environment exists
if (!(Test-Path -Path $VENV_PATH -PathType Container)) {
    Write-Host "[STATUS] - Creating virtual environment in '$VENV_PATH'..."
    npm install

    # Check if the virtual environment was successfully created
    if (!(Test-Path -Path $VENV_PATH -PathType Container)) {
        Write-Host "[ERROR] - Failed to create the virtual environment."
        exit 1
    }

    Write-Host "[STATUS] - Virtual environment created."
}

# Run the FastAPI application
Write-Host "[STATUS] - Starting NestJS server..."
npm run start:dev
