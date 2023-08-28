domain = 'http://127.0.0.1:8000/'

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Q

from Account.models import User_OTP
from datetime import datetime, timedelta

# Sending Mail
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()

## NOTE -----------------------------( Reset Passwor Email Send Serialize )---------------------------------

# For OTP
import random

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email = email)

            # Django সেশনে email স্টোর করুন
            self.context['request'].session['email'] = email


            # NOTE If You send OTP on your email-------------------------------------
            otp = random.randint(100000, 999999)

            #Django সেশনে টাইমআউট সেট করাহয়েছে
            timeout_datetime = datetime.now() + timedelta( minutes = 3 )
            self.context['request'].session['timeout'] = timeout_datetime.timestamp()
       
            if User_OTP.objects.filter(user = user).exists(): # পুরাতন otp থাকলে তাকে এখনে delete করে দিবে
                User_OTP.objects.get(user = user).delete()

            otp_obj = User_OTP.objects.create(user = user, otp=otp)
            # print("--------------------")
            # print("Your OTP = ", otp)
            # print("Your Object = ", otp_obj)
            # print("--------------------")
            body = f"Hello {user.first_name}{user.last_name},\nYour OTP is {otp}\nThanks!"
            #-------------------------------------------------------------------------

            ## Send EMail-------------------------------------------------------------
            send_mail(
                "Reset Your Password",     # Subject
                body,                      # Body
                settings.EMAIL_HOST_USER,  # From
                [user.email],              # To
                fail_silently = False
            )
            #_________________________________________________________________________
            return attrs
        else:
            raise serializers.ValidationError('You are not a Registered User')
#_____________________________________________________________________________________________________


# NOTE -----------------------------( Reset Passwor OTP Verify )---------------------------------
class UserOTPverifySerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    user_otp = serializers.IntegerField()

    class Meta:
        fields = ['email', 'user_otp']

    def validate(self, attrs):
        email = attrs.get('email')
        user_otp = attrs.get('user_otp')

        timeout_timestamp = self.context['request'].session.get('timeout')

        # OTP submition টাইম 3 মিনিট এর বেসি হলে তা Error দিবে।
        timeout_datetime = datetime.fromtimestamp(timeout_timestamp)
        if datetime.now() > timeout_datetime:
            raise serializers.ValidationError("OTP verification time has expired")

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email = email)

            if User_OTP.objects.filter(Q(user__email = email) & Q(otp = user_otp)).exists():
                return attrs
            
            raise serializers.ValidationError("Your OTP doesn't match")
        
        raise serializers.ValidationError("Your OTP doesn't match")
#_____________________________________________________________________________________________________


# NOTE -----------------------------( Reset Passwor Email Verify Serialize )---------------------------------

# NOTE IF OTP Verification-----------------------

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    otp = serializers.IntegerField()

    class Meta:
        fields = ['password', 'password2', 'otp']

    # Password must be at least 8 characters long and contain at least one letter.
    def validate_password(self, value):
        if len(value) < 8 or not any(char.isalpha() for char in value):
            raise serializers.ValidationError("Password must be at least 8 characters long and contain at least one letter.")
        return value

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        otp = attrs.get('otp')
        
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        
        # যেই email and OTP_timeout আমরা serializers.py  এর SendPasswordResetEmailSerializer class থেকে Django session এর মাধ্যমে 
        # send করেছি তা receive করা হয়েছে email এবং timeout_timestamp veriable এর ভেতর।
        email = self.context['request'].session.get('email')
        # timeout_timestamp = self.context['request'].session.get('timeout')

        # timeout_datetime = datetime.fromtimestamp(timeout_timestamp)
        # if datetime.now() > timeout_datetime:
        #     raise serializers.ValidationError("OTP verification time has expired")

        user_obj = User.objects.get(email = email) 

        otp_obj = User_OTP.objects.get(user = User.objects.get(email=email))

        
        if otp != otp_obj.otp:
            raise serializers.ValidationError("Your OTP doesn't match")
        


        user_obj.set_password(password)
        user_obj.save()
        return attrs
    
# #_____________________________________________________________________________________________________