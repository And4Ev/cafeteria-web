// ===================== MODAL =====================
const overlay   = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalSubmit = document.getElementById('modalSubmit');
const modalConfirm = document.getElementById('modalConfirm');

document.querySelectorAll('.sala-reserva-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.getAttribute('data-sala');
    modalConfirm.style.display = 'none';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function cerrarModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', cerrarModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) cerrarModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarModal();
});

modalSubmit.addEventListener('click', () => {
  const nombre   = document.getElementById('modalNombre').value.trim();
  const email    = document.getElementById('modalEmail').value.trim();
  const fecha    = document.getElementById('modalFecha').value;
  const hora     = document.getElementById('modalHora').value;

  if (!nombre || !email || !fecha || !hora) {
    modalSubmit.style.background = 'var(--rust)';
    modalSubmit.textContent = 'Rellena los campos obligatorios';
    setTimeout(() => {
      modalSubmit.style.background = '';
      modalSubmit.textContent = 'Enviar solicitud';
    }, 2200);
    return;
  }

  modalSubmit.style.display = 'none';
  modalConfirm.style.display = 'block';

  setTimeout(() => {
    cerrarModal();
    modalSubmit.style.display = '';
  }, 2800);
});

// ===================== FAQ ACORDEÓN =====================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});