/* ══════════════════════════════════════════════
   ONYX CHEMICALS — app.js
   ══════════════════════════════════════════════ */

/* ── LOADER ───────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
    initWhatsApp();
  }, 1800);
});
document.body.style.overflow = 'hidden';

/* ── NAVBAR ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
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

  // Product section cards
  const prodCards = document.querySelectorAll('.prod-card');
  const prodObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          prodObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  prodCards.forEach((c, i) => {
    c.style.transitionDelay = `${i * 0.1}s`;
    prodObserver.observe(c);
  });

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
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* ══════════════════════════════════════════════
   PRODUCT DATA
   ══════════════════════════════════════════════ */
const PRODUCT_DATA = {
  construction: {
    //=========================== Costruction Chemicals================================
    title: 'Construction Chemicals',
    tag: 'Complete Chemical Solutions',
    items: [
      {
        title: 'Admixtures',
        description: 'Concrete admixtures that improve workability, accelerate or retard setting time, enhance strength and durability. Suitable for all grades of concrete in residential and commercial structures.',
        colorClass: 'c1',
        image: 'Assets/Products/Construction Chemicals/Admixture.png'
      },
      {
        title: 'Grouts and Anchors',
        description: 'High-strength solutions for anchoring, grouting, and secure structural fixing applications.',
        colorClass: 'c2',
        image: 'Assets/Products/Construction Chemicals/Grouts and Anchors.png'
      },
      {
        title: 'Termite Control',
        description: 'Effective solutions that protect buildings from termite infestation and structural damage.',
        colorClass: 'c3',
        image: 'Assets/Products/Construction Chemicals/Termite Control.png'
      },
      {
        title: 'Sealants and Adhesives',
        description: 'Reliable bonding and sealing solutions for construction and industrial applications. They ensure strong adhesion, flexibility, and protection against leakage and joint failure.',
        colorClass: 'c4',
        image: 'Assets/Products/Construction Chemicals/Sealants and Adhesives.png'
      },
      {
        title: 'Protective Coatings',
        description: 'Anti-carbonation, anti-chloride and chemical-resistant coatings that protect concrete and steel from aggressive environmental exposure and extend structure life.',
        colorClass: 'c5',
        image: 'Assets/Products/Construction Chemicals/Protective Coatings.png'
      },
    ]
  },

//========================Civil Work =====================

  civil: {
    title: 'Civil Work',
    tag: 'Structural Integrity Solutions',
    items: [
      {
        title: 'Asphalt Emulsions',
        description: 'Premium bituminous emulsions for road construction, pavement rehabilitation and surface treatments. Ideal for high-traffic roads, highways and urban infrastructure projects.',
        colorClass: 'c2',
        image: 'Assets/Products/Civil Work/Asphalt Emulsions.png'
      },
       
      {
        title: 'Repair and Rehabilitation',
        description: 'Specialised mortars and micro-concretes for restoration of columns, beams, slabs and retaining walls. Restores full structural capacity while matching aesthetic requirements.',
        colorClass: 'c3',
        image: 'Assets/Products/Civil Work/Repair and Rehabilitation.png'
      },
       
    ]
  },

//==========================Waterproofing=======================================

  waterproofing: {
    title: 'Waterproofing',
    tag: 'Moisture Barrier Solutions',
    items: [
      {
        title: 'Waterproofing Systems',
        description: 'Comprehensive waterproofing solutions including cementitious coatings, crystalline systems, bituminous membranes and liquid-applied membranes for roofs, basements, wet areas and water-retaining structures.',
        colorClass: 'c2',
        image: 'Assets/Products/Waterproofing/Waterproofing Systems.png'
      },
    
    ]
  },

// ========================Epoxy========================================

  epoxy: {
    title: 'Epoxy',
    tag: 'High-Performance Epoxy Systems',
    items: [
      {
        title: 'HI-BUILD Epoxy Paint',
        description: 'High-build two-component epoxy coatings for steel structures, water tanks, pipelines and industrial equipment. Provides outstanding corrosion resistance, chemical resistance and long service life.',
        colorClass: 'c3',
        image: 'Assets/Products/Epoxy/Hi Build Epoxy Paint.png'
      },
      {
        title: 'Flooring Solutions',
        description: 'Seamless epoxy and polyurethane floor systems for industrial plants, warehouses, food processing facilities, laboratories and commercial spaces. Available in self-levelling, screeds and mortar variants.',
        colorClass: 'c1',
        image: 'Assets/Products/Epoxy/Flooring Solutions.png'
      },
      
    ]
  }
};

/* ── PRODUCT PAGE OPEN / CLOSE ────────────────────── */
function openProductPage(category) {
  const data = PRODUCT_DATA[category];
  const overlay = document.getElementById('productPage');
  const titleEl = document.getElementById('ppTitle');
  const tagEl = document.getElementById('ppCategoryTag');
  const gridEl = document.getElementById('ppCardsGrid');

  titleEl.textContent = data.title;
  tagEl.textContent = data.tag;

  // Build cards
  gridEl.innerHTML = data.items.map((item, i) => `
    <div class="pp-item-card" style="animation-delay:${i * 0.08}s">
      <div class="pp-item-img">
        <div class="pp-item-img-placeholder ${item.colorClass}">
          ${item.image
            ? `<img
                src="${item.image}"
                alt="${item.title}"
                style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;"
                loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
               />
               <span style="display:none;font-family:var(--font-head);font-size:.85rem;letter-spacing:2px;opacity:.6;align-items:center;justify-content:center;height:100%;">${item.title}</span>`
            : `<span style="font-family:var(--font-head);font-size:.85rem;letter-spacing:2px;opacity:.6;">${item.title}</span>`
          }
        </div>
      </div>
      <div class="pp-item-body">
        <div class="pp-item-num">${String(i + 1).padStart(2, '0')}</div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <span class="pp-item-tag">${data.title}</span>
      </div>
    </div>
  `).join('');

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductPage() {
  const overlay = document.getElementById('productPage');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductPage();
});

/* ── CONTACT FORM ─────────────────────────────────── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();
  if (!name || !email || !message) { shakeForm(); return; }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

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

/* ── SMOOTH SCROLL OFFSET ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 74;
    window.scrollTo({ top: target.offsetTop - navH + 2, behavior: 'smooth' });
  });
});

if (window.scrollY > 40) navbar.classList.add('scrolled');

/* ── WHATSAPP FLOATING BUTTON ─────────────────────── */
function initWhatsApp() {
  const pulse = document.createElement('div');
  pulse.style.cssText = `
    position:fixed; bottom:28px; right:28px;
    width:60px; height:60px; border-radius:50%;
    background:rgba(37,211,102,0.4);
    animation:waPulse 2s ease-in-out infinite;
    z-index:9998; pointer-events:none;
  `;

  const btn = document.createElement('a');
  btn.href = 'https://wa.me/923132244506';
  btn.target = '_blank';
  btn.title = 'WhatsApp par contact karein';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:28px;
    width:60px; height:60px; border-radius:50%;
    background:#25D366; display:flex;
    align-items:center; justify-content:center;
    box-shadow:0 4px 16px rgba(37,211,102,.45);
    z-index:9999; text-decoration:none;
    animation:waBlink 2s ease-in-out infinite;
    transition:transform .2s ease, box-shadow .2s ease;
  `;
  btn.innerHTML = `<svg viewBox="0 0 24 24" width="34" height="34" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.animation = 'none';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.animation = 'waBlink 2s ease-in-out infinite';
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes waBlink {
      0%,100%{ box-shadow:0 4px 16px rgba(37,211,102,.45); }
      50%{ box-shadow:0 4px 28px rgba(37,211,102,.85),0 0 0 8px rgba(37,211,102,.15); }
    }
    @keyframes waPulse {
      0%{ transform:scale(1); opacity:.7; }
      70%,100%{ transform:scale(1.5); opacity:0; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(pulse);
  document.body.appendChild(btn);
}