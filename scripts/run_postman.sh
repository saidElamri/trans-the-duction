#!/bin/bash
# Script to run Postman tests using Newman

# Check if newman is installed
if ! command -v newman &> /dev/null; then
    echo "Newman could not be found. Installing..."
    npm install -g newman
fi

# Create reports directory if it doesn't exist
mkdir -p reports

# Run Newman
echo "Running Postman collection..."
newman run postman/translation_api_collection.json \
  -e postman/local.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export reports/postman_report.json

echo "Postman tests completed. Report saved to reports/postman_report.json"
