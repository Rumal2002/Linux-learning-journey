# Networking Notes

## MAC Address

A MAC (Media Access Control) Address is a unique physical address assigned to a network interface card (NIC) by the manufacturer.

Example:

00:1A:2B:3C:4D:5E

Characteristics:

- Physical hardware address
- Usually permanent
- Used within Local Area Networks (LAN)
- Assigned by the device manufacturer

---

## MAC Address vs IP Address

| MAC Address | IP Address |
|--------------|------------|
| Physical Address | Logical Address |
| Assigned by manufacturer | Assigned manually or by DHCP |
| Usually permanent | Can change |
| Used inside a LAN | Used across different networks |

---

## ARP (Address Resolution Protocol)

ARP maps an IP address to its corresponding MAC address.

When a device knows the destination IP address but not the MAC address, it sends an ARP request on the local network to discover the correct hardware address.

---

## DNS (Domain Name System)

DNS translates human-readable domain names into IP addresses.

Example:

google.com

↓

142.xxx.xxx.xxx

Without DNS, users would have to remember numerical IP addresses instead of domain names.

---

## DHCP (Dynamic Host Configuration Protocol)

DHCP automatically assigns IP addresses and network configuration to devices connected to a network.

Instead of configuring IP addresses manually, devices receive:

- IP Address
- Subnet Mask
- Default Gateway
- DNS Server

automatically from the DHCP server.

---

## Summary

MAC Address, ARP, DNS, and DHCP work together to enable communication between devices on local networks and across the Internet. These protocols form an essential foundation for Linux administration, cloud networking, Docker, Kubernetes, AWS, and DevOps engineering.
