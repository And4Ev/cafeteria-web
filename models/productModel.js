const pool = require('../config/db');

const Product = {
    getAll: async () => {
      const query = `
        SELECT productos.*, categorias.nombre AS nombre_categoria 
        FROM productos
        JOIN categorias ON productos.id_categoria = categorias.id_categoria
        ORDER BY productos.id_producto ASC
      `;
      const res = await pool.query(query);
      return res.rows;
    }
  };

module.exports = Product;