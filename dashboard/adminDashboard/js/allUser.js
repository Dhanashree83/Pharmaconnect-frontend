const showTab = (type) => {
    document.querySelectorAll('.tab-section').forEach(tab => tab.classList.add('hidden'));
    document.querySelector(`#${type}-tab`).classList.remove('hidden');
  }

  async function fetchPatients(page = 1, size = 10) {
    const response = await fetch(`http://localhost:8082/api/patient/list?page=${page}&size=${size}`);
    const data = await response.json();
    renderPatientTable(data.content);
    renderPagination('patient', data.totalPages, page);
  }

  async function fetchDoctors(page = 1, size = 10) {
    const response = await fetch(`http://localhost:8082/api/doctor/list?page=${page}&size=${size}`);
    const data = await response.json();
    renderDoctorTable(data.content);
    renderPagination('doctor', data.totalPages, page);
  }

  function renderPatientTable(patients) {
    const table = document.getElementById("patient-table");
    table.innerHTML = "";
    patients.forEach(p => {
      table.innerHTML += `
        <tr>
          <td class="px-6 py-4">${p.patientId}</td>
          <td class="px-6 py-4">${p.firstName} ${p.lastName}</td>
          <td class="px-6 py-4">${p.email}</td>
          <td class="px-6 py-4">${p.mobile}</td>
          <td class="px-6 py-4">${p.isActive ? 'Active' : 'Inactive'}</td>
        </tr>`;
    });
  }

  function renderDoctorTable(doctors) {
    const table = document.getElementById("doctor-table");
    table.innerHTML = "";
    doctors.forEach(d => {
      table.innerHTML += `
        <tr>
          <td class="px-6 py-4">${d.doctorId}</td>
          <td class="px-6 py-4">${d.firstName} ${d.lastName}</td>
          <td class="px-6 py-4">${d.email}</td>
          <td class="px-6 py-4">${d.mobile}</td>
          <td class="px-6 py-4">${d.specialization}</td>
          <td class="px-6 py-4">${d.approved ? 'Yes' : 'No'}</td>
        </tr>`;
    });
  }
  function renderPagination(type, totalPages, currentPage) {
const container = document.getElementById(`${type}-pagination`);
container.innerHTML = "";

// Previous Button
container.innerHTML += `
  <button 
    onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${Math.max(currentPage - 1, 1)})" 
    class="px-3 py-1 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}"
    ${currentPage === 1 ? 'disabled' : ''}>
    Prev
  </button>
`;

// Page numbers
for (let i = 1; i <= totalPages; i++) {
  container.innerHTML += `
    <button
      onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${i})"
      class="px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}">
      ${i}
    </button>`;
}

// Next Button
container.innerHTML += `
  <button 
    onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${Math.min(currentPage + 1, totalPages)})" 
    class="px-3 py-1 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}"
    ${currentPage === totalPages ? 'disabled' : ''}>
    Next
  </button>
`;
}
function renderPagination(type, totalPages, currentPage) {
const container = document.getElementById(`${type}-pagination`);
container.innerHTML = "";

// Previous Button
container.innerHTML += `
  <button 
    onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${Math.max(currentPage - 1, 1)})" 
    class="px-3 py-1 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}"
    ${currentPage === 1 ? 'disabled' : ''}>
    Prev
  </button>
`;

// Page numbers
for (let i = 1; i <= totalPages; i++) {
  container.innerHTML += `
    <button
      onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${i})"
      class="px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}">
      ${i}
    </button>`;
}

// Next Button
container.innerHTML += `
  <button 
    onclick="fetch${type.charAt(0).toUpperCase() + type.slice(1)}s(${Math.min(currentPage + 1, totalPages)})" 
    class="px-3 py-1 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}"
    ${currentPage === totalPages ? 'disabled' : ''}>
    Next
  </button>
`;
}

  window.onload = () => {
    fetchPatients(1);
    fetchDoctors(1);
  };