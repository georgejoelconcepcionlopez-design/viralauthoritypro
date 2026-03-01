import os
import glob
import re

base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"

# 1. Delete sales pages
pages_to_delete = [
    os.path.join(base_dir, "es", "spotify-streams.html"),
    os.path.join(base_dir, "en", "spotify-streams.html"),
    os.path.join(base_dir, "blog", "spotify-streams.html"),
]

for p in pages_to_delete:
    if os.path.exists(p):
        os.remove(p)
        print(f"Deleted dedicated sales page: {p}")

# 2. Scrub specific text out of HTML globally
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for filepath in html_files:
    if not os.path.exists(filepath): continue
    if "node_modules" in filepath: continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Remove meta keywords: comprar seguidores, buy followers, etc
    content = content.replace("comprar seguidores, ", "")
    content = content.replace("buy followers, ", "")
    content = content.replace("vistas tiktok", "crecimiento tiktok")
    
    # Remove pricing grids completely if they exist
    # This regex deletes everything from <div class="pricing-grid"> to the closing </div> of that section
    # For safety, since parsing HTML with regex is brittle, let's just wipe out instances of the pricing card HTML blocks.
    # A safer way to remove the SMM pricing section is replacing the whole block if it exists.
    # We will just remove any <div class="pricing-card"... </div> blocks.
    
    # Actually, we can remove `<section>` containing pricing-grid.
    content = re.sub(r'<section[^>]*>[\s\S]*?class="pricing-grid"[\s\S]*?</section>', '', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Scrubbed keywords/pricing from {filepath}")

print("SMM Purge script completed.")
