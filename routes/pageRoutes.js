const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController');
const pool = require('../config/db'); 

router.get('/', productController.getIndexPage);

router.get('/salas', pageController.getSalasPage);
router.get('/contacto', pageController.getContacto);

router.post('/contacto', pageController.insertContact);

module.exports = router;