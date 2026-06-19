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

// ─── Download CV functionality ────────────────────────────────────────────────
// Inject spinner keyframe once so the loading icon can animate
(function injectSpinKeyframe() {
    if (document.getElementById('cv-spin-style')) return;
    const style = document.createElement('style');
    style.id = 'cv-spin-style';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
})();

const downloadCVBtn = document.getElementById('download-cv');

if (downloadCVBtn) {
    // SVG icons reused across states
    const ICON_DOWNLOAD = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
    const ICON_SPINNER  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite;" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
    const ICON_CHECK    = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

    downloadCVBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const cvPath     = downloadCVBtn.getAttribute('data-cv-path');
        const fileName   = 'Nassim_Elbadri_CV.pdf';

        // ── Loading state ──────────────────────────────────────────────────────
        downloadCVBtn.disabled = true;
        downloadCVBtn.setAttribute('aria-busy', 'true');
        downloadCVBtn.setAttribute('aria-label', 'Downloading CV…');
        downloadCVBtn.innerHTML = `${ICON_SPINNER} Downloading…`;

        /** Restore button to original or success state, then back to original */
        const restoreBtn = (success) => {
            if (success) {
                downloadCVBtn.innerHTML = `${ICON_CHECK} Downloaded!`;
                downloadCVBtn.setAttribute('aria-label', 'CV downloaded successfully');
                setTimeout(() => {
                    downloadCVBtn.innerHTML = `${ICON_DOWNLOAD} Download CV`;
                    downloadCVBtn.setAttribute('aria-label', 'Download my CV as PDF');
                    downloadCVBtn.disabled = false;
                    downloadCVBtn.removeAttribute('aria-busy');
                }, 2500);
            } else {
                downloadCVBtn.innerHTML = `${ICON_DOWNLOAD} Download CV`;
                downloadCVBtn.setAttribute('aria-label', 'Download my CV as PDF');
                downloadCVBtn.disabled = false;
                downloadCVBtn.removeAttribute('aria-busy');
            }
        };

        try {
            // ── Primary: fetch → Blob → <a download> ──────────────────────────
            const response = await fetch(cvPath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status} — ${response.statusText}`);
            }

            const blob    = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href       = blobUrl;
            link.download   = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the Blob URL after the browser handles the click
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

            restoreBtn(true);
            console.log('CV downloaded successfully');

        } catch (error) {
            console.warn('Primary download failed, using fallback:', error);

            // ── Fallback: open PDF in a new tab so user can save manually ─────
            try {
                window.open(cvPath, '_blank', 'noopener,noreferrer');
                restoreBtn(true);
                console.log('CV opened in new tab as fallback');
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                restoreBtn(false);
                alert(
                    'Unable to download CV automatically.\n' +
                    'Please open the following URL manually:\n' +
                    window.location.origin + cvPath
                );
            }
        }
    });
}
