import os

# Base Directories
base_dir = r"c:\Users\georg\Desktop\pagina web de servicios de subcriptores"
locales = ["", "es", "en"]

# Course Configuration
courses = {
    "tiktok": {
        "title": "TikTok Viral Growth Mastery",
        "subtitle": "Domina el algoritmo de TikTok y alcanza audiencias masivas.",
        "badge": "Short-Form Specialist",
        "accent": "#00f2ea",
        "accent_grad": "linear-gradient(45deg, #fe2c55, #25f4ee)",
        "modules": [
            {
                "name": "Módulo 1: Algoritmo TikTok",
                "lessons": [
                    {"title": "Psicología del For You Page", "content": "Entiende cómo TikTok clasifica tu contenido por intereses y comportamiento."},
                    {"title": "Métricas de Retención Clave", "content": "Watch time vs. Shares: Qué importa más para viralizar hoy."},
                    {"title": "Cohortes de Tráfico", "content": "Cómo pasar de 200 vistas a millones mediante pruebas de audiencia."}
                ]
            },
            {
                "name": "Módulo 2: Hooks y Retención",
                "lessons": [
                    {"title": "Hooks Visuales que detienen el scroll", "content": "Técnicas de 2 segundos para captar la atención inmediata."},
                    {"title": "Storytelling en 15 segundos", "content": "Cómo estructurar una narrativa rápida que mantenga el interés."},
                    {"title": "Edición Viral Fast-Cut", "content": "Uso de SFX y cortes rápidos para maximizar el engagement."}
                ]
            },
            {
                "name": "Módulo 3: Monetización TikTok",
                "lessons": [
                    {"title": "Creativity Program Beta", "content": "Estrategias para monetizar contenido de más de 1 minuto."},
                    {"title": "TikTok Shop & Afiliados", "content": "Venta directa de productos sin stock mediante contenido orgánico."},
                    {"title": "Brand Deals y UGC", "content": "Cómo trabajar con marcas siendo un creador de contenido vertical."}
                ]
            }
        ]
    },
    "youtube": {
        "title": "YouTube Authority Hub",
        "subtitle": "Crea un canal perdurable, optimiza tu SEO y domina la plataforma.",
        "badge": "Long-Form Authority",
        "accent": "#FF0000",
        "accent_grad": "linear-gradient(45deg, #FF0000, #cc0000)",
        "modules": [
            {
                "name": "Módulo 1: Canal Optimizado",
                "lessons": [
                    {"title": "Nicho y Branding de Canal", "content": "Define tu identidad visual y temática para atraer al espectador correcto."},
                    {"title": "Optimización SEO (Metadata)", "content": "Títulos, Tags y Descripciones que posicionan tus videos en Google."},
                    {"title": "Estrategia de Miniaturas (CTR)", "content": "Psicología del clic: Cómo diseñar portadas que nadie pueda ignorar."}
                ]
            },
            {
                "name": "Módulo 2: SEO y Retención",
                "lessons": [
                    {"title": "El algoritmo de YouTube 2026", "content": "Sistemas de recomendación y cómo alimentar a la IA de YouTube."},
                    {"title": "Guionización de Alta Retención", "content": "Mantén a la audiencia conectada hasta el final del video."},
                    {"title": "YouTube Shorts para crecimiento", "content": "Uso estratégico de contenido vertical para atraer suscriptores al canal principal."}
                ]
            },
            {
                "name": "Módulo 3: Monetización YouTube",
                "lessons": [
                    {"title": "Ingresos por AdSense", "content": "Maximiza tu CPM y RPM mediante optimización de temática."},
                    {"title": "Membresías y Super Chat", "content": "Construye una comunidad que apoye tu canal directamente."},
                    {"title": "High-Ticket Brand Integration", "content": "Negociación de patrocinios integrados de alto valor."}
                ]
            }
        ]
    },
    "spotify": {
        "title": "Spotify Artist Growth Strategy",
        "subtitle": "Lleva tu música al siguiente nivel en la era del streaming.",
        "badge": "Music Strategy",
        "accent": "#1DB954",
        "accent_grad": "linear-gradient(45deg, #1DB954, #191414)",
        "modules": [
            {
                "name": "Módulo 1: Branding Musical",
                "lessons": [
                    {"title": "Perfil de Artista Verificado", "content": "Configuración profesional de Spotify for Artists y visuales."},
                    {"title": "Identidad Visual y Canvas", "content": "Uso de videos cortos en loop para aumentar el recuerdo de marca."},
                    {"title": "Optimización de Biografía y Links", "content": "Convierte oyentes en fans seguidores con un perfil coherente."}
                ]
            },
            {
                "name": "Módulo 2: Estrategia de Playlists",
                "lessons": [
                    {"title": "Algorithmic Playlists (Discover Weekly)", "content": "Cómo 'hackear' el algoritmo de Spotify para entrar en radio y descubrimiento."},
                    {"title": "Editorial Pitching", "content": "La forma correcta de enviar tu música a los curadores de Spotify."},
                    {"title": "Third-Party & User Playlisting", "content": "Estrategias de red con influencers de playlists independientes."}
                ]
            },
            {
                "name": "Módulo 3: Monetización Musical",
                "lessons": [
                    {"title": "Royalties y Distribución", "content": "Entiende cómo cobras cada stream y cómo maximizar tus regalías."},
                    {"title": "Venta de Merch e Integraciones", "content": "Uso de Shopify y Fan links para vender directamente desde la app."},
                    {"title": "Estrategia de Lanzamiento Cascada", "content": "Maximiza el momentum acumulando streams en lanzamientos sucesivos."}
                ]
            }
        ]
    },
    "monetization": {
        "title": "Monetization Mastery Program",
        "subtitle": "Transforma tu influencia en un imperio digital rentable.",
        "badge": "Income Architect",
        "accent": "#FFD700",
        "accent_grad": "linear-gradient(45deg, #FFD700, #FFA500)",
        "modules": [
            {
                "name": "Módulo 1: Modelos de Ingresos",
                "lessons": [
                    {"title": "Ingresos Activos vs Pasivos", "content": "Identifica las fuentes de ingresos que escalan sin tu tiempo."},
                    {"title": "Ads, Afiliados y Patrocinios", "content": "El mix perfecto para diversificar riesgos y maximizar beneficios."},
                    {"title": "Modelos de Suscripción (Recurrencia)", "content": "Construye ingresos mensuales predecibles con comunidades de pago."}
                ]
            },
            {
                "name": "Módulo 2: Construcción de Marca",
                "lessons": [
                    {"title": "Autoridad y Posicionamiento", "content": "Conviértete en el referente de tu nicho para cobrar precios premium."},
                    {"title": "Embudo de Ventas Orgánico", "content": "Cómo guiar a un seguidor curioso hacia una compra de alto valor."},
                    {"title": "Copywriting que Vende", "content": "Palabras y gatillos mentales que aumentan tus conversiones."}
                ]
            },
            {
                "name": "Módulo 3: Escalamiento y Automatización",
                "lessons": [
                    {"title": "Sistemas de Negocio Digital", "content": "Uso de IA y herramientas para operar sin intervención manual."},
                    {"title": "Delegación y Equipo", "content": "Cuándo y cómo contratar para dejar de ser un autoempleado."},
                    {"title": "Inversión en Crecimiento", "content": "Cómo reinvertir tus beneficios para escalar a las 6 cifras."}
                ]
            }
        ]
    }
}

template_html = """<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | ViralAuthority Academy</title>
    <meta name="description" content="{desc}">
    <link rel="stylesheet" href="{css_path}styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {{
            --accent-page: {accent};
            --surface-dark: #0a0a0a;
            --border-glow: rgba({accent_rgb}, 0.3);
        }}

        .academy-course-hero {{
            padding: 12rem 0 6rem;
            background: radial-gradient(circle at top right, rgba({accent_rgb}, 0.1), transparent),
                        radial-gradient(circle at bottom left, rgba(54, 83, 229, 0.05), transparent);
            text-align: center;
        }}

        .course-badge {{
            display: inline-block;
            padding: 0.5rem 1.2rem;
            background: rgba({accent_rgb}, 0.1);
            color: var(--accent-page);
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1.5rem;
            border: 1px solid var(--border-glow);
        }}

        .progress-container {{
            max-width: 600px;
            margin: 3rem auto 0;
            background: rgba(255, 255, 255, 0.03);
            padding: 1.5rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }}

        .progress-stats {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            font-size: 0.9rem;
            font-weight: 600;
        }}

        .progress-bar-bg {{
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }}

        .progress-bar-fill {{
            height: 100%;
            background: {accent_grad};
            width: 0%;
            transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }}

        .learning-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }}

        .learning-card {{
            background: var(--surface-dark);
            padding: 2rem;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: transform 0.3s ease;
        }}

        .learning-card:hover {{
            transform: translateY(-5px);
            border-color: var(--border-glow);
        }}

        .learning-card i {{
            font-size: 2rem;
            color: var(--accent-page);
            margin-bottom: 1.5rem;
        }}

        .curriculum-section {{
            max-width: 900px;
            margin: 6rem auto;
        }}

        .module-accordion {{
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            overflow: hidden;
            background: #0f0f0f;
        }}

        .module-header {{
            padding: 1.5rem 2rem;
            background: rgba(255, 255, 255, 0.02);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: background 0.3s ease;
        }}

        .module-header:hover {{
            background: rgba(255, 255, 255, 0.04);
        }}

        .module-info h3 {{
            margin: 0;
            font-size: 1.25rem;
        }}

        .module-info span {{
            font-size: 0.85rem;
            color: var(--text-muted);
        }}

        .lesson-list {{
            padding: 0;
            list-style: none;
            display: none;
        }}

        .lesson-item {{
            padding: 1.5rem 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            transition: background 0.3s ease;
        }}

        .lesson-item:hover {{
            background: rgba(255, 255, 255, 0.01);
        }}

        .lesson-trigger {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }}

        .lesson-title {{
            display: flex;
            align-items: center;
            gap: 1rem;
        }}

        .lesson-content {{
            display: none;
            padding-top: 1.5rem;
            color: var(--text-muted);
            line-height: 1.7;
        }}

        .video-placeholder {{
            width: 100%;
            aspect-ratio: 16/9;
            background: #1a1a1a;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            position: relative;
        }}

        .video-placeholder::before {{
            content: '\\f04b';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 3rem;
            color: rgba(255, 255, 255, 0.1);
        }}

        .complete-checkbox {{
            width: 24px;
            height: 24px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }}

        .complete-checkbox.checked {{
            background: var(--accent-page);
            border-color: var(--accent-page);
        }}

        .complete-checkbox.checked::after {{
            content: '\\f00c';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 12px;
            color: white;
        }}

        .module-accordion.active .lesson-list {{ display: block; }}
        .lesson-item.active .lesson-content {{ display: block; }}
        .module-header i.fa-chevron-down {{ transition: transform 0.3s ease; }}
        .module-accordion.active .module-header i.fa-chevron-down {{ transform: rotate(180deg); }}

        .btn-start {{
            background: var(--accent-page);
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 100px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }}

        .btn-start:hover {{
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }}
    </style>
</head>
<body>
    <header class="header">
        <div class="container nav-container">
            <a href="{home_link}" class="logo">
                <div class="logo-icon"><i class="fas fa-bolt text-white"></i></div>
                ViralAuthority
            </a>
            <nav class="nav-links">
                <a href="{home_link}" class="nav-link">{nav_home}</a>
                <a href="{services_link}" class="nav-link">{nav_services}</a>
                <a href="{academy_link}" class="nav-link active">{nav_academy}</a>
                <a href="{blog_link}" class="nav-link">Blog</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="academy-course-hero">
            <div class="container reveal">
                <span class="course-badge">{course_badge}</span>
                <h1 class="hero-h1">{course_title_split}</h1>
                <p class="hero-subtitle">{course_subtitle}</p>
                <a href="#curriculum" class="btn-start">{cta_start}</a>

                <div class="progress-container">
                    <div class="progress-stats">
                        <span>{progress_label}</span>
                        <span id="progress-text">0%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" id="progress-fill"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="reveal text-center" style="margin-bottom: 4rem;">
                    <h2 class="hero-h1" style="font-size: 2.5rem;">{learn_title}</h2>
                    <p class="text-muted">{learn_subtitle}</p>
                </div>

                <div class="learning-grid">
                    {outcome_cards}
                </div>

                <div id="curriculum" class="curriculum-section">
                    <h2 class="hero-h1 text-center" style="font-size: 2.5rem; margin-bottom: 4rem;">{program_title}</h2>
                    
                    {modules_html}
                </div>

                <div class="reveal text-center" style="margin-top: 6rem; padding: 4rem; background: rgba(255, 255, 255, 0.02); border-radius: 20px; border: 1px solid var(--border-glow);">
                    <h2 class="hero-h1" style="font-size: 2.5rem;">{final_cta_title}</h2>
                    <p class="text-muted" style="max-width: 600px; margin: 0 auto 2.5rem;">{final_cta_desc}</p>
                    <a href="{campaign_link}" class="btn-start">Apply for Growth Campaign</a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="{home_link}" class="logo">ViralAuthority</a>
                    <p>{foot_tagline}</p>
                </div>
                <div class="footer-col">
                    <h4>{foot_courses}</h4>
                    <ul class="footer-links">
                        <li><a href="instagram.html">Instagram Mastery</a></li>
                        <li><a href="tiktok.html">TikTok Viral</a></li>
                        <li><a href="youtube.html">YouTube Hub</a></li>
                        <li><a href="spotify.html">Spotify Growth</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <script>
        function toggleModule(header) {{
            header.parentElement.classList.toggle('active');
        }}

        function toggleLesson(trigger) {{
            trigger.parentElement.classList.toggle('active');
        }}

        function toggleComplete(checkbox) {{
            checkbox.classList.toggle('checked');
            updateProgress();
        }}

        function updateProgress() {{
            const checkboxes = document.querySelectorAll('.complete-checkbox');
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.complete-checkbox.checked').length;
            const percentage = Math.round((checked / total) * 100);
            
            document.getElementById('progress-fill').style.width = percentage + '%';
            document.getElementById('progress-text').innerText = percentage + '%';
        }}

        // Reveal animation
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }}
            }});
        }}, {{ threshold: 0.1 }});

        document.querySelectorAll('.reveal').forEach(el => {{
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        }});
    </script>
</body>
</html>
"""

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return f"{int(hex_color[0:2], 16)}, {int(hex_color[2:4], 16)}, {int(hex_color[4:6], 16)}"

def generate_academy():
    for course_id, data in courses.items():
        for locale in locales:
            lang = "es" if locale in ["", "es"] else "en"
            
            # Paths
            depth = locale.count("/") + (1 if locale else 0)
            prefix = "../../" if locale else "../"
            
            # Translation Mapping
            if lang == "es":
                trans = {
                    "nav_home": "Inicio",
                    "nav_services": "Servicios",
                    "nav_academy": "Academia",
                    "cta_start": "Comenzar Curso",
                    "progress_label": "Progreso del Curso",
                    "learn_title": "Lo que vas a aprender",
                    "learn_subtitle": "Un camino estructurado desde cero hasta la autoridad total.",
                    "program_title": "Programa de Clases",
                    "final_cta_title": "Crecimiento acelerado",
                    "final_cta_desc": "¿Quieres saltarte la curva de aprendizaje? Deja que nuestro equipo de especialistas gestione tu estrategia de crecimiento.",
                    "foot_tagline": "Estrategia de crecimiento premium.",
                    "foot_courses": "Cursos Academy"
                }
            else:
                trans = {
                    "nav_home": "Home",
                    "nav_services": "Services",
                    "nav_academy": "Academy",
                    "cta_start": "Start Course",
                    "progress_label": "Course Progress",
                    "learn_title": "What you will learn",
                    "learn_subtitle": "A structured path from scratch to absolute authority.",
                    "program_title": "Class Program",
                    "final_cta_title": "Accelerated Growth",
                    "final_cta_desc": "Want to skip the learning curve? Let our team of specialists manage your growth strategy.",
                    "foot_tagline": "Premium growth strategy.",
                    "foot_courses": "Academy Courses"
                }

            # Outlets
            outcome_cards = f"""
            <div class="learning-card reveal"><i class="fas fa-check-circle"></i><h3>Estrategia Pro</h3><p>Domina los fundamentos técnicos y tácticos.</p></div>
            <div class="learning-card reveal"><i class="fas fa-bolt"></i><h3>Ejecución Viral</h3><p>Implementa sistemas que detienen el scroll.</p></div>
            <div class="learning-card reveal"><i class="fas fa-chart-line"></i><h3>Escalamiento</h3><p>Monetiza y automatiza tu presencia digital.</p></div>
            """
            
            modules_html = ""
            for i, mod in enumerate(data["modules"]):
                lessons_html = ""
                for j, lesson in enumerate(mod["lessons"]):
                    lessons_html += f"""
                    <li class="lesson-item">
                        <div class="lesson-trigger" onclick="toggleLesson(this)">
                            <div class="lesson-title">
                                <div class="complete-checkbox" onclick="event.stopPropagation(); toggleComplete(this)"></div>
                                <span>Clase {i+1}.{j+1} – {lesson['title']}</span>
                            </div>
                            <i class="fas fa-play-circle text-muted"></i>
                        </div>
                        <div class="lesson-content">
                            <div class="video-placeholder"></div>
                            <p>{lesson['content']}</p>
                            <div style="margin-top:1rem; padding:1rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                                <strong>Paso Práctico:</strong> Implementa esta técnica en tu próximo contenido.<br>
                                <strong>Ejercicio:</strong> Realiza una auditoría de 5 minutos sobre tu estado actual.
                            </div>
                        </div>
                    </li>
                    """
                
                modules_html += f"""
                <div class="module-accordion reveal">
                    <div class="module-header" onclick="toggleModule(this)">
                        <div class="module-info">
                            <h3>{mod['name']}</h3>
                            <span>{len(mod['lessons'])} Lecciones • Estrategia Real</span>
                        </div>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <ul class="lesson-list">
                        {lessons_html}
                    </ul>
                </div>
                """

            # Course Title Split (First word gradient)
            title_parts = data["title"].split(" ")
            course_title_split = f"{title_parts[0]} <span class='text-gradient'>{' '.join(title_parts[1:])}</span>"

            # Render
            html = template_html.format(
                lang=lang,
                title=data["title"],
                desc=data["subtitle"],
                css_path=f"{prefix}css/",
                accent=data["accent"],
                accent_rgb=hex_to_rgb(data["accent"]),
                accent_grad=data["accent_grad"],
                home_link=f"{prefix}{locale + '/' if locale else ''}index.html",
                services_link=f"{prefix}{locale + '/' if locale else ''}services.html",
                academy_link=f"{prefix}{locale + '/' if locale else ''}academy.html",
                blog_link=f"{prefix}blog.html",
                nav_home=trans["nav_home"],
                nav_services=trans["nav_services"],
                nav_academy=trans["nav_academy"],
                course_badge=data["badge"],
                course_title_split=course_title_split,
                course_subtitle=data["subtitle"],
                cta_start=trans["cta_start"],
                progress_label=trans["progress_label"],
                learn_title=trans["learn_title"],
                learn_subtitle=trans["learn_subtitle"],
                outcome_cards=outcome_cards,
                program_title=trans["program_title"],
                modules_html=modules_html,
                final_cta_title=trans["final_cta_title"],
                final_cta_desc=trans["final_cta_desc"],
                campaign_link=f"{prefix}growth-campaign.html",
                foot_tagline=trans["foot_tagline"],
                foot_courses=trans["foot_courses"]
            )

            # File Write
            folder = os.path.join(base_dir, locale if locale else "", "academy")
            os.makedirs(folder, exist_ok=True)
            file_path = os.path.join(folder, f"{course_id}.html")
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"Generated: {file_path}")

generate_academy()
