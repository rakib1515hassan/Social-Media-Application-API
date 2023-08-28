import domain from '../../domain.js';

$(document).ready(function() {
    $("#password-set").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        const email = localStorage.getItem('email')
        const r_otp = localStorage.getItem('r_otp')
        const token = localStorage.getItem('token')

        var formData = {
            password: $("#password").val(),
            password2: $("#c_password").val(),
            otp: r_otp,
        };

        // Check if password and confirm password match
        if (formData.password !== formData.password2) {
            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">Password and Confirm Password Don not Match</div>';

            // 20 সেকেন্ড পর automatically message টি চলে যাবে।
            setTimeout(function() {
                document.getElementById('alart_msg').innerHTML = '';
            }, 5000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
            return; 
        }

        // console.log("formData =", formData)

        // Clear any previous error messages
        document.getElementById('alart_msg').innerHTML = "";

        // Send AJAX request
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/reset-password-set/", 
            data: JSON.stringify(formData), 

            headers: {
                'Content-Type': 'application/json',  
                'X-CSRFToken': csrfToken,
                'Authorization': 'Bearer ' + token,
            },
            success: function(response) {
                // console.log(response);
                const m = response.msg
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success';
                alertDiv.setAttribute('role', 'alert');
                alertDiv.textContent = m;

                document.getElementById('alart_msg').innerHTML = ''; // Clear the previous content
                document.getElementById('alart_msg').appendChild(alertDiv);

                // 5 মিনিট পর automatically message টি চলে যাবে।
                setTimeout(function() {
                    document.getElementById('alart_msg').innerHTML = ''; // টাইমার সেট আপ এর 5 সেকেন্ড পরে খালি করা হবে
                }, 5000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড

                // Delete email, otp and token from Local Storage
                localStorage.removeItem('token')
                localStorage.removeItem('email')
                localStorage.removeItem('r_otp')

                // Redirect to home.html
                window.location.href = domain + "/" + "auth/";

            },
            error: function(xhr) {
                // console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
        
                    if (responseJSON && responseJSON.non_field_errors) {
                        var errorMessage = responseJSON.non_field_errors[0];
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                    } 
                    else if (responseJSON.password){
                        var errorMessage = responseJSON.password[0];
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                    }
                    else {
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred.</div>';
                    }
                } catch (e) {
                    // console.error("Error parsing JSON response:", e);
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