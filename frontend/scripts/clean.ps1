Write-Host "[STATUS] - Cleaning environment-related files..."

Remove-Item -Recurse -Force .\app\node_modules

Write-Host "[STATUS] - Done cleaning!"
