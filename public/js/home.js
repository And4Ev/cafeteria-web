/* Reloj */
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    document.getElementById('clockTime').textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 1000);