docker build -t bau-webserver2 .
docker images | grep bau-webserver2
docker run -d -p 8082:80 --name webserver2 bau-webserver2
