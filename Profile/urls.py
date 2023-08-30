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
    path('api/users/<uuid:pk>/', api.UserPatchView.as_view(), name='user-patch'),

    # Division and Subdivision show on address form
    path('api/address-type/', api.AddressTypeListView.as_view(), name='AddressTypeListView'),
    path('api/divition/', api.DivisionListView.as_view(), name='DivisionView'),
    path('api/subdivition/<uuid:division_id>/', api.SubDivisionListView.as_view(), name='sub-division-list'),
    path('api/address-create/', api.CreateUserAddressView.as_view(), name='CreateUserAddressView'),
  
    path('api/address/<uuid:pk>/', api.UserAddressRetreveDeleteView.as_view(), name='UserAddressRetreveDeleteView'),
    path('api/address-update/<uuid:pk>/', api.UserAddressUpdateView.as_view(), name='UserAddressUpdateView'),


    # path('api/test/', api.TestApi.as_view()),
    # path('api/test/<uuid:pk>/', api.TestApi.as_view()),

    
]