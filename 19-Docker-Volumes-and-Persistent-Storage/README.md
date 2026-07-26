# 🐳 Day 19 - Docker Volumes and Persistent Storage

## 📖 Overview

Welcome to **Day 19** of my DevOps Learning Journey.

In this session, I learned how Docker manages persistent application data using **Docker Volumes** and **Bind Mounts**.

Docker containers are designed to be temporary and replaceable. Data written only to a container's writable layer can be lost when that container is removed. Persistent storage solves this problem by storing data independently from the container lifecycle.

During the practical lab, I created a named Docker volume, mounted it into a container, stored files inside it, removed the original container, and attached the same volume to a new container. The files remained available, proving that Docker volumes preserve data independently from containers.

I also practiced bind mounts by sharing a directory between the Ubuntu host system and an Alpine container.

---

## 🎯 Learning Objectives

By the end of Day 19, I was able to:

- Understand why container data can be temporary
- Explain persistent storage
- Understand Docker Volumes
- Understand Bind Mounts
- Differentiate volumes and bind mounts
- Create named Docker volumes
- Mount volumes into containers
- Store persistent data
- Reuse volumes with new containers
- Share one volume between multiple containers
- Inspect and remove volumes
- Create host-to-container bind mounts
- Verify two-way file synchronization

---

## 📚 Topics Covered

- Container Writable Layers
- Persistent Storage
- Docker Volumes
- Named Volumes
- Anonymous Volumes
- Bind Mounts
- Volume Lifecycle
- Volume Inspection
- Volume Sharing
- Data Persistence
- Volume Cleanup

---

## 💾 Why Persistent Storage is Important

Containers are designed to be replaceable.

When data exists only inside a container's writable layer, removing the container also removes that data.

```text
Container
   │
   ├── Application
   ├── Logs
   ├── Uploads
   └── Database Data
```

Without persistent storage:

```text
Remove Container
       ↓
Container Data Lost
```

With persistent storage:

```text
Remove Container
       ↓
Volume Remains
       ↓
New Container Uses Same Volume
       ↓
Data Remains Available
```

---

## 📦 What is a Docker Volume?

A Docker Volume is a persistent storage location managed by Docker.

Volumes exist independently from containers and can be mounted into one or more containers.

```text
Container 1
     │
     ▼
Docker Volume
     ▲
     │
Container 2
```

Common use cases include:

- Database storage
- Uploaded files
- Application logs
- Configuration data
- Shared container data

---

## 📂 What is a Bind Mount?

A Bind Mount maps a specific file or directory from the host machine into a container.

```text
Ubuntu Host Directory
        │
        ▼
Container Directory
```

Changes made on the host are visible inside the container, and changes made by the container are visible on the host.

Bind mounts are especially useful during local development.

---

## 🔍 Docker Volume vs Bind Mount

| Docker Volume | Bind Mount |
|---|---|
| Managed by Docker | Managed through the host filesystem |
| Stored in Docker's storage area | Uses a specific host path |
| More portable | Depends on host directory structure |
| Suitable for persistent application data | Suitable for development and file sharing |
| Easy to reuse between containers | Directly accessible from the host |

---

## 🔄 Volume Lifecycle

```text
Create Volume
      │
      ▼
Mount into Container
      │
      ▼
Write Data
      │
      ▼
Remove Container
      │
      ▼
Create New Container
      │
      ▼
Mount Existing Volume
      │
      ▼
Recover Existing Data
```

---

## 🛠 Practical Lab 1 - Named Volume Persistence

A named volume was created using:

```bash
docker volume create day19-data
```

The volume was mounted into an Alpine container:

```bash
docker run -it \
  --name day19-container-1 \
  --mount source=day19-data,target=/data \
  alpine sh
```

A file was created inside the mounted directory:

```sh
echo "Docker volume persistence test - Day 19" > /data/message.txt
```

The original container was removed:

```bash
docker rm day19-container-1
```

A second container was created using the same volume:

```bash
docker run -it \
  --name day19-container-2 \
  --mount source=day19-data,target=/data \
  alpine sh
```

The original file remained available:

```sh
cat /data/message.txt
```

This demonstrated that volume data survives container removal and recreation.

---

## 🔗 Practical Lab 2 - Sharing a Volume

A background container continuously wrote timestamps to the volume:

```bash
docker run -d \
  --name volume-writer \
  --mount source=day19-data,target=/shared \
  alpine \
  sh -c 'while true; do date >> /shared/activity.log; sleep 5; done'
```

A second temporary container read the same file:

```bash
docker run --rm \
  --mount source=day19-data,target=/shared \
  alpine \
  cat /shared/activity.log
```

This demonstrated that the same Docker volume can be shared by multiple containers.

---

## 📁 Practical Lab 3 - Bind Mount

A directory was created on the Ubuntu host:

```bash
mkdir -p ~/day19-bind-mount
cd ~/day19-bind-mount
```

A host file was created:

```bash
echo "This file was created on the Ubuntu host." > host-message.txt
```

The directory was bind-mounted into a container:

```bash
docker run -it \
  --name bind-mount-container \
  --mount type=bind,source="$(pwd)",target=/app \
  alpine sh
```

Inside the container, the host file was available:

```sh
cat /app/host-message.txt
```

A second file was created inside the container:

```sh
echo "This file was created inside the container." > /app/container-message.txt
```

After exiting the container, the new file was also available on the Ubuntu host.

---

## 🧪 Practical Activities

The following tasks were completed:

- Created a named Docker volume
- Listed Docker volumes
- Inspected volume details
- Mounted a volume into an Alpine container
- Created persistent files
- Removed the original container
- Reused the volume with a new container
- Verified that the data survived
- Shared one volume between two containers
- Created a host directory
- Used a bind mount
- Accessed host files from a container
- Created container files visible on the host
- Removed test containers
- Practiced volume cleanup

---

## 💡 Key Takeaways

- Container writable layers are tied to container lifecycle.
- Docker volumes preserve data independently from containers.
- Named volumes are easier to reuse and manage.
- One volume can be shared between multiple containers.
- Bind mounts map host paths directly into containers.
- Volumes are useful for databases and persistent application data.
- Bind mounts are useful during application development.
- Removing a container does not automatically remove its named volume.
- A volume cannot normally be removed while it is still being used.

---

## ✅ Day 19 Completion

```text
Persistent Storage Fundamentals    ✅
Docker Volumes                     ✅
Named Volume Creation              ✅
Volume Inspection                  ✅
Container Data Persistence         ✅
Volume Reuse                       ✅
Volume Sharing                     ✅
Bind Mounts                        ✅
Host and Container File Sharing    ✅
Volume Cleanup                     ✅
GitHub Documentation               ✅
```

---

## 🚀 Next Step

On **Day 20**, I will learn Docker Networking.

The next session will cover:

- Docker network fundamentals
- Bridge networks
- Container IP addresses
- Custom Docker networks
- Container-to-container communication
- DNS-based container discovery
