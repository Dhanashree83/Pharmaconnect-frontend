
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



//this is for dynamically getting id
document.addEventListener("DOMContentLoaded", async () => {
  const doctorId = localStorage.getItem("userId"); // e.g., DR06180EB0
  const nameSpan = document.getElementById("doctorName");

  if (!doctorId) {
    nameSpan.textContent = "Doctor";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/doctor/info/${doctorId}`);
    if (!response.ok) throw new Error("Failed to fetch doctor data");

    const data = await response.json();
    const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
    nameSpan.textContent = fullName || "Doctor";

  } catch (err) {
    console.error("Error fetching doctor info:", err);
    nameSpan.textContent = "Doctor";
  }
});

//link logout
document.getElementById('logoutLink').addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = '/index.html';
});

