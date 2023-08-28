from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.views import APIView
from rest_framework import generics

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, 
)

from rest_framework_simplejwt.authentication import JWTAuthentication

## NOTE All Serializers
from Profile.Serializers.ProfileSerializers import UserProfileSerializer_GET


##_________________________________________________________________________________________
## NOTE ------------------------( User Profile View )--------------------------------------
## URL = ( http://127.0.0.1:8000/profile/api/profile/ )

class UserProfileView_GET(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer_GET(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

# class UserProfileEditView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def patch(self, request, pk, format=None):
#         # print("-------------------------")
#         # print("request data", request.data)
#         # print("-------------------------")
#         user_info = UserInfo.objects.get(user=request.user)
#         serializer = UserInfoProfileSerializer(user_info, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"msg": "Profile is successfully updated."}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # #______________________________________________________________________________________