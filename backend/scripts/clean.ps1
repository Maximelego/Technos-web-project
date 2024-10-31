Write-Host "[STATUS] - Removing environment files..."

# Remove directories and files
Remove-Item -Recurse -Force .\app\node_modules
Remove-Item -Force .\.env
Remove-Item -Force .\init_db.sql

Write-Host "[STATUS] - Done cleaning!"
