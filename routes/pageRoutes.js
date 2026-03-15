const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/carta", (req, res) => {
  res.render("carta");
});

router.get("/salas", (req, res) => {
  res.render("salas");
});

router.get("/contacto", (req, res) => {
  res.render("contacto");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;