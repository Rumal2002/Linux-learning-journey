# 🐳 Day 23 - Docker Best Practices and Image Optimization

## 📖 Overview

Welcome to **Day 23** of my DevOps Learning Journey.

In this session, I explored Docker best practices for building smaller, faster, more secure, and production-focused container images.

I created a Node.js and Express application and built it using two different Dockerfiles:

- An unoptimized Dockerfile
- An optimized multi-stage Dockerfile

I then compared the image sizes, image layers, build-cache behavior, runtime users, and security characteristics of both images.

This practical project demonstrated how Dockerfile structure, base-image selection, `.dockerignore`, build caching, multi-stage builds, and non-root execution can significantly improve containerized applications.

---

## 🎯 Learning Objectives

By the end of Day 23, I was able to:

- Understand Docker image layers
- Understand Docker build cache
- Identify inefficient Dockerfile patterns
- Optimize dependency installation
- Use multi-stage Docker builds
- Use Alpine-based images
- Create an effective `.dockerignore`
- Run a container as a non-root user
- Compare Docker image sizes
- Inspect image metadata
- Inspect Docker image history
- Test cached and non-cached builds
- Verify graceful application shutdown
- Perform basic container image vulnerability scanning

---

## 📚 Topics Covered

- Docker Image Optimization
- Dockerfile Best Practices
- Docker Image Layers
- Docker Build Cache
- Layer Ordering
- Multi-Stage Builds
- Minimal Base Images
- `.dockerignore`
- Non-Root Containers
- Repeatable Dependency Installation
- Graceful Shutdown
- Docker Image Inspection
- Docker Scout
- Container Security Fundamentals

---

## 🏗️ Project Architecture

```text
Browser / API Client
        │
        ▼
localhost:3000
        │
        ▼
Optimized Node.js Container
        │
        ▼
Express REST API
```

The application provides the following endpoints:

```text
GET /
GET /health
GET /api/info
```

---

## 📁 Project Structure

```text
project/
├── Dockerfile
├── Dockerfile.bad
├── .dockerignore
├── package.json
├── package-lock.json
└── server.js
```

---

## 🌐 Application Features

The Node.js application includes:

- Root status endpoint
- Health-check endpoint
- Runtime information endpoint
- Environment-variable configuration
- Graceful shutdown handling
- Container hostname reporting
- Process user information
- Memory and uptime information
- Disabled Express framework disclosure header

---

## ❌ Unoptimized Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```

### Problems

- Uses a larger base image
- Copies the full build context before dependency installation
- Invalidates dependency cache when application files change
- Uses `npm install` instead of the lock-file-focused `npm ci`
- Runs the application as the root user
- Includes unnecessary build-context files
- Produces a larger attack surface

---

## ✅ Optimized Dockerfile

```dockerfile
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

FROM node:22-alpine

LABEL maintainer="Rumal Medagedara"
LABEL project="Docker Best Practices"
LABEL version="1.0"

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY server.js ./
COPY package*.json ./

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🔄 Multi-Stage Build

The optimized image uses two stages.

```text
Dependencies Stage
        │
        ├── Install production dependencies
        │
        ▼
Production Stage
        │
        ├── Copy only required dependencies
        ├── Copy application files
        ├── Configure production environment
        └── Run as non-root user
```

Benefits include:

- Separation of build and runtime responsibilities
- Cleaner final image
- Reduced unnecessary content
- Easier maintenance
- Better production security

---

## 📦 Minimal Base Image

The optimized Dockerfile uses:

```dockerfile
FROM node:22-alpine
```

Alpine-based images are generally smaller than full Node.js images because they contain fewer system packages.

A smaller image can provide:

- Faster downloads
- Faster deployments
- Lower storage usage
- Smaller attack surface

Image size alone does not guarantee security, so images should still be updated and scanned regularly.

---

## ⚡ Docker Build Cache

The optimized Dockerfile copies dependency files before application source code.

```dockerfile
COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js ./
```

When only `server.js` changes:

```text
package.json unchanged
package-lock.json unchanged
        │
        ▼
Dependency layer reused
        │
        ▼
Only application layer rebuilt
```

This makes repeated builds significantly faster.

---

## 📄 `.dockerignore`

```text
node_modules
npm-debug.log
.git
.gitignore
README.md
screenshots
*.log
.env
.env.*
Dockerfile.bad
```

The `.dockerignore` file prevents unnecessary and potentially sensitive files from entering the Docker build context.

Benefits:

- Smaller build context
- Faster image builds
- Cleaner image contents
- Lower risk of copying secrets
- Improved cache efficiency

---

## 🔒 Non-Root Container

The optimized Dockerfile includes:

```dockerfile
USER node
```

The application therefore runs as the pre-existing Node.js non-root user instead of `root`.

Verification:

```bash
docker exec day23-optimized-app whoami
```

Expected:

```text
node
```

Running containers with the least required privileges reduces the impact of a potential application compromise.

---

## 🔁 Repeatable Dependency Installation

The optimized image uses:

```dockerfile
RUN npm ci --omit=dev
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.

This provides more predictable and repeatable builds than installing loosely resolved dependency versions.

The `--omit=dev` option excludes development dependencies from the production image.

---

## 🧪 Image Build Commands

Build the unoptimized image:

```bash
docker build \
  -f Dockerfile.bad \
  -t day23-bad-image .
```

Build the optimized image:

```bash
docker build \
  -f Dockerfile \
  -t day23-good-image:v1 .
```

---

## 📊 Image Size Comparison

Images were compared using:

```bash
docker image ls
```

Detailed byte size:

```bash
docker image inspect \
  --format='{{.RepoTags}} {{.Size}} bytes' \
  day23-good-image:v1
```

The optimized image is expected to be smaller because it uses:

- Alpine Linux
- Production-only dependencies
- A focused build context
- A cleaner final stage

Exact image sizes depend on image versions, dependencies, architecture, and local Docker configuration.

---

## 🧱 Image Layer Inspection

Image layers were inspected using:

```bash
docker history day23-bad-image
```

```bash
docker history day23-good-image:v1
```

This helped identify:

- Base-image layers
- Dependency installation layers
- File-copy layers
- Environment configuration
- User configuration
- Runtime commands

---

## ⚙️ Build Cache Test

Cached build:

```bash
time docker build \
  -f Dockerfile \
  -t day23-good-image:cached .
```

Build output may display:

```text
CACHED
```

After changing only the application source code, Docker can reuse the dependency layer.

No-cache build:

```bash
time docker build \
  --no-cache \
  -f Dockerfile \
  -t day23-good-image:no-cache .
```

This rebuilds all layers without using the existing cache.

---

## 🚀 Running the Optimized Container

```bash
docker run -d \
  --name day23-optimized-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  day23-good-image:v1
```

Test the application:

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

## ❤️ Health Endpoint

The health endpoint returns application uptime and memory information.

```text
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "uptimeSeconds": 120,
  "memoryUsageMB": {
    "rss": 55,
    "heapUsed": 8
  }
}
```

---

## 🛑 Graceful Shutdown

The Node.js application handles:

```text
SIGTERM
SIGINT
```

When Docker stops the container, the application closes its HTTP server before exiting.

```bash
docker stop day23-optimized-app
```

Expected logs:

```text
SIGTERM received. Shutting down gracefully.
HTTP server closed.
```

Graceful shutdown helps prevent interrupted requests and incomplete application operations.

---

## 🔍 Image Inspection

Image metadata:

```bash
docker image inspect day23-good-image:v1
```

Configured user:

```bash
docker image inspect \
  --format='{{.Config.User}}' \
  day23-good-image:v1
```

Expected:

```text
node
```

---

## 🛡️ Docker Scout

When Docker Scout is available, the image can be scanned using:

```bash
docker scout quickview day23-good-image:v1
```

Detailed vulnerabilities:

```bash
docker scout cves day23-good-image:v1
```

High and critical vulnerabilities:

```bash
docker scout cves \
  --only-severity critical,high \
  day23-good-image:v1
```

Image scanning helps identify known vulnerabilities in:

- Base-image packages
- Operating-system libraries
- Application dependencies

Scanning does not replace secure development, dependency updates, and regular image rebuilding.

---

## 🛠️ Practical Activities

The following practical tasks were completed:

- Created a production-focused Node.js application
- Added health and runtime-information endpoints
- Added graceful shutdown handling
- Generated a package lock file
- Created an unoptimized Dockerfile
- Created an optimized multi-stage Dockerfile
- Used a minimal Alpine base image
- Installed production-only dependencies
- Configured `.dockerignore`
- Compared Docker image sizes
- Inspected image layers
- Tested Docker build caching
- Tested a no-cache image build
- Ran the application as a non-root user
- Verified the runtime user
- Tested application endpoints
- Verified graceful shutdown
- Performed or attempted a Docker Scout scan

---

## 💡 Key Takeaways

- Dockerfile instruction order affects cache efficiency.
- Dependency files should be copied before frequently changing source files.
- `npm ci` supports repeatable dependency installation.
- Multi-stage builds separate build and runtime concerns.
- Minimal images can reduce storage and attack surface.
- `.dockerignore` keeps the build context focused.
- Production containers should avoid running as root.
- Image layers can be inspected using `docker history`.
- Cached builds are faster than full rebuilds.
- Vulnerability scanning should be part of the container lifecycle.
- Smaller images are useful, but secure configuration and regular updates are equally important.

---

## ✅ Day 23 Completion

```text
Docker Image Layers             ✅
Docker Build Cache              ✅
Unoptimized Dockerfile          ✅
Optimized Dockerfile            ✅
Multi-Stage Build               ✅
Alpine Base Image               ✅
Production Dependencies         ✅
.dockerignore                   ✅
Non-Root Container              ✅
Image Size Comparison           ✅
Image Layer Inspection          ✅
Cached and No-Cache Builds      ✅
Graceful Shutdown               ✅
Image Security Scan             ✅
GitHub Documentation            ✅
```

---

## 🚀 Next Step

On **Day 24**, I will learn how to publish Docker images to Docker Hub.

The next session will cover:

- Docker Hub repositories
- Docker authentication
- Image naming
- Image tags
- Pushing images
- Pulling published images
- Semantic versioning
- Public image documentation
