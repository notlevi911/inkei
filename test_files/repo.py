import os
import requests
import base64
from dotenv import load_dotenv  # Make sure python-dotenv is installed

# Load environment variables from .env file
load_dotenv()

# GitHub repository details
OWNER = "Zephyrus2822"
REPO = "testrepo"
BRANCH = "main"

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

BASE_URL = f"https://api.github.com/repos/{OWNER}/{REPO}/contents/"
HEADERS = {"Authorization": f"Bearer {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

# Directory to save repository files
LOCAL_DIR = "repo_files"
os.makedirs(LOCAL_DIR, exist_ok=True)  # Ensure the folder exists

# Allowed file extensions (popular programming languages)
ALLOWED_EXTENSIONS = {"py", "js", "ts", "java", "c", "cpp", "cs", "html", "css", "json", "xml", "md"}

def list_files(path=""):
    """Recursively list all files in the GitHub repository and save them locally."""
    url = BASE_URL + path
    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        items = response.json()
        for item in items:
            if item["type"] == "file":
                if any(item["name"].endswith(f".{ext}") for ext in ALLOWED_EXTENSIONS):
                    print(f"📄 Downloading: {item['path']}")
                    save_file(item["path"])
                else:
                    print(f"⚠️ Skipping: {item['path']} (Unsupported file type)")
            elif item["type"] == "dir":
                list_files(item["path"])
    else:
        print(f"❌ Error: {response.status_code} - {response.text}")

def save_file(file_path):
    """Download and save file from GitHub repo to repo_files/."""
    url = BASE_URL + file_path
    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        content = response.json().get("content", "")
        decoded_content = base64.b64decode(content).decode("utf-8", errors="ignore")

        local_file_path = os.path.join(LOCAL_DIR, file_path.replace("/", "_"))  # Avoid nested folders
        with open(local_file_path, "w", encoding="utf-8") as f:
            f.write(decoded_content)
        print(f"✅ Saved: {local_file_path}")

    else:
        print(f"❌ Could not download {file_path}: {response.status_code}")

# Run the GitHub repo scanner
list_files()
