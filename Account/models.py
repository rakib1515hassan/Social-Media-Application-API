from django.db import models
# from django.contrib.auth import get_user_model
# User = get_user_model()

import uuid
from django.contrib.auth.models import AbstractUser
from Account.manager import CustomUserManager


# Create your models here.
class User(AbstractUser):
    ## AbstractUser default field ( first_name, last_name, email, password, last_login, is_active, is_staff, is_superuser )
    username = None
    
    id                 = models.UUIDField( primary_key = True, unique=True, default = uuid.uuid4, editable=False )

    email              = models.EmailField( unique= True )
    email_varification = models.BooleanField( default = False )

    gender = models.CharField( choices= (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    ), max_length = 20, default = "Male" )

    phone       = models.CharField(max_length=20, null=True, blank=True)
    birth_date  = models.CharField(max_length=20, null=True, blank=True)
    profession  = models.CharField(max_length=20, null=True, blank=True)
    cover_pic   = models.ImageField(upload_to="CoverImage/", null=True, blank=True)

    USERNAME_FIELD = 'email' ## এটি Django username হিসেবে set হবে
    REQUIRED_FIELDS = [] 

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    


class UserProfile_Pic(models.Model):
    id                 = models.UUIDField( primary_key = True, default = uuid.uuid4, editable=False )
    user               = models.ForeignKey(User, related_name='userprofile_pic', on_delete=models.CASCADE)

    image              = models.ImageField(upload_to='ProfileImage/')
    is_profile_picture = models.BooleanField(default=False)
    created_at         = models.DateTimeField( auto_now_add=True )

    def __str__(self):
        return self.user.email
    

class User_OTP(models.Model):
    id = models.UUIDField( primary_key = True, default = uuid.uuid4, editable=False )
    user       = models.OneToOneField( User, on_delete=models.CASCADE )

    otp        = models.IntegerField()
    created_at = models.DateTimeField( auto_now_add=True )

    def __str__(self):
        return self.user.email
    



