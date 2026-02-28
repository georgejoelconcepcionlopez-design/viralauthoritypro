import os
import glob
import shutil

# 1. Move the category index files to root and rename them
categories = ['instagram', 'youtube', 'tiktok', 'spotify', 'monetizacion']
base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"

for cat in categories:
    src = os.path.join(base_dir, "blog", cat, "index.html")
    dest = os.path.join(base_dir, f"blog-{cat}.html")
    if os.path.exists(src):
        shutil.move(src, dest)
        print(f"Moved {src} to {dest}")
    else:
        print(f"Source not found: {src}")

# 2. Update all HTML files globally
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

replacements = {
    'href="/blog/instagram/"': 'href="/blog-instagram.html"',
    'href="/blog/youtube/"': 'href="/blog-youtube.html"',
    'href="/blog/tiktok/"': 'href="/blog-tiktok.html"',
    'href="/blog/spotify/"': 'href="/blog-spotify.html"',
    'href="/blog/monetizacion/"': 'href="/blog-monetizacion.html"',
    
    'href="/blog/instagram"': 'href="/blog-instagram.html"',
    'href="/blog/youtube"': 'href="/blog-youtube.html"',
    'href="/blog/tiktok"': 'href="/blog-tiktok.html"',
    'href="/blog/spotify"': 'href="/blog-spotify.html"',
    'href="/blog/monetizacion"': 'href="/blog-monetizacion.html"',
    
    'href="/en/blog/instagram/"': 'href="/en/blog-instagram.html"',
    'href="/en/blog/youtube/"': 'href="/en/blog-youtube.html"',
    'href="/en/blog/tiktok/"': 'href="/en/blog-tiktok.html"',
    'href="/en/blog/spotify/"': 'href="/en/blog-spotify.html"',
    'href="/en/blog/monetizacion/"': 'href="/en/blog-monetizacion.html"',
}

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in {filepath}")

print("Routing update script completed.")
