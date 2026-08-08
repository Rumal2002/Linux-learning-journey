🖥️ Day 24 - Docker Hub Image Publishing Commands

Login & Logout

docker login
docker logout

Build Image

cd ~/day24-dockerhub-image-publishing
docker build -t day24-node-app:v1 ./app

List Images

docker image ls
docker images

Tag Images

docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:v1
docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:latest
docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:1.0.0

Push Images

docker push YOUR_USERNAME/day24-node-app:v1
docker push YOUR_USERNAME/day24-node-app:latest
docker push YOUR_USERNAME/day24-node-app:1.0.0

Pull Images

docker pull YOUR_USERNAME/day24-node-app:v1
docker pull YOUR_USERNAME/day24-node-app:latest
docker pull YOUR_USERNAME/day24-node-app:1.0.0

Search Docker Hub

docker search nginx
docker search node

Inspect Images

docker image inspect YOUR_USERNAME/day24-node-app:1.0.0
docker history YOUR_USERNAME/day24-node-app:1.0.0

Run Published Image

docker run -d   --name day24-app   -p 3000:3000   -e NODE_ENV=production   YOUR_USERNAME/day24-node-app:1.0.0

Verify

docker ps
docker logs day24-app
docker exec day24-app whoami
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/api/info

Stop & Remove

docker stop day24-app
docker rm day24-app

Remove Images

docker rmi YOUR_USERNAME/day24-node-app:v1
docker rmi YOUR_USERNAME/day24-node-app:latest
docker rmi YOUR_USERNAME/day24-node-app:1.0.0

Disk Usage

docker system df
docker image prune
docker builder prune

Complete Workflow

docker login

docker build -t day24-node-app:v1 ./app

docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:1.0.0
docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:latest

docker push YOUR_USERNAME/day24-node-app:1.0.0
docker push YOUR_USERNAME/day24-node-app:latest

docker pull YOUR_USERNAME/day24-node-app:1.0.0

docker run -d --name day24-app -p 3000:3000 YOUR_USERNAME/day24-node-app:1.0.0

curl http://localhost:3000

docker stop day24-app
docker rm day24-app
