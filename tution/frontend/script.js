const API_URL = "";

// Admin login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) window.location = "dashboard.html";
    else document.getElementById("error-msg").innerText = "Invalid login";
  });
}

// Add student
function addStudent() {
  const studentName = document.getElementById("studentName").value;
  const teacher = document.getElementById("teacher").value;
  fetch(`${API_URL}/add-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName, teacher })
  }).then(() => alert("Student added"));
}

// Add attendance
function addAttendance() {
  const date = document.getElementById("attDate").value;
  const studentName = document.getElementById("attStudent").value;
  const teacher = document.getElementById("attTeacher").value;
  const hours = document.getElementById("hours").value;
  fetch(`${API_URL}/add-attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, studentName, teacher, hours })
  }).then(() => loadData());
}

// Add payment
function addPayment() {
  const date = document.getElementById("payDate").value;
  const studentName = document.getElementById("payStudent").value;
  const amount = document.getElementById("amount").value;
  fetch(`${API_URL}/add-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, studentName, amount })
  }).then(() => loadData());
}

// Load records
function loadData() {
  fetch(`${API_URL}/data`)
    .then(res => res.json())
    .then(data => {
      const attTable = document.getElementById("attendanceTable");
      attTable.innerHTML = `<tr><th>Date</th><th>Student</th><th>Teacher</th><th>Hours</th></tr>`;
      data.attendance.forEach(a => {
        attTable.innerHTML += `<tr><td>${a.date}</td><td>${a.studentName}</td><td>${a.teacher}</td><td>${a.hours}</td></tr>`;
      });

      const payTable = document.getElementById("paymentTable");
      payTable.innerHTML = `<tr><th>Student</th><th>Date</th><th>Amount</th></tr>`;
      data.payments.forEach(p => {
        payTable.innerHTML += `<tr><td>${p.studentName}</td><td>${p.date}</td><td>${p.amount}</td></tr>`;
      });
    });
}

// Auto load data on dashboard
if (window.location.href.includes("dashboard.html")) loadData();
