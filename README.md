# 🗂️ MERN + MySQL Kanban Task Manager

A secure and responsive task management system using the MERN stack with MySQL as the database. It features user authentication, task creation, deadline-based classification, and a drag-and-drop Kanban board interface.

---

## 🚀 Features

- 🔐 User Authentication (JWT + HTTP-only cookies)
- 📋 Task Creation, Deletion, and Status Update
- 🧲 Drag-and-Drop Kanban Board (To Do, Doing, Done, Missing)
- 🕒 Deadline-aware task status (auto-moves to "Missing")
- 🗃️ MySQL database with promise-based connection (`mysql2/promise`)
- 🎨 Clean UI built with React + Tailwind CSS

---

## 🧱 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Auth:** JWT (stored in cookies)

---

## 📁 Project Structure

### Backend (`/backend/src`)
```
/config         → Database connection pool  
/controllers    → Business logic for tasks and auth  
/middlewares    → JWT token verification   
/routes         → Auth and Task route handlers  
/utils          → Helper utilities 
index.js        → Server entry point  
```

### Frontend (`/client`)
```
src/components/     → Login, Register, Dashboard  
src/App.jsx         → Main structure  
src/main.jsx        → Entry point  
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/averageshanks/Simple-Authentication-System.git
cd Simple-Authentication-System
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=What@12345
MYSQL_DB_NAME=task_manager
JWT_SECRET=supersecretkey

```

Then run:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend/client
npm install
npm run dev
```
Create a `.env` file inside `/backend`:

```env
VITE_API_URL = http://localhost:3000/api
```

The app should now be running at `http://localhost:5173` by default.

---

## 📌 API Overview

### Auth

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/api/auth/register` | Register a user   |
| POST   | `/api/auth/login`    | Login a user      |
| GET    | `/api/auth/me`       | Get current user  |
| POST   | `/api/auth/logout`   | Logout user       |

### Task

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/tasks`           | Get all user tasks       |
| POST   | `/api/tasks`           | Create a new task        |
| DELETE | `/api/tasks/:id`       | Delete a task            |
| POST   | `/api/updatetask/:id`  | Update task status       |

---

## 🧠 Task Status Logic

- **"created"** → Assigned to **To Do** if deadline is valid
- **"progress"** → Assigned to **Doing**
- **"completed"** → Assigned to **Done**

---

## ✅ To-Do / Improvements

- [ ] Edit task feature  
- [ ] Responsive UI enhancements  
- [ ] Notifications for due/overdue tasks  
- [ ] Task priority levels  

---

## 👨‍💻 Author

Made with 💻, ☕, and ❤️ by Sashank Baral

---

## 📄 License

Licensed under the MIT License.