import os
import glob

base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

# Replacements for the navigation links
replacements = {
    'href="/en/services.html"': 'href="/services.html"',
    'href="en/services.html"': 'href="/services.html"'
}

count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated links in {count} HTML files.")
