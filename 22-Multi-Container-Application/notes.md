# 📝 Day 22 - Multi-Container Docker Compose Notes

## Multi-Container Application

A multi-container application separates application components into independent services.

Example:

```text
Frontend
Backend
Database
Cache
Worker
Reverse Proxy
```

Each service can be built, updated, scaled, and debugged independently.

---

## Application Architecture

```text
Browser
   │
   ▼
Frontend Service
   │
   ▼
Backend Service
   │
   ▼
Database Service
```

---

## Why Use Separate Containers?

Benefits include:

- Separation of responsibilities
- Independent updates
- Easier debugging
- Better scalability
- Better portability
- Reusable service images
- Cleaner configuration

A common principle is to keep one primary logical service per container.

---

## Docker Compose

Docker Compose defines and manages the complete application through a YAML file.

The Compose file can define:

- Services
- Builds
- Images
- Ports
- Networks
- Volumes
- Environment variables
- Commands
- Health checks
- Dependencies
- Restart policies

---

## Service Definition

Example:

```yaml
services:
  backend:
    build: ./backend
```

This creates the backend image from the Dockerfile inside the `backend` directory.

---

## Build Context

```yaml
build: ./backend
```

The `backend` directory becomes the Docker build context.

Docker can access files inside that directory during the image build.

---

## Environment Variables

Example:

```yaml
environment:
  DB_HOST: database
  DB_PORT: 3306
  DB_USER: appuser
```

The application reads these values through:

```javascript
process.env.DB_HOST
```

Environment variables allow configuration to be changed without editing the application code.

---

## Docker DNS

Services connected to the same Compose network can communicate using service names.

```text
Backend service
      │
      ▼
database
      │
      ▼
MySQL service
```

The backend should use:

```text
database
```

instead of a hard-coded container IP address.

---

## Custom Network

```yaml
networks:
  app-network:
    driver: bridge
```

Services attach to the network using:

```yaml
networks:
  - app-network
```

The custom network provides:

- Service discovery
- Container communication
- Application isolation

---

## Named Volume

```yaml
volumes:
  - mysql-data:/var/lib/mysql
```

Top-level declaration:

```yaml
volumes:
  mysql-data:
```

The named volume exists independently from the database container.

---

## MySQL Data Persistence

```text
MySQL Container
       │
       ▼
/var/lib/mysql
       │
       ▼
Named Volume
```

Removing and recreating the container does not remove the data stored in the volume.

---

## Initialization Script

```yaml
- ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
```

The SQL file is mounted into the MySQL initialization directory.

The official MySQL image executes compatible initialization scripts when it initializes a new database directory.

Initialization scripts are not normally rerun when an existing initialized volume is reused.

---

## Health Check

Example:

```yaml
healthcheck:
  test:
    - CMD-SHELL
    - mysqladmin ping -h localhost -uroot -prootpassword
  interval: 10s
  timeout: 5s
  retries: 10
  start_period: 30s
```

Health checks allow Docker to report whether a service is actually ready.

Common health states:

```text
starting
healthy
unhealthy
```

---

## `depends_on`

```yaml
depends_on:
  database:
    condition: service_healthy
```

This delays backend startup until the database health check passes.

Simple startup order alone does not always mean a service is ready, so health checks provide a stronger dependency condition.

---

## Restart Policy

```yaml
restart: unless-stopped
```

The container restarts after failures or Docker daemon restarts unless it was manually stopped.

---

## Backend API

The backend provides:

```text
GET /
GET /health
GET /api/messages
```

### Root Endpoint

Confirms that the API process is running.

### Health Endpoint

Tests backend and database connectivity.

### Messages Endpoint

Creates the table if required, inserts initial data when empty, and returns database messages.

---

## Database Connection Pool

The backend uses a MySQL connection pool.

Benefits include:

- Reusing connections
- Reducing connection overhead
- Supporting multiple requests
- Managing concurrent access

---

## `.dockerignore`

Example:

```text
node_modules
npm-debug.log
.git
.env
```

A `.dockerignore` file prevents unnecessary or sensitive files from entering the build context.

Benefits:

- Faster builds
- Smaller build context
- Cleaner images
- Reduced risk of copying secrets

---

## Port Publishing

Frontend:

```yaml
ports:
  - "8080:80"
```

Backend:

```yaml
ports:
  - "3000:3000"
```

Database port publishing is not normally required unless the host needs direct database access.

For improved isolation, production databases are commonly kept accessible only through internal networks.

---

## Service-to-Service Communication

The frontend or backend should use internal service names for container communication.

Example:

```text
backend:3000
database:3306
```

External browser traffic uses published host ports:

```text
localhost:8080
localhost:3000
```

---

## Compose Startup Workflow

```text
docker compose up -d --build
            │
            ▼
Create Network
            │
            ▼
Create Volume
            │
            ▼
Start MySQL
            │
            ▼
Wait for Healthy Status
            │
            ▼
Start Backend
            │
            ▼
Start Frontend
```

---

## Persistence Test

```text
Insert Database Record
        │
        ▼
docker compose down
        │
        ▼
Containers Removed
        │
        ▼
Named Volume Remains
        │
        ▼
docker compose up -d
        │
        ▼
Database Data Restored
```

---

## `docker compose down`

```bash
docker compose down
```

Removes:

- Compose service containers
- Compose-created networks

Does not remove named volumes by default.

---

## `docker compose down -v`

```bash
docker compose down -v
```

Also removes named volumes.

This permanently deletes the stored MySQL data.

---

## Common Errors

### Database Remains Unhealthy

Check:

```bash
docker compose logs database
```

Possible causes:

- Incorrect password
- Invalid health-check command
- MySQL initialization failure
- Insufficient startup time
- Existing volume with different credentials

---

### Backend Cannot Connect to MySQL

Check environment variables:

```bash
docker compose config
```

Check Docker DNS:

```bash
docker compose exec backend getent hosts database
```

Check database health:

```bash
docker compose ps
```

---

### Port Already Allocated

Check:

```bash
docker ps
```

Use different host ports:

```yaml
ports:
  - "8081:80"
```

---

### Initialization Script Does Not Run

MySQL initialization scripts normally run only when the data directory is initialized for the first time.

To intentionally reset the educational environment:

```bash
docker compose down -v
docker compose up -d --build
```

This permanently removes the previous database data.

---

### Image Pull DNS Failure

Possible error:

```text
no such host
```

Restart the resolver and Docker:

```bash
sudo systemctl restart systemd-resolved
sudo systemctl restart docker
```

Retry:

```bash
docker compose up -d --build
```

---

## Security Improvements for Future Versions

The current project is designed for learning.

Future improvements should include:

- `.env` file with `.gitignore`
- Docker secrets
- Strong generated passwords
- Non-root backend user
- Database port not published to host
- Restricted CORS
- Secure production configuration
- Nginx reverse proxy for the backend
- HTTPS
- Image vulnerability scanning

---

## Day 22 Summary

During Day 22, I combined multiple Docker concepts into one complete application stack.

I practiced:

- Multi-container architecture
- Custom image builds
- Docker Compose
- Environment variables
- Service-name networking
- Health checks
- Startup dependencies
- MySQL initialization
- Named volumes
- Persistent data
- API and database testing
- Stack lifecycle management

This project demonstrated how Docker Compose can manage a realistic application consisting of frontend, backend, and database services.
