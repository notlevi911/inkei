from flask import Flask, request, jsonify
import requests
import os
import base64
from io import BytesIO

try:
    import pytesseract  # for OCR on images
    from PIL import Image
except ImportError:
    pytesseract = None  # handle case where OCR tools are not installed

app = Flask(__name__)

def parse_input_files(inputs):
    """
    Read and aggregate content from given input paths or URLs.
    Supports markdown, text, images (with OCR), and GitHub repo URLs.
    Returns a combined text string.
    """
    combined_text = ""
    for item in inputs:
        content = ""
        if isinstance(item, dict) and 'url' in item:
            # Handle URLs
            content = fetch_content_from_url(item['url'])
        elif isinstance(item, dict) and 'filename' in item and 'content' in item:
            # Handle file uploads
            file_data = base64.b64decode(item['content'])
            ext = os.path.splitext(item['filename'])[1].lower()
            if ext in [".md", ".markdown", ".txt"]:
                content = file_data.decode('utf-8')
            elif ext in [".png", ".jpg", ".jpeg"]:
                content = ocr_image_from_bytes(file_data)
            else:
                print(f"Note: Skipping unsupported file type {item['filename']}")
                continue
        elif isinstance(item, str) and (item.startswith("http://") or item.startswith("https://")):
            # Handle plain URL strings
            content = fetch_content_from_url(item)
        else:
            print(f"Warning: Invalid input format: {item}")
            continue
            
        if content:
            if isinstance(item, dict) and 'filename' in item:
                source = item['filename']
            elif isinstance(item, dict) and 'url' in item:
                source = item['url']
            else:
                source = item
            combined_text += f"\n\n--- Content from {source} ---\n{content}"
    return combined_text.strip()

def ocr_image_from_bytes(image_bytes):
    """Extract text from image bytes using OCR (pytesseract)."""
    if pytesseract is None:
        return "OCR support not available (pytesseract not installed)."
    try:
        img = Image.open(BytesIO(image_bytes))
        text = pytesseract.image_to_string(img)
        return text.strip()
    except Exception as e:
        print(f"Error during OCR: {e}")
        return ""

def fetch_content_from_url(url):
    """Fetch content from a URL. Handles GitHub repository URLs specially."""
    try:
        if "github.com" in url:
            # If it's a GitHub repo URL (not raw), attempt to get README.md from default branch
            raw_url = None
            if url.endswith("/"):  # remove trailing slash
                url = url[:-1]
            if url.count('/') >= 4:
                # Assume format: https://github.com/owner/repo[/something]
                parts = url.split('/')
                owner = parts[3]
                repo = parts[4] if len(parts) > 4 else ""
                if repo:
                    # Try default branches for README
                    for branch in ["main", "master"]:
                        candidate = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md"
                        resp = requests.get(candidate)
                        if resp.status_code == 200:
                            raw_url = candidate
                            break
            if raw_url is None:
                # Not a straightforward repo main page or README not found, try direct fetch
                resp = requests.get(url)
                if resp.status_code != 200:
                    return f"Failed to fetch URL {url} (status {resp.status_code})"
                return resp.text
            else:
                # Fetch the raw README content
                resp = requests.get(raw_url)
                if resp.status_code == 200:
                    return resp.text
                else:
                    return f"Failed to fetch README from {raw_url}"
        else:
            # Generic URL (could be raw text or other)
            resp = requests.get(url)
            if resp.status_code == 200:
                return resp.text
            else:
                return f"Failed to fetch URL {url} (status {resp.status_code})"
    except Exception as e:
        return f"Error fetching URL {url}: {e}"

def detect_tech_stack_locally(text):
    """
    Basic heuristic to find tech stack keywords in the text.
    Returns a set of detected technology names.
    """
    tech_keywords = [
        "React", "Angular", "Vue", "Svelte", "JavaScript", "TypeScript",
        "Node.js", "Express", "Django", "Flask", "Ruby on Rails", "Laravel",
        "PHP", "MongoDB", "MySQL", "PostgreSQL", "Docker", "Kubernetes",
        "AWS", "Azure", "GCP", "Kotlin", "Swift", "Android", "iOS", "React Native",
        "Flutter", "Redis", "GraphQL", "REST", "GraphQL", "HTML", "CSS"
    ]
    detected = set()
    text_lower = text.lower()
    for tech in tech_keywords:
        if tech.lower() in text_lower:
            detected.add(tech)
    return detected

def evaluate_tech_stack(stack_list):
    """
    Simple evaluation of tech stack suitability.
    Returns (is_suitable, suggestions_list).
    """
    if not stack_list:
        return True, []  # no tech identified to evaluate
    suggestions = []
    # Example heuristic: suggest modern alternatives if outdated tech is found
    outdated = {"PHP": "Consider using a modern framework (e.g., Django, Node.js) for better scalability.",
                "Laravel": "Laravel is fine for many cases, but ensure to optimize for scalability or consider Node/Django for large scale.",
                "jQuery": "jQuery is outdated for complex apps – consider modern JS frameworks like React or Angular for better maintainability.",
                "Flask": "Flask is lightweight; for large apps, a more scalable framework (Django, FastAPI) or microservices might help."}
    is_suitable = True
    for tech in stack_list:
        # If any tech is in the outdated dict, mark as possibly not ideal
        if tech in outdated:
            is_suitable = False
            suggestions.append(outdated[tech])
    return is_suitable, suggestions

def breakdown_features_into_subtasks(feature_list):
    """
    Placeholder function to break features into subtasks.
    Uses dummy logic for now; in a real scenario this would call Gemini.
    Returns a dict: {feature: [(subtask_desc, story_points, reason), ...], ...}
    """
    subtasks_plan = {}
    for feature in feature_list:
        subtasks = []
        # Dummy subtasks for demonstration
        subtasks.append((f"Design/Plan: {feature}", 1, "Planning and design for this feature (minimal effort)."))
        subtasks.append((f"Implement: {feature}", 5, "Core implementation of this feature (moderate complexity)."))
        subtasks.append((f"Test & Review: {feature}", 3, "Testing and code review (some complexity)."))
        subtasks_plan[feature] = subtasks
    return subtasks_plan

def call_gemini_for_features(text):
    """Simulate calling Gemini API to extract feature ideas from text."""
    # In a real implementation, we would send 'text' with a prompt to Gemini.
    # Here we just simulate by simple heuristic: treat headings or bullet points as features.
    lines = text.splitlines()
    features = []
    for line in lines:
        line_clean = line.strip("-*# ").strip()  # remove bullet or heading markers
        if not line_clean:
            continue
        # Assume lines that start with a capital letter or appear as a short sentence could be features
        if line.startswith("-") or line.startswith("*") or line.startswith("#"):
            features.append(line_clean)
    # Fallback: if none found, consider entire text as one feature (not realistic, but placeholder)
    if not features and text:
        features = [text.strip()[:60] + "..."]  # first 60 chars as a summary
    return features

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    API endpoint to analyze product features from provided content.
    Accepts JSON body with 'inputs' key.
    """
    data = request.get_json()
    
    if not data or 'inputs' not in data:
        return jsonify({"error": "No inputs provided"}), 400
    
    inputs = data['inputs']
    if not isinstance(inputs, list):
        return jsonify({"error": "Inputs must be an array"}), 400
    
    # Parse and aggregate content from inputs
    combined_text = parse_input_files(inputs)
    if not combined_text:
        return jsonify({"error": "No content to analyze"}), 400

    # Step 1: Extract feature ideas and requirements
    features = call_gemini_for_features(combined_text)
    features = [f for f in features if f]

    # Step 2: Detect mentioned or implied tech stack
    detected_stack = detect_tech_stack_locally(combined_text)
    tech_stack_list = sorted(detected_stack)

    # Step 3: Evaluate tech stack suitability for scalability
    is_suitable, suggestions = evaluate_tech_stack(tech_stack_list)

    # Step 4: Break each feature into subtasks (Agile/Scrum style)
    subtasks_plan = breakdown_features_into_subtasks(features)

    # Format subtasks for JSON response
    formatted_subtasks = {}
    for feat, subtasks in subtasks_plan.items():
        formatted_subtasks[feat] = []
        for (task, points, reason) in subtasks:
            formatted_subtasks[feat].append({
                "task": task,
                "story_points": points,
                "reason": reason
            })

    # Return structured JSON response
    return jsonify({
        "features": features,
        "tech_stack": tech_stack_list,
        "is_tech_suitable": is_suitable,
        "suggestions": suggestions,
        "subtasks": formatted_subtasks
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)