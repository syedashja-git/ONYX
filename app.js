/* ══════════════════════════════════════════════
   ONYX CHEMICALS — script.js
   ══════════════════════════════════════════════ */

/* ── LOADER ───────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
  }, 1800);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';

/* ── NAVBAR ───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Scroll: add class on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

// Mobile toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active link tracking
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      const id = section.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* ── SCROLL REVEAL ────────────────────────────────── */
function initAnimations() {
  // General reveal elements
  const revealEls = document.querySelectorAll(
    '.section-header, .about-text > *, .about-visual, .contact-info, .contact-form-wrap, .pillar, .stat'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));

  // Service cards
  const cards = document.querySelectorAll('.srv-card');
  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach(c => cardObserver.observe(c));

  // Counter animation
  const stats = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach(s => statObserver.observe(s));
}

/* ── COUNTER ANIMATION ────────────────────────────── */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

/* ── CONTACT FORM ─────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  // Simple validation
  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  // Simulate sending (replace with real API call / EmailJS / etc.)
  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1400);
});

function shakeForm() {
  form.style.animation = 'shake .4s ease';
  form.addEventListener('animationend', () => form.style.animation = '', { once: true });
}

// Inject shake keyframes
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-5px)}
    80%{transform:translateX(5px)}
  }
`;
document.head.appendChild(styleTag);

/* ── SMOOTH SCROLL OFFSET (navbar compensation) ──── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 74;
    window.scrollTo({
      top: target.offsetTop - navH + 2,
      behavior: 'smooth'
    });
  });
});

/* ── NAVBAR TRANSPARENT ➜ DARK on first load ─────── */
// Immediately mark as scrolled if page is already scrolled (e.g. after refresh)
if (window.scrollY > 40) navbar.classList.add('scrolled');