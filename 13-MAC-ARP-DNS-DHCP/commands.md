# Commands Used - Day 13

## Display Network Interfaces

```bash
ip link
```

## Display Detailed Network Information

```bash
ip addr
```

## Display ARP Table

```bash
ip neigh
```

## Display DNS Configuration

```bash
cat /etc/resolv.conf
```

## DNS Lookup

```bash
nslookup google.com
```

## Detailed DNS Lookup

```bash
dig google.com
```

If `dig` or `nslookup` is not installed:

```bash
sudo apt update
sudo apt install dnsutils
```

## Display Hostname

```bash
hostname
```

## Display Current User

```bash
whoami
```
