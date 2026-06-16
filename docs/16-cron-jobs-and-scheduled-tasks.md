# Cron Jobs and Scheduled Tasks

# Introduction

Not every task in a backend application is triggered by a user request.

Some tasks need to run automatically at specific times.

Examples:

```text id="n7v4x2"
Daily Reports

Subscription Expiry Checks

Database Cleanup

Email Reminders

Backup Jobs

Analytics Processing
```

These are called:

```text id="m3k8w1"
Scheduled Tasks
```

and are commonly implemented using:

```text id="x5n2v7"
Cron Jobs
```

---

# What is a Cron Job?

A Cron Job is a task that runs automatically according to a schedule.

Examples:

```text id="q9m4v2"
Every Minute

Every Hour

Every Day

Every Week

Every Month
```

Instead of a user triggering the action:

```text id="v2n7k4"
Time
```

triggers the action.

---

# Real World Example

Netflix:

```text id="k8m3v6"
Generate Daily Reports
```

E-commerce:

```text id="w4n9x2"
Expire Coupons
```

Banking:

```text id="c7m5v8"
Generate Statements
```

SaaS Applications:

```text id="h2n8w4"
Check Subscription Expiry
```

Cron jobs are everywhere.

---

# Linux Cron Concept

Cron originally comes from Linux.

Example:

```bash id="f5v8k3"
0 0 * * *
```

Meaning:

```text id="m9n2w6"
Run Every Day
At Midnight
```

Node.js libraries implement the same concept.

---

# Popular Node.js Cron Library

Most popular package:

```bash id="x8m4v1"
npm install node-cron
```

Used in thousands of production applications.

---

# Basic Cron Job

Example:

```javascript id="p4n7w2"
const cron =
require('node-cron');

cron.schedule(
  '* * * * *',
  () => {
    console.log(
      'Running'
    );
  }
);
```

Runs:

```text id="z6m3v8"
Every Minute
```

---

# Cron Expression Structure

Format:

```text id="j7n2w5"
* * * * *
│ │ │ │ │
│ │ │ │ └ Day Of Week
│ │ │ └ Month
│ │ └ Day
│ └ Hour
└ Minute
```

Very common interview question.

---

# Every Minute

```javascript id="v3m8w1"
'* * * * *'
```

Meaning:

```text id="k5n9v2"
Every Minute
```

---

# Every Hour

```javascript id="r4m2w7"
'0 * * * *'
```

Meaning:

```text id="y8n5v1"
Every Hour
```

---

# Every Day At Midnight

```javascript id="m2n8w4"
'0 0 * * *'
```

Meaning:

```text id="h7m4v2"
12:00 AM Daily
```

---

# Every Monday

```javascript id="x3n7w8"
'0 0 * * 1'
```

Meaning:

```text id="f8m2v4"
Every Monday
```

---

# Why Use Cron Jobs?

Without Cron:

```text id="q5n4w7"
Manual Work
```

Someone must remember to perform tasks.

With Cron:

```text id="j8m3v5"
Automatic Execution
```

No human intervention required.

---

# Subscription Expiry Example

Imagine:

```text id="p9n2w8"
Monthly Membership
```

Need:

```text id="v4m7w1"
Check Expired Users
Every Night
```

Cron Flow:

```text id="m8n4v2"
Cron
 ↓
Find Expired Users
 ↓
Deactivate Accounts
```

Very common SaaS requirement.

---

# Reminder Email Example

Every morning:

```text id="x6m3w8"
Send Reminder Email
```

Cron:

```text id="z4n7v1"
8:00 AM Daily
```

Automatically sends emails.

---

# Cleanup Job Example

Applications generate:

```text id="q8m2v5"
Logs

Temporary Files

Expired Tokens
```

Cron can remove them.

Flow:

```text id="w3n8v2"
Every Night
 ↓
Delete Old Records
```

Keeps database clean.

---

# Analytics Example

Large applications generate reports.

Example:

```text id="r9m4v1"
Daily Sales Report
```

Cron:

```text id="t7n2w6"
12:00 AM
```

Generates reports automatically.

---

# Cron Service Structure

Good Structure:

```text id="v5m8n3"
src/

cron/

├── subscription.cron.js
├── cleanup.cron.js
├── report.cron.js
```

Each job separated.

---

# Example Structure

```javascript id="y2m7w4"
cron.schedule(
  '0 0 * * *',

  async () => {

    await
    subscriptionService
    .checkExpired();

  }
);
```

Clean and maintainable.

---

# Cron + Database Example

Example:

```javascript id="x7m4v2"
const expiredUsers =
await prisma.user.findMany(
{
  status:
  'ACTIVE'
}
);
```

Process records automatically.

---

# Cron + Email Example

Flow:

```text id="n4m8v1"
Cron
 ↓
Get Users
 ↓
Send Emails
```

Useful for:

```text id="w8m2v7"
Reminders

Reports

Notifications
```

---

# Cron + Queue Architecture

Bad:

```text id="v7m3w2"
Cron
 ↓
Heavy Task
```

Cron becomes slow.

---

Good:

```text id="m2n9v4"
Cron
 ↓
Queue Job
 ↓
Worker
 ↓
Process
```

Most production applications follow this approach.

---

# Example

Cron:

```javascript id="p8m4v7"
await queue.add(
  'daily-report'
);
```

Worker:

```javascript id="n5m2v8"
Generate Report
```

Much more scalable.

---

# Common Cron Jobs

Most companies use cron for:

```text id="x4n8v2"
Subscription Checks

Reminder Emails

Database Cleanup

Data Sync

Backups

Report Generation
```

---

# What Not To Do

Bad:

```text id="r2m7v5"
Generate Huge PDFs

AI Processing

Video Conversion
```

directly inside cron.

Instead:

```text id="m8v4n2"
Cron
 ↓
Queue
 ↓
Worker
```

---

# Cron Job Failure Handling

Sometimes jobs fail.

Reasons:

```text id="w7n2v4"
Database Down

Redis Down

Network Failure
```

Need:

```text id="x5m8v1"
Logging

Retries

Monitoring
```

Always log cron failures.

---

# Example

```javascript id="q3m7v8"
try {

  await processTask();

}
catch(error){

  logger.error(
    error.message
  );

}
```

Production best practice.

---

# Time Zone Issues

Common mistake:

```text id="m6n4v2"
Server Time
≠
User Time
```

Example:

```text id="x9m2v5"
UTC

IST

EST
```

may differ.

Always be careful with time zones.

---

# Monitoring Cron Jobs

Monitor:

```text id="p4n7v2"
Last Run Time

Success Count

Failure Count

Execution Time
```

Important for production systems.

---

# Current Project Use Cases

Our Blog API can use cron jobs for:

```text id="y8m3v4"
Daily Analytics

Email Reports

Inactive User Cleanup

Blog Statistics

Automated Notifications
```

Realistic production examples.

---

# Cron vs Queue

Cron:

```text id="m2v8n5"
Time Based
```

Example:

```text id="v5m3n7"
Every Day
```

---

Queue:

```text id="x7n4v1"
Event Based
```

Example:

```text id="r8m2v4"
User Registered
```

Different responsibilities.

---

# Cron vs Worker

Cron:

```text id="w2m7v8"
Schedules Tasks
```

Worker:

```text id="p8n4v2"
Executes Tasks
```

Often used together.

---

# Common Interview Questions

Q: What is a Cron Job?

Answer:

A Cron Job is a scheduled task that runs automatically at predefined intervals without user interaction.

---

Q: Why Use node-cron?

Answer:

node-cron provides a simple way to schedule recurring tasks inside Node.js applications using cron expressions.

---

Q: Give Real World Cron Examples.

Answer:

Subscription expiry checks, daily reports, backup jobs, reminder emails, analytics generation, and cleanup operations.

---

Q: What Is a Cron Expression?

Answer:

A cron expression defines when a scheduled task should execute using fields for minute, hour, day, month, and weekday.

---

Q: Cron vs Queue?

Answer:

Cron executes tasks based on time schedules, while queues process tasks triggered by application events.

---

Q: Why Use Queue With Cron?

Answer:

Heavy operations should be delegated to queues so cron jobs remain lightweight and scalable.

---

Q: What Problems Can Occur With Cron Jobs?

Answer:

Time zone issues, duplicate execution, failed tasks, database outages, and lack of monitoring.

---

# Real Interview Scenario

Interviewer:

```text id="v8m4n1"
Every night
expired subscriptions
must be deactivated.
How would you implement it?
```

Answer:

I would create a node-cron scheduled job that runs every night, queries expired subscriptions from the database, updates their status, logs execution results, and pushes heavy processing to BullMQ if needed.

---

# Senior Interview Answer

Cron jobs are used to automate recurring business processes such as subscription management, reporting, cleanup tasks, notifications, and data synchronization. In production environments, I keep cron jobs lightweight, use queues for heavy processing, implement proper logging and monitoring, and carefully manage time zone handling to ensure reliable scheduled task execution.

