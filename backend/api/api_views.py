"""
Views for the API
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def get_routes(request):
    """
    Return a list of all available API routes
    """
    routes = [
        "/api/",
        "/api/token",
        "/api/token/refresh",
        "/api/todos",
        "/api/todos/<int:pk>",
        "/api/profile",
    ]
    return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    API endpoint that allows a user to obtain a JWT token
    """

    serializer_class = MyTokenObtainPairSerializer
