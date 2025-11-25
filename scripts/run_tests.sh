#!/bin/bash
# Script to run tests
# Test Register
echo "Testing Register..."
curl -X POST "http://localhost:8000/register" -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'
echo -e "\n"

# Test Login
echo "Testing Login..."
TOKEN=$(curl -s -X POST "http://localhost:8000/login" -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}' | jq -r .access_token)
echo "Token: $TOKEN"
echo -e "\n"

# Test Translate (Protected)
echo "Testing Translate..."
curl -X POST "http://localhost:8000/translate" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"text": "Bonjour le monde", "direction": "fr-en"}'
echo -e "\n"

# Test Frontend
echo "Testing Frontend..."
if [ -d "frontend" ]; then
    echo "Frontend directory exists."
    if [ -f "frontend/package.json" ]; then
        echo "package.json exists."
    else
        echo "package.json missing."
    fi
else
    echo "Frontend directory missing."
fi
