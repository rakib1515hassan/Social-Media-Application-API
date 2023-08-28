from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
User = get_user_model()

from django.views import generic
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError

## UID Decode
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator ## এটি আমাদের Token auto generat করে দেয়।



class Login(generic.TemplateView):
    template_name = "Account/auth.html"
    



def Register_Email_Verify( request, uid, token ):

    user = None
    
    try:
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)

        try:
            if PasswordResetTokenGenerator().check_token(user, token):
                user.email_varification = True
                user.save()

                messages.success(request, f"{user.first_name} {user.last_name}, your account is verified. Now you can login.")
                return render(request, "Account/auth.html")
            else:
                messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
                return render(request, "Account/auth.html")
            
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            messages.error(request, f"{user.first_name} {user.last_name}, Your account could not be verified, Try again.")
            return render(request, "Account/auth.html")
        
    except ObjectDoesNotExist:
        PasswordResetTokenGenerator().check_token(user, token)
        messages.error(request, "Your account could not be verified, Try again.")
        return render(request, "Account/auth.html")
    
    except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            messages.error(request, "Your account could not be verified, Try again.")
            return render(request, "Account/auth.html")
    
    except ValueError:
        messages.error(request, "Your account could not be verified, Try again.")
        return render(request, "Account/auth.html")
    
    except User.DoesNotExist:
        messages.error(request, "Your account could not be verified, Try again.")
        return render(request, "Account/auth.html")
    
    except ValidationError as e:
        messages.error(request, "Your account could not be verified, Try again.")
        return render(request, "Account/auth.html")
    
    return render(request, "Account/auth.html")




class takeEmail_forgetPass(generic.TemplateView):
    template_name = "Account\Forget_Password\otp_send.html"



class varifyOTP_forgetPass(generic.TemplateView):
    template_name = "Account\Forget_Password\otp_verify.html"



class passwordSet_forgetPass(generic.TemplateView):
    template_name = "Account\Forget_Password\password_set.html"




# class Change_Password(generic.TemplateView):

#     template_name = "Profile/change_password.html"






