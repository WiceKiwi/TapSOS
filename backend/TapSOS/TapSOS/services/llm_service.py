# move somewhere later
import sys
import os

project_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.append(project_dir)

from openai import OpenAI
from config.env import OPENAI_API_KEY

class LLMService:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    def generate_card(self, input_data):
        # edit instructions
        openai_instructions_card_generation = '''
    Purpose: Create emergency cards for non-verbal individuals (PWD) to communicate vital information quickly.
    Input: Personal details, including medical conditions and allergies.
    Output: Start with list, then { } for each (similar to JSON format):
        title: Short and clear
        content: A brief, direct message indicating that the person is currently facing the described emergency and specifying the appropriate help to call 
        if condition seemed not very severe, can call the person's emergency contact (family member). 
                Should begin with stating the medical conditions related to the incident IF its related.
    Additional card with 'crime related' as title, separated by , for each card (similar to JSON format). 
    By the end of each sentence, add "you can view my personal medication info here".
    Based on the context, specify the appropriate emergency number in Singapore.
        '''

        input_text = " ".join(input_data)

        response = self.client.chat.completions.create(
            model='gpt-4o',
            messages=[
                {"role": "system", "content": f'{openai_instructions_card_generation}'},
                {"role": "user", "content": f'{input_text}'}
            ]
        )

        generated_card = response.choices[0].message.content

        # print(generated_card)
        return generated_card