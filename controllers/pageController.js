const Product = require('../models/productModel');

// Función para la página de INICIO (Index)
exports.getIndexPage = async (req, res) => {
  try {
    const productosDB = await Product.getAll();
    // Aquí renderizamos index.ejs y le pasamos también los productos
    res.render('index', { productosDB, extraScripts: ['home'] }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar el inicio");
  }
};
//Función para carta.ejs
exports.getMenuPage = async (req, res) => {
  try {
    const productosDB = await Product.getAll();
    res.render('carta', { productosDB, extraScripts: ['menu'] }); // cargamos la base de datos y el script
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar la carta");
  }
};

// Función para renderizar la página de salas
exports.getSalasPage = (req, res) => {
  res.render('salas', {extraScripts: ['reservas'] // Esto buscará public/js/salas.js
  });
};

// Función para renderizar Login
/*exports.getLoginPage = (req, res) => {
  res.render('login', {extraScripts: ['login'] // Esto buscará public/js/login.js
  });
};*/

