cd user-service
./mvnw clean package
cd ..
cd discovery-service
./mvnw clean package
docker-compose down
docker rmi buy-01-discovery-service:latest
docker rmi buy-01-user-service:latest
docker-compose up