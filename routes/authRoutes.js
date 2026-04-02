const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin, yaLogueado } = require('../middlewares/authMiddleware');

router.get('/login', yaLogueado, authController.getLoginPage);
router.post('/login', yaLogueado, authController.postLogin);
router.post('/registro', yaLogueado, authController.postRegistro);
router.get('/perfil', requireLogin, authController.getPerfil);
router.post('/logout', authController.logout);

module.exports = router;