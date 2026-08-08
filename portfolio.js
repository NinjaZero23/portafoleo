/* ============================================================
   PORTAFOLIO — portfolio.js
   Animaciones de entrada + nav scroll
   ============================================================ */

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── FADE UP al hacer scroll ── */
const fadeEls = document.querySelectorAll(
  '.skill-group, .project-card, .contact-item, .stat, .about-card-inner'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado para que aparezcan uno tras otro
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});


/* ── SMOOTH SCROLL para links del nav ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav').offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── AÑO ACTUAL en el footer ── */
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2025', new Date().getFullYear());
}
