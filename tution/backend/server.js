const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

const DATA_FILE = "./data.json";

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { admin: { username: "admin", password: "1234" }, students: [], attendance: [], payments: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  res.json({ success: username === data.admin.username && password === data.admin.password });
});

// Add student
app.post("/add-student", (req, res) => {
  const data = readData();
  data.students.push(req.body);
  writeData(data);
  res.json({ success: true });
});

// Add attendance
app.post("/add-attendance", (req, res) => {
  const data = readData();
  data.attendance.push(req.body);
  writeData(data);
  res.json({ success: true });
});

// Add payment
app.post("/add-payment", (req, res) => {
  const data = readData();
  data.payments.push(req.body);
  writeData(data);
  res.json({ success: true });
});

// Get all data
app.get("/data", (req, res) => res.json(readData()));

// Catch-all to serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
