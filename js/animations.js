/**
 * AFESU CONECTA — ANIMAÇÕES & SCROLL REVEAL
 */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer para revelar elementos com suavidade ao rolar
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Desconecta após animar uma vez para manter desempenho fluido
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antigos
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Efeito dinâmico na Navbar ao rolar a página
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });
});
