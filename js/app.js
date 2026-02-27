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
