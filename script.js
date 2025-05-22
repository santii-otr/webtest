// ==========================================================================
// NEXUS HOSTING - JAVASCRIPT
// ==========================================================================

// DOM Elements
const cursor = document.getElementById('cursor');
const cursorDot = cursor.querySelector('.cursor-dot');
const cursorOutline = cursor.querySelector('.cursor-outline');
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const particlesContainer = document.getElementById('particles');

// ==========================================================================
// LOADING SCREEN
// ==========================================================================

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initializeAnimations();
    }, 2000);
});

// ==========================================================================
// CUSTOM CURSOR
// ==========================================================================

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .plan-card, .feature-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
    
    element.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    element.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
});

// ==========================================================================
// PARTICLES SYSTEM
// ==========================================================================

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position and properties
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.5 + 0.1;
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Create particles periodically
setInterval(createParticle, 300);

// ==========================================================================
// NAVIGATION
// ==========================================================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================================================
// HERO SECTION ANIMATIONS
// ==========================================================================

function initializeAnimations() {
    // Animate hero stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 99.9) {
                stat.textContent = current.toFixed(1);
            } else {
                stat.textContent = Math.ceil(current);
            }
        }, 20);
    });
    
    // Server animation
    animateServer();
    
    // Plan cards hover effects
    initializePlanCards();
    
    // Feature cards animations
    initializeFeatureCards();
}

// ==========================================================================
// SERVER ANIMATION
// ==========================================================================

function animateServer() {
    const serverUnits = document.querySelectorAll('.server-unit');
    const dataStreams = document.querySelectorAll('.data-stream');
    
    // Animate server units
    setInterval(() => {
        serverUnits.forEach(unit => {
            if (Math.random() > 0.7) {
                unit.classList.toggle('active');
            }
        });
    }, 1000);
    
    // Animate data streams
    dataStreams.forEach((stream, index) => {
        stream.style.animationDelay = `${index * 0.3}s`;
    });
}

// ==========================================================================
// PLAN CARDS
// ==========================================================================

function initializePlanCards() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        const button = card.querySelector('.plan-btn');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
        
        // Button click effect
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate purchase process
            simulatePurchase(card.getAttribute('data-plan'));
        });
    });
}

// ==========================================================================
// FEATURE CARDS
// ==========================================================================

function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate metric numbers
                const metricNumber = entry.target.querySelector('.metric-number');
                if (metricNumber) {
                    animateMetric(metricNumber);
                }
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            const iconGlow = card.querySelector('.icon-glow');
            if (iconGlow) {
                iconGlow.style.opacity = '0.8';
                iconGlow.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const iconGlow = card.querySelector('.icon-glow');
            if (iconGlow) {
                iconGlow.style.opacity = '0.4';
                iconGlow.style.transform = 'scale(1)';
            }
        });
    });
}

function animateMetric(element) {
    const text = element.textContent;
    const number = parseFloat(text);
    
    if (!isNaN(number)) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            if (text.includes('.')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.ceil(current) + text.replace(number.toString(), '');
            }
        }, 30);
    }
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function scrollToPlans() {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
        const offsetTop = plansSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function simulatePurchase(plan) {
    // Create notification
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">🚀</div>
            <div class="notification-text">
                <h4>¡Excelente elección!</h4>
                <p>Redirigiendo al checkout para el plan ${plan}...</p>
            </div>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Simulate redirect (replace with actual checkout URL)
    setTimeout(() => {
        console.log(`Redirecting to checkout for ${plan} plan...`);
        // window.location.href = `/checkout?plan=${plan}`;
    }, 2000);
}

// ==========================================================================
// SCROLL EFFECTS
// ==========================================================================

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.plan-card, .feature-card, .cta-section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ==========================================================================
// BUTTON EFFECTS
// ==========================================================================

// Add particle effects to primary buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        const particles = button.querySelector('.btn-particles');
        if (particles) {
            particles.classList.add('active');
            setTimeout(() => {
                particles.classList.remove('active');
            }, 600);
        }
    });
});

// ==========================================================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================================================

// Throttle scroll events
let ticking = false;

function updateScrollElements() {
    // Update navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
});

// ==========================================================================
// RESPONSIVE HANDLERS
// ==========================================================================

function handleResize() {
    // Update particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (parseFloat(particle.style.left) > window.innerWidth) {
            particle.remove();
        }
    });
}

window.addEventListener('resize', handleResize);

// ==========================================================================
// ACCESSIBILITY
// ==========================================================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ==========================================================================
// ERROR HANDLING
// ==========================================================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Nexus Hosting initialized successfully!');
    
    // Initialize all components
    if (document.readyState === 'complete') {
        initializeAnimations();
    }
});

// ==========================================================================
// ADDITIONAL ANIMATIONS & EFFECTS
// ==========================================================================

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loading
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 30);
    }
}, 3000);

// Glitch effect for logo
function glitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1/3;
    }, 30);
}

// Apply glitch effect to logo on hover
document.querySelectorAll('.logo-text').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        glitchEffect(logo);
    });
});

console.log('🎮 All systems operational - Welcome to Nexus Hosting!');