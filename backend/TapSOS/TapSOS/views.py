from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from TapSOS.serializers import UserSerializer, EmergencyCardSerializer  # Import the UserSerializer from serializers.py
from TapSOS.models.User import User
from TapSOS.models.EmergencyCard import EmergencyCard
from TapSOS.services.emergency_card_service import EmergencyCardService
from backend.TapSOS.TapSOS.services.llm_service import LLMService

class UserView(APIView):

    def post(self, request):
        """
        POST request to register a new user.
        1. Validate input data using the serializer.
        2. Save the validated data via the serializer.
        3. Return a response indicating success or failure.
        """
        # Step 2: Validate Input
        serializer = UserSerializer(data=request.data)
        
        # Step 3: Check if the data is valid
        if serializer.is_valid():
            # Data is valid, proceed to save the user
            serializer.save()  # This calls the create() method of the serializer
            
            # TODO: LLMService.generate_response(request.data)
            response = LLMService.generate_card(request.data)
            
            EmergencyCardService.create_emergency_card(response)

            # Step 4: Return Response
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # If the data is not valid, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        """
        PUT request to update user data.
        1. Retrieve the user based on the provided ID (pk).
        2. Validate the incoming data using the serializer.
        3. Save the validated changes to the database.
        4. Return a response indicating success or failure.
        """
        # Step 2: Retrieve the User
        user = get_object_or_404(User, pk=pk)
        
        # Step 3: Validate Input
        serializer = UserSerializer(user, data=request.data)
        
        # Step 4: Check if the data is valid
        if serializer.is_valid():
            # Data is valid, proceed to save the changes
            serializer.save()  # This calls the update() method of the serializer
            


            # Step 5: Return Response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the data is not valid, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EmergencyCardView(APIView):
    """
    Handles retrieving all emergency cards.
    """

    def get(self, request):
        """
        GET request to retrieve all emergency cards.
        1. Retrieve all cards from the database.
        2. Serialize the data.
        3. Return the serialized data as JSON.
        """
        # Step 2: Retrieve All Cards
        cards = EmergencyCard.objects.all()
        
        # Step 3: Serialize the Data
        serializer = EmergencyCardSerializer(cards, many=True)
        
        # Step 4: Return the Response
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        """
        POST request to create a new emergency card.
        1. Validate the incoming data using the serializer.
        2. Save the validated data to the database.
        3. Return a response indicating success or failure.
        """
        # Step 2: Validate Input
        serializer = EmergencyCardSerializer(data=request.data)
        
        if serializer.is_valid():
            # Step 3: Save the validated data
            serializer.save()
            
            # Step 4: Return a success response
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # If the data is not valid, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        """
        PUT request to update an emergency card.
        1. Retrieve the emergency card based on the provided ID.
        2. Validate the incoming data using the serializer.
        3. Save the updated data to the database.
        4. Return a response indicating success or failure.
        """
        # Step 2: Retrieve the existing emergency card
        card = get_object_or_404(EmergencyCard, pk=pk)
        
        # Step 3: Validate Input
        serializer = EmergencyCardSerializer(card, data=request.data)
        
        if serializer.is_valid():
            # Step 4: Save the updated data
            serializer.save()
            
            # Step 5: Return a success response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the data is not valid, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        """
        DELETE request to remove an emergency card.
        1. Retrieve the emergency card based on the provided ID.
        2. Delete the emergency card from the database.
        3. Return a response indicating success or failure.
        """
        # Step 2: Retrieve the existing emergency card
        card = get_object_or_404(EmergencyCard, pk=pk)
        
        # Step 3: Delete the card from the database
        card.delete()
        
        # Step 4: Return a success response
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AIEmergencyCardView(APIView):
    """
    Handles the creation of an emergency card based on an AI-generated response.
    """

    def get(self, request):
        # Get the JSON string response from the AI model
        response_json = LLMService.generate_card(request)
        
        # Create an emergency card using the service
        card = EmergencyCardService.create_emergency_card_with_keyword(response_json)
        
        # Return the created card as a Response
        return Response({
            "status": "success",
            "message": "Emergency card created successfully.",
            "data": {
                "id": card.id,
                "title": card.title,
                "content": card.content,
                "created_at": card.created_at.isoformat(),
                "updated_at": card.updated_at.isoformat()
            }
        }, status=201)
    