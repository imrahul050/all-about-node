# Logging, Monitoring and Debugging

# Introduction

Writing code is only one part of backend development.

A senior backend developer must also answer:

```text
What happens when production breaks?
```

Examples:

* API suddenly becomes slow
* Database connection fails
* Users cannot login
* Payment gateway stops responding
* Server memory usage becomes high

Without proper logging and monitoring:

```text
You are blind
```

You cannot understand what happened.

This is why every production application requires:

```text
Logging
Monitoring
Debugging
```

---

# What is Logging?

Logging means recording important application events.

Examples:

```text
User Login

User Registration

Blog Creation

Payment Success

Payment Failure

System Errors
```

Logs help developers understand what happened in the application.

---

# Why Logging Is Important

Imagine a user reports:

```text
I cannot create a blog
```

Without logs:

```text
Guessing
```

With logs:

```text
Check Logs
↓
Find Error
↓
Fix Issue
```

Much faster.

---

# Real World Example

Request:

```http
POST /api/blogs
```

Log:

```text
[INFO]
Blog Create Request

User: 5
Time: 10:30 AM
```

Now you know:

* Who performed the action
* When it happened
* Which endpoint was used

---

# Types of Logs

Most systems use multiple log levels.

---

# INFO Logs

Used for normal application activity.

Example:

```text
User Logged In

Blog Created

Order Placed
```

---

# WARN Logs

Something unusual happened.

Application still works.

Example:

```text
Multiple Failed Login Attempts

High Memory Usage
```

---

# ERROR Logs

Something failed.

Example:

```text
Database Connection Failed

Payment Failed

JWT Verification Failed
```

---

# DEBUG Logs

Used while developing.

Example:

```javascript
console.log(user);
```

Provides detailed internal information.

Usually disabled in production.

---

# Log Levels Summary

```text
DEBUG
 ↓
INFO
 ↓
WARN
 ↓
ERROR
```

---

# What is Morgan?

Morgan is an Express middleware used for:

```text
HTTP Request Logging
```

Installation:

```bash
npm install morgan
```

---

# Morgan Example

```javascript
const morgan =
require('morgan');

app.use(
  morgan('dev')
);
```

Request:

```http
GET /blogs
```

Output:

```text
GET /blogs 200 45ms
```

Very useful during development.

---

# Why Morgan Is Useful

Automatically logs:

```text
Method

URL

Status Code

Response Time
```

No manual coding required.

---

# What is Winston?

Winston is a professional logging library.

Installation:

```bash
npm install winston
```

---

# Why Winston Instead of console.log?

Bad:

```javascript
console.log(error);
```

Problems:

```text
No Log Levels

No Log Files

Hard To Search
```

---

Good:

```javascript
logger.error(error);
```

Benefits:

```text
Structured Logs

Log Files

Multiple Outputs

Production Ready
```

---

# Winston Example

```javascript
const winston =
require('winston');

const logger =
winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ]
});
```

---

# Writing Logs

Example:

```javascript
logger.info(
  'User Logged In'
);
```

Output:

```text
INFO:
User Logged In
```

---

# Error Logging

Example:

```javascript
logger.error(
  error.message
);
```

Useful when exceptions occur.

---

# Logging Inside Error Middleware

Current Project:

```text
Error Middleware
```

can be improved.

Example:

```javascript
logger.error({
  message:
  err.message,

  stack:
  err.stack
});
```

Now every application error gets logged.

---

# What is Monitoring?

Logging tells:

```text
What Happened
```

Monitoring tells:

```text
How System Is Performing
```

Examples:

```text
CPU Usage

Memory Usage

API Response Time

Database Performance
```

---

# Why Monitoring Matters

Imagine:

```text
Server Response Time

200ms
```

becomes:

```text
5 Seconds
```

Users complain.

Monitoring helps detect this before users report it.

---

# Important Metrics

Monitor:

```text
CPU Usage

RAM Usage

Disk Space

Request Count

Response Time

Error Rate
```

These are the most common production metrics.

---

# What is Application Performance Monitoring (APM)?

APM tools track:

```text
Requests

Database Queries

Exceptions

Performance Bottlenecks
```

Examples:

```text
New Relic

Datadog

Elastic APM

Sentry
```

---

# What is Sentry?

Sentry is one of the most popular error tracking tools.

Installation:

```bash
npm install @sentry/node
```

Purpose:

```text
Automatically Capture Errors
```

---

# Example

Application Error:

```javascript
throw new Error(
  'Database Failed'
);
```

Sentry records:

```text
Message

Stack Trace

Request

User
```

without manual work.

---

# What is Debugging?

Debugging means finding and fixing problems in software.

Example:

```text
Bug Report
      ↓
Find Cause
      ↓
Fix Issue
```

---

# Common Debugging Techniques

### Console Logging

Example:

```javascript
console.log(user);
```

Simple but limited.

---

### Breakpoints

Using VS Code:

```text
Click Left Margin
```

Execution pauses.

You can inspect:

```text
Variables

Objects

Functions
```

---

### Request Tracing

Follow request flow:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

Find where failure occurs.

---

# Debugging Database Problems

Example:

```javascript
prisma.blog.findMany()
```

returns:

```text
[]
```

Check:

```text
Database

Filters

Query Conditions

Environment Variables
```

Never assume code is wrong first.

---

# Debugging API Problems

Checklist:

```text
Route

Middleware

Controller

Service

Repository

Database
```

Check each layer one by one.

---

# Production Debugging Process

When an issue occurs:

```text
User Reports Problem
        ↓
Check Logs
        ↓
Identify Error
        ↓
Reproduce Locally
        ↓
Fix
        ↓
Deploy
        ↓
Monitor
```

This is the real-world workflow.

---

# Audit Logs

Audit Logs record important business actions.

Examples:

```text
User Deleted

Role Changed

Password Updated

Order Approved
```

Useful for:

```text
Security

Compliance

Investigations
```

---

# Request Logging Example

Store:

```text
Method

URL

IP Address

User ID

Timestamp
```

Example:

```text
POST /blogs

User: 5

IP: 192.168.1.10
```

Very useful for troubleshooting.

---

# Logging Best Practices

Do:

```text
Log Errors

Log Important Actions

Log Authentication Events

Log Payment Events
```

---

Do Not:

```text
Log Passwords

Log JWT Secrets

Log Credit Card Numbers
```

Sensitive data should never appear in logs.

---

# Development vs Production Logging

Development:

```text
Verbose Logging
```

Example:

```javascript
console.log()
```

everywhere.

---

Production:

```text
Structured Logging
```

Using:

```text
Winston

Sentry

Datadog
```

---

# Current Project Improvements

Current Blog API:

```text
JWT Authentication

Custom Exceptions

Global Error Handler
```

Next Improvements:

```text
Morgan

Winston

Sentry

Request Logging
```

These would make the project more production-ready.

---

# Common Interview Questions

Q: What is Logging?

Answer:

Logging is the process of recording application events, errors, and activities to help monitor and troubleshoot systems.

---

Q: Difference Between Logging and Monitoring?

Answer:

Logging records events that occurred, while monitoring tracks system health and performance metrics over time.

---

Q: Why Use Winston Instead of console.log?

Answer:

Winston provides log levels, file storage, structured logging, and production-grade logging capabilities that console.log lacks.

---

Q: What is Morgan?

Answer:

Morgan is an Express middleware that automatically logs incoming HTTP requests, response status codes, and response times.

---

Q: What is Sentry?

Answer:

Sentry is an error monitoring platform that automatically captures exceptions, stack traces, and request details from applications.

---

Q: What Metrics Should Be Monitored?

Answer:

CPU usage, memory usage, disk space, response time, request count, and error rate are among the most important metrics.

---

Q: Why Are Audit Logs Important?

Answer:

Audit logs track important user actions and provide accountability, security, compliance support, and troubleshooting information.

---

# Senior Interview Answer

Logging, monitoring, and debugging are essential parts of operating production systems. Logging helps track application events and errors, monitoring provides visibility into system health and performance, and debugging helps identify and resolve issues efficiently. In production environments, I prefer structured logging with Winston, request logging with Morgan, centralized error tracking with Sentry, and performance monitoring through APM tools to ensure reliability and maintainability.
