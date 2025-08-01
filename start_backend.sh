#!/bin/bash

# Start ODOREMOVER FastAPI Backend
echo "Starting ODOREMOVER FastAPI Backend..."

# Navigate to backend directory
cd backend

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Set environment variables
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
export NODE_ENV="${NODE_ENV:-development}"

# Start the FastAPI server
echo "Starting FastAPI server on port 8000..."
python main.py
