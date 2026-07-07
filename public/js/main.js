const navbar  = document.getElementById('navbar');
const ham     = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActive();
});

function openMenu() {
  ham.classList.add('open');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  navbar.classList.add('mobile-open');
  navbar.style.zIndex = '10000';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  ham.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  navbar.classList.remove('mobile-open');
  navbar.style.zIndex = '';
  document.body.style.overflow = '';
}

ham?.addEventListener('click', () => {
  mobileNav?.classList.contains('open') ? closeMenu() : openMenu();
});

mobileNav?.querySelectorAll('a').forEach(l => {
  l.addEventListener('click', closeMenu);
});

function updateActive() {
  const sections = document.querySelectorAll('section[id]');
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
  });
}

// Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' }); }
  });
});

// Contact form
const form   = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');
form?.addEventListener('submit', async e => {
  e.preventDefault();
  let valid = true;
  ['name', 'email', 'service'].forEach(n => {
    const el  = form.elements[n];
    const grp = el?.closest('.f-group');
    const bad = !el?.value?.trim() || (n === 'service' && !el.value);
    grp?.classList.toggle('err', bad);
    if (bad) valid = false;
  });
  if (!valid) return;

  const btn  = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Gönderiliyor...';
  btn.disabled    = true;

  try {
    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    form.elements['name'].value,
        email:   form.elements['email'].value,
        phone:   form.elements['phone']?.value,
        service: form.elements['service'].value,
        message: form.elements['message']?.value,
      }),
    });
    const d = await r.json();
    if (formOk) {
      formOk.textContent  = d.success ? '✅ ' + d.message : '❌ ' + d.message;
      formOk.style.display = 'block';
      if (d.success) form.reset();
    }
  } catch {
    if (formOk) { formOk.textContent = '❌ Bağlantı hatası.'; formOk.style.display = 'block'; }
  } finally {
    btn.textContent = orig;
    btn.disabled    = false;
  }
});

// Newsletter
document.getElementById('nlBtn')?.addEventListener('click', () => {
  const inp = document.getElementById('nlInput');
  if (inp?.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) {
    inp.value = '';
    inp.placeholder = '✓ Abone oldunuz!';
    setTimeout(() => { inp.placeholder = 'E-posta adresiniz'; }, 3000);
  }
});

// Blog filter
window.filterPosts = cat => {
  document.querySelectorAll('[data-cat]').forEach(el => {
    el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
  });
};

updateActive();
