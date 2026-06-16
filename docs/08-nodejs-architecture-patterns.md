# Node.js Architecture Patterns

# Introduction

One of the biggest differences between a beginner and a senior backend developer is not coding speed.

It is:

```text
Code Organization
```

Most beginners write everything inside controllers.

Example:

```text
Controller
   ↓
Validation
   ↓
Business Logic
   ↓
Database Queries
   ↓
Response
```

Initially this works.

As the project grows:

* Difficult to maintain
* Difficult to test
* Difficult to scale
* Difficult for teams to work together

This is why architecture patterns exist.

---

# What is Software Architecture?

Software Architecture is the structure of an application.

It defines:

* Where code should live
* How modules communicate
* Responsibilities of each layer
* Dependency flow

Think of architecture as the blueprint of a building.

Without a blueprint:

```text
Chaos
```

With a blueprint:

```text
Organized Development
```

---

# Why Architecture Matters

Small Project:

```text
500 Lines
```

Anything works.

Large Project:

```text
50,000+ Lines
```

Bad architecture becomes a nightmare.

Good architecture provides:

* Maintainability
* Scalability
* Testability
* Reusability
* Team Collaboration

---

# Evolution of Backend Architecture

Most developers evolve like this:

Stage 1

```text
Single File
```

Everything inside:

```javascript
app.js
```

---

Stage 2

```text
Routes
Controllers
```

---

Stage 3

```text
MVC
```

---

Stage 4

```text
Controller
↓
Service
↓
Repository
```

Enterprise Architecture

This is what we use in our project.

---

# MVC Architecture

MVC stands for:

```text
Model
View
Controller
```

---

# Model

Responsible for:

```text
Database
```

Examples:

```text
User

Blog

Order
```

Models interact with data.

---

# View

Responsible for:

```text
UI
```

Examples:

```text
HTML

React

Next.js
```

In API projects:

```text
Views Usually Don't Exist
```

because APIs return JSON.

---

# Controller

Responsible for:

```text
Request Handling
```

Controllers should:

* Receive Request
* Call Service
* Return Response

Controllers should NOT contain heavy business logic.

---

# MVC Flow

```text
Request
   ↓
Controller
   ↓
Model
   ↓
Database
   ↓
Response
```

Simple and effective.

---

# Problems with Pure MVC

As projects grow:

Controllers become huge.

Example:

```javascript
createBlog()
```

contains:

* Validation
* Authorization
* Business Rules
* Database Queries
* Response Formatting

This becomes difficult to maintain.

---

# Service Layer Pattern

To solve controller bloat:

```text
Controller
↓
Service
```

was introduced.

---

# What is Service Layer?

Service Layer contains:

```text
Business Logic
```

Examples:

```text
Create Blog

Generate Slug

Check Ownership

Calculate Commission

Send Email
```

These are business rules.

---

# Service Layer Example

Bad:

```javascript
controller
  ↓
prisma
```

Good:

```text
Controller
    ↓
Service
    ↓
Repository
```

---

# Controller Responsibility

Controller should:

```text
Receive Request

Call Service

Return Response
```

Nothing more.

---

# Example

Controller:

```javascript
const blog =
await blogService.createBlog(
  req.body,
  req.user
);
```

Business logic remains inside service.

---

# Service Responsibility

Service should:

```text
Business Rules
```

Examples:

* Generate Slug
* Validate Ownership
* Check Permissions
* Process Payments
* Calculate Discounts

---

# Example

```javascript
const slug =
slugify(title);
```

belongs in:

```text
Service Layer
```

not controller.

---

# Repository Pattern

Repository Layer handles:

```text
Database Access
```

Purpose:

Keep database logic separate from business logic.

---

# Repository Example

Instead of:

```javascript
prisma.blog.create()
```

inside service,

use:

```javascript
blogRepository.create()
```

Service does not care which database is used.

---

# Repository Benefits

Benefits:

```text
Cleaner Services

Easier Testing

Database Abstraction

Better Maintainability
```

---

# Resource Pattern

Purpose:

Control API responses.

Without resources:

```javascript
return blog;
```

returns everything.

Example:

```json
{
  "id": 1,
  "password": "hashed"
}
```

Dangerous.

---

# Resource Example

```javascript
blogResource(blog)
```

Returns:

```json
{
  "id": 1,
  "title": "Node Blog"
}
```

Only required fields.

---

# Collection Pattern

Single Record:

```javascript
blogResource(blog)
```

Multiple Records:

```javascript
blogCollection(blogs)
```

Provides consistent API responses.

---

# Middleware Pattern

Middleware sits between:

```text
Request
↓
Controller
```

Examples:

```text
Authentication

Validation

Authorization

File Upload

Logging
```

---

# Middleware Flow

```text
Request
   ↓
Middleware
   ↓
Controller
   ↓
Response
```

---

# Authentication Middleware

Example:

```javascript
authMiddleware
```

Responsibilities:

```text
Verify JWT

Find User

Attach req.user
```

---

# Validation Middleware

Example:

```javascript
validate(
  createBlogSchema
)
```

Responsibilities:

```text
Validate Input

Return Errors

Continue Request
```

---

# Error Handling Pattern

Bad:

```javascript
try {
}
catch {
}
```

inside every controller.

---

Good:

```javascript
asyncHandler()
```

and

```javascript
errorMiddleware()
```

Centralized error handling.

---

# Dependency Flow

Our Project Flow:

```text
Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Prisma
 ↓
Database
```

Response:

```text
Database
 ↓
Repository
 ↓
Service
 ↓
Resource
 ↓
Response Helper
 ↓
Client
```

---

# Current Project Structure

```text
src/

├── config/

├── middleware/

├── exceptions/

├── utils/

├── modules/

│   ├── auth/
│   └── blog/

├── prisma/

└── app.js
```

This is a modular architecture.

---

# Why Modular Architecture?

Instead of:

```text
controllers/
models/
routes/
```

for the entire application,

we group by feature:

```text
auth/

blog/

user/

order/
```

Benefits:

* Easier Scaling
* Better Team Collaboration
* Cleaner Structure

---

# Separation of Concerns

One of the most important software engineering principles.

Each layer should have:

```text
One Responsibility
```

Controller:

```text
HTTP
```

Service:

```text
Business Logic
```

Repository:

```text
Database
```

Resource:

```text
Response Formatting
```

Middleware:

```text
Cross-Cutting Concerns
```

---

# Architecture of Our Blog API

```text
Request

 ↓

Route

 ↓

Auth Middleware

 ↓

Validation Middleware

 ↓

Controller

 ↓

Service

 ↓

Repository

 ↓

Prisma

 ↓

MySQL

 ↓

Resource

 ↓

Response Helper

 ↓

JSON Response
```

This is close to what many production Node.js applications use.

---

# Common Interview Questions

Q: What is MVC?

Answer:

MVC stands for Model View Controller. It separates application responsibilities into data management, presentation, and request handling layers.

---

Q: Why Use Service Layer?

Answer:

The Service Layer contains business logic and keeps controllers small, maintainable, and reusable.

---

Q: Why Use Repository Pattern?

Answer:

Repository Pattern separates database operations from business logic and provides a clean abstraction over the data layer.

---

Q: Why Not Use Prisma Directly in Controllers?

Answer:

Using Prisma directly in controllers couples request handling with database logic, making the application harder to maintain and test.

---

Q: What is Middleware?

Answer:

Middleware is a function that executes between the request and controller, commonly used for authentication, validation, logging, and authorization.

---

Q: What is Separation of Concerns?

Answer:

Separation of Concerns is the practice of dividing an application into layers where each layer has a single responsibility.

---

Q: What is Modular Architecture?

Answer:

Modular Architecture organizes code by business features such as auth, blog, and user rather than grouping everything by technical type.

---

# Senior Interview Answer

A well-structured Node.js application should separate responsibilities across layers. Controllers handle HTTP concerns, services contain business logic, repositories manage database access, middleware handles cross-cutting concerns, and resources format responses. This architecture improves maintainability, scalability, testability, and team productivity while reducing coupling between components.
