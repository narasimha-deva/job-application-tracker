const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/temp");

const protect = require("../middleware/authMiddleware");

// Create job
router.post("/", protect, createJob);

// Get all jobs (only logged-in user)
router.get("/", protect, getJobs);

// Update job
router.put("/:id", protect, updateJob);

// Delete job
router.delete("/:id", protect, deleteJob);

module.exports = router;