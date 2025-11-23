# TaskHub – Architecture (Version 1)

## 1. Technology Stack
### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Context API for Auth

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Multer (file uploads)
- Nodemailer
- JWT authentication
- CORS + Morgan

---

## 2. Folder Structure
- backend/
- controllers/
- middleware/
- models/
- routes/
- uploads/
- frontend/
- src/pages/
- src/components/
- src/services/
- src/context/
- docs/
- requirements.md
- architecture.md

## 3. Authentication Flow
- Register → Email OTP → Verify → Login → JWT → /dashboard
- Forgot Password → OTP → Reset
- Change Password → OTP → Update

- JWT stored in `sessionStorage`.


## 4. Project & Task Flow
Dashboard
├── Projects List
├── Stats
└── Create Project
Project Details
├── Task list
├── Create Task
├── Edit / Delete Task
└── Attachments

## 5. Attachment Flow
TaskDetails.jsx
→ POST /api/tasks/:taskId/attachments
backend/uploads/tasks/<file>
→ GET /api/tasks/:taskId/attachments
→ GET /api/attachments/:id/download
→ DELETE /api/attachments/:id

Files stored locally for V1 (S3 in V2).

## 6. Deployment Architecture

### Backend (Render / Railway)
client → HTTPS → Render (Express API) → MongoDB Atlas
|
└→ uploads/tasks/

### Frontend (Vercel / Netlify)
client → CDN → Static build → Axios → backend/api

# ⭐ 5. **Deployment Guide (Render + Vercel)**

### ▶ Backend on Render
1. Push code to GitHub
2. Create "Web Service" on Render
3. Set these environment variables:
   - MONGO_URI
   - JWT_SECRET
   - EMAIL_HOST
   - EMAIL_PORT
   - EMAIL_USER
   - EMAIL_PASS
   - CLIENT_URL
4. Install command:
npm install

5. Start command:
node server.js

6. Add persistent directory:
uploads

### ▶ Frontend on Vercel
1. Push frontend to GitHub
2. Create new Vercel project
3. Add environment variable:
VITE_API_URL=https://your-backend-url/api

4. Build command:
npm run build

5. Output folder:
dist