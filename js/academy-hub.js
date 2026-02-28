/**
 * ViralAuthority Academy Hub Logic
 * Handles progress tracking, lesson accordions, and monetization calculator.
 */

class AcademyHub {
    constructor() {
        this.platform = this.getPlatformFromPath();
        this.progressKey = `academy_progress_${this.platform}`;
        this.completedLessons = JSON.parse(localStorage.getItem(this.progressKey)) || [];

        this.init();
    }

    getPlatformFromPath() {
        const path = window.location.pathname;
        if (path.includes('instagram')) return 'instagram';
        if (path.includes('youtube')) return 'youtube';
        if (path.includes('tiktok')) return 'tiktok';
        if (path.includes('spotify')) return 'spotify';
        return 'general';
    }

    init() {
        this.setupAccordions();
        this.setupProgressButtons();
        this.updateProgressBar();
        this.setupCalculator();
    }

    setupAccordions() {
        const headers = document.querySelectorAll('.unit-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const card = header.parentElement;
                const wasActive = card.classList.contains('active');

                // Close others if desired (optional, keeping multi-open for now)
                // document.querySelectorAll('.unit-card').forEach(c => c.classList.remove('active'));

                if (!wasActive) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    }

    setupProgressButtons() {
        const btns = document.querySelectorAll('.complete-btn');
        btns.forEach(btn => {
            const lessonId = btn.getAttribute('data-lesson-id');

            // Set initial state
            if (this.completedLessons.includes(lessonId)) {
                btn.classList.add('is-completed');
                btn.innerHTML = '<i class="fas fa-check"></i> Completado';
            }

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLesson(lessonId, btn);
            });
        });
    }

    toggleLesson(id, btn) {
        const index = this.completedLessons.indexOf(id);
        if (index > -1) {
            this.completedLessons.splice(index, 1);
            btn.classList.remove('is-completed');
            btn.innerHTML = 'Marcar como completado';
        } else {
            this.completedLessons.push(id);
            btn.classList.add('is-completed');
            btn.innerHTML = '<i class="fas fa-check"></i> Completado';

            // Optional: Success animation/sound
            this.triggerSuccessEffect(btn);
        }

        localStorage.setItem(this.progressKey, JSON.stringify(this.completedLessons));
        this.updateProgressBar();
    }

    updateProgressBar() {
        const bar = document.querySelector('.progress-bar-fill');
        const text = document.querySelector('.progress-percentage');
        const totalLessons = document.querySelectorAll('.complete-btn').length;

        if (!bar || totalLessons === 0) return;

        const percentage = Math.round((this.completedLessons.length / totalLessons) * 100);
        bar.style.width = `${percentage}%`;
        if (text) text.innerText = `${percentage}%`;
    }

    triggerSuccessEffect(element) {
        // Simple scale pop
        element.style.transform = 'scale(1.1)';
        setTimeout(() => element.style.transform = 'scale(1)', 200);
    }

    setupCalculator() {
        const inputs = document.querySelectorAll('.calc-input');
        if (inputs.length === 0) return;

        inputs.forEach(input => {
            input.addEventListener('input', () => this.calculateEarnings());
        });

        // Trigger initial calculation
        this.calculateEarnings();
    }

    calculateEarnings() {
        const results = {};

        // YouTube
        const ytViews = parseFloat(document.getElementById('yt-views')?.value) || 0;
        const ytCPM = parseFloat(document.getElementById('yt-cpm')?.value) || 0;
        results.youtube = (ytViews / 1000) * ytCPM;

        // TikTok
        const ttViews = parseFloat(document.getElementById('tt-views')?.value) || 0;
        const ttRPM = parseFloat(document.getElementById('tt-rpm')?.value) || 0;
        results.tiktok = (ttViews / 1000) * ttRPM;

        // Spotify
        const spStreams = parseFloat(document.getElementById('sp-streams')?.value) || 0;
        const spRate = parseFloat(document.getElementById('sp-rate')?.value) || 0.0035;
        results.spotify = spStreams * spRate;

        // Instagram
        const igFollowers = parseFloat(document.getElementById('ig-followers')?.value) || 0;
        const igRate = parseFloat(document.getElementById('ig-rate')?.value) || 0.05; // $50 per 1k flows avg
        results.instagram = (igFollowers / 1000) * 100; // Simplified estimation

        this.animateNumbers(results);
    }

    animateNumbers(results) {
        // Individual results
        for (const [platform, value] of Object.entries(results)) {
            const el = document.getElementById(`${platform}-result`);
            if (el) this.countUp(el, value);
        }

        // Total
        const total = Object.values(results).reduce((a, b) => a + b, 0);
        const totalEl = document.getElementById('total-earnings');
        if (totalEl) this.countUp(totalEl, total);
    }

    countUp(el, target) {
        const duration = 1000;
        const start = parseFloat(el.innerText.replace(/[$,]/g, '')) || 0;
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out function
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * eased;

            el.innerText = this.formatCurrency(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    formatCurrency(num) {
        return '$' + num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    // New: Path Selection Logic
    displayPath(goalId) {
        const container = document.getElementById('path-recommendation');
        const contentArea = document.getElementById('path-content');
        const goalCards = document.querySelectorAll('.goal-card');

        if (!container || !contentArea) return;

        // Update cards UI
        goalCards.forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('onclick').includes(goalId)) {
                card.classList.add('active');
            }
        });

        const paths = {
            'followers': {
                title: 'Ruta: Crecimiento Explosivo',
                desc: 'Esta ruta está diseñada para maximizar tu visibilidad en todas las plataformas.',
                steps: [
                    { platform: 'Instagram', lesson: 'Perfil Magnético', url: '/academy/instagram.html' },
                    { platform: 'TikTok', lesson: 'Algoritmo TikTok', url: '/academy/tiktok.html' },
                    { platform: 'YouTube', lesson: 'Retención Avanzada', url: '/academy/youtube.html' }
                ]
            },
            'income': {
                title: 'Ruta: Monetización Pro',
                desc: 'Aprende a convertir tu audiencia en un negocio real de altos ingresos.',
                steps: [
                    { platform: 'Multi', lesson: 'Calculadora de Ingresos', url: '/academy/monetization.html' },
                    { platform: 'Instagram', lesson: 'Brand Deals & Sales', url: '/academy/instagram.html' },
                    { platform: 'YouTube', lesson: 'AdSense & Patrocinios', url: '/academy/youtube.html' },
                    { platform: 'Spotify', lesson: 'Royalties & Sincro', url: '/academy/spotify.html' }
                ]
            },
            'brand': {
                title: 'Ruta: Autoridad Digital',
                desc: 'Construye un legado y conviértete en la cara de tu industria.',
                steps: [
                    { platform: 'General', lesson: 'Branding Estratégico', url: '/academy/instagram.html' },
                    { platform: 'Visual', lesson: 'Storytelling de Impacto', url: '/academy/instagram.html' },
                    { platform: 'X', lesson: 'Contenido de Autoridad', url: '/academy/x.html' }
                ]
            }
        };

        const path = paths[goalId];
        let html = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="font-size: 2rem; margin-bottom: 0.5rem;" class="text-gradient">${path.title}</h3>
                <p class="text-muted">${path.desc}</p>
            </div>
            <div class="path-steps-grid">
        `;

        path.steps.forEach((step, index) => {
            html += `
                <div class="path-step-card">
                    <div class="step-number">${index + 1}</div>
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--academy-accent); text-transform: uppercase;">${step.platform}</span>
                    <h4 style="margin: 0.5rem 0;">${step.lesson}</h4>
                    <a href="${step.url}" class="btn btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem; margin-top: 1rem;">Ir a Clase</a>
                </div>
            `;
        });

        html += `</div>`;
        contentArea.innerHTML = html;
        container.classList.add('active');

        // Scroll to container
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Update CTA button link to first step
        const cta = document.getElementById('start-path-btn');
        if (cta) {
            cta.onclick = () => window.location.href = path.steps[0].url;
        }
    }
}

// Global accessor for path selection
function selectPath(goal) {
    if (window.academyHub) {
        window.academyHub.displayPath(goal);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.academyHub = new AcademyHub();
});
