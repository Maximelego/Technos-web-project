# Variables
$FOLDER_NAME = "..\backend"
$ENVIRONMENT = $args[0]
$DEV = "development"
$PROD = "production"

function Build-Backend {
    if (!(Test-Path -Path $FOLDER_NAME)) {
        Write-Host "[ERROR] - The backend folder does not exist!"
        exit 1
    }

    # Moving to the cloned repository and executing the build script.
    Set-Location -Path $FOLDER_NAME
    .\build.ps1 "bundle"
    Set-Location ..
    Set-Location "frontend"
}

function Run-Dev {
    # Building the backend containers.
    Build-Backend

    # Launching the current application.
    .\scripts\run.ps1
}

function Run-Prod {
    # Building the backend repository.
    Build-Backend

    # Running the compose file
    docker compose -f .\docker-compose.yml up -d
}

# Cleaning eventual remainder files
.\scripts\clean.ps1

if ($ENVIRONMENT) {
    if ($ENVIRONMENT -eq $DEV) {
        Run-Dev
    } elseif ($ENVIRONMENT -eq $PROD) {
        Run-Prod
    }
} else {
    Run-Dev
}
