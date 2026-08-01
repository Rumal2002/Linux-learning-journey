# 🐳 Day 22 - Multi-Container Application with Docker Compose

## 📖 Overview

Welcome to **Day 22** of my DevOps Learning Journey.

In this session, I built a complete multi-container application using Docker Compose.

The application consists of three independent services:

- Nginx frontend
- Node.js and Express backend API
- MySQL database

Docker Compose was used to build the custom images, connect the services through an internal Docker network, configure environment variables, initialize the database, monitor service health, and preserve database data using a named volume.

This practical project combined the Docker concepts covered during the previous learning sessions, including Dockerfiles, custom images, volumes, networking, service discovery, health checks, and Compose lifecycle management.

---

## 🎯 Learning Objectives

By the end of Day 22, I was able to:

- Design a multi-container application architecture
- Build custom frontend and backend Docker images
- Configure a MySQL database container
- Define multiple services in Docker Compose
- Use environment variables for service configuration
- Configure Docker DNS-based service discovery
- Create a custom bridge network
- Configure a MySQL health check
- Control service startup dependencies
- Use a named volume for persistent database storage
- Initialize a database using an SQL script
- Test frontend, backend, and database communication
- Verify data persistence after container recreation
- Inspect Compose services, logs, networks, and volumes

---

## 🏗️ Application Architecture

```text
                Browser
                   │
                   ▼
          http://localhost:8080
                   │
                   ▼
          Frontend - Nginx
                   │
                   ▼
          Backend - Express API
                   │
                   ▼
          Database - MySQL
```

Each component runs inside its own Docker container.

```text
Frontend Container
        │
        ▼
Backend Container
        │
        ▼
MySQL Container
```

Docker Compose manages the complete application stack.

---

## 📁 Project Structure

```text
day22-multi-container-app/
├── compose.yaml
├── frontend/
│   ├── Dockerfile
│   └── index.html
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── mysql/
    └── init.sql
```

---

## 🧩 Application Services

### Frontend Service

The frontend is a static website served by Nginx.

Technology:

```text
Nginx Alpine
HTML
CSS
JavaScript
```

Published port:

```text
Host Port 8080 → Container Port 80
```

---

### Backend Service

The backend is a REST API built using Node.js and Express.

Technology:

```text
Node.js
Express
mysql2
```

Published port:

```text
Host Port 3000 → Container Port 3000
```

API endpoints:

```text
GET /
GET /health
GET /api/messages
```

---

### Database Service

The database service uses MySQL.

Technology:

```text
MySQL 8.4
```

The database stores application messages and uses a named Docker volume for persistent storage.

```text
MySQL Container
        │
        ▼
mysql-data Volume
```

---

## 🌐 Docker Networking

All services are connected to a custom bridge network.

```yaml
networks:
  app-network:
    driver: bridge
```

The backend connects to MySQL using the Compose service name:

```text
database
```

Instead of using a hard-coded IP address:

```text
backend
   │
   ▼
Docker DNS
   │
   ▼
database
```

---

## 🔐 Environment Variables

The backend receives its database configuration through environment variables.

```yaml
environment:
  PORT: 3000
  DB_HOST: database
  DB_PORT: 3306
  DB_USER: appuser
  DB_PASSWORD: apppassword
  DB_NAME: day22db
```

The MySQL service is also configured through environment variables.

```yaml
environment:
  MYSQL_ROOT_PASSWORD: rootpassword
  MYSQL_DATABASE: day22db
  MYSQL_USER: appuser
  MYSQL_PASSWORD: apppassword
```

For a real production project, sensitive credentials should be stored in secrets or protected environment files rather than committed directly to source control.

---

## ❤️ Database Health Check

The MySQL service includes a health check.

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

The backend waits until the database becomes healthy.

```yaml
depends_on:
  database:
    condition: service_healthy
```

This improves startup reliability.

---

## 💾 Persistent Database Storage

A named volume stores MySQL data independently from the database container.

```yaml
volumes:
  - mysql-data:/var/lib/mysql
```

Top-level declaration:

```yaml
volumes:
  mysql-data:
```

Persistence workflow:

```text
MySQL Writes Data
       │
       ▼
Named Volume
       │
       ▼
Containers Removed
       │
       ▼
Volume Remains
       │
       ▼
New MySQL Container
       │
       ▼
Existing Data Restored
```

---

## 🗃️ Database Initialization

The MySQL initialization script creates:

- `day22db` database
- `messages` table
- Initial sample message

```sql
CREATE DATABASE IF NOT EXISTS day22db;

USE day22db;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The file is mounted into:

```text
/docker-entrypoint-initdb.d/init.sql
```

The MySQL image executes initialization scripts during the first database initialization.

---

## 🐳 Frontend Dockerfile

```dockerfile
FROM nginx:alpine

LABEL maintainer="Rumal Medagedara"
LABEL project="Day22 Multi Container App"
LABEL version="1.0"

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

---

## 🐳 Backend Dockerfile

```dockerfile
FROM node:22-alpine

LABEL maintainer="Rumal Medagedara"
LABEL project="Day 22 Multi-Container Application"
LABEL service="backend"
LABEL version="1.0"

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 📄 Docker Compose Configuration

```yaml
services:
  frontend:
    build: ./frontend
    container_name: day22-frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - app-network

  backend:
    build: ./backend
    container_name: day22-backend
    ports:
      - "3000:3000"
    depends_on:
      database:
        condition: service_healthy
    restart: unless-stopped
    environment:
      PORT: 3000
      DB_HOST: database
      DB_PORT: 3306
      DB_USER: appuser
      DB_PASSWORD: apppassword
      DB_NAME: day22db
    networks:
      - app-network

  database:
    image: mysql:8.4
    container_name: day22-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: day22db
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppassword
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test:
        - CMD-SHELL
        - mysqladmin ping -h localhost -uroot -prootpassword
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 30s
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
    driver: bridge
```

---

## 🚀 Starting the Application

Validate the Compose configuration:

```bash
docker compose config
```

Build and start the complete stack:

```bash
docker compose up -d --build
```

Check the services:

```bash
docker compose ps
```

Expected services:

```text
frontend
backend
database
```

The database should report:

```text
healthy
```

---

## 🧪 Application Testing

### Frontend

```text
http://localhost:8080
```

### Backend Root Endpoint

```bash
curl http://localhost:3000
```

### Backend Health Check

```bash
curl http://localhost:3000/health
```

Expected:

```json
{
  "status": "healthy",
  "backend": "connected",
  "database": "connected"
}
```

### Database Messages Endpoint

```bash
curl http://localhost:3000/api/messages
```

---

## 🔍 Docker DNS Test

The backend service resolves the database service name through Docker DNS.

```bash
docker compose exec backend getent hosts database
```

The service name resolves to an internal container IP address.

---

## 🗄️ Direct MySQL Test

Login to MySQL:

```bash
docker compose exec database \
  mysql -uappuser -papppassword day22db
```

View the tables:

```sql
SHOW TABLES;
```

View the messages:

```sql
SELECT * FROM messages;
```

Add a test record:

```sql
INSERT INTO messages (message)
VALUES ('Persistent data created during Day 22 testing');
```

---

## 💾 Database Persistence Test

Remove the application containers and network:

```bash
docker compose down
```

The named volume remains.

Restart the stack:

```bash
docker compose up -d
```

Test the messages endpoint again:

```bash
curl http://localhost:3000/api/messages
```

The previously inserted database record remains available.

This confirms that the named volume preserves database data across container recreation.

---

## 📋 Logs and Troubleshooting

View all logs:

```bash
docker compose logs
```

Backend logs:

```bash
docker compose logs backend
```

Database logs:

```bash
docker compose logs database
```

Follow live logs:

```bash
docker compose logs -f
```

---

## 🔄 Compose Lifecycle

Start the stack:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose stop
```

Start stopped services:

```bash
docker compose start
```

Restart a service:

```bash
docker compose restart backend
```

Remove containers and networks while preserving the named volume:

```bash
docker compose down
```

Remove the stack and persistent volume:

```bash
docker compose down -v
```

The `-v` option permanently removes the database volume and its stored data.

---

## 🛠️ Practical Activities

The following tasks were completed:

- Created a three-service application architecture
- Built a custom Nginx frontend image
- Built a custom Node.js backend image
- Added an Express REST API
- Added MySQL connectivity using `mysql2`
- Configured a MySQL database service
- Created an initialization SQL script
- Defined environment variables
- Created a custom Compose network
- Configured service-name DNS communication
- Created a named database volume
- Configured a MySQL health check
- Controlled service startup dependencies
- Built and started the full stack
- Tested the frontend
- Tested backend API endpoints
- Tested the backend-to-database connection
- Added database records
- Verified persistent storage
- Reviewed individual service logs
- Inspected networks and volumes

---

## 💡 Key Takeaways

- Real-world applications commonly use multiple containers.
- Each container should focus on one logical service.
- Docker Compose stores the application architecture as configuration.
- Compose service names can be used as internal DNS names.
- Health checks improve service startup reliability.
- Environment variables make service configuration portable.
- Named volumes preserve database data independently from containers.
- `depends_on` can coordinate service startup when combined with health checks.
- Frontend, backend, and database services can be managed as one stack.
- The complete stack can be recreated from source files and `compose.yaml`.

---

## ✅ Day 22 Completion

```text
Multi-Container Architecture       ✅
Custom Frontend Image              ✅
Custom Backend Image               ✅
Express REST API                   ✅
MySQL Database                     ✅
Database Initialization            ✅
Environment Variables              ✅
Docker DNS                         ✅
Custom Network                     ✅
Named Volume                       ✅
Health Check                       ✅
Service Dependencies               ✅
Full Stack Deployment              ✅
Database Persistence               ✅
GitHub Documentation               ✅
```

---

## 🚀 Next Step

On **Day 23**, I will study Docker best practices and image optimization.

The next session will cover:

- Smaller Docker images
- Dockerfile layer optimization
- Build cache
- Multi-stage builds
- Non-root containers
- `.dockerignore`
- Secure container configuration
- Image scanning
