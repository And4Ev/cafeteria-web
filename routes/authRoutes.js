const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin, yaLogueado } = require('../middlewares/authMiddleware');


router.get('/login', yaLogueado, authController.getLoginPage);
router.post('/login', yaLogueado, authController.postLogin);

router.post('/registro', yaLogueado, authController.postRegistro);
router.get('/perfil', requireLogin, authController.getPerfil);
router.post('/logout', authController.logout);


//página de recuperación de contraseña
router.get('/recuperar', authController.getRecuperarPage); 
router.post('/recuperar', authController.postRecuperarPassword);

module.exports = router;