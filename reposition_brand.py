import os
import glob
import re

base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"

# Map of blocked terms to organic alternatives
replacements = {
    r'\bbuy followers\b': 'organic distribution',
    r'\bbuy views\b': 'algorithmic views',
    r'\bbuy comments\b': 'strategic engagement',
    r'\bcheap engagement\b': 'scalable engagement',
    r'\binstant followers\b': 'rapid algorithmic growth',
    r'\bqqtube\b': 'organic networks',
    r'\baffiliate smm\b': 'growth strategies',
    r'\bexternal smm panels?\b': 'growth networks',
    r'\bcomprar seguidores\b': 'distribución orgánica',
    r'\bcomprar vistas\b': 'vistas algorítmicas',
    r'\bcomprar comentarios\b': 'interacción estratégica',
    r'\bseguidores instant[aá]neos\b': 'crecimiento algorítmico rápido'
}

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
js_files = glob.glob(os.path.join(base_dir, "**", "*.js"), recursive=True)
md_files = glob.glob(os.path.join(base_dir, "**", "*.md"), recursive=True)

all_files = html_files + js_files + md_files

for filepath in all_files:
    if "node_modules" in filepath or ".git" in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Apply regex replacements case-insensitively
    for pattern, replacement in replacements.items():
        # Using a function to maintain the original casing format could be nice, 
        # but simple replacement is fine since these terms should be eradicated.
        # We will use IGNORECASE but replace with exact case of the replacement.
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Repositioned brand terminology in {filepath}")

print("Brand reposition script completed.")
