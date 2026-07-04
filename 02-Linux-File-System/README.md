#  Day 02 - Linux File System & Navigation

##  Objective

The objective of Day 2 was to understand how the Linux file system is organized, learn the purpose of common system directories, and practice navigating the Linux file system using essential command-line tools.

---

#  Topics Covered

- Linux File System
- File System Hierarchy Standard (FHS)
- Root Directory (`/`)
- Home Directory (`/home`)
- Root User Directory (`/root`)
- Important Linux Directories
- Absolute Path
- Relative Path
- Linux Navigation Commands
- Creating and Removing Directories

---

#  Linux File System

The Linux file system organizes files and directories in a hierarchical tree structure. Unlike Windows, Linux starts from a single root directory (`/`), and every file and directory exists under it.

```text
/
├── bin
├── boot
├── dev
├── etc
├── home
├── root
├── usr
├── var
├── tmp
└── opt
```

---

#  Important Linux Directories

| Directory | Purpose |
|------------|---------|
| `/` | Root directory of the Linux file system |
| `/home` | Stores personal files of normal users |
| `/root` | Home directory of the root user |
| `/etc` | System configuration files |
| `/var` | Variable data such as logs and cache |
| `/tmp` | Temporary files |
| `/usr` | User applications and shared resources |
| `/opt` | Optional third-party software |

---

#  Absolute Path vs Relative Path

## Absolute Path

An absolute path always starts from the root directory (`/`) and points to the same location regardless of the current directory.

**Example**

```text
/home/rumal/Documents
```

---

## Relative Path

A relative path starts from the current working directory.

**Example**

```text
Documents
```

---

#  Commands Practiced

| Command | Description |
|----------|-------------|
| `pwd` | Print current working directory |
| `ls` | List files and directories |
| `ls -l` | Detailed file listing |
| `ls -a` | Show hidden files |
| `ls -la` | Detailed listing including hidden files |
| `cd` | Change directory |
| `cd ..` | Move to parent directory |
| `cd ~` | Move to home directory |
| `cd /` | Move to root directory |
| `cd -` | Return to previous directory |
| `mkdir` | Create a new directory |
| `mkdir -p` | Create nested directories |
| `rmdir` | Remove an empty directory |

---

#  Practical Exercise

Created the following directory structure:

```text
DevOps/
├── Projects/
├── Notes/
├── Scripts/
├── Logs/
└── Backups/
```

Successfully practiced:

- Navigating directories
- Creating folders
- Listing directory contents
- Switching between directories
- Removing empty directories

---

#  Key Takeaways

- Linux uses a hierarchical file system.
- Every file begins from the root directory (`/`).
- `/home` stores user data, while `/root` belongs to the root user.
- Absolute paths always start from `/`.
- Relative paths depend on the current working directory.
- Navigation commands are fundamental Linux skills for DevOps engineers.

---

# 📌 Reflection

Today I gained a deeper understanding of the Linux file system hierarchy and learned how to navigate efficiently using the command line. I also practiced creating and managing directories, which are essential skills for Linux system administration and DevOps.
