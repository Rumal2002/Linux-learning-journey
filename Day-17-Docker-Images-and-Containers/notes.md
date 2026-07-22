# 📝 Day 17 - Docker Images and Containers Notes

## Docker Image

A Docker Image is a read-only template used to create Docker containers.

It may contain:

- Application code
- Runtime environment
- Libraries
- Dependencies
- Configuration files
- Environment settings

Images are immutable. This means the original image is not directly modified when a container runs.

---

## Docker Container

A Docker Container is an instance of a Docker image.

A container can be:

- Running
- Stopped
- Restarted
- Removed

Each container receives a writable layer on top of the read-only image.

---

## Image and Container Relationship

```text
Image = Blueprint
Container = Instance created from the blueprint
```

Example:

```text
Ubuntu Image
    │
    ├── Ubuntu Container 1
    ├── Ubuntu Container 2
    └── Ubuntu Container 3
```

---

## Docker Hub

Docker Hub is a public Docker image registry.

It allows users to:

- Search for images
- Pull images
- Push custom images
- Manage image repositories
- Use official images
- Share images with teams

---

## Docker Registry

A Docker Registry is a system used to store and distribute Docker images.

Examples:

- Docker Hub
- Amazon Elastic Container Registry
- GitHub Container Registry
- Google Artifact Registry
- Azure Container Registry

---

## Docker Repository

A Docker repository stores different versions of the same image.

Example:

```text
ubuntu:22.04
ubuntu:24.04
ubuntu:latest
```

Here:

- `ubuntu` is the repository name
- `22.04`, `24.04`, and `latest` are tags

---

## Docker Image Tag

A tag identifies a specific version of an image.

Example:

```bash
docker pull ubuntu:24.04
```

When no tag is provided, Docker uses:

```text
latest
```

Example:

```bash
docker pull ubuntu
```

is treated as:

```bash
docker pull ubuntu:latest
```

---

## `docker pull`

The `docker pull` command downloads an image from a registry.

```bash
docker pull nginx
```

Docker downloads the required image layers and stores them locally.

---

## `docker run`

The `docker run` command performs multiple actions:

1. Checks whether the image exists locally
2. Pulls the image if necessary
3. Creates a container
4. Starts the container
5. Runs the configured process

```bash
docker run ubuntu
```

---

## Why Containers Exit

A container runs only while its main process is running.

When the main process finishes, the container stops.

Example:

```bash
docker run ubuntu
```

The container exits because no long-running process is active.

---

## Interactive Mode

Interactive mode allows a user to open a shell inside a container.

```bash
docker run -it ubuntu bash
```

Options:

```text
-i = Interactive input
-t = Terminal allocation
```

---

## Container ID

Every container receives a unique ID.

Example:

```text
a1b2c3d4e5f6
```

Docker commands can use either:

- Full container ID
- Short container ID
- Container name

---

## Container Name

Docker automatically assigns a random name when no name is provided.

A custom name can be assigned using:

```bash
docker run --name my-ubuntu -it ubuntu bash
```

---

## Running Containers

```bash
docker ps
```

Displays only running containers.

---

## All Containers

```bash
docker ps -a
```

Displays:

- Running containers
- Stopped containers
- Exited containers

---

## Starting a Container

```bash
docker start <container_id>
```

This starts an existing stopped container.

---

## Stopping a Container

```bash
docker stop <container_id>
```

Docker requests the process to stop gracefully.

---

## Restarting a Container

```bash
docker restart <container_id>
```

This stops and starts the container.

---

## Removing a Container

```bash
docker rm <container_id>
```

A running container normally must be stopped before removal.

---

## Removing an Image

```bash
docker rmi <image_name>
```

An image cannot normally be removed if a container still depends on it.

The dependent container must first be removed.

---

## Docker Image Layers

Docker images are built using layers.

Each layer represents a change, such as:

- Installing a package
- Copying a file
- Adding configuration
- Setting environment variables

Layers are reusable and help reduce storage and download time.

---

## Image Lifecycle

```text
Pull or Build
      │
      ▼
Store Locally
      │
      ▼
Create Container
      │
      ▼
Run Container
      │
      ▼
Remove Unused Image
```

---

## Container Lifecycle

```text
Created
   │
   ▼
Running
   │
   ├── Stopped
   ├── Restarted
   └── Removed
```

---

## Important Difference

```text
docker pull
```

Downloads only an image.

```text
docker create
```

Creates a container without starting it.

```text
docker start
```

Starts an existing container.

```text
docker run
```

Creates and starts a new container.

---

## Common Troubleshooting

### Permission Denied

Error:

```text
permission denied while trying to connect to the Docker daemon socket
```

Possible solution:

```bash
sudo usermod -aG docker $USER
```

Then log out and log in again.

---

### DNS Resolution Failure

Example error:

```text
lookup production.cloudflare.docker.com: no such host
```

This usually indicates a DNS or network issue.

Possible checks:

```bash
ping -c 4 8.8.8.8
ping -c 4 google.com
```

Restart networking services if required:

```bash
sudo systemctl restart systemd-resolved
sudo systemctl restart NetworkManager
sudo systemctl restart docker
```

---

### Image Cannot Be Removed

Possible reason:

A container still depends on the image.

Check containers:

```bash
docker ps -a
```

Remove the dependent container:

```bash
docker rm <container_id>
```

Then remove the image:

```bash
docker rmi <image_name>
```

---

## Day 17 Summary

During Day 17, I learned how Docker images and containers work together.

I practiced:

- Pulling images
- Listing images
- Running containers
- Using interactive containers
- Inspecting container states
- Starting and stopping containers
- Restarting containers
- Removing containers
- Removing images

This session provided a strong foundation for creating custom Docker images using Dockerfiles.
