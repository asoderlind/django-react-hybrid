from django.contrib.auth.models import User
from django.db import models

# Create your models here.


# Dummy model
class ToDo(models.Model):
    task = models.CharField(db_column="task", max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_complete = models.BooleanField(db_column="is_complete", default=False)
    created_datetime = models.DateTimeField(auto_now_add=True, blank=False)

    class Meta:
        verbose_name = "To-Do"
        verbose_name_plural = "To-Do List"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.user.username
