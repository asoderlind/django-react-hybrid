from rest_framework import filters, generics, serializers
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import ToDo
from .serializers import ToDoSerializer


class ToDoList(generics.ListCreateAPIView):
    """
    List all ToDos
    """
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    authentication_classes=[ SessionAuthentication ]
    permission_classes = [IsAuthenticated]
    
class ToDoListCreate(generics.ListCreateAPIView):
    """
    Create a new ToDo
    """
    serializer_class = ToDoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["task"]
    ordering_fields = ["created_datetime", "is_complete"]


    def get_queryset(self):
        if self.request.user.is_anonymous:
            return ToDo.objects.none()
        return ToDo.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            raise serializers.ValidationError("Anonymous users not allowed to create records")
        serializer.save(created_by=self.request.user)
