#!/bin/bash

echo "Starting Personal Finance App Development Servers..."
echo

echo "Starting Backend Server..."
gnome-terminal -- bash -c "cd server && npm run dev; exec bash" &

sleep 3

echo "Starting Frontend Server..."
gnome-terminal -- bash -c "cd client && npm run dev; exec bash" &

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo
echo "To access from other devices on your network:"
echo "1. Find your IP address using: ifconfig or ip addr"
echo "2. Access: http://YOUR_IP_ADDRESS:5173"
echo
