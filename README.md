Job Application Tracker

A full-stack web application to manage job applications, track recruitment progress, and organize job-search activity in one place.

Live Demo

- Frontend: https://job-application-tracker-sigma-neon.vercel.app
- Backend API: https://job-application-tracker-uh07.onrender.com

Features

- User registration and login
- JWT-based authentication
- Create, view, edit, and delete job applications
- Track application status: Applied, Interview, Offer, and Rejected
- Search applications by role or company
- Filter applications by status
- Dashboard statistics for application progress
- Protected API routes for authenticated users

Tech Stack

Frontend

- React
- Vite
- JavaScript
- CSS

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

Tools and Deployment

- Git and GitHub
- Postman
- Render (Backend)
- Vercel (Frontend)

API Endpoints

Method| Endpoint| Description
POST| "/api/auth/register"| Register a user
POST| "/api/auth/login"| Log in
GET| "/api/jobs"| Get the user's applications
POST| "/api/jobs"| Create an application
PUT| "/api/jobs/:id"| Update an application
DELETE| "/api/jobs/:id"| Delete an application

Run Locally

Backend

1. Clone this repository.

2. Install dependencies:
   
   "npm install"

3. Create a ".env" file with your MongoDB connection string, JWT secret, and required environment variables.

4. Start the backend:
   
   "npm start"

Frontend

1. Open the frontend directory:
   
   "cd frontend"

2. Install dependencies:
   
   "npm install"

3. Start the development server:
   
   "npm run dev"

Project Structure

- "config/" — Backend configuration
- "controllers/" — Request handlers
- "middleware/" — Authentication and middleware
- "models/" — MongoDB models
- "routes/" — API routes
- "frontend/" — React frontend application

Purpose

Built to practice full-stack development, REST API integration, authentication, database operations, and deployment.
