# 📝 Day 23 - Docker Best Practices Notes

## Docker Image Optimization

Docker image optimization is the process of reducing unnecessary image content while improving:

- Build speed
- Deployment speed
- Storage efficiency
- Security
- Maintainability
- Reproducibility

---

## Docker Image Layers

A Docker image consists of read-only layers.

Each Dockerfile instruction can create or modify image metadata or filesystem layers.

Example:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY server.js ./
```

Conceptually:

```text
Base Image Layer
Working Directory Metadata
Dependency Files Layer
Dependency Installation Layer
Application Source Layer
```

Docker reuses unchanged layers between builds.

---

## Build Cache

Docker stores results from previous image-build steps.

When an instruction and its relevant inputs remain unchanged, Docker may reuse the cached result.

Example:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY server.js ./
```

If only `server.js` changes:

```text
Dependency files unchanged
        ↓
npm ci layer reused
        ↓
Source-code layer rebuilt
```

---

## Cache-Friendly Layer Ordering

Frequently changing files should usually be copied after less frequently changing dependency files.

Recommended:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY server.js ./
```

Less efficient:

```dockerfile
COPY . .
RUN npm install
```

In the second example, any changed file can invalidate the dependency-installation layer.

---

## `npm install` vs `npm ci`

### `npm install`

- Can update the lock file
- Resolves dependencies using package definitions
- Common during development

### `npm ci`

- Requires a lock file
- Installs exact locked dependency versions
- Deletes an existing `node_modules` directory
- Better suited for automated and repeatable builds

Production-only dependencies:

```bash
npm ci --omit=dev
```

---

## Multi-Stage Build

A multi-stage Dockerfile contains multiple `FROM` instructions.

Example:

```dockerfile
FROM node:22-alpine AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY server.js ./
COPY package*.json ./
```

Benefits:

- Separates build and runtime concerns
- Copies only required artifacts
- Keeps unnecessary files out of the final image
- Supports cleaner production images

---

## Minimal Base Images

Examples:

```text
node:22
node:22-slim
node:22-alpine
```

A smaller base image usually contains fewer operating-system packages.

Possible benefits:

- Smaller download size
- Faster image transfer
- Reduced storage
- Smaller attack surface

Possible trade-offs:

- Fewer debugging utilities
- Compatibility differences
- Different C library implementations
- Additional work for native dependencies

The smallest image is not automatically the best image. Compatibility, maintainability, and security also matter.

---

## `.dockerignore`

The `.dockerignore` file excludes files from the Docker build context.

Example:

```text
node_modules
.git
.env
*.log
screenshots
```

Benefits:

- Faster context transfer
- Better caching
- Reduced risk of copying secrets
- Cleaner images
- Smaller build input

The `.dockerignore` file should be located at the root of the build context.

If the build command is:

```bash
docker build app
```

the file should normally be:

```text
app/.dockerignore
```

---

## Non-Root Containers

Containers often run as root by default.

A production container should use the least privilege required.

Example:

```dockerfile
USER node
```

Verification:

```bash
docker exec container-name whoami
```

```bash
docker exec container-name id
```

UID zero indicates root.

---

## Why Root Containers Are Riskier

If an application running as root is compromised, the attacker may have greater privileges inside the container.

Container isolation reduces risk but does not make unnecessary root privileges safe.

Least privilege reduces the potential impact of a compromise.

---

## Production Environment

Set the Node.js environment:

```dockerfile
ENV NODE_ENV=production
```

Benefits may include:

- Production framework behavior
- Reduced development output
- Production dependency handling
- Better runtime configuration

Environment variables can also be passed at runtime:

```bash
docker run -e NODE_ENV=production image-name
```

---

## Graceful Shutdown

Docker normally sends `SIGTERM` when stopping a container.

Applications should handle this signal and close resources cleanly.

```javascript
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```

Possible resources to close include:

- HTTP servers
- Database connections
- Message consumers
- File handles
- Background jobs

---

## Health Endpoint

A health endpoint reports application status.

Example:

```text
GET /health
```

It may report:

- Process health
- Application uptime
- Memory usage
- Database connectivity
- Dependency status

A Dockerfile can later use it in a `HEALTHCHECK` instruction.

---

## Image Inspection

Detailed metadata:

```bash
docker image inspect image-name
```

Useful fields include:

- Configured user
- Environment variables
- Entrypoint
- Command
- Labels
- Architecture
- Image size

---

## Docker History

```bash
docker history image-name
```

This displays the image's layer history.

It helps identify:

- Large layers
- Unnecessary package installation
- Poor instruction ordering
- Copied files
- Runtime metadata

---

## Cached Build

```bash
docker build -t image-name .
```

When Docker reuses previous results, the build output may show:

```text
CACHED
```

---

## No-Cache Build

```bash
docker build --no-cache -t image-name .
```

This forces Docker to execute every build instruction again.

Useful for:

- Testing reproducibility
- Refreshing stale dependencies
- Comparing build performance
- Troubleshooting cache-related issues

---

## Docker Scout

Docker Scout analyzes container images and software components.

Common commands:

```bash
docker scout quickview image-name
```

```bash
docker scout cves image-name
```

```bash
docker scout compare image-a --to image-b
```

Scan results can change over time as vulnerability databases and packages change.

---

## CVE

CVE means:

```text
Common Vulnerabilities and Exposures
```

Severity levels commonly include:

```text
Critical
High
Medium
Low
Unknown
```

A reported CVE should be evaluated based on:

- Whether the vulnerable package is used
- Whether the vulnerable path is reachable
- Available patched versions
- Application exposure
- Runtime configuration
- Compensating controls

---

## Image Security Best Practices

- Use maintained base images
- Use explicit image tags
- Regularly rebuild images
- Update dependencies
- Scan images
- Run as non-root
- Avoid unnecessary packages
- Do not store secrets in images
- Use `.dockerignore`
- Install production dependencies only
- Use minimal permissions
- Sign and verify important images where required

---

## Secrets

Secrets should not be included in:

- Dockerfiles
- Image layers
- Source code
- `ENV` instructions committed to Git
- Public Compose files

Examples of secrets:

```text
Database passwords
API keys
Private keys
Tokens
Cloud credentials
```

Use protected environment management, CI/CD secrets, Docker secrets, or cloud secret managers.

---

## Image Tags

Avoid relying only on:

```text
latest
```

Use meaningful tags:

```text
v1
v1.0.0
production
commit-sha
```

Tags improve traceability and rollback.

---

## Common Dockerfile Problems

### Copying Everything First

```dockerfile
COPY . .
RUN npm install
```

Problem:

Any changed file may invalidate dependency installation.

---

### Running as Root

No `USER` instruction means the image may run as root.

Solution:

```dockerfile
USER node
```

---

### Installing Development Dependencies

```bash
npm install
```

Production alternative:

```bash
npm ci --omit=dev
```

---

### Copying Secrets

An `.env` file can accidentally enter the build context.

Add:

```text
.env
.env.*
```

to `.dockerignore`.

---

### Using Large Base Images

A large base image may contain unnecessary packages.

Choose the smallest compatible, maintained image appropriate for the application.

---

## Day 23 Summary

During Day 23, I learned how to improve Docker images using production-focused practices.

I practiced:

- Image layer analysis
- Build-cache optimization
- Multi-stage builds
- Minimal base images
- Production dependency installation
- `.dockerignore`
- Non-root execution
- Image-size comparison
- Cached and no-cache builds
- Graceful shutdown
- Image metadata inspection
- Vulnerability scanning

Docker optimization is not only about reducing image size. It also improves security, repeatability, deployment speed, and maintainability.
