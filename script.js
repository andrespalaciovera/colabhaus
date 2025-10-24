// CoLab Haus - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            console.log('Form Data:', { name, email, message });

            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // Button Click Handlers
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If it's not a form submit button
            if (this.type !== 'submit') {
                e.preventDefault();
                const buttonText = this.textContent.toLowerCase();

                // Handle different button actions
                if (buttonText.includes('learn more')) {
                    showNotification('For more information, please contact us!', 'info');
                } else if (buttonText.includes('apply now')) {
                    showNotification('Application process coming soon!', 'info');
                } else if (buttonText.includes('meet the team')) {
                    showNotification('Team page coming soon!', 'info');
                } else if (buttonText.includes('events')) {
                    showNotification('Events calendar coming soon!', 'info');
                }
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section, .header, .navbar');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Active Navigation Link on Scroll
    const sections2 = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections2.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // LinkedIn Social Link Handler
    const linkedinLogo = document.querySelector('.footer-social img');

    if (linkedinLogo) {
        linkedinLogo.addEventListener('click', function() {
            // Replace with actual LinkedIn URL
            window.open('https://www.linkedin.com/company/colabhaus', '_blank');
        });

        // Add cursor pointer style
        linkedinLogo.style.cursor = 'pointer';
    }

    // Card Hover Effects
    const cards = document.querySelectorAll('.card, .facility-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Input Focus Effects
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Notification Function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#E98853' : type === 'success' ? '#4CAF50' : '#F2B62B'};
        color: ${type === 'success' ? '#FFFFFF' : '#000000'};
        padding: 16px 24px;
        border-radius: 45px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Handle Mobile Menu (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-content');
    if (nav) {
        nav.classList.toggle('mobile-open');
    }
}

// Debounce Function for Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle Window Resize
const handleResize = debounce(function() {
    // Add any resize logic here if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Prevent default form submission for all forms
document.addEventListener('submit', function(e) {
    e.preventDefault();
});

// Log page load
console.log('CoLab Haus website loaded successfully!');
