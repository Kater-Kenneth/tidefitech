// Mobile Menu Toggle
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

// Carousel Functionality
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active', 'next', 'prev');
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show the selected slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Set next and previous classes for animation
    let nextIndex = (index + 1) % slides.length;
    let prevIndex = (index - 1 + slides.length) % slides.length;
    
    slides[nextIndex].classList.add('next');
    slides[prevIndex].classList.add('prev');
    
    currentSlide = index;
    
    // Reset animation classes for elements in the active slide
    const animatedElements = slides[index].querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
        // Trigger reflow to restart animation
        el.style.animation = 'none';
        void el.offsetWidth; // trigger reflow
        el.style.animation = null;
        
        // Reapply animation delays
        if (el.classList.contains('delay-100')) {
            el.style.animationDelay = '0.1s';
        } else if (el.classList.contains('delay-200')) {
            el.style.animationDelay = '0.2s';
        } else if (el.classList.contains('delay-300')) {
            el.style.animationDelay = '0.3s';
        } else if (el.classList.contains('delay-400')) {
            el.style.animationDelay = '0.4s';
        } else if (el.classList.contains('delay-500')) {
            el.style.animationDelay = '0.5s';
        }
    });
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

// Set up event listeners
nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Add click events to indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
    });
});

// Auto-advance slides every 5 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize carousel
function initCarousel() {
    showSlide(0);
    startAutoSlide();
    
    // Pause autoplay when user hovers over carousel
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
    );
}

// Animate Why Choose Us section when it comes into view
function animateWhyChooseUsOnScroll() {
    const whyChooseUsSection = document.querySelector('.relative.bg-cover.bg-center.text-white');
    if (!whyChooseUsSection) return;
    
    const leftContent = whyChooseUsSection.querySelector('.animate-slide-in-left');
    const rightContent = whyChooseUsSection.querySelector('.animate-slide-in-right');
    const featureCards = whyChooseUsSection.querySelectorAll('.flex.items-start.gap-4');
    const stats = whyChooseUsSection.querySelectorAll('.text-center.p-4');
    
    if (isInViewport(whyChooseUsSection)) {
        // Animate left content
        if (leftContent) {
            leftContent.classList.add('animate');
        }
        
        // Animate right content with slight delay
        if (rightContent) {
            setTimeout(() => {
                rightContent.classList.add('animate');
            }, 300);
        }
        
        // Animate feature cards with staggered delay
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 500 + (index * 100));
        });
        
        // Animate stats with staggered delay
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('animate');
            }, 1000 + (index * 150));
        });
    }
}

// Animate Gallery section when it comes into view
function animateGalleryOnScroll() {
    const gallerySection = document.querySelector('.bg-gray-50.text-center');
    if (!gallerySection) return;
    
    const sectionHeader = gallerySection.querySelector('.reveal-up');
    const galleryItems = gallerySection.querySelectorAll('.gallery-item');
    const viewMoreButton = gallerySection.querySelector('.reveal-up:last-child');
    
    if (isInViewport(gallerySection)) {
        // Animate section header
        if (sectionHeader) {
            sectionHeader.classList.add('animate');
        }
        
        // Animate gallery items with staggered delay
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, 300 + (index * 100));
        });
        
        // Animate view more button with delay
        if (viewMoreButton) {
            setTimeout(() => {
                viewMoreButton.classList.add('animate');
            }, 1000);
        }
    }
}

// Animate Enrollment section when it comes into view
function animateEnrollmentOnScroll() {
    const enrollmentSection = document.querySelector('.relative.bg-cover.bg-center.text-white');
    if (!enrollmentSection) return;
    
    const leftForm = enrollmentSection.querySelector('.animate-slide-in-left');
    const rightContent = enrollmentSection.querySelector('.animate-slide-in-right');
    const progressBars = enrollmentSection.querySelectorAll('.progress-bar');
    
    if (isInViewport(enrollmentSection)) {
        // Animate left form
        if (leftForm) {
            leftForm.classList.add('animate');
        }
        
        // Animate right content with slight delay
        if (rightContent) {
            setTimeout(() => {
                rightContent.classList.add('animate');
            }, 300);
        }
        
        // Animate progress bars with staggered delay
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('animate');
            }, 600 + (index * 300));
        });
        
        // Start progress bar animation
        setTimeout(() => {
            animateProgress("students", 85);
            animateProgress("teachers", 65);
            animateProgress("courses", 75);
        }, 1000);
    }
}

// Animate Tech Hub section when it comes into view
function animateTechHubOnScroll() {
    const techHubSection = document.querySelector('.tech-hub-section');
    if (!techHubSection) return;
    
    if (isInViewport(techHubSection)) {
        techHubSection.classList.add('animate');
        
        // Animate progress bars
        animateTechProgress("ai", 85);
        animateTechProgress("cloud", 78);
        animateTechProgress("cyber", 92);
    }
}

// Tech progress bar animation
function animateTechProgress(id, target) {
    let bar = document.getElementById(id + "-bar");
    let count = document.getElementById(id + "-count");
    if (!bar || !count) return;
    
    let width = 0;
    let interval = setInterval(() => {
        if (width >= target) {
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + "%";
            count.innerText = width + "%";
        }
    }, 20);
}

// Animate feature cards when they come into view
function animateCardsOnScroll() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Animate about section elements when they come into view
function animateAboutOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    revealElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

// Counter animation function
function animateCounter() {
    const counters = document.querySelectorAll('.count');
    const speed = 2000; // The lower the slower
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed * 16.67);
        
        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounter(counter), 16.67);
        }
    });
}

// Animate stats when they come into view
function animateStatsOnScroll() {
    const statCards = document.querySelectorAll('.stat-card');
    let counted = false;
    
    statCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
            
            // Start counter only once
            if (!counted) {
                animateCounter();
                counted = true;
            }
        }
    });
}

// Animate course cards when they come into view
function animateCoursesOnScroll() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Animate video section when it comes into view
function animateVideoOnScroll() {
    const revealLeft = document.querySelector('.reveal-left');
    const revealRight = document.querySelector('.reveal-right');
    
    if (isInViewport(revealLeft)) {
        revealLeft.classList.add('animate');
        revealRight.classList.add('animate');
    }
}

// Video player functionality
function initVideoPlayer() {
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoEmbed = document.getElementById('video-embed');
    const videoIframe = document.getElementById('video-iframe');
    const videoOptions = document.querySelectorAll('.video-option');
    
    if (!videoThumbnail) return; // Exit if elements don't exist
    
    // Set default video
    let currentVideoId = 'dQw4w9WgXcQ'; // Replace with your default video ID
    
    // Play button click event
    videoThumbnail.addEventListener('click', function() {
        videoThumbnail.classList.add('hidden');
        videoEmbed.classList.remove('hidden');
        videoIframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`;
    });
    
    // Video option click events
    videoOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            videoOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update current video ID
            currentVideoId = this.getAttribute('data-video-id');
            
            // If video is already playing, update the source
            if (!videoEmbed.classList.contains('hidden')) {
                videoIframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`;
            }
        });
    });
    
    // Set first video option as active by default
    if (videoOptions.length > 0) {
        videoOptions[0].classList.add('active');
    }
}

// Animate teacher cards when they come into view
function animateTeachersOnScroll() {
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    teacherCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Animate progress bars + counting
function animateProgress(id, target) {
    let bar = document.getElementById(id + "-bar");
    let count = document.getElementById(id + "-count");
    if (!bar || !count) return; // Exit if elements don't exist
    
    let width = 0;
    let interval = setInterval(() => {
        if (width >= target) {
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + "%";
            count.innerText = width + "%";
        }
    }, 30); // speed
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || dots.length === 0) return; // Exit if elements don't exist
    
    let index = 0;
    const totalSlides = 5;  // total cards
    const visibleCards = 3; // show 3 at a time
    const step = 100 / visibleCards; // slide percentage

    function showTestimonialSlide(i) {
        slider.style.transform = `translateX(-${i * step}%)`;
        dots.forEach(dot => dot.classList.remove('bg-[#ff6600]'));
        dots[Math.floor(i % dots.length)].classList.add('bg-[#ff6600]');
    }

    function autoSlide() {
        index = (index + 1) % (totalSlides - visibleCards + 1);
        showTestimonialSlide(index);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            showTestimonialSlide(index);
        });
    });

    setInterval(autoSlide, 4000); // Auto-scroll every 4s
}

// Animate footer elements when they come into view
function animateFooterOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    revealElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
    
    // Initialize scroll animations
    animateWhyChooseUsOnScroll();
    animateGalleryOnScroll();
    animateEnrollmentOnScroll();
    animateTechHubOnScroll();
    animateCardsOnScroll();
    animateAboutOnScroll();
    animateStatsOnScroll();
    animateCoursesOnScroll();
    animateVideoOnScroll();
    animateTeachersOnScroll();
    animateFooterOnScroll();
    
    // Initialize other components
    initVideoPlayer();
    initTestimonialSlider();
    
    // Add scroll event listeners
    window.addEventListener('scroll', animateWhyChooseUsOnScroll);
    window.addEventListener('scroll', animateGalleryOnScroll);
    window.addEventListener('scroll', animateEnrollmentOnScroll);
    window.addEventListener('scroll', animateTechHubOnScroll);
    window.addEventListener('scroll', animateCardsOnScroll);
    window.addEventListener('scroll', animateAboutOnScroll);
    window.addEventListener('scroll', animateStatsOnScroll);
    window.addEventListener('scroll', animateCoursesOnScroll);
    window.addEventListener('scroll', animateVideoOnScroll);
    window.addEventListener('scroll', animateTeachersOnScroll);
    window.addEventListener('scroll', animateFooterOnScroll);
});