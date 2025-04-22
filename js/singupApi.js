// let userEmail = '';

// $(document).ready(function () {
//   let isOtpSent = false;

//   $('.sign-up-form').on('submit', function (e) {
//     e.preventDefault();

//     const firstName = $('input[placeholder="firstName"]').val();
//     const lastName = $('input[placeholder="lastName"]').val();
//     const email = $('input[placeholder="email"]').val();
//     const mobile = $('input[placeholder="mobile"]').val();
//     const password = $('input[placeholder="password"]').val();
//     const otp = $('#otp').val();

//     // Save email for OTP verification step
//     userEmail = email;

//     // Step 1: If OTP field is visible, verify OTP
//     if ($('.otp-field').is(':visible')) {
//       $.ajax({
//         url: `http://localhost:8082/api/patient/verify?email=dhanashreethakre83@gmail.com&=633980`,
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({ otp }),
//         success: function (res) {
//           alert('Signup successful!');
//           location.reload(); // redirect or reset
//         },
//         error: function (xhr) {
//           alert('OTP verification failed: ' + xhr.responseText);
//         }
//       });
//     } 
//     // Step 2: If not yet sent, send OTP
//     else {
//       $.ajax({
//         url: 'http://localhost:8082/api/patient/register',
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({
//           firstName,
//           lastName,
//           email,
//           mobile,
//           password
//         }),
//         success: function (response) {
//           alert('OTP sent to your email!');
//           $('.otp-field').show(); // Show OTP input field
//           $('.btn').text('Verify OTP'); // Change button text
//         },
//         error: function (xhr) {
//           alert('Error sending OTP: ' + xhr.responseText);
//         }
//       });
//     }
//   });
// });


$(document).ready(function () {
  $('.sign-up-form').on('submit', function (e) {
    e.preventDefault();

    const firstName = $('input[name="firstName"]').val();
    const lastName = $('input[name="lastName"]').val();
    const email = $('input[name="email"]').val();
    const mobile = $('input[name="mobile"]').val();
    const password = $('input[name="password"]').val();
    const otp = $('#otp').val();
    
    console.log("Sending data to backend:", {
      firstName,
      lastName,
      email,
      mobile,
      password
    });
    // Step 1: OTP field visible = verify OTP
    if ($('.otp-field').is(':visible')) {
      const storedEmail = localStorage.getItem('signupEmail');

      $.ajax({
        url: `http://localhost:8082/api/patient/verify?email=${storedEmail}&otp=${otp}`,
        type: 'POST',
        contentType: 'application/json',
        success: function (res) {
          alert('✅ OTP Verified! Signup successful!');
          localStorage.removeItem('signupEmail'); // Clean up
          location.reload();
        },
        error: function (xhr) {
          alert('❌ OTP verification failed: ' + xhr.responseText);
        }
      });
    } 
    // Step 2: Register user and send OTP
    else {
      $.ajax({
        url: 'http://localhost:8082/api/patient/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          password
        }),
        success: function (response) {
          alert('📧 OTP has been sent to your email!');
          localStorage.setItem('signupEmail', email); // Store email for OTP
          $('.otp-field').slideDown(); // Show OTP input
          $('.btn').text('Verify OTP');
        },
        error: function (xhr) {
          alert('❌ Error during registration: ' + xhr.responseText);
        }
      });
    }
  });
});
