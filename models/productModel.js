const pool = require('../config/db');

const Product = {
    getProducto: async () => {
      const query = `
      SELECT p.*, c.nombre AS nombre_categoria
      FROM productos p
      JOIN producto_categorias pc ON p.id_producto = pc.id_producto
      JOIN categorias c ON pc.id_categoria = c.id_categoria
      `;
      const res = await pool.query(query);
      return res.rows;
    }
  };

module.exports = Product;
