import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const API = "https://job-application-tracker-uh07.onrender.com/api";
const TOKEN = "job_tracker_token";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN);

  const response = await fetch(API + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await request(
        register ? "/auth/register" : "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(
            register
              ? { name, email, password }
              : { email, password }
          )
        }
      );

      localStorage.setItem(TOKEN, data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">JT</div>

        <h1>Job Application Tracker</h1>
        <p>Track your job applications in one place.</p>

        <form onSubmit={submit}>
          {register && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit">
            {register ? "Create Account" : "Login"}
          </button>
        </form>

        <button
          className="link"
          onClick={() => {
            setRegister(!register);
            setError("");
          }}
        >
          {register
            ? "Already have an account? Login"
            : "Create a new account"}
        </button>
      </div>
    </div>
  );
}

function Dashboard({ logout }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [error, setError] = useState("");

  async function loadJobs() {
    try {
      const data = await request("/jobs");
      setJobs(Array.isArray(data) ? data : data.jobs || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function addJob(e) {
    e.preventDefault();

    try {
      await request(
  editingId ? `/jobs/${editingId}` : "/jobs",
  {
    method: editingId ? "PUT" : "POST",
    body: JSON.stringify({
      title,
      company,
      status
    })
  }
);

      setTitle("");
      setCompany("");
      setStatus("Applied");
      setEditingId(null);
      setShowForm(false);
      loadJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteJob(id) {
    if (!confirm("Delete this application?")) return;

    try {
      await request(`/jobs/${id}`, {
        method: "DELETE"
      });

      loadJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const text =
      `${job.title} ${job.company}`.toLowerCase();

    const matchesSearch = text.includes(
      search.toLowerCase()
    );

    const matchesFilter =
      filter === "All" || job.status === filter;

    return matchesSearch && matchesFilter;
  });

  const count = (value) =>
    jobs.filter((job) => job.status === value).length;

  return (
    <div className="dashboard">
      <header>
        <div>
          <small>JOB TRACKER</small>
          <h1>Applications</h1>
        </div>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <div className="stats">
          <div>
            <span>Total</span>
            <strong>{jobs.length}</strong>
          </div>

          <div>
            <span>Applied</span>
            <strong>{count("Applied")}</strong>
          </div>

          <div>
            <span>Interview</span>
            <strong>{count("Interview")}</strong>
          </div>

          <div>
            <span>Offer</span>
            <strong>{count("Offer")}</strong>
          </div>

          <div>
            <span>Rejected</span>
            <strong>{count("Rejected")}</strong>
          </div>
        </div>

        <div className="toolbar">
          <input
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button onClick={() => setShowForm(true)}>
            + Add Job
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {showForm && (
          <form className="job-form" onSubmit={addJob}>
            <h2>Add Application</h2>

            <input
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <div>
              <button type="submit">Add Application</button>
              <button
                type="button"
                className="cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="table">
          <div className="table-head">
            <span>Role</span>
            <span>Company</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filteredJobs.map((job) => (
            <div className="row" key={job._id}>
              <strong>{job.title}</strong>
              <span>{job.company}</span>
              <span className="badge">{job.status}</span>

              <button
                className="delete"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
              <button
  className="edit"
  onClick={() => startEdit(job)}
>
  Edit
</button>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="empty">
              No applications found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem(TOKEN))
  );

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Dashboard
      logout={() => {
        localStorage.removeItem(TOKEN);
        setLoggedIn(false);
      }}
    />
  );
}

const style = document.createElement("style");

style.textContent = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f6f8;
  color: #17191d;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #ddd;
}

.logo {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
  background: #17191d;
  color: white;
  border-radius: 10px;
  font-weight: bold;
}

.login-card h1 {
  margin-bottom: 8px;
}

.login-card p {
  color: #777;
}

form {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

input,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
}

button {
  border: 0;
  border-radius: 8px;
  padding: 11px 16px;
  background: #17191d;
  color: white;
}

.link {
  width: 100%;
  background: transparent;
  color: #555;
  margin-top: 15px;
}

.error {
  background: #ffecec;
  color: #b42318;
  padding: 10px;
  border-radius: 8px;
}

.dashboard {
  min-height: 100vh;
}

header {
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 24px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 4px 0 0;
}

header small {
  color: #777;
  font-weight: bold;
}

.logout {
  background: white;
  color: #333;
  border: 1px solid #ccc;
}

main {
  max-width: 1150px;
  margin: 30px auto;
  padding: 0 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.stats div {
  background: white;
  border: 1px solid #ddd;
  padding: 18px;
  border-radius: 12px;
}

.stats span {
  display: block;
  color: #777;
  font-size: 13px;
}

.stats strong {
  display: block;
  font-size: 25px;
  margin-top: 8px;
}

.toolbar {
  display: grid;
  grid-template-columns: 1fr 180px auto;
  gap: 12px;
  margin: 22px 0;
}

.job-form {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
}

.cancel {
  background: white;
  color: #333;
  border: 1px solid #ccc;
  margin-left: 8px;
}

.table {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
}

.table-head,
.row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 100px;
  gap: 15px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.table-head {
  background: #fafafa;
  color: #777;
  font-size: 12px;
  font-weight: bold;
}

.badge {
  display: inline-block;
  width: fit-content;
  background: #eee;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 12px;
}

.delete {
  background: transparent;
  color: #b42318;
  padding: 5px;
}

.empty {
  padding: 40px;
  text-align: center;
  color: #777;
}

@media (max-width: 750px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .toolbar {
    grid-template-columns: 1fr;
  }

  .table {
    overflow-x: auto;
  }

  .table-head,
  .row {
    min-width: 650px;
  }
}
`;

document.head.appendChild(style);

createRoot(document.getElementById("root")).render(<App />);
