from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
User = get_user_model()

from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy

from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError


# Create your views here.
class home( generic.TemplateView ):
# class home( LoginRequiredMixin, generic.TemplateView ):
    template_name = "Profile\home.html"
    # login_url = reverse_lazy('login')


class Profiel( generic.TemplateView ):
    template_name = "Profile\profile.html"
