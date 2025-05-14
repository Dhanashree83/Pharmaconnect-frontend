document.addEventListener("DOMContentLoaded", () => {
  const appointmentTableBody = document.getElementById("appointmentTableBody");
  const noAppointmentsMsg = document.getElementById("noAppointmentsMsg");

  const patientId = localStorage.getItem("patientId"); // must be set at login/signup

  if (!patientId) {
    noAppointmentsMsg.textContent = "Patient ID not found. Please log in again.";
    noAppointmentsMsg.classList.remove("hidden");
    return;
  }

  fetch(`${BASE_URL}/appointment/patient?patientId=${userId}&page=0&size=10`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.empty || data.content.length === 0) {
        noAppointmentsMsg.classList.remove("hidden");
        return;
      }

      data.content.forEach((appointment) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td class="py-2 px-4">${appointment.date || 'N/A'}</td>
          <td class="py-2 px-4">${appointment.time || 'N/A'}</td>
          <td class="py-2 px-4">${appointment.doctorName || 'N/A'}</td>
          <td class="py-2 px-4">${appointment.department || 'N/A'}</td>
          <td class="py-2 px-4">${appointment.status || 'Pending'}</td>
          <td class="py-2 px-4">
            <button onclick='viewDetails(${JSON.stringify(appointment)})' class="text-blue-600 hover:underline text-sm">View</button>
          </td>
        `;

        appointmentTableBody.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Error fetching appointments:", err);
      noAppointmentsMsg.textContent = "Error loading appointments. Try again later.";
      noAppointmentsMsg.classList.remove("hidden");
    });
});

function viewDetails(appointment) {
  const modal = document.getElementById("viewModal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <strong>Date:</strong> ${appointment.date || 'N/A'}<br>
    <strong>Time:</strong> ${appointment.time || 'N/A'}<br>
    <strong>Doctor:</strong> ${appointment.doctorName || 'N/A'}<br>
    <strong>Department:</strong> ${appointment.department || 'N/A'}<br>
    <strong>Status:</strong> ${appointment.status || 'Pending'}<br>
    <strong>Notes:</strong> ${appointment.notes || 'No additional notes.'}
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("viewModal").classList.add("hidden");
}
