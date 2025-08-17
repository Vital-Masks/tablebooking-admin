#!/bin/bash

echo "🐳 Testing Docker API connectivity..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t tablebooking-admin .

# Test with host.docker.internal
echo "🔗 Testing with host.docker.internal..."
docker run --rm -p 3000:3000 \
  -e API_ENDPOINT=http://host.docker.internal:3000/api \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=test-secret \
  -e AUTH_SECRET=test-secret \
  tablebooking-admin &
DOCKER_PID=$!

# Wait for container to start
sleep 5

# Test the API endpoint
echo "🧪 Testing API endpoint..."
curl -s http://localhost:3000/api/restaurant/getAllRestaurants | head -c 200

# Clean up
echo "🧹 Cleaning up..."
kill $DOCKER_PID
docker stop $(docker ps -q --filter ancestor=tablebooking-admin) 2>/dev/null || true

echo "✅ Docker test completed!"
