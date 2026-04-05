/* Definimos la función primero */
function toggleEye(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn   = document.getElementById(btnId);
    if(!input || !btn) return; 

    btn.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.style.color = input.type === 'text' ? 'var(--caramel)' : '';
    });
}

/* EjecutA las llamadas */
toggleEye('recPass',  'eyeRec1');
toggleEye('recPass2', 'eyeRec2');

// Validación de fuerza de contraseña
const recPassInput = document.getElementById('recPass');
if (recPassInput) {
    recPassInput.addEventListener('input', function () {
        const v = this.value;
        const bar = document.getElementById('strengthBar');
        const hint = document.getElementById('hintPass');
        let score = 0;
        if (v.length >= 8) score++;
        if (/[A-Z]/.test(v)) score++;
        if (/[0-9]/.test(v)) score++;
        if (/[^A-Za-z0-9]/.test(v)) score++;

        const levels = [
            { w: '0%',   bg: 'transparent',    txt: '' },
            { w: '25%',  bg: 'var(--rust)',     txt: 'Muy débil' },
            { w: '50%',  bg: 'var(--caramel)', txt: 'Aceptable' },
            { w: '75%',  bg: 'var(--accent)',  txt: 'Buena' },
            { w: '100%', bg: 'var(--green)',   txt: 'Excelente' },
        ];
        bar.style.width = levels[score].w;
        bar.style.background = levels[score].bg;
        hint.textContent = levels[score].txt;
        hint.className = 'lf-hint' + (score >= 3 ? ' lf-hint--ok' : '');
    });
}

/* Validar que coincidan antes de enviar */
const form = document.getElementById('formRecuperar');
if (form) {
    form.addEventListener('submit', function (e) {
        const p1 = document.getElementById('recPass').value;
        const p2 = document.getElementById('recPass2').value;

        if (p1 !== p2) {
            e.preventDefault(); // Bloquea el envío al servidor
            const hint2 = document.getElementById('hintPass2');
            hint2.textContent = 'Las contraseñas no coinciden';
            hint2.className = 'lf-hint lf-hint--error';
        }
    });
}