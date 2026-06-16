# Node.js Fundamentals

# What is Node.js?

Node.js is an open-source JavaScript runtime environment built on Google's V8 JavaScript Engine.

It allows developers to run JavaScript outside the browser and build server-side applications.

Before Node.js, JavaScript was primarily used for frontend development.

Node.js made it possible to use JavaScript for:

* Backend Development
* REST APIs
* Real-Time Applications
* Microservices
* CLI Tools

---

# Why Node.js?

Benefits:

* Fast execution using V8 Engine
* Non-blocking I/O
* Event-driven architecture
* Large npm ecosystem
* Same language for frontend and backend
* Scalable applications

---

# What is V8 Engine?

V8 is Google's JavaScript Engine developed for Chrome.

Responsibilities:

* Compiles JavaScript into machine code
* Executes JavaScript very quickly
* Provides memory management

Node.js uses V8 internally to run JavaScript.

Interview Answer:

Node.js uses the V8 Engine to convert JavaScript into machine code, which improves execution speed and performance.

---

# Is Node.js a Programming Language?

No.

JavaScript is the programming language.

Node.js is a runtime environment that executes JavaScript outside the browser.

Interview Answer:

JavaScript is the language, while Node.js is the runtime environment used to execute JavaScript on the server side.

---

# What is Runtime Environment?

A runtime environment provides everything required to execute code.

Node.js provides:

* V8 Engine
* File System APIs
* HTTP APIs
* OS APIs
* Process APIs

Without Node.js:

```javascript id="jlwm5g"
const fs = require('fs');
```

will not work inside a browser.

---

# Single Threaded Architecture

Node.js uses a single main thread.

This means:

```text id="m7zjkt"
One Thread
     ↓
Handles Multiple Requests
```

Node.js can handle thousands of concurrent requests despite using a single thread.

How?

Using:

* Event Loop
* Callback Queue
* Non-blocking I/O

---

# What is Blocking Code?

Example:

```javascript id="j0hrd0"
const fs = require('fs');

const data = fs.readFileSync('file.txt');

console.log(data);
```

Execution waits until file reading is completed.

This blocks the thread.

---

# What is Non-Blocking Code?

Example:

```javascript id="4ivj3h"
const fs = require('fs');

fs.readFile('file.txt', (err, data) => {
  console.log(data);
});

console.log('Hello');
```

Output:

```text id="xvznv2"
Hello
File Content
```

Node continues execution without waiting.

---

# Event Loop

The Event Loop is the heart of Node.js.

Responsibilities:

* Executes callbacks
* Handles asynchronous operations
* Processes pending tasks

Flow:

```text id="tn2hdd"
Call Stack
    ↓
Web APIs
    ↓
Callback Queue
    ↓
Event Loop
    ↓
Call Stack
```

Interview Answer:

The Event Loop allows Node.js to perform non-blocking operations by offloading tasks and processing callbacks when operations complete.

---

# What is Callback?

A callback is a function passed as an argument to another function.

Example:

```javascript id="tr1j4r"
function greet(name, callback) {
  console.log(name);

  callback();
}
```

---

# What is Promise?

Promises handle asynchronous operations.

States:

* Pending
* Fulfilled
* Rejected

Example:

```javascript id="h03qk9"
fetchData()
  .then(result => console.log(result))
  .catch(error => console.log(error));
```

---

# What is Async/Await?

Modern syntax for handling promises.

Example:

```javascript id="t46a4g"
async function getUser() {
  const user = await fetchUser();

  return user;
}
```

Benefits:

* Cleaner code
* Better readability
* Easier error handling

---

# CommonJS vs ES Modules

CommonJS:

```javascript id="gfz5h5"
const express = require('express');

module.exports = app;
```

ES Modules:

```javascript id="v0tw67"
import express from 'express';

export default app;
```

Current Project:

Uses CommonJS.

Reason:

* Simpler for beginners
* Widely used in Express projects

---

# What is npm?

npm stands for Node Package Manager.

Purpose:

* Install packages
* Manage dependencies
* Publish packages

Example:

```bash id="rr58a4"
npm install express
```

---

# What is npx?

npx executes packages without installing globally.

Example:

```bash id="8c1p4e"
npx prisma migrate dev
```

Benefits:

* Always uses local package version
* No global installation required

---

# package.json

The package.json file stores project metadata.

Example:

```json id="6mjrk9"
{
  "name": "all-about-node",
  "version": "1.0.0"
}
```

Contains:

* Project Name
* Version
* Dependencies
* Scripts

---

# package-lock.json

Stores exact package versions.

Purpose:

* Consistent installations
* Prevent version conflicts

Always commit this file to Git.

---

# Dependencies vs Dev Dependencies

Dependencies:

```bash id="v2rwyg"
npm install express
```

Required in production.

Dev Dependencies:

```bash id="vgo5lp"
npm install nodemon --save-dev
```

Required only during development.

---

# Environment Variables

Environment variables store configuration values.

Example:

```env id="t78e9m"
PORT=5001

JWT_SECRET=secret
```

Benefits:

* Security
* Flexibility
* Environment-specific configuration

---

# Top Interview Questions

Q: What is Node.js?

A:
Node.js is a JavaScript runtime environment built on the V8 engine that allows developers to execute JavaScript outside the browser.

---

Q: Is Node.js Single Threaded?

A:
Yes, Node.js uses a single main thread but can handle multiple concurrent requests using the Event Loop and asynchronous operations.

---

Q: What is Event Loop?

A:
The Event Loop is responsible for handling asynchronous operations and executing callbacks when tasks are completed.

---

Q: Difference between npm and npx?

A:

npm:
Installs packages.

npx:
Executes packages directly without global installation.

---

Q: Difference between Blocking and Non-Blocking Code?

A:

Blocking:
Execution waits until operation completes.

Non-Blocking:
Execution continues while operation runs in background.

---

Q: Difference between require and import?

A:

require:
CommonJS syntax.

import:
ES Module syntax.

---

Q: Why Node.js is Fast?

A:

* V8 Engine
* Non-blocking I/O
* Event-driven architecture
* Efficient memory usage

---

# Interview Tip

When explaining Node.js in interviews:

Do not simply say:

"Node.js is JavaScript on the server."

Instead say:

"Node.js is a JavaScript runtime environment built on Google's V8 Engine that uses an event-driven, non-blocking I/O architecture, making it suitable for scalable backend applications."
