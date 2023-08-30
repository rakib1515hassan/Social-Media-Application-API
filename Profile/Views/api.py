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
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from Profile.models import Division, Sub_Division, AddressType, User_Address
## NOTE All Serializers
from Profile.Serializers.ProfileSerializers import (
    UserProfileSerializer_GET, 
    UserAddressSerializer,  
    AddressTypeSerializer,
    DivisionSerializer
)
from Profile.Serializers.UserUpdateSerializer import (
    UserPatchSerializer, 
    D_SubDivisionSerializer, 
    CreateUserAddressSerializer
)

##_________________________________________________________________________________________
## NOTE ------------------------( User Profile View )--------------------------------------
## URL = ( http://127.0.0.1:8000/profile/api/profile/ )

class UserProfileView_GET(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer_GET(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# Usaer Update View
class UserPatchView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return User.objects.get(pk=pk)

    def patch(self, request, pk, format=None):
        user_object = self.get_object(pk)

        serializer = UserPatchSerializer(user_object, data=request.data, partial=True ) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "User Information Update successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
""" NOTE Alternative
class UserPatchView(generics.UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserPatchSerializer

    def perform_create(self, serializer):
        serializer.save()
        return Response({"message": "User Information Update successfully."}, status=status.HTTP_201_CREATED)
"""


## NOTE ------------------------( User Address View )-------------------------------------- 

class AddressTypeListView(generics.ListAPIView):
    queryset = AddressType.objects.all()
    serializer_class = AddressTypeSerializer


class DivisionListView(generics.ListAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer


class SubDivisionListView(generics.ListAPIView):
    serializer_class = D_SubDivisionSerializer

    def get_queryset(self):
        division_id = self.kwargs['division_id']
        return Sub_Division.objects.filter(division_id=division_id)

""" NOTE Alternative
class SubDivisionListView(APIView):
    def get(self, request, division_id):
        sub_divisions = Sub_Division.objects.filter(division_id=division_id)
        serializer = D_SubDivisionSerializer(sub_divisions, many=True)
        return Response(serializer.data)
"""

class CreateUserAddressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CreateUserAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User address created successfully."}, status=201)
        return Response(serializer.errors, status=400)
    
"""NOTE Alternative
class CreateUserAddressView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    queryset = User_Address.objects.all()
    serializer_class = CreateUserAddressSerializer
"""


class UserAddressRetreveDeleteView(generics.RetrieveDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = User_Address.objects.all()
    serializer_class = UserAddressSerializer


class UserAddressUpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, format=None):
        address_object = User_Address.objects.get( pk = pk )

        serializer = CreateUserAddressSerializer(address_object, data=request.data, partial=True ) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "User Information Update successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class TestApi(generics.UpdateAPIView):
#     queryset = User_Address.objects.all()
#     serializer_class = UserAddressSerializer






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