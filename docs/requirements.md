# TaskHub — Requirements

## Purpose

TaskHub is a simple, secure project & task manager with OTP-based authentication and attachment support.  
V1 targets individuals or small teams while emphasizing clean UX and proper security practices.

---

## Functional Requirements (V1)

### **1. Authentication & Authorization**

- Register with name, email, password.
- Email verification via 6-digit OTP.
- Login (email + password), only if email verified.
- JWT-based authentication.
- Forgot password workflow using OTP.
- Password reset via OTP verification.
- Change password for logged-in users (OTP required).
- `GET /api/auth/me` returns authenticated user profile.

### **2. Projects**

- Users can create, update, delete, list projects.
- Project belongs to one user only.

### **3. Tasks**

- Create tasks under projects.
- Task fields:
  - `title`
  - `description`
  - `status` (todo / in-progress / done)
  - `priority`
  - `dueDate`
  - `progress`
- Update/delete tasks.
- Fetch single task or task list per project.

### **4. Attachments**

- Upload **images (png, jpg, jpeg)** and **PDF** only.
- File size limit: ~5 MB.
- List task attachments.
- Delete attachments.
- Hybrid storage system:
  - Local (`uploads/tasks/`) for development.
  - AWS S3 for production.
- Attachments linked to task + owner.

### **5. UI Requirements**

- Responsive interface.
- Auth pages: register, login, verify OTP, forgot/reset password.
- Dashboard: show counts (projects, tasks).
- Projects list page.
- Project details page with task list.
- Task details page with status, priority, progress, attachments.

---

## Non-Functional Requirements (NFRs)

### **Security**

- Passwords hashed (bcrypt).
- OTP expires after 10 minutes.
- OTP has `used` flag to prevent reuse.
- JWT secret stored in environment variables only.
- CORS restricted to known frontend origin(s).
- Rate limiting for auth endpoints.
- No stack traces in production responses.
- Input validation for all user fields.

### **Performance**

- Lightweight API with minimal latency.
- Pagination not required in V1 but recommended for V2.

### **Reliability**

- MongoDB Atlas for managed DB.
- S3 for reliable file hosting in production.

---

## Deployment & Ops

- Backend → Render / Railway / VPS.
- Frontend → Netlify / Vercel.
- DB → MongoDB Atlas.
- Storage → AWS S3.
- Use Render / Vercel “Environment Variables” for secrets.

---

## Security Checklist Before Release

- Rotate secrets if `.env` was ever committed.
- Ensure helmet + express-rate-limit applied.
- Validate upload file types.
- Limit JSON request size (1 MB recommended).
- Use HTTPS in production.
- Remove any debug/test endpoints.

---
