/* MODAL */
const overlay   = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalSubmit = document.getElementById('modalSubmit');
const modalConfirm = document.getElementById('modalConfirm');

document.querySelectorAll('.sala-reserva-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.getAttribute('data-sala');
    document.getElementById('modalIdSala').value = btn.getAttribute('data-id'); //captura id-sala
    modalConfirm.style.display = 'none';
    modalSubmit.style.display = 'block';
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

modalSubmit.addEventListener('click', async() => {
  const data = {
    id_sala: document.getElementById('modalIdSala').value,
    nombre: document.getElementById('modalNombre').value.trim(),
    email: document.getElementById('modalEmail').value.trim(),
    fecha: document.getElementById('modalFecha').value,
    hora: document.getElementById('modalHora').value,
    duracion: document.getElementById('modalDuracion').value,
    notas: document.getElementById('modalNotas').value
  };

  if (!data.nombre || !data.email || !data.fecha || !data.hora) {
    modalSubmit.style.background = 'var(--rust)';
    modalSubmit.textContent = 'Rellena los campos obligatorios';
    setTimeout(() => {
      modalSubmit.style.background = '';
      modalSubmit.textContent = 'Enviar solicitud';
    }, 2200);
    return;
  }
  try {
    const response = await fetch('/reservar-sala', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      modalSubmit.style.display = 'none';
      modalConfirm.style.display = 'block';
      setTimeout(cerrarModal, 2800);
    } else {
      alert("Hubo un error al procesar la reserva.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
/* TACHAR HORAS */
const selectHora = document.getElementById('modalHora');
const inputFecha = document.getElementById('modalFecha');

inputFecha.addEventListener('change', async () => {
    const fecha = inputFecha.value;
    const idSala = document.getElementById('modalIdSala').value;

    if (!fecha) return;

    try {
        //Consulta al servidor
        const response = await fetch(`/ocupacion?sala=${idSala}&fecha=${fecha}`);
        const ocupadas = await response.json();

        //Habilita todas las opciones 
        Array.from(selectHora.options).forEach(opt => {
            opt.disabled = false;
            opt.style.color = ""; // Quitamos el estilo de "bloqueado"
        });

        //Bloquea las horas usadas
        ocupadas.forEach(reserva => {
            // Extraemos la hora (ej: "11:00:00" -> 11)
            const horaInicio = parseInt(reserva.hora.split(':')[0]);
            const duracion = parseFloat(reserva.duracion); // "2" -> 2

            for (let i = 0; i < duracion; i++) {
                const horaABloquear = (horaInicio + i).toString().padStart(2, '0') + ":00";
                
                const opcion = Array.from(selectHora.options).find(opt => opt.value === horaABloquear);
                if (opcion) {
                    opcion.disabled = true;
                    opcion.style.color = "#ccc";
                }
            }
        });

    } catch (error) {
        console.error("Error al actualizar horas:", error);
    }
});

/* FAQ ACORDEÓN */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});