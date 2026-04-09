  // ------------------- CATEGORIA MOTIVOS -------------------
  document.querySelectorAll('.cf-motivo').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cf-motivo').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('cfMotivo').value = btn.getAttribute('data-motivo');
    });
  });

  // ------------------- ENVÍO FORMULARIO -------------------
  document.getElementById('cfSubmit').addEventListener('click', async () => {
    // Capturar valores
    const datos = {
        nombre:   document.getElementById('cfNombre').value.trim(),
        apellido: document.getElementById('cfApellido').value.trim(),
        email:    document.getElementById('cfEmail').value.trim(),
        telefono: document.getElementById('cfTelefono').value.trim(),
        motivo:   document.getElementById('cfMotivo').value,
        mensaje:  document.getElementById('cfMensaje').value.trim()
    };

    const submit = document.getElementById('cfSubmit');

    // Validación sencilla
    if (!datos.nombre || !datos.email || !datos.mensaje) {
      submit.style.background = '#e74c3c'; // Rojo error
      submit.textContent = 'Rellena los campos obligatorios';
      setTimeout(() => {
        submit.style.background = '';
        submit.textContent = 'Enviar mensaje';
      }, 2400);
      return;
    }

    try {
      // Enviar datos al servidor
      const respuesta = await fetch('/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (respuesta.ok) {
        // Si todo salió bien, mostrar confirmación
        submit.style.display = 'none';
        document.querySelector('.cf-privacy').style.display = 'none';
        document.getElementById('cfConfirm').style.display = 'flex';
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      console.error(error);
    }
  });