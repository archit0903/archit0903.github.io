const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Handle different page structures
    if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
        // Home page
        if (linkPath === 'index.html' || linkPath === '../../index.html') {
            link.classList.add('active');
        }
    } else if (linkPath) {
        // Check if current page contains the link path
        if (currentPage.includes(linkPath) && !linkPath.includes('index.html')) {
            link.classList.add('active');
        }
    }
});

// Form submission handling for contact page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        // For now, we'll log it and show a success message
        console.log('Contact form submitted:', data);
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after 5 seconds and show form again
            setTimeout(() => {
                this.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // If no success message element, just reset the form
            this.reset();
            alert('Thank you for your message! I\'ll get back to you soon.');
        }
    });
}

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = 'none';
        }
    }
});

// Animation on scroll for skill cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill items and project cards
document.querySelectorAll('.skill-item, .project-card, .philosophy-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Code snippet animation for hero section
const codeSnippet = document.querySelector('.code-snippet');
if (codeSnippet) {
    setTimeout(() => {
        codeSnippet.style.transform = 'translateY(0)';
        codeSnippet.style.opacity = '1';
    }, 500);
}

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Animate skill bars when stack page is loaded
if (window.location.pathname.includes('stack.html')) {
    setTimeout(animateSkillBars, 1000);
}

// Preload images for better user experience
function preloadImages() {
    const images = [
        '../images/archit.jpg',
        '../images/digital photo.JPG'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Set current year in footer if needed
    const yearElements = document.querySelectorAll('.footer-copyright p');
    yearElements.forEach(el => {
        el.textContent = el.textContent.replace('2023', new Date().getFullYear());
    });
});

// Handle window resize for responsive design
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add CSS for resize animation stopper
const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(resizeStyle);
