# 🐳 Day 20 - Docker Networking

## 📖 Overview

Welcome to **Day 20** of my DevOps Learning Journey.

In this session, I learned how Docker containers communicate with other containers, the Docker host, and external networks.

I explored Docker's default networks, created a user-defined bridge network, deployed Nginx and Alpine containers, and tested container-to-container communication using Docker DNS and container names.

I also practiced publishing container ports, inspecting container IP addresses, testing network isolation, and dynamically connecting and disconnecting running containers from Docker networks.

---

## 🎯 Learning Objectives

By the end of Day 20, I was able to:

- Understand Docker networking fundamentals
- Identify Docker network drivers
- Inspect default Docker networks
- Create custom bridge networks
- Connect containers to networks
- Use container names for communication
- Understand Docker DNS
- Inspect container IP addresses
- Publish container ports
- Test network isolation
- Connect a running container to another network
- Disconnect containers from networks
- Remove unused networks

---

## 📚 Topics Covered

- Docker Networking
- Network Drivers
- Bridge Networks
- Default Bridge Network
- User-Defined Bridge Networks
- Docker DNS
- Container Name Resolution
- Container IP Addresses
- Port Publishing
- Network Isolation
- Multiple Network Connections
- Network Cleanup

---

## 🌐 What is Docker Networking?

Docker networking allows containers to communicate with:

- Other containers
- The Docker host
- External applications
- The internet
- Services running on connected networks

```text
Container
    │
    ▼
Docker Network
    │
    ▼
Other Containers / Host / Internet
```

---

## 🔌 Docker Network Drivers

Docker supports multiple network drivers.

### Bridge

Used for containers running on the same Docker host.

### Host

Allows a container to share the host network stack.

### None

Disables normal external network connectivity.

### Overlay

Supports communication across multiple Docker hosts.

### Macvlan

Allows containers to appear as separate devices on a physical network.

---

## 🌉 User-Defined Bridge Network

A custom bridge network was created using:

```bash
docker network create day20-network
```

Two containers were connected to the network:

```text
day20-web
day20-client
```

Architecture:

```text
day20-client
      │
      ▼
day20-network
      ▲
      │
day20-web
```

---

## 🔍 Docker DNS

Containers connected to the same user-defined network can communicate using container names.

The Alpine client reached the Nginx container using:

```sh
ping -c 4 day20-web
```

The Nginx website was requested using:

```sh
wget -qO- http://day20-web
```

Docker automatically resolved the container name to its internal IP address.

---

## 📍 Container IP Addresses

Container IP addresses were inspected using:

```bash
docker inspect \
  -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  day20-web
```

The complete network configuration was viewed using:

```bash
docker network inspect day20-network
```

Container IP addresses can change when containers are recreated, so container names are generally more reliable for service communication.

---

## 🚪 Port Publishing

The Nginx container port was published using:

```bash
docker run -d \
  --name day20-web \
  --network day20-network \
  -p 8080:80 \
  nginx
```

Port mapping:

```text
Host Port 8080
       ↓
Container Port 80
```

The application was accessed using:

```text
http://localhost:8080
```

---

## 🔐 Network Isolation

A second network was created:

```bash
docker network create isolated-network
```

An Alpine container connected only to that network could not initially reach `day20-web`.

```text
day20-web        → day20-network
isolated-client  → isolated-network
```

Because the containers did not share a network, Docker DNS could not resolve the other container name.

---

## 🔗 Connecting a Running Container

The isolated container was connected to the application network:

```bash
docker network connect day20-network isolated-client
```

After connecting, it could communicate with the Nginx container.

The connection was later removed using:

```bash
docker network disconnect day20-network isolated-client
```

---

## 🛠 Practical Activities

The following practical tasks were completed:

- Listed Docker networks
- Inspected the default bridge network
- Created a custom bridge network
- Deployed an Nginx container
- Deployed an Alpine client container
- Tested container-name resolution
- Tested HTTP communication
- Inspected container IP addresses
- Published a container port
- Accessed Nginx from the host browser
- Created an isolated network
- Verified network isolation
- Connected a container to an additional network
- Disconnected a container from a network
- Deployed multiple web containers
- Tested the none network
- Removed test containers
- Removed custom networks

---

## 💡 Key Takeaways

- Docker networks provide communication and isolation.
- Containers on the same user-defined network can communicate by name.
- Docker DNS avoids hard-coded container IP addresses.
- Custom bridge networks provide better organization and isolation.
- `EXPOSE` documents a port but does not publish it.
- The `-p` option publishes a container port to the host.
- Containers on different networks cannot normally communicate directly.
- A container can connect to multiple Docker networks.
- Container names are more reliable than changing IP addresses.

---

## ✅ Day 20 Completion

```text
Docker Networking Fundamentals      ✅
Network Drivers                     ✅
Custom Bridge Network               ✅
Docker DNS                          ✅
Container-to-Container Networking   ✅
Container IP Inspection             ✅
Port Publishing                     ✅
Network Isolation                   ✅
Network Connect and Disconnect      ✅
Network Cleanup                     ✅
GitHub Documentation                ✅
```

---

## 🚀 Next Step

On **Day 21**, I will learn Docker Compose.

The next session will cover:

- Docker Compose fundamentals
- YAML configuration
- Compose services
- Multi-container applications
- Compose networks
- Compose volumes
- Starting and stopping an application stack
