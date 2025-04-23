function viewDetails(doctor, date, diagnosis) {
    document.getElementById('modalDoctor').innerHTML = `<strong>Doctor:</strong> ${doctor}`;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalDiagnosis').textContent = diagnosis;
    document.getElementById('prescriptionModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('prescriptionModal').style.display = 'none';
  }

  document.getElementById('searchInput').addEventListener('input', function () {
    const value = this.value.toLowerCase();
    const rows = document.querySelectorAll('#prescriptionTable tbody tr');
    rows.forEach(row => {
      const doctor = row.children[0].textContent.toLowerCase();
      const diagnosis = row.children[2].textContent.toLowerCase();
      row.style.display = doctor.includes(value) || diagnosis.includes(value) ? '' : 'none';
    });
  });