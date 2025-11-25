#!/bin/bash
# Script to start Docker containers

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker could not be found. Please install Docker."
    exit 1
fi

# Start Docker Compose
echo "Starting Docker Compose..."
docker-compose up --build -d

echo "Services started."
echo "Backend URL: http://localhost:8000"
echo "Database URL: postgres://postgres:postgres@localhost:5432/talait"
