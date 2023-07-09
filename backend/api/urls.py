from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .api_views import (
    MyTokenObtainPairView,
    ToDoListCreateView,
    ToDoRetrieveUpdateDestroyView,
    get_profile,
    get_routes,
)

urlpatterns = [
    path("", get_routes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("todos/", ToDoListCreateView.as_view()),
    path("todos/<int:pk>", ToDoRetrieveUpdateDestroyView.as_view()),
    path("profile/", get_profile, name="profile"),
]
