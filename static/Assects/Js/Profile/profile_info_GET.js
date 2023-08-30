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
                // console.log("Profile data:", response);
                // console.log("Social link =", response.user_social_link)

                localStorage.setItem('user_id', response.id)
                const fullName = response.first_name + " " + response.last_name;
                // It show on Home Page
                $('#fullname').text(fullName);
                $('#profession').text(response.profession);

                // Set Cover Image
                if (response.cover_pic){
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

                // Show ALL Profile image
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

                // Set Social Link
                if(response.user_social_link){
                    $('#websit').attr('href', (response.user_social_link.websit));
                    $('#linkedin').attr('href', (response.user_social_link.linkedIn));
                    $('#facebook').attr('href', (response.user_social_link.facebook));
                    $('#twitter').attr('href', (response.user_social_link.twitter));
                    $('#git').attr('href', (response.user_social_link.git));
                    $('#instagram').attr('href', (response.user_social_link.instagram));
                    $('#youtube').attr('href', (response.user_social_link.youtube));
                }
                
                // Show Profile Info in About Page
                $('#user_id').val(response.id);
                $('#p_firstname').val(response.first_name);
                $('#p_lastname').val(response.last_name);
                $('#p_email').val(response.email);
                $('#p_phone').val(response.phone);
                $('#p_gender').text(response.gender);
                $('#p_birth').val(response.birth_date);
                $('#p_profetion').val(response.profession);



                // Address Show on Address Table
                const address = response.user_address
                // console.log("address = ", address)
                const tableBody = document.getElementById("address-table-body");
                
                if (tableBody){
                    address.forEach(entry => {
                        const newRow = document.createElement("tr");
        
                        newRow.innerHTML = `
                            <td>${entry.address_type.a_type}</td>
                            <td>${entry.sub_division.division.name}</td>
                            <td>${entry.sub_division.name}</td>
                            <td>${entry.zip_code}</td>
                            <td>${entry.cityANDstreet}</td>
                            <td><button type="button" class="btn warning-custom edit-button" data-id="${entry.id}">E</button></td>
                            <td><button class="btn danger-custom delete-button" data-id="${entry.id}">X</button></td>
                        `;
        
                        tableBody.appendChild(newRow);
                        });
                }
                

            },
            error: function(xhr) {
                console.error(xhr);

            }
        });


    }
});

// // Edite Address:
// $(document).ready(function() {

//     const editButtons = document.querySelectorAll('.edit-button');
//     const form = document.querySelector('.address-add');

//     editButtons.forEach(button => {
//         button.addEventListener('click', event => {
//             console.log("Address Edit button is clicked")
//             const id = event.target.getAttribute('data-id');
//             const rowData = data.find(entry => entry.id === id); // Assuming "data" is your array of address entries

//             // Populate the form with the data
//             document.getElementById('addressType').value = rowData.address_type.a_type;
//             document.getElementById('division').value = rowData.sub_division.division.name;
//             document.getElementById('subDivision').value = rowData.sub_division.name;
//             document.getElementById('zipcode').value = rowData.zip_code;
//             document.getElementById('area').value = rowData.cityANDstreet;

//             // Show the form
//             form.style.display = 'block';
//         });
//     });

// });


