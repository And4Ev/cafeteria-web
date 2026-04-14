//MENU HAMBURGUESA
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function toggleNav() {
  navToggle.classList.toggle('is-open');
  navLinks.classList.toggle('is-open');
  navOverlay.classList.toggle('is-open');
  // Bloquear scroll del body mientras el menú está abierto
  document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);

  // Cerrar al hacer clic en cualquier enlace del menú
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) toggleNav();
    });
  });
}

/*-------------------CURSOR — granito de café */
const cursor = document.getElementById('cursor');

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

/* -------------------SCROLL ------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));