// <!-- Dropdown Toggle Script -->
const button = document.getElementById("dropdownButton");
const menu = document.getElementById("dropdownMenu");

button.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

window.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});


//charts of the page
const appointmentCtx = document.getElementById('appointmentsChart').getContext('2d');
new Chart(appointmentCtx, {
  type: 'line',
  data: {
    labels: ['Apr-25', 'Mar-25', 'Feb-25', 'Jan-25', 'Dec-24', 'Nov-24', 'Oct-24', 'Sep-24', 'Aug-24', 'Jul-24', 'Jun-24', 'May-24'],
    datasets: [{
      label: 'Appointments',
      data: [95, 30, 35, 20, 28, 27, 28, 30, 22, 27, 32, 31],
      borderColor: '#000',
      fill: false,
      tension: 0.4,
      pointBackgroundColor: '#007bff'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});

const doctorPatientCtx = document.getElementById('doctorPatientsChart').getContext('2d');
new Chart(doctorPatientCtx, {
  type: 'line',
  data: {
    labels: ['Apr', 'Mar', 'Feb', 'Jan', 'Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May'],
    datasets: [
      {
        label: 'Patients',
        data: [0, 0.8, 0, 2.0, 1.8, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#007bff',
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Doctors',
        data: [0, 0.2, 0, 0.2, 0.2, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#ffa940',
        fill: false,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true
  }
});


