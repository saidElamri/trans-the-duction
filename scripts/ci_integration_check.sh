#!/bin/bash
# CI Integration Check

echo "Starting CI Integration Check..."

# Start Services
./scripts/docker_frontend_start.sh

# Run Smoke Tests
./scripts/smoke_tests.sh
EXIT_CODE=$?

# Teardown
echo "Tearing down services..."
docker-compose -f docker-compose.yml -f docker-compose.frontend.override.yml down -v

if [ $EXIT_CODE -eq 0 ]; then
    echo "CI Check PASSED"
    exit 0
else
    echo "CI Check FAILED"
    exit 1
fi
