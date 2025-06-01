        const navTrigger = document.getElementById('navTrigger');
        const sideNavbar = document.getElementById('sideNavbar');
        const closeNav = document.getElementById('closeNav');
        const mainContent = document.getElementById('mainContent');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navTrigger.addEventListener('mouseenter', () => {
            sideNavbar.classList.add('active');
            mainContent.style.transform = 'translateX(-350px)';
        });
        
        closeNav.addEventListener('click', () => {
            sideNavbar.classList.remove('active');
            mainContent.style.transform = 'translateX(0)';
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
        
        document.getElementById('contactForm').addEventListener('submit', function(e) {
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
            
            setTimeout(() => {
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                document.getElementById('contactForm').reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        });
        
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        window.addEventListener('load', () => {
            animateOnScroll();
            animateName();
        });
        
        window.addEventListener('scroll', animateOnScroll);
    /*
    emailjs.init('rFsbJOc1vcQxzVMpa');

    document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
    
    emailjs.sendForm('service_frbvtzh', 'template_2ngss4f', this)
        .then(() => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            this.reset();
        })
        .catch(() => {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        });
});*/