from rest_framework import serializers
from user_management.rest.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
