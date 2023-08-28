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
                // console.log("Social link =", response.user_social_link)

                localStorage.setItem('user_id', response.id)
                const fullName = response.first_name + " " + response.last_name;
             
                // It show on Home Page
                $('#fullname').text(fullName);
                $('#profession').text(response.profession);

                // Set Profile Image
                if (response.cover_pic != ''){
                    $('#cover_image').attr('src', response.cover_pic);
                }

                // Set Profile Image
                if (response.userprofile_pic != ''){
                    for (var key in response.userprofile_pic) {
                        if (response.userprofile_pic[key].is_profile_picture === true){
                            $('#profile_image').attr('src', response.userprofile_pic[key].image);
                            $('#nav_pic').attr('src', response.userprofile_pic[key].image);
                        }
                    }
                }

                // Set Social Link
                if(response.user_social_link != ''){
                    $('#websit').attr('href', (response.user_social_link.websit));
                    $('#linkedin').attr('href', (response.user_social_link.linkedIn));
                    $('#facebook').attr('href', (response.user_social_link.facebook));
                    $('#twitter').attr('href', (response.user_social_link.twitter));
                    $('#git').attr('href', (response.user_social_link.git));
                    $('#instagram').attr('href', (response.user_social_link.instagram));
                    $('#youtube').attr('href', (response.user_social_link.youtube));
                }
                
                // Show all Profile image
                // Get the <ul> element by its ID
                const ulElement = document.getElementById('all_prfile_image');

                // Loop through the userprofile_pic array and create <li> elements with <a> and <img> tags
                for (const pic of response.userprofile_pic) {
                    const liElement = document.createElement('li');
                    const aElement = document.createElement('a');
                    aElement.href = '#';  // Set your desired link here
                    const imgElement = document.createElement('img');
                    imgElement.src = pic.image;
                    imgElement.alt = '';
                    imgElement.width = '70';
                    imgElement.height = '70';
                
                    // Append <img> tag to <a> tag, and <a> tag to <li> tag
                    aElement.appendChild(imgElement);
                    liElement.appendChild(aElement);
                
                    // Append <li> tag to the <ul> element
                    ulElement.appendChild(liElement);
                }

            },
            error: function(xhr) {
                console.error(xhr);

            }
        });


    }
});