# Role Based Access Control (RBAC)

# Introduction

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to do?
```

Many developers confuse these concepts.

A user may be authenticated successfully but still not have permission to perform certain actions.

Role Based Access Control (RBAC) is one of the most common authorization mechanisms used in modern applications.

Examples:

* Admin Panels
* E-commerce Platforms
* CRM Systems
* Learning Management Systems
* Banking Applications

---

# What is RBAC?

RBAC stands for:

```text
Role Based Access Control
```

Users are assigned roles.

Permissions are granted based on those roles.

Instead of checking every user individually:

```text
Rahul → Can Create Blog

Amit → Can Create Blog

Mohit → Can Create Blog
```

we assign:

```text
AUTHOR Role
```

and give permissions to the role.

---

# Why RBAC Exists

Imagine:

```text
1000 Users
```

Without RBAC:

```text
Manage permissions
for each user
```

Very difficult.

With RBAC:

```text
Assign Role
↓
Role Defines Permissions
```

Much easier to manage.

---

# Real World Example

School System

Roles:

```text
Admin

Teacher

Student
```

Permissions:

Admin:

```text
Create Users

Delete Users

Manage School
```

Teacher:

```text
Manage Students

Add Marks
```

Student:

```text
View Results
```

Each role has different permissions.

---

# Authentication vs Authorization

Authentication:

```text
Verify Identity
```

Authorization:

```text
Verify Permissions
```

Example:

```text
Rahul Logs In
```

Authentication:

```text
Is Rahul a valid user?
```

Authorization:

```text
Can Rahul delete users?
```

Different processes.

---

# Roles in Our Project

Current Roles:

```text
ADMIN

AUTHOR
```

---

# ADMIN Permissions

Example:

```text
Create Blog

Update Any Blog

Delete Any Blog

Manage Users
```

Admins have elevated privileges.

---

# AUTHOR Permissions

Example:

```text
Create Blog

Update Own Blog

Delete Own Blog
```

Authors have limited access.

---

# Database Design

User Table:

| id | name  | role   |
| -- | ----- | ------ |
| 1  | Rahul | ADMIN  |
| 2  | Amit  | AUTHOR |

Role is stored in the database.

---

# Prisma Example

User Model:

```prisma
enum UserRole {
  ADMIN
  AUTHOR
}

model User {

  id Int @id

  role UserRole

}
```

This ensures only valid roles are stored.

---

# Authorization Flow

```text
Login
   ↓
JWT Verify
   ↓
User Found
   ↓
Check Role
   ↓
Allow Or Deny
```

Authentication happens first.

Authorization happens second.

---

# Middleware Based Authorization

A common approach is:

```javascript
authorize('ADMIN')
```

Example:

```javascript
router.delete(
  '/users/:id',
  authMiddleware,
  authorize('ADMIN'),
  deleteUser
);
```

Only Admins can access the route.

---

# Example Middleware

```javascript
const authorize =
(...roles) => {

  return (
    req,
    res,
    next
  ) => {

    if (
      !roles.includes(
        req.user.role
      )
    ) {

      return res
        .status(403)
        .json({
          message:
          'Forbidden'
        });

    }

    next();

  };

};
```

This middleware checks whether the user's role is allowed.

---

# Multiple Role Authorization

Example:

```javascript
authorize(
  'ADMIN',
  'AUTHOR'
)
```

Meaning:

```text
ADMIN Allowed

AUTHOR Allowed
```

Any other role:

```text
Access Denied
```

---

# Ownership Authorization

Role checks alone are not always enough.

Example:

Blog ID:

```text
10
```

belongs to:

```text
Author A
```

Another Author:

```text
Author B
```

should not edit it.

---

# Ownership Check

Example:

```javascript
if (
  blog.authorId !==
  req.user.id
) {

  throw new ForbiddenError(
    'Access denied'
  );

}
```

This is called:

```text
Resource Ownership
```

---

# Current Project Example

Blog Update:

```text
Admin
```

can update any blog.

```text
Author
```

can update only their own blog.

Implementation:

```javascript
const isOwner =
  blog.authorId ===
  user.id;

const isAdmin =
  user.role ===
  'ADMIN';

if (
  !isOwner &&
  !isAdmin
) {

  throw new ForbiddenError(
    'Access denied'
  );

}
```

This is a real production pattern.

---

# RBAC Advantages

Benefits:

```text
Centralized Permissions

Easy Management

Scalable

Cleaner Code

Improved Security
```

---

# RBAC Disadvantages

Challenges:

```text
Complex Role Hierarchies

Permission Explosion

Difficult Auditing
```

when applications become very large.

---

# What is Permission Based Access Control?

Instead of:

```text
ADMIN

AUTHOR
```

you store:

```text
create_blog

delete_blog

update_blog

manage_users
```

directly.

This is more flexible.

---

# RBAC vs Permission Based Access

RBAC:

```text
User
 ↓
Role
 ↓
Permissions
```

Permission Based:

```text
User
 ↓
Permissions
```

directly assigned.

---

# Enterprise Example

Admin:

```text
create_user

delete_user

manage_roles
```

Manager:

```text
view_reports

approve_orders
```

Employee:

```text
view_orders
```

Permissions become more granular.

---

# Current Project Architecture

```text
Request
   ↓
JWT Middleware
   ↓
Authentication
   ↓
Authorization Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
```

This is a common enterprise flow.

---

# Common Authorization Status Codes

401 Unauthorized

Meaning:

```text
User Not Logged In
```

---

403 Forbidden

Meaning:

```text
User Logged In

But No Permission
```

Interviewers love asking this.

---

# Most Important Interview Questions

Q: What is RBAC?

Answer:

RBAC (Role Based Access Control) is an authorization mechanism where permissions are assigned to roles, and users receive permissions through their assigned roles.

---

Q: Difference Between Authentication and Authorization?

Answer:

Authentication verifies user identity.

Authorization determines what actions the authenticated user is allowed to perform.

---

Q: What is the Difference Between 401 and 403?

Answer:

401 Unauthorized means the user is not authenticated.

403 Forbidden means the user is authenticated but lacks the required permission.

---

Q: Why Use Middleware for Authorization?

Answer:

Authorization middleware centralizes permission checks and avoids duplicating access-control logic across multiple controllers.

---

Q: What is Resource Ownership?

Answer:

Resource Ownership ensures users can only modify resources they own unless they have elevated permissions such as Admin privileges.

---

Q: RBAC vs Permission Based Access?

Answer:

RBAC assigns permissions through roles, while Permission Based Access assigns permissions directly to users, offering more flexibility but increased complexity.

---

# Senior Interview Answer

Role Based Access Control is an authorization strategy where permissions are grouped into roles and assigned to users. It simplifies permission management, improves security, and scales well for most business applications. In production systems, RBAC is often combined with ownership checks and fine-grained permissions to provide flexible and secure access control.
