# 🐳 Day 21 - Docker Compose Fundamentals

## 📖 Overview

Welcome to **Day 21** of my DevOps Learning Journey.

In this session, I learned how to define and manage multi-container Docker applications using Docker Compose.

Instead of creating containers, networks, port mappings, and bind mounts using multiple manual Docker commands, Docker Compose allows the complete application configuration to be stored in a single YAML file.

During the practical lab, I created an Nginx web application using a `compose.yaml` file. The project included port publishing, a read-only bind mount, a custom bridge network, restart configuration, service lifecycle management, and service-name-based communication.

---

## 🎯 Learning Objectives

By the end of Day 21, I was able to:

- Understand the purpose of Docker Compose
- Understand the Compose application model
- Write a valid `compose.yaml` file
- Define services
- Configure images and commands
- Publish container ports
- Configure bind mounts
- Create custom Compose networks
- Validate Compose configuration
- Start and stop an application stack
- View service logs
- Execute commands inside Compose services
- Recreate an application from configuration
- Add multiple services
- Test service-name DNS resolution

---

## 📚 Topics Covered

- Docker Compose
- Compose Specification
- YAML Syntax
- Compose Services
- Images
- Ports
- Bind Mounts
- Networks
- Restart Policies
- Compose Commands
- Application Lifecycle
- Service Discovery
- Multi-Container Applications

---

## 🧩 What is Docker Compose?

Docker Compose is a tool used to define and run containerized applications using a YAML configuration file.

A Compose file can define:

```text
Services
Networks
Volumes
Ports
Environment Variables
Commands
Dependencies
Restart Policies
```

The complete application can then be started using:

```bash
docker compose up
```

---

## 🔄 Manual Docker vs Docker Compose

### Manual Docker Workflow

```bash
docker network create app-network

docker run -d \
  --name web \
  --network app-network \
  -p 8080:80 \
  -v ./html:/usr/share/nginx/html:ro \
  nginx:alpine
```

### Docker Compose Workflow

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    networks:
      - app-network

networks:
  app-network:
```

Run:

```bash
docker compose up -d
```

Compose makes application configuration easier to store, reproduce, review, and share.

---

## 📁 Project Structure

```text
day21-compose-project/
├── compose.yaml
└── html/
    └── index.html
```

---

## 📄 Compose Configuration

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    networks:
      - day21-network
    restart: unless-stopped

  client:
    image: alpine
    command: ["sh", "-c", "sleep infinity"]
    networks:
      - day21-network

networks:
  day21-network:
    driver: bridge
```

---

## 🧱 Services

The project contains two services:

```text
web
client
```

### Web Service

The `web` service runs the official Nginx Alpine image.

```yaml
web:
  image: nginx:alpine
```

### Client Service

The `client` service runs an Alpine container that remains active for network testing.

```yaml
client:
  image: alpine
  command: ["sh", "-c", "sleep infinity"]
```

---

## 🚪 Port Publishing

The Nginx container port was published using:

```yaml
ports:
  - "8080:80"
```

Mapping:

```text
Host Port 8080
       ↓
Container Port 80
```

The application was accessed using:

```text
http://localhost:8080
```

---

## 📂 Read-Only Bind Mount

The host HTML directory was mounted into the Nginx container:

```yaml
volumes:
  - ./html:/usr/share/nginx/html:ro
```

Mapping:

```text
Host ./html
      ↓
Container /usr/share/nginx/html
```

The `ro` option made the mounted content read-only inside the container.

This allowed host-side HTML changes to appear immediately in the running application while preventing the container from modifying the source files.

---

## 🌐 Compose Network

A custom bridge network was defined:

```yaml
networks:
  day21-network:
    driver: bridge
```

Both services were attached to the network:

```text
web
  │
  ▼
day21-network
  ▲
  │
client
```

---

## 🔍 Service Discovery

The client service reached the web service using the Compose service name:

```bash
docker compose exec client ping -c 4 web
```

The Nginx page was retrieved using:

```bash
docker compose exec client wget -qO- http://web
```

This demonstrated Compose DNS-based service discovery.

Container IP addresses did not need to be manually configured or remembered.

---

## ✅ Compose Configuration Validation

The Compose file was validated using:

```bash
docker compose config
```

This command parsed the YAML file and displayed the resolved configuration.

---

## 🚀 Starting the Application

The application was started in detached mode:

```bash
docker compose up -d
```

The running services were checked using:

```bash
docker compose ps
```

---

## 📋 Viewing Logs

All service logs:

```bash
docker compose logs
```

Live logs:

```bash
docker compose logs -f
```

Web service logs:

```bash
docker compose logs web
```

---

## 🖥️ Executing Commands

A shell was opened inside the web service using:

```bash
docker compose exec web sh
```

The deployed files were inspected:

```sh
ls -la /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
```

---

## 🔄 Application Lifecycle

### Stop Services

```bash
docker compose stop
```

### Start Existing Services

```bash
docker compose start
```

### Restart a Service

```bash
docker compose restart web
```

### Remove the Application Stack

```bash
docker compose down
```

The Compose configuration and application source files remained on the host, allowing the stack to be recreated.

---

## 🛠 Practical Activities

The following practical tasks were completed:

- Created a Docker Compose project directory
- Created a custom static HTML application
- Created a Compose configuration file
- Defined an Nginx service
- Published host port 8080
- Added a read-only bind mount
- Defined a custom bridge network
- Validated the YAML configuration
- Started the application stack
- Tested the application with a browser
- Tested the application with `curl`
- Viewed service logs
- Executed commands inside a service
- Verified the read-only mount
- Updated bind-mounted content
- Inspected the Compose network
- Stopped and restarted services
- Removed and recreated the stack
- Added an Alpine client service
- Tested service-name DNS communication

---

## 💡 Key Takeaways

- Docker Compose stores application infrastructure in a YAML file.
- The `services` section defines application components.
- `docker compose up` creates and starts the application stack.
- `docker compose down` removes service containers and Compose-created networks.
- Bind mounts can provide live access to host application files.
- Read-only mounts reduce unnecessary write access.
- Compose automatically manages application networking.
- Services on the same Compose network can communicate using service names.
- Compose configuration makes container environments reproducible.
- One Compose file can replace several long `docker run` commands.

---

## ✅ Day 21 Completion

```text
Docker Compose Fundamentals       ✅
Compose YAML Syntax               ✅
Services                          ✅
Port Publishing                   ✅
Bind Mounts                       ✅
Custom Networks                   ✅
Configuration Validation          ✅
Application Lifecycle             ✅
Compose Logs                      ✅
Compose Exec                      ✅
Service Discovery                 ✅
Multi-Container Application       ✅
GitHub Documentation              ✅
```

---

## 🚀 Next Step

On **Day 22**, I will build a complete multi-container application using Docker Compose.

The next session will cover:

- Frontend and backend services
- Database service
- Named volumes
- Environment variables
- Service dependencies
- Health checks
- Full application stack management
