entTo = "";
let formDataBackup = {};

$('.nextBtn').on('click', function (e) {
    e.preventDefault();

    const email = $('input[type="email"]').first().val();

    if (!email) {
        alert("Please enter an email.");
        return;
    }

    // Gather all form data
    const formData = {
        fullName: $('input[placeholder="Enter your Name"]').val(),
        address: $('textarea').eq(0).val(),
        dob: $('input[placeholder=" Enter your DOB"]').val(),
        nationality: $('input[placeholder="Nationality"]').val(),
        street: $('textarea').eq(1).val(),
        city: $('input[placeholder="Refrence"]').val(),
        postalCode: $('input[placeholder="Area of intrest"]').val(),
        state: $('input[placeholder="Hobbies"]').val(),
        email: email,
        phone: $('input[placeholder="Enter your Number"]').val(),
        consultationFees: $('input[placeholder="Enter Fees"]').val(),
        availableHours: $('input[placeholder="Enter here"]').eq(0).val(),

        college: $('input[placeholder="Enter your College"]').val(),
        degree: $('input[placeholder="Enter Degree"]').val(),
        certificates: $('input[placeholder="Enter here"]').eq(1).val(),
        passingYear: $('input[placeholder="Year of Passing"]').val(),
        educationLocation: $('input[placeholder=" "]').eq(0).val(),

        previousWorkplace: $('input[placeholder=" enter here "]').val(),
        hospitalName: $('input[placeholder=" Enter here"]').eq(1).val(),
        position: $('input[placeholder=" Enter your Poistion"]').val(),
        experience: $('input[placeholder=" Enter here "]').eq(1).val(),
        duration: $('input[placeholder=" "]').eq(1).val(),
        responsibility: $('input[placeholder=" "]').eq(2).val()
    };

    formDataBackup = formData;
    emailSentTo = email;

    // Step 1: Send OTP
    $.ajax({
        url: 'http://localhost:8082/api/doctor/send-otp',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email }),
        success: function () {
            alert('OTP sent to your email. Please verify to complete registration.');
            $('#otp-section').show();
        },
        error: function () {
            alert('Failed to send OTP.');
        }
    });
});

// Step 2: Verify OTP and register
$('#verifyOtpBtn').on('click', function () {
    const otp = $('#otp').val();

    if (!otp) {
        alert("Enter the OTP to verify.");
        return;
    }

    $.ajax({
        url: 'http://localhost:8082/api/doctor/verify-otp',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: emailSentTo, otp }),
        success: function () {
            // Step 3: Final Registration
            $.ajax({
                url: '/register-doctor',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formDataBackup),
                success: function () {
                    alert('Doctor registered successfully!');
                    location.reload(); // or redirect
                },
                error: function () {
                    alert('Error during registration.');
                }
            });
        },
        error: function () {
            alert("Invalid OTP. Please try again.");
        }
    });
});

