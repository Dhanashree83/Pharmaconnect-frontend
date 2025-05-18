$(document).ready(function () {
  $('#appointmentForm').submit(function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const appointmentData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phoneNumber: $('#phoneNumber').val(),
      email: $('#email').val(),
      firstTimeVisit: $('input[name="firstTimeVisit"]:checked').val() === "true",
      appointmentDate: $('#appointmentDate').val(),
      doctorId: $('#doctor').val()
    };

    $.ajax({
      url: `${BASE_URL}/appointment/book`, // Uses BASE_URL from config.js
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(appointmentData),
      success: function (response) {
        // alert('✅ Appointment booked successfully!');
        console.log(response);
        // Optionally reset form
        $('#appointmentForm')[0].reset();
      },
      error: function (xhr, status, error) {
        // alert('❌ Error booking appointment: ' + xhr.responseText);
        console.error(error);
      }
    });
  });
});
