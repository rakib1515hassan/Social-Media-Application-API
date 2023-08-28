import domain from '../domain.js';


$(document).ready(function() {

    var token = localStorage.getItem('token');

    if (token) {
        // Make a GET request to retrieve profile data
        $.ajax({
            type: "GET",
            url: domain + "/" + "auth/api/profile/",
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                console.log("Profile data:", response);

                // localStorage.setItem('user_id', response.user.id)
                // localStorage.setItem('profile_id', response.id)

                // const fullName = response.user.first_name + " " + response.user.last_name;

                // // It show on home page
                // $('#full-name').text(fullName);
                
                // $('#full_name').text(fullName);
                // $('#email').text(response.user.email);

                // // Show it in Change Password
                // $('#email3').val(response.user.email);

                // // For Profile 
                // $('#f_name').val(response.user.first_name);
                // $('#l_name').val(response.user.last_name);
                // $('#email2').val(response.user.email);
                // $('#username').val(response.user.username);
                // $('#phone').val(response.phone);
                // $('#d_o_birth').val(response.birth_date);
                
                // // Set profile image
                // if (response.profile_pic) {
                //     $('#profile_image_alt').toggle();
                //     $('#profile_image').attr('src', response.profile_pic);
                //     // $('#profile_image').attr('alt', fullName);
                // } else {
                //     // Set default image
                //     $('#profile_image').toggle();
                // }


            },
            error: function(xhr) {
                console.error(xhr);

            }
        });


    }
});