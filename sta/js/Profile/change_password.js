import domain from '../domain.js';
// console.log(domain)

$(document).ready(function() {
    $("#changePassword-form").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior


        // Gather form data
        var formData = {
            // email: $('#email3').val(),
            old_password: $('#o_password').val(),
            password: $('#n_password').val(),
            password2: $('#n_c_password').val()
        };

        // console.log("Click")

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Check if password and confirm password match
        if (formData.n_password !== formData.n_c_password) {
            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">Password and Confirm Password Don not Match</div>';
            return; 

            // 20 সেকেন্ড পর alart message টি automatically চলে যাবে।
            setTimeout(function() {
                document.getElementById('alart_msg').innerHTML = '';
            }, 20000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
        }

        // Clear any previous error messages
        document.getElementById('alart_msg').innerHTML = "";

        // Check if token is present in localStorage
        var token = localStorage.getItem('token');
        // console.log("token = ", token)

        if (token) {

            // Send AJAX request
            $.ajax({
                type: "POST",
                url: domain + "/" + "auth/api/change-password/", 
                data: JSON.stringify(formData), 

                headers: {
                    'Content-Type': 'application/json',  
                    'X-CSRFToken': csrfToken,
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    // console.log(response);
                    document.getElementById('alart_msg').innerHTML = '<div class="alert alert-success" role="alert">Successfully Change Your Password.</div>';

                    // Clear input fields
                    $('#o_password').val('');
                    $('#n_password').val('');
                    $('#n_c_password').val('');

                    // 5 সেকেন্ড পর alart message টি automatically চলে যাবে।
                    setTimeout(function() {
                        document.getElementById('alart_msg').innerHTML = ''; 
                    }, 5000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড

                },
                error: function(xhr) {
                    console.error(xhr);
                    
                    try {
                        var responseJSON = JSON.parse(xhr.responseText);

                        if ( responseJSON && responseJSON.non_field_errors ) {
                            
                            var errorMessage = responseJSON.non_field_errors[0];
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                        } else {
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred.</div>';
                        }
                    } catch (e) {
                        console.error("Error parsing JSON response:", e);
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred.</div>';
                    }

                    // 20 সেকেন্ড পর alart message টি automatically চলে যাবে।
                    setTimeout(function() {
                        document.getElementById('alart_msg').innerHTML = '';
                    }, 20000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
                }
                
            });

        }

    });
});