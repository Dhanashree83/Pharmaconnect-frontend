// Fetch admin details based on userId after login
$(document).ready(function () {
    const userId = localStorage.getItem("userId"); // Get the userId from localStorage
    const role = localStorage.getItem("role"); // Get the role from localStorage

    if (role === "ADMIN" && userId) {
        // Fetch admin details using the API
        $.ajax({
            url: `${BASE_URL}/admin/info/${userId}`, // API to fetch admin details
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Pass token in header for authentication
            },
            success: function (res) {
                if (res) {
                    // Set admin name in profile dropdown
                    $("#dropdownButton span").text(`${res.firstName} ${res.lastName}`);

                    // Set other details (example: total patients and appointments)
                    $(".total-patients").text(res.totalPatients); 
                    $(".total-appointments").text(res.totalAppointments); 
                } else {
                    // alert("❌ Failed to fetch admin details.");
                }
            },
            error: function () {
                // alert("❌ Error while fetching admin details.");
            }
        });
    } else {
        // Redirect if not admin
        window.location.href = "/pages/user-login.js"; // Or wherever you want to redirect
    }
});
