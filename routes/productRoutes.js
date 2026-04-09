const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/carta', productController.getMenuPage);

module.exports = router;
