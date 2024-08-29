# move somewhere later
from openai import OpenAI
from dotenv import load_dotenv
import os
from config.env import OPENAI_API_KEY

load_dotenv()

def generate_sentence(word_list):
    client = OpenAI(
        api_key=OPENAI_API_KEY,
    )

    openai_instructions = '''
    reply with 'hello, how are you?'
    '''

    input_text = " ".join(word_list)

    response = client.chat.completions.create(
        model='gpt-4o',
        messages=[
            {"role": "system", "content": f'{openai_instructions}'},
            {"role": "user", "content": f'{input_text}'}
        ]
    )

    generated_sentence = response.choices[0].message.content

    return generated_sentence

if __name__ == "__main__":
    # EXAMPLE ONLY
    result = generate_sentence("hi") 
    # print(result)