/* menu carta */
const filterBtns = document.querySelectorAll('.carta-filter-btn');
const cartaCards = document.querySelectorAll('#cartaMenuGrid .menu-card');
const emptyState = document.getElementById('cartaEmpty');

function filtrarProductos(filter) {
  let visible = 0;

  cartaCards.forEach(card => {
    const cat = card.getAttribute('data-cat');
    const show = cat === filter; /* filtro estricto */
    card.style.display = show ? 'block' : 'none';
    if (show) visible++;
  });

  if (emptyState) {
    emptyState.style.display = visible === 0 ? 'block' : 'none';
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    filtrarProductos(filter);
  });
});
 //se ejecuta al cargar la página para mostrar el filtro activo por defecto (si hay alguno)
const activo = document.querySelector('.carta-filter-btn.active');

if(activo) {
  const filtroInicial = activo.getAttribute('data-filter');
  filtrarProductos(filtroInicial);
}