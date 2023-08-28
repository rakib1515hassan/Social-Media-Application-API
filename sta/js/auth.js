import domain from './domain.js';


// -------------------------------------------( Registration )--------------------------------------------
$(document).ready(function() {
    $("#register-form").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        var info_formData = {
            phone: $("#r_phone").val(),
            birth_date: $("#r_d_o_birth").val(),
        }

        // Gather form data
        var formData = {
            first_name: $("#r_f_name").val(),
            last_name: $("#r_l_name").val(),
            // username: $("#r_username").val(),
            email: $("#r_email").val(),
            password: $("#r_password").val(),
            password2: $("#r_confirm-password").val(),

            user_info:info_formData,
        };

        // console.log("Form Data = ", formData)

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Check if password and confirm password match
        if (formData.password !== formData.password2) {
            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">Password and Confirm Password Don not Match</div>';
            return; 
        }

        // Clear any previous error messages
        document.getElementById('alart_msg').innerHTML = "";


        // Send AJAX request
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/register/", 
            data: JSON.stringify(formData), 

            headers: {
                'Content-Type': 'application/json',  
                'X-CSRFToken': csrfToken
            },
            success: function(response) {
                // console.log(response);
                document.getElementById('alart_msg').innerHTML = '<div class="alert alert-success" role="alert">Successfully Register.</div>';

                // 5 সেকেন্ড পর automatically message টি চলে যাবে।
                setTimeout(function() {
                    document.getElementById('alart_msg').innerHTML = ''; 
                }, 5000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড

                // Clear input fields
                $('#r_f_name').val('');
                $('#r_l_name').val('');
                $('#r_email').val('');
                $('#r_phone').val('');
                $('#r_d_o_birth').val('');
                $('#r_password').val('');
                $('#r_confirm-password').val('');
            },
            error: function(xhr) {
                console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
        
                    if (responseJSON.username){
                        var errorMessage = responseJSON.username[0];
                        // console.log("Username error = ",responseJSON.username[0])
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                    }
                    else if (responseJSON.email[0] == "This field must be unique."){
                        var errorMessage = "This email already registered.";
                        document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
                    }
                    else if (responseJSON && responseJSON.errors && responseJSON.errors.non_field_errors) {
                        var errorMessage = responseJSON.errors.non_field_errors[0];
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
                }, 20000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
            }
            
        });


        // Send axios request
        // axios.post('http://127.0.0.1:8000/api/person/', formData, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': csrfToken,
        //     }
        // })
        // .then(function(response) {
        //     // console.log(response);
        //     document.getElementById('alart_msg').innerHTML = '<div class="alert alert-success" role="alert">Successfully Register.</div>';

        //     // Clear input fields
        //     $('#r_f_name').val('');
        //     $('#r_l_name').val('');
        //     $('#r_username').val('');
        //     $('#r_email').val('');
        //     $('#r_password').val('');
        //     $('#r_confirm-password').val('');
        // })
        // .catch(function(error) {
        //     // console.error(error);
        //     var errorMessage = "An error occurred.";
                
        //     try {
        //         var responseJSON = JSON.parse(error.responseText);
        //         if (responseJSON && responseJSON.password) {
        //             errorMessage = responseJSON.password[0]; // Get the error message
        //         }
        //     } catch (e) {
        //         console.error("Error parsing JSON response:", e);
        //     }

        //     document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';
        // });

    });
});


// -------------------------------------------( Login )-------------------------------------------- 


$(document).ready(function() {
    $("#login-form").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Gather form data
        var formData = {
            email: $("#l_email").val(),
            password: $("#l_password").val(),

        };

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // console.log("Data = ", formData)

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
                // Redirect to home.html
                window.location.href = domain + "/" + "auth/home/";
            },
            error: function(xhr) {
                // console.error(xhr);
                
                try {
                    var responseJSON = JSON.parse(xhr.responseText);
                    // console.log("------------")
                    // let abc = responseJSON.errors;
                    // let x = abc.non_field_errors;
                    // console.log(x[0])
                    // console.log("------------")
                    if (responseJSON && responseJSON.errors && responseJSON.errors.non_field_errors) {
                        var errorMessage = responseJSON.errors.non_field_errors[0];
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
