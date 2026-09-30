@echo off
title Redstone Homes - first-time setup
cd /d "%~dp0"
echo.
echo  === Redstone Homes website: first-time setup ===
echo.
where node >nul 2>nul || (echo  Node.js is not installed. Install the LTS version from https://nodejs.org and run this again. & pause & exit /b 1)
if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo  Created .env - check DATABASE_URI and PAYLOAD_SECRET in it, then run setup.bat again.
  notepad ".env"
  pause
  exit /b 0
)
echo  [1/2] Installing packages (takes a few minutes the first time)...
call npm install || (echo  npm install failed. & pause & exit /b 1)
echo.
echo  [2/2] Loading demo content into the database...
echo        (MongoDB must be running - see README)
call npm run seed || (echo  Seeding failed - is MongoDB running and DATABASE_URI correct? & pause & exit /b 1)
echo.
echo  Done. Double-click start.bat to run the website.
pause
