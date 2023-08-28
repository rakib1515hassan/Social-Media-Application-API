from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from Account.models import UserProfile_Pic
from Profile.models import User_Address, User_Educationl_Info, User_Social_Link, User_Working_Assets



class User_AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User_Address
        fields = ['id', 'address_type', 'division', 'sub_division', 'zip_code', 'address']



class User_Educationl_InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User_Educationl_Info
        fields = ['id', 'title', 'institution_name', 'passing_year', 'result']



class User_Social_LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User_Social_Link
        fields = ['id', 'portfolio', 'git', 'LinkedIn', 'facebook', 'twitter', 'instagram']



class User_Working_AssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User_Working_Assets
        fields = ['id', 'title', 'description', 'git_link', 'website_link']



class UserProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserProfile_Pic
        fields = ['id', 'image', 'is_profile_picture', 'created_at']





class UserProfileSerializer(serializers.ModelSerializer):
    userprofile_pic      = UserProfilePicSerializer(      many=True, read_only=True)
    user_address         = User_AddressSerializer(        many=True, read_only=True)
    user_educationl_info = User_Educationl_InfoSerializer(many=True, read_only=True)
    user_social_link     = User_Social_LinkSerializer(               read_only=True)
    user_working_assets  = User_Working_AssetsSerializer( many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'gender', 'email', 'phone', 'birth_date', 'profession', 'cover_pic', 'date_joined',
            'userprofile_pic',
            'user_address',
            'user_educationl_info',
            'user_social_link',
            'user_working_assets' 
            ]



# class UserInfoProfileSerializer(serializers.ModelSerializer):
#     user = UserProfileSerializer()  

#     # def validate_user(self, value):
#     #     # Check if the new username is unique
#     #     if 'username' in value and User.objects.filter(username=value['username']).exclude(pk=value['id']).exists():
#     #         raise serializers.ValidationError("A user with that username already exists.")
#     #     return value

#     class Meta:
#         model = UserInfo
#         fields = ['id', 'phone', 'birth_date', 'profile_pic', 'user']

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop('user', None)
#         if user_data:
#             user = instance.user

#             user.id         = user_data.get('id', user.id)
#             # user.username   = user_data.get('username', user.username)
#             user.first_name = user_data.get('first_name', user.first_name)
#             user.last_name  = user_data.get('last_name', user.last_name)
#             user.email      = user_data.get('email', user.email)

#             user.save()

#         instance.phone = validated_data.get('phone', instance.phone)
#         instance.birth_date = validated_data.get('birth_date', instance.birth_date)
#         instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        
#         instance.save()
#         return instance


#_____________________________________________________________________________________________________