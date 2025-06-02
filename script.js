document.addEventListener('DOMContentLoaded', function() {
    const navTrigger = document.getElementById('navTrigger');
    const sideNavbar = document.getElementById('sideNavbar');
    const closeNav = document.getElementById('closeNav');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.id = 'mobileMenuBtn';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.style.position = 'fixed';
    mobileMenuBtn.style.top = '20px';
    mobileMenuBtn.style.right = '20px';
    mobileMenuBtn.style.zIndex = '1000';
    mobileMenuBtn.style.fontSize = '24px';
    mobileMenuBtn.style.background = 'rgba(0,0,0,0.5)';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.borderRadius = '50%';
    mobileMenuBtn.style.width = '50px';
    mobileMenuBtn.style.height = '50px';
    mobileMenuBtn.style.color = 'white';
    mobileMenuBtn.style.cursor = 'pointer';
    mobileMenuBtn.style.display = 'none'; 
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) { 
            mobileMenuBtn.style.display = 'block';
            navTrigger.style.display = 'none'; 
            
            sideNavbar.classList.remove('active');
            mainContent.style.transform = 'translateX(0)';
        } else { 
            mobileMenuBtn.style.display = 'none';
            navTrigger.style.display = 'block'; 
            
            sideNavbar.classList.add('active');
            mainContent.style.transform = 'translateX(-350px)';
        }
    }
    
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
    
    mobileMenuBtn.addEventListener('click', () => {
        sideNavbar.classList.toggle('active');
        if (sideNavbar.classList.contains('active')) {
            mainContent.style.transform = 'translateX(-350px)';
        } else {
            mainContent.style.transform = 'translateX(0)';
        }
    });
    
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
    
    document.querySelectorAll('.project-card, .skill-category, .form-group').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.5s ease';
    });
    
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
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
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
            
            formMessage.textContent = 'Thank you for your message!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
        });
    }
    
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    window.addEventListener('load', () => {
        animateOnScroll();
        animateName();
        checkScreenSize();
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', checkScreenSize);
});