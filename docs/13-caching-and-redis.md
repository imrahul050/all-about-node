# Caching and Redis

# Introduction

One of the biggest problems in backend applications is performance.

Imagine:

```text
100 Users
```

Your application works fine.

Now:

```text
100,000 Users
```

Suddenly:

* APIs become slow
* Database load increases
* Response time increases
* Server cost increases

This is where:

```text
Caching
```

becomes important.

Caching is one of the most commonly asked topics in Node.js interviews for developers with 3–6 years of experience.

---

# What is Caching?

Caching means:

```text
Store Frequently Used Data
Temporarily In Fast Storage
```

instead of querying the database every time.

Without Cache:

```text
Request
 ↓
Database
 ↓
Response
```

With Cache:

```text
Request
 ↓
Cache
 ↓
Response
```

Database is accessed only when necessary.

---

# Real World Example

Blog API:

Request:

```http
GET /blogs
```

Without Cache:

```text
Database Query
Every Request
```

1000 requests = 1000 database queries.

---

With Cache:

First Request:

```text
Database
 ↓
Cache
```

Next 999 Requests:

```text
Cache
 ↓
Response
```

Huge performance improvement.

---

# Why Caching Is Important

Benefits:

```text
Faster Response

Reduced Database Load

Lower Server Cost

Better User Experience

Improved Scalability
```

---

# What is Redis?

Redis stands for:

```text
Remote Dictionary Server
```

Redis is:

```text
In-Memory Database
```

Data is stored in RAM instead of disk.

Because RAM is extremely fast:

```text
MySQL
  ↓
Milliseconds

Redis
  ↓
Microseconds
```

Redis is commonly used for:

```text
Caching

Sessions

Rate Limiting

Queues

Pub/Sub

Real-Time Features
```

---

# Installing Redis

Mac:

```bash
brew install redis
```

Start Redis:

```bash
brew services start redis
```

Check Status:

```bash
redis-cli ping
```

Response:

```text
PONG
```

means Redis is running.

---

# Redis Package For Node.js

Installation:

```bash
npm install redis
```

---

# Create Redis Client

Example:

```javascript
const { createClient } =
require('redis');

const redisClient =
createClient();

redisClient.connect();
```

---

# Test Connection

Example:

```javascript
await redisClient.set(
  'name',
  'Rahul'
);

const value =
await redisClient.get(
  'name'
);

console.log(value);
```

Output:

```text
Rahul
```

---

# Redis Data Types

Redis supports:

```text
String

Hash

List

Set

Sorted Set
```

Most API projects start with:

```text
String
```

for caching.

---

# Set Data

Example:

```javascript
await redisClient.set(
  'user',
  JSON.stringify(user)
);
```

Store object as JSON.

---

# Get Data

Example:

```javascript
const data =
await redisClient.get(
  'user'
);

const user =
JSON.parse(data);
```

---

# Cache Aside Pattern

Most common caching pattern.

Flow:

```text
Request
 ↓
Check Cache
 ↓
Found?
 ↓
Yes → Return Cache

No
 ↓
Database
 ↓
Save To Cache
 ↓
Return Response
```

This is the pattern most companies use.

---

# Blog API Example

Without Cache:

```javascript
const blogs =
await prisma.blog.findMany();
```

Runs every request.

---

With Cache:

```javascript
const cachedBlogs =
await redisClient.get(
  'blogs'
);
```

If found:

```javascript
return JSON.parse(
  cachedBlogs
);
```

No database query required.

---

If Cache Miss:

```javascript
const blogs =
await prisma.blog.findMany();
```

Store:

```javascript
await redisClient.set(
  'blogs',
  JSON.stringify(blogs)
);
```

Return:

```javascript
return blogs;
```

---

# What is Cache Hit?

Data found in cache.

Example:

```text
Request
 ↓
Redis
 ↓
Data Found
```

Response is very fast.

---

# What is Cache Miss?

Data not found in cache.

Example:

```text
Request
 ↓
Redis
 ↓
Not Found
 ↓
Database
```

Database query is required.

---

# Cache Expiration (TTL)

TTL means:

```text
Time To Live
```

Cache should not live forever.

Example:

```javascript
await redisClient.set(
  'blogs',
  JSON.stringify(data),
  {
    EX: 60
  }
);
```

Meaning:

```text
Expire After
60 Seconds
```

---

# Why TTL Is Important

Without TTL:

```text
Old Data
```

may remain forever.

Users may see outdated information.

TTL automatically refreshes cache.

---

# Cache Invalidation

One of the hardest problems in software engineering.

Example:

```text
Blog Updated
```

Cache still contains old data.

Need:

```javascript
await redisClient.del(
  'blogs'
);
```

to remove stale cache.

---

# Cache Flow During Update

```text
Blog Updated
 ↓
Delete Cache
 ↓
Next Request
 ↓
Database
 ↓
Fresh Cache Created
```

---

# Session Storage

Redis is commonly used for sessions.

Without Redis:

```text
Session Stored
In Memory
```

Problem:

Server restart = sessions lost.

---

With Redis:

```text
Session
 ↓
Redis
```

Persistent and scalable.

---

# Rate Limiting

Protect APIs from abuse.

Example:

```text
Max
100 Requests
Per Minute
```

Redis stores request count.

Flow:

```text
User Request
 ↓
Redis Counter
 ↓
Limit Reached?
 ↓
Block Request
```

---

# Why Rate Limiting Matters

Protects against:

```text
Spam

Bots

Brute Force Attacks

API Abuse
```

---

# Redis Pub/Sub

Pub/Sub means:

```text
Publisher
 ↓
Redis
 ↓
Subscribers
```

Useful for:

```text
Notifications

Chat Applications

Real-Time Systems
```

---

# Redis Queues

Queues process tasks asynchronously.

Example:

```text
User Uploads Image
```

Instead of:

```text
Wait 10 Seconds
```

Use Queue:

```text
Request
 ↓
Queue
 ↓
Background Worker
```

User gets faster response.

---

# Common Redis Use Cases

Most companies use Redis for:

```text
Caching

Sessions

Rate Limiting

Queues

OTP Storage

Notifications

Leaderboards
```

---

# Redis vs MySQL

Redis:

```text
RAM Based

Extremely Fast

Temporary Data
```

---

MySQL:

```text
Disk Based

Permanent Data

Relational Storage
```

---

# Should Redis Replace MySQL?

No.

Redis is not usually the primary database.

Use:

```text
MySQL
```

for permanent data.

Use:

```text
Redis
```

for fast temporary access.

---

# Current Project Use Cases

Our Blog API can use Redis for:

```text
Blog Listing Cache

Blog Detail Cache

JWT Blacklist

Rate Limiting

Session Storage
```

These are realistic production improvements.

---

# Common Interview Questions

Q: What is Redis?

Answer:

Redis is an in-memory key-value database commonly used for caching, sessions, queues, rate limiting, and real-time applications.

---

Q: Why Is Redis Faster Than MySQL?

Answer:

Redis stores data in RAM, while MySQL primarily stores data on disk. RAM access is significantly faster than disk access.

---

Q: What Is a Cache Hit?

Answer:

A cache hit occurs when requested data is found in the cache and can be returned without querying the database.

---

Q: What Is a Cache Miss?

Answer:

A cache miss occurs when data is not found in the cache, requiring a database query.

---

Q: What Is TTL?

Answer:

TTL (Time To Live) defines how long cached data remains valid before Redis automatically removes it.

---

Q: What Is Cache Invalidation?

Answer:

Cache invalidation is the process of removing or updating stale cached data when the underlying data changes.

---

Q: Can Redis Replace MySQL?

Answer:

No. Redis is typically used for temporary, high-speed data access, while MySQL is used for permanent relational data storage.

---

Q: Why Use Redis For Rate Limiting?

Answer:

Redis provides extremely fast counters and expiration mechanisms, making it ideal for tracking request limits.

---

Q: What Is the Cache Aside Pattern?

Answer:

Cache Aside is a strategy where the application first checks the cache, falls back to the database on a cache miss, stores the result in cache, and then returns the data.

---

# Real Interview Scenario

Interviewer:

```text
Your blog listing API became slow.
How would you optimize it?
```

Answer:

First, I would analyze database queries and add proper indexes. Then I would implement Redis caching for frequently accessed blog listings using the Cache Aside pattern. I would add cache expiration, invalidate cache when blogs are updated, and monitor performance improvements using logging and metrics.

---

# Senior Interview Answer

Redis is a high-performance in-memory data store widely used for caching, session management, rate limiting, queues, and real-time messaging. In production systems, I commonly use the Cache Aside pattern with TTL-based expiration and proper cache invalidation strategies to reduce database load, improve response times, and increase application scalability while keeping MySQL as the source of truth.
