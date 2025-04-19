import google.generativeai as genai
import dotenv
import os

dotenv.load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY, transport="rest")

models = genai.list_models()
for model in models:
    print(model.name)
