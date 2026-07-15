# Day 13 - MAC Address, ARP, DNS & DHCP

## Overview

Today I continued my Networking Fundamentals learning journey by exploring four essential networking concepts: MAC Address, ARP, DNS, and DHCP.

These technologies are fundamental to how devices communicate within local networks and across the Internet. Understanding these concepts is essential for Linux administration, cloud computing, Docker, Kubernetes, AWS networking, and DevOps engineering.

Throughout this lab, I studied the theory behind these protocols and practiced Linux networking commands to inspect MAC addresses, ARP tables, and DNS configurations.

---

## Topics Covered

- MAC Address
- MAC Address vs IP Address
- Address Resolution Protocol (ARP)
- Domain Name System (DNS)
- Dynamic Host Configuration Protocol (DHCP)
- Linux Networking Commands

---

## Practical Commands

| Command | Description |
|---------|-------------|
| `ip link` | Display network interfaces and MAC addresses |
| `ip addr` | Display detailed network configuration |
| `ip neigh` | Display the ARP table |
| `cat /etc/resolv.conf` | Display configured DNS servers |
| `nslookup google.com` | Resolve a domain name to an IP address |
| `dig google.com` | Perform detailed DNS queries |
| `hostname` | Display the system hostname |

---

## Key Learning Outcomes

- Understood the purpose of MAC addresses.
- Differentiated between MAC addresses and IP addresses.
- Learned how ARP maps IP addresses to MAC addresses.
- Understood how DNS translates domain names into IP addresses.
- Learned how DHCP automatically assigns IP addresses.
- Practiced Linux networking commands related to networking and DNS.

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
