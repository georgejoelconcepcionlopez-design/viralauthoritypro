import os
import re

def update_html_files(root_dir):
    favicon_tags = """    <link rel="icon" type="image/png" href="/assets/logo.png?v=2">
    <link rel="shortcut icon" href="/favicon.ico?v=2">
    <meta name="theme-color" content="#0f0f0f">"""

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()

                    # 1. Update Favicon / Head
                    # Remove old favicon/shortcut tags
                    content = re.sub(r'<link rel="(icon|shortcut icon)"[^>]*>', '', content)
                    # Keep existing meta theme-color if any, or remove for update
                    content = re.sub(r'<meta name="theme-color"[^>]*>', '', content)
                    
                    # Insert new tags after <head>
                    if '<head>' in content:
                        content = content.replace('<head>', '<head>\n' + favicon_tags)
                    
                    # 2. Update Blog Links
                    # Replace relative blog.html with absolute /blog.html
                    # Handle both single and double quotes
                    content = re.sub(r'href=["\'](\.\./)*blog\.html["\']', 'href="/blog.html"', content)
                    # Replace relative blog/ with absolute /blog/
                    content = re.sub(r'href=["\'](\.\./)*blog/', 'href="/blog/', content)

                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {file_path}")
                except Exception as e:
                    print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    update_html_files('c:\\Users\\georg\\Desktop\\pagina web de servicios de subcriptores')
