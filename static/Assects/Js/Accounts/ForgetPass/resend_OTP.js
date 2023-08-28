import domain from '../../domain.js';


const resendOTP = document.querySelector("#resend_OTP");


resendOTP.addEventListener("click", function () {
    const email = localStorage.getItem('email')
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var formData = {"email": email};

    // console.log("Resend OTP Email = ", email)
    

    // Send AJAX request
    $.ajax({
        type: "POST",
        url: domain + "/" + "auth/api/reset-password-email-send/", 
        data: JSON.stringify(formData), 

        headers: {
            'Content-Type': 'application/json',  
            'X-CSRFToken': csrfToken
        },      
        success: function(response) {
            document.getElementById('alart_msg').innerHTML = '<div class="alert alert-success" role="alert">Once again OTP has been sent on your email. Please check.</div>'; 
            
            // 5 মিনিট পর automatically message টি চলে যাবে।
            setTimeout(function() {
                document.getElementById('alart_msg').innerHTML = ''; // টাইমার সেট আপ এর 5 সেকেন্ড পরে খালি করা হবে
            }, 10000); // 5000 মিলিসেকেন্ড = 5 সেকেন্ড
        },              
        error: function(xhr) {
            // console.error(xhr);
            
            try {
                var responseJSON = JSON.parse(xhr.responseText);
    
                if (responseJSON && responseJSON.non_field_errors) {
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
            }, 5000); // 20000 মিলিসেকেন্ড = 20 সেকেন্ড
        }

    });




 });





//  function startCountdown(durationInSeconds) {
//     const timerElement = document.getElementById('timer');
//     let remainingTime = durationInSeconds;
//     let interval;

//     updateTimerDisplay();

//     function updateTimerDisplay() {
//         const minutes = Math.floor(remainingTime / 60);
//         const seconds = remainingTime % 60;
//         timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
//     }

//     function countdown() {
//         remainingTime--;

//         if (remainingTime <= 0) {
//             clearInterval(interval);
//             timerElement.textContent = '0:00';
//         } else {
//             updateTimerDisplay();
//         }
//     }

//     // পেজ লোড হওয়ার সাথে সাথে টাইমার চালু হবে
//     interval = setInterval(countdown, 1000);
// }

// // পেজের সাথে একবার লোড হলেই টাইমার চালু হবে
// document.addEventListener('DOMContentLoaded', function() {
//     // 3 মিনিট = 3 * 60 সেকেন্ড
//     const durationInSeconds = 3 * 60;
//     startCountdown(durationInSeconds);
// });
