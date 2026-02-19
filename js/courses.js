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

// Course card animation
function animateCoursesOnScroll() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
    );
}

// Initialize course animation on page load and scroll
document.addEventListener('DOMContentLoaded', function() {
    animateCoursesOnScroll();
    window.addEventListener('scroll', animateCoursesOnScroll);
});

// Filter button functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));
    button.classList.add('active', 'bg-primary', 'text-white');
    button.classList.remove('bg-white', 'text-darkBlue', 'border');
    
    // Here you would typically filter the courses
    // This is just a visual demonstration
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.style.opacity = '0.5';
        setTimeout(() => {
        card.style.opacity = '1';
        }, 300);
    });
    });
});

// Animate footer elements when they come into view
function animateFooterOnScroll() {
const revealElements = document.querySelectorAll('.reveal-up');

revealElements.forEach(element => {
    if (isInViewport(element)) {
        element.classList.add('animate');
    }
});
}

// Initialize animation on page load and scroll
document.addEventListener('DOMContentLoaded', function() {
animateFooterOnScroll();
window.addEventListener('scroll', animateFooterOnScroll);
});