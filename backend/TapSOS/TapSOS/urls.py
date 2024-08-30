from django.urls import path
from TapSOS.views import UserView, EmergencyCardView

"""
URL configuration for TapSOS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

urlpatterns = [

    path('admin/', admin.site.urls),
    path('users/', UserView.as_view(), name='user-create'),  # For POST requests to create a new user
    path('users/<int:pk>/', UserView.as_view(), name='user-update'),  # For PUT requests to update an existing user
    path('emergency-cards/', EmergencyCardView.as_view(), name='emergency-card-list-create'),  # For GET requests to list all cards and POST to create a new card
    path('emergency-cards/<int:pk>/', EmergencyCardView.as_view(), name='emergency-card-update-delete'),  # For PUT requests to update and DELETE requests to delete a card by ID
]
