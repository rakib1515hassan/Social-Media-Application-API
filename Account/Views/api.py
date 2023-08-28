domain = 'http://127.0.0.1:8000/'

from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework import generics

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, 
)

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


## NOTE Link verifiacation ( For UID )
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
## এটি আমাদের Token auto generat করে দেয়।
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.core.mail import send_mail
from django.conf import settings

## NOTE All Serializer
from Account.Serializers.RegistrationSerializer import ( UserRegistrationSerializer )
from Account.Serializers.LoginLogOutSerializer import ( UserLoginSerializer )
from Account.Serializers.ForgetPasswordSerializers import (
    SendPasswordResetEmailSerializer,
    UserOTPverifySerializer,
    UserPasswordResetSerializer
)
from Account.Serializers.ChangePasswordSerializers import ( UserChangePasswordSerializer )

# # NOTE ------------( Creating tokens manually )------------------------------------------

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# # NOTE ------------------( User Registration View )-------------------------------------
# # URL = ( http://127.0.0.1:8000/auth/api/register/ )
class UserRegistrationView(APIView):
    def post(self, request, format=None):

        user_serializer = UserRegistrationSerializer( data = request.data )

        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            return Response({'Registration Successful. Please check your email, to verify your account.'}, status=status.HTTP_201_CREATED)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# # NOTE ------------------------( User Login View )----------------------------------------
# # URL = ( http://127.0.0.1:8000/auth/api/login/ )
class UserLoginView(APIView):

    def post(self, request, format=None):
        
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            if User.objects.filter( email = email ).first():

                user = authenticate( email = email , password = password ) 
                get_user = User.objects.filter( email = email ).first()
 
                if get_user.email_varification == True:       
                    if user is not None:
                        token = get_tokens_for_user(user)   ## Token Genaret
                        return Response({'token': token,'msg':'Login Success'}, status=status.HTTP_200_OK)
                    
                    else:
                        return Response({'errors':{'non_field_errors':['Your password is incorrect.']}}, status=status.HTTP_404_NOT_FOUND)
                else:
                    uid = urlsafe_base64_encode(force_bytes(user.id)) 
                    token = PasswordResetTokenGenerator().make_token(user) # Verification link time set in setting.py 15 min
                    link = domain + 'auth/verify/'+ uid +'/'+token+ '/'
                    body = f"Hello {user.first_name}{user.last_name}, your email verification link is:- {link}"

                    send_mail(
                        "Verify Your Account",     # Subject
                        body,                      # Body
                        settings.EMAIL_HOST_USER,  # From
                        [user.email],              # To
                        fail_silently = False
                    )
                    return Response({'errors':{'non_field_errors':["Your account isn't verified. The verification link is sent to your email. Please check."]}}, status=status.HTTP_404_NOT_FOUND)
                
            else:
                return Response({'errors':{'non_field_errors':['The user is not registered.']}}, status=status.HTTP_404_NOT_FOUND)
                        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    




# # NOTE ------------------------( ChangePasswor View )----------------------------------
# # URL = ( http://127.0.0.1:8000/auth/api/change-password/ )
class UserChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # print("-----------------")
        # print(request.data)
        # print("-----------------")
        serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password is successfully changed.'}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# #______________________________________________________________________________________




# # NOTE -----------------( Passord Reset Email Send With OTP View )----------------

# NOTE OTP send in Email
# URL = ( http://127.0.0.1:8000/auth/api/reset-password-email-send/ )
class SendPasswordResetEmailView(APIView):

    def post(self, request, format=None):
        # print("----------------")
        # print("Reset Password = ", request.data)
        # print("----------------")
        serializer = SendPasswordResetEmailSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        return Response({'msg':'Password Reset OTP send on your Email. Please check it.'}, status=status.HTTP_200_OK)
    


# NOTE OTP Verify
# URL = ( http://127.0.0.1:8000/auth/api/reset-password-otp-verify/ )
class UserOTPverify(APIView):

    def post(self, request, format=None):
        serializer = UserOTPverifySerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        e = request.data['email']
        user = User.objects.filter(email = e).first()
         
        if user is not None:
            token = get_tokens_for_user(user)   ## Token Genaret
            return Response({'token': token,'msg':'Now set your password.', 'r_otp':request.data['user_otp'],}, status=status.HTTP_200_OK)
        else:
            return Response({'errors':{'non_field_errors':['User not found.']}}, status=status.HTTP_404_NOT_FOUND)
                                
    



# NOTE Password Set
# URL = ( http://127.0.0.1:8000/auth/api/reset-password-set/ )
class UserPasswordResetView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, format=None):    
        # print("-------------------")    
        # print("Data = ", request.data)    
        # print("-------------------")    
        serializer = UserPasswordResetSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
    
##______________________________________________________________________________________



