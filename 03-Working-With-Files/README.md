#  Day 03 - Working with Files

##  Objective

The objective of this module was to learn how to create, view, copy, move, rename, edit, and delete files in Linux using essential command-line tools. File management is one of the core skills required for Linux system administration and DevOps engineering.

---

#  Topics Covered

- Everything in Linux is a File
- Linux File Types
- File Naming Best Practices
- Creating Files
- Viewing File Contents
- Copying Files
- Moving Files
- Renaming Files
- Deleting Files
- Editing Files with Nano

---

#  Understanding Files in Linux

Linux follows the philosophy that **everything is a file**. This design allows users and applications to interact with files, devices, and system resources in a consistent way.

Common file types include:

- Regular Files
- Directories
- Symbolic Links
- Block Devices
- Character Devices
- Sockets
- Named Pipes (FIFO)

---

#  File Naming Best Practices

Professional Linux users generally follow these conventions:

- Use lowercase letters.
- Separate words using hyphens (`-`) or underscores (`_`).
- Avoid spaces and special characters.
- Use meaningful file names.

Examples:

```text
project-notes.txt
docker-compose.yml
backup.sh
```

---

#  Commands Practiced

| Command | Description |
|----------|-------------|
| `touch` | Create empty files |
| `cat` | Display file contents |
| `less` | View long files |
| `head` | Display the beginning of a file |
| `tail` | Display the end of a file |
| `file` | Identify a file type |
| `cp` | Copy files |
| `cp -r` | Copy directories recursively |
| `mv` | Move or rename files |
| `rm` | Remove files |
| `rm -r` | Remove directories recursively |
| `nano` | Edit files in the terminal |

---

#  Practical Exercise

Completed the following practical tasks:

- Created multiple files using `touch`
- Added content using `nano`
- Displayed file contents with `cat`
- Viewed file information with `file`
- Copied files using `cp`
- Renamed files using `mv`
- Deleted files using `rm`
- Practiced working with directories and files through command-line exercises

---

#  Key Takeaways

- Everything in Linux is treated as a file.
- File management commands are fundamental for Linux administration.
- The `cp` command creates copies while `mv` moves or renames files.
- `nano` is a beginner-friendly terminal text editor.
- Care should be taken when using `rm`, as deleted files are not easily recovered.

---

#  Reflection

This module strengthened my understanding of Linux file management. Through hands-on practice, I became more comfortable creating, editing, organizing, and managing files using the command line. These skills are essential for working with Linux servers and form an important foundation for future DevOps tasks.
