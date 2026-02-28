import os
import glob
import shutil

categories = ['instagram', 'youtube', 'tiktok', 'spotify', 'monetizacion']
base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"

# 1. Restore the category index files to their folders (ES and EN)
for lang_prefix in ["", "en"]:
    for cat in categories:
        # Build the proper directory paths
        if lang_prefix:
            cat_dir = os.path.join(base_dir, lang_prefix, "blog", cat.lower())
            dest = os.path.join(cat_dir, "index.html")
            src = os.path.join(base_dir, lang_prefix, f"blog-{cat}.html")
        else:
            cat_dir = os.path.join(base_dir, "blog", cat.lower())
            dest = os.path.join(cat_dir, "index.html")
            src = os.path.join(base_dir, f"blog-{cat}.html")
            
        # Ensure the directory exists and is strictly lowercase
        os.makedirs(cat_dir, exist_ok=True)
        
        if os.path.exists(src):
            shutil.move(src, dest)
            print(f"Moved {src} to {dest}")
        else:
            if not os.path.exists(dest):
                print(f"Warning: Neither {src} nor {dest} exist!")
                # Create a blank one just in case as requested
                with open(dest, 'w', encoding='utf-8') as f:
                    f.write(f"<!-- Reserved for {cat} -->")
                print(f"Created fallback {dest}")
            else:
                print(f"{dest} already exists.")

# 2. Update all HTML files globally
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

# Reverse the replacements we made previously.
replacements = {
    'href="/blog-instagram.html"': 'href="/blog/instagram/"',
    'href="/blog-youtube.html"': 'href="/blog/youtube/"',
    'href="/blog-tiktok.html"': 'href="/blog/tiktok/"',
    'href="/blog-spotify.html"': 'href="/blog/spotify/"',
    'href="/blog-monetizacion.html"': 'href="/blog/monetizacion/"',
    
    'href="/en/blog-instagram.html"': 'href="/en/blog/instagram/"',
    'href="/en/blog-youtube.html"': 'href="/en/blog/youtube/"',
    'href="/en/blog-tiktok.html"': 'href="/en/blog/tiktok/"',
    'href="/en/blog-spotify.html"': 'href="/en/blog/spotify/"',
    'href="/en/blog-monetizacion.html"': 'href="/en/blog/monetizacion/"',
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
        print(f"Restored links in {filepath}")

print("Routing restore script completed.")
