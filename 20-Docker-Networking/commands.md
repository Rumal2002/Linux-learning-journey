# 🖥️ Day 20 - Docker Networking Commands

## List Docker Networks

```bash
docker network ls
```

---

## Inspect the Default Bridge Network

```bash
docker network inspect bridge
```

---

## Create a Custom Bridge Network

```bash
docker network create day20-network
```

---

## Inspect a Custom Network

```bash
docker network inspect day20-network
```

---

## Run an Nginx Container on the Network

```bash
docker run -d \
  --name day20-web \
  --network day20-network \
  nginx
```

---

## Run an Alpine Client Container

```bash
docker run -it \
  --name day20-client \
  --network day20-network \
  alpine sh
```

---

## Test Container Name Resolution

Inside the Alpine container:

```sh
ping -c 4 day20-web
```

---

## Test HTTP Communication

```sh
wget -qO- http://day20-web
```

---

## Inspect a Container IP Address

```bash
docker inspect \
  -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  day20-web
```

---

## Publish the Nginx Port

```bash
docker rm -f day20-web
```

```bash
docker run -d \
  --name day20-web \
  --network day20-network \
  -p 8080:80 \
  nginx
```

---

## Verify Port Mapping

```bash
docker ps
docker port day20-web
curl http://localhost:8080
```

---

## Create an Isolated Network

```bash
docker network create isolated-network
```

---

## Run an Isolated Container

```bash
docker run -dit \
  --name isolated-client \
  --network isolated-network \
  alpine sh
```

---

## Test Network Isolation

```bash
docker exec isolated-client ping -c 4 day20-web
```

---

## Connect a Running Container

```bash
docker network connect day20-network isolated-client
```

---

## Verify the Connection

```bash
docker network inspect day20-network
```

```bash
docker exec isolated-client ping -c 4 day20-web
```

```bash
docker exec isolated-client wget -qO- http://day20-web
```

---

## Disconnect a Container

```bash
docker network disconnect day20-network isolated-client
```

---

## Test the None Network

```bash
docker run --rm \
  --network none \
  alpine \
  ip addr
```

---

## Run a Container on the Default Bridge

```bash
docker run --rm alpine ip addr
```

---

## Remove Test Containers

```bash
docker rm -f \
  day20-web \
  day20-web-2 \
  day20-client \
  isolated-client
```

---

## Remove Custom Networks

```bash
docker network rm day20-network
docker network rm isolated-network
```

---

## Remove Unused Networks

```bash
docker network prune
```

Skip confirmation:

```bash
docker network prune -f
```
