# Task Manager - Full Stack MERN Application

A full-stack Task Manager web application built with the MERN stack featuring Google OAuth authentication, JWT authorization, and a drag-and-drop Kanban board.

## 🌐 Live Demo
👉 [https://taskmanager-satyam.vercel.app](https://taskmanager-satyam.vercel.app)

## ✨ Features
- 🔐 Google OAuth authentication using Firebase
- 🔑 JWT Bearer token based authorization
- 📋 Drag and drop Kanban board (To Do, In Progress, Done)
- ✅ Create, edit, delete and search tasks
- 🎯 Priority management (Low, Medium, High)
- 📅 Due date management
- 🔥 30 Days streak tracker
- 📱 Fully responsive UI

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Query (TanStack Query)
- Tailwind CSS
- Axios
- React Beautiful DnD
- React Router DOM
- Firebase (Google OAuth)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcryptjs

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📸 Screenshots
<!-- Add your screenshots here -->

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Firebase Project

### Installation

1. Clone the repo
```bash
   git clone https://github.com/yourusername/yourrepo.git
```

2. Install backend dependencies
```bash
   cd backend
   npm install
```

3. Install frontend dependencies
```bash
   cd frontend
   npm install
```

4. Create `.env` file in backend folder
```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   FRONTEND_BASE_URL=http://localhost:5173
   NODE_ENV=development
```

5. Create `.env` file in frontend folder
```env
   VITE_BACKEND_BASE_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
```

6. Run backend
```bash
   cd backend
   npm run dev
```

7. Run frontend
```bash
   cd frontend
   npm run dev
```

8. Open browser and go to
