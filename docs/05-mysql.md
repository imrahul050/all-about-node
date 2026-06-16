# Database Design and Relationships

# Introduction

A backend application is only as good as its database design.

Poor database design leads to:

* Duplicate data
* Slow queries
* Difficult maintenance
* Data inconsistency

Good database design creates:

* Better performance
* Easier maintenance
* Scalability
* Data integrity

As a backend developer, understanding database relationships is more important than remembering ORM syntax.

---

# What is a Database?

A database is an organized collection of data stored electronically.

Examples:

* Users
* Blogs
* Orders
* Products
* Payments

Instead of storing information in files, applications store it in databases for faster retrieval and management.

In our project:

```text id="q7j1mv"
MySQL
```

is the database.

---

# What is a Table?

A table stores data in rows and columns.

Example:

Users Table

| id | name  | email                                     |
| -- | ----- | ----------------------------------------- |
| 1  | Rahul | [rahul@gmail.com](mailto:rahul@gmail.com) |
| 2  | Amit  | [amit@gmail.com](mailto:amit@gmail.com)   |

Think of a table as an Excel sheet.

Each table stores information about a specific entity.

---

# What is a Row?

A row represents a single record.

Example:

| id | name  | email                                     |
| -- | ----- | ----------------------------------------- |
| 1  | Rahul | [rahul@gmail.com](mailto:rahul@gmail.com) |

This complete record is one row.

---

# What is a Column?

A column represents an attribute of the data.

Example:

```text id="8f0f3t"
id

name

email
```

These are columns.

Columns define what information can be stored.

---

# What is a Primary Key?

A Primary Key uniquely identifies each record.

Example:

| id | name  |
| -- | ----- |
| 1  | Rahul |
| 2  | Amit  |

Here:

```text id="u8s0k7"
id
```

is the primary key.

Rules:

* Must be unique
* Cannot be NULL
* One primary key per table

---

# Why Primary Key is Important

Without a primary key:

```text id="zj4v5d"
Rahul

Rahul

Rahul
```

How would we identify the correct Rahul?

Primary keys solve this problem.

---

# What is a Foreign Key?

A Foreign Key creates a relationship between tables.

Example:

Users Table

| id | name  |
| -- | ----- |
| 1  | Rahul |

Blogs Table

| id | title     | authorId |
| -- | --------- | -------- |
| 1  | Node Blog | 1        |

Here:

```text id="i4u4cv"
authorId
```

references:

```text id="0a8x1y"
users.id
```

This creates a relationship.

---

# Why Foreign Keys Exist

Foreign keys maintain data integrity.

Example:

If User ID 1 does not exist:

```text id="ihjlwm"
authorId = 1
```

should not be allowed.

Foreign keys prevent invalid relationships.

---

# One-to-One Relationship

Definition:

One record in Table A is related to exactly one record in Table B.

Example:

```text id="e3xjjr"
User
   ↓
Profile
```

One user has one profile.

One profile belongs to one user.

---

# Real World Example

```text id="tny4r4"
User
```

Stores:

* Name
* Email
* Password

```text id="n6ps2q"
Profile
```

Stores:

* Address
* Bio
* Avatar

This keeps data organized.

---

# Prisma Example

```prisma id="h7k26o"
model User {
  id      Int @id
  profile Profile?
}

model Profile {
  id      Int @id
  userId  Int @unique
  user    User @relation(
    fields: [userId],
    references: [id]
  )
}
```

---

# One-to-Many Relationship

Definition:

One record in Table A can have multiple records in Table B.

This is the most common relationship.

---

# Real Project Example

```text id="zhj5m6"
User
   ↓
Blogs
```

One User:

```text id="k70ahf"
Rahul
```

can create:

```text id="rb9czs"
10 Blogs
```

But each blog belongs to only one author.

Relationship:

```text id="nx6n8x"
One User
      ↓
Many Blogs
```

---

# Prisma Example

```prisma id="6vt4wu"
model User {

  id Int @id

  blogs Blog[]

}

model Blog {

  id Int @id

  authorId Int

  author User @relation(
    fields: [authorId],
    references: [id]
  )

}
```

This is exactly what we use in our project.

---

# Many-to-Many Relationship

Definition:

Many records in Table A can relate to many records in Table B.

---

# Real World Example

```text id="n4c1r3"
Blog
   ↔
Tag
```

One Blog:

```text id="4u8j1l"
Node.js
```

can have:

```text id="byv2j0"
Backend

JavaScript

API
```

tags.

One Tag:

```text id="l8n0xq"
JavaScript
```

can belong to many blogs.

Relationship:

```text id="b7o7c7"
Many Blogs
       ↔
Many Tags
```

---

# Junction Table

Many-to-Many relationships require a junction table.

Example:

```text id="0o5mij"
blog_tags
```

| blogId | tagId |
| ------ | ----- |
| 1      | 1     |
| 1      | 2     |
| 2      | 2     |

This table connects both entities.

---

# What is Normalization?

Normalization is the process of organizing data to reduce duplication.

Bad Example:

Users Table

| id | name  | city  |
| -- | ----- | ----- |
| 1  | Rahul | Delhi |
| 2  | Amit  | Delhi |
| 3  | Mohit | Delhi |

City repeats many times.

---

# Better Design

Cities Table

| id | city  |
| -- | ----- |
| 1  | Delhi |

Users Table

| id | name  | cityId |
| -- | ----- | ------ |
| 1  | Rahul | 1      |

Less duplication.

Better maintenance.

---

# What is Indexing?

Indexes improve query performance.

Without Index:

Database scans every row.

With Index:

Database quickly finds matching records.

Example:

```sql id="4g38jx"
email
```

should usually have an index.

---

# Why Unique Indexes Matter

Example:

```sql id="xjtt3v"
email
```

should be unique.

Reason:

Two users should not have the same email address.

Example:

```prisma id="o3rqut"
email String @unique
```

Prisma automatically creates a unique index.

---

# Database Design of Current Project

Current Structure:

```text id="nlgfw0"
users
   ↓
blogs
```

Relationship:

```text id="z0g4l2"
One User
      ↓
Many Blogs
```

Foreign Key:

```text id="0o8gfc"
blogs.authorId
```

references:

```text id="ajpxdi"
users.id
```

This ensures every blog belongs to a valid author.

---

# Most Important Interview Questions

Q: What is a Primary Key?

Answer:

A Primary Key is a unique identifier for each record in a table. It must be unique and cannot contain NULL values.

---

Q: What is a Foreign Key?

Answer:

A Foreign Key is a column that references the primary key of another table and is used to establish relationships between tables.

---

Q: Difference Between Primary Key and Foreign Key?

Answer:

Primary Key uniquely identifies records within the same table.

Foreign Key creates relationships between different tables.

---

Q: Explain One-to-Many Relationship.

Answer:

A One-to-Many relationship occurs when one record in a table can be associated with multiple records in another table. For example, one user can create many blogs.

---

Q: Explain Many-to-Many Relationship.

Answer:

A Many-to-Many relationship occurs when multiple records from one table can be associated with multiple records from another table. This relationship is typically implemented using a junction table.

---

Q: What is Normalization?

Answer:

Normalization is the process of organizing data to reduce redundancy and improve data consistency.

---

Q: Why Use Indexes?

Answer:

Indexes improve query performance by allowing the database to find records more efficiently instead of scanning the entire table.

---

# Interview Tip

When designing any database in interviews:

Always identify:

```text id="08fr55"
Entities
      ↓
Relationships
      ↓
Primary Keys
      ↓
Foreign Keys
      ↓
Indexes
```

Interviewers care more about your database thinking process than the exact syntax.
