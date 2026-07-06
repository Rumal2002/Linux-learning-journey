#  Module 04 - Linux File Permissions

##  Objective

The objective of this module was to understand how Linux controls access to files and directories using permissions. I learned how to view permissions, modify them using `chmod`, and understand file ownership through `chown` and `chgrp`.

---

#  Topics Covered

- Why File Permissions Matter
- Understanding Permission Strings
- Owner, Group, and Others
- Read, Write, and Execute Permissions
- Numeric Permissions
- Symbolic Permissions
- Using `chmod`
- Using `chown`
- Using `chgrp`

---

#  Understanding Linux File Permissions

Linux uses a permission-based security model to control who can read, modify, or execute files.

Every file and directory has three permission categories:

- Owner
- Group
- Others

Each category can have three different permissions:

- Read (`r`)
- Write (`w`)
- Execute (`x`)

Example:

```text
-rwxr-xr--
```

This permission string can be interpreted as:

| Section | Permission |
|----------|------------|
| Owner | `rwx` |
| Group | `r-x` |
| Others | `r--` |

---

#  Numeric Permissions

Linux also represents permissions using numbers.

| Permission | Value |
|------------|------:|
| Read | 4 |
| Write | 2 |
| Execute | 1 |

Examples:

| Numeric | Symbolic |
|----------|----------|
| 755 | rwxr-xr-x |
| 644 | rw-r--r-- |
| 600 | rw------- |
| 700 | rwx------ |

---

#  Commands Practiced

| Command | Description |
|----------|-------------|
| `ls -l` | Display detailed file permissions |
| `chmod +x` | Add execute permission |
| `chmod -w` | Remove write permission |
| `chmod 755` | Set numeric permissions |
| `chmod 644` | Set file permissions |
| `chmod 600` | Restrict file access |
| `chown` | Change file owner |
| `chgrp` | Change file group |

---

#  Practical Exercise

Completed the following tasks:

- Created multiple files for permission testing
- Checked file permissions using `ls -l`
- Added execute permission to shell scripts
- Modified permissions using symbolic notation
- Modified permissions using numeric notation
- Practiced secure permission settings for configuration files
- Learned the purpose of ownership and group management

---

#  Key Takeaways

- Linux permissions improve system security.
- Every file has an owner, group, and permission set.
- `chmod` modifies file permissions.
- `chown` changes the owner of a file.
- `chgrp` changes the group associated with a file.
- Numeric permissions provide a faster way to configure access rights.

---

#  Reflection

This module helped me understand one of the most important security concepts in Linux. I learned how to manage access to files using both symbolic and numeric permission methods. These skills are fundamental for Linux administration, DevOps, cloud infrastructure, and secure server management.
