from django.urls import path
from Account.Views import api
from Account.Views import views

urlpatterns = [

    ### NOTE Tamplate Render URL:-
    ## Login and Registration
    path("", views.Login.as_view(), name='login'),
    ## Register Email Verify
    path("verify/<uid>/<token>/", views.Register_Email_Verify, name='register-email-verify'),

    ## Forget password
    path("take-mail/", views.takeEmail_forgetPass.as_view(), name='takeEmail_f_password'),
    path("varify-otp/", views.varifyOTP_forgetPass.as_view(), name='varifyOTP_f_password'),
    path("password-set/", views.passwordSet_forgetPass.as_view(), name='passwordSet_forgetPass'),


    # path("change-password/", view.Change_Password.as_view(), name='change_password'),








    ### NOTE API Endpoints:-
    path('api/register/', api.UserRegistrationView.as_view(), name='UserRegistrationView'),
    path('api/login/', api.UserLoginView.as_view(), name='UserLoginView'),

    ## Change Password
    path('api/change-password/', api.UserChangePasswordView.as_view(), name='UserChangePasswordView'),

    ## Forget Password
    path('api/reset-password-email-send/', api.SendPasswordResetEmailView.as_view(), name='SendPasswordResetEmailView'),
    path('api/reset-password-otp-verify/', api.UserOTPverify.as_view(), name='UserOTPverify'),
    path('api/reset-password-set/', api.UserPasswordResetView.as_view(), name='UserPasswordResetSerializer'),

]

