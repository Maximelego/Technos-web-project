# build.ps1

param (
    [string]$Environment = "development"
)

$PROD = "production"
$DEV = "development"
$BUNDLE = "bundle"
$DOCKER_COMPOSE_STACK_NAME = "technosweb"

function Clean-Up-Stack {
    param (
        [string]$ComposeFile
    )

    Write-Host "[STATUS] - Cleaning up stack defined in $ComposeFile"

    # Stop and remove containers, networks, and volumes associated with the specified compose file
    docker compose -f $ComposeFile down -v --remove-orphans

    # Remove dangling images not used by other containers
    docker images -f "dangling=true" -q | ForEach-Object { docker rmi $_ }

    # Remove anonymous or dangling volumes specific to this stack
    docker volume prune -f

    # Remove older containers and images related to the stack
    docker ps -a -q --filter "name=$DOCKER_COMPOSE_STACK_NAME" | ForEach-Object { docker rm -f $_ }
    docker images -q --filter "reference=$DOCKER_COMPOSE_STACK_NAME*" | ForEach-Object { docker rmi -f $_ }

    Write-Host "[STATUS] - Stack cleaned up successfully."
}

function Run-Dev {
    Write-Host "[STATUS] - Running Development environment."

    # Clean up the development stack
    Clean-Up-Stack ".\docker-compose_backdev.yml"

    # Build and start the containers with no cache
    docker compose -f ".\docker-compose_backdev.yml" build --no-cache
    docker compose -f ".\docker-compose_backdev.yml" up -d --remove-orphans --force-recreate

    # Run the application script
    .\scripts\run.ps1
}

function Run-Bundle {
    Write-Host "[STATUS] - Running Bundled environment."

    # Clean up the bundled stack
    Clean-Up-Stack ".\docker-compose.yml"

    # Build and start the containers with no cache
    docker compose -f ".\docker-compose.yml" build --no-cache --build-arg CACHEBUST=$(Get-Date -UFormat %s)
    docker compose -f ".\docker-compose.yml" up -d --remove-orphans --force-recreate
}

function Run-Prod {
    Write-Host "[STATUS] - Running Production environment."
    docker compose -f ".\docker-compose.yml" up -d --remove-orphans
}

# Initialize project files
.\scripts\init.ps1

# Run the specified environment setup
switch ($Environment) {
    $DEV { Run-Dev }
    $BUNDLE { Run-Bundle }
    $PROD { Run-Prod }
    default { Run-Dev }
}
