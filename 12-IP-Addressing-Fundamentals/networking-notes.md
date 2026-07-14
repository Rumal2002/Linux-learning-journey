# IP Addressing Notes

## What is an IP Address?

An IP (Internet Protocol) Address is a unique numerical identifier assigned to every device connected to a network. It enables devices to communicate by identifying the sender and receiver of data.

---

## Why is an IP Address Important?

Every device connected to a network requires an IP address. Without IP addresses, devices would not know where to send or receive information.

---

## IPv4

IPv4 is the fourth version of the Internet Protocol and is the most widely used addressing system today.

Example:

192.168.1.100

Characteristics:

- 32-bit address
- Four octets
- Each octet ranges from 0 to 255
- Supports approximately 4.3 billion addresses

---

## IPv6

IPv6 was introduced to overcome the address limitations of IPv4.

Example:

2001:0db8:85a3:0000:0000:8a2e:0370:7334

Characteristics:

- 128-bit address
- Much larger address space
- Designed for future Internet growth

---

## Public IP Address

A Public IP Address is assigned by an Internet Service Provider (ISP) and is accessible over the Internet.

Example:

103.x.x.x

---

## Private IP Address

Private IP Addresses are used within local networks and are not directly accessible from the Internet.

Private IP Ranges:

- 10.0.0.0 – 10.255.255.255
- 172.16.0.0 – 172.31.255.255
- 192.168.0.0 – 192.168.255.255

Example:

192.168.1.20

---

## Subnet Mask

A subnet mask separates the network portion and the host portion of an IP address.

Example:

IP Address:
192.168.1.15

Subnet Mask:
255.255.255.0

Network Portion:
192.168.1

Host Portion:
15

---

## Summary

IP addressing is a fundamental networking concept required for Linux administration, cloud computing, Docker, Kubernetes, AWS, and DevOps engineering.
