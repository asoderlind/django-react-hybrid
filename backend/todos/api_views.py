from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import ToDo
from .serializers import ToDoSerializer

# Create your views here.


class ToDoListCreateView(generics.ListCreateAPIView):
    """
    API endpoint that allows To-Do items to be viewed or created
    """

    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class ToDoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows a single To-Do item to be viewed, edited, or deleted.
    """

    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
