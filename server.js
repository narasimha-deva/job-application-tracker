require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

app.options("*", cors());


app.get("/test", (req, res) => {
  res.send("Test Working");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);

app.get("/api/test", (req, res) => {
  res.send("Test Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});