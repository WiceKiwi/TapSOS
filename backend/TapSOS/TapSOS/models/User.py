from django.db import models

class MedicalCondition(models.Model):
    condition = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.condition

class Allergy(models.Model):
    allergen = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.allergen
    
class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    DOB = models.DateField()
    address = models.TextField()
    medical_conditions = models.ManyToManyField(MedicalCondition)
    allergies = models.ManyToManyField(Allergy)
    blood_type = models.CharField(max_length=3)
    emergency_contact_number = models.CharField(max_length=15)
    emergency_contact_name = models.CharField(max_length=100)
    language_preference = models.CharField(max_length=100)

    def __str__(self):
        return self.name