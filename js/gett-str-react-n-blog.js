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

// Scroll animation implementation
const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
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

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animation on page load
window.addEventListener('load', () => {
    handleScrollAnimation();
});

// Copy link functionality
document.getElementById('copy-link').addEventListener('click', function(e) {
    e.preventDefault();
    const url = window.location.href;
    
    navigator.clipboard.writeText(url).then(() => {
    const originalHtml = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        this.innerHTML = originalHtml;
    }, 2000);
    });
});

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
