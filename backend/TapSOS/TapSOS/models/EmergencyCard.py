from django.db import models
from TapSOS.models.User import User

class EmergencyCard(models.Model):
    
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.title} ({self.get_source_display()})"