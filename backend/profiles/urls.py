from django.urls import path

from .api_views import get_profile

urlpatterns = [
    path("profile/", get_profile, name="profile"),
]
