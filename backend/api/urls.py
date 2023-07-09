from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import api_views

urlpatterns = [
    path("", api_views.get_routes),
    path("token/", api_views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("todos/", api_views.ToDoListCreateView.as_view()),
    path("todos/<int:pk>", api_views.ToDoRetrieveUpdateDestroyView.as_view()),
]
