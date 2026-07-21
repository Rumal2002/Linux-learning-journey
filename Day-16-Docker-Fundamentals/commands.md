# 🖥 Day 16 Commands

## Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Install Required Packages

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

---

## Add Docker GPG Key

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

---

## Add Docker Repository

```bash
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

## Install Docker

```bash
sudo apt update

sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## Enable Docker

```bash
sudo systemctl enable --now docker
```

---

## Verify Installation

```bash
docker --version

docker compose version

docker buildx version
```

---

## Run First Container

```bash
sudo docker run hello-world
```

---

## Check Images

```bash
docker images
```

---

## Check Containers

```bash
docker ps

docker ps -a
```
