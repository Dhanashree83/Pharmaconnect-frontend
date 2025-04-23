$(document).ready(function(){
    $('#loginForm').submit(function(e){
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8082/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                $('#message').text("Login successful!").css("color", "green");
                console.log("Token:", response.token);
                console.log("User ID:", response.userId);

                // Optionally store the token
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.userId);

                // Redirect or show something
                // window.location.href = "/dashboard.html";
            },
            error: function(xhr) {
                $('#message').text("Login failed: " + xhr.responseText).css("color", "red");
                console.error("Error:", xhr);
            }
        });
    });
});
