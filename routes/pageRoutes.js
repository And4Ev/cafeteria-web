const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');

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

module.exports = router;