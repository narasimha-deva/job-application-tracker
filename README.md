Job Application Tracker

A full-stack web application to manage job applications, track recruitment progress, and organize job-search activity in one place.

Live Demo

- Frontend: https://job-application-tracker-sigma-neon.vercel.app
- Backend API: https://job-application-tracker-uh07.onrender.com
- GitHub Repository: https://github.com/narasimha-deva/job-application-tracker

Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Create, view, edit, and delete job applications
- Track application status: Applied, Interview, Offer, and Rejected
- Search applications by job title or company
- Filter applications by status
- Dashboard statistics for application progress
- Protected API routes for authenticated users
- User-specific application access

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
- bcryptjs

Tools and Deployment

- Git and GitHub
- Postman
- Render — Backend deployment
- Vercel — Frontend deployment

API Endpoints

All job application endpoints require a valid JWT token in the "Authorization" header.

Method| Endpoint| Description
POST| "/api/auth/register"| Register a new user
POST| "/api/auth/login"| Authenticate a user
GET| "/api/jobs"| Get the authenticated user's applications
POST| "/api/jobs"| Create a job application
PUT| "/api/jobs/:id"| Update a job application
DELETE| "/api/jobs/:id"| Delete a job application

Authentication

After a successful login, the API returns a JWT token. Send it with protected requests:

"Authorization: Bearer YOUR_JWT_TOKEN"

Project Structure

job-application-tracker/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
├── package.json
├── server.js
└── README.md

Run Locally

Prerequisites

- Node.js and npm
- MongoDB connection string

1. Clone the repository

git clone https://github.com/narasimha-deva/job-application-tracker.git
cd job-application-tracker

2. Configure the backend

Install backend dependencies:

npm install

Create a ".env" file in the project root:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
PORT=5000

Replace the example values with your own configuration. Never commit real credentials or secrets to GitHub.

3. Start the backend

npm start

The backend runs on the configured port, "5000" by default.

4. Start the frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open the local URL displayed by Vite in your terminal.

Learning Outcomes

This project demonstrates practical experience with:

- Designing RESTful APIs
- Implementing authentication and authorization
- Working with MongoDB and Mongoose
- Connecting a React frontend to a backend API
- Implementing CRUD operations
- Handling user-specific data
- Deploying a full-stack application

Future Improvements

- Automated API tests
- Pagination and sorting
- More detailed application notes and follow-up reminders
- Improved validation and error messages
- CI/CD workflow

---

Built as a full-stack development project to practice backend API development, frontend integration, database operations, authentication, and deployment.
