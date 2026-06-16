# All About Node

A production-style Node.js backend project built to learn modern backend development, software architecture, API development, database design, authentication, authorization, and interview preparation.

This project is being developed phase by phase, covering beginner to advanced backend concepts used in real-world applications.

---

# Project Goals

* Learn Node.js from beginner to advanced level
* Build production-ready REST APIs
* Understand backend architecture and design patterns
* Prepare for Node.js developer interviews
* Learn database design and ORM concepts
* Learn authentication and authorization
* Learn file uploads, PDF generation, AI integration, caching, deployment, and more

---

# Technology Stack

| Technology   | Purpose             |
| ------------ | ------------------- |
| Node.js      | JavaScript Runtime  |
| Express.js   | Backend Framework   |
| MySQL        | Relational Database |
| Prisma ORM   | Database ORM        |
| JWT          | Authentication      |
| Bcrypt       | Password Hashing    |
| Multer       | File Upload         |
| Zod          | Request Validation  |
| Git & GitHub | Version Control     |

---

# Features Implemented

## Authentication Module

* User Registration
* User Login
* Password Hashing using Bcrypt
* JWT Authentication
* Protected Routes

## Authorization Module

* Role Based Access Control
* Admin Role
* Author Role

## Blog Module

* Create Blog
* Update Blog
* Delete Blog
* View Blog
* Upload Blog Image
* Unique Slug Generation

## Architecture

* Repository Pattern
* Service Layer Pattern
* Global Response Helper
* Exception Handling
* Validation Middleware
* Resource & Collection Pattern

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

Move into project directory:

```bash
cd all-about-node
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Copy example file:

```bash
cp .env.example .env
```

Update environment values:

```env
PORT=5001

DATABASE_URL=mysql://username:password@127.0.0.1:3307/node_blog_api

JWT_SECRET=your-secret-key

APP_URL=http://localhost:5001
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

Purpose:
Generates the Prisma Client used to communicate with the database.

---

## Run Database Migrations

```bash
npx prisma migrate dev
```

Purpose:
Creates and applies database tables from Prisma schema.

---

## Start Development Server

```bash
npm run dev
```

Server will start on:

```text
http://localhost:5001
```

---

# Available Commands

| Command                | Description              |
| ---------------------- | ------------------------ |
| npm run dev            | Start development server |
| npm start              | Start production server  |
| npx prisma generate    | Generate Prisma Client   |
| npx prisma migrate dev | Run migrations           |
| npx prisma studio      | Open Prisma GUI          |
| git status             | Check Git status         |
| git push               | Push code to GitHub      |

---

# Project Structure

```text
src/
├── config/
├── exceptions/
├── middleware/
├── modules/
├── prisma/
├── utils/
└── validations/

docs/
├── 01-project-overview.md
├── 02-nodejs-fundamentals.md
├── 03-expressjs.md
├── ...
```

---

# Documentation

Detailed documentation is available inside the docs folder.

Each document contains:

* Concept Explanation
* Why It Is Used
* Installation
* Code Examples
* Interview Questions
* Best Practices
* Common Errors
* Project Implementation

---

# Current Learning Progress

Completed:

* Project Setup
* Express Setup
* MySQL Integration
* Prisma ORM
* Authentication
* Authorization
* Blog CRUD
* File Upload
* Validation
* Exception Handling

Upcoming:

* Categories
* Tags
* Search
* Pagination
* Filtering
* Swagger Documentation
* Redis
* PDF Generation
* AI Integration
* Docker
* Testing
* AWS Deployment

---

# License

This project is created for learning, interview preparation, and backend architecture practice.
