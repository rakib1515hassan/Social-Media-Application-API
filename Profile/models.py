from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

import uuid
from django.db.models.signals import post_save


# Create your models here.

class User_Address(models.Model):
    id       = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    user     = models.ForeignKey( User, on_delete = models.CASCADE, related_name='user_address' )

    address_type = models.OneToOneField( "Profile.AddressType", verbose_name = ("AddressType"),  on_delete=models.CASCADE )
    division     = models.ForeignKey(    "Profile.Division",    verbose_name = ("Division"),     on_delete=models.CASCADE )
    sub_division = models.ForeignKey(    "Profile.Sub_Division",verbose_name = ("Sub_Division"), on_delete=models.CASCADE )

    zip_code     = models.CharField( max_length=12,     null = True, blank = True )
    address      = models.CharField( max_length = 1024, null = True, blank = True )

    def __str__(self):
        return f"Email = {self.user.email}, Address Type = {self.address_type}"


class User_Educationl_Info(models.Model):
    id     = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    user   = models.ForeignKey( User, on_delete = models.CASCADE, related_name='user_educationl_info' )

    title            = models.CharField( max_length = 250, null = True, blank = True )
    institution_name = models.CharField( max_length = 250, null = True, blank = True )
    passing_year     = models.DateField( null = True, blank = True )
    
    result = models.DecimalField( 
        null = True, 
        blank = True, 
        max_digits = 4,    # Specifies the maximum number of digits (including both sides of the decimal point)
        decimal_places = 2 # Specifies the number of decimal places
        )

    def __str__(self):
        return f"Email = {self.user.email}, Title = {self.title}"
    


class User_Social_Link(models.Model):
    id     = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    user   = models.OneToOneField( User, on_delete = models.CASCADE, related_name='user_social_link' )

    websit    = models.URLField( max_length=200, null = True, blank = True)
    git       = models.URLField( max_length=200, null = True, blank = True)
    linkedIn  = models.URLField( max_length=200, null = True, blank = True)
    facebook  = models.URLField( max_length=200, null = True, blank = True)
    twitter   = models.URLField( max_length=200, null = True, blank = True)
    instagram = models.URLField( max_length=200, null = True, blank = True)
    youtube   = models.URLField( max_length=200, null = True, blank = True)
    
    ## NOTE signals_section
    # def create_profile(sender, **kwargs):
    #     user = kwargs["instance"]
    #     if kwargs["created"]:
    #         user_social_link = User_Social_Link(user=user)
    #         user_social_link.save()

    # post_save.connect(create_profile, sender=User)

    def __str__(self):
        return self.user.email
    

class User_Working_Assets(models.Model):
    id    = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    user  = models.ForeignKey( User, on_delete = models.CASCADE, related_name='user_working_assets' )

    title        = models.CharField( max_length = 250, null = True, blank = True )
    description  = models.CharField( max_length = 500, null = True, blank = True )
    git_link     = models.URLField( max_length = 200, null = True, blank = True)
    website_link = models.URLField( max_length = 200, null = True, blank = True)

    def __str__(self):
        return f"Email = {self.user.email}, Project Title = {self.title}"






class AddressType(models.Model):
    id       = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    a_type   = models.CharField( max_length=50)

    def __str__(self):
        return self.a_type
    

class Division(models.Model):
    id       = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    name     = models.CharField( max_length=50)

    def __str__(self):
        return self.name


class Sub_Division(models.Model):
    id       = models.UUIDField( primary_key = True, unique = True, default = uuid.uuid4, editable = False )
    division = models.ForeignKey( Division, on_delete=models.CASCADE )

    name     = models.CharField( max_length=50)

    def __str__(self):
        return f"{self.division.name} => {self.name}"
    

