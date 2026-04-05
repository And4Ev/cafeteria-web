const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');
const pool = require('../config/db'); 

router.get('/', pageController.getIndexPage);
router.get("/", (req, res) => {
  res.render("index");
});

router.get('/carta', pageController.getMenuPage);
router.get("/carta", (req, res) => {
  res.render("carta");
});

router.get('/salas', pageController.getSalasPage);
router.get("/salas", (req, res) => {
  res.render("salas");
});

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

//Ruta de Contactos
router.post('/contacto/enviar', async (req, res) => {
  const { nombre, apellido, email, telefono, motivo, mensaje } = req.body;

  try {
      await pool.query(
          'INSERT INTO mensajes_contacto (nombre, apellido, email, telefono, motivo, mensaje) VALUES ($1, $2, $3, $4, $5, $6)',
          [nombre, apellido, email, telefono, motivo, mensaje]
      );
      res.status(200).json({ success: true, message: 'Mensaje guardado correctamente' });
  } catch (error) {
      console.error('Error al guardar mensaje:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;