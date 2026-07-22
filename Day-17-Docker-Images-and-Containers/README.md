# 🐳 Day 17 - Docker Images and Containers

## 📖 Overview

Welcome to **Day 17** of my DevOps Learning Journey.

In this session, I explored one of the most important areas of Docker: **Docker Images and Containers**.

I learned how Docker images act as reusable templates and how containers are created as running instances of those images. I also practiced downloading images from Docker Hub, creating interactive containers, managing the container lifecycle, and removing unused images and containers.

This session helped me understand how Docker packages and runs applications in lightweight and isolated environments.

---

## 🎯 Learning Objectives

By the end of Day 17, I was able to:

- Understand Docker Images
- Understand Docker Containers
- Explain the difference between an image and a container
- Understand Docker Hub and image registries
- Pull Docker images from Docker Hub
- List locally available Docker images
- Create and run containers
- Use interactive containers
- View running and stopped containers
- Start, stop, and restart containers
- Remove containers and images
- Understand the Docker container lifecycle

---

## 📚 Topics Covered

- Docker Images
- Docker Containers
- Docker Hub
- Docker Registries
- Image Tags
- Image Lifecycle
- Container Lifecycle
- Interactive Containers
- Detached and Stopped Containers
- Container Management
- Image Management

---

## 🐳 What is a Docker Image?

A Docker Image is a read-only template used to create Docker containers.

An image contains everything required to run an application, including:

- Application code
- Runtime
- Libraries
- Dependencies
- Configuration files
- Environment settings

A single Docker image can be used to create multiple containers.

```text
Docker Image
     │
     ├── Container 1
     ├── Container 2
     └── Container 3
```

---

## 📦 What is a Docker Container?

A Docker Container is a running or stopped instance of a Docker image.

Containers are:

- Lightweight
- Portable
- Isolated
- Fast to start
- Resource efficient

A container is created when the `docker run` command is executed using an image.

```text
Docker Image
     │
     │ docker run
     ▼
Docker Container
```

---

## 🔍 Docker Image vs Docker Container

| Docker Image | Docker Container |
|---|---|
| Read-only template | Running or stopped instance |
| Static | Dynamic |
| Used to create containers | Created from an image |
| Does not execute by itself | Executes a process |
| Can create multiple containers | Has its own writable layer |

---

## 🌐 Docker Hub

Docker Hub is a cloud-based registry used to store and distribute Docker images.

It provides official and community-maintained images such as:

- Ubuntu
- Nginx
- MySQL
- PostgreSQL
- Redis
- Node.js
- Python
- Java

Images can be downloaded from Docker Hub using the `docker pull` command.

Example:

```bash
docker pull ubuntu
```

---

## 🔄 Docker Image Lifecycle

```text
Dockerfile
    │
    │ docker build
    ▼
Docker Image
    │
    │ docker push
    ▼
Docker Registry
    │
    │ docker pull
    ▼
Local Docker Image
    │
    │ docker run
    ▼
Docker Container
```

---

## 🔁 Docker Container Lifecycle

```text
Create
  │
  ▼
Start
  │
  ▼
Running
  │
  ├── Stop
  ├── Restart
  └── Remove
```

A container can move through several states:

- Created
- Running
- Paused
- Stopped
- Exited
- Removed

---

## 🛠 Practical Activities

The following practical tasks were completed:

- Pulled the Ubuntu image
- Pulled the Nginx image
- Listed local Docker images
- Created a basic Ubuntu container
- Created an interactive Ubuntu container
- Executed Linux commands inside a container
- Exited and stopped the container
- Listed running containers
- Listed all containers
- Started an existing container
- Stopped a running container
- Restarted a container
- Removed stopped containers
- Removed unused Docker images

---

## 💻 Interactive Ubuntu Container

The following command was used to create an interactive Ubuntu container:

```bash
docker run -it ubuntu bash
```

Inside the container, several Linux commands were executed:

```bash
pwd
ls
whoami
cat /etc/os-release
uname -a
```

The container shell was closed using:

```bash
exit
```

---

## 💡 Why Does `docker run ubuntu` Exit Immediately?

A Docker container continues running only while its main process is active.

When the following command is executed:

```bash
docker run ubuntu
```

the Ubuntu image does not start a long-running process. Therefore, the container starts and exits immediately.

The interactive command below starts the Bash process and keeps the container active while the terminal session is open:

```bash
docker run -it ubuntu bash
```

---

## 📂 Files

- `README.md` - Complete Day 17 documentation
- `commands.md` - Docker commands used during the practical session
- `notes.md` - Key concepts and revision notes

---

## 💡 Key Takeaways

- Docker images are reusable templates.
- Docker containers are instances created from images.
- One image can create multiple containers.
- Containers run only while their main process is active.
- Docker Hub provides ready-to-use images.
- `docker ps` displays running containers.
- `docker ps -a` displays all containers.
- Containers must usually be stopped before removal.
- Images cannot be removed while dependent containers still exist.

---

## ✅ Day 17 Completion

```text
Docker Images                   ✅
Docker Containers               ✅
Docker Hub                      ✅
Pulling Images                  ✅
Interactive Containers          ✅
Container Lifecycle Management  ✅
Image and Container Removal     ✅
GitHub Documentation            ✅
```

---

## 🚀 Next Step

On **Day 18**, I will learn how to create custom Docker images using a `Dockerfile`.

The next session will cover:

- Dockerfile fundamentals
- Dockerfile instructions
- Building custom images
- Running custom containers
- Tagging Docker images
