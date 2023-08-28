from django.urls import path
from Profile.Views import views
from Profile.Views import api



## profile/
urlpatterns = [
    ### NOTE Tamplate Render URL:-
    path("profile-post/",      views.Profiel_posts.as_view(),     name='Profiel_posts'),
    path("profile-about/",     views.Profiel_about.as_view(),     name='Profiel_about'),
    path("profile-followers/", views.Profiel_followers.as_view(), name='Profiel_followers'),
    path("profile-following/", views.Profiel_following.as_view(), name='Profiel_following'),
    path("profile-photo/",     views.Profiel_photo.as_view(),     name='Profiel_photo'),







    ### NOTE API Endpoints:-
    ## Profile
    path('api/profile/', api.UserProfileView_GET.as_view(), name='UserProfileView_GET'),
    # path('api/profile/<uuid:pk>/', api.UserProfileEditView.as_view(), name='update_user_profile'),

    
]