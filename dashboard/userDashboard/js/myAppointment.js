const appointments = [
    {
      date: "2025-04-25",
      time: "10:30 AM",
      doctor: "Dr. Aarti Sharma",
      department: "Cardiology",
      status: "Confirmed"
    },
    {
      date: "2025-05-01",
      time: "02:00 PM",
      doctor: "Dr. Mohan Das",
      department: "Neurology",
      status: "Pending"
    },
    {
      date: "2025-05-08",
      time: "11:15 AM",
      doctor: "Dr. Rhea Kapoor",
      department: "Dermatology",
      status: "Completed"
    }
  ];

  const tableBody = document.getElementById("appointmentTableBody");

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((appt, index) => {
      const row = document.createElement("tr");
      const statusClass = appt.status.toLowerCase();

      row.innerHTML = `
        <td class="py-2 px-4">${appt.date}</td>
        <td class="py-2 px-4">${appt.time}</td>
        <td class="py-2 px-4">${appt.doctor}</td>
        <td class="py-2 px-4">${appt.department}</td>
        <td class="py-2 px-4"><span class="status ${statusClass}">${appt.status}</span></td>
        <td class="py-2 px-4">
          <button class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600" onclick="viewAppointment(${index})">View</button>
          ${appt.status !== 'Completed' ? `<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ml-2" onclick="cancelAppointment(${index})">Cancel</button>` : ''}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function viewAppointment(index) {
    const appt = appointments[index];
    const content = `
      <strong>Date:</strong> ${appt.date}<br>
      <strong>Time:</strong> ${appt.time}<br>
      <strong>Doctor:</strong> ${appt.doctor}<br>
      <strong>Department:</strong> ${appt.department}<br>
      <strong>Status:</strong> ${appt.status}
    `;
    document.getElementById("modalContent").innerHTML = content;
    document.getElementById("viewModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("viewModal").style.display = "none";
  }

  function cancelAppointment(index) {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      appointments[index].status = "Cancelled";
      alert("Appointment Cancelled.");
      renderTable(appointments);
    }
  }

  renderTable(appointments);