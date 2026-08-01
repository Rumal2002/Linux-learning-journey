# 🖥️ Day 22 - Multi-Container Application Commands

## Create the Project Structure

```bash
cd ~

mkdir -p day22-multi-container-app

cd day22-multi-container-app

mkdir frontend backend mysql

touch compose.yaml
touch frontend/Dockerfile
touch frontend/index.html
touch backend/Dockerfile
touch backend/package.json
touch backend/server.js
touch backend/.dockerignore
touch mysql/init.sql
```

---

## Display the Project Structure

```bash
tree
```

---

## Build the Frontend Image

```bash
docker build -t day22-frontend ./frontend
```

---

## Run the Frontend Test Container

```bash
docker run -d \
  --name frontend-test \
  -p 8080:80 \
  day22-frontend
```

---

## Test the Frontend

```bash
curl http://localhost:8080
```

---

## Remove the Frontend Test Container

```bash
docker rm -f frontend-test
```

---

## Validate the Backend `package.json`

```bash
python3 -m json.tool backend/package.json
```

---

## Build the Backend Image

```bash
docker build -t day22-backend:v1 ./backend
```

---

## Run the Backend Test Container

```bash
docker run -d \
  --name backend-test \
  -p 3000:3000 \
  day22-backend:v1
```

---

## Test the Backend

```bash
curl http://localhost:3000
```

```bash
curl http://localhost:3000/health
```

The health endpoint may report a disconnected database during the standalone backend test.

---

## Remove the Backend Test Container

```bash
docker rm -f backend-test
```

---

## Validate the Compose File

```bash
docker compose config
```

---

## Build Compose Images

```bash
docker compose build
```

---

## Start the Complete Application

```bash
docker compose up -d
```

Build and start:

```bash
docker compose up -d --build
```

---

## Check Compose Services

```bash
docker compose ps
```

Include stopped services:

```bash
docker compose ps -a
```

---

## View All Logs

```bash
docker compose logs
```

---

## View Frontend Logs

```bash
docker compose logs frontend
```

---

## View Backend Logs

```bash
docker compose logs backend
```

---

## View Database Logs

```bash
docker compose logs database
```

---

## Follow Live Logs

```bash
docker compose logs -f
```

Exit:

```text
Ctrl + C
```

---

## Test the Frontend

```bash
curl http://localhost:8080
```

Browser:

```text
http://localhost:8080
```

---

## Test the Backend Root Endpoint

```bash
curl http://localhost:3000
```

---

## Test the Health Endpoint

```bash
curl http://localhost:3000/health
```

---

## Test the Messages Endpoint

```bash
curl http://localhost:3000/api/messages
```

---

## Test Docker DNS

```bash
docker compose exec backend getent hosts database
```

If `ping` is available:

```bash
docker compose exec backend ping -c 3 database
```

---

## Access the Backend Container

```bash
docker compose exec backend sh
```

Exit:

```bash
exit
```

---

## Login to MySQL

```bash
docker compose exec database \
  mysql -uappuser -papppassword day22db
```

---

## MySQL Commands

```sql
SHOW TABLES;
```

```sql
SELECT * FROM messages;
```

```sql
INSERT INTO messages (message)
VALUES ('Persistent data created during Day 22 testing');
```

```sql
EXIT;
```

---

## Inspect the Compose Network

```bash
docker network ls
```

```bash
docker network inspect \
  day22-multi-container-app_app-network
```

Use the exact generated network name shown by `docker network ls`.

---

## Inspect the Named Volume

```bash
docker volume ls
```

```bash
docker volume inspect \
  day22-multi-container-app_mysql-data
```

Use the exact generated volume name shown by `docker volume ls`.

---

## Database Persistence Test

Stop and remove containers and networks:

```bash
docker compose down
```

Check that the volume remains:

```bash
docker volume ls
```

Recreate the application:

```bash
docker compose up -d
```

Verify the database data:

```bash
curl http://localhost:3000/api/messages
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

## Restart the Backend

```bash
docker compose restart backend
```

---

## Remove the Stack

```bash
docker compose down
```

---

## Remove the Stack and Database Volume

```bash
docker compose down -v
```

Use `-v` carefully because it permanently deletes the MySQL data.

---

## Final Verification Commands

```bash
docker compose config

docker compose up -d --build

docker compose ps

curl http://localhost:8080

curl http://localhost:3000

curl http://localhost:3000/health

curl http://localhost:3000/api/messages

docker compose logs --tail=30 backend

docker compose logs --tail=30 database
```
