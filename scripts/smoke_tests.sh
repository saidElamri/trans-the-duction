#!/bin/bash
# Smoke tests for the application

echo "Waiting for services to be healthy..."
# Simple wait loop
for i in {1..30}; do
    if curl -s -f http://localhost > /dev/null; then
        echo "Frontend is up!"
        break
    fi
    echo "Waiting for frontend..."
    sleep 2
done

# Test Frontend Access
echo "Testing Frontend Access..."
curl -f http://localhost > /dev/null && echo "Frontend OK" || echo "Frontend FAILED"

# Test Backend Health via Proxy
echo "Testing Backend Health via Proxy..."
# Assuming backend has a docs endpoint or we can check 404 on root
curl -s -o /dev/null -w "%{http_code}" http://localhost/api/docs | grep -q "200" && echo "Backend Proxy OK" || echo "Backend Proxy FAILED (Expected 200 on /docs)"

# Test Login (if user exists, otherwise this might fail if DB is empty)
# We can try to register a test user first
echo "Registering test user..."
curl -s -X POST "http://localhost/api/register" -H "Content-Type: application/json" -d '{"username": "smokeuser", "password": "smokepassword"}'

echo "Logging in..."
TOKEN=$(curl -s -X POST "http://localhost/api/login" -H "Content-Type: application/json" -d '{"username": "smokeuser", "password": "smokepassword"}' | jq -r .access_token)

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo "Login Successful. Token received."
    
    # Test Translate (Dry Run or Mock if possible, otherwise real call)
    # Using a known simple translation
    echo "Testing Translation..."
    curl -s -X POST "http://localhost/api/translate" \
         -H "Authorization: Bearer $TOKEN" \
         -H "Content-Type: application/json" \
         -d '{"text": "Hello", "direction": "en-fr"}' | grep "translated_text" && echo "Translation OK" || echo "Translation FAILED"
else
    echo "Login FAILED"
fi
