# 🚀 TaskHub – MERN Project Management App (Version 1)

TaskHub is a full-stack **MERN (MongoDB, Express, React, Node)** application for personal project & task management with **OTP-based authentication**, **file attachments**, and a clean modern UI.

This is **Version 1**, fully implemented and ready for deployment.

---

## 📌 Features

### 🔐 Authentication & Security
- Register with email verification (OTP)
- JWT login system
- Forgot password (OTP)
- Change password (OTP) while logged in
- Protected backend routes
- Session-based frontend auth using Context API

---

### 🗂 Projects
- Create, update, delete projects
- View project details
- Unlimited tasks per project
- Dashboard overview showing project count

---

### ✅ Tasks
Each task includes:

- Title  
- Description  
- Status (todo / in-progress / done)  
- Priority  
- Due date  
- Progress (0–100)

---

### 📎 Attachments (Images/PDF)
- Upload attachments per task
- Supports `.png`, `.jpg`, `.jpeg`, `.pdf`
- Preview images & PDFs
- Forced download
- Delete attachment
- Stored locally in `/uploads/tasks/` (S3 planned for V2)

---

### 🎨 Modern UI
- React + Vite + Tailwind
- Responsive clean layout
- AuthContext + ProtectedRoute / PublicRoute
- Polished forms and dashboard cards

---

## 🏗 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (OTP email)
- Multer (file uploads)
- Morgan + CORS

---

## 📁 Folder Structure

```
taskhub/
│
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── uploads/tasks/
│
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── services/
│       ├── context/
│       └── AppRouter.jsx
│
└── docs/
    ├── requirements.md
    └── architecture.md
```

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```
PORT=5000
MONGO_URI=
JWT_SECRET=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

CLIENT_URL=http://localhost:3000
```

### Frontend (`/frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## ▶ Running the App Locally

### 1. Clone the Repo
```bash
git clone https://github.com/<your-name>/taskhub.git
cd taskhub
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Backend runs at:  
👉 http://localhost:5000

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:  
👉 http://localhost:3000

---

## 🌍 Deployment Guide

### 🚀 Backend (Render / Railway)
- Push to GitHub  
- Create a new Web Service  
- Add environment variables  
- Install command:
```bash
npm install
```
- Start command:
```bash
node server.js
```
- Add persistent disk for `/uploads`
- Set CLIENT_URL and CORS

---

### 🚀 Frontend (Vercel / Netlify)
- Import frontend folder from GitHub  
- Add:
```
VITE_API_URL=https://your-backend-url/api
```
- Build command:
```
npm run build
```
- Output directory:
```
dist
```

---

## 🧭 API Endpoints Overview

### Auth
```
POST /api/auth/register
POST /api/auth/verify-otp
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/password/request-otp
POST /api/auth/password/update
```

### Projects
```
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Tasks
```
POST   /api/projects/:projectId/tasks
GET    /api/projects/:projectId/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Attachments
```
POST   /api/tasks/:taskId/attachments
GET    /api/tasks/:taskId/attachments
DELETE /api/attachments/:id
GET    /api/attachments/:id/download
```

---

## 🛠 Future Roadmap (V2+)
- Migrate attachments to AWS S3
- Real-time chat & notifications
- Team collaboration (multi-user projects)
- Comments & activity logs
- Calendar + drag-drop tasks
- Role-based permissions

---

## 💡 Author
**Manohar Pediredla**  
Full-stack MERN developer passionate about clean architecture & workflows.
