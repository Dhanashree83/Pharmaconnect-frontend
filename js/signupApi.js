$(document).ready(function () {
    const signUpForm = $(".sign-up-form");
    const signInForm = $(".sign-in-form");
    const otpField = $(".otp-field");
    let registeredEmail = null;

    // --- SIGN UP & OTP FLOW ---
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
                    if (res === "verified") {
                        alert("✅ OTP verified successfully!");
                        window.location.href = "/pages/user-login.html"; // Redirect after verification
                    } else if (res === "invalid otp") {
                        alert("❌ Invalid OTP. Please try again.");
                    } else if (res === "already verified") {
                        alert("ℹ️ Already verified. Please login.");
                        window.location.href = "/pages/user-login.html"; // Redirect for already verified
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

    // --- SIGN IN / LOGIN FLOW ---
    signInForm.on("submit", function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        if (!email || !password) {
            return alert("Please enter both email and password.");
        }

        const loginData = {
            email: email,
            password: password
        };

        $.ajax({
            url: "http://localhost:8082/auth/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function (res) {
                if (res && res.userId && res.token && res.role) {
                    // Store userId, token, and role in localStorage
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("role", res.role);

                    alert("✅ Login successful!");

                    // Role-based redirect
                    const roleRedirectMap = {
                        ADMIN: "/dashboard/adminDashboard/admin-main.html",
                        PATIENT: "/dashboard/userDashboard/user-main.html",
                        DOCTOR: "/dashboard/doctorDashboard/doctor-main.html"
                    };

                    const redirectUrl = roleRedirectMap[res.role];

                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        alert("❌ Unknown role. Cannot redirect.");
                    }
                } else {
                    alert("❌ Login failed. Please check your credentials.");
                }
            },
            error: function () {
                alert("❌ Login request failed. Please try again later.");
            }
        });
    });
});
