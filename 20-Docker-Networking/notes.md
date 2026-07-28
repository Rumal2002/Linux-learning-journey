# 📝 Day 20 - Docker Networking Notes

## Docker Networking

Docker networking enables communication between containers, hosts, and external systems.

A container may connect to one or more Docker networks.

---

## Default Networks

Docker commonly provides:

```text
bridge
host
none
```

### Bridge

The default network for containers when no network is specified.

### Host

The container shares the host network stack.

### None

The container has no normal external network connectivity.

---

## User-Defined Bridge Network

A custom bridge network is created using:

```bash
docker network create app-network
```

Benefits include:

- Automatic DNS
- Container-name communication
- Better isolation
- Easier application organization
- Ability to connect and disconnect containers

---

## Docker DNS

Docker provides name resolution between containers connected to the same user-defined network.

Example:

```text
Backend container name: backend
```

Other containers on the same network can use:

```text
http://backend
```

instead of using a changing IP address.

---

## Container IP Address

Each container connected to a bridge network normally receives an internal IP address.

Example:

```text
172.18.0.2
```

Container IP addresses may change after recreation, so names are preferred.

---

## Port Publishing

Container ports are internal by default.

Publish a port using:

```bash
docker run -p 8080:80 nginx
```

Mapping:

```text
Host 8080 → Container 80
```

---

## `EXPOSE` vs `-p`

```dockerfile
EXPOSE 80
```

Documents the expected container port.

```bash
docker run -p 8080:80 image-name
```

Publishes the port to the host.

---

## Network Isolation

Containers on separate user-defined networks are normally isolated.

To communicate, they must:

- Share a Docker network
- Be connected to an additional common network
- Communicate through explicitly published services

---

## Multiple Networks

A container can connect to multiple networks.

```bash
docker network connect second-network container-name
```

This is useful when a service must communicate with multiple application layers.

Example:

```text
Frontend → frontend-network

Backend → frontend-network + database-network

Database → database-network
```

---

## Common Commands

```bash
docker network ls
docker network create network-name
docker network inspect network-name
docker network connect network-name container-name
docker network disconnect network-name container-name
docker network rm network-name
docker network prune
```

---

## Troubleshooting

### Container Name Cannot Be Resolved

Check whether both containers share the same network:

```bash
docker network inspect network-name
```

### Port Already Allocated

Check running containers:

```bash
docker ps
```

Use a different host port:

```bash
docker run -p 8081:80 nginx
```

### Network is in Use

Remove or disconnect attached containers before removing the network.

```bash
docker network inspect network-name
```

```bash
docker network disconnect network-name container-name
```

### Container Has No Internet Access

Check the container network:

```bash
docker inspect container-name
```

Verify that it is not using:

```text
none
```

---

## Day 20 Summary

During Day 20, I learned how Docker networking provides communication, DNS-based discovery, port publishing, and isolation.

I practiced:

- Inspecting default networks
- Creating custom bridge networks
- Connecting containers
- Communicating by container name
- Inspecting IP addresses
- Publishing ports
- Testing network isolation
- Connecting and disconnecting running containers
- Removing containers and networks

Docker networking is essential for building secure and organized multi-container applications.
