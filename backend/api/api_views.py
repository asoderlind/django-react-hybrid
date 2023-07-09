"""
Views for the API
"""
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import ToDo
from .serializers import MyTokenObtainPairSerializer, ToDoSerializer


@api_view(["GET"])
def get_routes(request):
    """
    Return a list of all available API routes
    """
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)


class ToDoListCreateView(generics.ListCreateAPIView):
    """
    API endpoint that allows To-Do items to be viewed or created
    """

    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]


class ToDoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows a single To-Do item to be viewed, edited, or deleted.
    """

    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]


class MyTokenObtainPairView(TokenObtainPairView):
    """
    API endpoint that allows a user to obtain a JWT token
    """

    serializer_class = MyTokenObtainPairSerializer
