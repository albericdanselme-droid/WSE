/* ============================================================
   WSE — Script Premium v3
   Intro: smooth word reveal (no scramble), fade dissolve
   Mouse glow: lerp interpolation on hero
   ============================================================ */

'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ===== INTRO + LOGO FLY (FLIP animation) ===== */

function initIntro() {
  /* Guarantee the user starts at the very top */
  window.scrollTo(0, 0);
  /* Lock scroll during animation so hero is revealed at top */
  document.body.style.overflow = 'hidden';

  const nm = document.getElementById('navLogoMark');

  /* Reduced motion: skip straight to hero */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ['ci', 'flyLogo'].forEach(id => document.getElementById(id)?.remove());
    if (nm) { nm.style.opacity = '1'; nm.style.transition = 'none'; }
    document.body.style.overflow = '';
    return;
  }

  const ci = document.getElementById('ci');
  if (!ci) return;

  setTimeout(() => {
    /* Start logo fly → CI fades → hero reveals */
    triggerLogoFly();
    ci.classList.add('fading');

    setTimeout(() => {
      if (document.body.contains(ci)) ci.remove();
      /* Unlock scroll — no scrollTo(), l'overlay recouvrait la page déjà au top */
      document.body.style.overflow = '';
    }, 1500);
  }, 2500);
}

function triggerLogoFly() {
  const fly = document.getElementById('flyLogo');
  const nm  = document.getElementById('navLogoMark');
  if (!fly) return;

  /* If nav mark not found, just fade away */
  if (!nm) {
    fly.classList.add('fly-done');
    setTimeout(() => fly.remove(), 1100);
    return;
  }

  /* FLIP: First */
  const fr = fly.getBoundingClientRect();
  const nr = nm.getBoundingClientRect();

  const flyCX = fr.left + fr.width  / 2;
  const flyCY = fr.top  + fr.height / 2;
  const navCX = nr.left + nr.width  / 2;
  const navCY = nr.top  + nr.height / 2;

  /* Delta from fly center → nav mark center */
  const dx    = navCX - flyCX;
  const dy    = navCY - flyCY;
  const scale = nr.width / fr.width;

  /* Force flush so .fly-active transition is applied */
  fly.getBoundingClientRect();
  fly.classList.add('fly-active');
  fly.classList.add('fly-done'); /* starts opacity fade at 0.72s delay */
  fly.style.transform =
    `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;

  /* Show nav logo when fly lands (~0.92s) */
  setTimeout(() => {
    if (nm) nm.style.opacity = '1';
    setTimeout(() => fly.remove(), 380);
  }, 950);
}

document.addEventListener('DOMContentLoaded', initIntro);

/* ===== CUSTOM CURSOR ===== */
const cursor = $('#cursor');
const HOVERABLES = 'a, button, [role="button"], input, textarea, select, .filter-btn, .bento-card, .real-card, .process-step';

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 6 + 'px';
  cursor.style.top  = e.clientY - 6 + 'px';
}, { passive: true });

document.addEventListener('mouseover', e => {
  if (e.target.closest(HOVERABLES)) document.body.classList.add('cursor-hover');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(HOVERABLES)) document.body.classList.remove('cursor-hover');
});

/* Hero mouse glow removed — Premium Minimaliste: no ambient gradients */

/* ===== NAV SCROLL ===== */
const nav = $('#nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== ACTIVE NAV LINK ===== */
const navLinks = $$('.nav-link');
$$('section[id]').forEach(section =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    });
  }, { threshold: 0.4 }).observe(section)
);

/* ===== REVEAL ON SCROLL ===== */
requestAnimationFrame(() => {
  const hero = $('#hero');
  $$('.reveal').forEach(el => {
    if (hero?.contains(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight - 10) el.classList.add('below-fold');
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = e.target.dataset.delay ? +e.target.dataset.delay : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      obs.unobserve(e.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -12px 0px' });

  $$('.reveal.below-fold').forEach(el => obs.observe(el));
  setTimeout(() => $$('.reveal.below-fold:not(.visible)').forEach(el => el.classList.add('visible')), 1200);
});

/* ===== BENTO CARD SPOTLIGHT ===== */
$$('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
  }, { passive: true });
});

/* ===== FILTRE RÉALISATIONS ===== */
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.real-item').forEach(item =>
      item.classList.toggle('hidden', f !== 'all' && item.dataset.category !== f)
    );
  });
});

/* ===== FORMULAIRE — Web3Forms AJAX ===== */
/*
 * SETUP : Créez un compte sur https://web3forms.com avec contact@lawse.me
 * Puis remplacez YOUR_ACCESS_KEY dans index.html (champ hidden "access_key")
 * par la clé fournie — chaque soumission vous arrivera directement par email.
 */
const form   = $('#contactForm');
const formOk = $('#formOk');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  /* Honeypot anti-bot: champ rempli = bot, on ignore silencieusement */
  if (form.querySelector('[name="website"]')?.value) return;

  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…';

  /* Validation manuelle (novalidate est actif) */
  const nom   = form.querySelector('#nom');
  const email = form.querySelector('#email');
  const tel   = form.querySelector('#tel');
  const msg   = form.querySelector('#msg');
  if (!nom.value.trim() || !email.value.trim() || !tel.value.trim() || !msg.value.trim()) {
    btn.disabled = false;
    btn.innerHTML = 'Envoyer <i class="fas fa-paper-plane"></i>';
    return;
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key:  form.querySelector('[name="access_key"]')?.value || '',
        subject:     'Nouveau contact WSE — ' + nom.value,
        from_name:   'WSE Site Web',
        name:        nom.value,
        email:       email.value,
        phone:       tel.value,
        message:     msg.value,
        botcheck:    ''
      })
    });
    const json = await res.json();

    if (json.success) {
      form.reset();
      btn.style.display = 'none';
      formOk.classList.add('visible');
      setTimeout(() => {
        formOk.classList.remove('visible');
        btn.style.display = '';
        btn.disabled = false;
        btn.innerHTML = 'Envoyer <i class="fas fa-paper-plane"></i>';
      }, 5000);
    } else {
      throw new Error(json.message || 'Erreur inconnue');
    }
  } catch (err) {
    console.error('[WSE Form]', err);
    btn.disabled = false;
    btn.innerHTML = 'Envoyer <i class="fas fa-paper-plane"></i>';
    alert('Erreur d\'envoi. Contactez-nous directement : contact@lawse.me');
  }
});

/* ===== BACK TO TOP ===== */
const backTop = $('#backTop');
window.addEventListener('scroll', () => {
  backTop?.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== FOOTER YEAR ===== */
const yr = $('#year');
if (yr) yr.textContent = new Date().getFullYear();
