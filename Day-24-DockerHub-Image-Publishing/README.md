🐳 Day 24 -- Docker Hub Image Publishing

📖 Overview

Welcome to Day 24 of my DevOps Learning Journey.

This project demonstrates the complete workflow of publishing Dockerimages to Docker Hub, including authentication, tagging, semanticversioning, pushing, pulling, and sharing images.

🎯 Learning Objectives

Create a Docker Hub account

Login using Docker CLI

Build Docker images

Tag images professionally

Push and pull images

Understand semantic versioning

Understand public vs private repositories

Follow Docker Hub best practices

🏗 Project Structure

day24-dockerhub-image-publishing/
├── README.md
├── commands.md
├── notes.md
├── project/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── screenshots/

🌐 Docker Hub Workflow

Source Code
    │
docker build
    │
Local Image
    │
docker tag
    │
docker push
    │
Docker Hub
    │
docker pull
    │
Deployment

🏷 Image Naming

Format:

USERNAME/REPOSITORY:TAG

Example:

rumalmedagedara/day24-node-app:1.0.0

🔖 Semantic Versioning

MAJOR

MINOR

PATCH

Examples:

1.0.0
1.0.1
1.1.0
2.0.0

🚀 Common Commands

docker login
docker build -t day24-node-app:v1 ./app
docker tag day24-node-app:v1 YOUR_USERNAME/day24-node-app:1.0.0
docker push YOUR_USERNAME/day24-node-app:1.0.0
docker pull YOUR_USERNAME/day24-node-app:1.0.0
docker run -d -p 3000:3000 YOUR_USERNAME/day24-node-app:1.0.0

⭐ Best Practices

Use semantic versioning

Avoid relying only on latest

Keep images small

Use .dockerignore

Do not store secrets inside images

Scan images regularly

Rebuild images with updated base images

🛠 Practical Activities

Docker Hub account creation

Docker CLI login

Image build

Image tagging

Repository creation

Push image

Pull image

Run published image

💡 Interview Questions

What is Docker Hub?

Docker Hub is a cloud-based registry used to store and distribute Dockerimages.

What is an image tag?

A version label that identifies a specific image build.

Difference between docker push and docker pull?

push uploads an image.

pull downloads an image.

✅ Day 24 Completion

Docker Hub Account      ✅
Docker Login            ✅
Image Build             ✅
Image Tagging           ✅
Image Publishing        ✅
Image Download          ✅
Versioning              ✅
GitHub Documentation    ✅

🚀 Next Step

Day 25 -- Docker Volumes Deep Dive and Persistent Storage.
