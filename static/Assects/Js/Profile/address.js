import domain from '../domain.js';

// Define the variables in a broader scope
const AddressTypeDropdown = document.getElementById('address_type');
const divisionDropdown = document.getElementById('division');
const subDivisionDropdown = document.getElementById('subDivision');

// Devision Subdivision and Address Type GET -------------------------------------------------
$(document).ready(function() {
    // const AddressTypeDropdown = document.getElementById('address_type');
    // const divisionDropdown    = document.getElementById('division');
    // const subDivisionDropdown = document.getElementById('subDivision');

    // Address Type is showing here
    $.ajax({
        type: 'GET',
        url: domain + '/' + 'profile/api/address-type/',
        dataType: 'json',
        success: function(data) {
            // console.log("Address Type = ", data)
            // Clear existing options
            AddressTypeDropdown.innerHTML = '<option value="" disabled selected>Select Address Type</option>';

            data.forEach(a_type => {
                const option       = document.createElement('option');
                option.value       = a_type.id;
                option.textContent = a_type.a_type;
                AddressTypeDropdown.appendChild(option);
            });

        },
        error: function(error) {
            console.log('Error fetching Address Type data:', error);
        }
    });



    // Populate the Division dropdown on page load
    $.ajax({
        type: 'GET',
        url: domain + '/' + 'profile/api/divition/',
        dataType: 'json',
        success: function(data) {
            divisionDropdown.innerHTML = '<option value="" disabled selected>Select a Division</option>';

            data.forEach(division => {
                const option       = document.createElement('option');
                option.value       = division.id;
                option.textContent = division.name;
                divisionDropdown.appendChild(option);
            });
        },
        error: function(error) {
            // console.log('Error fetching division data:', error);
        }
    });

    // Add event listener to Division dropdown
    divisionDropdown.addEventListener('change', function() {
        const selectedDivisionId = this.value;
        subDivisionDropdown.innerHTML = '<option value="" disabled selected>Select a District</option>';

        if (selectedDivisionId) {
            // Fetch sub-division data based on the selected division
            $.ajax({
                type: 'GET',
                url: domain + '/' + 'profile/api/subdivition/' + selectedDivisionId + '/',
                dataType: 'json',
                success: function(data) {
                    data.forEach(subDivision => {
                        const option       = document.createElement('option');
                        option.value       = subDivision.id;
                        option.textContent = subDivision.name;
                        subDivisionDropdown.appendChild(option);
                    });
                },
                error: function(error) {
                    // console.log('Error fetching sub-division data:', error);
                }
            });
        }
    });
});


// Address Add ------------------ -------------------------------------------------

$(document).ready(function() {
    $('#address-form').on('submit', function(event) {
        event.preventDefault();
        // console.log("Address form is submited")

        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');

        var addressData = {
            user: user_id,
            address_type:  $('#address_type').val(),    
            // division:      $('#division').val(),       
            sub_division:  $('#subDivision').val(),    
            zip_code:      $('#zipcode').val(),        
            cityANDstreet: $('#area').val()     
        };

        // console.log("Data = ", addressData)

        if (token) {
            $.ajax({
                type: "POST",
                url: domain + "/" + "profile/api/address-create/",
                data: JSON.stringify(addressData),
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    console.log(response)
                    // Display a success message (you can modify this according to your UI structure)
                    alert("Address added successfully");

                    // Reload the window after a brief delay
                    setTimeout(function() {
                        window.location.reload();
                    }, 500); // Reload after 1 second (adjust the delay as needed)
                },
                error: function(xhr) {
                    // console.error(xhr);
                    const err = JSON.parse(xhr.responseText);
                    if (err.address_type){
                        var errorMessage = err.address_type[0];
                        // console.log("Address error = ", errorMessage)

                        document.getElementById('address_alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                        +"This Address Type already exist."
                        +'</div>';
                    }

                }
            });
        }
    })
});




// To Delete Address------------------ -------------------------------------------------

// Inside the click event listener for delete buttons
$(document).on('click', '.delete-button', function() {
    const id = $(this).data('id');
    // console.log("Delete button is clicked = ", id)
    var token = localStorage.getItem('token');
    if (token){
        if (confirm("Are you sure you want to delete this entry?")) {
            $.ajax({
                type: 'DELETE',
                url: domain + '/' +`profile/api/address/${id}/`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(response) {
                    // Remove the corresponding row from the table
                    $(`[data-id="${id}"]`).closest('tr').remove();
                    console.log('Entry deleted:', response);
                },
                error: function(xhr) {
                    console.error('Error deleting entry:', xhr);
                }
            });
        }
    } 
});



// To Edit Address------------------ -------------------------------------------------

$(document).on('click', '.edit-button', function() {
    const id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        // url: `http://127.0.0.1:8000/profile/api/address/${id}/`,
        url: domain + '/' +`profile/api/address/${id}/`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            // Populate the form fields with the fetched data
            $('#address_type').val(data.address_type.id);
            $('#division').val(data.sub_division.division.id);

            // Fetch sub-division data based on the selected division
            $.ajax({
                type: 'GET',
                url: domain + '/' + 'profile/api/subdivition/' + data.sub_division.division.id + '/',
                dataType: 'json',
                success: function(subDivisionData) {
                    // console.log("Subdivision = ", subDivisionData)
                    // Clear existing options and populate the district dropdown
                    subDivisionDropdown.innerHTML = '<option value="" disabled selected>Select a District</option>';
                    subDivisionData.forEach(subDivision => {
                        const option       = document.createElement('option');
                        option.value       = subDivision.id;
                        option.textContent = subDivision.name;
                        subDivisionDropdown.appendChild(option);
                    });

                    // Select the district option based on the matching sub_division value
                    const subDivisionValue = data.sub_division.id;
                    $('#subDivision').val(subDivisionValue);
                },
                error: function(error) {
                    // Handle error if needed
                }
            });

            $('#zipcode').val(data.zip_code);
            $('#area').val(data.cityANDstreet);

            // Change the submit button text to "Update"
            $('#address-update').text('Update Your Address');
            $('#submit-button').text('Update');

            // Change the address-form id and add a class to the update button
            $('#address-form').attr('id', 'update-form');
            $('#submit-button').addClass('update-button');
            $('#submit-button').data('id', id);


        },
        error: function(xhr) {
            console.error('Error fetching address details:', xhr);
        }
    });
});





$(document).on('click', '.update-button', function(event) {
    event.preventDefault();

    const address_id = $('#submit-button').data('id');
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    var addressData = {
        user: user_id,   
    };
    if ($('#address_type').val()) {
        addressData.address_type = $('#address_type').val();
    }
    if ($('#subDivision').val()) {
        addressData.sub_division = $('#subDivision').val();
    }
    if ($('#zipcode').val()) {
        addressData.zip_code = $('#zipcode').val();
    }
    if ($('#area').val()) {
        addressData.cityANDstreet = $('#area').val();
    }
    


    console.log("Data = ", addressData)

    if (token) {
        $.ajax({
            type: "PATCH",
            url: domain + "/" + "/profile/api/address-update/"+ address_id + "/",
            data: JSON.stringify(addressData),
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                console.log(response)
                // Display a success message (you can modify this according to your UI structure)
                alert("Address Update successfully");

                // Reload the window after a brief delay
                setTimeout(function() {
                    window.location.reload();
                }, 500); // Reload after 1 second (adjust the delay as needed)
            },
            error: function(xhr) {
                console.error(xhr);
                const err = JSON.parse(xhr.responseText);
                if (err.address_type){
                    var errorMessage = err.address_type[0];
                    // console.log("Address error = ", errorMessage)

                    document.getElementById('address_alart_msg').innerHTML = '<div class="alert alert-danger" role="alert">'
                    +"This Address Type already exist."
                    +'</div>';
                }

            }
        });
    }
});





// function waitForDistrictOptions(selectedDistrictId, callback) {
//     var maxAttempts = 10;
//     var currentAttempt = 0;

//     function checkOptions() {
//         if ($('#subDivision option[value="' + selectedDistrictId + '"]').length > 0 || currentAttempt >= maxAttempts) {
//             callback();
//         } else {
//             currentAttempt++;
//             setTimeout(checkOptions, 300);
//         }
//     }

//     checkOptions();
// }


