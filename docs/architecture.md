# TaskHub — Architecture 

## Overview

TaskHub is a lightweight MERN-style task/project management system with secure email-based OTP authentication and optional attachment uploads.  
It uses **local storage in development** and **Amazon S3 in production** for handling files.

The system is optimized for single-tenant or small-team usage with a simple but secure architecture.

---

## 1. High-Level Components

### **Frontend (React + Vite + Tailwind)**

- SPA with React Router.
- Auth pages: register, login, OTP verification, password reset.
- Dashboard, Projects list, Project details, Task details.
- Axios service layer.
- Session-based JWT storage (in `sessionStorage`).

### **Backend (Express + MongoDB)**

- Organized by feature folders: `auth`, `projects`, `tasks`, `attachments`.
- JWT authentication middleware.
- OTP workflow using Nodemailer.
- Multer for uploads (local storage) OR multer-S3 for S3.
- CORS configured with frontend domain allow-list.

### **Database (MongoDB Atlas)**

Collections:

- `User`
- `OtpToken`
- `Project`
- `Task`
- `Attachment`

### **Storage**

- **Development:** files stored under `uploads/tasks/` and served statically.
- **Production:** files uploaded to Amazon S3, storing:
  - `filePath` → S3 public URL
  - `fileKey` → S3 object key (used for deletion)

---

## 2. Key Application Flows

### **2.1 Authentication & OTP**

1. `POST /api/auth/register` → Creates unverified user + sends OTP.
2. `POST /api/auth/verify-otp` → Verifies OTP + updates user.
3. `POST /api/auth/login` → Requires verified email, returns JWT.
4. `POST /api/auth/password/request-otp` → Requests OTP for reset.
5. `POST /api/auth/password/update` → Verifies OTP + updates password.

### **2.2 Projects & Tasks**

- Projects belong to a user (`owner`).
- Tasks belong to a project.
- Endpoints protected using JWT middleware.
- CRUD supported for both.

### **2.3 Attachment Handling**

**Upload:**
`POST /api/tasks/:taskId/attachments`

- Dev: Multer → local folder
- Prod: Multer-S3 → S3 bucket

**List:**  
`GET /api/tasks/:taskId/attachments`

**Delete:**  
`DELETE /api/attachments/:id`

- Validates ownership
- Deletes from S3 or local filesystem
- Removes DB entry

---

## 3. Security & Best Practices (V1)

- JWT secret stored only in environment variables.
- Passwords hashed using bcrypt.
- OTP records include expiration and `used` flag.
- CORS restricted to exact frontend domain.
- Helmet and rate limiting recommended, especially on auth endpoints.
- File validation: images + PDFs only.
- Use `fileKey` for S3 deletion (avoid URL parsing).
- `.env` files never committed; `.env.example` included for developers.

---

## 4. Directory Structure (Representative)

```
/backend
  /controllers
  /models
  /routes
  /middleware
  /services
  app.js
  server.js

/frontend
  /src
    /pages
    /components
    /services
  main.jsx
  index.html

/docs
  architecture.md
  requirements.md
```

---

## 5. Deployment Notes

- **Backend:** Render / Railway / VPS  
  Add environment variables in platform dashboard.  
  For local uploads on Render, attach a Persistent Disk.

- **Frontend:** Vercel / Netlify  
  Set `VITE_API_URL` to deployed backend URL.

- **Database:** MongoDB Atlas.

- **Storage (production):** AWS S3 bucket + IAM user with limited S3 permissions.

---
