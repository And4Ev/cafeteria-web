 // ===== CAMBIO PANEL LOGIN / REGISTRO =====
  const panelLogin    = document.getElementById('panelLogin');
  const panelRegistro = document.getElementById('panelRegistro');

  document.getElementById('btnIrRegistro').addEventListener('click', () => {
    panelLogin.style.display    = 'none';
    panelRegistro.style.display = 'block';
  });

  document.getElementById('btnIrLogin').addEventListener('click', () => {
    panelRegistro.style.display = 'none';
    panelLogin.style.display    = 'block';
  });

  // Mostrar panel de registro si viene ?panel=registro en la URL
  if (new URLSearchParams(window.location.search).get('panel') === 'registro') {
    panelLogin.style.display    = 'none';
    panelRegistro.style.display = 'block';
  }

  // ===== OJO — MOSTRAR/OCULTAR CONTRASEÑA =====
  function toggleEye(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn   = document.getElementById(btnId);
    btn.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.style.color = input.type === 'text' ? 'var(--caramel)' : '';
    });
  }
  toggleEye('loginPass', 'eyeLogin');
  toggleEye('regPass',   'eyeReg');

  // ===== FUERZA DE CONTRASEÑA =====
  document.getElementById('regPass').addEventListener('input', function () {
    const v   = this.value;
    const bar = document.getElementById('strengthBar');
    const hint = document.getElementById('hintPass');
    let score = 0;
    if (v.length >= 8)              score++;
    if (/[A-Z]/.test(v))            score++;
    if (/[0-9]/.test(v))            score++;
    if (/[^A-Za-z0-9]/.test(v))     score++;

    const levels = [
      { w: '0%',   bg: 'transparent', txt: '' },
      { w: '25%',  bg: 'var(--rust)',    txt: 'Muy débil' },
      { w: '50%',  bg: 'var(--caramel)', txt: 'Aceptable' },
      { w: '75%',  bg: 'var(--accent)',  txt: 'Buena' },
      { w: '100%', bg: 'var(--green)',   txt: 'Excelente' },
    ];
    bar.style.width      = levels[score].w;
    bar.style.background = levels[score].bg;
    hint.textContent     = levels[score].txt;
    hint.className       = 'lf-hint' + (score >= 3 ? ' lf-hint--ok' : '');
  });

  // ===== VALIDAR CONTRASEÑAS COINCIDEN =====
  document.getElementById('regPass2').addEventListener('input', function () {
    const hint = document.getElementById('hintPass2');
    if (this.value && this.value !== document.getElementById('regPass').value) {
      hint.textContent = 'Las contraseñas no coinciden';
      hint.className   = 'lf-hint lf-hint--error';
    } else if (this.value) {
      hint.textContent = 'Coinciden ✓';
      hint.className   = 'lf-hint lf-hint--ok';
    } else {
      hint.textContent = '';
    }
  });

  // ===== VALIDAR FORMULARIO ANTES DE ENVIAR =====
  document.getElementById('formRegistro').addEventListener('submit', function (e) {
    const p1 = document.getElementById('regPass').value;
    const p2 = document.getElementById('regPass2').value;
    if (p1 !== p2) {
      e.preventDefault();
      document.getElementById('hintPass2').textContent = 'Las contraseñas no coinciden';
      document.getElementById('hintPass2').className   = 'lf-hint lf-hint--error';
    }
  });
