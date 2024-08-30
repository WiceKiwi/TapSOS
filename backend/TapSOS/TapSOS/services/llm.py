# move somewhere later
import sys
import os

project_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.append(project_dir)

from openai import OpenAI
from dotenv import load_dotenv

from config.env import OPENAI_API_KEY


load_dotenv()

def generate_sentence(input):
    client = OpenAI(
        api_key=OPENAI_API_KEY,
    )

    #edit instructions
    openai_instructions = '''
    reply with 'hello, how are you?'
    '''

    input_text = " ".join(input)

    response = client.chat.completions.create(
        model='gpt-4o',
        messages=[
            {"role": "system", "content": f'{openai_instructions}'},
            {"role": "user", "content": f'{input_text}'}
        ]
    )

    generated_sentence = response.choices[0].message.content

    print(generated_sentence)
    return generated_sentence

if __name__ == "__main__":
    # EXAMPLE ONLY
    result = generate_sentence("hi") 
    # print(result)