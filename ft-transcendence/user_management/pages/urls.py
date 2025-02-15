from string import Template
from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("", views.login, name="login"),
    path("signup", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("howItWorks/", views.howItWorks, name="howItWorks"),
    path("login/", views.login, name="login"),
    path('logout/', views.logout, name='logout'),
    path("loggedIn/", views.loggedIn, name="loggedIn"),
    path("loggedIn/dashboard/", views.dashboard, name="dashboard"),
    path("loggedIn/pwdReset/", views.pwdReset, name="pwdReset"),
    path("loggedIn/settings/", views.settings, name="settings"),
	re_path(r'^app/.*', TemplateView.as_view(template_name="app.html")),
]
