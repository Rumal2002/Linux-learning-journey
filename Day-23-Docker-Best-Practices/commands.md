# 🖥️ Day 23 - Docker Best Practices Commands

## Create the Project

```bash
cd ~

mkdir -p day23-docker-best-practices/app

cd day23-docker-best-practices
```

---

## Validate `package.json`

```bash
python3 -m json.tool app/package.json
```

---

## Check JavaScript Syntax with Docker

```bash
docker run --rm \
  -v "$(pwd)/app:/app:ro" \
  -w /app \
  node:22-alpine \
  node --check server.js
```

---

## Generate `package-lock.json`

```bash
docker run --rm \
  -v "$(pwd)/app:/app" \
  -w /app \
  node:22-alpine \
  npm install --package-lock-only
```

---

## Test the Application Without Building an Image

```bash
docker run --rm -it \
  --name day23-node-test \
  -p 3000:3000 \
  -v "$(pwd)/app:/app" \
  -w /app \
  -e NODE_ENV=development \
  node:22-alpine \
  sh -c "npm ci && npm start"
```

---

## Test API Endpoints

```bash
curl http://localhost:3000
```

```bash
curl http://localhost:3000/health
```

```bash
curl http://localhost:3000/api/info
```

---

## Build the Unoptimized Image

From the `app` directory:

```bash
cd ~/day23-docker-best-practices/app
```

```bash
docker build \
  -f Dockerfile.bad \
  -t day23-bad-image:latest .
```

---

## Build the Optimized Image

```bash
docker build \
  -f Dockerfile \
  -t day23-good-image:v1 .
```

---

## List Docker Images

```bash
docker image ls
```

Formatted output:

```bash
docker image ls \
  --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

---

## Inspect Image Size in Bytes

```bash
docker image inspect \
  --format='Image={{.RepoTags}} Size={{.Size}} bytes' \
  day23-bad-image:latest
```

```bash
docker image inspect \
  --format='Image={{.RepoTags}} Size={{.Size}} bytes' \
  day23-good-image:v1
```

---

## Inspect the Configured Image User

```bash
docker image inspect \
  --format='{{.Config.User}}' \
  day23-bad-image:latest
```

```bash
docker image inspect \
  --format='{{.Config.User}}' \
  day23-good-image:v1
```

---

## View Image Layers

```bash
docker history day23-bad-image:latest
```

```bash
docker history day23-good-image:v1
```

Full output:

```bash
docker history --no-trunc day23-good-image:v1
```

---

## Test a Cached Build

```bash
time docker build \
  -f Dockerfile \
  -t day23-good-image:cached .
```

---

## Test a No-Cache Build

```bash
time docker build \
  --no-cache \
  -f Dockerfile \
  -t day23-good-image:no-cache .
```

---

## Build a New Image Version

After changing `server.js`:

```bash
docker build \
  -f Dockerfile \
  -t day23-good-image:v2 .
```

---

## Run the Optimized Container

```bash
docker run -d \
  --name day23-optimized-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  day23-good-image:v2
```

Use `v1` if version 2 was not created:

```bash
docker run -d \
  --name day23-optimized-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  day23-good-image:v1
```

---

## View Container Logs

```bash
docker logs day23-optimized-app
```

Follow logs:

```bash
docker logs -f day23-optimized-app
```

---

## Verify the Container User

```bash
docker exec day23-optimized-app whoami
```

```bash
docker exec day23-optimized-app id
```

Verify that the UID is not zero:

```bash
docker exec day23-optimized-app \
  sh -c 'test "$(id -u)" -ne 0 && echo "Non-root user confirmed"'
```

---

## Inspect Container Configuration

```bash
docker inspect \
  --format='User={{.Config.User}} Environment={{json .Config.Env}}' \
  day23-optimized-app
```

---

## Test the Running Application

```bash
curl http://localhost:3000
```

```bash
curl http://localhost:3000/health
```

```bash
curl http://localhost:3000/api/info
```

---

## Test Graceful Shutdown

```bash
docker stop day23-optimized-app
```

```bash
docker logs day23-optimized-app
```

---

## Remove the Test Container

```bash
docker rm day23-optimized-app
```

---

## Check Docker Scout

```bash
docker scout version
```

---

## Quick Image Security Overview

```bash
docker scout quickview day23-good-image:v1
```

---

## Detailed Vulnerability Scan

```bash
docker scout cves day23-good-image:v1
```

---

## Scan High and Critical Vulnerabilities

```bash
docker scout cves \
  --only-severity critical,high \
  day23-good-image:v1
```

---

## Compare Images with Docker Scout

```bash
docker scout compare \
  day23-good-image:v1 \
  --to day23-bad-image:latest
```

---

## View Docker Disk Usage

```bash
docker system df
```

---

## Remove Unused Build Cache

```bash
docker builder prune
```

Skip confirmation:

```bash
docker builder prune -f
```

---

## Practical Command Sequence

```bash
cd ~/day23-docker-best-practices/app

docker build \
  -f Dockerfile.bad \
  -t day23-bad-image:latest .

docker build \
  -f Dockerfile \
  -t day23-good-image:v1 .

docker image ls

docker history day23-bad-image:latest
docker history day23-good-image:v1

docker image inspect \
  --format='{{.Config.User}}' \
  day23-good-image:v1

docker run -d \
  --name day23-optimized-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  day23-good-image:v1

curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/api/info

docker exec day23-optimized-app whoami
docker exec day23-optimized-app id

docker stop day23-optimized-app
docker logs day23-optimized-app
docker rm day23-optimized-app

docker scout quickview day23-good-image:v1
```
