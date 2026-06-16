# Testing with Jest and Supertest

# Introduction

Many developers focus only on writing code.

Professional developers also verify that their code works correctly.

This process is called:

```text id="jv8k2m"
Testing
```

Testing helps us catch bugs before users find them.

Large companies like:

```text id="s9p4w7"
Google

Amazon

Netflix

Microsoft
```

all heavily rely on automated testing.

---

# What is Testing?

Testing means:

```text id="d2m8v4"
Verifying That
The Application Works
As Expected
```

Instead of manually checking every feature:

```text id="a7n3w9"
Automated Tests
```

perform the verification.

---

# Why Testing Is Important

Benefits:

```text id="m5v8n2"
Find Bugs Early

Improve Code Quality

Reduce Production Issues

Increase Confidence

Enable Safe Refactoring
```

Testing saves time in the long run.

---

# Real World Example

Imagine:

```text id="v8m2q5"
Login API
```

You update some code.

Unexpectedly:

```text id="r4n7w1"
Login Stops Working
```

Without tests:

```text id="k2m8v3"
Bug Reaches Production
```

With tests:

```text id="n7w4v2"
Failure Detected
Immediately
```

---

# Types of Testing

Most common types:

```text id="p9m3v5"
Unit Testing

Integration Testing

End To End Testing
```

These are frequently asked in interviews.

---

# Unit Testing

Unit Testing tests:

```text id="x6m2v8"
Single Function

Single Method

Single Component
```

in isolation.

---

# Example

Function:

```javascript id="c7n4w2"
function add(a,b){

  return a+b;

}
```

Test:

```javascript id="m4v8n1"
expect(
  add(2,3)
).toBe(5);
```

Simple unit test.

---

# Integration Testing

Integration Testing verifies:

```text id="j2m7v4"
Multiple Components
Working Together
```

Example:

```text id="x8n3v5"
API

Database

Service Layer
```

working as one system.

---

# End To End Testing

E2E testing validates:

```text id="q5m8v2"
Entire Application
```

Example:

```text id="p7n4v1"
Login

Create Blog

Update Blog

Logout
```

Everything tested together.

---

# Testing Pyramid

Popular concept:

```text id="m2n8v4"
Many Unit Tests

Some Integration Tests

Few E2E Tests
```

Reason:

```text id="k7m3v5"
Unit Tests
Are Fast
```

while E2E tests are slower.

---

# What is Jest?

Jest is the most popular testing framework for Node.js.

Installation:

```bash id="x4m7v2"
npm install --save-dev jest
```

---

# Why Jest?

Features:

```text id="v8m2w5"
Simple

Fast

Built-In Assertions

Mocking Support

Coverage Reports
```

Very common in Node.js projects.

---

# Configure Jest

package.json:

```json id="n4m8v1"
{
  "scripts": {
    "test": "jest"
  }
}
```

Run:

```bash id="w7n2v4"
npm test
```

---

# First Test Example

File:

```javascript id="r5m8v2"
function add(a,b){

  return a+b;

}

module.exports = add;
```

---

Test:

```javascript id="y2n7v4"
const add =
require('./add');

test(
  'adds numbers',
  () => {

    expect(
      add(2,3)
    ).toBe(5);

  }
);
```

---

# Understanding test()

Syntax:

```javascript id="p8m3v7"
test(
  description,
  callback
);
```

Example:

```javascript id="x3n8v2"
test(
  'user created',
  () => {}
);
```

---

# What is expect()?

expect() verifies results.

Example:

```javascript id="n5m2v8"
expect(
  result
)
.toBe(
  expected
);
```

Core concept of Jest.

---

# Common Matchers

```javascript id="v4n7w2"
toBe()

toEqual()

toContain()

toHaveLength()

toBeTruthy()

toBeFalsy()
```

Frequently used in projects.

---

# Example

```javascript id="m8v3n1"
expect(
  users.length
)
.toBe(5);
```

---

# Testing Async Functions

Example:

```javascript id="j7m4v2"
const users =
await getUsers();

expect(
  users
).toBeDefined();
```

Jest supports async testing.

---

# beforeEach()

Runs before every test.

Example:

```javascript id="k4n8v2"
beforeEach(
  () => {

    setup();

  }
);
```

Useful for initialization.

---

# afterEach()

Runs after every test.

Example:

```javascript id="w9m2v4"
afterEach(
  () => {

    cleanup();

  }
);
```

Useful for cleanup.

---

# What is Mocking?

Mocking means:

```text id="q3n7v5"
Replacing Real Dependencies
With Fake Versions
```

Very important interview topic.

---

# Example

Instead of:

```text id="n7m4v2"
Real Database
```

Use:

```text id="x8v2n4"
Mock Database
```

Tests become faster.

---

# Jest Mock Example

```javascript id="v6m3w8"
jest.mock(
  '../services/user'
);
```

Dependency replaced automatically.

---

# Why Use Mocks?

Benefits:

```text id="m5n8v2"
Fast Tests

No Database Dependency

No External API Calls
```

---

# What is Supertest?

Supertest is used for:

```text id="p8m4v2"
Testing HTTP APIs
```

Installation:

```bash id="x2n7v4"
npm install --save-dev supertest
```

---

# Why Supertest?

Allows testing:

```text id="k5m8v1"
GET

POST

PUT

DELETE
```

requests directly.

---

# API Test Example

```javascript id="r7n3v5"
const request =
require('supertest');
```

---

Example:

```javascript id="m2v8n4"
const response =
await request(app)
.get('/api/blogs');
```

---

Verify:

```javascript id="x9m2v5"
expect(
response.status
)
.toBe(200);
```

Very common pattern.

---

# POST API Test

Example:

```javascript id="w4n7v2"
await request(app)
.post('/api/blogs')
.send({

  title:
  'Test Blog'

});
```

Tests blog creation.

---

# Testing Authentication

Example:

```javascript id="n8m3v1"
.set(
'Authorization',
'Bearer token'
)
```

Used for protected routes.

---

# Integration Test Example

Test:

```text id="v5m8n2"
Create User
 ↓
Login User
 ↓
Get Profile
```

Multiple layers tested together.

---

# Test Coverage

Coverage means:

```text id="r2n7v4"
How Much Code
Is Tested
```

---

Generate:

```bash id="m8v4n1"
npm test -- --coverage
```

---

Example Output

```text id="x4m7v2"
Statements 90%

Functions 95%

Lines 92%
```

Higher coverage is generally better.

---

# Good Coverage Target

Most teams aim for:

```text id="p7n2v5"
70% - 90%
```

100% coverage is not always necessary.

---

# What is TDD?

TDD stands for:

```text id="j5m8v3"
Test Driven Development
```

Flow:

```text id="x8n4v2"
Write Test

Write Code

Pass Test
```

Popular development methodology.

---

# Red Green Refactor

TDD cycle:

```text id="m4v8n2"
Red
 ↓
Green
 ↓
Refactor
```

Red:

```text id="w7n3v5"
Failing Test
```

Green:

```text id="n2m8v4"
Working Code
```

Refactor:

```text id="x5v7n2"
Improve Code
```

---

# Common Testing Mistakes

Avoid:

```text id="r8m2v4"
Testing Everything Through APIs

Using Real Databases

Not Mocking Dependencies

Ignoring Edge Cases
```

---

# Current Project Testing Opportunities

Our Blog API can test:

```text id="m9n4v2"
Authentication

Blog Creation

Blog Update

Blog Deletion

Validation

Authorization
```

These are high-value tests.

---

# Common Interview Questions

Q: What is Unit Testing?

Answer:

Unit testing verifies individual functions or components in isolation from other parts of the application.

---

Q: What is Integration Testing?

Answer:

Integration testing verifies that multiple components work correctly together.

---

Q: What is Jest?

Answer:

Jest is a JavaScript testing framework used for unit testing, mocking, assertions, and coverage reporting.

---

Q: What is Supertest?

Answer:

Supertest is a library used to test HTTP APIs in Node.js applications.

---

Q: Why Use Mocking?

Answer:

Mocking isolates the code being tested and removes dependencies on databases, APIs, and external services.

---

Q: What is Test Coverage?

Answer:

Test coverage measures how much of the application's code is executed during tests.

---

Q: What is TDD?

Answer:

Test Driven Development is a development methodology where tests are written before implementation code.

---

Q: What Should Be Tested In APIs?

Answer:

Validation, authentication, authorization, business logic, error handling, and response structures should all be tested.

---

# Real Interview Scenario

Interviewer:

```text id="n4m8v7"
How would you test
your blog creation API?
```

Answer:

I would use Supertest to send POST requests to the API, verify status codes and response data, validate error scenarios, test authentication and authorization rules, and mock external dependencies where appropriate.

---

# Senior Interview Answer

I use Jest for unit testing business logic and Supertest for integration testing APIs. I isolate dependencies through mocking, focus on critical business flows, maintain healthy test coverage, and automate test execution in CI/CD pipelines. This helps prevent regressions and ensures application reliability as the codebase grows.
