from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from Account.models import User, User_OTP, UserProfile_Pic
from Account.forms import UserChangeForm, UserCreationForm


# Register your models here.


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ( 'id', 'first_name', 'last_name', 'email', 'email_varification', 'is_superuser')



@admin.register(User_OTP)
class User_OTP_Admin(admin.ModelAdmin):
    list_display = ( 'id','Email', 'otp', 'created_at')

    def Email(self, obj):
        return obj.user.email
    
    Email.short_description = 'Email'



@admin.register(UserProfile_Pic)
class UserProfile_Pic_Admin(admin.ModelAdmin):
    list_display = ( 'id','Email', 'image', 'is_profile_picture', 'created_at')

    def Email(self, obj):
        return obj.user.email
    
    Email.short_description = 'Email'




class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ['id', 'get_full_name', 'email', 'email_varification', 'is_superuser']
    list_filter = ['email_varification', 'is_superuser', 'is_staff']
    fieldsets = [
        (None, {"fields": ['email', 'password', 'date_joined']}),
        ("Personal info", {"fields": ['first_name', 'last_name', 'gender', 'birth_date', 'phone', 'profession', 'cover_pic']}),
        ("Permissions", {"fields": ['email_varification', 'is_superuser', 'is_staff', 'is_active']}),
    ]

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "first_name", "last_name", "gender", "phone", "birth_date", "profession", "cover_pic", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email", "first_name", "last_name"]

    """ NOTE 'date_joined' field which is a standard field provided by the AbstractUser base class. This field represents the date
              and time when the user account was created.

    ordering = ["email"]
    ordering = ["created_at"]  # Ascending Order
    ordering = ["-created_at"] # Descending Order
    ordering = ["-created_at", "email"]  # Latest users first, then by email

    """
    ordering = ["-date_joined", "email"]  # Latest users first, then by email

    filter_horizontal = [] ## 'filter_horizontal[0]' must be a many-to-many field.

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    get_full_name.short_description = 'Name'


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
# admin.site.register(User)
# admin.site.register(User_OTP)