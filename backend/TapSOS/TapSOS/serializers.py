from rest_framework import serializers
from TapSOS.models.User import User, MedicalCondition, Allergy
from TapSOS.models.EmergencyCard import EmergencyCard

class MedicalConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalCondition
        fields = ['condition']

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = ['allergen']

class UserSerializer(serializers.ModelSerializer):
    medical_conditions = MedicalConditionSerializer(many=True)
    allergies = AllergySerializer(many=True)

    class Meta:
        model = User
        fields = [
            'name', 'age', 'gender', 'DOB', 'address',
            'medical_conditions', 'allergies', 'blood_type',
            'emergency_contact_number', 'emergency_contact_name',
            'language_preference'
        ]

    def create(self, validated_data):
        medical_conditions_data = validated_data.pop('medical_conditions')
        allergies_data = validated_data.pop('allergies')
        user = User.objects.create(**validated_data)
        
        for condition_data in medical_conditions_data:
            condition, created = MedicalCondition.objects.get_or_create(condition=condition_data['condition'])
            user.medical_conditions.add(condition)
        
        for allergy_data in allergies_data:
            allergy, created = Allergy.objects.get_or_create(allergen=allergy_data['allergen'])
            user.allergies.add(allergy)

        return user

    def update(self, instance, validated_data):
        medical_conditions_data = validated_data.pop('medical_conditions')
        allergies_data = validated_data.pop('allergies')

        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.DOB = validated_data.get('DOB', instance.DOB)
        instance.address = validated_data.get('address', instance.address)
        instance.blood_type = validated_data.get('blood_type', instance.blood_type)
        instance.emergency_contact_number = validated_data.get('emergency_contact_number', instance.emergency_contact_number)
        instance.emergency_contact_name = validated_data.get('emergency_contact_name', instance.emergency_contact_name)
        instance.language_preference = validated_data.get('language_preference', instance.language_preference)
        instance.save()

        instance.medical_conditions.clear()
        for condition_data in medical_conditions_data:
            condition, created = MedicalCondition.objects.get_or_create(condition=condition_data['condition'])
            instance.medical_conditions.add(condition)

        instance.allergies.clear()
        for allergy_data in allergies_data:
            allergy, created = Allergy.objects.get_or_create(allergen=allergy_data['allergen'])
            instance.allergies.add(allergy)

        return instance

class EmergencyCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyCard
        fields = ['title', 'content', 'source', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_title(self, value):
        # Custom validation example: ensure title is not empty and is at least 3 characters long
        if len(value) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long.")
        return value