from rest_framework import serializers
from TapSOS.models.User import User, MedicalCondition, Allergy
from TapSOS.models.EmergencyCard import EmergencyCard

class MedicalConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalCondition
        fields = ['condition']

    def to_internal_value(self, data):
        condition, created = MedicalCondition.objects.get_or_create(condition=data['condition'])
        return condition

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = ['allergen']

    def to_internal_value(self, data):
        allergen, created = Allergy.objects.get_or_create(allergen=data['allergen'])
        return allergen

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
        medical_conditions = validated_data.pop('medical_conditions')
        allergies = validated_data.pop('allergies')
        user = User.objects.create(**validated_data)
        
        # medical_conditions and allergies already contain instances, so no need to call get_or_create again
        user.medical_conditions.set(medical_conditions)
        user.allergies.set(allergies)

        return user

    def update(self, instance, validated_data):
        # Pop the related medical_conditions and allergies data
        medical_conditions_data = validated_data.pop('medical_conditions', [])
        allergies_data = validated_data.pop('allergies', [])

        # Update the basic fields
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

        # Update medical conditions
        instance.medical_conditions.clear()
        for condition in medical_conditions_data:
            if isinstance(condition, dict):
                condition_instance, created = MedicalCondition.objects.get_or_create(condition=condition['condition'])
            else:
                condition_instance = condition
            instance.medical_conditions.add(condition_instance)

        # Update allergies
        instance.allergies.clear()
        for allergy in allergies_data:
            if isinstance(allergy, dict):
                allergy_instance, created = Allergy.objects.get_or_create(allergen=allergy['allergen'])
            else:
                allergy_instance = allergy
            instance.allergies.add(allergy_instance)

        return instance

class EmergencyCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyCard
        fields = ['title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_title(self, value):
        # Custom validation example: ensure title is not empty and is at least 3 characters long
        if len(value) < 3:
            raise serializers.ValidationError("Title must be at least 3 characters long.")
        return value