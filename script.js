// DOM Elements
const navTrigger = document.getElementById('navTrigger');
const sideNavbar = document.getElementById('sideNavbar');
const closeNav = document.getElementById('closeNav');
const mainContent = document.getElementById('mainContent');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
const mobileNavToggle = document.createElement('button');
mobileNavToggle.innerHTML = '☰';
mobileNavToggle.id = 'mobileNavToggle';
mobileNavToggle.style.position = 'fixed';
mobileNavToggle.style.top = '20px';
mobileNavToggle.style.right = '20px';
mobileNavToggle.style.zIndex = '1000';
mobileNavToggle.style.fontSize = '24px';
mobileNavToggle.style.background = 'transparent';
mobileNavToggle.style.border = 'none';
mobileNavToggle.style.color = '#333';
mobileNavToggle.style.cursor = 'pointer';
mobileNavToggle.style.display = 'none';
document.body.appendChild(mobileNavToggle);

// Desktop Navigation
navTrigger.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
        sideNavbar.classList.add('active');
        mainContent.style.transform = 'translateX(-350px)';
    }
});

closeNav.addEventListener('click', () => {
    sideNavbar.classList.remove('active');
    mainContent.style.transform = 'translateX(0)';
});

// Mobile Navigation Toggle
mobileNavToggle.addEventListener('click', () => {
    sideNavbar.classList.toggle('active');
    if (sideNavbar.classList.contains('active')) {
        mainContent.style.transform = 'translateX(-350px)';
    } else {
        mainContent.style.transform = 'translateX(0)';
    }
});

// Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        sideNavbar.classList.remove('active');
        mainContent.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .form-group');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize Animation States
document.querySelectorAll('.project-card, .skill-category, .form-group').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.5s ease';
});

// Animate Name
function animateName() {
    const name = document.getElementById('animatedName');
    const nameText = name.textContent;
    name.innerHTML = ''; 
    
    nameText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'name-letters';
        span.textContent = letter;
        span.style.animationDelay = `${index * 0.1}s`;
        name.appendChild(span);
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const btn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }
    
    // Send email
    btn.value = 'Sending...';
    
    const serviceID = 'service_frbvtzh';
    const templateID = 'template_25fhftz';
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
        }, (err) => {
            btn.value = 'Send Email';
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            console.error('EmailJS error:', err);
        });
});

// Check screen size for responsive behavior
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        mobileNavToggle.style.display = 'block';
        sideNavbar.classList.remove('active');
        mainContent.style.transform = 'translateX(0)';
    } else {
        mobileNavToggle.style.display = 'none';
        sideNavbar.classList.add('active');
        mainContent.style.transform = 'translateX(-350px)';
    }
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Event Listeners
window.addEventListener('load', () => {
    animateOnScroll();
    animateName();
    checkScreenSize();
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', checkScreenSize);