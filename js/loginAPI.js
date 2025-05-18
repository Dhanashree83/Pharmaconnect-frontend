// loginApi.js
$(document).ready(function () {
    const signInForm = $(".sign-in-form");

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
            url: `${BASE_URL}/auth/login`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: function (res) {
                if (res && res.userId && res.token && res.role) {
                    localStorage.setItem("userId", res.userId);
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("role", res.role);

                    // alert("✅ Login successful!");

                    const roleRedirectMap = {
                        ADMIN: "/dashboard/adminDashboard/admin-main.html",
                        PATIENT: "/dashboard/userDashboard/user-main.html",
                        DOCTOR: "/dashboard/doctorDashboard/doctor-main.html"
                    };

                    const redirectUrl = roleRedirectMap[res.role];

                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        // alert("❌ Unknown role. Cannot redirect.");
                    }
                } else {
                    // alert("❌ Login failed. Please check your credentials.");
                }
            },
            error: function () {
                // alert("❌ Login request failed. Please try again later.");
            }
        });
    });
});
