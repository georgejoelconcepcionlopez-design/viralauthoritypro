import os
import glob
from datetime import datetime

base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"

def generate_sitemap():
    domain = "https://viralauthority.com"
    html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
    
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for filepath in html_files:
        if "node_modules" in filepath or "partial" in filepath: continue
        
        rel_path = os.path.relpath(filepath, base_dir).replace("\\", "/")
        
        # Omit system files
        if rel_path in["template.html", "404.html"]: continue
            
        url_path = f"{domain}/{rel_path}"
        
        # Prioritize homepage and high level pages
        priority = "0.8"
        if rel_path == "index.html" or rel_path == "es/index.html" or rel_path == "en/index.html":
            priority = "1.0"
        elif "blog/" in rel_path and "index.html" in rel_path:
            priority = "0.9" # Category Hubs
        elif "services.html" in rel_path or "growth-campaign.html" in rel_path:
            priority = "0.9"
            
        mod_time = datetime.fromtimestamp(os.path.getmtime(filepath)).strftime('%Y-%m-%d')
        
        xml_content += "  <url>\n"
        xml_content += f"    <loc>{url_path}</loc>\n"
        xml_content += f"    <lastmod>{mod_time}</lastmod>\n"
        xml_content += "    <changefreq>weekly</changefreq>\n"
        xml_content += f"    <priority>{priority}</priority>\n"
        xml_content += "  </url>\n"
        
    xml_content += "</urlset>"
    
    sitemap_path = os.path.join(base_dir, "sitemap.xml")
    
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(xml_content)
        
    print(f"Sitemap successfully generated at {sitemap_path}")

generate_sitemap()
