#!/bin/bash
# Script to start Docker containers with Frontend and Nginx

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker could not be found. Please install Docker."
    exit 1
fi

# Start Docker Compose with override
echo "Starting Docker Compose with Frontend..."
docker-compose -f docker-compose.yml -f docker-compose.frontend.override.yml up --build -d

echo "Services started."
echo "App URL: http://localhost"
echo "Backend API (via Proxy): http://localhost/api"
