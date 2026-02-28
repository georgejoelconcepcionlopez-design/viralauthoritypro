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
