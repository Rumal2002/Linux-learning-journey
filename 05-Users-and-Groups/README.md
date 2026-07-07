#  Day 05 - Linux Users & Groups

##  Objective

The objective of this module was to understand how Linux manages users and groups to provide secure access control. I learned how to create users and groups, manage memberships, inspect user information, and understand the role of system files related to user management.

---

#  Topics Covered

- Linux User Management
- Types of Linux Users
- Root User vs Regular User
- User IDs (UID) and Group IDs (GID)
- Creating Users
- Deleting Users
- Switching Users
- Creating Groups
- Adding Users to Groups
- Important User Management Files

---

#  Understanding Linux Users

Linux is a multi-user operating system designed to allow multiple users to work on the same system securely.

There are three main types of users:

- Root User
- Regular Users
- System Users

The **root user** has unrestricted access to the entire system, while regular users have limited permissions to improve security.

---

#  Understanding Groups

Groups simplify permission management by allowing multiple users to share the same access rights.

Instead of assigning permissions individually, administrators can assign permissions to a group and add users to that group.

Example:

- Developers
- DevOps
- QA
- Database Administrators

---

#  Important Linux User Files

| File | Purpose |
|------|---------|
| `/etc/passwd` | Stores user account information |
| `/etc/group` | Stores group information |
| `/etc/shadow` | Stores encrypted passwords |

---

#  Commands Practiced

| Command | Description |
|----------|-------------|
| `whoami` | Display the current user |
| `id` | Show user ID and group information |
| `who` | Display logged-in users |
| `w` | Show logged-in users and system activity |
| `adduser` | Create a new user |
| `deluser` | Delete a user |
| `groupadd` | Create a new group |
| `usermod -aG` | Add a user to a group |
| `groups` | Display user group memberships |
| `cat /etc/passwd` | View user accounts |
| `cat /etc/group` | View group information |

---

#  Practical Exercise

Completed the following practical tasks:

- Identified the current logged-in user.
- Displayed user and group information.
- Viewed active users on the system.
- Created new users.
- Created new groups.
- Added users to groups.
- Verified group memberships.
- Explored Linux user database files.

---

#  Real-World Use Cases

Linux user and group management is widely used in:

- Managing SSH access to servers
- Granting deployment permissions
- Restricting access to sensitive files
- Managing Docker and Kubernetes users
- Configuring CI/CD runners
- Multi-user production environments

---

#  Key Takeaways

- Linux is a secure multi-user operating system.
- Every user has a unique User ID (UID).
- Groups simplify permission management.
- `sudo` provides temporary administrative privileges.
- User information is stored in `/etc/passwd`.
- Group information is stored in `/etc/group`.

---

#  Reflection

This module helped me understand how Linux manages users and groups to provide secure access control. I learned how administrators create users, assign groups, and manage permissions in a structured way. These concepts are essential for Linux administration, cloud platforms, DevOps workflows, and enterprise infrastructure.
