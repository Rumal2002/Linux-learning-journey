# 🐳 Day 18 - Dockerfile and Custom Docker Images

## 📖 Overview

Welcome to **Day 18** of my DevOps Learning Journey.

In this session, I learned how to create custom Docker images using a `Dockerfile`.

After working with existing Docker images and containers, I created a simple static website, wrote a Dockerfile using the official Nginx Alpine image, built a custom Docker image, and deployed the website inside a Docker container.

This practical session introduced the complete workflow of converting application files into a reusable Docker image.

---

## 🎯 Learning Objectives

By the end of Day 18, I was able to:

- Understand what a Dockerfile is
- Explain why Dockerfiles are used
- Understand common Dockerfile instructions
- Create a simple static web application
- Write a Dockerfile
- Build a custom Docker image
- Tag Docker images
- Create containers from custom images
- Publish container ports
- Access a containerized application from a browser
- Inspect Docker images and containers
- View image layers
- Create multiple versions of a custom image

---

## 📚 Topics Covered

- Dockerfile Fundamentals
- Docker Build Context
- Dockerfile Instructions
- Docker Image Layers
- Docker Build Cache
- Custom Docker Images
- Image Tags
- Port Publishing
- Container Deployment
- Image Versioning

---

## 📄 What is a Dockerfile?

A Dockerfile is a text-based configuration file containing instructions used to build a Docker image.

The standard filename is:

```text
Dockerfile
```

It normally does not use a file extension.

Example:

```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

Docker reads the instructions in order and creates an image from them.

---

## 🔄 Dockerfile Workflow

```text
Application Files
       +
Dockerfile
       │
       │ docker build
       ▼
Custom Docker Image
       │
       │ docker run
       ▼
Docker Container
       │
       ▼
Running Application
```

---

## 🧱 Dockerfile Instructions Used

### `FROM`

Defines the base image.

```dockerfile
FROM nginx:alpine
```

The project used the lightweight Nginx Alpine image.

---

### `LABEL`

Adds metadata to the image.

```dockerfile
LABEL maintainer="Rumal Medagedara"
LABEL project="Day 18 Dockerfile Practical"
LABEL version="1.0"
```

---

### `COPY`

Copies files from the build context into the image.

```dockerfile
COPY index.html /usr/share/nginx/html/index.html
```

---

### `EXPOSE`

Documents the port used by the application inside the container.

```dockerfile
EXPOSE 80
```

The port is published to the host using the `-p` option when running the container.

---

## 🛠 Practical Project

A simple static website was created and served using Nginx inside a Docker container.

Project structure:

```text
project/
├── Dockerfile
└── index.html
```

---

## 📄 Dockerfile

```dockerfile
FROM nginx:alpine

LABEL maintainer="Rumal Medagedara"
LABEL project="Day 18 Dockerfile Practical"
LABEL version="1.0"

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

---

## 🌐 Static Website

The `index.html` file contains a simple landing page displaying:

```text
Hello from Docker!
```

The page confirms that the custom website is running inside an Nginx Docker container.

---

## 🏗️ Building the Custom Image

The custom image was built using:

```bash
docker build -t rumal-docker-web:v1 .
```

Command breakdown:

```text
docker build            Build a Docker image
-t                      Assign a name and tag
rumal-docker-web        Image name
v1                      Image tag
.                       Current directory as build context
```

---

## 🚀 Running the Container

The custom container was started using:

```bash
docker run -d \
  --name rumal-web-container \
  -p 8080:80 \
  rumal-docker-web:v1
```

Port mapping:

```text
Host Port 8080 → Container Port 80
```

The website was accessed using:

```text
http://localhost:8080
```

---

## 🔍 Verifying the Deployment

The running container was verified using:

```bash
docker ps
```

The application was also tested from the terminal:

```bash
curl http://localhost:8080
```

---

## 📋 Inspecting the Container

Container details were viewed using:

```bash
docker inspect rumal-web-container
```

Container logs were viewed using:

```bash
docker logs rumal-web-container
```

---

## 🧱 Inspecting Image Layers

The image history was viewed using:

```bash
docker history rumal-docker-web:v1
```

This demonstrated how Docker images are composed of multiple reusable layers.

---

## 🖥️ Accessing the Running Container

The running Nginx container was accessed using:

```bash
docker exec -it rumal-web-container sh
```

Inside the container, the deployed website files were verified.

```bash
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
```

---

## 🏷️ Creating Image Version 2

The website content was updated and a second image version was created.

```bash
docker build -t rumal-docker-web:v2 .
```

Both image versions were available locally:

```text
rumal-docker-web:v1
rumal-docker-web:v2
```

The old container was removed and a new container was created from version 2.

```bash
docker run -d \
  --name rumal-web-container-v2 \
  -p 8080:80 \
  rumal-docker-web:v2
```

---

## 🛠 Practical Activities

The following practical tasks were completed:

- Created a Docker project directory
- Created a static HTML website
- Created a Dockerfile
- Used the Nginx Alpine base image
- Added image metadata using labels
- Copied website files into the image
- Exposed port 80
- Built a custom image
- Tagged the image as version 1
- Created a container from the image
- Published container port 80 to host port 8080
- Tested the website using a browser
- Tested the website using `curl`
- Viewed container logs
- Inspected the container
- Viewed image history
- Accessed the running container shell
- Updated the website
- Built image version 2
- Deployed a new container from version 2

---

## 💡 Key Takeaways

- A Dockerfile automates image creation.
- `FROM` defines the base image.
- `COPY` adds application files to the image.
- `EXPOSE` documents the application port.
- `docker build` creates an image from a Dockerfile.
- The final dot in `docker build` defines the build context.
- Image tags can be used for versioning.
- One Dockerfile can create multiple image versions.
- Port publishing is required to access a containerized web application from the host.
- Docker images are composed of reusable layers.

---

## ✅ Day 18 Completion

```text
Dockerfile Fundamentals        ✅
Dockerfile Instructions        ✅
Static Website Creation        ✅
Custom Image Build             ✅
Image Tagging                  ✅
Container Deployment           ✅
Port Publishing                ✅
Browser Testing                ✅
Container Inspection           ✅
Image Layer Inspection         ✅
Image Versioning               ✅

```

---

## 🚀 Next Step

On **Day 19**, I will learn Docker Volumes and persistent storage.

The next session will cover:

- Why container data is temporary
- Docker Volumes
- Bind Mounts
- Volume Management
- Persistent Application Data
