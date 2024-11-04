$FRONTEND_APP_DIR = ".\frontend"
$ROOT_DIR = Get-Location

Set-Location -Path $FRONTEND_APP_DIR

.\build.ps1 "production"

Set-Location -Path $ROOT_DIR
