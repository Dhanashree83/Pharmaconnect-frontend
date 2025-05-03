// const BASE_URL = "appointment/page";
// const tableBody = document.getElementById("appointmentsTableBody");
// const paginationDiv = document.getElementById("pagination");

// let currentPage = 1;
// const pageSize = 10;

// function fetchAppointments(page = 1) {
//   fetch(`${BASE_URL}?page=${page - 1}&size=${pageSize}`)
//     .then(res => res.json())
//     .then(data => {
//       renderTable(data.content);
//       renderPagination(data.totalPages, page);
//     })
//     .catch(err => {
//       console.error("Error fetching appointments:", err);
//       tableBody.innerHTML = `<tr><td colspan="8" class="p-4 text-red-500">Failed to load data.</td></tr>`;
//     });
// }

// function renderTable(appointments) {
//   tableBody.innerHTML = "";

//   if (appointments.length === 0) {
//     tableBody.innerHTML = `<tr><td colspan="8" class="p-4 text-gray-500">No appointments found.</td></tr>`;
//     return;
//   }

//   appointments.forEach(app => {
//     const statusBadge =
//       app.status === "CONFIRMED"
//         ? `<span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">CONFIRMED</span>`
//         : `<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">PENDING</span>`;

//     const row = `
//       <tr>
//         <td class="p-2 border">${app.appointmentId}</td>
//         <td class="p-2 border">${app.firstName} ${app.lastName}</td>
//         <td class="p-2 border">${app.phoneNumber}</td>
//         <td class="p-2 border">${app.email}</td>
//         <td class="p-2 border">${new Date(app.appointmentDate).toLocaleString()}</td>
//         <td class="p-2 border">${app.doctorName}</td>
//         <td class="p-2 border">${statusBadge}</td>
//         <td class="p-2 border">
//           ${app.status === "PENDING"
//             ? `<button class="confirmBtn bg-blue-500 text-white px-3 py-1 rounded text-xs" data-id="${app.appointmentId}">Confirm</button>`
//             : `<span class="text-green-600 text-xs">Done</span>`}
//         </td>
//       </tr>
//     `;
//     tableBody.insertAdjacentHTML("beforeend", row);
//   });

//   attachConfirmListeners();
// }

// function attachConfirmListeners() {
//   document.querySelectorAll(".confirmBtn").forEach(btn => {
//     btn.addEventListener("click", () => {
//       const id = btn.getAttribute("data-id");
//       fetch(`http://localhost:8082/appointment/confirm/${id}`, {
//         method: "PUT"
//       })
//         .then(res => res.json())
//         .then(data => {
//           alert(`Appointment ${data.appointmentId} confirmed.`);
//           fetchAppointments(currentPage); // reload current page
//         })
//         .catch(err => {
//           console.error("Confirmation error:", err);
//           alert("Failed to confirm appointment.");
//         });
//     });
//   });
// }

// function renderPagination(totalPages, activePage) {
//   paginationDiv.innerHTML = "";

//   for (let i = 1; i <= totalPages; i++) {
//     const btn = document.createElement("button");
//     btn.textContent = i;
//     btn.className =
//       "px-3 py-1 border rounded " +
//       (i === activePage
//         ? "bg-blue-600 text-white"
//         : "bg-white text-blue-600 hover:bg-blue-100");

//     btn.addEventListener("click", () => {
//       currentPage = i;
//       fetchAppointments(currentPage);
//     });

//     paginationDiv.appendChild(btn);
//   }
// }

// // Initial call
// document.addEventListener("DOMContentLoaded", () => {
//   fetchAppointments(currentPage);
// });

let currentPage = 1;
const pageSize = 10;

document.addEventListener("DOMContentLoaded", () => {
  fetchAppointments(currentPage);
});

function fetchAppointments(page) {
  const url = `http://localhost:8082/appointment/page?page=${page}&size=${pageSize}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Fetched Data:", data); // Optional: Debug log
      renderAppointments(data.content);
      renderPagination(data.totalPages, page);
    })
    .catch(err => {
      console.error("Error fetching appointments:", err);
      document.getElementById("appointmentTableBody").innerHTML = `
        <tr><td colspan="8" class="py-6 text-red-500">Failed to load data.</td></tr>
      `;
    });
}

function renderAppointments(appointments) {
  const tableBody = document.getElementById("appointmentTableBody");
  tableBody.innerHTML = "";

  appointments.forEach(app => {
    const tr = document.createElement("tr");

    // const statusBadge = app.status === "CONFIRMED"
    //   ? `<span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">CONFIRMED</span>`
    //   : `<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">PENDING</span>`;

    tr.innerHTML = `
      <td class="px-4 py-2 border">${app.appointmentId}</td>
      <td class="px-4 py-2 border">${app.firstName} ${app.lastName}</td>
      <td class="px-4 py-2 border">${app.phoneNumber}</td>
      <td class="px-4 py-2 border">${app.email}</td>
      <td class="px-4 py-2 border">${new Date(app.appointmentDate).toLocaleString()}</td>
      <td class="px-4 py-2 border">${app.doctorName}</td>
      <td class="px-4 py-2 border">${statusBadge}</td>
      <td class="px-4 py-2 border">
        ${app.status === "PENDING" 
          ? `<button class="confirmBtn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" data-id="${app.appointmentId}">Confirm</button>`
          : `<span class="text-green-600 text-sm font-semibold">Done</span>`}
      </td>
    `;
    tableBody.appendChild(tr);
  });

  document.querySelectorAll(".confirmBtn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      confirmAppointment(id);
    });
  });
}

function renderPagination(totalPages, current) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded ${i === current ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`;
    btn.addEventListener("click", () => {
      currentPage = i;
      fetchAppointments(i);
    });
    pagination.appendChild(btn);
  }
}

function confirmAppointment(id) {
  fetch(`http://localhost:8082/appointment/confirm/${id}`, {
    method: "PUT",
  })
    .then(res => res.json())
    .then(data => {
      alert(`Appointment ${data.appointmentId} confirmed.`);
      fetchAppointments(currentPage);
    })
    .catch(err => {
      console.error("Error confirming:", err);
      alert("Failed to confirm appointment.");
    });
}
