import os
import glob
import re

base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

patterns_to_replace = [
    (r'href=[\'"][^\'"]*qqtube[^\'"]*[\'"]', 'href="/growth-campaign.html"'),
]

text_phrases = [
    r"activar\s+crecimiento",
    r"impulsar\s+cuenta",
    r"get\s+followers",
    r"boost\s+now"
]

a_tag_regex = re.compile(r'<a\s+[^>]*>.*?</a>', re.IGNORECASE | re.DOTALL)

count = 0
for filepath in html_files:
    if "node_modules" in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Replace qqtube directly
    for pat, new_href in patterns_to_replace:
        content = re.sub(pat, new_href, content, flags=re.IGNORECASE)
    
    # 2. Find all <a> tags, check their text, replace href if matching phrase.
    def replace_href_in_a(match):
        a_tag = match.group(0)
        
        # Remove a tag shell to get inner content
        inner_content = re.sub(r'</?a[^>]*>', '', a_tag, flags=re.IGNORECASE)
        # Remove all other tags like span, i, etc.
        plain_text = re.sub(r'<[^>]+>', '', inner_content).lower()
        
        for phrase in text_phrases:
            if re.search(phrase, plain_text):
                a_tag = re.sub(r'href=[\'"][^\'"]+[\'"]', 'href="/growth-campaign.html"', a_tag, count=1, flags=re.IGNORECASE)
                break
        return a_tag
        
    content = a_tag_regex.sub(replace_href_in_a, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated {filepath}")

print(f"Total updated: {count}")
