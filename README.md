Job Application Tracker API

This is a backend project built using Node.js, Express, and MongoDB. It allows users to register, login, and manage job applications.

Live API:
https://job-application-tracker-uh07.onrender.com

Features:
User registration and login using JWT authentication
Create a job application
View all job applications
Update job status
Protected routes for authorized users only

Technologies used:
Node.js
Express.js
MongoDB Atlas
JWT authentication

API endpoints:

Authentication:
POST /api/auth/register
POST /api/auth/login

Jobs:
GET /api/jobs
POST /api/jobs
PUT /api/jobs/:id

Authentication:
Use Bearer token in request headers

Example response:
Check api-response.json file in this project

Author:
Narasimha