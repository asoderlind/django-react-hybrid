from django.urls import path

from . import api_views, views

urlpatterns = [
    path('todos', api_views.ToDoList.as_view()),
    path('todo', views.ToDoListCreate.as_view()),
]
