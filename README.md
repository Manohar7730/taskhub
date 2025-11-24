# TaskHub (V1)

TaskHub is a minimal MERN-based project & task manager with email OTP authentication and attachment support (images & PDFs).  
V1 focuses on simplicity, security, and clean architecture.

---

## Features (V1)

- Register / Login with email OTP verification.
- Forgot password & reset via OTP.
- Projects & Tasks (CRUD).
- Attachments for tasks (image/pdf).
- JWT authentication (sessionStorage in V1).
- Local uploads (dev) or AWS S3 uploads (prod).
- Security middleware: CORS, rate limiting, bcrypt, OTP expiry.

---

## Repository Structure

```
/backend
/frontend
/docs
```

See `/docs/architecture.md` and `/docs/requirements.md` for details.

---

## 🔧 Quick Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas (recommended)
- (Optional) AWS S3 bucket for testing production mode

---

## 🖥️ Backend Setup

```
cd backend
cp .env.example .env
# Fill .env
npm install
npm run dev     # nodemon server.js
# or
npm start       # node server.js
```

---

## 🖥️ Frontend Setup

```
cd frontend
cp .env.example .env
# Set VITE_API_URL to backend URL
npm install
npm run dev
```

Build frontend:

```
npm run build
```

---

## 🚀 Deployment

### Backend (Render / Railway)

- Add environment variables.
- Use `NODE_ENV=production`.
- If using local uploads, attach a **Persistent Disk** to `/opt/render/project/src/uploads`.

### Frontend (Netlify / Vercel)

- Set `VITE_API_URL` to backend public URL.
- Build → deploy.

### Storage (Production)

- S3 bucket recommended.
- IAM user needs:
  ```
  s3:PutObject
  s3:GetObject
  s3:DeleteObject
  s3:ListBucket
  ```

---

## 📦 S3 Attachments (Production)

- Uploads stored in S3.
- Database stores:
  - `filePath` (public URL)
  - `fileKey` (required for delete)
- Local uploads still used in development.

---

## License

MIT (optional to update)
