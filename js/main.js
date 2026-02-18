// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    

    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
const revealElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // optional: reveal once
      }
    });
  },
  {
    threshold: 0.15, // % visible before triggering
  }
);

revealElements.forEach(el => observer.observe(el));

    
    // ===================================
    // TESTIMONIALS SLIDER
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (testimonialCards.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active');
            });
            
            if (index >= testimonialCards.length) currentSlide = 0;
            if (index < 0) currentSlide = testimonialCards.length - 1;
            
            testimonialCards[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide++;
                showSlide(currentSlide);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide--;
                showSlide(currentSlide);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-advance testimonials every 5 seconds
        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 7000);
    }
    
    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only prevent default if it's not just '#'
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // LAZY LOADING FOR IMAGES
    // ===================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===================================
    // ACTIVE NAVIGATION LINK
    // ===================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPath.includes(linkPath) || 
            (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
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
    
    // Apply debounce to scroll handler
    const debouncedReveal = debounce(revealOnScroll, 100);
    window.removeEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', debouncedReveal);
    
    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Add keyboard navigation for slider
    if (nextBtn && prevBtn) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        });
    }
    
    // Focus management for mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
    }
});
