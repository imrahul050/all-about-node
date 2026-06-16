# Microservices and Monolithic Architecture

# Introduction

One of the most common senior backend interview questions is:

```text
Should we use
Monolith
or
Microservices?
```

Many developers know the definitions but struggle to explain:

```text
When To Use Them

Advantages

Disadvantages

Real World Scenarios
```

Understanding this topic helps you think like a software architect rather than just a developer.

---

# What is Software Architecture?

Software Architecture defines:

```text
How Different Parts
Of The Application
Are Organized
And Communicate
```

Two popular architectures:

```text
Monolithic Architecture

Microservices Architecture
```

---

# What is Monolithic Architecture?

Monolithic means:

```text
Entire Application
Runs As
One Single Project
```

Everything exists in one codebase.

Example:

```text
User Module

Blog Module

Payment Module

Notification Module
```

inside one application.

---

# Monolithic Example

Structure:

```text
src

├── users

├── blogs

├── payments

├── notifications
```

Single deployment.

Single database.

Single server.

---

# Real World Example

Our current Blog API is:

```text
Monolithic
```

Because:

```text
Authentication

Blogs

Users

Roles

Validation

Upload
```

all exist inside one application.

---

# Advantages of Monolith

### Easy Development

Everything exists in one project.

```text
Simple
```

for beginners.

---

### Easy Debugging

You can trace execution quickly.

```text
Request
 ↓
Controller
 ↓
Service
 ↓
Repository
```

inside one application.

---

### Easy Deployment

Deploy only:

```text
One Application
```

instead of multiple services.

---

### Lower Infrastructure Cost

No need for:

```text
Kafka

RabbitMQ

Service Discovery

API Gateway
```

Initially cheaper.

---

# Disadvantages of Monolith

### Large Codebase

As application grows:

```text
100,000+

500,000+

1 Million+ Lines
```

code becomes difficult to manage.

---

### Slow Deployment

Small change:

```text
Notification Module
```

requires deployment of entire application.

---

### Scalability Problems

Suppose:

```text
Blog Module
```

receives heavy traffic.

You still scale:

```text
Entire Application
```

which wastes resources.

---

### Technology Lock-In

Entire project uses:

```text
Node.js
```

Changing a single module to another technology becomes difficult.

---

# What is Microservices Architecture?

Microservices means:

```text
Application
Split Into
Small Independent Services
```

Each service handles one business domain.

---

# Example

Instead of one application:

```text
Blog Service

Auth Service

Notification Service

Payment Service
```

All separate.

---

# Architecture

```text
Client
  ↓
API Gateway
  ↓
---------------------
Auth Service

Blog Service

Payment Service

Notification Service
---------------------
```

Each service is independent.

---

# Benefits of Microservices

### Independent Deployment

Update:

```text
Blog Service
```

without deploying:

```text
Payment Service
```

---

### Independent Scaling

Heavy traffic on:

```text
Blog Service
```

Scale only that service.

---

Example:

```text
Blog Service

10 Servers
```

while:

```text
Payment Service

2 Servers
```

---

### Better Team Management

Large company:

```text
Team A → Auth

Team B → Payment

Team C → Blog
```

Each team owns its service.

---

### Technology Flexibility

Example:

```text
Auth → Node.js

Payment → Java

AI Service → Python
```

Possible in microservices.

---

# Disadvantages of Microservices

### Increased Complexity

Instead of:

```text
1 Application
```

you now manage:

```text
10+

20+

50+ Services
```

---

### Network Calls

Monolith:

```text
Function Call
```

Microservice:

```text
HTTP Request

or

Message Queue
```

Slower.

---

### More Infrastructure

Need:

```text
API Gateway

Load Balancer

Monitoring

Redis

Kafka

Service Discovery
```

---

### Debugging Complexity

Request may pass through:

```text
Gateway

Auth Service

Blog Service

Notification Service
```

Finding bugs becomes harder.

---

# Monolith vs Microservices

| Feature             | Monolith | Microservices |
| ------------------- | -------- | ------------- |
| Deployment          | Single   | Multiple      |
| Complexity          | Low      | High          |
| Scalability         | Limited  | Excellent     |
| Learning Curve      | Easy     | Difficult     |
| Infrastructure Cost | Low      | High          |
| Team Size           | Small    | Large         |

---

# Interview Question

Q:

```text
Which Is Better?
```

Answer:

Neither is always better.

The correct choice depends on:

```text
Team Size

Project Size

Traffic

Business Requirements
```

---

# When Should You Use Monolith?

Good for:

```text
Startups

MVPs

Small Teams

Internal Tools

Learning Projects
```

---

# When Should You Use Microservices?

Good for:

```text
Large Teams

Large Products

Millions Of Users

Independent Scaling Needs
```

---

# API Gateway

Microservices often use:

```text
API Gateway
```

---

Role:

```text
Single Entry Point
```

for clients.

---

Architecture:

```text
Client
 ↓
API Gateway
 ↓
Services
```

---

Responsibilities

```text
Authentication

Routing

Rate Limiting

Logging

Monitoring
```

---

# Service Communication

Services communicate using:

### Synchronous Communication

```text
HTTP

REST API

gRPC
```

---

Example:

```text
Blog Service
 ↓
User Service
```

waits for response.

---

### Asynchronous Communication

Uses:

```text
RabbitMQ

Kafka

BullMQ
```

---

Example:

```text
Order Created
 ↓
Queue
 ↓
Email Service
```

No waiting.

---

# Event Driven Architecture

Popular in Microservices.

Service publishes:

```text
Event
```

Other services react.

---

Example

```text
User Registered
```

Event emitted.

---

Consumers:

```text
Email Service

Analytics Service

Notification Service
```

All receive event.

---

# Benefits of Event Driven Architecture

```text
Loose Coupling

Better Scalability

Independent Services
```

Very common in enterprise systems.

---

# Kafka

Kafka is:

```text
Distributed Event Streaming Platform
```

Used by:

```text
Netflix

LinkedIn

Uber
```

---

Use Cases

```text
Analytics

Notifications

Logs

Event Streaming
```

---

# RabbitMQ

RabbitMQ is:

```text
Message Broker
```

Used for:

```text
Task Processing

Background Jobs

Queues
```

---

# Kafka vs RabbitMQ

Kafka:

```text
High Throughput

Event Streaming

Big Data
```

---

RabbitMQ:

```text
Reliable Queues

Task Processing

Simple Integration
```

---

# Distributed Systems Challenges

Microservices introduce challenges.

---

### Network Failure

Server may become unavailable.

---

### Service Failure

One service crashes.

Others must continue.

---

### Data Consistency

Multiple databases create complexity.

---

### Monitoring

Need centralized monitoring.

Examples:

```text
Grafana

Prometheus

ELK Stack
```

---

# What is a Distributed Transaction?

Example:

```text
Order Service

Payment Service
```

Both must succeed.

---

Problem:

```text
Payment Success

Order Failure
```

System becomes inconsistent.

---

# Saga Pattern

Popular solution.

Instead of:

```text
One Large Transaction
```

Use:

```text
Multiple Small Transactions
```

with rollback logic.

---

# Example

```text
Create Order

Process Payment

Send Email
```

---

If payment fails:

```text
Cancel Order
```

Automatically.

---

# Why Saga Pattern?

Traditional database transactions do not work across multiple services.

Saga provides consistency.

---

# Real World Example

E-commerce Platform:

Services:

```text
Auth Service

User Service

Order Service

Payment Service

Inventory Service

Notification Service
```

Each service owns its own database.

---

# Our Current Project

Our Blog API currently follows:

```text
Modular Monolithic Architecture
```

because:

```text
Blog Module

Auth Module

Role Module
```

are separated internally.

This is actually a very good architecture for startups.

---

# Future Migration Path

As traffic grows:

```text
Monolith
 ↓
Modular Monolith
 ↓
Microservices
```

This is how most successful companies evolve.

---

# Common Interview Questions

Q: What is Monolithic Architecture?

Answer:

Monolithic architecture is a software architecture where all modules run inside a single application and are deployed together.

---

Q: What is Microservices Architecture?

Answer:

Microservices architecture splits an application into multiple independent services that communicate through APIs or messaging systems.

---

Q: Monolith vs Microservices?

Answer:

Monolith is simpler and easier to manage, while microservices provide better scalability and team independence but introduce additional complexity.

---

Q: What is an API Gateway?

Answer:

An API Gateway is a central entry point that routes requests to appropriate services while handling authentication, logging, monitoring, and rate limiting.

---

Q: What is Event Driven Architecture?

Answer:

Event Driven Architecture is a design pattern where services communicate through events instead of direct service calls.

---

Q: Kafka vs RabbitMQ?

Answer:

Kafka is designed for high-throughput event streaming, while RabbitMQ is designed for reliable message queue processing.

---

Q: What is the Saga Pattern?

Answer:

Saga Pattern manages distributed transactions by breaking them into smaller transactions and executing compensating actions when failures occur.

---

Q: Should Startups Use Microservices?

Answer:

Usually no. Startups should start with a modular monolith and move to microservices only when scaling requirements justify the added complexity.

---

# Real Interview Scenario

Interviewer:

```text
Would you build
a new startup product
using Microservices?
```

Answer:

No. I would start with a modular monolith because it is simpler, faster to develop, easier to deploy, and less expensive to maintain. Once the application grows and scaling requirements become clear, I would gradually extract high-traffic modules into microservices.

---

# Senior Interview Answer

I consider microservices a scalability solution rather than a default architecture. For most new products, I prefer a modular monolith because it provides simplicity and faster development. As the business grows, I identify bounded contexts, isolate domains, and gradually extract services where independent deployment, scaling, and team ownership provide clear business value. Successful architecture decisions are driven by business needs, not trends.
