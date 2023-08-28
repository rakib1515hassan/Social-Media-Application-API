domain = 'http://127.0.0.1:8000/'

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate 


from django.conf import settings

User = get_user_model()



# NOTE --------------------------------( ChangePasswor Serialize )------------------------------------
class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password     = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2    = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['old_password', 'password', 'password2']

    def validate(self, attrs):
        old_password = attrs.get('old_password')
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user') # যেই user আমরা view.py function এর context এর মাধ্যমে send করেছি তা receive করা হয়েছে

        # Authenticate the user with the old password
        # if not authenticate(username=user.username, password=old_password):
        if not authenticate(email=user.email, password=old_password):
            raise serializers.ValidationError("Old password is incorrect")

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password don't match")

        # Set the new password and save the user
        user.set_password(password)
        user.save()
        return attrs
#_____________________________________________________________________________________________________