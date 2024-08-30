import os
import sys
from dotenv import load_dotenv

project_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.append(project_dir)

prefix_to_clear = "SOS_"
keys_to_clear = [key for key in os.environ if key.startswith(prefix_to_clear)]
for key in keys_to_clear:
        del os.environ[key]

load_dotenv()

OPENAI_API_KEY = os.environ.get("SOS_OPENAI_API_KEY", '') # empty string as default

