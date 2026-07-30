# 🖥️ Day 21 - Docker Compose Commands

## Verify Docker Compose

```bash
docker compose version
```

---

## Create the Project

```bash
cd ~
mkdir -p day21-compose-project/html
cd day21-compose-project
```

---

## Create the HTML File

```bash
nano html/index.html
```

---

## Create the Compose File

```bash
nano compose.yaml
```

---

## Display the Project Structure

```bash
find . -maxdepth 3 -type f
```

---

## Display the Compose File

```bash
cat -n compose.yaml
```

---

## Validate the Compose File

```bash
docker compose config
```

---

## Start the Application

Foreground:

```bash
docker compose up
```

Detached mode:

```bash
docker compose up -d
```

---

## Build and Start

```bash
docker compose up -d --build
```

---

## List Compose Services

```bash
docker compose ps
```

Include stopped services:

```bash
docker compose ps -a
```

---

## Test the Web Application

```bash
curl http://localhost:8080
```

Browser URL:

```text
http://localhost:8080
```

---

## View Logs

```bash
docker compose logs
```

Follow logs:

```bash
docker compose logs -f
```

Specific service:

```bash
docker compose logs web
```

---

## Execute a Command Inside a Service

```bash
docker compose exec web sh
```

Inside the container:

```sh
hostname
ls -la /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
nginx -v
exit
```

---

## Test the Read-Only Mount

```bash
docker compose exec web sh
```

Inside:

```sh
echo "Testing write access" > /usr/share/nginx/html/test.txt
```

Expected:

```text
Read-only file system
```

---

## View the Compose Network

```bash
docker network ls
```

```bash
docker network inspect day21-compose-project_day21-network
```

---

## Get a Service Container ID

```bash
docker compose ps -q web
```

---

## Inspect a Compose Container

```bash
docker inspect "$(docker compose ps -q web)"
```

---

## Restart a Service

```bash
docker compose restart web
```

---

## Stop Services

```bash
docker compose stop
```

---

## Start Existing Services

```bash
docker compose start
```

---

## Remove the Application Stack

```bash
docker compose down
```

---

## Remove Stack and Named Volumes

```bash
docker compose down -v
```

Use `-v` carefully because it can remove persistent data.

---

## Add the Client Service

```yaml
client:
  image: alpine
  command: ["sh", "-c", "sleep infinity"]
  networks:
    - day21-network
```

---

## Apply Compose Changes

```bash
docker compose config
docker compose up -d
```

---

## Test Service DNS

```bash
docker compose exec client ping -c 4 web
```

---

## Test Service HTTP Communication

```bash
docker compose exec client wget -qO- http://web
```

---

## View Container Resource Usage

```bash
docker compose stats
```

Exit:

```text
Ctrl + C
```

---

## Final Cleanup

```bash
docker compose down
```

---

## Practical Command Sequence

```bash
cd ~
mkdir -p day21-compose-project/html
cd day21-compose-project

nano html/index.html
nano compose.yaml

docker compose version
docker compose config
docker compose up -d

docker compose ps
curl http://localhost:8080

docker compose logs web
docker compose exec web sh
exit

docker network ls

docker compose stop
docker compose start
docker compose restart web

docker compose down
docker compose up -d

docker compose exec client ping -c 4 web
docker compose exec client wget -qO- http://web

docker compose down
```
