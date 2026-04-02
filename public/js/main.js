// menú hamburguesa del header o el modo oscuro

// no se que es esto
/* script automático que inyecta Cloudflare (un servicio de seguridad y rendimiento web) para proteger los correos electrónicos que aparecen en tu 
página de los bots de spam.
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
*/

//CURSOR — granito de café
const cursor = document.getElementById('cursor');

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));