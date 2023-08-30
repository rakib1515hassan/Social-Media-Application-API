from django.contrib import admin
from Profile.models import (
    User_Address,
    User_Educationl_Info,
    User_Social_Link,
    User_Working_Assets,

    Division,
    Sub_Division,
    AddressType
)

@admin.register(User_Address)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'address_type', 'sub_division', 'zip_code', 'cityANDstreet']


@admin.register(AddressType)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'a_type']


# Register your models here.
# admin.site.register(User_Address)
admin.site.register(User_Educationl_Info)
admin.site.register(User_Social_Link)
admin.site.register(User_Working_Assets)

admin.site.register(Division)
admin.site.register(Sub_Division)
# admin.site.register(AddressType)

