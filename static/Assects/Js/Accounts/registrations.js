import domain from '../domain.js';


$(document).ready(function() {
    $("#register-form").submit(function(e) {
        e.preventDefault();


        // Gather form data
        var formData = {
            first_name: $("#r_f_name").val(),
            last_name: $("#r_l_name").val(),
            phone: $("#r_phone").val(),
            email: $("#r_email").val(),
            password: $("#r_password").val(),
            password2: $("#r_c_password").val(),

            birth_date: '',
            profession: '',
            gender: 'Male',

        };



        // // Create a new FormData object
        // var formData = new FormData();

        // // Append form fields to the FormData object
        // formData.append('first_name', $("#r_f_name").val());
        // formData.append('last_name', $("#r_l_name").val());
        // formData.append('phone', $("#r_phone").val());
        // formData.append('email', $("#r_email").val());
        // formData.append('password', $("#r_password").val());
        // formData.append('password2', $("#r_c_password").val());

        // if($("#r_birth").val()){
        //     formData.append('birth_date', $("#r_birth").val());
        // }
        // else{
        //     formData.append('birth_date', '');
        // }
        // if($("#r_profession").val()){
        //     formData.append('profession', $("#r_profession").val());
        // }
        // else{
        //     formData.append('profession', '');
        // }
        // if($("input[name='gender']:checked").val()){
        //     formData.append('gender', $("input[name='gender']:checked").val());
        // }
        // else{
        //     formData.append('gender', 'Male');
        // }



        // Append the image file to the FormData object
        // if($('#r_pic')[0].files[0]){
        //     formData.append('profile_pic', $('#r_pic')[0].files[0]);
        // }
        // else{
        //     formData.append('profile_pic', '');
        // }
        



        // Iterate over the FormData entries and print them
        // for (let [name, value] of formData.entries()) {
        //     console.log(name, " = ", value);
        // }



        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Check if password and confirm password match
        // if (formData.password !== formData.password2) {
        //     document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">Password and Confirm Password Don not Match</p>';

        //     setTimeout(function() {
        //         document.getElementById('alart_msg').innerHTML = '';
        //     }, 20000); 
            
        //     return; 
        // }

        console.log("Form Data = ", formData)

        // // ---------------------------------( Send AJAX request )------------------------------------
        
        $.ajax({
            type: "POST",
            url: domain + "/" + "auth/api/register/", 
      
            data: JSON.stringify(formData), 
            // data: formData,     // For Image => Pass the formData directly
            // processData: false, // For Image => Set this to false for sending FormData
            // contentType: false, // For Image => Set this to false for sending FormData

            headers: {
                'Content-Type': 'application/json',  // File/Image এর জন্যে এটি দেয়া যাবে না।
                'X-CSRFToken': csrfToken
            },

            success: function(response) {
                // console.log("Responce =",response)

                document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-success" role="alert">'+ response[0] +'</p>';

                setTimeout(function() {
                    document.getElementById('alart_msg_2').innerHTML = ''; 
                }, 50000); // 5 minit

                // Clear input fields
                $("#r_f_name").val(''),
                $("#r_l_name").val(''),
                $("#r_phone").val(''),
                $("#r_email").val(''),
                $("#r_password").val(''),
                $("#r_c_password").val('')

                // $("#r_pic").val(''),
                // $("#r_birth").val(''),
                // $("#r_profession").val(''),
                // $("input[name='gender']:checked").val('')
            },

            error: function(xhr, status, error) {
                console.error(xhr);

                // Handle error response
                if (xhr.status === 400) {
                    var errorResponse = JSON.parse(xhr.responseText);

                    if (errorResponse.email){
                        if(errorResponse.email[0] == "This field must be unique."){
                            document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">This email already registered.</p>';
                        }
                        else{
                            var e = errorResponse.email[0]
                            document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">' + e + '</p>';
                        }   
                    }

                    if (errorResponse.non_field_errors){
                        var errorMessage = errorResponse.non_field_errors[0];         
                        // Extract the message from the curly braces and quotes
                        errorMessage = errorMessage.replace(/^\{(.*)\}$/, '$1').replace(/^"(.*)"$/, '$1');
                        document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">' + errorMessage + '</p>';
                    }

                    if (errorResponse.password){
                        var errorMessage = errorResponse.password[0];
                        document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">' + errorMessage + '</p>';
                    }

                    if (errorResponse.phone){
                        var errorMessage = errorResponse.phone[0];
                        document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">Phone Number: ' + errorMessage + '</p>';

                    }
                                         
                }
                else{
                    document.getElementById('alart_msg_2').innerHTML = '<p class="alert alert-danger" role="alert">An Error Occurred.</p>';
                }

                setTimeout(function() {
                    document.getElementById('alart_msg_2').innerHTML = '';
                }, 20000);
            }
            
        });






        // // ----------------------------------------( Send axios request )--------------------------------

        // axios({
        //     method: 'POST',
        //     url: `${domain}/auth/api/register/`,
        //     data: formData,
        //     headers: {
        //         'X-CSRFToken': csrfToken
        //     },
        //     // Note: No need to set processData and contentType for FormData
        // })
        // .then(function (response) {
        //     console.log(response.data);
        //     document.getElementById('alart_msg').innerHTML = '<p class="alert alert-success" role="alert">Successfully Register.</p>';

        //     setTimeout(function() {
        //         document.getElementById('alart_msg').innerHTML = ''; 
        //     }, 5000);

        //     // Clear input fields
        //     $("#r_f_name").val('');
        //     $("#r_l_name").val('');
        //     $("#r_phone").val('');
        //     $("#r_email").val('');
        //     $("#r_password").val('');
        //     $("#r_c_password").val('');

        //     $("#r_pic").val('');
        //     $("#r_birth").val('');
        //     $("#r_profession").val('');
        //     $("input[name='gender']:checked").val('');
        // })
        // .catch(function (error) {
        //     // console.error(error)
        //     if (error.response && error.response.status === 400) {
        //         var errorResponse = error.response.data;

        //         if (errorResponse.email) {
        //             if (errorResponse.email[0] === "This field must be unique.") {
        //                 document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">This email already registered.</p>';
        //             } else {
        //                 var e = errorResponse.email[0];
        //                 document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">' + e + '</p>';
        //             }
        //         }

        //         if (errorResponse.non_field_errors) {
        //             var errorMessage = errorResponse.non_field_errors[0];
        //             errorMessage = errorMessage.replace(/^\{(.*)\}$/, '$1').replace(/^"(.*)"$/, '$1');
        //             document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">' + errorMessage + '</p>';
        //         }

        //         if (errorResponse.password) {
        //             var errorMessage = errorResponse.password[0];
        //             document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">' + errorMessage + '</p>';
        //         }
        //     } else {
        //         document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">An Error Occurred.</p>';
        //     }

        //     setTimeout(function() {
        //         document.getElementById('alart_msg').innerHTML = '';
        //     }, 20000);
        // });






        // //---------------------------------( Send Fetch API  request )------------------------------------

        // fetch(`${domain}/auth/api/register/`, {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'X-CSRFToken': csrfToken
        //     },
        //     // Note: No need to set 'Content-Type' header for FormData
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     // console.log(data);
        //     document.getElementById('alart_msg').innerHTML = '<p class="alert alert-success" role="alert">Successfully Register.</p>';
        
        //     setTimeout(function() {
        //         document.getElementById('alart_msg').innerHTML = ''; 
        //     }, 5000);
        
        //     // Clear input fields
        //     $("#r_f_name").val('');
        //     $("#r_l_name").val('');
        //     $("#r_phone").val('');
        //     $("#r_email").val('');
        //     $("#r_password").val('');
        //     $("#r_c_password").val('');
        
        //     $("#r_pic").val('');
        //     $("#r_birth").val('');
        //     $("#r_profession").val('');
        //     $("input[name='gender']:checked").val('');
        // })
        // .catch(error => {
        //     // console.error('There was a problem with the fetch operation:', error);
        //     document.getElementById('alart_msg').innerHTML = '<p class="alert alert-danger" role="alert">An Error Occurred.</p>';
        
        //     setTimeout(function() {
        //         document.getElementById('alart_msg').innerHTML = '';
        //     }, 20000);
        // });
        


    });
});