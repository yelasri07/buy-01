    #!/bin/bash

echo "🔴 Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🗑️ Removing all containers..."
docker rm -f $(docker ps -aq) 2>/dev/null

echo "🖼️ Removing all images..."
docker rmi -f $(docker images -aq) 2>/dev/null

echo "📦 Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null

echo "🌐 Removing all custom networks..."
docker network rm $(docker network ls -q) 2>/dev/null

echo "✅ Docker cleanup complete!"
docker system df