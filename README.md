# TaskFlow – Backend API

TaskFlow Backend is a **Node.js & Express** REST API that powers the TaskFlow application.  
It handles authentication, task & category management, notifications, and database operations using **MongoDB Atlas**.

This backend is deployed on **Render** and serves Flutter clients (Windows & Android).

---

## 🚀 Features

- 🔐 JWT-based authentication (Register / Login)
- 🔁 Password reset with email OTP
- 📂 Task & category management
- ⏰ Deadline & priority handling
- 🔔 Notification & reminder cron jobs
- 📡 RESTful API design
- ☁️ Cloud-hosted MongoDB Atlas database

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT Authentication**
- **Nodemailer**
- **Node-Cron**
- **Firebase Admin (FCM notifications)**
- **Render (Deployment)**

---

## 🌐 Live API

https://taskflow-backend-g86v.onrender.com/

---

### Health Check

GET /healthz

Expected response:
OK

---


---

## 🔗 API Endpoints (Overview)

### 🔐 Authentication
- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`

### 📂 Categories
- `POST /api/categories`
- `GET /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### 📝 Tasks
- `POST /api/tasks`
- `GET /api/tasks/category/:categoryId`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/complete`
- `PATCH /api/tasks/:id/priority`

### 📊 Dashboard
- `GET /api/dashboard`

### 🔔 Notifications
- `GET /api/notifications/pending`
- `POST /api/users/fcm-token`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=<YOUR_MONGODB_ATLAS_URI>
JWT_SECRET=<YOUR_SECRET_KEY>
JWT_EXPIRES_IN=24h

EMAIL_USER=<EMAIL_FOR_OTP>
EMAIL_PASS=<EMAIL_PASSWORD>

FIREBASE_PROJECT_ID=<FIREBASE_PROJECT_ID>

BREVO_API_KEY=<YOUR_BREVO_API_KEY>

```

---

## 🧪 Run Locally

▶ Install dependencies
npm install

▶ Start server
npm run dev

Server will run at:
http://localhost:3000

