import domain from '../domain.js';

$(document).ready(function() {
    // Function to handle logout
    function logout() {
        // Delete token from localStorage
        localStorage.removeItem('token');
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('profile_id');

        // Redirect to the logout page
        window.location.href = domain + "/" + "auth/";
    }

    // Add click event listener to Logout link
    $('#logout_link').click(function(e) {
        e.preventDefault(); // Prevent default link behavior
        logout(); // Call the logout function
    });
});
