# BEC Student Registration System (MERN Stack + MongoDB Atlas)

A clean, simple, functional, and beginner-friendly **Student Registration System** built for the Full Stack Development (FSD) Lab Internal Examination.

Designed with a **bright and friendly light theme** (White, Orange, Yellow, Cream, Light Gray) and ready for deployment on **Render (Backend)**, **Vercel (Frontend)**, and **MongoDB Atlas (Database)**.

---

## 🌟 Features

1. **Dashboard (Home Page)**
   - Bright landing section with quick action buttons (`Register Student` and `View Students`).
   - 6 clean white statistic cards with orange/yellow accents:
     - Total Students
     - Total Departments
     - 1st Year Students
     - 2nd Year Students
     - 3rd Year Students
     - 4th Year Students
2. **Student Registration Form**
   - Fields: Student Name, Roll Number, Email, Phone Number, Department, Year, Gender, Date of Birth.
   - Comprehensive department list including Computer Science specializations (AI & ML, DS, Cyber Security, IoT) and core engineering branches.
   - Prevents duplicate roll numbers with clear feedback.
   - Automatic navigation to Registered Students page upon successful registration.
3. **Registered Students Directory & Table**
   - Clean light-themed table displaying all registered students.
   - Horizontal scrolling support on small/mobile screens.
4. **Live Search**
   - Real-time search filter by Student Name, Roll Number, or Department using JavaScript `.filter()`.
5. **Edit & Delete Operations**
   - Edit student details with form pre-fill and update via `PUT /api/students/:id`.
   - Delete student records with confirmation via `DELETE /api/students/:id`.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Vite, Axios, Basic CSS (Light theme: White, Orange, Yellow, Cream).
- **Backend**: Node.js, Express.js, CORS, dotenv.
- **Database**: MongoDB Atlas via Mongoose.
- **Deployment**: Render (Backend Web Service), Vercel (Frontend Web App), MongoDB Atlas (Cloud DB).

---

## 📂 Project Structure

```text
Student-Registration-System/
│
├── backend/
│   ├── server.js               # Starts Express on 0.0.0.0 and connects to MongoDB Atlas
│   ├── .env                    # MONGO_URI (Atlas) & PORT=5000 (local only, git-ignored)
│   ├── .gitignore              # Ignores node_modules/ and .env
│   ├── package.json            # Backend dependencies and "start": "node server.js"
│   │
│   ├── models/
│   │   └── Student.js          # Mongoose schema for Student
│   │
│   └── routes/
│       └── studentRoutes.js    # Express REST API routes
│
├── frontend/
│   ├── package.json            # Frontend dependencies and Vite scripts
│   ├── vercel.json             # Vercel SPA routing rewrites
│   ├── .env                    # VITE_API_URL=http://localhost:5000 (local only, git-ignored)
│   ├── .gitignore              # Ignores node_modules/, dist/, .env
│   ├── index.html              # Entry HTML
│   ├── vite.config.js          # Vite config
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx      # Light navbar with orange highlights
│       │   └── StudentForm.jsx # Registration form with auto-navigation
│       │
│       ├── pages/
│       │   ├── Home.jsx        # Landing hero + 6 metric cards
│       │   └── Students.jsx    # Registered Students table with search, edit, delete
│       │
│       ├── App.jsx             # React routing
│       ├── main.jsx            # Entry point
│       └── index.css           # Light theme CSS (White, Orange, Yellow, Cream)
│
├── requirements.txt            # System and package requirements
├── README.md                   # Full documentation & deployment guide
└── VIVA.md                     # Comprehensive FSD Lab Viva preparation Q&A
```

---

## 🚀 Deployment Guide (Vercel + Render + MongoDB Atlas)

Follow this exact step-by-step order to deploy the application:

```text
Step 1: Push Code to GitHub
   ↓
Step 2: MongoDB Atlas (Allow Access from Anywhere)
   ↓
Step 3: Deploy Backend on Render (Web Service)
   ↓
Step 4: Deploy Frontend on Vercel with Render URL
   ↓
Step 5: Verify Live End-to-End Flow
```

---

### Step 1: Push Code to GitHub

Initialize your repository and push the project to GitHub:
```bash
git init
git add .
git commit -m "Prepare student registration system for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
*(Notice: All `.env` and `node_modules` folders are protected by `.gitignore` and will never be committed).*

---

### Step 2: MongoDB Atlas Network Access

Ensure your Atlas cluster accepts connections from cloud servers (like Render):
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Under **Security** on the left menu, click **Network Access**.
3. Click **Add IP Address**.
4. Choose **Allow Access from Anywhere** (enters `0.0.0.0/0`).
5. Click **Confirm**.

---

### Step 3: Deploy Backend on Render

1. Log in to [Render](https://render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure the Web Service:
   - **Name**: `bec-student-registration`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://poornap307_db_user:atHFzbhGYUzPPLiB@studentregistrationdb.mpdwuit.mongodb.net/studentRegistrationDB?retryWrites=true&w=majority`
6. Click **Create Web Service**.
7. Wait ~2 minutes for Render to deploy. Once live, copy your backend URL:
   `https://bec-student-registration.onrender.com`

---

### Step 4: Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. Configure the Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Under **Environment Variables**, add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://bec-student-registration.onrender.com`
6. Click **Deploy**.
7. In ~1 minute, Vercel will give you your live URL: `https://bec-student-registration.vercel.app`.

---

### Step 5: Test Live Application

1. Open your live Vercel URL.
2. Go to **Register Student**.
3. Register a student.
4. Confirm instant success message and redirection to **Registered Students**.
5. Check that the student appears in the table.
6. Refresh the page to verify persistence.

---

## 💻 Local Development

### 1. Backend:
```bash
cd backend
npm install
npm start
```
Runs on: `http://localhost:5000`

### 2. Frontend:
```bash
cd frontend
npm install
npm run dev
```
Runs on: `http://localhost:5173`
