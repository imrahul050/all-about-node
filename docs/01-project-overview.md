# Project Overview

## Introduction

All About Node is a production-style backend project created to learn modern Node.js development from beginner to advanced level.

The project follows industry-standard architecture and best practices commonly used in real-world applications.

The goal of this project is not only to build APIs but also to understand why certain architectural decisions are made and how to explain them during interviews.

---

# Project Objectives

The project was created to:

* Learn Node.js backend development
* Understand REST API development
* Learn authentication and authorization
* Understand software architecture
* Learn database design using MySQL
* Learn Prisma ORM
* Learn design patterns used in production applications
* Prepare for Node.js developer interviews

---

# Current Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using Bcrypt

## Authorization

* Admin Role
* Author Role
* Protected Routes

## Blog Management

* Create Blog
* Update Blog
* Delete Blog
* View Blog
* Upload Blog Image
* Unique Slug Generation

## System Features

* Request Validation
* Exception Handling
* Global API Response Format
* Repository Pattern
* Service Layer Pattern
* Resource & Collection Pattern

---

# Architecture Overview

The project follows a layered architecture.

```text
Client
   ↓
Routes
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma ORM
   ↓
MySQL Database
```

Each layer has a specific responsibility.

---

# Request Flow

Example:

Create Blog Request

```http
POST /api/author/blogs
```

Flow:

```text
Request
   ↓
Route
   ↓
Validation Middleware
   ↓
Authentication Middleware
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
   ↓
Response Resource
   ↓
JSON Response
```

---

# Why We Use Controller Layer

Controller is responsible for:

* Receiving requests
* Calling services
* Returning responses

Controllers should contain minimal business logic.

Bad Practice:

```text
Controller contains database queries and business logic.
```

Good Practice:

```text
Controller delegates work to services.
```

---

# Why We Use Service Layer

The Service Layer contains business logic.

Examples:

* Generate blog slug
* Check ownership
* Check permissions
* Apply business rules

Benefits:

* Cleaner controllers
* Reusable business logic
* Easier testing

---

# Why We Use Repository Pattern

Repository Layer communicates with the database.

Benefits:

* Database logic remains separate
* Easier maintenance
* Easier migration to another database
* Cleaner architecture

Without Repository:

```text
Controller → Prisma
```

With Repository:

```text
Controller → Service → Repository → Prisma
```

---

# Why We Use Prisma ORM

Prisma is used because:

* Type-safe database queries
* Migration support
* Auto-generated client
* Better developer experience
* Reduced SQL-related bugs

---

# Why We Use JWT Authentication

JWT allows stateless authentication.

Benefits:

* No server-side session storage
* Scalable architecture
* Widely used in APIs
* Easy integration with frontend applications

---

# Why We Use Zod Validation

Zod is used to validate incoming requests.

Benefits:

* Prevent invalid data
* Better error messages
* Type-safe validation
* Easy integration with APIs

---

# API Response Structure

Every API follows a common response format.

Success Response:

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {}
}
```

Error Response:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": []
}
```

Benefits:

* Consistent API responses
* Easier frontend integration
* Easier debugging

---

# Folder Structure

```text
src
│
├── config
├── exceptions
├── middleware
├── modules
│   ├── auth
│   └── blog
│
├── prisma
├── utils
└── server.js
```

---

# Design Patterns Used

Current Patterns:

* Repository Pattern
* Service Layer Pattern
* Middleware Pattern
* Resource Pattern

Future Patterns:

* Strategy Pattern
* Factory Pattern
* Dependency Injection

---

# Interview Explanation

Question:

Describe your Node.js project.

Answer:

I built a production-style Blog API using Node.js, Express.js, MySQL, and Prisma ORM.

The project follows layered architecture using Controllers, Services, and Repositories.

Authentication is implemented using JWT, authorization is role-based, validation is handled through Zod, and database operations are managed through Prisma.

The project also includes image uploads, exception handling, API resources, and reusable response helpers to maintain clean and scalable code.

This architecture helps separate concerns and improves maintainability, scalability, and testability.

---

# Future Roadmap

Upcoming Features:

* Categories
* Tags
* Search
* Pagination
* Filtering
* Swagger Documentation
* Redis Caching
* Email Service
* PDF Generation
* AI Integration
* Docker
* Unit Testing
* AWS Deployment

These features will gradually transform the project into a complete production-ready backend system.
