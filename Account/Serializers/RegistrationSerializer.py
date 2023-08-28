domain = 'http://127.0.0.1:8000/'

from rest_framework import serializers
from django.contrib.auth import get_user_model

# Sending Mail
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

## NOTE Link verifiacation ( For UID )
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
## এটি আমাদের Token auto generat করে দেয়।
from django.contrib.auth.tokens import PasswordResetTokenGenerator




## NOTE ----------------------------------( Registration Serialize )------------------------------------
 
class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password     = serializers.CharField(write_only=True, required=True, validators=[validate_password], style={'input_type':'password'})
    password2    = serializers.CharField(write_only=True, required=True, style={'input_type':'password'})

    class Meta:
        model = User
        fields = ( 'first_name', 'last_name', 'email', 'password', 'password2', 'gender', 'phone', 'birth_date', 'profession')
        extra_kwargs = {
            'first_name':{'required': True},
            'last_name': {'required': True},
            'password':  {'write_only':True}
        }

    def validate(self, attrs): # attrs means data
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"Password and Confirm Password didn't match."})
        
        return attrs


    def create(self, validated_data):
        password2 = validated_data.pop('password2')

        user = User.objects.create(
            email       = validated_data['email'],
            first_name  = validated_data['first_name'],
            last_name   = validated_data['last_name'],
            
            gender      = validated_data['gender'],
            phone       = validated_data['phone'],
            birth_date  = validated_data['birth_date'],
            profession  = validated_data['profession'],
        )
        user.set_password(validated_data['password'])
        user.save()

        
        # Send EMail-------------------------------------------------------------
        
        # NOTE urlsafe_base64_encode এটি মূলত কোন bytes কে encode করে, আমাদের যেহেতু user id 
        # কে encode করতে হবে তাই একে প্রথমে byte এ convert করে নিতে হবে।

        uid = urlsafe_base64_encode(force_bytes(user.id)) 
        token = PasswordResetTokenGenerator().make_token(user)  # NOTE Verification link time set in setting.py 15 min

        """ NOTE Example of UID and Token:-

            Encoded UID =  Njc5NTY5OTUtYjY3Ni00NDkzLTllZTYtZGU2YjkxZmNjZWNj

            Token       =  btfr3y-df27983f924a55bd2c7edbcc479f03b8

        """
        link = domain + 'auth/verify/'+ uid +'/'+token+ '/'

        body = f"Hello {user.first_name}{user.last_name}, your email verification link is:- {link}"

        # print("-----------------")
        # print("Link = ", body)
        # print("-----------------")

        """ NOTE Example of Email Message:-

            Hello Md Rakib Hassan, your email verification link is:- 

            http://127.0.0.1:8000/Njc5NTY5OTUtYjY3Ni00NDkzLTllZTYtZGU2YjkxZmNjZWNj/btfr3y-df27983f924a55bd2c7edbcc479f03b8

        """
        
        send_mail(
            "Verify Your Account",     # Subject
            body,                      # Body
            settings.EMAIL_HOST_USER,  # From
            [user.email],              # To
            fail_silently = False
        )
        #_________________________________________________________________________

        return user
    
##______________________________________________________________________________________________________ 