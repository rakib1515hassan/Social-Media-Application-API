import domain from '../domain.js';


$(document).ready(function() {
    $("#login-form").submit(function(e) {
        e.preventDefault(); 

        if (document.getElementById('dj_message')) {
            document.getElementById('dj_message').innerHTML = '';
        }

        // Gather form data
        var formData = {
            email: $("#l_email").val(),
            password: $("#l_password").val(),

        };

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        console.log("Form Data = ", formData)
        console.log("CSRF = ", csrfToken)

        // Send AJAX request
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/login/", 
            data: JSON.stringify(formData), 

            headers: {
                'Content-Type': 'application/json',  
                'X-CSRFToken': csrfToken
            },
            success: function(response) {                
                localStorage.setItem('token', response.token.access)
                // console.log("Token is = ", response.token.access)

                // Redirect to Profile
                window.location.href = domain;
            },
            error: function(xhr) {
                console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
                    if (responseJSON.errors.non_field_errors) {
                        var errorMessage = responseJSON.errors.non_field_errors[0];
                        // console.log("Error is =", errorMessage)
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'+errorMessage+'</div>';

                    } else {
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred.</div>';
                    }
                } catch (e) {
                    console.error("Error parsing JSON response:", e);
                    document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred.</div>';
                }

                // 20 সেকেন্ড পর automatically message টি চলে যাবে।
                setTimeout(function() {
                    document.getElementById('alart_msg').innerHTML = '';
                }, 5000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
            }
            
        });


    });
});