import domain from '../domain.js';


$(document).ready(function() {

    var token = localStorage.getItem('token');

    if (token) {
        // Make a GET request to retrieve profile data
        $.ajax({
            type: "GET",
            url: domain + "/" + "profile/api/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                console.log("Profile data:", response);
                console.log("cover pic =", response.cover_pic)

                localStorage.setItem('user_id', response.id)
                const fullName = response.first_name + " " + response.last_name;
             
                // It show on Home Page
                $('#fullname').text(fullName);
                $('#profession').text(response.profession);
                

                // Set profile image
                if (response.userprofile_pic != ''){
                    for (var key in response.userprofile_pic) {
                        if (response.userprofile_pic[key].is_profile_picture === true){
                            $('#profile_image').attr('src', response.userprofile_pic[key].image);
                            $('#nav_pic').attr('src', response.userprofile_pic[key].image);
                        }
                    }
                }
                

            },
            error: function(xhr) {
                console.error(xhr);

            }
        });


    }
});