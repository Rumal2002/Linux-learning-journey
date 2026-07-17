# Commands Used - Day 14

## Display Listening Ports

```bash
ss -tuln
```

## Display Active Connections

```bash
ss -tun
```

## Display Listening Ports (Legacy)

```bash
netstat -tuln
```

If `netstat` is not installed:

```bash
sudo apt update
sudo apt install net-tools
```

## Test HTTP Connection

```bash
curl http://example.com
```

## Test HTTPS Connection

```bash
curl https://example.com
```

## Display SSH Version

```bash
ssh -V
```

## Test Internet Connectivity

```bash
ping google.com
```

## Display Network Interfaces

```bash
ip addr
```

## Display Routing Table

```bash
ip route
```
