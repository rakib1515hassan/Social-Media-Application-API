from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Profile.Views import views

from rest_framework_simplejwt.views import (
            TokenObtainPairView,
            TokenRefreshView,
            TokenVerifyView
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home.as_view(), name='home'),


    ## App URL Connect:-
    path('auth/', include('Account.urls')),
    path('profile/', include('Profile.urls')),










    ### JWT Token:-
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
            
    # For TokenVerifyView
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)