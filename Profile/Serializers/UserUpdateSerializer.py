from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from Profile.models import Division, Sub_Division, AddressType, User_Address

class UserPatchSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(  required=False, allow_null=True )
    first_name = serializers.CharField(  required=False )
    last_name  = serializers.CharField(  required=False )
    email      = serializers.EmailField( required=False )
    phone      = serializers.CharField(  required=False )  
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'gender', 'email', 'phone', 'birth_date', 'profession']


class D_SubDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sub_Division
        fields = ['id', 'name']


class CreateUserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Address
        fields = ['id', 'user', 'address_type', 'sub_division', 'zip_code', 'cityANDstreet']
