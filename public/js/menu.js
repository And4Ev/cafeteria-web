/* menu carta */
const filterBtns = document.querySelectorAll('.carta-filter-btn');
const cartaCards = document.querySelectorAll('#cartaMenuGrid .menu-card');
const emptyState = document.getElementById('cartaEmpty');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    let visible = 0;

    cartaCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? 'block' : 'none';
      if (show) visible++;
    });

    emptyState.style.display = visible === 0 ? 'block' : 'none';
  });
});