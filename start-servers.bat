@echo off
echo ========================================
echo   EAST STAR HOTEL - BACKEND SERVERS
echo ========================================
echo.
echo Starting both servers...
echo.
echo Server 1: Custom Backend (Port 3001)
echo Server 2: JSON Server (Port 3000)
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

start "East Star Hotel - Backend Server" cmd /k "npm start"
timeout /t 2 /nobreak > nul
start "East Star Hotel - JSON Server" cmd /k "npm run json-server"

echo.
echo Both servers are starting in separate windows!
echo.
echo Next step: Open index.html in your browser
echo.
pause
