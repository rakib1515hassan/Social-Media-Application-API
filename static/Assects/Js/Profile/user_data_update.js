import domain from '../domain.js';

$(document).ready(function() {

    $('#profile-info-update').on('submit', function(event) {
        event.preventDefault();
        
        var token = localStorage.getItem('token');
        const id = $('#user_id').val()

        var updatedData = {
            first_name: $('#p_firstname').val(),
            last_name: $('#p_lastname').val(),
            phone: $('#p_phone').val(),
            profession: $('#p_profetion').val(),
        };
        if ($('#u_gender').val()) {
            updatedData.gender = $('#u_gender').val();
        }
        if ($('#p_birth').val()) {
            updatedData.birth_date = $('#p_birth').val();
        }

        // var formData = new FormData();
        // formData.append('first_name', $('#p_firstname').val());
        // formData.append('last_name',  $('#p_lastname').val());
        // formData.append('phone',      $('#p_phone').val());
        // formData.append('profession', $('#p_profetion').val());
        // if ($('#u_gender').val()) {
        //     formData.append('gender', $('#u_gender').val());
        // }
        // if ($('#p_birth').val()) {
        //     formData.append('birth_date', $('#p_birth').val());
        // }

        // Iterate over the FormData entries and print them
        // for (let [name, value] of formData.entries()) {
        //     console.log(name, value);
        // }

        // console.log("User ID = ", id)

        if (token) {
            $.ajax({
                type: "PATCH",
                url: domain + "/" + "profile/api/users/"+ id + "/",
                data: JSON.stringify(updatedData),
                // data: formData,
                // processData: false, // Set this to false for sending FormData
                // contentType: false, // Set this to false for sending FormData
                headers: {
                    'Content-Type': 'application/json',  // Don't need for sending FormData
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    console.log(response)
                    const m = response.msg
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success';
                    alertDiv.setAttribute('role', 'alert');
                    alertDiv.textContent = m;

                    document.getElementById('alart_msg').innerHTML = ''; // Clear the previous content
                    document.getElementById('alart_msg').appendChild(alertDiv);

                    // 5 সেকেন্ড পর alart message টি automatically চলে যাবে।
                    setTimeout(function() {
                        document.getElementById('alart_msg').innerHTML = ''; 
                    }, 5000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড


                },
                error: function(xhr) {
                    console.error(xhr);
                    try {
                        var responseJSON = JSON.parse(xhr.responseText);
                        if (responseJSON.birth_date){
                            var errorMessage = responseJSON.birth_date
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                             + 'Date Of Birth :' + errorMessage + 
                             '</div>';
                        }
                        else if (responseJSON.first_name){
                            var errorMessage = responseJSON.first_name
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                             + 'First Name :' + errorMessage + 
                             '</div>';
                        }
                        else if (responseJSON.last_name){
                            var errorMessage = responseJSON.last_name
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                             + 'Last Name :' + errorMessage + 
                             '</div>';
                        }
                        else if (responseJSON.phone){
                            var errorMessage = responseJSON.phone
                            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                             + 'Phone Number :' + errorMessage + 
                             '</div>';
                        }
                        else if (responseJSON && responseJSON.non_field_errors) {
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
                    }, 20000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড

                    
                }
            });
        }
        
    });
});