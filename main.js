// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const nav = document.querySelector('.desktop-nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }

            // Scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.glass-nav');

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', debounce(handleScroll, 100));

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.desktop-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}



// Intersection Observer for fade-up animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with .fade-up class
document.querySelectorAll('.fade-up').forEach((element) => {
    observer.observe(element);
});

// Add staggered delay to skill categories dynamically if not already set
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    if (!category.style.transitionDelay) {
        category.style.transitionDelay = `${index * 100}ms`;
    }
});

// Copy to Clipboard functionality
const copyBtn = document.getElementById('copy-email-btn');
const toast = document.getElementById('toast');

if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('nassimelbadri19@gmail.com');
            // Show toast
            toast.classList.add('show');
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
}

