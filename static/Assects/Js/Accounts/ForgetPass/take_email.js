import domain from '../../domain.js';


$(document).ready(function() {
    $("#take_email").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        var formData = {"email": $("#email_address").val(),};

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // console.log("Data = ",formData)
        // console.log("CSRF = ",csrfToken)



        
        // Send AJAX request
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/reset-password-email-send/", 
            data: JSON.stringify(formData), 

            headers: {
                'Content-Type': 'application/json',  
                'X-CSRFToken': csrfToken
            },
            success: function(response) {
                // console.log(response.msg);

                // Save Email on Local Storage
                localStorage.setItem('email', $("#email_address").val())
        
                // Redirect to home.html
                window.location.href = domain + "/" + "auth/varify-otp/";

            },                    
            error: function(xhr) {
                // console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
        
                    if (responseJSON && responseJSON.non_field_errors) {
                        var errorMessage = responseJSON.non_field_errors[0];
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                    } else {
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