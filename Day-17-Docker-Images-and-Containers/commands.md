# 🖥️ Day 17 - Docker Commands

## Pull the Ubuntu Image

```bash
docker pull ubuntu
```

Downloads the latest Ubuntu image from Docker Hub.

---

## Pull the Nginx Image

```bash
docker pull nginx
```

Downloads the latest Nginx image from Docker Hub.

---

## List Docker Images

```bash
docker images
```

Displays all Docker images stored locally.

Alternative command:

```bash
docker image ls
```

---

## Run a Basic Ubuntu Container

```bash
docker run ubuntu
```

Creates and starts an Ubuntu container.

The container exits immediately because no long-running process is started.

---

## Run an Interactive Ubuntu Container

```bash
docker run -it ubuntu bash
```

Options used:

- `-i` keeps standard input open
- `-t` creates a terminal
- `bash` starts the Bash shell

---

## Commands Used Inside the Container

```bash
pwd
ls
whoami
cat /etc/os-release
uname -a
```

---

## Exit the Interactive Container

```bash
exit
```

Stops the Bash process and exits the container.

---

## List Running Containers

```bash
docker ps
```

Displays only currently running containers.

Alternative command:

```bash
docker container ls
```

---

## List All Containers

```bash
docker ps -a
```

Displays running and stopped containers.

Alternative command:

```bash
docker container ls -a
```

---

## Start an Existing Container

```bash
docker start <container_id>
```

Example:

```bash
docker start a1b2c3d4e5f6
```

A container name can also be used:

```bash
docker start my-container
```

---

## Attach to a Started Container

```bash
docker attach <container_id>
```

Attaches the terminal to the running container's main process.

---

## Start and Attach Interactively

```bash
docker start -ai <container_id>
```

Options:

- `-a` attaches to the container
- `-i` keeps standard input open

---

## Stop a Running Container

```bash
docker stop <container_id>
```

Example:

```bash
docker stop a1b2c3d4e5f6
```

---

## Restart a Container

```bash
docker restart <container_id>
```

Stops and starts the container again.

---

## Remove a Stopped Container

```bash
docker rm <container_id>
```

Example:

```bash
docker rm a1b2c3d4e5f6
```

---

## Force Remove a Running Container

```bash
docker rm -f <container_id>
```

This stops and removes the container immediately.

Use this option carefully.

---

## Remove Multiple Containers

```bash
docker rm <container_id_1> <container_id_2>
```

---

## Remove All Stopped Containers

```bash
docker container prune
```

Docker asks for confirmation before deletion.

Skip confirmation:

```bash
docker container prune -f
```

---

## Remove a Docker Image

```bash
docker rmi <image_name>
```

Example:

```bash
docker rmi nginx
```

Alternative command:

```bash
docker image rm nginx
```

---

## Remove an Image Using Its ID

```bash
docker rmi <image_id>
```

---

## Force Remove an Image

```bash
docker rmi -f <image_name>
```

Use this command carefully.

---

## Remove Unused Images

```bash
docker image prune
```

Skip confirmation:

```bash
docker image prune -f
```

---

## Display Detailed Image Information

```bash
docker inspect ubuntu
```

---

## Display Detailed Container Information

```bash
docker inspect <container_id>
```

---

## View Container Logs

```bash
docker logs <container_id>
```

---

## View Docker Disk Usage

```bash
docker system df
```

---

## Practical Command Sequence

```bash
docker pull ubuntu
docker pull nginx

docker images

docker run ubuntu
docker ps
docker ps -a

docker run -it ubuntu bash

pwd
ls
whoami
cat /etc/os-release
uname -a
exit

docker ps -a

docker start <container_id>
docker stop <container_id>
docker restart <container_id>

docker rm <container_id>
docker rmi nginx
```
