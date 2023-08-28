import domain from './domain.js';

if(localStorage.getItem('token')){

    const token = localStorage.getItem('token')

    const data = {
        "token":  token
    }

    // Send AJAX request
    $.ajax({
        type: "POST",
        url: domain + "/" + "api/token/verify/", 
        data: JSON.stringify(data), 

        headers: {
            'Content-Type': 'application/json',  
            // 'X-CSRFToken': csrfToken
        },
        success: function(response, status) {                
            // console.log("Token Status = ", status)
            
        },
        error: function(xhr, status, error) {
            // console.error(xhr);
            // console.log("Token Status = ", status)

            // responseText: "{\"detail\":\"Token is invalid or expired\",\"code\":\"token_not_valid\"}"
            if (status == 'error'){
                window.location.href = domain + "/" +"auth/"
                localStorage.removeItem('token')
            }
            
        }
    });

}
else{
    window.location.href = domain + "/" +"auth/"
}