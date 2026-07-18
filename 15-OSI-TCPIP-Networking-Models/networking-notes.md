# Networking Notes

## OSI Model

The OSI (Open Systems Interconnection) Model is a conceptual framework that describes how data travels across a network using seven layers.

| Layer | Name | Responsibility |
|------:|------|----------------|
| 7 | Application | User-facing network services |
| 6 | Presentation | Data formatting and encryption |
| 5 | Session | Session management |
| 4 | Transport | Reliable communication (TCP/UDP) |
| 3 | Network | IP addressing and routing |
| 2 | Data Link | MAC addressing and local delivery |
| 1 | Physical | Transmission of electrical or wireless signals |

---

## TCP/IP Model

The TCP/IP Model is the networking model used by the Internet.

| Layer | Protocol Examples |
|------|-------------------|
| Application | HTTP, HTTPS, DNS, SSH |
| Transport | TCP, UDP |
| Internet | IP, ICMP |
| Network Access | Ethernet, Wi-Fi |

---

## OSI vs TCP/IP

| OSI Model | TCP/IP Model |
|------------|--------------|
| 7 Layers | 4 Layers |
| Conceptual Model | Practical Internet Model |
| Used for learning | Used in real-world networking |

---

## Web Request Lifecycle

When a user enters a website URL in a browser, the following process occurs:

1. The browser sends a DNS query to resolve the domain name.
2. DNS returns the destination IP address.
3. A TCP Three-Way Handshake establishes a reliable connection.
4. An HTTPS request is sent to the web server.
5. The web server processes the request.
6. The application retrieves data from the database if required.
7. The server sends an HTTP response back to the browser.
8. The browser renders the webpage for the user.

---

## Importance for DevOps

Understanding networking models is essential for:

- Linux Administration
- Docker Networking
- Kubernetes Networking
- AWS VPC
- Load Balancers
- Reverse Proxies
- CI/CD Pipelines
- Cloud Infrastructure

---

## Summary

The OSI Model and TCP/IP Model explain how network communication works. Understanding these models makes it easier to troubleshoot applications, configure cloud infrastructure, and build reliable DevOps environments.
