$(document).ready(function () {

    // Handle Doctor Registration Submission
    $('#doctorRegistrationForm').on('submit', function (e) {
      e.preventDefault();
    
      const form = $(this);
      const data = {};
    
      // Serialize form fields
      form.serializeArray().forEach(field => {
        data[field.name] = field.value;
      });
    
      // Add dummy fileResourceIds (This can be handled based on actual file upload logic)
      data.fileResourceIds = ["file123", "file456"];
    
      // Add Availability Slots
      data.availabilitySlots = [{
        startDate: form.find('input[name="startDate"]').val(),
        endDate: form.find('input[name="endDate"]').val(),
        availableDays: form.find('input[name="availableDays"]').val().split(',').map(d => d.trim().toUpperCase()),
        startTime: form.find('input[name="startTime"]').val(),
        endTime: form.find('input[name="endTime"]').val(),
        holidays: form.find('input[name="holidays"]').val().split(',').map(d => d.trim())
      }];
    
      // Add Qualifications
      data.qualifications = [];
      $('.education-group').each(function () {
        const q = {
          schoolName: $(this).find('input[name="schoolName"]').val(),
          degree: $(this).find('input[name="degree"]').val(),
          passingYear: parseInt($(this).find('input[name="passingYear"]').val()),
          location: $(this).find('input[name="qualificationLocation"]').val()
        };
        data.qualifications.push(q);
      });
    
      // Add Work Experience
      data.workExperience = [];
      $('.experience-group').each(function () {
        const w = {
          organisationName: $(this).find('input[name="organisationName"]').val(),
          hospitalName: $(this).find('input[name="hospitalName"]').val(),
          position: $(this).find('input[name="position"]').val(),
          responsibilities: $(this).find('input[name="responsibilities"]').val().split(','),
          yearsOfExperience: parseFloat($(this).find('input[name="yearOfExperience"]').val())
        };
        data.workExperience.push(w);
      });
    
      // Static values based on the provided model
      data.isApproved = false; // Assuming this is false initially
      data.adminId = 'admin123'; // Example admin ID, change as needed
    
      // Ensure correct data types for fields like postalCode and mobile
      data.postalCode = parseInt(data.postalCode);
      data.mobile = parseInt(data.mobile);
      data.consultationFee = data.consultationFee.toString();
    
      // Make API Call to Register Doctor
      $.ajax({
        url: 'http://localhost:8082/api/doctor/register',
        method: 'POST',
        contentType: 'application/json',  // Sending data as JSON
        data: JSON.stringify(data),  // Convert data object to JSON string
        success: function (response) {
          if (response === 'created') {
            alert('Doctor registered successfully! Please enter the OTP sent to your email.');
            $('#otpSection').show();
            $('#doctorRegistrationForm').hide(); // Hide registration form
            sessionStorage.setItem('doctorEmail', data.email); // Save email for OTP verification
          } else if (response === 'already exists') {
            alert('This email is already registered.');
          } else {
            alert('Unexpected response: ' + response);
          }
        },
        error: function (xhr) {
          alert('Error: ' + xhr.responseText);
        }
      });
    });
    
    // Handle OTP Verification
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
        contentType: 'application/x-www-form-urlencoded',  // Using form data for OTP
        data: { email: email, otp: otp },
        success: function (response) {
          if (response === 'verified') {
            alert('OTP Verified! Your registration is complete.');
            window.location.href = '/login.html'; // Redirect to login or next step
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
  