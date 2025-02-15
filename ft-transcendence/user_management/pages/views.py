from django.shortcuts import render, redirect
from django.http import HttpResponse
import requests
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.urls import reverse

# ! REST API Imports
from django.http import JsonResponse
from rest_framework import permissions, viewsets
from user_management.rest.serializers import UserSerializer

def req_api42(request, token):
    headers = {'Authorization': f'Bearer {token}'}

	#  fetch api 42
    response = requests.get('https://api.intra.42.fr/v2/me', headers=headers)

    if response.status_code == 200:
        data = response.json()
        # print(data)
        return redirect('/app/')
    else:
        # Gérer l'erreur
        return render(request, 'pages/login.html', {'error': 'Impossible de récupérer les datas'})

# ! REST API Method
def user_data(request):
	user = User.objects.all()
	serializer = UserSerializer(user, many=True)
	return JsonResponse(serializer.data, safe=False)

def getProfile_from_db(username):
	user = User.objects.get(username)
	serializer = UserSerializer(user, many=True)
	return JsonResponse(serializer.data, safe=False)

@csrf_protect
def index(request):
    if request.method == 'POST' and request.session.get('authMethod', None) is None:
        first_name = request.POST.get('first-name')
        last_name = request.POST.get('last-name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password != confirm_password:
            return (render(request, 'pages/index.html', {'error': 'Differents passwords'}))

        try:
            user = User.objects.create_user(
                username=email,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
            )
            user.save()
            return redirect('/login')
        except Exception as e:
            return render(request, 'pages/index.html', {'error': 'Error while creating user. Please choose others credentials.'})
    return render(request, "pages/index.html")

@csrf_protect
def login(request):
    if request.session.get('authMethod', None) is None:
        if request.method == 'POST'  :
            email = request.POST.get('email')
            password = request.POST.get('password')
            user = authenticate(request, username=email, password=password)
            if user is not None:
                auth_login(request, user)
                request.session['authMethod'] = 'local'
                return redirect('/app/')
            else:
                first_name = request.POST.get('first-name')
                password = request.POST.get('password')
                user = authenticate(username=first_name, password=password)
                if user is not None:
                    auth_login(request, user)
                    return redirect('/app/')
                else:
                    return render(request, 'pages/login.html', {'error': 'Non valid credentials.'})
        elif request.method == 'GET' and not request.user.is_authenticated:
            code = request.GET.get("code")
            if not code:
                return render(request, 'pages/login.html')

            url_token = "https://api.intra.42.fr/oauth/token"
            headers = {"Content-Type": "application/x-www-form-urlencoded"}
            data = {
                "grant_type": "authorization_code",
                "client_id": "u-s4t2ud-e6514ae93c2f3f3c25c6c98db2627ae8b9c70362848bea099f4e972c73370ec3",
                "client_secret": "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",
                "code": code,
                "redirect_uri": "http://localhost:8000/login"
            }
            response = requests.post(url_token, headers=headers, data=data)
            if response.status_code == 200:
                token = response.json().get("access_token")
                if token:
                    request.session['access_token'] = token
                    request.session['authMethod'] = 'school'
                    return req_api42(request, token)
                else:
                    return render(request, 'pages/login.html', {'error': 'Error while getting token'})
            else:
                return render(request, 'pages/login.html', {'error': 'Token exchange failed'})
        elif request.method == 'GET':
            return render(request, 'pages/login.html')
    else:
        print(request.session['authMethod'])
        return render(request, 'pages/login.html', {'error': 'Already login'})

#@login_required
def logout_normal(request):
    if 'authMethod' in request.session:
        request.session.pop('authMethod')
    request.session['authMethod'] = None
    auth_logout(request)
    messages.success(request, 'Logout successful!')
    return redirect('login')

def logout(request):
    if 'access_token' in request.session:
        if 'authMethod' in request.session:
            request.session.pop('authMethod')
        request.session['authMethod'] = None
        del request.session['access_token']
        messages.success(request, 'Logout successful!')
        return redirect('login')
    else:
        return(logout_normal(request))
    return render(request, 'pages/login.html', {'logout': 'Error while logout'})

def about(request):
    return render(request, "pages/about.html")


def howItWorks(request):
    return render(request, "pages/how-it-works.html")


def signup(request):
    return render(request, "pages/index.html")


# * user logged in
def loggedIn(request):
    return render(request, "pages/logged-in.html")


def pwdReset(request):
    return render(request, "pages/pwd-reset.html")


def dashboard(request):
    return render(request, "pages/dashboard.html")


def settings(request):
    return render(request, "pages/settings.html")


def app(request):
    return render(request, "app.html")
