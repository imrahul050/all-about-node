# Database Indexing and Query Optimization

# Introduction

One of the most important responsibilities of a backend developer is writing efficient database queries.

A feature may work perfectly with:

```text
100 Records
```

but fail when the database grows to:

```text
10 Million Records
```

Many developers think:

```text
Slow API = Bad Server
```

In reality:

```text
Slow API = Slow Database Query
```

in most cases.

This is why Database Indexing and Query Optimization are critical topics for backend interviews.

---

# What is Query Optimization?

Query Optimization means:

```text
Making Database Queries Faster
And More Efficient
```

Goals:

```text
Reduce Execution Time

Reduce CPU Usage

Reduce Memory Usage

Handle More Users
```

---

# Real World Example

Suppose you have:

```text
users

10,000,000 Records
```

Query:

```sql
SELECT *
FROM users
WHERE email =
'rahul@gmail.com';
```

Without optimization:

```text
Database Scans
10 Million Rows
```

Slow.

With optimization:

```text
Find Record
Immediately
```

Fast.

---

# What is an Index?

An Index is a special data structure used by the database to find data quickly.

Think of a book.

Without index:

```text
Read Every Page
```

With index:

```text
Go Directly
To Page Number
```

Database indexes work the same way.

---

# Real Life Example

Book:

```text
Index

Laravel → Page 20

Node.js → Page 45

Redis → Page 60
```

You directly find information.

Database index does the same.

---

# Without Index

Query:

```sql
SELECT *
FROM users
WHERE email =
'rahul@gmail.com';
```

Database:

```text
Row 1

Row 2

Row 3

...

Row 10 Million
```

Checks every row.

This is called:

```text
Full Table Scan
```

---

# With Index

Database:

```text
Email Index
```

Query:

```sql
SELECT *
FROM users
WHERE email =
'rahul@gmail.com';
```

Database directly jumps to the record.

Much faster.

---

# Why Indexes Are Important

Benefits:

```text
Faster Queries

Faster Search

Better Scalability

Lower Database Load
```

---

# Drawback of Indexes

Indexes are not free.

Every index:

```text
Consumes Storage

Slows INSERT

Slows UPDATE

Slows DELETE
```

Because index must also be updated.

---

# When Should You Create Indexes?

Good Candidates:

```text
Email

Slug

Username

Foreign Keys

Frequently Searched Columns
```

---

# Example

User Login:

```sql
SELECT *
FROM users
WHERE email = ?
```

Email should be indexed.

---

# Prisma Example

Schema:

```prisma
model User {

  id Int @id

  email String @unique

}
```

Prisma automatically creates an index.

---

# Unique Index

Example:

```prisma
email String @unique
```

Benefits:

```text
Fast Search

No Duplicate Values
```

Common interview question.

---

# Single Column Index

Example:

```sql
CREATE INDEX
idx_email
ON users(email);
```

Indexes only one column.

---

# Composite Index

Indexes multiple columns together.

Example:

```sql
CREATE INDEX
idx_status_created
ON blogs(
status,
created_at
);
```

Useful when filtering by both fields.

---

# Real World Example

Query:

```sql
SELECT *
FROM blogs
WHERE status =
'PUBLISHED'
AND created_at >
'2025-01-01';
```

Composite index helps significantly.

---

# Clustered Index

A clustered index determines the physical order of records.

Usually:

```text
Primary Key
```

Example:

```sql
id
```

Database stores data ordered by primary key.

---

# Non-Clustered Index

Separate structure.

Contains:

```text
Indexed Value

Pointer To Row
```

Most indexes are non-clustered.

---

# What is a Full Table Scan?

Database reads every row.

Example:

```sql
SELECT *
FROM users
WHERE city =
'Delhi';
```

Without index:

```text
Scan Entire Table
```

Slow on large datasets.

---

# What is EXPLAIN?

EXPLAIN shows how a query executes.

Example:

```sql
EXPLAIN
SELECT *
FROM users
WHERE email =
'rahul@gmail.com';
```

Used to identify performance issues.

---

# Why Use EXPLAIN?

Shows:

```text
Indexes Used

Rows Scanned

Execution Plan

Cost
```

Very useful in production.

---

# Pagination Problem

Bad Query:

```sql
SELECT *
FROM blogs;
```

Returns:

```text
100,000 Records
```

Huge memory usage.

---

# Better Query

```sql
SELECT *
FROM blogs
LIMIT 10;
```

Returns only:

```text
10 Records
```

Efficient.

---

# Pagination in Prisma

Example:

```javascript
const blogs =
await prisma.blog.findMany({

  skip: 0,

  take: 10

});
```

Most common implementation.

---

# Offset Pagination

Example:

```javascript
skip: 20,
take: 10
```

Page:

```text
3
```

Easy to implement.

---

# Problem With Offset Pagination

Large offsets:

```javascript
skip: 100000
```

can become slow.

Database still scans many rows.

---

# Cursor Pagination

Better for large datasets.

Example:

```javascript
cursor: {
  id: 500
}
```

Database starts from a known position.

More scalable.

---

# N+1 Query Problem

Very common interview question.

Example:

```text
Get Blogs
```

Then:

```text
Get Author
For Every Blog
```

10 blogs:

```text
1 Query

+
10 Queries
```

Total:

```text
11 Queries
```

Bad.

---

# Example

Bad:

```javascript
for (const blog of blogs) {

  await prisma.user.findUnique();

}
```

Creates N+1 issue.

---

# Solution

Use Relations.

Example:

```javascript
await prisma.blog.findMany({

  include: {
    author: true
  }

});
```

Single query.

Much faster.

---

# Select Only Needed Columns

Bad:

```javascript
await prisma.user.findMany();
```

Returns everything.

---

Better:

```javascript
await prisma.user.findMany({

  select: {
    id: true,
    name: true
  }

});
```

Less memory.

Faster response.

---

# Avoid SELECT *

Bad:

```sql
SELECT *
FROM users;
```

---

Better:

```sql
SELECT
id,
name
FROM users;
```

Only fetch needed columns.

---

# Database Connection Pooling

Opening new database connections repeatedly is expensive.

Use:

```text
Connection Pool
```

Prisma handles this automatically.

Benefits:

```text
Reuse Connections

Better Performance
```

---

# Query Caching

Frequently accessed data:

```text
Blogs

Categories

Settings
```

can be cached in Redis.

Flow:

```text
Request
 ↓
Redis
 ↓
Database
```

Huge performance gain.

---

# Common Query Optimization Techniques

```text
Indexes

Pagination

Caching

Select Specific Columns

Avoid N+1 Queries

Connection Pooling
```

These solve most performance problems.

---

# Current Project Optimization Opportunities

Our Blog API already uses:

```text
Pagination

Prisma Relations
```

Future improvements:

```text
Redis Cache

Composite Indexes

Cursor Pagination
```

Production-ready optimizations.

---

# Common Interview Questions

Q: What is an Index?

Answer:

An index is a database structure that improves query performance by allowing faster data lookup without scanning the entire table.

---

Q: What is a Full Table Scan?

Answer:

A full table scan occurs when the database reads every row because no suitable index exists.

---

Q: What is a Composite Index?

Answer:

A composite index contains multiple columns and improves queries that filter or sort using those columns together.

---

Q: What is EXPLAIN?

Answer:

EXPLAIN shows the database execution plan and helps identify performance bottlenecks and index usage.

---

Q: What is the N+1 Query Problem?

Answer:

The N+1 problem occurs when one query retrieves a list of records and additional queries are executed for each record, causing excessive database calls.

---

Q: Offset vs Cursor Pagination?

Answer:

Offset pagination is simpler but becomes slower on large datasets. Cursor pagination scales better and is preferred for large applications.

---

Q: Why Not Add Indexes Everywhere?

Answer:

Indexes improve reads but increase storage requirements and slow down insert, update, and delete operations.

---

Q: How Do You Optimize Slow APIs?

Answer:

I analyze queries using EXPLAIN, add appropriate indexes, implement pagination, reduce unnecessary data retrieval, eliminate N+1 queries, and introduce Redis caching where appropriate.

---

# Real Interview Scenario

Interviewer:

```text
Your blog listing API
became slow after
1 million records.
What would you do?
```

Answer:

I would first inspect the query execution plan using EXPLAIN, verify indexes on filtering and sorting columns, implement pagination if missing, avoid N+1 queries, select only required fields, and introduce Redis caching for frequently accessed data.

---

# Senior Interview Answer

Database performance is often the biggest factor affecting API speed. My optimization approach includes analyzing execution plans, creating appropriate indexes, eliminating N+1 queries, using efficient pagination strategies, reducing unnecessary data transfer, and leveraging Redis caching. These techniques allow applications to scale efficiently while maintaining low response times under heavy load.
