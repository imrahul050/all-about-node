# Express.js Complete Guide

# Introduction

Express.js is one of the most popular backend frameworks in the Node.js ecosystem. Almost every Node.js developer works with Express at some point because it provides a simple and organized way to build APIs and web applications.

In our project "All About Node", Express acts as the foundation layer that receives requests, processes them through middleware, calls business logic, and sends responses back to the client.

Understanding Express properly is important because many interview questions are based on how requests flow through an Express application.

---

# What is Express.js?

Express.js is a minimal and flexible web application framework built on top of Node.js.

Node.js provides the runtime environment, but it does not provide an easy way to manage routes, middleware, request handling, and responses. Express solves this problem by providing a clean and structured framework.

In simple words:

Node.js gives us the engine.

Express gives us the vehicle.

Without Express, we would need to manually handle routing, request parsing, and many other backend tasks.

---

# Why Was Express.js Created?

When Node.js was introduced, developers had to use the native HTTP module.

Example:

```javascript
const http = require('http');

const server = http.createServer(
  (req, res) => {
    res.end('Hello World');
  }
);

server.listen(5001);
```

This works, but as applications grow, managing routes and requests becomes difficult.

Imagine building:

* User APIs
* Blog APIs
* Authentication APIs
* Admin APIs

Using only the HTTP module would create a lot of repetitive code.

Express was created to simplify backend development and reduce boilerplate code.

---

# Why Do We Use Express.js?

Express helps developers:

* Create APIs faster
* Manage routes easily
* Use middleware
* Handle requests and responses
* Organize project structure
* Build scalable applications

Real-world benefit:

Instead of spending time writing infrastructure code, developers can focus on business logic.

---

# How Express Works Internally

When a request reaches the server, Express processes it through a chain of middleware and route handlers.

Request Flow:

```text
Client
   ↓
Express Application
   ↓
Middleware
   ↓
Route Handler
   ↓
Controller
   ↓
Response
```

Every incoming request passes through this pipeline.

This architecture is one of the main reasons Express is easy to extend and maintain.

---

# Installing Express

Install Express:

```bash
npm install express
```

Verify installation:

```bash
npm list express
```

---

# Creating Your First Express Server

Example:

```javascript
const express = require('express');

const app = express();

app.listen(5001, () => {
  console.log('Server running on port 5001');
});
```

Explanation:

1. We import Express.
2. We create an application instance.
3. We start listening on a specific port.
4. The server becomes ready to accept requests.

---

# What is app?

```javascript
const app = express();
```

The app object represents the entire Express application.

Think of it as the central manager of your backend application.

Responsibilities:

* Register routes
* Register middleware
* Configure application settings
* Handle requests
* Send responses

Every Express application starts with an app object.

---

# What is app.listen()?

Example:

```javascript
app.listen(5001);
```

Purpose:

This method starts the HTTP server and makes the application available for incoming requests.

Without calling listen(), the server exists in memory but cannot accept requests.

Real-world example:

When you run:

```bash
npm run dev
```

Express internally executes app.listen() and starts the application.

---

# Interview Question

Q: What is Express.js?

Answer:

Express.js is a lightweight and flexible web framework built on top of Node.js. It simplifies backend development by providing features such as routing, middleware, request handling, and response management. It helps developers build scalable APIs and web applications with less boilerplate code.

---

# Interview Question

Q: Why do we use Express instead of the Node.js HTTP module?

Answer:

The native HTTP module can create servers, but managing routes, middleware, error handling, and request processing becomes difficult as applications grow.

Express provides a structured architecture, middleware support, and simpler APIs, which significantly improves development speed and maintainability.

---

# Real Project Example

In our project:

```text
All About Node
```

Express is responsible for:

* Receiving API requests
* Running authentication middleware
* Running validation middleware
* Calling controllers
* Returning JSON responses

Example request:

```http
POST /api/auth/login
```

Flow:

```text
Request
   ↓
Express Route
   ↓
Validation Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
   ↓
Response
```

This is exactly how production-grade backend applications are designed.


# Request Object (req)

Whenever a client sends a request to an Express application, Express creates a Request Object and passes it to the route handler.

The Request Object contains all information about the incoming request, such as:

* Request Body
* URL Parameters
* Query Parameters
* Headers
* Authentication Data
* Uploaded Files

Think of the Request Object as a container that carries everything sent by the client.

---

# Why Do We Need the Request Object?

Without the request object, the server would not know:

* Who sent the request
* What data was sent
* Which record should be updated
* What filters were applied

Every dynamic operation depends on the request object.

Real-world example:

When a user logs in, the email and password are available through the request object.

---

# Common Properties of Request Object

## req.body

Contains data sent in POST, PUT, or PATCH requests.

Example Request:

```json id="d2v0q9"
{
  "email": "rahul@gmail.com",
  "password": "123456"
}
```

Access:

```javascript id="1zjlwm"
req.body.email

req.body.password
```

Current Project Example:

```javascript id="8bzx2p"
const user =
  await authService.login(
    req.body
  );
```

---

## req.params

Used to access route parameters.

Route:

```javascript id="y2m6m1"
router.get('/blogs/:id');
```

Request:

```http id="1r0xpm"
GET /blogs/10
```

Access:

```javascript id="2tvznn"
req.params.id
```

Output:

```javascript id="4w2w0g"
10
```

Real-world use:

Fetching a specific blog by ID.

---

## req.query

Used to access query parameters.

Request:

```http id="wazc2q"
GET /blogs?page=1&limit=10
```

Access:

```javascript id="u3up4w"
req.query.page

req.query.limit
```

Output:

```javascript id="d9t0qz"
1
10
```

Real-world use:

* Pagination
* Search
* Sorting
* Filtering

Our blog listing APIs use query parameters extensively.

---

## req.headers

Contains request headers.

Example:

```javascript id="jqg2v9"
req.headers.authorization
```

Common use:

Reading JWT tokens.

Example:

```http id="9n0g4m"
Authorization: Bearer token
```

Current Project:

Authentication middleware reads the token from request headers.

---

## req.user

This property does not exist by default.

We manually attach it after successful authentication.

Example:

```javascript id="0xq2si"
req.user = user;
```

After that:

```javascript id="pmmtvx"
req.user.id

req.user.role
```

can be accessed anywhere in the request lifecycle.

Real-world use:

Checking ownership and permissions.

---

# Response Object (res)

The Response Object is used to send data back to the client.

After processing a request, Express uses the response object to return results.

Think of it as the server's reply to the client.

Without a response, the request would remain pending forever.

---

# Common Response Methods

## res.send()

Used to send text or simple responses.

Example:

```javascript id="ydyb8j"
res.send('Hello World');
```

---

## res.json()

Used to send JSON data.

Example:

```javascript id="4h6u2i"
res.json({
  success: true
});
```

Most API applications use JSON responses.

---

## res.status()

Used to set HTTP status codes.

Example:

```javascript id="w9gq7l"
res.status(201).json({
  success: true
});
```

---

# Why We Created a Response Helper

Instead of writing:

```javascript id="tv9x11"
res.status(200).json({
  success: true,
  message: 'Success',
  data
});
```

inside every controller, we created a reusable helper.

Example:

```javascript id="t5h5wz"
response(
  res,
  200,
  true,
  'Success',
  data
);
```

Benefits:

* Consistent API responses
* Less code duplication
* Easier frontend integration
* Easier maintenance

---

# What is Middleware?

Middleware is one of the most important concepts in Express.

A middleware is a function that executes between receiving a request and sending a response.

It has access to:

```javascript id="3vwgcw"
req
res
next
```

Middleware can:

* Modify requests
* Modify responses
* Validate data
* Authenticate users
* Log requests
* Stop execution
* Pass control to the next middleware

---

# Why Was Middleware Introduced?

Imagine we have 100 protected APIs.

Without middleware:

```javascript id="2v5ic7"
Check JWT

Check User

Check Role
```

would have to be written inside every controller.

This creates duplication.

Middleware solves this problem by centralizing reusable logic.

Write once.

Use everywhere.

---

# Middleware Syntax

```javascript id="b5mgyn"
const middleware = (
  req,
  res,
  next
) => {

  next();

};
```

---

# What is next()?

next() passes control to the next middleware or controller.

Example:

```javascript id="8v5hku"
const middleware = (
  req,
  res,
  next
) => {

  console.log('Running');

  next();

};
```

Without next():

```javascript id="n9o6v7"
Request
```

gets stuck and never reaches the controller.

This is a very common beginner mistake.

---

# Types of Middleware

## Application Middleware

Runs for all requests.

Example:

```javascript id="jlwm9v"
app.use(express.json());
```

Purpose:

Parse JSON request bodies.

---

## Route Middleware

Runs only for specific routes.

Example:

```javascript id="3lzhmy"
router.post(
  '/blogs',
  authMiddleware,
  createBlog
);
```

Only this route uses the middleware.

---

## Error Middleware

Handles application errors centrally.

Example:

```javascript id="75u39u"
app.use(errorMiddleware);
```

Benefits:

* Cleaner code
* Consistent errors
* Easier debugging

---

# Real Project Example

Create Blog API:

```http id="3k5fmo"
POST /api/author/blogs
```

Request Flow:

```text id="xylf73"
Request
   ↓
Authentication Middleware
   ↓
Validation Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
   ↓
Response Helper
   ↓
Client
```

Notice how middleware executes before the controller.

This is exactly how production applications work.

---

# Common Interview Questions

Q: What is Middleware?

Answer:

Middleware is a function that executes between receiving a request and sending a response. It can access the request object, response object, and next function. Middleware is commonly used for authentication, validation, logging, error handling, and request processing.

---

Q: What is next()?

Answer:

The next() function passes control to the next middleware or route handler in the request lifecycle. If next() is not called, the request remains pending and never reaches the controller.

---

Q: Difference Between req.params and req.query?

Answer:

req.params is used for route parameters.

Example:

```http id="31qq4f"
/blogs/10
```

req.query is used for query parameters.

Example:

```http id="1oc3mi"
/blogs?page=1
```

---

Q: Why Use Middleware Instead of Controllers?

Answer:

Middleware promotes code reusability and separation of concerns. Logic such as authentication, validation, and logging can be written once and reused across multiple routes instead of duplicating it inside controllers.



# Routing in Express.js

# What is Routing?

Routing is the mechanism that determines how an application responds to a specific client request.

Whenever a request reaches the server, Express checks:

* Requested URL
* HTTP Method
* Matching Route

and then executes the appropriate controller.

In simple terms:

Routing acts like a traffic controller that decides which code should execute for a particular request.

---

# Why Do We Need Routing?

Imagine an application with:

* Login API
* Register API
* Blog APIs
* User APIs
* Admin APIs

If routing did not exist, Express would not know which function should handle which request.

Routing creates a clear mapping between URLs and backend logic.

Example:

```http
POST /api/auth/login
```

should execute:

```javascript
loginController
```

while

```http
POST /api/auth/register
```

should execute:

```javascript
registerController
```

---

# Basic Route Example

```javascript
app.get('/users', (req, res) => {

  res.send('Users List');

});
```

Explanation:

```text
GET      → HTTP Method

/users   → Route Path

Callback → Route Handler
```

When a client requests:

```http
GET /users
```

Express executes the callback function.

---

# Route Methods

## GET

Used to fetch data.

Example:

```javascript
router.get('/blogs');
```

Real-world use:

* Get users
* Get blogs
* Get categories

---

## POST

Used to create new records.

Example:

```javascript
router.post('/blogs');
```

Real-world use:

* Create blog
* Register user
* Create category

---

## PUT

Used to completely update a record.

Example:

```javascript
router.put('/blogs/:id');
```

---

## PATCH

Used for partial updates.

Example:

```javascript
router.patch('/blogs/:id');
```

---

## DELETE

Used to remove records.

Example:

```javascript
router.delete('/blogs/:id');
```

---

# What is Express Router?

As projects grow, placing all routes inside one file becomes difficult to manage.

Bad Example:

```javascript
app.get(...)
app.post(...)
app.put(...)
app.delete(...)

200+ routes
```

Single file becomes messy.

Express Router solves this problem.

---

# Creating Router

Example:

```javascript
const express = require('express');

const router = express.Router();
```

Now routes can be grouped separately.

Example:

```javascript
router.post('/login');

router.post('/register');
```

---

# Why Express Router is Important

Benefits:

* Better organization
* Modular structure
* Easier maintenance
* Team collaboration
* Scalable architecture

This is the approach used in enterprise applications.

---

# Real Project Example

Current Structure:

```text
src/modules/

├── auth
│
├── blog
│
└── user
```

Inside Blog Module:

```text
blog/

├── controllers
├── services
├── repositories
├── routes
└── validations
```

Routes remain isolated from other modules.

This improves maintainability.

---

# Route Parameters

Route Parameters are dynamic values inside URLs.

Example:

```javascript
router.get('/blogs/:id');
```

Request:

```http
GET /blogs/15
```

Access:

```javascript
req.params.id
```

Output:

```javascript
15
```

---

# Why Route Parameters Are Used

Used when identifying a specific resource.

Examples:

```http
GET /users/1

GET /blogs/10

DELETE /orders/100
```

Without route parameters, dynamic operations become difficult.

---

# Query Parameters

Query Parameters provide additional information to the server.

Example:

```http
GET /blogs?page=1&limit=10
```

Access:

```javascript
req.query.page

req.query.limit
```

Output:

```javascript
1
10
```

---

# Real World Use Cases

Pagination:

```http
GET /blogs?page=1
```

Search:

```http
GET /blogs?search=node
```

Filtering:

```http
GET /blogs?status=PUBLISHED
```

Sorting:

```http
GET /blogs?sort=createdAt
```

---

# Route Grouping

Large applications group routes based on functionality.

Example:

Authentication Routes

```text
/api/auth/*
```

Blog Routes

```text
/api/blogs/*
```

Admin Routes

```text
/api/admin/*
```

This creates a clean API structure.

---

# Example Route Group Structure

```javascript
app.use('/api/auth', authRoutes);

app.use('/api/blogs', blogRoutes);

app.use('/api/admin', adminRoutes);
```

Request:

```http
POST /api/auth/login
```

Automatically goes to:

```javascript
authRoutes
```

---

# Modular Routing Architecture

Beginner Approach:

```text
routes.js

500 lines
```

Production Approach:

```text
auth.routes.js

blog.routes.js

user.routes.js

admin.routes.js
```

Benefits:

* Easier debugging
* Easier testing
* Better scalability
* Better code ownership

---

# Real Project Flow

Create Blog Request

```http
POST /api/author/blogs
```

Flow:

```text
author.routes.js
        ↓
blog.controller.js
        ↓
blog.service.js
        ↓
blog.repository.js
        ↓
Prisma
        ↓
Database
```

This layered structure is commonly used in production applications.

---

# Interview Question

Q: What is Routing?

Answer:

Routing is the process of determining how an application responds to a client request based on the request URL and HTTP method. It allows developers to map specific URLs to specific business logic.

---

# Interview Question

Q: What is Express Router?

Answer:

Express Router is a mini Express application used to create modular and reusable route groups. It helps organize routes into separate files and improves maintainability in large applications.

---

# Interview Question

Q: Difference Between Route Parameters and Query Parameters?

Answer:

Route Parameters identify a specific resource.

Example:

```http
GET /blogs/10
```

Query Parameters provide additional information.

Example:

```http
GET /blogs?page=1
```

Route Parameters are generally mandatory while Query Parameters are usually optional.

---

# Interview Question

Q: Why Do We Use Modular Routing?

Answer:

Modular routing improves code organization, scalability, maintainability, and team collaboration. It allows different modules to manage their own routes independently instead of keeping all routes inside a single file.

---

# Common Beginner Mistakes

1. Putting all routes in one file.

Problem:

Difficult to maintain after project grows.

---

2. Writing business logic inside routes.

Bad:

```javascript
router.post('/blog', async () => {

  await prisma.blog.create(...);

});
```

Good:

```javascript
router.post(
  '/blog',
  createBlog
);
```

Controller should handle the business flow.

---

3. Using Query Parameters instead of Route Parameters.

Bad:

```http
GET /blog?id=10
```

Preferred:

```http
GET /blog/10
```

when identifying a single resource.

---

# Senior Interview Perspective

When building scalable applications, routes should only be responsible for mapping requests to controllers.

Business logic should never exist in route files.

A production-grade request flow generally follows:

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
Database
```

This separation of concerns improves maintainability, testing, and scalability.


# Error Handling in Express.js

# Why Error Handling is Important

Error handling is one of the most important skills for a backend developer.

Many developers can write CRUD operations, but production applications are judged by how they handle failures.

Examples:

* User not found
* Invalid JWT token
* Database connection failure
* Validation failure
* File upload error
* Permission denied

A good application should never crash because of these situations.

Instead, it should return meaningful error responses.

---

# What Happens Without Error Handling?

Example:

```javascript
const user = await prisma.user.findUnique({
  where: {
    id: 100
  }
});

console.log(user.name);
```

If user is null:

```javascript
user.name
```

will throw:

```text
Cannot read properties of null
```

Without proper error handling:

* Application may crash
* API returns unclear responses
* Debugging becomes difficult

---

# Types of Errors

## Validation Errors

Example:

```json
{
  "email": ""
}
```

Expected:

```json
{
  "email": "rahul@gmail.com"
}
```

Handled by:

```text
Zod Validation
```

---

## Authentication Errors

Example:

```text
Invalid JWT Token
```

Response:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## Authorization Errors

Example:

User tries to delete another user's blog.

Response:

```json
{
  "success": false,
  "message": "Access denied"
}
```

---

## Database Errors

Example:

Duplicate email registration.

```text
Unique Constraint Failed
```

---

## Application Errors

Example:

```text
Blog not found
```

---

# Problem with try/catch Everywhere

Beginner Example:

```javascript
async function createBlog(
  req,
  res
) {

  try {

    const blog =
      await service.create();

    res.json(blog);

  } catch (error) {

    res.status(500);

  }

}
```

Imagine:

```text
50 Controllers
```

All having:

```javascript
try {
}
catch {
}
```

This creates duplication.

---

# What is asyncHandler?

asyncHandler is a wrapper function.

Purpose:

Automatically catch async errors and pass them to Express error middleware.

Example:

```javascript
const asyncHandler =
  (fn) =>
  (req, res, next) => {

    Promise.resolve(
      fn(req, res, next)
    ).catch(next);

  };
```

Now controller becomes:

```javascript
const createBlog =
  asyncHandler(
    async (req, res) => {

      const blog =
        await blogService.create();

    }
  );
```

Cleaner and easier to maintain.

---

# Global Error Middleware

Instead of handling errors everywhere:

```javascript
app.use(errorMiddleware);
```

handles all application errors.

Flow:

```text
Error
   ↓
Express
   ↓
Error Middleware
   ↓
JSON Response
```

---

# Why Global Error Middleware?

Benefits:

* Single place for error handling
* Consistent responses
* Easier debugging
* Cleaner controllers
* Production ready architecture

This is the approach used in enterprise applications.

---

# Custom Exceptions

As applications grow, generic errors become difficult to manage.

Bad:

```javascript
throw new Error(
  'Blog not found'
);
```

Good:

```javascript
throw new NotFoundError(
  'Blog not found'
);
```

Reason:

The error itself explains its purpose.

---

# Current Project Exceptions

```text
exceptions/

AppError.js

NotFoundError.js

ValidationError.js

UnauthorizedError.js

ForbiddenError.js
```

Each exception represents a specific business scenario.

---

# AppError

Base exception class.

Example:

```javascript
class AppError extends Error {

  constructor(
    message,
    statusCode
  ) {

    super(message);

    this.statusCode =
      statusCode;

  }

}
```

Other exceptions inherit from AppError.

---

# NotFoundError

Used when resource does not exist.

Example:

```javascript
throw new NotFoundError(
  'Blog not found'
);
```

Response:

```json
{
  "success": false,
  "message": "Blog not found"
}
```

---

# UnauthorizedError

Used when user is not authenticated.

Example:

```javascript
throw new UnauthorizedError(
  'Login required'
);
```

HTTP Status:

```text
401
```

---

# ForbiddenError

Used when user is authenticated but lacks permission.

Example:

```javascript
throw new ForbiddenError(
  'Access denied'
);
```

HTTP Status:

```text
403
```

---

# ValidationError

Used when request data is invalid.

Example:

```javascript
throw new ValidationError(
  'Validation failed'
);
```

HTTP Status:

```text
422
```

---

# Request Lifecycle in Our Project

Example Request:

```http
POST /api/author/blogs
```

Complete Flow:

```text
Client
   ↓
Route
   ↓
Authentication Middleware
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
Client
```

If an error occurs:

```text
Client
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Error
   ↓
Error Middleware
   ↓
JSON Response
```

---

# Most Important Interview Questions

Q: Why do we need centralized error handling?

Answer:

Centralized error handling eliminates duplicated try/catch blocks, provides consistent API responses, improves maintainability, and simplifies debugging.

---

Q: What is asyncHandler?

Answer:

asyncHandler is a wrapper function that automatically catches errors from asynchronous controllers and forwards them to Express error middleware.

---

Q: Difference between 401 and 403?

Answer:

401 Unauthorized:

User is not authenticated.

403 Forbidden:

User is authenticated but does not have permission to perform the action.

---

Q: Why create custom exceptions?

Answer:

Custom exceptions improve code readability, maintainability, and error categorization by representing specific business scenarios such as NotFound, Validation, or Authorization failures.

---

Q: Explain request lifecycle in your project.

Answer:

A request enters through a route, passes through authentication and validation middleware, reaches the controller, then service layer, repository layer, Prisma ORM, and database. The result is transformed through resources and returned using a standardized response helper. Errors are handled centrally through global error middleware.
