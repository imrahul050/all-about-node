# Authentication and JWT Complete Guide

# Introduction

Authentication is one of the most important parts of any backend application.

Almost every application requires users to prove their identity before accessing protected resources.

Examples:

* Facebook Login
* Gmail Login
* Banking Applications
* E-commerce Websites
* Admin Panels

Without authentication, anyone could access sensitive information.

In our project, authentication is implemented using:

```text
JWT (JSON Web Token)
```

---

# What is Authentication?

Authentication is the process of verifying who a user is.

Example:

User enters:

```text
Email
Password
```

System verifies:

```text
Does this user exist?
Is password correct?
```

If yes:

```text
User is authenticated
```

If no:

```text
Access denied
```

---

# Authentication vs Authorization

This is one of the most asked interview questions.

Authentication:

```text
Who are you?
```

Authorization:

```text
What are you allowed to do?
```

Example:

User logs into Admin Panel.

Authentication:

```text
Verify user identity
```

Authorization:

```text
Can this user access admin features?
```

---

# Real World Example

Imagine an airport.

Authentication:

```text
Show Passport
```

Authorization:

```text
Can you enter Business Lounge?
```

Different concepts.

---

# What is JWT?

JWT stands for:

```text
JSON Web Token
```

JWT is a secure way of transmitting user information between client and server.

Instead of storing sessions in the database, the server generates a token.

The client sends that token with future requests.

---

# Why JWT Was Created

Traditional session-based authentication has some limitations.

Problems:

* Session storage required
* Scaling becomes difficult
* Additional database lookups

JWT solves these problems by storing authentication information inside the token itself.

Benefits:

* Stateless
* Fast
* Scalable
* Widely adopted

---

# JWT Structure

A JWT contains three parts:

```text
Header
Payload
Signature
```

Format:

```text
xxxxx.yyyyy.zzzzz
```

Example:

```text
eyJhbGciOi...
```

---

# Header

Contains metadata.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Meaning:

```text
Algorithm = HS256

Type = JWT
```

---

# Payload

Contains user information.

Example:

```json
{
  "id": 1,
  "email": "rahul@gmail.com",
  "role": "AUTHOR"
}
```

Important:

Never store:

```text
Passwords
Credit Cards
Sensitive Data
```

inside JWT payload.

JWT payload can be decoded.

---

# Signature

Signature protects token integrity.

Generated using:

```text
Header
+
Payload
+
Secret Key
```

If someone modifies payload:

```text
Token becomes invalid
```

This prevents tampering.

---

# JWT Authentication Flow

Step 1

User Login:

```http
POST /api/auth/login
```

---

Step 2

Server verifies:

```text
Email
Password
```

---

Step 3

Generate JWT:

```javascript
jwt.sign(...)
```

---

Step 4

Return token:

```json
{
  "token": "xxxxx.yyyyy.zzzzz"
}
```

---

Step 5

Client stores token.

Usually:

```text
Local Storage
Cookie
Mobile Storage
```

---

Step 6

Client sends token:

```http
Authorization: Bearer token
```

---

Step 7

Server verifies token.

---

Step 8

Protected resource is returned.

---

# JWT Flow Diagram

```text
Login
  ↓
Verify Credentials
  ↓
Generate JWT
  ↓
Return Token
  ↓
Store Token
  ↓
Send Token In Requests
  ↓
Verify Token
  ↓
Access Granted
```

---

# Password Hashing

Never store passwords directly.

Bad:

```text
123456
```

Good:

```text
$2b$10$8sdjks...
```

This is called hashing.

In our project:

```text
bcryptjs
```

is used.

---

# Why Hash Passwords?

Imagine database leakage.

Without hashing:

```text
All passwords exposed
```

With hashing:

```text
Passwords protected
```

Even developers should not know user passwords.

---

# Registration Flow in Our Project

```text
Register Request
        ↓
Validation
        ↓
Hash Password
        ↓
Save User
        ↓
Return Success
```

---

# Login Flow in Our Project

```text
Login Request
        ↓
Find User
        ↓
Compare Password
        ↓
Generate JWT
        ↓
Return Token
```

---

# JWT Middleware

Purpose:

Protect routes.

Example:

```javascript
router.post(
  '/blogs',
  authMiddleware,
  createBlog
);
```

Before controller executes:

```text
JWT Validation
```

happens.

---

# How Middleware Works

Step 1

Read Authorization Header:

```javascript
req.headers.authorization
```

---

Step 2

Extract Token:

```text
Bearer token
```

---

Step 3

Verify Token:

```javascript
jwt.verify(...)
```

---

Step 4

Find User

---

Step 5

Attach User:

```javascript
req.user = user
```

---

Step 6

Continue:

```javascript
next()
```

---

# Why Do We Store User in req.user?

Without:

```javascript
req.user
```

every controller would need:

```javascript
findUser()
```

again.

By attaching the user once:

```javascript
req.user.id

req.user.role
```

becomes available everywhere.

---

# Authorization Example

Create Blog:

```text
AUTHOR
```

Allowed.

Delete Any User:

```text
ADMIN
```

Only.

This is authorization.

---

# Common JWT Errors

Expired Token:

```text
401 Unauthorized
```

Invalid Token:

```text
401 Unauthorized
```

No Token:

```text
401 Unauthorized
```

Insufficient Permission:

```text
403 Forbidden
```

---

# Current Project Authentication Flow

```text
Route
   ↓
Auth Middleware
   ↓
JWT Verify
   ↓
Find User
   ↓
req.user
   ↓
Controller
   ↓
Service
   ↓
Response
```

---

# Most Important Interview Questions

Q: What is JWT?

Answer:

JWT (JSON Web Token) is a compact and secure token format used to authenticate users and transfer information between client and server in a stateless manner.

---

Q: What are the three parts of JWT?

Answer:

A JWT consists of:

```text
Header
Payload
Signature
```

---

Q: Why JWT instead of Sessions?

Answer:

JWT is stateless, scalable, and does not require server-side session storage. This makes it suitable for distributed systems and modern APIs.

---

Q: Can JWT Payload Be Decoded?

Answer:

Yes.

JWT payload can be decoded.

It should never contain sensitive information such as passwords.

---

Q: Why Hash Passwords?

Answer:

Passwords are hashed to protect user credentials. Even if the database is compromised, attackers cannot directly read original passwords.

---

Q: Difference Between Authentication and Authorization?

Answer:

Authentication verifies identity.

Authorization determines permissions.

Authentication comes first, then authorization.

---

Q: Why Attach User to req.user?

Answer:

Attaching the authenticated user to req.user avoids repeated database lookups and makes user information available throughout the request lifecycle.

---

# Senior Interview Answer

Explain JWT Flow:

User logs in with email and password. The server validates credentials and generates a JWT containing basic user information. The client stores this token and sends it in the Authorization header with future requests. Authentication middleware verifies the token, retrieves the user, attaches it to req.user, and allows access to protected resources. Authorization checks can then determine what actions the user is allowed to perform.
