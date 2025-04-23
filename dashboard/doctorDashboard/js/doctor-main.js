
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
 

// js of chart here 
const ctx = document.getElementById('appointmentChart').getContext('2d');

const appointmentChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Appointments',
      data: [12, 18, 24, 15, 20],
      backgroundColor: '#3b82f6',
      borderRadius: 10
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  }
});
