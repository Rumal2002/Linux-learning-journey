#  Day 06 - Linux Processes

##  Objective

The objective of this module was to understand how Linux manages running programs (processes), monitor system resources, control process execution, and troubleshoot running applications. These skills are essential for Linux administration and DevOps operations.

---

#  Topics Covered

- What is a Process?
- Process ID (PID)
- Viewing Running Processes
- Monitoring Processes
- Foreground vs Background Processes
- Managing Background Jobs
- Terminating Processes
- Process Priority
- System Resource Monitoring

---

#  Understanding Linux Processes

A process is a program that is currently running on a Linux system.

Examples include:

- Web servers (Nginx, Apache)
- Databases (MySQL, PostgreSQL)
- Docker containers
- SSH services
- Terminal sessions

Every running process is assigned a unique **Process ID (PID)**, allowing Linux to track and manage it independently.

---

#  Commands Practiced

| Command | Description |
|----------|-------------|
| `ps` | Display current shell processes |
| `ps -e` | Display all running processes |
| `ps aux` | Show detailed process information |
| `top` | Monitor running processes in real time |
| `htop` | Interactive process monitor |
| `jobs` | List background jobs |
| `bg` | Resume a suspended job in the background |
| `fg` | Bring a background job to the foreground |
| `kill` | Gracefully terminate a process |
| `kill -9` | Forcefully terminate a process |
| `pgrep` | Find a process by name |
| `pidof` | Display the PID of a process |
| `free -h` | Display memory usage |
| `df -h` | Display disk usage |
| `lscpu` | Show CPU information |

---

#  Practical Exercise

Completed the following tasks:

- Viewed active processes using `ps`.
- Explored detailed process information with `ps aux`.
- Monitored CPU and memory usage using `top`.
- Started and managed background jobs.
- Used `jobs`, `bg`, and `fg`.
- Terminated processes using `kill`.
- Examined memory, disk, and CPU information.

---

#  Real-World Use Cases

Linux process management is commonly used in:

- Monitoring production servers
- Troubleshooting high CPU or memory usage
- Restarting failed services
- Managing CI/CD runners
- Monitoring Docker containers
- Investigating system performance issues
- Cloud infrastructure administration

---

#  Key Takeaways

- Every running application is a process.
- Each process has a unique Process ID (PID).
- `ps` displays process information.
- `top` provides real-time system monitoring.
- `kill` terminates running processes.
- Background jobs improve command-line productivity.
- Monitoring system resources is essential for maintaining healthy servers.

---

#  Reflection

This module strengthened my understanding of Linux process management and system monitoring. I learned how to inspect running processes, monitor system resources, manage foreground and background jobs, and safely terminate processes when necessary. These skills are fundamental for Linux system administration, DevOps engineering, cloud operations, and production troubleshooting.
