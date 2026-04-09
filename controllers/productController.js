const Product = require('../models/productModel');

// pasar productos(BD) a la sección carta de index.ejs
exports.getIndexPage = async (req, res) => {
  try {
    const productosDB = await Product.getProducto();
    res.render('index', { productosDB, extraScripts: ['home']}); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar la carta");
  }
};
//pasar productos(BD) a la carta.ejs
exports.getMenuPage = async (req, res) => {
    try {
      const productosDB = await Product.getProducto();
      res.render('carta', { productosDB, extraScripts: ['menu'] }); // se pasa menu.js para el filtro de productos
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al cargar la carta");
    }
  };

