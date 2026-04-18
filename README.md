# 🚀 Asset Management System

A modern **Asset Management Web Application** built using **React + TypeScript + Redux Toolkit**, with a mock backend powered by **JSON Server**.

This application allows users to manage assets efficiently with features like create, update, delete, bulk upload, and dashboard analytics.

---

## 🧠 Features

* ✅ Add / Edit / Delete Assets
* 📊 Dashboard with charts (Status & Type)
* 📁 Bulk Upload via Excel (.xlsx)
* 🔍 Real-time validation using React Hook Form
* 🔐 Basic Authentication (Mock)
* ⚡ Optimized rendering using memoization
* 🧩 Modular & scalable architecture

---

## 🏗️ Project Structure

```
asset-management-system/
│
├── frontend/        # React + Vite App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/         # JSON Server (Mock API)
│   ├── db.json
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Redux Toolkit
* React Hook Form
* Tailwind CSS
* Chart.js / Recharts

### Backend (Mock)

* JSON Server

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/asset-management-system.git
cd asset-management-system
```

---

### 2️⃣ Setup Backend (JSON Server)

```bash
cd backend
npm install
npm run server
```

Server runs at:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

---

## 📦 Available Scripts

### Frontend

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview build
```

### Backend

```bash
npm run server    # Start JSON Server
```

---

## 📊 Dashboard Overview

* Total Assets
* Assigned / Available / Repaired / Returned
* Pie Chart (Status)
* Bar Chart (Type)

---

## 📁 Bulk Upload

* Upload `.xlsx` files
* Auto validation
* Preview before submission
* Error reporting

---

## 🚀 Deployment

### Frontend (GitHub Pages / Netlify / Vercel)

1. Build project:

```bash
npm run build
```

2. Deploy `dist/` folder

---

### ⚠️ Backend Note

JSON Server is **not suitable for production**.

For real deployment:

* Replace with:

  * Node.js + Express
  * Firebase
  * Supabase
  * MongoDB / PostgreSQL

---

## 🧪 Demo Credentials

```
Email: admin@example.com
Password: 123456
```

---

## 🧠 Architecture Highlights

* Feature-based folder structure
* Separation of concerns
* Reusable UI components
* API abstraction layer (Axios)
* Optimized rendering (React.memo, useCallback)

---

## ⚠️ Known Limitations

* Uses mock backend (JSON Server)
* No real authentication
* Data resets if backend restarts

---

## 📌 Future Improvements

* 🔐 JWT Authentication
* 🌐 Real Backend Integration
* 📱 Mobile Responsiveness Enhancement
* 🧪 Unit & E2E Testing
* ☁️ Cloud Deployment

---

## 👨‍💻 Author

**Akash S**

Frontend Developer (React + TypeScript)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
