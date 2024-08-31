from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from TapSOS.serializers import UserSerializer, EmergencyCardSerializer  # Import the UserSerializer from serializers.py
from TapSOS.models.User import User
from TapSOS.models.EmergencyCard import EmergencyCard
from TapSOS.services.emergency_card_service import EmergencyCardService
from TapSOS.services.llm_service import LLMService
from config.env import OPENAI_API_KEY

class UserView(APIView):

    def post(self, request):
        
        """
        POST request to register a new user.
        1. Validate input data using the serializer.
        2. Save the validated data via the serializer.
        3. Return a response indicating success or failure.
        """
        # Validate Input
        serializer = UserSerializer(data=request.data)
        
        # Check if the data is valid
        if serializer.is_valid():
            # Data is valid, proceed to save the user
            serializer.save()  # This calls the create() method of the serializer
            
            # instantiate llm service
            llm_service = LLMService(OPENAI_API_KEY)

            # get response from llm in the form of json string, data won't be processed if not in the form of json string
            response = llm_service.generate_card(input_data=request.data)
            EmergencyCardService.create_emergency_card_with_user(response)

            # TODO: generate emergency cards
            EmergencyCardService.create_emergency_card_with_keyword()

            # Return Response
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
        # Retrieve the User
        user = get_object_or_404(User, pk=pk)
        
        # Validate Input
        serializer = UserSerializer(user, data=request.data)
        
        # Check if the data is valid
        if serializer.is_valid():
            # Data is valid, proceed to save the changes
            serializer.save()  # This calls the update() method of the serializer
            


            # Return Response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the data is not valid, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, pk=None):
        """
        GET request to retrieve user data and associated emergency cards.
        1. If pk is provided, retrieve the specific user and their emergency cards.
        2. If no pk is provided, list all users with their basic information.
        3. Return the user data with associated emergency cards in the response.
        """
        if pk:
            # Retrieve the specific user and their emergency cards
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(user)
            emergency_cards = EmergencyCard.objects.filter(user=user)
            card_serializer = EmergencyCardSerializer(emergency_cards, many=True)
            
            # Include emergency cards in the response
            response_data = serializer.data
            response_data['emergency_cards'] = card_serializer.data

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            # List all users with basic information
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
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
        # Retrieve All Cards
        cards = EmergencyCard.objects.all()
        
        # Serialize the Data
        serializer = EmergencyCardSerializer(cards, many=True)
        
        # Return the Response
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        """
        POST request to create a new emergency card.
        1. Validate the incoming data using the serializer.
        2. Save the validated data to the database.
        3. Return a response indicating success or failure.
        """
        # Validate Input
        serializer = EmergencyCardSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the validated data
            serializer.save()
            
            # Return a success response
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
        # Retrieve the existing emergency card
        card = get_object_or_404(EmergencyCard, pk=pk)
        
        #  Validate Input
        serializer = EmergencyCardSerializer(card, data=request.data)
        
        if serializer.is_valid():
            #  Save the updated data
            serializer.save()
            
            #  Return a success response
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
        # Retrieve the existing emergency card
        card = get_object_or_404(EmergencyCard, pk=pk)
        
        # Delete the card from the database
        card.delete()
        
        # Return a success response
        return Response(status=status.HTTP_204_NO_CONTENT)