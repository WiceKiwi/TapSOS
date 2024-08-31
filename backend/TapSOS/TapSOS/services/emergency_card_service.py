from TapSOS.models.EmergencyCard import EmergencyCard
import json
from django.http import JsonResponse

class EmergencyCardService:
    @staticmethod
    def create_emergency_card_with_user(response):
        try:
            # Convert the JSON string into a list of dictionaries
            cards_data = json.loads(response)
            

            for card_data in cards_data:
                EmergencyCard.objects.create(
                    title=card_data['title'],
                    content=card_data['content'],
                    source='custom'
                )
                
            return JsonResponse({"status": "success", "message": "Cards created successfully!"}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format."}, status=400)
        
        except KeyError:
            return JsonResponse({"status": "error", "message": "Missing required fields in JSON."}, status=400)

    @staticmethod
    def create_emergency_card_with_keyword():
        # Create a new EmergencyCard with the AI-generated content
        EmergencyCard.objects.create(
                title='heart attack',
                content='im deaf',
                source='emergency'
            )
        EmergencyCard.objects.create(
                title='asthma',
                content='im blind',
                source='emergency'
            )

