# System Design Fundamentals for Backend Developers

# Introduction

Most developers can build APIs.

Senior developers can design systems that handle:

```text id="8wmd7x"
Thousands

Millions

Even Billions
```

of requests.

This skill is called:

```text id="6ptg4v"
System Design
```

System Design becomes very important when interviewing for:

```text id="5nrs3j"
Senior Backend Developer

Tech Lead

Software Architect
```

roles.

---

# What is System Design?

System Design means:

```text id="4hmn8y"
Designing Software Systems
That Are

Reliable

Scalable

Maintainable

Secure
```

It is not about coding.

It is about architecture.

---

# Real World Example

Small Blog App:

```text id="h7q4pk"
100 Users
```

Simple server works.

---

Large Blog Platform:

```text id="sy8m1w"
10 Million Users
```

Now we must think about:

```text id="r5z9vn"
Scaling

Caching

Database Design

Load Balancing

Queues

CDN
```

This is System Design.

---

# Functional Requirements

First step in design.

Ask:

```text id="b2jx6q"
What Should
The System Do?
```

Example:

Blog Platform:

```text id="z3pd8m"
Create Blog

Update Blog

Delete Blog

Read Blog
```

Functional requirements define features.

---

# Non Functional Requirements

Ask:

```text id="x8kr5n"
How Should
The System Behave?
```

Examples:

```text id="v4mn2y"
Fast

Secure

Scalable

Highly Available
```

These are often more important than features.

---

# What is Scalability?

Scalability means:

```text id="p7mz3k"
Ability To Handle
Increasing Traffic
```

without crashing.

---

Example:

```text id="t5yn8q"
100 Users
```

Today.

```text id="j9kv4m"
100,000 Users
```

Tomorrow.

Application should continue working.

---

# Vertical Scaling

Increase server power.

Example:

```text id="g4nw7r"
4GB RAM
 ↓
16GB RAM
```

---

Advantages:

```text id="y6pk2n"
Simple
```

---

Disadvantages:

```text id="m3xt8v"
Limited

Expensive
```

Cannot scale forever.

---

# Horizontal Scaling

Add more servers.

Example:

```text id="z7qj4m"
Server 1

Server 2

Server 3

Server 4
```

Traffic distributed across servers.

---

Advantages:

```text id="r8km1y"
Highly Scalable

Fault Tolerant
```

---

Disadvantages:

```text id="h2px7n"
More Complex
```

---

# Interview Question

Q:

```text id="k4nm8q"
Vertical vs Horizontal Scaling?
```

Answer:

Vertical scaling increases server resources, while horizontal scaling adds more servers to distribute traffic.

---

# What is a Load Balancer?

A Load Balancer distributes incoming requests across multiple servers.

---

Without Load Balancer:

```text id="x9qr2m"
Users
 ↓
Server
```

Server overloaded.

---

With Load Balancer:

```text id="m6wy8n"
Users
 ↓
Load Balancer
 ↓
Server 1

Server 2

Server 3
```

Traffic distributed.

---

# Benefits of Load Balancer

```text id="j3vk7p"
Better Performance

High Availability

Fault Tolerance
```

---

# Popular Load Balancers

Examples:

```text id="p8mn4y"
Nginx

HAProxy

AWS ELB
```

Very common in production.

---

# What is High Availability?

High Availability means:

```text id="r5nx8m"
System Remains Available
Even If Components Fail
```

---

Example:

Server 1 crashes.

Load Balancer redirects traffic to:

```text id="z8kw3p"
Server 2

Server 3
```

Users do not notice.

---

# What is a Single Point of Failure?

A component whose failure crashes the entire system.

Example:

```text id="w4mn9k"
Only One Database
```

Database crashes.

Application stops.

Bad design.

---

# What is Database Replication?

Replication means:

```text id="q2vk6n"
Copy Database
To Multiple Servers
```

---

Architecture:

```text id="f7pw3m"
Primary Database
        ↓
Read Replica 1

Read Replica 2
```

---

Benefits:

```text id="d5mn8v"
More Read Capacity

Better Availability
```

---

# Primary Database

Handles:

```text id="g9vk2p"
INSERT

UPDATE

DELETE
```

Writes.

---

# Read Replica

Handles:

```text id="j7mn4x"
SELECT Queries
```

Reads.

---

# What is Database Sharding?

When a database becomes too large:

```text id="n4px8m"
Split Data
Across Multiple Databases
```

---

Example:

```text id="x6vn3k"
Users A-F
Database 1

Users G-M
Database 2

Users N-Z
Database 3
```

---

Benefits:

```text id="v3km8p"
Massive Scalability
```

---

Disadvantages:

```text id="z5pn2m"
Complex Queries

Complex Maintenance
```

---

# What is Caching?

Caching stores frequently accessed data.

Instead of:

```text id="p8mw4n"
Database
```

every request.

Use:

```text id="r7vk3m"
Redis
```

first.

---

Example:

```text id="t3pn8k"
Request
 ↓
Redis
 ↓
Database
```

Much faster.

---

# CDN (Content Delivery Network)

CDN stores static files closer to users.

Examples:

```text id="y4mk7n"
Images

CSS

JavaScript

Videos
```

---

Without CDN:

```text id="v8pn2m"
India User
 ↓
USA Server
```

Slow.

---

With CDN:

```text id="k6mw8p"
India User
 ↓
India CDN Node
```

Fast.

---

# Popular CDNs

```text id="m9pn4v"
Cloudflare

AWS CloudFront

Fastly
```

---

# What are Message Queues?

Used for asynchronous processing.

Examples:

```text id="z4mk8n"
BullMQ

RabbitMQ

Kafka
```

---

Example:

```text id="v7pn3m"
User Registers
 ↓
Queue
 ↓
Send Email
```

Response remains fast.

---

# Why Queues Matter

Without Queue:

```text id="j8mw4p"
Slow Response
```

---

With Queue:

```text id="q5pn7m"
Fast Response
```

Background processing.

---

# CAP Theorem

Very common senior interview question.

CAP:

```text id="t9mk3n"
Consistency

Availability

Partition Tolerance
```

---

A distributed system can guarantee:

```text id="h7pn4m"
Only Two
At The Same Time
```

---

Consistency

All users see same data.

---

Availability

System always responds.

---

Partition Tolerance

System continues working despite network failures.

---

# Example

Banking:

```text id="r4mk9p"
Consistency
+
Partition Tolerance
```

preferred.

---

Social Media:

```text id="w8pn2k"
Availability
+
Partition Tolerance
```

often preferred.

---

# Designing a Blog Platform

Functional Requirements:

```text id="p6mw8n"
Create Blog

Update Blog

Delete Blog

Read Blog
```

---

Non Functional Requirements:

```text id="n3pk7m"
Fast

Secure

Scalable
```

---

Basic Architecture

```text id="v5mk4p"
Client
 ↓
API
 ↓
Database
```

Good for small traffic.

---

Scalable Architecture

```text id="x7pn3m"
Client
 ↓
Load Balancer
 ↓
Node Servers
 ↓
Redis
 ↓
MySQL
```

Better.

---

Advanced Architecture

```text id="r9mk2n"
Client
 ↓
CDN
 ↓
Load Balancer
 ↓
API Servers
 ↓
Redis
 ↓
MySQL

BullMQ

Workers
```

Production-ready.

---

# URL Shortener Design

Interview Favorite.

Example:

```text id="m8pn4v"
tinyurl.com/abc123
```

---

Requirements:

```text id="w6mk7p"
Create Short URL

Redirect URL

Track Clicks
```

---

Database:

```text id="v4pn8m"
id

shortCode

longUrl
```

---

Flow:

```text id="k9mw2n"
User URL
 ↓
Generate Code
 ↓
Store
 ↓
Return Short URL
```

---

# System Design Interview Approach

Always ask:

### Functional Requirements

```text id="t5pn7k"
What Features?
```

---

### Non Functional Requirements

```text id="r3mk8n"
Scale?

Performance?

Availability?
```

---

### Database Design

```text id="m7pn4k"
Tables

Relations

Indexes
```

---

### Traffic Estimation

```text id="z8mw3n"
Users?

Requests Per Second?
```

---

### Bottlenecks

```text id="p2pn9m"
Database

Network

CPU

Memory
```

---

### Scaling Strategy

```text id="x4mk7n"
Load Balancer

Cache

Queue

Replication
```

---

# Common Interview Questions

Q: What is Scalability?

Answer:

Scalability is the ability of a system to handle increasing traffic without significant performance degradation.

---

Q: Vertical vs Horizontal Scaling?

Answer:

Vertical scaling upgrades a server's resources, while horizontal scaling adds more servers to distribute traffic.

---

Q: What is a Load Balancer?

Answer:

A load balancer distributes incoming traffic across multiple servers to improve availability and performance.

---

Q: Why Use Redis?

Answer:

Redis provides fast in-memory caching, reducing database load and improving response times.

---

Q: What is Database Replication?

Answer:

Replication creates copies of a database on multiple servers to improve read performance and availability.

---

Q: What is Sharding?

Answer:

Sharding splits data across multiple databases to support very large datasets and high traffic.

---

Q: What is a CDN?

Answer:

A CDN stores static content closer to users to reduce latency and improve loading speed.

---

Q: What is CAP Theorem?

Answer:

CAP Theorem states that distributed systems can guarantee only two of Consistency, Availability, and Partition Tolerance simultaneously.

---

# Real Interview Scenario

Interviewer:

```text id="n7mw4p"
Your Blog API now has
5 million users.
How would you scale it?
```

Answer:

I would introduce a load balancer, deploy multiple Node.js instances, implement Redis caching, use database replication for reads, move heavy tasks to BullMQ workers, serve static assets through a CDN, and continuously monitor performance metrics.

---

# Senior Interview Answer

When designing scalable backend systems, I focus on eliminating bottlenecks through horizontal scaling, caching, asynchronous processing, database optimization, and high-availability architectures. I evaluate trade-offs between consistency, availability, and performance, then choose patterns such as load balancing, replication, sharding, queues, and CDNs based on business requirements and expected traffic growth.
