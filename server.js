const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Job = require("./models/Job");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://jobappuser:jobapp123@cluster0.klt2wax.mongodb.net/jobapp")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
