# 🖥️ Day 18 - Dockerfile Commands

## Create the Project Directory

```bash
cd ~
mkdir -p day-18-dockerfile-project
cd day-18-dockerfile-project
```

---

## Create the HTML File

```bash
nano index.html
```

---

## Create the Dockerfile

```bash
touch Dockerfile
nano Dockerfile
```

---

## List Project Files

```bash
ls -la
```

---

## Display the Dockerfile

```bash
cat Dockerfile
```

Display with line numbers:

```bash
cat -n Dockerfile
```

---

## Build the Custom Docker Image

```bash
docker build -t rumal-docker-web:v1 .
```

---

## List Docker Images

```bash
docker images
```

Alternative:

```bash
docker image ls
```

---

## Run the Custom Container

```bash
docker run -d \
  --name rumal-web-container \
  -p 8080:80 \
  rumal-docker-web:v1
```

Options:

```text
-d              Run in detached mode
--name          Assign a container name
-p 8080:80      Map host port 8080 to container port 80
```

---

## List Running Containers

```bash
docker ps
```

---

## List All Containers

```bash
docker ps -a
```

---

## Test the Website

```bash
curl http://localhost:8080
```

Browser URL:

```text
http://localhost:8080
```

---

## View Container Logs

```bash
docker logs rumal-web-container
```

Follow live logs:

```bash
docker logs -f rumal-web-container
```

---

## Inspect the Container

```bash
docker inspect rumal-web-container
```

---

## Display the Container IP Address

```bash
docker inspect \
  -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  rumal-web-container
```

---

## View Image History

```bash
docker history rumal-docker-web:v1
```

---

## Access the Running Container

```bash
docker exec -it rumal-web-container sh
```

Commands inside the container:

```bash
whoami
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
```

Exit:

```bash
exit
```

---

## Stop the Container

```bash
docker stop rumal-web-container
```

---

## Start the Container

```bash
docker start rumal-web-container
```

---

## Restart the Container

```bash
docker restart rumal-web-container
```

---

## Build Image Version 2

```bash
docker build -t rumal-docker-web:v2 .
```

---

## Verify Both Image Versions

```bash
docker images
```

Expected image tags:

```text
rumal-docker-web:v1
rumal-docker-web:v2
```

---

## Remove the Old Container

```bash
docker stop rumal-web-container
docker rm rumal-web-container
```

---

## Run Version 2

```bash
docker run -d \
  --name rumal-web-container-v2 \
  -p 8080:80 \
  rumal-docker-web:v2
```

---

## Verify Version 2

```bash
docker ps
curl http://localhost:8080
docker logs rumal-web-container-v2
```

---

## Remove a Container

```bash
docker rm <container_name>
```

Force removal:

```bash
docker rm -f <container_name>
```

---

## Remove an Image

```bash
docker rmi rumal-docker-web:v1
```

---

## Practical Command Sequence

```bash
cd ~
mkdir -p day-18-dockerfile-project
cd day-18-dockerfile-project

nano index.html
touch Dockerfile
nano Dockerfile

ls -la
cat Dockerfile

docker build -t rumal-docker-web:v1 .

docker images

docker run -d \
  --name rumal-web-container \
  -p 8080:80 \
  rumal-docker-web:v1

docker ps
curl http://localhost:8080
docker logs rumal-web-container
docker inspect rumal-web-container
docker history rumal-docker-web:v1

docker exec -it rumal-web-container sh
exit

docker build -t rumal-docker-web:v2 .

docker stop rumal-web-container
docker rm rumal-web-container

docker run -d \
  --name rumal-web-container-v2 \
  -p 8080:80 \
  rumal-docker-web:v2

docker ps
curl http://localhost:8080
```
