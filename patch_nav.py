import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # English Replacement
    # Find: <a [^>]*>AI Tools</a>
    # Replace with: <a ...>AI Tools</a>\n                <a href="/en/academy.html" class="nav-link">Academy</a>
    
    en_pattern = r'(<a[^>]*>AI Tools</a>)'
    if re.search(en_pattern, content):
        # Only inject if not already injected
        if 'Academy</a>' not in content:
            # We want to match the indentation of the previous line
            content = re.sub(
                en_pattern,
                r'\1\n                <a href="/en/academy.html" class="nav-link">Academy</a>',
                content
            )

    # Spanish Replacement
    # Find: <a [^>]*>Herramientas IA</a>
    # Replace with: <a ...>Herramientas IA</a>\n                <a href="/es/academia.html" class="nav-link">Academia</a>
    
    es_pattern = r'(<a[^>]*>Herramientas IA</a>)'
    if re.search(es_pattern, content):
        if 'Academia</a>' not in content:
             content = re.sub(
                es_pattern,
                r'\1\n                <a href="/es/academia.html" class="nav-link">Academia</a>',
                content
            )

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def main():
    directory = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"
    for root, dirs, files in os.walk(directory):
        if ".gemini" in root or ".git" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
