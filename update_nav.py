import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

for file in html_files:
    file = file.replace('\\', '/')
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if nav-links not present
    if '<nav class="nav-links">' not in content:
        continue

    # Skip if AI tools link already present in this file (unless we are fixing a bad link, but let's assume if it has "Herramientas IA" or "AI Tools" it's there. Actually, let's remove existing ai tools related links inside nav-links and re-insert properly).
    
    # Let's cleanly find the nav block
    nav_pattern = re.compile(r'(<nav class="nav-links">)(.*?)(</nav>)', re.DOTALL)
    
    def process_nav(match):
        start_tag = match.group(1)
        nav_content = match.group(2)
        end_tag = match.group(3)

        # Remove existing AI Tools links if any to prevent duplicates/bad links
        nav_content = re.sub(r'<a href="[^"]*ai-tools\.html"[^>]*>.*?</a>\s*', '', nav_content, flags=re.IGNORECASE)

        # Determine language & path based on file location and content
        is_spanish = ('Inicio' in nav_content or 'Servicios' in nav_content or 'Blog' in nav_content) and ('Inicio' in nav_content or 'Servicios' in nav_content)

        if '/es/' in '/' + file:
            ai_link = 'ai-tools.html'
            ai_text = 'Herramientas IA'
        elif '/en/' in '/' + file:
            ai_link = 'ai-tools.html'
            ai_text = 'AI Tools'
        elif '/blog/' in '/' + file:
            if is_spanish:
                ai_link = '../es/ai-tools.html'
                ai_text = 'Herramientas IA'
            else:
                ai_link = '../en/ai-tools.html'
                ai_text = 'AI Tools'
        elif '/legal/' in '/' + file:
            if is_spanish:
                ai_link = '../es/ai-tools.html'
                ai_text = 'Herramientas IA'
            else:
                ai_link = '../en/ai-tools.html'
                ai_text = 'AI Tools'
        else:
            # Root files
            if is_spanish:
                ai_link = 'es/ai-tools.html'
                ai_text = 'Herramientas IA'
            else:
                ai_link = 'en/ai-tools.html'
                ai_text = 'AI Tools'

        # If it's the tools page itself, maybe add text-white class
        nav_class = 'nav-link'
        if file.endswith('ai-tools.html'):
            nav_class = 'nav-link text-white'

        new_link = f'                <a href="{ai_link}" class="{nav_class}">{ai_text}</a>\n'

        # Find where to insert (before Blog)
        # We will split nav_content by lines and insert before the line with ">Blog</a>"
        lines = nav_content.split('\n')
        new_lines = []
        inserted = False
        for line in lines:
            if '>Blog</a>' in line and not inserted:
                new_lines.append(new_link.replace('\n', ''))
                inserted = True
            new_lines.append(line)
        
        # If Blog doesn't exist, just insert before contact or end
        if not inserted:
            # insert before Contact
            new_lines_fallback = []
            for line in new_lines:
                if '>Contact</a>' in line or '>Contacto</a>' in line:
                    new_lines_fallback.append(new_link.replace('\n', ''))
                    inserted = True
                new_lines_fallback.append(line)
            new_lines = new_lines_fallback

        return start_tag + '\n'.join(new_lines) + end_tag

    new_content = nav_pattern.sub(process_nav, content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')

print('Done!')
