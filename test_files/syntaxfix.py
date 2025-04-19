import os
import dotenv
import google.generativeai as genai

# Load API key from environment variables
dotenv.load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("\u274c ERROR: Missing Gemini API Key! Set GEMINI_API_KEY in .env file.")
    exit(1)

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Directories
LOCAL_DIR = "repo_files"
FIXED_DIR = "fixed_repo_files"

# Ensure fixed_repo_files directory exists
os.makedirs(FIXED_DIR, exist_ok=True)

# Supported file extensions and their programming languages
LANG_MAP = {
    "py": "Python",
    "js": "JavaScript",
    "ts": "TypeScript",
    "java": "Java",
    "c": "C",
    "cpp": "C++",
    "cs": "C#",
    "html": "HTML",
    "css": "CSS"
}

def correct_syntax_with_ai(file_path, fixed_path):
    """Use Gemini AI to fix syntax errors in a given file and save corrected version."""
    file_extension = file_path.split(".")[-1]
    language = LANG_MAP.get(file_extension, None)

    if not language:
        print(f"⚠️ Skipping unsupported file: {file_path}")
        return

    print(f"🔧 Fixing syntax for {file_path} ({language})...")

    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    prompt = f"""
    You are an AI code assistant specializing in fixing syntax errors.
    Given a piece of {language} code, analyze it and return the corrected version.

    **Code with errors:**
    ```
    {code}
    ```

    **Return only the fixed code in {language} format.**
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        fixed_code = response.text.strip()

        with open(fixed_path, "w", encoding="utf-8") as f:
            f.write(fixed_code)

        print(f"✅ Fixed syntax and saved at: {fixed_path}")

    except Exception as e:
        print(f"\u274c Error processing {file_path}: {e}")

def process_files():
    """Process all source code files in repo_files and apply AI-based syntax correction."""
    if not os.path.exists(LOCAL_DIR):
        print(f"\u274c ERROR: Directory '{LOCAL_DIR}' does not exist. Run repo_scanner.py first.")
        return

    for filename in os.listdir(LOCAL_DIR):
        file_path = os.path.join(LOCAL_DIR, filename)
        fixed_path = os.path.join(FIXED_DIR, filename)

        if any(filename.endswith(ext) for ext in LANG_MAP.keys()):
            correct_syntax_with_ai(file_path, fixed_path)

# Run syntax fixer
process_files()
