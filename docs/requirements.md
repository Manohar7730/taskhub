# TaskHub – Requirements (Version 1)

## 1. Overview
TaskHub is a full-stack MERN project management system with:
- User authentication
- OTP verification
- Projects
- Tasks
- File attachments
- Full dashboard
- Role: single-user per account (V1)

---

## 2. Authentication Requirements
### Registration
- User registers with name, email, password
- OTP emailed for email verification
- Account becomes active only after OTP verification

### Login
- Verified email required
- JWT authentication
- Protected routes

### Forgot Password
- Request OTP for reset
- Verify OTP
- Update password

### Change Password (Logged in)
- Request OTP
- Verify OTP
- Update password

---

## 3. Project Management
### Project Features
- Create project with:
  - title
  - description
  - due date
- Update project
- Delete project
- View project details
- Dashboard shows project count

---

## 4. Task Management
### Task Features
- Create task inside a project
- Edit task:
  - status (todo, in-progress, done)
  - priority (low, medium, high)
  - progress (0-100)
  - description
  - due date
- Delete task
- View tasks inside project
- Task details page

---

## 5. Attachments
- Upload image/PDF
- Max size 5MB
- Preview image/PDF
- Download file
- Delete file
- S3 planned in V2 (local upload in V1)

---

## 6. UI Requirements
- React + Vite + Tailwind
- ProtectedRoute / PublicRoute
- AuthContext with session storage
- Responsive layout
- Modern minimal UI styling

---

## 7. Deployment Requirements
### Backend
- Expose /api
- Serve static files from /uploads
- Use environment variables

### Frontend
- Build to /dist
- Configure VITE_API_URL

---

## 8. V2 Roadmap (future)
- S3 attachment storage
- Real-time notifications
- Multi-user teams
- Sharing and permissions
- Comments + activity logs
