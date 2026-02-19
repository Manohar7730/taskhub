# 🚀 TaskHub (V1) — MERN Task & Project Manager

TaskHub is a production-ready MERN stack task & project management system with secure email OTP authentication and attachment support (images & PDFs).

V1 focuses on simplicity, security, and clean architecture, designed as a single-user productivity platform.

---

## 🌐 Live Demo

Frontend: https://taskub.netlify.app  
Backend: https://taskhub-backend.onrender.com  

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JWT
- Email OTP Verification
- bcrypt
- Rate Limiting
- CORS

### File Storage
- Local Uploads (Development)
- AWS S3 (Production)

### Tools
- Git
- GitHub
- Postman

---

## ✨ Features (V1)

### 🔐 Authentication
- Register / Login with Email OTP verification  
- Forgot password & reset via OTP  
- JWT-based authentication  

### 📁 Projects & Tasks
- Create, update, delete projects  
- Create, update, delete tasks  
- Task status & progress tracking  

### 📎 Attachments
- Upload images & PDFs  
- Preview attachments  
- Stored locally (dev) or AWS S3 (prod)  

### 🛡 Security
- OTP expiry handling  
- Password hashing with bcrypt  
- Rate limiting & CORS protection  

---

## 📁 Repository Structure

/backend  
/frontend  
/docs  

See `/docs/architecture.md` and `/docs/requirements.md` for additional documentation.

---

## 📸 Screenshots

Create a folder:

screenshots/

Add:
- login.png
- dashboard.png
- project.png
- task.png

Then reference:

![Login](screenshots/login.png)  
![Dashboard](screenshots/dashboard.png)

---

## 🔧 Quick Local Setup

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas account
- (Optional) AWS S3 bucket

---

## 🖥 Backend Setup

cd backend  
cp .env.example .env  
npm install  
npm run dev  

or  

npm start  

### Sample Backend .env

PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

EMAIL_HOST=your_smtp_host  
EMAIL_USER=your_email  
EMAIL_PASS=your_password  

AWS_ACCESS_KEY_ID=your_key  
AWS_SECRET_ACCESS_KEY=your_secret  
AWS_BUCKET_NAME=your_bucket  
AWS_REGION=your_region  

---

## 🖥 Frontend Setup

cd frontend  
cp .env.example .env  
npm install  
npm run dev  

### Frontend .env

VITE_API_URL=http://localhost:5000  

Build for production:

npm run build  

---

## 🚀 Deployment

### Backend (Render / Railway)
- Add environment variables  
- Set NODE_ENV=production  
- If using local uploads → attach persistent disk  

### Frontend (Netlify / Vercel)
- Set VITE_API_URL to backend public URL  
- Build & deploy  

---

## 📦 S3 Attachments (Production)

- Files uploaded to AWS S3  
- Database stores:
  - filePath (public URL)
  - fileKey (used for delete)  

Required IAM permissions:

s3:PutObject  
s3:GetObject  
s3:DeleteObject  
s3:ListBucket  

---

## 👨‍💻 Author

Manohar Pediredla  
Junior Software Engineer | MERN Stack Developer  
Email: manoharpediredla2@gmail.com  
LinkedIn: https://linkedin.com/in/manoharpediredla  

---

## ⭐ Why This Project Matters

This project demonstrates:

- Full-stack MERN development  
- Secure authentication workflows  
- REST API design  
- File upload pipelines  
- Production deployment experience  
