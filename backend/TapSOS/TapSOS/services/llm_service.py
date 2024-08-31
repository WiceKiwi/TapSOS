# move somewhere later
import sys
import os
import json

project_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.append(project_dir)
from config.env import OPENAI_API_KEY

from openai import OpenAI

class LLMService:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    def get_llm_response(self, instruction, input_text):
        response = self.client.chat.completions.create(
            model='gpt-4o',
            messages=[
                {"role": "system", "content": f'{instruction}'},
                {"role": "user", "content": f'{input_text}'}
            ]
        )

        return response

    def generate_card(self, input_data):

        openai_instructions_card_generation = '''
        Purpose: Create emergency cards for non-verbal individuals (PWD) to communicate vital information quickly.
        Input: Personal details, including medical conditions and allergies.
        Output: A list of objects in JSON format, where each object includes:
            - title: A short and clear description of the emergency.
            - content: A brief, direct message indicating that the person is currently facing the described emergency and specifying the appropriate help to call. 
                   If the condition seems not very severe, suggest calling the person's emergency contact (family member).
                   Start with stating the medical conditions related to the incident, if applicable.
                   End each sentence with "You can view my personal medication info here."
        Also, include an additional card with the title 'Crime Related'.
        Ensure all cards specify the appropriate emergency number in Singapore based on the context.
        DON'T INCLUDE ```json and ``` at start and end of it. 
        '''

        response = self.get_llm_response(openai_instructions_card_generation, input_data)

        generated_card = response.choices[0].message.content
        print(generated_card)
        return generated_card
    
if __name__ == "__main__":
    service = LLMService(api_key=OPENAI_API_KEY)
    res = service.generate_card("allergies = peanuts")
