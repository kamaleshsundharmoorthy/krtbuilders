@echo off
title Redstone Homes - website (close this window to stop)
cd /d "%~dp0"
echo.
echo  Website: http://localhost:3100
echo  Admin:   http://localhost:3100/admin
echo.
start "" cmd /c "timeout /t 8 >nul & start http://localhost:3100/admin"
call npm run dev -- -p 3100
