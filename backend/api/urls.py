from django.urls import path

from .api_views import ToDoList, ToDoListCreate

urlpatterns = [
    path("todos", ToDoList.as_view()),
    path("todo", ToDoListCreate.as_view()),
]
