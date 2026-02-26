const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { title, company, status } = req.body;

    const job = await Job.create({
      title,
      company,
      status,
      user: req.user.id,   // 🔥 Links job to logged-in user
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS (only logged-in user's jobs)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};