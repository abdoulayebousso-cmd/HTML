// =============================================
//   CV INTERACTIF — script.js
//   Mode sombre, menu hamburger, animations
//   barres de compétences, formulaire, scroll
// =============================================

// ---------- MODE SOMBRE / CLAIR ----------
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ---------- MENU HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Fermer le menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ---------- BOUTON RETOUR EN HAUT ----------
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- ANIMATION BARRES DE COMPÉTENCES ----------
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            const fill = entry.target.querySelector('.skill-fill');
            fill.style.width = level + '%';
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.3
});

skillItems.forEach(item => skillObserver.observe(item));

// ---------- SMOOTH SCROLL POUR LES ANCRES ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---------- FORMULAIRE DE CONTACT ----------
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    // Réinitialiser les erreurs
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.style.display = 'none';

    let valid = true;

    // Validation nom
    if (name.value.trim() === '') {
        nameError.textContent = 'Le nom est requis.';
        valid = false;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        emailError.textContent = "L'e-mail est requis.";
        valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = "Format d'e-mail invalide.";
        valid = false;
    }

    // Validation message
    if (message.value.trim() === '') {
        messageError.textContent = 'Le message est requis.';
        valid = false;
    }

    if (valid) {
        formSuccess.style.display = 'block';
        form.reset();
        setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
    }
});

// ---------- ANIMATION SCROLL SECTIONS ----------
const sections = document.querySelectorAll('section, article');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});
