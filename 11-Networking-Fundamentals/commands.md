# Commands Used - Day 11

## Display Hostname

```bash
hostname
```

## Display Current User

```bash
whoami
```

## Display IP Address

```bash
hostname -I
```

## Show Network Interfaces

```bash
ip addr
```

## Show Routing Table

```bash
ip route
```

## Test Internet Connectivity

```bash
ping google.com
```

Stop the command:

```bash
CTRL + C
```

## Test Localhost

```bash
ping localhost
```

## DNS Lookup

```bash
nslookup google.com
```

If `nslookup` is not installed:

```bash
sudo apt update
sudo apt install dnsutils
```

## Display Network Statistics

```bash
ip -s link
```
