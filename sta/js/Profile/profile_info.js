import domain from '../domain.js';



// $(document).ready(function() {

//     $('#profile-image-set').on('submit', function(event) {
//         event.preventDefault();
        
//         var token = localStorage.getItem('token');
//         var user_id = localStorage.getItem('user_id');
//         var profile_id = localStorage.getItem('profile_id');
//         const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
//         // var img = $('#profile-pic-upload').val();

//         // Create a FormData object to hold the form data, including the file
//         var formData = new FormData();
//         formData.append('id', profile_id);
//         formData.append('img', $('#profile-pic-upload')[0].files[0]); 

//         // var formData = {
//         //     id: profile_id, 
//         //     profile_pic: $('#profile-pic-upload')[0].files[0],
//         // };

//         // console.log("Image = ",img)
//         console.log("Form Data = ",formData)
//         // console.log("CSRF = ",csrfToken)

//         // if (token) {
//         //     $.ajax({
//         //         type: "PATCH",
//         //         url: domain + "/auth/api/profile/"+ profile_id + "/",
//         //         data: JSON.stringify(formData),
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //             'Authorization': 'Bearer ' + token
//         //         },
//         //         success: function(response) {
//         //             // console.log(response.msg)
//         //             const m = response.msg
//         //             const alertDiv = document.createElement('div');
//         //             alertDiv.className = 'alert alert-success';
//         //             alertDiv.setAttribute('role', 'alert');
//         //             alertDiv.textContent = m;

//         //             document.getElementById('alart_msg').innerHTML = ''; // Clear the previous content
//         //             document.getElementById('alart_msg').appendChild(alertDiv);

//         //             // 5 সেকেন্ড পর alart message টি automatically চলে যাবে।
//         //             setTimeout(function() {
//         //                 document.getElementById('alart_msg').innerHTML = ''; 
//         //             }, 5000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড


//         //         },
//         //         error: function(xhr) {
//         //             console.error(xhr);

                    
//         //         }
//         //     });
//         // }
        
//     });
// });








$(document).ready(function() {
    $('#profile-image-set').on('submit', function(event) {
        event.preventDefault();

        var token = localStorage.getItem('token');
        var user_id = localStorage.getItem('user_id');
        var profile_id = localStorage.getItem('profile_id');

        // Create a FormData object to hold the form data, including the file
        var formData = new FormData();
        formData.append('id', profile_id);
        formData.append('profile_pic', $('#profile-pic-upload')[0].files[0]);

        // এই ভাবে console.log() করে FormData দেখা যায় না। Iterate করে দেখতে হয়।
        // console.log(formData)

        // Iterate over the FormData entries and print them
        // for (let [name, value] of formData.entries()) {
        //     console.log(name, value);
        // }


        // Example of sending formData using AJAX
        if (token) {
            $.ajax({
                type: "PATCH",
                url: domain + "/auth/api/profile/"+ profile_id + "/",
                // data: JSON.stringify(formData),

                data: formData, // Pass the formData directly
                processData: false, // Set this to false for sending FormData
                contentType: false, // Set this to false for sending FormData

                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

                success: function(response) {
                    // console.log(response)
                    // $('#profile_image').attr('src', response.profile_pic);
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

                    // Reload the page after a successful image update
                    location.reload();

                },
                error: function(xhr) {
                    console.error(xhr);

                    
                }
            });
        }



    });
});


















// $(document).ready(function() {
//     $('#profile-image-set').on('submit', function(event) {
//         event.preventDefault();

//         var token = localStorage.getItem('token');
//         var user_id = localStorage.getItem('user_id');
//         var profile_id = localStorage.getItem('profile_id');

//         var data = new FormData();
        
//         // Append the profile_id to the FormData
//         data.append('id', profile_id);
        
//         // Append the file input to the FormData using the correct name attribute
//         var profilePicInput = $('#profile-pic-upload')[0];
//         if (profilePicInput.files.length > 0) {
//             data.append('profileImage', profilePicInput.files[0]); // Use 'profileImage' as the key
//         }

//         console.log("Data = ", data);

//         // Now you can send the formData using AJAX or perform further processing
//         // ...
//     });
// });





