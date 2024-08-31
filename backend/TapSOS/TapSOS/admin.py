from django.contrib import admin
from .models.User import User, MedicalCondition, Allergy
from .models.EmergencyCard import EmergencyCard

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # List the fields to display in the list view, including the 'id'
    list_display = ('id', 'name', 'age', 'gender', 'DOB', 'blood_type', 'emergency_contact_name')

@admin.register(MedicalCondition)
class MedicalConditionAdmin(admin.ModelAdmin):
    # Display the primary key 'condition' in the list view
    list_display = ('condition',)

@admin.register(Allergy)
class AllergyAdmin(admin.ModelAdmin):
    # Display the primary key 'allergen' in the list view
    list_display = ('allergen',)

@admin.register(EmergencyCard)
class EmergencyCardAdmin(admin.ModelAdmin):
    # Display the 'id' and other relevant fields in the list view
    list_display = ('id', 'title', 'source', 'created_at')
