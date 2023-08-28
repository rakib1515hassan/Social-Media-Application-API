from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

## NOTE --------------------------------------( Login Serialize )--------------------------------------

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField( max_length = 250)
    class Meta:
        model = User
        fields = ['email', 'password']

##_____________________________________________________________________________________________________