"""
URLs for the react_container app.
"""
from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'', views.catchall),
]
