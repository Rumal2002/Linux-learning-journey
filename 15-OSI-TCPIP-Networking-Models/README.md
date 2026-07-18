# Day 15 - OSI Model, TCP/IP Model & Network Communication

## Overview

Today I completed the Networking Fundamentals phase of my DevOps learning journey by studying the OSI Model, the TCP/IP Model, and understanding how data travels across the Internet.

I learned how network communication is structured into layers, how different protocols work together, and how a web request travels from a browser to a web server. These concepts provide the foundation for understanding cloud networking, Docker, Kubernetes, reverse proxies, load balancers, and modern DevOps infrastructure.

---

## Topics Covered

- OSI Model
- Seven Layers of the OSI Model
- TCP/IP Model
- OSI vs TCP/IP
- Web Request Lifecycle
- DNS Resolution
- TCP Three-Way Handshake
- HTTPS Communication
- Linux Networking Commands

---

## Practical Commands

| Command | Description |
|---------|-------------|
| `ip route` | Display the system routing table |
| `ss -tun` | Display active TCP and UDP connections |
| `nslookup google.com` | Resolve a domain name into an IP address |
| `curl -I https://google.com` | Display HTTP response headers |
| `traceroute google.com` | Display the network path to a destination |
| `ip addr` | Display network interfaces and IP configuration |
| `hostname` | Display the system hostname |

---

## Web Request Flow

```

User
↓
Browser
↓
DNS Lookup
↓
IP Address
↓
TCP Three-Way Handshake
↓
HTTPS Request
↓
Web Server
↓
Application
↓
Database
↓
Response
↓
Browser

```

---

## Key Learning Outcomes

- Understood the purpose of the OSI Model.
- Learned the responsibilities of all seven OSI layers.
- Understood the TCP/IP Model and its four layers.
- Compared the OSI and TCP/IP models.
- Learned how DNS, TCP, HTTPS, servers, and databases work together to deliver a web page.
- Practiced Linux networking commands to inspect routes and connections.

---

## Technologies Used

- Ubuntu Linux
- Linux Networking Utilities
- Bash Terminal
- Git
- GitHub

---

## Repository

This project is part of my **DevOps Learning Journey**, where I document Linux, Networking, Cloud, and DevOps concepts through hands-on labs and practical exercises.
