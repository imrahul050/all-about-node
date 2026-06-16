# File Upload and Storage

# Introduction

Almost every modern application needs file uploads.

Examples:

* Profile Pictures
* Product Images
* Blog Images
* Documents
* PDFs
* Videos

In our Blog API project, we already support:

```text id="lt9lga"
Blog Image Upload
```

using:

```text id="l7al8k"
Multer
```

Understanding file uploads is important because interviewers frequently ask:

```text id="jlwmnm"
How does file upload work?

What is Multer?

How would you upload files to AWS S3?

How do you secure uploads?
```

---

# How File Upload Works

Normal Request:

```json id="kr1hbn"
{
  "title": "Node Blog"
}
```

uses:

```text id="l9l7s6"
application/json
```

---

File Upload Request:

```text id="ehshly"
multipart/form-data
```

This format allows:

* Text Data
* Images
* Documents

to be sent together.

---

# Upload Flow

```text id="1ftgdo"
Client
  ↓
Multipart Request
  ↓
Express
  ↓
Multer
  ↓
Storage
  ↓
Database
```

---

# What is Multer?

Multer is an Express middleware used for handling:

```text id="yvavtb"
multipart/form-data
```

requests.

Installation:

```bash id="yb9xjk"
npm install multer
```

Without Multer:

```javascript id="pp2l0y"
req.file
```

will be undefined.

---

# Why Multer is Needed

Express can handle:

```text id="lg4xnn"
JSON

Form Data
```

But it cannot process uploaded files automatically.

Multer extracts:

```text id="l6es4u"
Images

PDFs

Videos
```

from incoming requests.

---

# Basic Multer Setup

Example:

```javascript id="ftdk3o"
const multer =
require('multer');

const upload =
multer({
  dest: 'uploads/'
});
```

This stores files in:

```text id="9k9izp"
uploads/
```

directory.

---

# Single File Upload

Example:

```javascript id="9s4fg0"
upload.single('image')
```

Client sends:

```text id="rpb3uu"
image
```

field.

Result:

```javascript id="k0zr5h"
req.file
```

contains uploaded file information.

---

# Multiple File Upload

Example:

```javascript id="9z6ltq"
upload.array(
  'images',
  5
)
```

Allows:

```text id="b24xv4"
Up To 5 Images
```

Result:

```javascript id="t2x54q"
req.files
```

contains all files.

---

# File Object

Example:

```javascript id="iz4r34"
req.file
```

returns:

```json id="g9vv5z"
{
  "filename":
  "123456.jpg",

  "mimetype":
  "image/jpeg",

  "size":
  12000
}
```

Useful for validation and storage.

---

# Disk Storage

Current Project:

```text id="yyxgrz"
Disk Storage
```

Files are stored directly on the server.

Example:

```text id="hj07uv"
public/uploads/
```

---

# Multer Disk Storage

Example:

```javascript id="srtjlwm"
const storage =
multer.diskStorage({

  destination:
  function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      'public/uploads'
    );

  },

  filename:
  function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      Date.now() +
      '-' +
      file.originalname
    );

  }

});
```

This allows custom file names.

---

# Why Generate Unique File Names?

Bad:

```text id="3iz18m"
profile.jpg
```

User A uploads:

```text id="jsd0x3"
profile.jpg
```

User B uploads:

```text id="0a3aqr"
profile.jpg
```

Problem:

```text id="mujlwm"
Overwrite Existing File
```

Solution:

```text id="zgkf3e"
Timestamp

UUID

Random String
```

---

# Static File Serving

Uploaded file:

```text id="l42sjt"
public/uploads/file.jpg
```

won't be accessible automatically.

Need:

```javascript id="6zjlwm"
app.use(
  '/uploads',
  express.static(
    'public/uploads'
  )
);
```

Now:

```text id="v2hks0"
/uploads/file.jpg
```

becomes accessible.

---

# Current Project Flow

Upload Image:

```text id="xuk79f"
Request
   ↓
Multer
   ↓
Save File
   ↓
Filename
   ↓
Database
```

Blog table stores:

```text id="8k2n6y"
1781435359379.jpg
```

instead of full file content.

---

# Why Store Filename Instead of Image Data?

Bad:

```text id="rr6igq"
Store Entire Image
In Database
```

Problems:

* Large Database Size
* Slow Queries
* Expensive Backups

Better:

```text id="w3c48j"
Store File On Disk

Store Filename In DB
```

---

# File Validation

Always validate uploads.

Example:

```text id="aex6ci"
Image Only
```

Allowed:

```text id="j8jlwm"
jpg

jpeg

png

webp
```

Reject:

```text id="q3a2di"
exe

bat

php
```

files.

---

# File Size Validation

Example:

```text id="fr56c4"
Maximum 5 MB
```

Multer:

```javascript id="3mjlwm"
limits: {
  fileSize:
  5 * 1024 * 1024
}
```

Prevents oversized uploads.

---

# MIME Type Validation

Example:

```javascript id="q7jlwm"
file.mimetype
```

Check:

```text id="plv7li"
image/jpeg

image/png

image/webp
```

Reject anything else.

---

# Security Risks

Never trust uploaded files.

Attackers may upload:

```text id="jlwm7f"
Malicious Scripts

Viruses

Executable Files
```

Always validate.

---

# Local Storage

Current Project:

```text id="9m3p9j"
Server
  ↓
public/uploads
```

Advantages:

* Easy Setup
* Fast
* Free

Disadvantages:

* Limited Storage
* Difficult Scaling

---

# Cloud Storage

Examples:

```text id="p5x7mw"
AWS S3

Cloudinary

Google Cloud Storage

Azure Blob Storage
```

Used in production systems.

---

# AWS S3 Flow

```text id="rjlwmn"
Client
  ↓
Server
  ↓
AWS S3
  ↓
URL Stored In Database
```

Instead of:

```text id="cmjlwm"
image.jpg
```

store:

```text id="2s0suv"
https://s3.amazonaws.com/...
```

---

# Local Storage vs AWS S3

Local Storage:

Advantages:

```text id="txhjlwm"
Simple

Cheap

Good For Learning
```

Disadvantages:

```text id="jlwmmf"
Not Scalable
```

---

AWS S3:

Advantages:

```text id="jlwm7x"
Scalable

Reliable

Global Access
```

Disadvantages:

```text id="jlwm3u"
Additional Cost
```

---

# Image URL Generation

Current Project:

```javascript id="jlwmyn"
process.env.APP_URL +
'/uploads/' +
blog.image
```

Example Result:

```text id="jlwm6k"
http://localhost:5001/uploads/file.jpg
```

This creates accessible image URLs.

---

# Database Design

Blog Table:

| id | title     | image     |
| -- | --------- | --------- |
| 1  | Node Blog | image.jpg |

Only filename stored.

Actual file remains on disk.

---

# Common Interview Questions

Q: What is Multer?

Answer:

Multer is an Express middleware used to handle multipart/form-data requests, primarily for file uploads.

---

Q: Why is multipart/form-data required?

Answer:

multipart/form-data allows files and form fields to be transmitted together in a single HTTP request.

---

Q: Difference Between req.file and req.files?

Answer:

req.file contains a single uploaded file.

req.files contains multiple uploaded files.

---

Q: Why store file names instead of image data in the database?

Answer:

Storing files directly in the database increases database size and reduces performance. Storing filenames or URLs is more efficient.

---

Q: How do you validate uploads?

Answer:

Validate file size, MIME type, file extension, and maximum upload limits before processing the file.

---

Q: Local Storage vs AWS S3?

Answer:

Local storage is simpler and suitable for small projects. AWS S3 provides scalable, highly available storage suitable for production systems.

---

Q: What security risks exist with file uploads?

Answer:

Risks include malicious file uploads, executable scripts, oversized files, and malware. Proper validation and restrictions are required.

---

# Senior Interview Answer

File uploads in Node.js are commonly handled using Multer, which processes multipart/form-data requests and extracts uploaded files. A production-ready upload system validates file type, size, and MIME type before storing files either locally or in cloud storage solutions such as AWS S3. Best practice is to store only file references in the database while keeping the actual files in dedicated storage systems.
