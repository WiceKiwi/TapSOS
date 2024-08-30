from django.http import JsonResponse
from django.views import View
from TapSOS.services.user_service import UserService
from TapSOS.services.emergency_card_service import EmergencyCardService

class UserView(View):
    def get(self, request, user_id):
        user = UserService.get_user_by_id(user_id)
        return JsonResponse({
            'id': user.id,
            'name': user.name,
            'age': user.age,
            'gender': user.gender,
            # Add other fields as needed
        })

    def post(self, request):
        data = request.POST
        user = UserService.create_user(
            name=data.get('name'),
            age=data.get('age'),
            gender=data.get('gender'),
            dob=data.get('dob'),
            address=data.get('address'),
            blood_type=data.get('blood_type'),
            emergency_contact_number=data.get('emergency_contact_number'),
            emergency_contact_name=data.get('emergency_contact_name')
        )
        return JsonResponse({
            'id': user.id,
            'name': user.name,
        })

class EmergencyCardView(View):
    def get(self, request, card_id):
        card = EmergencyCardService.get_emergency_card_by_id(card_id)
        return JsonResponse({
            'id': card.id,
            'title': card.title,
            'content': card.content,
            'source': card.source,
            # Add other fields as needed
        })

    def post(self, request):
        data = request.POST
        user = UserService.get_user_by_id(data.get('user_id'))
        card = EmergencyCardService.create_emergency_card(
            user=user,
            title=data.get('title'),
            content=data.get('content'),
            source=data.get('source')
        )
        return JsonResponse({
            'id': card.id,
            'title': card.title,
        })
