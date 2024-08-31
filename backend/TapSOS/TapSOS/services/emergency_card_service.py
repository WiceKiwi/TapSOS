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

    # @staticmethod
    # def create_emergency_card_with_keyword(response_json):
        # try:
        #     # Parse the JSON string into a Python dictionary
        #     response = json.loads(response_json)
            
        #     # Extract title and content from the response
        #     title = response.get('title')
        #     content = response.get('content')

        #     if not title or not content:
        #         raise ValueError("The response from the AI model is missing 'title' or 'content'.")

        #     # Create a new EmergencyCard with the AI-generated content
        #     card = EmergencyCard(
        #         title=title,
        #         content=content
        #     )

        #     # Return the created card object
        #     return card
        
        # except json.JSONDecodeError:
        #     raise ValueError("Failed to parse JSON from the AI response.")
        
        # except Exception as e:
        #     raise Exception(f"An unexpected error occurred: {str(e)}")

    @staticmethod
    def create_emergency_card_with_keyword():
        # police
        EmergencyCard.objects.create(
            title='Assault',
            content='I\'m being assaulted.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Domestic Violence',
            content='I\'m a victim of domestic violence.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Robbery/Theft',
            content='I\'m being robbed.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Stalking/Harassment',
            content='I\'m being stalked.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Kidnapping/Abduction',
            content='I\'m being kidnapped.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Threat with a Weapon',
            content='I\'m being threatened with a weapon.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Suspicious Person',
            content='There\'s a suspicious person near me.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Sexual Assault',
            content='I\'m being sexually assaulted.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Burglary',
            content='Someone is breaking into my home.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Active Shooter',
            content='There\'s an active shooter.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Hate Crime',
            content='I\'m being attacked because of my identity.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Human Trafficking',
            content='I\'m a victim of human trafficking.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Vandalism',
            content='My property is being vandalized.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Disturbance/Fighting',
            content='There\'s a violent fight near me.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Missing Person',
            content='Someone I know is missing.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Hostage Situation',
            content='I\'m being held hostage.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Child Abuse',
            content='A child is being abused.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Elder Abuse',
            content='An elderly person is being abused.',
            source='police'
        )

        EmergencyCard.objects.create(
            title='Drug-Related Incident',
            content='There\'s drug-related activity happening.',
            source='police'
        )

        # ambulance

        EmergencyCard.objects.create(
            title='Severe Injury',
            content='I’m severely injured.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Heart Attack',
            content='I’m having a heart attack.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Stroke',
            content='I think I’m having a stroke.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Seizure',
            content='I’m having a seizure.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Severe Allergic Reaction',
            content='I’m having a severe allergic reaction.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Breathing Difficulty',
            content='I’m having trouble breathing.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Unconsciousness/Fainting',
            content='I’m feeling faint/unconscious.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Diabetic Emergency',
            content='I’m having a diabetic emergency.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Overdose',
            content='I’ve overdosed on drugs.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Poisoning',
            content='I’ve been poisoned.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Severe Burns',
            content='I have severe burns.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Drowning',
            content='Someone is drowning.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Severe Bleeding',
            content='I’m bleeding heavily.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Childbirth',
            content='I’m in labor and need help.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Mental Health Crisis',
            content='I’m in a mental health crisis.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Hypothermia/Heat Stroke',
            content='I’m suffering from hypothermia/heat stroke.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Choking',
            content='I’m choking.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Fracture/Broken Bone',
            content='I have a broken bone.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Electric Shock',
            content='I’ve been electrocuted.',
            source='ambulance'
        )

        EmergencyCard.objects.create(
            title='Animal Bite',
            content='I’ve been bitten by an animal.',
            source='ambulance'
        )
        
        # fire department
        EmergencyCard.objects.create(
            title='House/Building Fire',
            content='There’s a fire in my building/house.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Wildfire',
            content='There’s a wildfire near me.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Gas Leak',
            content='There’s a gas leak.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Electrical Fire',
            content='There’s an electrical fire.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Trapped in a Fire',
            content='I’m trapped in a fire.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Smoke Inhalation',
            content='I’m inhaling smoke.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Vehicle Fire',
            content='There’s a fire in a vehicle.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Hazardous Material Spill',
            content='There’s a hazardous material spill.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Explosion',
            content='There’s been an explosion.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Rescue Required',
            content='Someone is trapped and needs rescue.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Flooding',
            content='There’s flooding in my area.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Collapsed Structure',
            content='A building/structure has collapsed.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Tree Down/Power Line Down',
            content='A tree/power line is down.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Fire Alarm',
            content='The fire alarm is going off.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Carbon Monoxide Detection',
            content='There’s a carbon monoxide alert.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Chemical Fire',
            content='There’s a chemical fire.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Elevator Rescue',
            content='I’m trapped in an elevator.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Water Rescue',
            content='Someone needs water rescue.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Sinkhole',
            content='There’s a sinkhole.',
            source='fire_department'
        )

        EmergencyCard.objects.create(
            title='Storm Damage',
            content='There’s severe storm damage.',
            source='fire_department'
        )

        # combined
        EmergencyCard.objects.create(
            title='Car Accident',
            content='I’ve been in a car accident.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Domestic Abuse with Injury',
            content='I’m being abused and injured.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Terrorist Attack',
            content='There’s a terrorist attack happening.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Explosion',
            content='There has been an explosion.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Chemical Spill',
            content='There’s a chemical spill.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Building Collapse',
            content='A building has collapsed.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Hostage Situation with Injury',
            content='I’m being held hostage and injured.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Natural Disaster',
            content='I’m affected by a natural disaster.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Train/Plane Crash',
            content='There’s been a train/plane crash.',
            source='combined'
        )

        EmergencyCard.objects.create(
            title='Mass Casualty Incident',
            content='There’s a mass casualty incident.',
            source='combined'
        )

                

                
                
