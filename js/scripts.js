// DOM Elements
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const navBar = document.querySelector(".navbar");
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const scrollBtn = document.querySelector(".scroll-btn");
const langPt = document.getElementById("lang-pt");
const langEn = document.getElementById("lang-en");

// Navigation logic
if (menuBtn) {
    menuBtn.onclick = function() {
        menuBtn.style.opacity = "0";
        menuBtn.style.pointerEvents = "none";
        navBar.classList.add("active");
        body.style.overflow = "hidden";
    }
}

if (cancelBtn) {
    cancelBtn.onclick = function() {
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
        navBar.classList.remove("active");
        body.style.overflow = "auto";
    }
}

// Side Navigation Menu Links
const navMenuLinks = document.querySelectorAll(".menu li a");
navMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (menuBtn) {
            menuBtn.style.opacity = "1";
            menuBtn.style.pointerEvents = "auto";
        }
        navBar.classList.remove("active");
        body.style.overflow = "auto";
    });
});

// Sticky Navigation and Scroll Button visibility
window.addEventListener("scroll", () => {
    // Sticky Nav
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
    } else {
        // If we are on index.html and at the top, remove sticky
        // (subpages like projects.html have sticky forced in HTML)
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
             nav.classList.remove("sticky");
        }
    }

    // Scroll-to-top Button
    if (document.documentElement.scrollTop > 500) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

// Internationalization (i18n) Logic
const setLanguage = (lang) => {
    localStorage.setItem("preferred-lang", lang);
    
    // Update active state in switcher
    if (langPt && langEn) {
        langPt.classList.toggle("active", lang === 'pt');
        langEn.classList.toggle("active", lang === 'en');
    }

    // Update all elements with data-i18n attribute
    const translations = window.translations;
    if (!translations || !translations[lang]) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            // Check if it's a button or has specific formatting
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
};

// Language Switcher Events
if (langPt) langPt.addEventListener("click", () => setLanguage('pt'));
if (langEn) langEn.addEventListener("click", () => setLanguage('en'));

// Initialize Language
const savedLang = localStorage.getItem("preferred-lang") || (navigator.language.startsWith('en') ? 'en' : 'pt');
setLanguage(savedLang);

// Download CV handler
const downloadCVBtn = document.querySelector(".download-cv");
if (downloadCVBtn) {
    downloadCVBtn.addEventListener("click", () => {
        const msg = savedLang === 'en' ? 
            "The CV is currently unavailable. Please try again soon." : 
            "O CV não está disponível no momento. Por favor, tente novamente em breve.";
        alert(msg);
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Skills
const animateCounters = () => {
    const counters = document.querySelectorAll(".counter");
    
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const customDuration = counter.getAttribute("data-duration");
        const duration = customDuration ? +customDuration : 2000;
        const stepTime = 20; 
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let currentCount = 0;
        
        const updateCount = () => {
            currentCount += increment;
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount);
                setTimeout(updateCount, stepTime);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector(".skills");
if (skillsSection) observer.observe(skillsSection);
