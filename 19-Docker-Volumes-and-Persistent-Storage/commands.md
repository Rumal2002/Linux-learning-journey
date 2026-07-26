# 🖥️ Day 19 - Docker Volume Commands

## List Docker Volumes

```bash
docker volume ls
```

---

## Create a Named Volume

```bash
docker volume create day19-data
```

---

## Inspect a Volume

```bash
docker volume inspect day19-data
```

Alternative:

```bash
docker inspect --type volume day19-data
```

---

## Run a Container with a Named Volume

```bash
docker run -it \
  --name day19-container-1 \
  --mount source=day19-data,target=/data \
  alpine sh
```

---

## Create Files Inside the Volume

```sh
cd /data
echo "Docker volume persistence test - Day 19" > message.txt
echo "Created by container 1" > container-info.txt
ls -la
cat message.txt
```

---

## Exit the Container

```sh
exit
```

---

## Remove the First Container

```bash
docker rm day19-container-1
```

---

## Reuse the Volume

```bash
docker run -it \
  --name day19-container-2 \
  --mount source=day19-data,target=/data \
  alpine sh
```

---

## Verify Persistent Data

```sh
ls -la /data
cat /data/message.txt
cat /data/container-info.txt
```

---

## Update Persistent Data

```sh
echo "Updated by container 2" >> /data/message.txt
cat /data/message.txt
exit
```

---

## Remove the Second Container

```bash
docker rm day19-container-2
```

---

## Share a Volume Between Containers

Start a writer container:

```bash
docker run -d \
  --name volume-writer \
  --mount source=day19-data,target=/shared \
  alpine \
  sh -c 'while true; do date >> /shared/activity.log; sleep 5; done'
```

Read the file using another container:

```bash
docker run --rm \
  --mount source=day19-data,target=/shared \
  alpine \
  cat /shared/activity.log
```

---

## Execute a Command Inside the Writer Container

```bash
docker exec volume-writer cat /shared/activity.log
```

---

## Stop and Remove the Writer Container

```bash
docker stop volume-writer
docker rm volume-writer
```

---

## Create a Bind Mount Directory

```bash
cd ~
mkdir -p day19-bind-mount
cd day19-bind-mount
```

---

## Create a Host File

```bash
echo "This file was created on the Ubuntu host." > host-message.txt
```

---

## Run a Container with a Bind Mount

```bash
docker run -it \
  --name bind-mount-container \
  --mount type=bind,source="$(pwd)",target=/app \
  alpine sh
```

---

## Access the Host File Inside the Container

```sh
ls -la /app
cat /app/host-message.txt
```

---

## Create a File from the Container

```sh
echo "This file was created inside the container." > /app/container-message.txt
exit
```

---

## Verify the File on the Host

```bash
ls -la
cat container-message.txt
```

---

## Remove the Bind Mount Container

```bash
docker rm bind-mount-container
```

---

## Remove the Named Volume

```bash
docker volume rm day19-data
```

---

## Remove Unused Volumes

```bash
docker volume prune
```

Skip confirmation:

```bash
docker volume prune -f
```

---

## View Docker Disk Usage

```bash
docker system df
```

---

## Practical Command Sequence

```bash
docker volume create day19-data
docker volume ls
docker volume inspect day19-data

docker run -it \
  --name day19-container-1 \
  --mount source=day19-data,target=/data \
  alpine sh

echo "Docker volume persistence test - Day 19" > /data/message.txt
exit

docker rm day19-container-1

docker run -it \
  --name day19-container-2 \
  --mount source=day19-data,target=/data \
  alpine sh

cat /data/message.txt
exit

docker rm day19-container-2

mkdir -p ~/day19-bind-mount
cd ~/day19-bind-mount

echo "This file was created on the Ubuntu host." > host-message.txt

docker run -it \
  --name bind-mount-container \
  --mount type=bind,source="$(pwd)",target=/app \
  alpine sh

cat /app/host-message.txt
echo "This file was created inside the container." > /app/container-message.txt
exit

cat container-message.txt
docker rm bind-mount-container

docker volume rm day19-data
```
