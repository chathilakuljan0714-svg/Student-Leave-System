// ===== JavaScript Logic =====
let student = { name: "IT Student", email: "student@kdu.lk", password: "1234" };
let leaves = [];

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if(user && pass) {
    document.getElementById("login").classList.remove("active");
    document.getElementById("dashboard").classList.add("active");
    document.getElementById("studentName").innerText = student.name;
  } else {
    alert("Enter valid credentials!");
  }
}

function showPage(pageId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById("dashboard").classList.add("active");
  document.getElementById(pageId).classList.add("active");
}

function updateProfile() {
  student.name = document.getElementById("profileName").value || student.name;
  student.email = document.getElementById("profileEmail").value || student.email;
  alert("Profile updated!");
}

function changePassword() {
  student.password = document.getElementById("newPassword").value;
  alert("Password changed successfully!");
}

function applyLeave() {
  let leave = {
    type: document.getElementById("leaveType").value,
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
    reason: document.getElementById("reason").value,
    status: "Pending"
  };
  leaves.push(leave);
  alert("Leave applied successfully!");
  updateLeaveStatus();
}

function updateLeaveStatus() {
  let table = document.getElementById("statusTable");
  table.innerHTML = `
    <tr>
      <th>Leave Type</th><th>Start Date</th><th>End Date</th>
      <th>Reason</th><th>Status</th><th>Download PDF</th>
    </tr>`;
  leaves.forEach((l, i) => {
    table.innerHTML += `
      <tr>
        <td>${l.type}</td>
        <td>${l.start}</td>
        <td>${l.end}</td>
        <td>${l.reason}</td>
        <td class="status-${l.status.toLowerCase()}">${l.status}</td>
        <td><button onclick="downloadPDF(${i})">Download</button></td>
      </tr>`;
  });
}

function downloadPDF(index) {
  let leave = leaves[index];
  let pdfContent = `
    Leave Approval Document\n
    Student: ${student.name}\n
    Type: ${leave.type}\n
    Start: ${leave.start}\n
    End: ${leave.end}\n
    Reason: ${leave.reason}\n
    Status: ${leave.status}\n
  `;
  let blob = new Blob([pdfContent], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "LeaveApproval.txt"; // Simulated PDF
  link.click();
}
