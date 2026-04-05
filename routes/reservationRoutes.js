const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { requireLogin } = require('../middlewares/authMiddleware');

router.post('/reservar-sala', requireLogin, reservationController.postReserva);
router.get('/ocupacion', requireLogin, reservationController.getOcupacion);

module.exports = router;