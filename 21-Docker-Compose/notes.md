# 📝 Day 21 - Docker Compose Notes

## Docker Compose

Docker Compose is used to define and run containerized applications through a YAML configuration file.

The recommended filename is:

```text
compose.yaml
```

---

## Compose Application Model

A Compose application can contain:

```text
Services
Networks
Volumes
Configs
Secrets
```

A service represents an application component such as:

```text
Frontend
Backend
Database
Cache
Web Server
Worker
```

---

## Compose File Structure

Basic structure:

```yaml
services:
  service-name:
    image: image-name
```

Example:

```yaml
services:
  web:
    image: nginx:alpine
```

---

## YAML Indentation

YAML uses indentation to represent hierarchy.

Correct:

```yaml
services:
  web:
    image: nginx:alpine
```

Incorrect:

```yaml
services:
web:
image: nginx:alpine
```

Spaces should be used instead of tabs.

---

## `services`

The top-level `services` section defines application components.

Example:

```yaml
services:
  frontend:
    image: nginx

  backend:
    image: node:alpine

  database:
    image: postgres
```

---

## `image`

The `image` attribute specifies an existing Docker image.

```yaml
image: nginx:alpine
```

Compose pulls the image if it is not available locally.

---

## `build`

The `build` attribute creates an image from a Dockerfile.

```yaml
services:
  web:
    build: .
```

Detailed syntax:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
```

---

## `ports`

Port publishing syntax:

```yaml
ports:
  - "8080:80"
```

Meaning:

```text
Host Port 8080 → Container Port 80
```

---

## Bind Mounts

A bind mount maps a host path into a container.

```yaml
volumes:
  - ./html:/usr/share/nginx/html
```

Mapping:

```text
Host ./html
      ↓
Container /usr/share/nginx/html
```

---

## Read-Only Mount

Append `:ro` to make a mount read-only:

```yaml
volumes:
  - ./html:/usr/share/nginx/html:ro
```

The container can read the files but cannot modify them.

---

## Named Volumes

A named volume can be declared at the top level:

```yaml
services:
  database:
    image: postgres
    volumes:
      - database-data:/var/lib/postgresql/data

volumes:
  database-data:
```

Named volumes are useful for persistent application data.

---

## Compose Networks

Custom network example:

```yaml
services:
  web:
    image: nginx
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Compose creates and manages the network when the application starts.

---

## Service Discovery

Services on the same Compose network can communicate using service names.

Example services:

```text
web
client
```

The client can reach the web service using:

```text
http://web
```

Hard-coded IP addresses are unnecessary.

---

## `command`

The `command` attribute overrides the image's default command.

Example:

```yaml
client:
  image: alpine
  command: ["sh", "-c", "sleep infinity"]
```

This keeps the Alpine container running for testing.

---

## `restart`

Example:

```yaml
restart: unless-stopped
```

Common values:

```text
no
always
on-failure
unless-stopped
```

---

## `docker compose config`

```bash
docker compose config
```

This command:

- Parses the Compose file
- Validates YAML syntax
- Resolves variables
- Displays the final configuration

It should normally be run before starting a new stack.

---

## `docker compose up`

```bash
docker compose up -d
```

This command:

- Creates required networks
- Creates service containers
- Creates declared volumes
- Starts the services
- Recreates services when configuration changes

The `-d` option runs the services in detached mode.

---

## `docker compose ps`

```bash
docker compose ps
```

Displays the containers belonging to the current Compose project.

---

## `docker compose logs`

```bash
docker compose logs
```

Shows service logs.

Follow new logs:

```bash
docker compose logs -f
```

---

## `docker compose exec`

```bash
docker compose exec web sh
```

Runs a command inside an existing service container.

---

## `docker compose stop`

```bash
docker compose stop
```

Stops services without removing their containers.

They can be started again using:

```bash
docker compose start
```

---

## `docker compose down`

```bash
docker compose down
```

Stops and removes:

```text
Service containers
Compose-created networks
Default Compose network
```

Named volumes are not removed by default.

To remove named volumes:

```bash
docker compose down -v
```

This should be used carefully when persistent data exists.

---

## Compose Project Naming

Compose normally derives the project name from the project directory.

Project directory:

```text
day21-compose-project
```

Generated resources may use names such as:

```text
day21-compose-project-web-1
day21-compose-project_day21-network
```

---

## Live File Updates

When application files are bind-mounted, host-side changes appear in the container immediately.

```text
Edit Host File
      ↓
Bind Mount
      ↓
Container Sees Updated File
```

A new image build is not required for bind-mounted content.

---

## Compose vs Manual Docker Commands

### Manual Docker

Requires separate commands for:

- Networks
- Volumes
- Containers
- Ports
- Environment variables
- Restart options

### Docker Compose

Stores the complete configuration in one YAML file.

```text
compose.yaml
      ↓
docker compose up
      ↓
Complete Application Stack
```

---

## Common Errors

### YAML Indentation Error

Example:

```text
mapping values are not allowed
```

Validate using:

```bash
docker compose config
```

Check indentation and avoid tabs.

---

### Port Already Allocated

Example:

```text
bind: address already in use
```

Check:

```bash
docker ps
```

Use another host port:

```yaml
ports:
  - "8081:80"
```

---

### Image Pull DNS Error

Example:

```text
no such host
```

Restart DNS and Docker:

```bash
sudo systemctl restart systemd-resolved
sudo systemctl restart docker
```

Then:

```bash
docker pull nginx:alpine
docker compose up -d
```

---

### Service Name Cannot Be Resolved

Check whether both services share the same network:

```bash
docker compose config
docker network inspect <network-name>
```

---

### Read-Only File System

When a mount uses:

```text
:ro
```

the container cannot modify mounted files.

Edit the file from the host instead.

---

## Day 21 Summary

During Day 21, I learned how Docker Compose manages containerized application stacks through a YAML file.

I practiced:

- Writing Compose YAML
- Defining services
- Publishing ports
- Configuring bind mounts
- Using read-only mounts
- Creating custom networks
- Validating Compose files
- Starting and stopping services
- Viewing logs
- Executing container commands
- Recreating application stacks
- Adding multiple services
- Testing service-name DNS

Docker Compose simplifies repeatable multi-container application management.
