document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect and active section detection
    window.addEventListener('scroll', function() {
        const currentTheme = html.getAttribute('data-theme');
        
        // Update navbar background
        if (window.scrollY > 100) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link detection
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call to set active link on page load
    updateActiveNavLink();
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.expertise-card, .project-card, .skill-category, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 0.8s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 400);
    }
    
    // Tech stack animation
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 600 + (index * 60)); // Even faster animation for 18 items
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    };
    
    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number > 0) {
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Expertise card hover effects
    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Skill item hover effects
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Contact form validation (if you add a form later)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation and submission logic here
            console.log('Form submitted');
        });
    }
    
    // Typing effect for hero role
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (typedTextSpan && cursorSpan) {
        const textArray = [
            "Cyber Security", 
            "Professional Services Engineer", 
            "Full Stack Developer", 
            "AppSec",
            "DevSecOps"
        ];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) {
                    textArrayIndex = 0;
                }
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        // Start typing animation after page load
        setTimeout(() => {
            if (textArray.length) {
                type();
            }
        }, 1000);
    }
    
    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top:hover {
            background-color: var(--primary-dark) !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Lazy load images if added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add loading animation for page transitions
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Initialize navbar background for current theme
    updateNavbarBackground(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update navbar background based on new theme
        updateNavbarBackground(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'var(--theme-transition)';
    });
    
    // Function to update navbar background based on theme
    function updateNavbarBackground(theme) {
        if (window.scrollY > 100) {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#ffd700'; // Gold color for sun
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '#007acc'; // Blue color for moon
        }
    }
    
    // Check for system preference (optional enhancement)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Only set if user hasn't made a choice yet
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
            updateNavbarBackground('dark');
        }
    }
    
    // Console welcome message
    console.log(`
    🚀 Welcome to Sunny's Portfolio!
    
    👨‍💻 Full Stack Engineer | Enterprise Applications
    🏢 Currently at Cognizant
    💻 Java | Spring Boot | ReactJS | Microservices
    
    📧 sunnychakraborty0206@gmail.com
    🔗 linkedin.com/in/sunnychakrab0rty
    🐙 github.com/sunnyc0206
    
    🌙 Dark/Light mode enabled!
    
    Thanks for checking out my work! 🎉
    `);
    
});

// Add some CSS animations
const additionalStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .tech-item:nth-child(1) { animation: float 3s ease-in-out infinite; }
    .tech-item:nth-child(2) { animation: float 3s ease-in-out infinite 0.3s; }
    .tech-item:nth-child(3) { animation: float 3s ease-in-out infinite 0.6s; }
    .tech-item:nth-child(4) { animation: float 3s ease-in-out infinite 0.9s; }
    .tech-item:nth-child(5) { animation: float 3s ease-in-out infinite 1.2s; }
    .tech-item:nth-child(6) { animation: float 3s ease-in-out infinite 1.5s; }
    .tech-item:nth-child(7) { animation: float 3s ease-in-out infinite 1.8s; }
    .tech-item:nth-child(8) { animation: float 3s ease-in-out infinite 2.1s; }
    .tech-item:nth-child(9) { animation: float 3s ease-in-out infinite 2.4s; }
    .tech-item:nth-child(10) { animation: float 3s ease-in-out infinite 2.7s; }
    .tech-item:nth-child(11) { animation: float 3s ease-in-out infinite 3.0s; }
    .tech-item:nth-child(12) { animation: float 3s ease-in-out infinite 0.2s; }
    .tech-item:nth-child(13) { animation: float 3s ease-in-out infinite 0.5s; }
    .tech-item:nth-child(14) { animation: float 3s ease-in-out infinite 0.8s; }
    .tech-item:nth-child(15) { animation: float 3s ease-in-out infinite 1.1s; }
    .tech-item:nth-child(16) { animation: float 3s ease-in-out infinite 1.4s; }
    .tech-item:nth-child(17) { animation: float 3s ease-in-out infinite 1.7s; }
    .tech-item:nth-child(18) { animation: float 3s ease-in-out infinite 2.0s; }
    
    .expertise-icon:hover {
        animation: pulse 1s ease-in-out;
    }
    
    .skill-item:hover {
        animation: pulse 0.5s ease-in-out;
    }
    
    /* Theme transition animations */
    * {
        transition: background-color var(--theme-transition), 
                    color var(--theme-transition), 
                    border-color var(--theme-transition),
                    box-shadow var(--theme-transition);
    }
    
    /* Smooth theme icon transition */
    .theme-toggle-btn i {
        transition: all var(--theme-transition);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;

document.head.appendChild(styleSheet); 
