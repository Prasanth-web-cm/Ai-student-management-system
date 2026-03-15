# Student Management System

A full-stack web application built with React, Tailwind CSS V4, Node.js, Express, and MongoDB.

## Features
- **Advanced UI**: Striking dashboard with left navigation and top bar.
- **Admin Panel**: Add, update, remove students, manage attendance, and distribute forms.
- **Student Portal**: View and download daily attendance, semester marks, and fill out forms.
- **Authentication**: Admin and Student separate logins.
- **Data Export**: Export functionality for Marks and Attendance into CSV formats.

## Step-by-Step Procedure to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder and add your MongoDB connection string:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/student-management
   JWT_SECRET=supersecretkey
   ```
4. Start the server: `node server.js`

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Visit `http://localhost:5173` in your browser.

## Step-by-Step Procedure to Push to GitHub

1. **Initialize Git Repository**
   Make sure you are in the root directory (`student-management-system`).
   ```bash
   git init
   ```

2. **Add Files to Staging**
   ```bash
   git add .
   ```

3. **Commit the Changes**
   ```bash
   git commit -m "Initial commit: Complete Student Management System structure"
   ```

4. **Create a Repository on GitHub**
   - Go to [GitHub](https://github.com) and log in.
   - Click the **+** (New repository) icon at the top right.
   - Name your repository (e.g., `student-management-system`).
   - Do NOT check "Initialize this repository with a README" (since we just made one).
   - Click **Create repository**.

5. **Link Local Repository to GitHub**
   Copy the URL provided by GitHub and add it as the origin remote:
   ```bash
   git remote add origin https://github.com/YourUsername/student-management-system.git
   ```

6. **Push the Code**
   ```bash
   git branch -M main
   git push -u origin main
   ```
