# Linux Server Administration Lab - Commands Reference

## Directory Management

```bash
mkdir users projects logs backups scripts
```

---

## File Management

```bash
touch developers.txt
touch app.conf
touch deploy.sh
touch README.md
touch app.log
touch backup.tar

cp projects/app.conf backups/

mv backups/backup.tar backups/server-backup.tar

rm logs/server.log
```

---

## File Permissions

```bash
chmod 755 deploy.sh

chmod 600 app.conf

chmod 644 README.md
```

---

## User & Group Management

```bash
sudo groupadd devops

sudo adduser developer

sudo usermod -aG devops developer

groups developer

id developer
```

---

## Process Management

```bash
sleep 300

Ctrl + Z

bg

jobs

fg

Ctrl + C
```

---

## System Information

```bash
whoami

hostname

pwd

free -h

df -h

lscpu

uptime
```
