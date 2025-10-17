// DOM Elements
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const loading = document.querySelector('.loading');
const images = document.querySelectorAll('img');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.style.display = 'none';
    }, 3000);
});

// Smooth Scrolling and Navigation
let currentSection = 0;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    currentSection = index;

    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

// Dot Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        scrollToSection(index);
    });
});

// Initialize dots
updateDots();

// Scroll Detection
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (currentSection !== index) {
                    currentSection = index;
                    updateDots();
                }
            }
        });
    }, 100);
});


// Lightbox Functionality
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.photo-item, .gallery-item, .collage-item')) {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt;
        lightbox.classList.add('active');
    }
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'Escape':
            if (lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
            break;
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.quality-card, .message-bubble, .wish-item').forEach(el => {
    observer.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    document.querySelectorAll('.floating-elements').forEach(el => {
        el.style.transform = `translateY(${rate * 0.1}px)`;
    });
});

// Performance Optimization
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.classList.contains('lazy')) {
            imageObserver.observe(img);
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDots();

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .quality-card, .message-bubble, .wish-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .quality-card.animate-in, .message-bubble.animate-in, .wish-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Prevent context menu on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Music toggle (placeholder for future implementation)
let musicPlaying = false;
function toggleMusic() {
    musicPlaying = !musicPlaying;
    // Add music implementation here if needed
}
