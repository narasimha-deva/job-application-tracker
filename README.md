Job Application Tracker API

A secure RESTful backend API built with Node.js, Express, and MongoDB for tracking job applications.
Includes JWT authentication and strict user-based authorization.

1. Tech Stack

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Tokens (JWT)

bcryptjs (Password Hashing)

CORS

2. Features
Authentication

User Registration

User Login

Password Hashing using bcrypt

JWT Token Generation

Protected Routes

Job Management (CRUD)

Create Job Application

Get All Jobs (Only Logged-in User)

Update Job

Delete Job

Authorization (Phase 4 Completed)

Each job is linked to the logged-in user

Users can only access their own jobs

Ownership verification for update and delete

Unauthorized access returns proper HTTP status codes

3. API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Job Routes (Protected)

All routes require:

Authorization Header:

Authorization: Bearer YOUR_TOKEN
Method	Endpoint	Description
POST	/api/jobs	Create job
GET	/api/jobs	Get logged-in user jobs
PUT	/api/jobs/:id	Update job (Ownership Required)
DELETE	/api/jobs/:id	Delete job (Ownership Required)
4. Security Logic

Jobs are stored with a user field (ObjectId reference).

req.user.id is extracted from JWT.

Database queries filter by logged-in user.

Update and Delete verify ownership before action.

Unauthorized attempts return 401.

5. Environment Variables

Create a .env file in the root folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
6. Run Locally
npm install
npm run dev

Server runs on:

http://localhost:5000
📈 Project Status

Phase 1 – Backend Setup ✔
Phase 2 – Authentication ✔
Phase 3 – CRUD Operations ✔
Phase 4 – Authorization & Ownership Verification ✔
Phase 5 – Stability Testing (Next)
Phase 6 – Deployment (Upcoming)
