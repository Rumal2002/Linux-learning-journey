# Commands Used - Day 15

## Display Routing Table

```bash
ip route
```

## Display Active Network Connections

```bash
ss -tun
```

## Resolve a Domain Name

```bash
nslookup google.com
```

## Display HTTP Response Headers

```bash
curl -I https://google.com
```

## Trace the Network Route

```bash
traceroute google.com
```

If `traceroute` is not installed:

```bash
sudo apt update
sudo apt install traceroute
```

## Display Network Interfaces

```bash
ip addr
```

## Display Hostname

```bash
hostname
```
