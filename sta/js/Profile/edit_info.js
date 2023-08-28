// const domain = require('../domain.js');

import domain from '../domain.js';

$(document).ready(function() {

    $('#profile-info-update').on('submit', function(event) {
        event.preventDefault();
        
        var token = localStorage.getItem('token');
        var user_id = localStorage.getItem('user_id');
        var profile_id = localStorage.getItem('profile_id');


        // Build the updated data object
        var updatedData = {
            user: {
                id: parseInt(user_id), 
                // username: $('#username').val(),  //যেহেতু username and email chanage করার Option disable করা আছে।
                // email: $('#email2').val(),
                first_name: $('#f_name').val(),
                last_name: $('#l_name').val(),
                
            },
            id: parseInt(profile_id), 
            phone: $('#phone').val(),
            birth_date: $('#d_o_birth').val(),
        };

        if (token) {
            $.ajax({
                type: "PATCH",
                url: domain + "/auth/api/profile/"+ profile_id + "/",
                data: JSON.stringify(updatedData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    // console.log(response.msg)
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

                    
                }
            });
        }
        
    });
});