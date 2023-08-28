import domain from '../domain.js';


$(document).ready(function() {
    $("#otp-varify").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const email = localStorage.getItem('email')

        var formData = {
            user_otp: $("#otp").val(),
            email: email,
        };

        // console.log("Data = ",formData)
        // console.log("Email = ",email)
        // console.log("CSRF = ",csrfToken)

        // Send AJAX request
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/reset-password-otp-verify/", 
            data: JSON.stringify(formData), 

            headers: {
                'Content-Type': 'application/json',  
                'X-CSRFToken': csrfToken
            },
            success: function(response) {
                // console.log(response);
                // const m = response.msg
                // const alertDiv = document.createElement('div');
                // alertDiv.className = 'alert alert-success';
                // alertDiv.setAttribute('role', 'alert');
                // alertDiv.textContent = m;

                // document.getElementById('alart_msg').innerHTML = ''; // Clear the previous content
                // document.getElementById('alart_msg').appendChild(alertDiv);

                // Save Email and OTP in Local Storage
                localStorage.setItem('token', response.token.access)
                localStorage.setItem('r_otp', response.r_otp)

                // Redirect to home.html
                window.location.href = domain + "/" + "auth/password-set/";

            },
            error: function(xhr) {
                console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
        
                    if (responseJSON && responseJSON.non_field_errors) {
                        var errorMessage = responseJSON.non_field_errors[0];
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
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