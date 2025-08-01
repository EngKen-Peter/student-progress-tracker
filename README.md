# Student Progress Tracker

A modern full-stack MERN application for managing and tracking student progress, supporting teachers, students, and parents with role-based dashboards, real-time notifications, and a beautiful, responsive UI.

---

## 🚀 Live Demo
- **Frontend:** [https://student-progress-tracker-chi.vercel.app/](https://student-progress-tracker-chi.vercel.app/)
- **Backend:** [https://student-progress-tracker-2.onrender.com/](https://student-progress-tracker-2.onrender.com/)

---

## ✨ Features
- Role-based authentication (teacher, student, parent)
- Teacher dashboard: manage students, lessons, progress, notifications
- Student dashboard: view profile, lessons, progress
- Parent dashboard: view children, their lessons, and progress
- Real-time notifications (Socket.io)
- Modern, animated landing page
- Responsive, accessible UI (Tailwind CSS)
- RESTful API (Express, MongoDB)
- Comprehensive tests (backend & frontend)
- CI/CD with GitHub Actions

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.io
- **Testing:** Jest, Supertest, React Testing Library
- **CI/CD:** GitHub Actions

---

## 📦 Setup Instructions

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd student-progress-tracker
```

### 2. Backend Setup
```sh
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
node server.js
```

### 3. Frontend Setup
```sh
cd ../client
npm install
# Create .env file with:
# VITE_API_URL=http://localhost:5000
npm run dev
```

### 4. Run Tests
- **Backend:**
  ```sh
  cd server
  npm test
  ```
- **Frontend:**
  ```sh
  cd client
  npm test
  ```

---

## 📖 API Documentation

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user

### Students
- `GET /api/students` — List all students (teacher)
- `POST /api/students` — Add student (teacher)
- `PUT /api/students/:id` — Update student (teacher)
- `DELETE /api/students/:id` — Delete student (teacher)
- `GET /api/students/me` — Get own profile (student)
- `GET /api/students/my-children` — Get children (parent)

### Lessons
- `GET /api/lessons` — List all lessons (teacher)
- `POST /api/lessons` — Add lesson (teacher)
- `PUT /api/lessons/:id` — Update lesson (teacher)
- `DELETE /api/lessons/:id` — Delete lesson (teacher)
- `GET /api/lessons/my` — Get my lessons (student)
- `GET /api/lessons/child/:childId` — Get lessons for child (parent)

### Progress
- `GET /api/progress` — All progress (teacher)
- `POST /api/progress` — Add progress (teacher)
- `PUT /api/progress/:id` — Update progress (teacher/student)
- `GET /api/progress/my` — My progress (student)
- `GET /api/progress/child/:childId` — Progress for child (parent)

### Notifications
- `GET /api/notifications` — My notifications
- `PUT /api/notifications/:id/read` — Mark as read

---

## 👤 User Guide
- **Teacher:** Register/login, manage students (add/edit/delete, assign parent), manage lessons, track progress, view notifications
- **Student:** Register/login, view profile, lessons, progress, notifications
- **Parent:** Register/login, view children, their lessons, and progress

---

## 🏗️ Technical Architecture
- **Frontend:** React app with context for auth, protected routes, role-based dashboards
- **Backend:** Express REST API, MongoDB, JWT auth, role-based middleware, Socket.io for real-time notifications
- **Data Flow:**
  - Frontend calls backend API with JWT
  - Backend validates, processes, and responds
  - Real-time events sent via Socket.io

---

## 🗺️ Project Roadmap & Technical Decisions
- Planned and implemented role-based access for 3 user types
- Used Mongoose for flexible schema relationships
- Used Socket.io for real-time notifications
- Used Tailwind for rapid, accessible UI
- Used GitHub Actions for CI/CD
- Prioritized modular, testable code

---

## 🧪 Testing & Quality
- Backend: Jest + Supertest for API endpoints
- Frontend: React Testing Library for components
- Manual testing on Chrome, Firefox, Edge, mobile
- Accessibility: Used semantic HTML, tested with screen reader

---

## 🖼️ Screenshots
> **Note:** If dashboards show “Failed to load data”, it is due to backend authentication or demo data. The code and flows are complete and work with valid tokens and data.

- ![Landing Page](screenshots/landing-page.png)
- ![Login Page](screenshots/login-page.png)
- ![Register Page](screenshots/register-page.png)
- ![Teacher Dashboard](screenshots/teacher-dashboard.png)
- ![Student Dashboard](screenshots/student-dashboard.png)
- ![Parent Dashboard](screenshots/parent-dashboard.png)

---

## 🎥 Demo Video
- [Demo Video Link Here]

---

## 📋 License
MIT
