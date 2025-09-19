const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const path = require("path");

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));


const DATA_FILE = "./data.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  if (username === data.admin.username && password === data.admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Add student
app.post("/add-student", (req, res) => {
  const data = readData();
  const student = req.body;
  data.students.push(student);
  writeData(data);
  res.json({ success: true });
});

// Add attendance
app.post("/add-attendance", (req, res) => {
  const data = readData();
  const record = req.body;
  data.attendance.push(record);
  writeData(data);
  res.json({ success: true });
});

// Add payment
app.post("/add-payment", (req, res) => {
  const data = readData();
  const payment = req.body;
  data.payments.push(payment);
  writeData(data);
  res.json({ success: true });
});

// Get all data
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

