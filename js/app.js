document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially

    // 4. Email Capture Popup
    const popup = document.getElementById('emailPopup');
    const closeBtn = document.querySelector('.popup-close');
    const form = document.getElementById('popupForm');

    // Show popup after 5 seconds OR if user scrolls halfway down
    let popupShown = false;

    const showPopup = () => {
        if (!popupShown && popup) {
            popup.classList.add('active');
            popupShown = true;
        }
    };

    setTimeout(showPopup, 5000);

    window.addEventListener('scroll', () => {
        if (window.scrollY > (document.body.scrollHeight / 2)) {
            showPopup();
        }
    });

    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }

    if (form && popup) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Subscribed!";
            btn.style.background = "#22c55e"; // Success green

            setTimeout(() => {
                popup.classList.remove('active');
                btn.innerText = originalText;
                btn.style.background = ""; // Revert to css class
                form.reset();
            }, 2000);
        });
    }
});

// Academy Platform Filtering
function filterPlatform(platformId) {
    const sections = document.querySelectorAll('.platform-section');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update buttons
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(platformId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update sections
    sections.forEach(sec => {
        if (sec.id === platformId) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });
}

// Academy Lesson Expansion
function toggleLesson(button) {
    const card = button.closest('.course-card');
    const isExpanded = card.classList.contains('expanded');

    // Close other expanded cards (optional but recommended for cleaner UI)
    document.querySelectorAll('.course-card.expanded').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            const otherBtn = otherCard.querySelector('.btn-secondary');
            if (otherBtn) {
                const lang = document.documentElement.lang;
                otherBtn.innerText = lang === 'es' ? 'Ver Clase' : 'Watch Class';
            }
        }
    });

    // Toggle current card
    card.classList.toggle('expanded');

    // Update button text
    const lang = document.documentElement.lang;
    if (card.classList.contains('expanded')) {
        button.innerText = lang === 'es' ? 'Cerrar Detalles' : 'Close Details';
    } else {
        button.innerText = lang === 'es' ? 'Ver Clase' : 'Watch Class';
    }
}
// 5. Growth Diagnosis Modal Logic
class DiagnosisModal {
    constructor() {
        this.step = 1;
        this.answers = {};
        this.init();
    }

    init() {
        // Inject HTML
        const modalHTML = `
            <div class="diagnosis-overlay" id="diagnosisModal">
                <div class="diagnosis-container">
                    <button class="diagnosis-close"><i class="fas fa-times"></i></button>
                    <div class="diagnosis-progress">
                        <div class="diagnosis-progress-bar" id="diagnosisProgress"></div>
                    </div>
                    
                    <div class="diagnosis-step active" data-step="1">
                        <h3 class="diagnosis-title">¿En qué red quieres crecer?</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Instagram"><i class="fab fa-instagram"></i> Instagram</div>
                            <div class="diagnosis-option" data-value="TikTok"><i class="fab fa-tiktok"></i> TikTok</div>
                            <div class="diagnosis-option" data-value="YouTube"><i class="fab fa-youtube"></i> YouTube</div>
                            <div class="diagnosis-option" data-value="Spotify"><i class="fab fa-spotify"></i> Spotify</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="2">
                        <h3 class="diagnosis-title">¿Cuál es tu objetivo principal?</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Followers"><i class="fas fa-users"></i> Más seguidores</div>
                            <div class="diagnosis-option" data-value="Sales"><i class="fas fa-shopping-cart"></i> Más ventas</div>
                            <div class="diagnosis-option" data-value="Plays"><i class="fas fa-play"></i> Más reproducciones</div>
                            <div class="diagnosis-option" data-value="Brand"><i class="fas fa-id-badge"></i> Construir marca personal</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="3">
                        <h3 class="diagnosis-title">¿Tu cuenta ya genera ingresos?</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Yes"><i class="fas fa-check"></i> Sí</div>
                            <div class="diagnosis-option" data-value="No"><i class="fas fa-times"></i> No</div>
                            <div class="diagnosis-option" data-value="Starting"><i class="fas fa-seedling"></i> Apenas comenzando</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="result">
                        <div class="recommendation-card">
                            <i class="fas fa-magic"></i>
                            <h3 id="resultTitle">Tu Diagnóstico Élite</h3>
                            <p id="resultText"></p>
                            <a href="#" id="resultCTA" class="btn btn-primary">Ver Plan Recomendado</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind Events
        this.overlay = document.getElementById('diagnosisModal');
        this.container = this.overlay.querySelector('.diagnosis-container');
        this.closeBtn = this.overlay.querySelector('.diagnosis-close');
        this.progressBar = document.getElementById('diagnosisProgress');
        this.trigger = document.querySelector('.floating-cta');

        // Replace trigger link with js action if needed (detect and change)
        if (this.trigger) {
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        }

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Option Clicks
        this.overlay.querySelectorAll('.diagnosis-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const step = opt.closest('.diagnosis-step').dataset.step;
                this.answers[step] = opt.dataset.value;
                this.nextStep();
            });
        });
    }

    open() {
        this.step = 1;
        this.answers = {};
        this.updateUI();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    nextStep() {
        if (this.step < 3) {
            this.step++;
            this.updateUI();
        } else {
            this.showResult();
        }
    }

    updateUI() {
        const steps = this.overlay.querySelectorAll('.diagnosis-step');
        steps.forEach(s => s.classList.remove('active'));

        const currentStep = this.overlay.querySelector(`[data-step="${this.step}"]`);
        if (currentStep) currentStep.classList.add('active');

        const progressPercent = ((this.step - 1) / 3) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
    }

    showResult() {
        const steps = this.overlay.querySelectorAll('.diagnosis-step');
        steps.forEach(s => s.classList.remove('active'));
        this.overlay.querySelector('[data-step="result"]').classList.add('active');
        this.progressBar.style.width = '100%';

        const { 1: platform, 2: goal, 3: monetization } = this.answers;
        let recommendation = "";
        let targetLink = "services.html";

        if (platform === 'Spotify') {
            recommendation = "Para dominar Spotify necesitas tracción algorítmica premium. Enfócate en aumentar tu Save Rate.";
            targetLink = "es/spotify-streams.html";
        } else if (goal === 'Sales' || goal === 'Brand') {
            recommendation = "Tu prioridad debe ser la autoridad digital. Necesitas un ecosistema de contenido que genere confianza.";
            targetLink = "es/academia.html";
        } else {
            recommendation = `Para escalar en ${platform}, necesitas superar el umbral de credibilidad del algoritmo mediante señales de alta retención.`;
            targetLink = "services.html";
        }

        document.getElementById('resultText').innerText = recommendation;
        document.getElementById('resultCTA').href = targetLink;
    }
}

// Initialize Diagnosis Modal
new DiagnosisModal();
