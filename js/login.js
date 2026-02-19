document.addEventListener('DOMContentLoaded', function() {
    // Add input animation on focus
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('animate-pulse-slow');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('animate-pulse-slow');
    });
    });
    
    // Add button animation on hover
    const button = document.querySelector('.login-btn');
    button.addEventListener('mouseenter', function() {
    this.classList.add('animate-glow');
    });
    
    button.addEventListener('mouseleave', function() {
    this.classList.remove('animate-glow');
    });
    
    // Add subtle animation to form elements on page load
    const formElements = document.querySelectorAll('input, button, a');
    formElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Create floating particles
    createFloatingParticles();
});

function createFloatingParticles() {
    const colors = ['text-primary', 'text-blue-800', 'text-slate-600'];
    const icons = ['fas fa-code', 'fas fa-laptop', 'fas fa-database', 'fas fa-cloud', 'fas fa-mobile-alt', 'fas fa-server'];
    
    for (let i = 0; i < 12; i++) {
    const particle = document.createElement('i');
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.className = `${randomIcon} ${randomColor} floating-icon text-xl`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${5 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = `${0.1 + Math.random() * 0.3}`;
    
    document.body.appendChild(particle);
    }
}