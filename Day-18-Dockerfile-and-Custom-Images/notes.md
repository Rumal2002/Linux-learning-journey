# 📝 Day 18 - Dockerfile and Custom Images Notes

## Dockerfile

A Dockerfile is a text file containing instructions used by Docker to build an image.

The standard filename is:

```text
Dockerfile
```

It does not normally require a file extension.

---

## Docker Build Process

```text
Dockerfile
    +
Application Files
    │
    │ docker build
    ▼
Docker Image
    │
    │ docker run
    ▼
Docker Container
```

---

## Build Context

The build context is the collection of files available to the Docker builder during an image build.

Example:

```bash
docker build -t rumal-docker-web:v1 .
```

The final dot means:

```text
Use the current directory as the build context.
```

Docker can only copy files that exist inside the build context.

---

## `FROM`

The `FROM` instruction defines the base image.

```dockerfile
FROM nginx:alpine
```

The project used the official Nginx Alpine image because it is lightweight.

---

## `LABEL`

The `LABEL` instruction adds metadata to an image.

```dockerfile
LABEL maintainer="Rumal Medagedara"
LABEL project="Day 18 Dockerfile Practical"
LABEL version="1.0"
```

Metadata can be viewed using:

```bash
docker inspect <image_name>
```

---

## `COPY`

The `COPY` instruction copies files from the build context into the image.

```dockerfile
COPY index.html /usr/share/nginx/html/index.html
```

The first path refers to the host project directory.

The second path refers to the location inside the Docker image.

---

## `EXPOSE`

The `EXPOSE` instruction documents the port used by the application.

```dockerfile
EXPOSE 80
```

It does not automatically publish the port to the host.

Port publishing is performed using:

```bash
docker run -p 8080:80 image-name
```

---

## `RUN`

The `RUN` instruction executes a command while the image is being built.

Example:

```dockerfile
RUN apk add --no-cache curl
```

`RUN` creates a new image layer.

---

## `CMD`

The `CMD` instruction defines the default command executed when a container starts.

Example:

```dockerfile
CMD ["nginx", "-g", "daemon off;"]
```

The official Nginx image already provides its own default command, so it was not necessary to add a `CMD` instruction in this project.

---

## `RUN` vs `CMD`

```text
RUN = Executes during image build
CMD = Executes when the container starts
```

---

## Docker Image Layers

Docker images consist of reusable layers.

Example:

```text
Nginx Alpine Base Layer
        +
Metadata Layer
        +
Website File Layer
        =
Custom Docker Image
```

Layers help improve:

- Build speed
- Storage efficiency
- Image reuse
- Caching

---

## Docker Build Cache

Docker caches previously built layers.

When rebuilding an image, unchanged instructions may use cached layers.

Example:

```text
CACHED
```

appearing in the build output means Docker reused an existing layer.

Changing `index.html` normally causes the `COPY` layer and following layers to be rebuilt.

---

## Image Name and Tag

Example:

```text
rumal-docker-web:v1
```

Breakdown:

```text
rumal-docker-web = Image repository name
v1               = Image tag
```

Tags are useful for versioning.

Examples:

```text
rumal-docker-web:v1
rumal-docker-web:v2
rumal-docker-web:latest
```

---

## `docker build`

The command below builds an image:

```bash
docker build -t rumal-docker-web:v1 .
```

Docker performs these steps:

1. Reads the Dockerfile
2. Loads the build context
3. Pulls the base image if required
4. Executes the instructions
5. Creates image layers
6. Assigns the image name and tag

---

## Detached Mode

The `-d` option runs the container in the background.

```bash
docker run -d image-name
```

This allows the terminal to remain available.

---

## Container Naming

A custom container name can be assigned using:

```bash
docker run --name rumal-web-container image-name
```

A custom name makes container management easier.

---

## Port Publishing

```bash
docker run -p 8080:80 image-name
```

Port mapping:

```text
Host Port 8080
        ↓
Container Port 80
```

The application can then be accessed using:

```text
http://localhost:8080
```

---

## `docker exec`

The `docker exec` command runs a command inside an existing running container.

Example:

```bash
docker exec -it rumal-web-container sh
```

This opens an interactive shell inside the container.

---

## `docker logs`

The `docker logs` command displays output produced by the container process.

```bash
docker logs rumal-web-container
```

For Nginx, this may include HTTP request logs.

---

## `docker inspect`

The `docker inspect` command displays detailed JSON information.

```bash
docker inspect rumal-web-container
```

It includes:

- Container configuration
- Network settings
- Mounts
- Environment variables
- Image information
- Container state

---

## `docker history`

The `docker history` command displays the layers of an image.

```bash
docker history rumal-docker-web:v1
```

---

## Image Versioning

After changing the application, a new tag can be created.

```bash
docker build -t rumal-docker-web:v2 .
```

This allows multiple image versions to exist at the same time.

---

## Common Dockerfile Errors

### Missing Closing Quote

Incorrect:

```dockerfile
LABEL project="Day 18 Dockerfile Practical
```

Correct:

```dockerfile
LABEL project="Day 18 Dockerfile Practical"
```

A missing quote can produce:

```text
unexpected end of statement while looking for matching double-quote
```

---

### Inconsistent Instruction Casing

Incorrect:

```dockerfile
from nginx:alpine
```

Recommended:

```dockerfile
FROM nginx:alpine
```

Docker instructions are conventionally written using uppercase letters.

---

### Missing Build Context

Incorrect:

```bash
docker build -t rumal-docker-web:v1
```

Correct:

```bash
docker build -t rumal-docker-web:v1 .
```

The Docker build command requires a build context.

---

### Port Already in Use

Example error:

```text
port is already allocated
```

Check running containers:

```bash
docker ps
```

Stop the container using the port:

```bash
docker stop <container_name>
```

Alternatively, use a different host port:

```bash
docker run -p 8081:80 image-name
```

---

### Container Name Already Exists

Example error:

```text
The container name is already in use
```

Remove the old container:

```bash
docker rm -f rumal-web-container
```

Then run the new container again.

---

## Day 18 Summary

During Day 18, I learned how to create custom Docker images using a Dockerfile.

I practiced:

- Writing Dockerfile instructions
- Creating a static website
- Using the Nginx Alpine base image
- Building custom images
- Tagging image versions
- Running containers
- Publishing ports
- Testing a containerized website
- Inspecting images and containers
- Accessing a running container
- Creating version 2 of an image

This session introduced the complete Docker image build and deployment workflow.
