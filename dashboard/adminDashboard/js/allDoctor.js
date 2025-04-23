// Dummy doctor data (simulate from backend)
// Dummy doctor data
const doctors = [
  { name: "Dr. Alice Smith", profession: "Cardiologist" },
  { name: "Dr. Bob Johnson", profession: "Dermatologist" },
  { name: "Dr. Clara Wells", profession: "Neurologist" },
  { name: "Dr. Daniel Lee", profession: "Cardiologist" },
  { name: "Dr. Eva Thomas", profession: "Dermatologist" },
  { name: "Dr. Farhan Khan", profession: "Pediatrician" },
  { name: "Dr. Grace Moore", profession: "Neurologist" },
  { name: "Dr. Henry Black", profession: "Pediatrician" }
];

// Professions list with "All" option
const professions = ["All", ...new Set(doctors.map(doc => doc.profession))];

// DOM references
const professionList = document.getElementById("professionList");
const doctorCards = document.getElementById("doctorCards");
const selectedProfession = document.getElementById("selectedProfession");

// Populate vertical bar
professions.forEach(prof => {
  const li = document.createElement("li");
  li.textContent = prof;
  li.addEventListener("click", () => {
    setActiveProfession(prof);
  });
  professionList.appendChild(li);
});

// Set active profession
function setActiveProfession(profession) {
  selectedProfession.textContent = profession === "All" ? "All Doctors" : `Doctors: ${profession}`;

  // Set active class
  [...professionList.children].forEach(li => li.classList.remove("active"));
  [...professionList.children].find(li => li.textContent === profession).classList.add("active");

  // Filter doctors
  const filteredDoctors = profession === "All"
    ? doctors
    : doctors.filter(doc => doc.profession === profession);

  renderDoctors(filteredDoctors);
}

// Render doctors
function renderDoctors(doctorArray) {
  doctorCards.innerHTML = ""; // Clear previous
  doctorArray.forEach(doc => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${doc.name}</h3><p>${doc.profession}</p>`;
    doctorCards.appendChild(card);
  });
}

// Initial render
setActiveProfession("All");
