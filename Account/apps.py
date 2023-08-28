from django.apps import AppConfig


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Account'



"""


def Register_Email_Verify( request, uid, token ):

    try:
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)

        try:
            if PasswordResetTokenGenerator().check_token(user, token):
                user.email_varification = True
                user.save()
                messages.success(request, f"{user.first_name} {user.last_name}, your account is verified. Now you can login.")
                return render(request, 'Account/Login.html')
            else:
                messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
                return render(request, 'Account/Login.html')
            
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
            return render(request, 'Account/Login.html')
        
    except ObjectDoesNotExist:
        PasswordResetTokenGenerator().check_token(user, token)
        messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
    
    except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
            return render(request, 'Account/Login.html')

    return redirect('login')



"""