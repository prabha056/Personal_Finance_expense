@echo off
echo Starting Personal Finance App Development Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo To access from other devices on your network:
echo 1. Find your IP address using: ipconfig
echo 2. Access: http://YOUR_IP_ADDRESS:5173
echo.
pause
