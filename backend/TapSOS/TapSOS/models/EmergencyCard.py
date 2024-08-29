from django.db import models
from .User import User

class EmergencyCard(models.Model):
    CARD_SOURCE_CHOICES = [
        ('manual', 'Manual'),  # ('value_in_db', 'Human Readable Name')
        ('ai', 'AI'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emergency_cards')
    title = models.CharField(max_length=100)
    content = models.TextField()
    source = models.CharField(max_length=6, choices=CARD_SOURCE_CHOICES, default='manual')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_source_display()})"