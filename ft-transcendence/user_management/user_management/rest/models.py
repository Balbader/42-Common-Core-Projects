from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, default='')
    date_of_birth = models.DateField(default=())
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=300)
    confirm_password = models.CharField(max_length=300)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
