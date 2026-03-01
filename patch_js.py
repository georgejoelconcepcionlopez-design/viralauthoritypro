import os

paths = [
    r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores\ai-tools.html",
    r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores\es\ai-tools.html",
    r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores\en\ai-tools.html"
]

for p in paths:
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        
        updated = content.replace(
            'let ctaLink = "https://www.qqtube.com/?ref=2315017";',
            'let ctaLink = "/growth-campaign.html";'
        )
        
        if updated != content:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f"Patched JS string in {p}")
