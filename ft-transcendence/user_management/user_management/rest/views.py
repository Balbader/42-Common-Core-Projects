from django.contrib.auth.models import User
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import requests

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

def user_data(request):
    users = User.objects.all()
    print ('USERS PRINT:', users)
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_all_users_last_login(request):
    users = User.objects.all()
    last_login_list = [{'username': user.username, 'last_login': user.last_login} for user in users]
    return last_login_list

def getProfile_from_db(id):
    user = User.objects.get(id=id)  # Corrected to use keyword argument
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data, safe=False)

def get_profile_from_school(token):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get('https://api.intra.42.fr/v2/me', headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {}

def me_data(request):
    auth_method = request.session.get('authMethod')
    profile = {}
    if auth_method == 'school':
        token = request.session.get('access_token')
        profile_data = get_profile_from_school(token)
        profile = JsonResponse(profile_data, safe=False)
    else:
        user = request.user
        user_data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }
        profile = JsonResponse(user_data, safe=False)
    return profile

class UserProfileUploadView(APIView):
    queryset = User.objects.all().order_by('id')
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        profile = User.objects.all().order_by('id')
        serializer = UserSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            if (Response.status_code == 200):
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
