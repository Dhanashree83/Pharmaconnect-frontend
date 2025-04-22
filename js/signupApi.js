$(document).ready(function () {
    const signUpForm = $(".sign-up-form");
    const otpField = $(".otp-field");
    let registeredEmail = null;

    signUpForm.on("submit", function (e) {
        e.preventDefault();

        if (otpField.is(":visible")) {
            // Step 2: OTP Verification
            const otp = $("#otp").val().trim();
            if (!otp) return alert("Please enter the OTP.");

            $.ajax({
                url: `http://localhost:8082/api/patient/verify?email=${encodeURIComponent(registeredEmail)}&otp=${otp}`,
                method: "POST",
                success: function (res) {
                    if (res === "verfied") {
                        alert("✅ OTP verified successfully!");
                        window.location.href = "/pages/dashboard.html"; // Redirect after verification
                    } else if (res === "invalid otp") {
                        alert("❌ Invalid OTP. Please try again.");
                    } else if (res === "already verified") {
                        alert("ℹ️ Already verified. Please login.");
                        window.location.href = "/pages/login.html";
                    } else {
                        alert("⚠️ Unexpected response. Try again.");
                    }
                },
                error: function () {
                    alert("❌ Something went wrong during OTP verification.");
                }
            });

        } else {
            // Step 1: Registration
            const userData = {
                firstName: $("input[name='firstName']").val().trim(),
                lastName: $("input[name='lastName']").val().trim(),
                mobile: $("input[name='mobile']").val().trim(),
                email: $("input[name='email']").val().trim(),
                password: $("input[name='password']").val().trim()
            };

            if (!userData.firstName || !userData.lastName || !userData.mobile || !userData.email || !userData.password) {
                return alert("Please fill in all required fields.");
            }

            registeredEmail = userData.email;

            $.ajax({
                url: "http://localhost:8082/api/patient/register",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(userData),
                success: function (res) {
                    if (res === "created") {
                        alert("🎉 Registration successful! OTP sent to your email.");
                        otpField.show();
                    } else if (res === "already exists") {
                        alert("⚠️ Email already registered. Try logging in.");
                    } else {
                        alert("⚠️ Unexpected response from server.");
                    }
                },
                error: function () {
                    alert("❌ Registration failed. Please try again later.");
                }
            });
        }
    });
});
