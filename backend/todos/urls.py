from django.urls import path

from .api_views import ToDoListCreateView, ToDoRetrieveUpdateDestroyView

urlpatterns = [
    path("todos/", ToDoListCreateView.as_view()),
    path("todos/<int:pk>", ToDoRetrieveUpdateDestroyView.as_view()),
]
