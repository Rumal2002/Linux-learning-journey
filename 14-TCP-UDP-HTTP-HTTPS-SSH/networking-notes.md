# Networking Notes

## TCP (Transmission Control Protocol)

TCP is a connection-oriented protocol that provides reliable, ordered, and error-checked communication between devices.

Characteristics:

- Reliable data delivery
- Connection-oriented
- Error detection and recovery
- Packet retransmission
- Ordered packet delivery

Common Services:

- HTTP
- HTTPS
- SSH
- FTP
- SMTP
- MySQL

---

## UDP (User Datagram Protocol)

UDP is a connectionless protocol designed for fast communication without guaranteeing packet delivery.

Characteristics:

- Faster than TCP
- Connectionless
- Low latency
- No retransmission
- No guaranteed delivery

Common Services:

- DNS
- Video Streaming
- Voice over IP (VoIP)
- Online Gaming
- Live Streaming

---

## TCP vs UDP

| TCP | UDP |
|------|------|
| Connection-oriented | Connectionless |
| Reliable | Faster |
| Error recovery | No recovery |
| Ordered delivery | Unordered delivery |
| Higher overhead | Lower overhead |

---

## Network Ports

A network port is a logical communication endpoint that identifies a specific service running on a device.

An IP address identifies the device, while a port identifies the application or service.

---

## Common Network Ports

| Port | Service |
|------:|---------|
| 20/21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 8080 | Alternative HTTP |

---

## HTTP

HTTP (HyperText Transfer Protocol) is used for communication between web browsers and web servers.

Characteristics:

- Uses Port 80
- Data is transmitted in plain text
- No encryption

---

## HTTPS

HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP.

Characteristics:

- Uses Port 443
- SSL/TLS encryption
- Secure communication
- Protects sensitive information

---

## SSH

SSH (Secure Shell) is a secure protocol used to remotely connect to Linux servers.

Default Port:

22

Common Uses:

- Remote server administration
- Secure file transfers (SCP/SFTP)
- Running remote commands

---

## FTP vs SFTP

FTP:

- File Transfer Protocol
- No encryption
- Less secure

SFTP:

- SSH File Transfer Protocol
- Encrypted using SSH
- Secure file transfers

---

## Summary

TCP, UDP, ports, HTTP, HTTPS, SSH, and FTP are essential networking concepts that support Linux administration, cloud computing, containerization, and DevOps engineering. Understanding these protocols provides the foundation for working with Docker, Kubernetes, AWS, CI/CD pipelines, and production infrastructure.
