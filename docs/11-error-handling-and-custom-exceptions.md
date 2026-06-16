# Error Handling and Custom Exceptions

# Introduction

One of the biggest differences between a junior developer and a senior developer is not writing code.

It is:

```text
Handling Failures Correctly
```

Most beginners focus on:

```text
Happy Path
```

Example:

```text
User Exists
Password Correct
Blog Found
File Uploaded
```

But production systems spend a lot of effort handling:

```text
User Not Found

Invalid Input

Unauthorized Access

Database Errors

Server Failures
```

A good backend developer expects things to fail and designs the application accordingly.

---

# What is Error Handling?

Error Handling is the process of:

```text
Detecting Errors

Managing Errors

Returning Proper Responses
```

instead of crashing the application.

Bad:

```javascript
const user =
await prisma.user.findUnique(...);

return user.name;
```

If user is null:

```text
Application Crash
```

Good:

```javascript
if (!user) {
  throw new NotFoundError(
    'User not found'
  );
}
```

---

# Why Error Handling Matters

Benefits:

```text
Better User Experience

Cleaner Code

Easier Debugging

Improved Security

Stable Application
```

---

# Common Types of Errors

### Validation Errors

Example:

```json
{
  "email": ""
}
```

Expected:

```text
Valid Email
```

Result:

```text
Validation Error
```

Status Code:

```text
422
```

---

### Authentication Errors

Example:

```text
Invalid JWT Token
```

Status Code:

```text
401 Unauthorized
```

---

### Authorization Errors

Example:

```text
User Logged In

But No Permission
```

Status Code:

```text
403 Forbidden
```

---

### Not Found Errors

Example:

```text
Blog ID 999
```

does not exist.

Status Code:

```text
404 Not Found
```

---

### Server Errors

Example:

```text
Database Connection Lost
```

Status Code:

```text
500 Internal Server Error
```

---

# Problem Without Custom Exceptions

Bad Example:

```javascript
throw new Error(
  'Blog not found'
);
```

Issues:

```text
No Status Code

No Error Type

Hard To Manage
```

Everything becomes:

```text
500 Error
```

---

# What Are Custom Exceptions?

Custom Exceptions are custom classes that describe specific error types.

Example:

```text
NotFoundError

ForbiddenError

UnauthorizedError

ValidationError
```

Each exception has its own:

```text
Message

Status Code

Type
```

---

# Base Exception Class

File:

```text
exceptions/AppError.js
```

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

    this.name =
      this.constructor.name;

  }

}

module.exports = AppError;
```

Purpose:

```text
Parent Class
For All Exceptions
```

---

# NotFoundError

File:

```text
exceptions/NotFoundError.js
```

Example:

```javascript
const AppError =
require('./AppError');

class NotFoundError
extends AppError {

  constructor(
    message =
    'Resource not found'
  ) {

    super(
      message,
      404
    );

  }

}

module.exports =
NotFoundError;
```

---

# Usage

Instead of:

```javascript
throw new Error(
  'Blog not found'
);
```

Use:

```javascript
throw new NotFoundError(
  'Blog not found'
);
```

Much cleaner.

---

# UnauthorizedError

Purpose:

```text
User Not Authenticated
```

Example:

```javascript
throw new UnauthorizedError(
  'Invalid token'
);
```

Status:

```text
401
```

---

# ForbiddenError

Purpose:

```text
User Authenticated

But No Permission
```

Example:

```javascript
throw new ForbiddenError(
  'Access denied'
);
```

Status:

```text
403
```

---

# ValidationError

Purpose:

```text
Invalid Input
```

Example:

```javascript
throw new ValidationError(
  'Title is required'
);
```

Status:

```text
422
```

---

# Why Custom Exceptions Are Better

Benefits:

```text
Readable

Maintainable

Consistent

Reusable
```

---

# Global Error Handling

Without Global Error Handling:

```javascript
try {
}
catch {
}
```

inside every controller.

Result:

```text
Code Duplication
```

---

# Better Approach

Use:

```text
Global Error Middleware
```

---

# Error Middleware

File:

```text
middleware/error.middleware.js
```

Purpose:

```text
Handle All Errors
In One Place
```

---

# Flow

```text
Controller
   ↓
Exception
   ↓
Error Middleware
   ↓
Response
```

---

# Example Error Middleware

```javascript
const response =
require('../utils/response');

const errorMiddleware =
(
  err,
  req,
  res,
  next
) => {

  return response(
    res,
    err.statusCode || 500,
    false,
    err.message ||
      'Server Error'
  );

};

module.exports =
errorMiddleware;
```

---

# Current Project Flow

Example:

```javascript
throw new NotFoundError(
  'Blog not found'
);
```

Flow:

```text
Service
  ↓
Exception Thrown
  ↓
Controller
  ↓
asyncHandler
  ↓
Error Middleware
  ↓
JSON Response
```

---

# What is asyncHandler?

Express cannot automatically catch errors from async functions.

Bad:

```javascript
router.get(
  '/',
  async (
    req,
    res
  ) => {

    throw new Error();

  }
);
```

Application may crash.

---

# Solution

Use:

```javascript
asyncHandler()
```

---

# Example

```javascript
const asyncHandler =
(fn) => {

  return (
    req,
    res,
    next
  ) => {

    Promise.resolve(
      fn(
        req,
        res,
        next
      )
    ).catch(next);

  };

};
```

Now every error reaches:

```text
errorMiddleware
```

automatically.

---

# Why asyncHandler Is Useful

Benefits:

```text
Less Boilerplate

Cleaner Controllers

Automatic Error Propagation
```

---

# Error Response Structure

Current Project:

```json
{
  "success": false,
  "message": "Blog not found",
  "data": null
}
```

Consistent structure.

---

# Validation Error Example

Response:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": [
    {
      "field": "title",
      "message":
      "Title is required"
    }
  ]
}
```

Easy for frontend developers.

---

# Logging Errors

Production systems should log:

```text
Error Message

Stack Trace

Request Details

User Information
```

Useful for debugging.

---

# Development vs Production Errors

Development:

```text
Show Full Error
```

Example:

```javascript
err.stack
```

helps debugging.

---

Production:

```text
Hide Internal Details
```

Never expose:

```text
Database Queries

Stack Traces

Server Paths
```

to clients.

---

# Common HTTP Status Codes

200

```text
Success
```

---

201

```text
Created
```

---

400

```text
Bad Request
```

---

401

```text
Unauthorized
```

---

403

```text
Forbidden
```

---

404

```text
Not Found
```

---

422

```text
Validation Error
```

---

500

```text
Internal Server Error
```

---

# Current Project Exception Structure

```text
exceptions/

├── AppError.js

├── NotFoundError.js

├── UnauthorizedError.js

├── ForbiddenError.js

├── ValidationError.js
```

This is a common enterprise pattern.

---

# Real Project Example

Blog Update:

```javascript
if (!blog) {

  throw new NotFoundError(
    'Blog not found'
  );

}
```

Ownership Check:

```javascript
if (
  !isOwner &&
  !isAdmin
) {

  throw new ForbiddenError(
    'Access denied'
  );

}
```

Authentication:

```javascript
throw new UnauthorizedError(
  'Invalid token'
);
```

This is exactly how many production APIs work.

---

# Most Important Interview Questions

Q: Why Use Custom Exceptions?

Answer:

Custom Exceptions provide meaningful error types, status codes, and consistent error handling across the application.

---

Q: What Problem Does asyncHandler Solve?

Answer:

asyncHandler catches asynchronous errors and automatically forwards them to Express error middleware.

---

Q: Why Use Global Error Middleware?

Answer:

Global Error Middleware centralizes error handling, reduces code duplication, and ensures consistent error responses.

---

Q: Difference Between 401 and 403?

Answer:

401 means the user is not authenticated.

403 means the user is authenticated but lacks permission.

---

Q: Why Hide Error Details in Production?

Answer:

Exposing internal errors can reveal implementation details, database structures, and server information that attackers may exploit.

---

Q: What Is the Benefit of a Base AppError Class?

Answer:

A base AppError class standardizes error structure and allows all custom exceptions to share common behavior such as status codes and messages.

---

# Senior Interview Answer

A production-ready Node.js application should use centralized error handling with custom exception classes, async error propagation, and global error middleware. This approach improves maintainability, provides consistent API responses, reduces code duplication, and allows different error types such as validation, authorization, authentication, and resource-not-found errors to be handled appropriately.
