$(document).ready(function () {

  $('#doctorRegistrationForm').on('submit', function (e) {
    e.preventDefault();

    const form = $(this);
    const data = {};

    // Serialize simple fields
    form.serializeArray().forEach(field => {
      data[field.name] = field.value;
    });

    // Dummy file IDs for now
    data.fileResourceIds = ["file123", "file456"];

    // Availability Slots
    data.availabilitySlots = [{
      startDate: form.find('input[name="startDate"]').val() || null,
      endDate: form.find('input[name="endDate"]').val() || null,
      availableDays: (form.find('input[name="availableDays"]').val() || "")
                      .split(',')
                      .map(d => d.trim().toUpperCase())
                      .filter(Boolean),
      startTime: form.find('input[name="startTime"]').val() || null,
      endTime: form.find('input[name="endTime"]').val() || null,
      holidays: (form.find('input[name="holidays"]').val() || "")
                    .split(',')
                    .map(h => h.trim())
                    .filter(Boolean)
    }];

    // Qualifications
    data.qualifications = [];
    $('.education-group').each(function () {
      const schoolName = $(this).find('input[name="schoolName"]').val();
      if (schoolName) { // Only if education is filled
        data.qualifications.push({
          schoolName,
          degree: $(this).find('input[name="degree"]').val(),
          passingYear: parseInt($(this).find('input[name="passingYear"]').val()) || null,
          location: $(this).find('input[name="qualificationLocation"]').val()
        });
      }
    });

    // Work Experience
    data.workExperience = [];
    $('.experience-group').each(function () {
      const organisationName = $(this).find('input[name="organisationName"]').val();
      if (organisationName) { // Only if experience is filled
        data.workExperience.push({
          organisationName,
          hospitalName: $(this).find('input[name="hospitalName"]').val(),
          position: $(this).find('input[name="position"]').val(),
          responsibilities: ($(this).find('input[name="responsibilities"]').val() || "")
                              .split(',')
                              .map(r => r.trim())
                              .filter(Boolean),
          yearsOfExperience: parseFloat($(this).find('input[name="yearOfExperience"]').val()) || 0
        });
      }
    });

    // Handle specific field conversions
    if (data.postalCode) data.postalCode = parseInt(data.postalCode) || null;
    if (data.mobile) data.mobile = parseInt(data.mobile) || null;
    if (data.consultationFee) data.consultationFee = data.consultationFee.toString();

    // Static fields
    data.isApproved = false;
    if (!data.adminId) data.adminId = 'admin123'; // fallback if empty

    console.log("Submitting Doctor Data:", data); // <--- See the final data you are sending

    // POST request to register doctor
    $.ajax({
      url: 'http://localhost:8082/api/doctor/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        if (response === 'created') {
          alert('Doctor registered successfully! Please enter OTP sent to your email.');
          $('#otpSection').show();
          $('#doctorRegistrationForm').hide();
          sessionStorage.setItem('doctorEmail', data.email);
        } else if (response === 'already exists') {
          alert('This email is already registered.');
        } else {
          alert('Unexpected response: ' + response);
        }
      },
      error: function (xhr) {
        console.error(xhr);
        alert('Registration failed: ' + xhr.responseText);
      }
    });
  });

  // OTP verification
  $('#verifyOtpBtn').on('click', function () {
    const email = sessionStorage.getItem('doctorEmail');
    const otp = $('#otpInput').val();

    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP.');
      return;
    }

    $.ajax({
      url: 'http://localhost:8082/api/doctor/verify',
      method: 'POST',
      data: { email: email, otp: otp }, // jQuery will encode it automatically
      success: function (response) {
        if (response === 'verified') {
          alert('OTP Verified! Your registration is complete.');
          window.location.href = "/pages/user-login.html";
        } else if (response === 'invalid otp') {
          alert('Invalid OTP. Please try again.');
        } else if (response === 'already verified') {
          alert('This account is already verified.');
        } else {
          alert('Unexpected response: ' + response);
        }
      },
      error: function (xhr) {
        alert('OTP verification failed: ' + xhr.responseText);
      }
  });
  
  });

});

// When switching to OTP verification
function showOtpSection() {
  $(".container").hide(); // Hides the registration form
  $("#otpSection").show(); // Shows the OTP section
}

// Example call: when form is submitted and OTP is sent successfully
$("#doctorRegistrationForm").on('submit', function(e) {
  e.preventDefault();
  
  // After sending the OTP (via your API) successfully:
  showOtpSection();
});
