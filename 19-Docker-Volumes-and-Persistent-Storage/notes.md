# 📝 Day 19 - Docker Volumes and Persistent Storage Notes

## Container Writable Layer

Every container receives a writable layer.

Files created inside the container are normally stored in that layer.

```text
Docker Image
     +
Container Writable Layer
     =
Running Container
```

When the container is removed, its writable layer is also removed.

---

## Persistent Storage

Persistent storage keeps data outside the container's writable layer.

This allows data to survive:

- Container stops
- Container removal
- Container recreation
- Image upgrades
- Application redeployment

---

## Docker Volume

A Docker Volume is a persistent data store managed by Docker.

```text
Container
    │
    ▼
Docker Volume
    │
    ▼
Host Storage
```

The volume exists independently from the container.

---

## Named Volume

A named volume uses a user-defined name.

```bash
docker volume create application-data
```

Example:

```text
application-data
```

Named volumes are easy to identify, reuse, inspect, and back up.

---

## Anonymous Volume

An anonymous volume is created without a user-defined name.

Example:

```bash
docker run -v /data alpine
```

Docker generates a random identifier for the volume.

Anonymous volumes may be more difficult to manage.

---

## Volume Mount Syntax

Recommended explicit syntax:

```bash
docker run \
  --mount source=my-volume,target=/data \
  image-name
```

Short syntax:

```bash
docker run \
  -v my-volume:/data \
  image-name
```

Both commands mount the named volume into `/data`.

---

## `--mount` Components

```text
source=my-volume
```

Specifies the Docker volume.

```text
target=/data
```

Specifies the directory inside the container.

---

## Volume Persistence

Example workflow:

```text
Create Volume
      ↓
Container 1 Writes Data
      ↓
Remove Container 1
      ↓
Create Container 2
      ↓
Mount Same Volume
      ↓
Data Still Exists
```

---

## Sharing Volumes

The same volume can be mounted into multiple containers.

```text
Container A
     │
     ▼
 Shared Volume
     ▲
     │
Container B
```

This allows containers to access common data.

Applications must still handle simultaneous file access correctly.

---

## Bind Mount

A bind mount maps a host path directly into a container.

Example:

```bash
docker run \
  --mount type=bind,source="$(pwd)",target=/app \
  alpine
```

Mapping:

```text
Host Current Directory
          ↓
Container /app Directory
```

---

## Volume vs Bind Mount

### Docker Volume

- Managed by Docker
- Stored in Docker-controlled storage
- Easier to reuse
- Better portability
- Suitable for persistent application data
- Commonly used with databases

### Bind Mount

- Uses a specific host path
- Directly accessible from the host
- Dependent on host directory structure
- Useful for local development
- Useful for configuration and source code sharing

---

## Common Volume Commands

Create:

```bash
docker volume create my-volume
```

List:

```bash
docker volume ls
```

Inspect:

```bash
docker volume inspect my-volume
```

Remove:

```bash
docker volume rm my-volume
```

Prune:

```bash
docker volume prune
```

---

## Volume Inspection

```bash
docker volume inspect my-volume
```

Common fields include:

```text
Name
Driver
Mountpoint
Labels
Scope
Options
```

---

## Removing Volumes

A volume normally cannot be removed while it is being used by a container.

Check containers:

```bash
docker ps -a
```

Remove dependent containers:

```bash
docker rm <container_name>
```

Then remove the volume:

```bash
docker volume rm <volume_name>
```

---

## Volume Pruning

```bash
docker volume prune
```

This command removes unused volumes.

Pruning should be used carefully because unused persistent data may still be important.

---

## `--rm` Option

The `--rm` option automatically removes a container when it exits.

Example:

```bash
docker run --rm alpine echo "Temporary container"
```

It removes the container, but an externally created named volume remains unless explicitly removed.

---

## Read-Only Mounts

A volume or bind mount can be mounted as read-only.

Named volume:

```bash
docker run \
  --mount source=my-volume,target=/data,readonly \
  alpine
```

Bind mount:

```bash
docker run \
  --mount type=bind,source="$(pwd)",target=/app,readonly \
  alpine
```

The container can read the mounted data but cannot modify it.

---

## Common Use Cases

### Databases

```text
MySQL
PostgreSQL
MongoDB
Redis
```

Volumes preserve database files.

### Uploaded Files

Volumes can preserve user-uploaded images, videos, and documents.

### Application Logs

Volumes can store logs outside the container lifecycle.

### Development Source Code

Bind mounts can make host source-code changes immediately available inside a development container.

---

## Troubleshooting

### Volume is in Use

Error:

```text
volume is in use
```

Check all containers:

```bash
docker ps -a
```

Inspect the container mounts:

```bash
docker inspect <container_name>
```

Remove the dependent container before removing the volume.

---

### Bind Source Path Does Not Exist

When using `--mount`, Docker may return an error if the host source path does not exist.

Create the directory first:

```bash
mkdir -p ~/my-directory
```

---

### Permission Denied

Bind-mounted files use host filesystem permissions.

Check permissions:

```bash
ls -la
```

Avoid using insecure permission changes such as:

```text
chmod 777
```

unless the security implications are fully understood.

---

### Data Appears Missing

Check that the same volume name is being mounted:

```bash
docker volume ls
```

Inspect the volume:

```bash
docker volume inspect <volume_name>
```

Verify the correct target directory inside the container.

---

## Day 19 Summary

During Day 19, I learned how Docker manages persistent data using volumes and bind mounts.

I practiced:

- Creating named volumes
- Mounting volumes
- Writing persistent data
- Removing and recreating containers
- Recovering existing data
- Sharing volumes between containers
- Inspecting volume information
- Creating bind mounts
- Sharing files between the host and containers
- Removing unused volumes

Docker volumes are essential for stateful applications because they separate application data from the container lifecycle.
