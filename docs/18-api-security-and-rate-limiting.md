# API Security and Rate Limiting

# Introduction

A backend API may work perfectly, but if it is not secure:

```text
Data Can Be Stolen

Accounts Can Be Hacked

Servers Can Be Crashed

Business Can Lose Money
```

As backend developers, our responsibility is not only to build APIs but also to protect them.

Security is one of the most frequently asked topics in Node.js interviews, especially for developers with 3–8 years of experience.

---

# What is API Security?

API Security means:

```text
Protecting APIs From
Unauthorized Access,
Attacks, And Data Leaks
```

Goals:

```text
Confidentiality

Integrity

Availability
```

These three principles form the foundation of application security.

---

# Real World Example

Imagine:

```http
POST /api/login
```

Without security:

```text
Anyone Can Attack

Unlimited Attempts

Password Guessing

Account Takeover
```

Result:

```text
Security Breach
```

---

# OWASP Top 10

OWASP stands for:

```text
Open Web Application
Security Project
```

OWASP publishes the most common web security risks.

Every backend developer should know the basics.

---

# Most Important OWASP Risks

```text
Broken Authentication

SQL Injection

Cross Site Scripting (XSS)

Security Misconfiguration

Sensitive Data Exposure

Broken Access Control
```

These appear frequently in interviews.

---

# Authentication vs Authorization

Very common interview question.

Authentication:

```text
Who Are You?
```

Example:

```text
Login
```

---

Authorization:

```text
What Can You Do?
```

Example:

```text
Admin Can Delete Users

Author Cannot Delete Users
```

---

# Password Security

Never store passwords like:

```javascript
password:
'123456'
```

Bad.

If database leaks:

```text
All Passwords Exposed
```

---

# Password Hashing

Always hash passwords.

Popular package:

```bash
npm install bcrypt
```

---

# Example

```javascript
const bcrypt =
require('bcrypt');

const hashedPassword =
await bcrypt.hash(
  password,
  10
);
```

Store:

```text
Hashed Password
```

instead of the original password.

---

# Why Hashing Matters

Original:

```text
123456
```

Hash:

```text
$2b$10$...
```

Cannot easily be reversed.

Protects users.

---

# Password Verification

Example:

```javascript
await bcrypt.compare(
  password,
  user.password
);
```

Used during login.

---

# What is JWT?

JWT stands for:

```text
JSON Web Token
```

Used for:

```text
Authentication
```

after login.

---

# JWT Flow

```text
Login
 ↓
Verify User
 ↓
Generate JWT
 ↓
Return Token
 ↓
Protected Routes
```

Very common architecture.

---

# JWT Security Best Practices

Never store:

```text
Sensitive Information
```

inside JWT payload.

Bad:

```javascript
{
  password:
  '123456'
}
```

Never do this.

---

Good:

```javascript
{
  id: 1,
  role: 'ADMIN'
}
```

Only store necessary information.

---

# JWT Expiration

Always set expiration.

Example:

```javascript
jwt.sign(
  payload,
  secret,
  {
    expiresIn:
    '1d'
  }
);
```

Benefits:

```text
Reduced Risk
```

if token leaks.

---

# Environment Variables

Never hardcode secrets.

Bad:

```javascript
JWT_SECRET =
'secret123'
```

---

Good:

```javascript
process.env.JWT_SECRET
```

Store secrets in:

```text
.env
```

---

# SQL Injection

One of the oldest attacks.

Bad Query:

```javascript
const query =

"SELECT * FROM users
WHERE email='"

+ email +

"'";
```

Attacker Input:

```text
' OR 1=1 --
```

Can bypass authentication.

---

# Solution

Use ORM or parameterized queries.

Prisma Example:

```javascript
await prisma.user.findUnique({
  where: {
    email
  }
});
```

Prisma protects against SQL injection.

---

# What is XSS?

XSS means:

```text
Cross Site Scripting
```

Attacker injects JavaScript into pages.

Example:

```html
<script>
alert('Hacked')
</script>
```

Dangerous.

---

# XSS Impact

Can steal:

```text
Cookies

Tokens

Session Data
```

---

# XSS Prevention

Validate and sanitize user input.

Never trust user data.

Use:

```text
Input Validation

Output Escaping
```

---

# What is CSRF?

CSRF means:

```text
Cross Site Request
Forgery
```

Attacker tricks users into performing actions without permission.

Example:

```text
Transfer Money

Delete Account

Change Password
```

without user's intention.

---

# CSRF Protection

Use:

```text
CSRF Tokens

SameSite Cookies

Proper Authentication
```

---

# What is CORS?

CORS stands for:

```text
Cross Origin
Resource Sharing
```

Controls:

```text
Which Domains
Can Access Your API
```

---

# Example

Install:

```bash
npm install cors
```

---

Configuration:

```javascript
app.use(
  cors({
    origin:
    'https://myapp.com'
  })
);
```

Only allow trusted domains.

---

# What is Helmet?

Helmet helps secure Express applications.

Installation:

```bash
npm install helmet
```

---

Usage:

```javascript
const helmet =
require('helmet');

app.use(
  helmet()
);
```

Adds security-related HTTP headers.

---

# Why Helmet Is Important

Protects against:

```text
Clickjacking

MIME Attacks

XSS Related Risks
```

Simple but powerful.

---

# What is Rate Limiting?

Rate Limiting controls:

```text
How Many Requests
A User Can Make
```

within a time period.

---

# Real World Example

Limit:

```text
100 Requests
Per Minute
```

User exceeds limit:

```text
429 Too Many Requests
```

returned.

---

# Why Rate Limiting Matters

Protects against:

```text
Spam

Bots

Brute Force Attacks

DDoS Attempts
```

Very important.

---

# Express Rate Limit

Installation:

```bash
npm install express-rate-limit
```

---

Example:

```javascript
const rateLimit =
require(
'express-rate-limit'
);

const limiter =
rateLimit({

  windowMs:
  15 * 60 * 1000,

  max: 100

});

app.use(
  limiter
);
```

Meaning:

```text
100 Requests
Per 15 Minutes
```

---

# Login Rate Limiting

More strict:

```text
5 Attempts

Per Minute
```

Useful against password guessing attacks.

---

# Brute Force Attack

Attacker tries:

```text
123456

password

admin123

qwerty
```

thousands of times.

Rate limiting helps stop this.

---

# API Key Security

Some APIs use:

```text
API Keys
```

Example:

```http
Authorization:
Api-Key XXXXX
```

Keep keys private.

Rotate keys regularly.

---

# Role Based Access Control

Example:

```text
ADMIN

AUTHOR

USER
```

Permissions differ.

---

Admin:

```text
Delete User
```

Author:

```text
Create Blog
```

User:

```text
Read Blog
```

Authorization layer enforces this.

---

# Security Logging

Log:

```text
Failed Logins

Permission Denied

Rate Limit Violations

Suspicious Activity
```

Useful for investigations.

---

# Secure Error Responses

Bad:

```json
{
  "error":
  "Database Password Wrong"
}
```

Leaks information.

---

Good:

```json
{
  "message":
  "Internal Server Error"
}
```

Hide sensitive details.

---

# Security Headers

Examples:

```text
X-Frame-Options

Content-Security-Policy

X-Content-Type-Options
```

Helmet handles most of these.

---

# Current Project Security Features

Our Blog API currently includes:

```text
JWT Authentication

Role Based Access

Input Validation

Error Handling

Password Hashing
```

Future improvements:

```text
Helmet

Rate Limiting

Redis-Based Rate Limiting

Refresh Tokens

Email Verification
```

---

# Security Checklist

Before production:

```text
Hash Passwords

Use HTTPS

Validate Input

Protect JWT Secrets

Enable Helmet

Enable Rate Limiting

Restrict CORS

Log Security Events
```

Every project should follow this.

---

# Common Interview Questions

Q: What is API Security?

Answer:

API Security is the practice of protecting APIs from unauthorized access, attacks, data breaches, and misuse.

---

Q: Authentication vs Authorization?

Answer:

Authentication verifies identity, while authorization determines what actions an authenticated user is allowed to perform.

---

Q: Why Use bcrypt?

Answer:

bcrypt hashes passwords securely so that original passwords are not stored in the database.

---

Q: What is SQL Injection?

Answer:

SQL Injection is an attack where malicious input manipulates database queries to access or modify unauthorized data.

---

Q: How Does Prisma Prevent SQL Injection?

Answer:

Prisma uses parameterized queries and query builders instead of string concatenation.

---

Q: What is XSS?

Answer:

Cross Site Scripting (XSS) occurs when attackers inject malicious JavaScript into web pages viewed by other users.

---

Q: What is Helmet?

Answer:

Helmet is Express middleware that adds security-related HTTP headers to protect web applications.

---

Q: What is Rate Limiting?

Answer:

Rate limiting restricts how many requests a user can make within a specific period to prevent abuse and attacks.

---

Q: Why Is JWT Expiration Important?

Answer:

Token expiration limits the damage if a JWT is leaked or stolen.

---

# Real Interview Scenario

Interviewer:

```text
Your login API
is under brute-force attack.
What would you do?
```

Answer:

I would implement rate limiting, monitor failed login attempts, temporarily block suspicious IPs, use bcrypt for password hashing, enforce strong passwords, and log all suspicious activities for analysis.

---

# Senior Interview Answer

Security must be considered at every layer of the application. I use bcrypt for password hashing, JWT with expiration for authentication, role-based authorization, Prisma to prevent SQL injection, Helmet for security headers, CORS restrictions, input validation with Zod, and rate limiting to protect APIs from abuse. I also implement secure logging, monitoring, and secret management through environment variables to maintain production-grade security.
