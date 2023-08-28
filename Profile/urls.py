from django.urls import path
from Profile.Views import views
from Profile.Views import api



## profile/
urlpatterns = [
    ### NOTE Tamplate Render URL:-
    path("profile/", views.Profiel.as_view(), name='profile'),







    ### NOTE API Endpoints:-
    ## Profile
    path('api/profile/', api.UserProfileView_GET.as_view(), name='UserProfileView_GET'),
    # path('api/profile/<uuid:pk>/', api.UserProfileEditView.as_view(), name='update_user_profile'),

    
]