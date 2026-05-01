// ========== NAV MOBILE TOGGLE ==========
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks && hamburger) {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.getElementById('hamburger');
      if (navLinks && hamburger) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });

  // ========== SCROLL PROGRESS ==========
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }

  // ========== NAV SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ========== REVEAL ANIMATION ==========
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // ========== CONTACT FORM ==========
  window.submitForm = function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre')?.value;
    const tel = document.getElementById('telefono')?.value;
    const servicio = document.getElementById('servicio')?.value;
    const mensaje = document.getElementById('mensaje')?.value;
    const form = document.getElementById('contactForm');

    if (nombre && tel && servicio) {
      const waMsg = encodeURIComponent(
        `Hola JemcoTech! Mi nombre es ${nombre}.\nMi Teléfono es: ${tel}\nRequiero el Servicio de: ${servicio}\ny mi Problema es: ${mensaje || 'No especificado'}`
      );
      window.open(`https://wa.me/573045402914?text=${waMsg}`, '_blank');
    }

    const success = document.getElementById('formSuccess');
    if (form && success) {
      form.reset();
      success.style.display = 'block';
      setTimeout(() => {
        success.style.display = 'none';
      }, 5000);
    }
  };
});

// ========== MIS REPARACIONES - LIGHTBOX ==========
let currentCategory = '';
let currentIndex = 0;
let allImages = {};

document.addEventListener('DOMContentLoaded', function() {
  // Gallery slider navigation
  window.slideGallery = function(btn, direction) {
    const container = btn.parentElement.querySelector('.gallery-slider');
    if (container) {
      const scrollAmount = 220;
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  // Touch swipe for gallery
  const gallerySliders = document.querySelectorAll('.gallery-slider');
  if (gallerySliders.length > 0) {
    gallerySliders.forEach(slider => {
      let touchStartX = 0;
      
      slider.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      
      slider.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          slider.scrollBy({ left: diff > 0 ? 150 : -150, behavior: 'smooth' });
        }
      }, { passive: true });
    });
  }

  // Build image gallery data
  const gallerySlidersAll = document.querySelectorAll('.gallery-slider');
  if (gallerySlidersAll.length > 0) {
    gallerySlidersAll.forEach(slider => {
      const category = slider.dataset.category;
      const items = [];
      slider.querySelectorAll('.gallery-item').forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-item-overlay');
        if (img && overlay) {
          items.push({
            src: img.src,
            caption: overlay.textContent
          });
        }
      });
      allImages[category] = items;
    });

    // Lightbox functions
    window.openLightbox = function(category, index) {
      currentCategory = category;
      currentIndex = index;
      updateLightbox();
      const lightbox = document.getElementById('lightbox');
      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeLightbox = function() {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    window.navigateLightbox = function(direction) {
      const images = allImages[currentCategory];
      if (images && images.length) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateLightbox();
      }
    };

    function updateLightbox() {
      const images = allImages[currentCategory];
      if (images && images.length) {
        const image = images[currentIndex];
        const imgEl = document.getElementById('lightbox-img');
        const captionEl = document.getElementById('lightbox-caption');
        if (imgEl) imgEl.src = image.src;
        if (captionEl) captionEl.textContent = `${image.caption} (${currentIndex + 1}/${images.length})`;
      }
    }

    // Close lightbox on click outside
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.addEventListener('click', function(e) {
        if (e.target === this) closeLightbox();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox || !lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
});