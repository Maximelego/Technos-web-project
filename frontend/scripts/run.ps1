$APP_DIR = ".\app"

Set-Location -Path $APP_DIR

npm install
npm run start

Set-Location ..
