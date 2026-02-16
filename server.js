const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let jobs = [];

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/jobs", (req, res) => {
    res.json(jobs);
});
app.get("/add-test", (req, res) => {
    const sampleJob = {
        company: "Google",
        role: "Software Engineer",
        status: "Applied"
    };

    jobs.push(sampleJob);

    res.json({ message: "Job added successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
