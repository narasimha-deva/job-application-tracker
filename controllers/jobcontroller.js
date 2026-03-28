const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res, next) => {
  try {
    const { title, company, status } = req.body;

    const job = await Job.create({
      title,
      company,
      status,
      user: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// GET ALL JOBS
const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// UPDATE JOB
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (job.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// DELETE JOB
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (job.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};