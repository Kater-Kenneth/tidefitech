// ======================
// Mobile Menu Toggle
// ======================
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Sticky nav effect on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#mobile-menu') && !e.target.closest('#mobile-menu-button') && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ======================
// Scroll Animations
// ======================
const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animate-visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('scroll-animate-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.2)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Form Submission Handling with Loading State
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const scriptURL = "https://script.google.com/macros/s/AKfycbzRCAf7HWHFpNEn0EScuPaUsKzt_pn9vWZO9OtOWDkk_eI6MNyDr2d5E3GKy0Lb36pJ9w/exec"; // Replace with your deployed Apps Script Web App URL

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.whatsapp || !formData.message) {
            showMessage("⚠️ Please fill in all required fields", "error");
            return;
        }

        // Show loading message
        showMessage("⏳ Sending your message...", "loading");

        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                showMessage("✅ Thank you for your message! We’ll get back to you soon.", "success");
                contactForm.reset();
            } else {
                showMessage("⚠️ There was a problem sending your message.", "error");
            }
        })
        .catch(error => {
            console.error("Error!", error);
            showMessage("❌ Error sending message: " + error, "error");
        });
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove("hidden");

    if (type === "success") {
        formMessage.className = "p-4 mb-6 rounded-md bg-green-100 text-green-800 font-semibold";
    } else if (type === "error") {
        formMessage.className = "p-4 mb-6 rounded-md bg-red-100 text-red-800 font-semibold";
    } else if (type === "loading") {
        formMessage.className = "p-4 mb-6 rounded-md bg-blue-100 text-blue-800 font-semibold animate-pulse";
    }

    if (type !== "loading") {
        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 5000);
    }
}


// Helper function to style messages
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove("hidden");

    if (type === "success") {
        formMessage.className = "p-4 mb-6 rounded-md bg-green-100 text-green-800 font-semibold";
    } else if (type === "error") {
        formMessage.className = "p-4 mb-6 rounded-md bg-red-100 text-red-800 font-semibold";
    } else if (type === "loading") {
        formMessage.className = "p-4 mb-6 rounded-md bg-blue-100 text-blue-800 font-semibold animate-pulse";
    }

    // Fade out success/error after 5 seconds
    if (type !== "loading") {
        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 5000);
    }
}

// ======================
// Footer Animation Only
// ======================
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function animateFooterOnScroll() {
    const revealElements = document.querySelectorAll('footer .reveal-up'); // only footer
    revealElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    animateFooterOnScroll();
    window.addEventListener('scroll', animateFooterOnScroll);
});
