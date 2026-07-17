# Day 14 - TCP, UDP, Ports, HTTP, HTTPS, SSH & FTP

## Overview

Today I continued my Networking Fundamentals learning journey by exploring transport layer protocols, network ports, and common application protocols used in modern IT infrastructures.

I studied the differences between TCP and UDP, learned how network ports allow multiple services to communicate on a single device, and explored protocols such as HTTP, HTTPS, SSH, FTP, and SFTP.

These concepts are fundamental for Linux administration, cloud computing, Docker, Kubernetes, CI/CD pipelines, and DevOps engineering.

---

## Topics Covered

- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)
- TCP vs UDP
- Network Ports
- Common Service Ports
- HTTP
- HTTPS
- SSH
- FTP vs SFTP
- Linux Network Inspection Commands

---

## Practical Commands

| Command | Description |
|---------|-------------|
| `ss -tuln` | Display listening TCP and UDP ports |
| `ss -tun` | Display active TCP and UDP connections |
| `netstat -tuln` | Display listening ports (legacy command) |
| `curl http://example.com` | Test an HTTP connection |
| `curl https://example.com` | Test an HTTPS connection |
| `ssh -V` | Display the installed SSH client version |
| `ping google.com` | Test network connectivity |
| `ip addr` | Display network interface configuration |

---

## Key Learning Outcomes

- Understood how TCP provides reliable communication.
- Learned why UDP is preferred for low-latency applications.
- Understood the purpose of network ports.
- Identified common ports used by popular services.
- Learned the differences between HTTP and HTTPS.
- Understood how SSH enables secure remote administration.
- Learned the differences between FTP and SFTP.
- Practiced Linux networking commands to inspect connections and services.

---

## Technologies Used

- Ubuntu Linux
- Linux Networking Utilities
- Bash Terminal
- Git
- GitHub

---

## Repository

This project is part of my **DevOps Learning Journey**, where I document practical Linux, Networking, Cloud, and DevOps concepts through hands-on labs and real-world exercises.
