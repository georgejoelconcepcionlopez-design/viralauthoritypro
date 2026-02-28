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

    // 5. Growth Diagnosis Modal Logic
    new DiagnosisModal();
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
        this.lang = document.documentElement.lang === 'es' ? 'es' : 'en';
        this.init();
    }

    getContent() {
        const texts = {
            es: {
                step1Title: "¿En qué red quieres crecer?",
                step2Title: "¿Cuál es tu objetivo principal?",
                step3Title: "¿Tu cuenta ya genera ingresos?",
                optInstagram: "Instagram",
                optTikTok: "TikTok",
                optYouTube: "YouTube",
                optSpotify: "Spotify",
                optFollowers: "Más seguidores",
                optSales: "Más ventas",
                optPlays: "Más reproducciones",
                optBrand: "Construir marca personal",
                optYes: "Sí",
                optNo: "No",
                optStarting: "Apenas comenzando",
                resultTitle: "Tu Diagnóstico Élite",
                resultCTA: "Ver Plan Recomendado",
                stepPrefix: "Paso"
            },
            en: {
                step1Title: "Which network do you want to grow?",
                step2Title: "What is your main goal?",
                step3Title: "Does your account already generate income?",
                optInstagram: "Instagram",
                optTikTok: "TikTok",
                optYouTube: "YouTube",
                optSpotify: "Spotify",
                optFollowers: "More Followers",
                optSales: "More Sales",
                optPlays: "More Plays",
                optBrand: "Build Personal Brand",
                optYes: "Yes",
                optNo: "No",
                optStarting: "Just Starting",
                resultTitle: "Your Elite Diagnosis",
                resultCTA: "View Recommended Plan",
                stepPrefix: "Step"
            }
        };
        return texts[this.lang];
    }

    init() {
        const t = this.getContent();
        const modalHTML = `
            <div class="diagnosis-overlay" id="diagnosisModal">
                <div class="diagnosis-container">
                    <button class="diagnosis-close" aria-label="Close"><i class="fas fa-times"></i></button>
                    
                    <div class="diagnosis-progress-wrapper">
                        <div class="diagnosis-progress-text">
                            <span id="diagnosisStepText">${t.stepPrefix} 1/3</span>
                            <span id="diagnosisPercent">0%</span>
                        </div>
                        <div class="diagnosis-progress-bar-bg">
                            <div class="diagnosis-progress-bar-fill" id="diagnosisProgress"></div>
                        </div>
                    </div>
                    
                    <div class="diagnosis-step active" data-step="1">
                        <h3 class="diagnosis-title">${t.step1Title}</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Instagram"><i class="fab fa-instagram"></i> ${t.optInstagram}</div>
                            <div class="diagnosis-option" data-value="TikTok"><i class="fab fa-tiktok"></i> ${t.optTikTok}</div>
                            <div class="diagnosis-option" data-value="YouTube"><i class="fab fa-youtube"></i> ${t.optYouTube}</div>
                            <div class="diagnosis-option" data-value="Spotify"><i class="fab fa-spotify"></i> ${t.optSpotify}</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="2">
                        <h3 class="diagnosis-title">${t.step2Title}</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Followers"><i class="fas fa-users"></i> ${t.optFollowers}</div>
                            <div class="diagnosis-option" data-value="Sales"><i class="fas fa-shopping-cart"></i> ${t.optSales}</div>
                            <div class="diagnosis-option" data-value="Plays"><i class="fas fa-play"></i> ${t.optPlays}</div>
                            <div class="diagnosis-option" data-value="Brand"><i class="fas fa-id-badge"></i> ${t.optBrand}</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="3">
                        <h3 class="diagnosis-title">${t.step3Title}</h3>
                        <div class="diagnosis-options">
                            <div class="diagnosis-option" data-value="Yes"><i class="fas fa-check"></i> ${t.optYes}</div>
                            <div class="diagnosis-option" data-value="No"><i class="fas fa-times"></i> ${t.optNo}</div>
                            <div class="diagnosis-option" data-value="Starting"><i class="fas fa-seedling"></i> ${t.optStarting}</div>
                        </div>
                    </div>

                    <div class="diagnosis-step" data-step="result">
                        <div class="recommendation-card">
                            <div class="recom-icon-box"><i class="fas fa-magic"></i></div>
                            <h3 id="resultTitle">${t.resultTitle}</h3>
                            <p id="resultText"></p>
                            <a href="#" id="resultCTA" class="btn btn-primary">${t.resultCTA}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.overlay = document.getElementById('diagnosisModal');
        this.container = this.overlay.querySelector('.diagnosis-container');
        this.closeBtn = this.overlay.querySelector('.diagnosis-close');
        this.progressBar = document.getElementById('diagnosisProgress');
        this.stepText = document.getElementById('diagnosisStepText');
        this.percentText = document.getElementById('diagnosisPercent');

        // Find the floating rocket button
        this.trigger = document.querySelector('.floating-cta');

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
        const t = this.getContent();
        const steps = this.overlay.querySelectorAll('.diagnosis-step');
        steps.forEach(s => s.classList.remove('active'));

        const currentStep = this.overlay.querySelector(`[data-step="${this.step}"]`);
        if (currentStep) currentStep.classList.add('active');

        const progressPercent = Math.round(((this.step - 1) / 3) * 100);
        this.progressBar.style.width = `${progressPercent}%`;
        this.stepText.innerText = `${t.stepPrefix} ${this.step}/3`;
        this.percentText.innerText = `${progressPercent}%`;

        // Hide progress on result step
        const progressWrapper = this.overlay.querySelector('.diagnosis-progress-wrapper');
        if (this.step === 'result') {
            progressWrapper.style.display = 'none';
        } else {
            progressWrapper.style.display = 'block';
        }
    }

    showResult() {
        const steps = this.overlay.querySelectorAll('.diagnosis-step');
        steps.forEach(s => s.classList.remove('active'));
        this.overlay.querySelector('[data-step="result"]').classList.add('active');

        this.step = 'result';
        this.updateUI();
        this.progressBar.style.width = '100%';
        this.percentText.innerText = '100%';

        const { 1: platform, 2: goal, 3: monetization } = this.answers;
        let recommendation = "";
        let targetLink = this.lang === 'es' ? "/es/services.html" : "/en/services.html";

        if (this.lang === 'es') {
            if (platform === 'Spotify') {
                recommendation = "Para dominar Spotify necesitas tracción algorítmica premium. Enfócate en aumentar tu Save Rate.";
                targetLink = "/es/spotify-streams.html";
            } else if (goal === 'Sales' || goal === 'Brand') {
                recommendation = "Tu prioridad debe ser la autoridad digital. Necesitas un ecosistema de contenido que genere confianza.";
                targetLink = "/es/academy.html";
            } else {
                recommendation = `Para escalar en ${platform}, necesitas superar el umbral de credibilidad del algoritmo mediante señales de alta retención.`;
                targetLink = "/es/services.html";
            }
        } else {
            if (platform === 'Spotify') {
                recommendation = "To dominate Spotify you need premium algorithmic traction. Focus on increasing your Save Rate.";
                targetLink = "/en/spotify-streams.html";
            } else if (goal === 'Sales' || goal === 'Brand') {
                recommendation = "Your priority should be digital authority. You need a content ecosystem that builds trust.";
                targetLink = "/en/academy.html";
            } else {
                recommendation = `To scale on ${platform}, you need to surpass the algorithm's credibility threshold through high-retention signals.`;
                targetLink = "/en/services.html";
            }
        }

        document.getElementById('resultText').innerText = recommendation;
        document.getElementById('resultCTA').href = targetLink;
    }
}
