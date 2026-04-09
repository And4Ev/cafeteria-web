const pool = require('../config/db');

const Contacto = {
    insertContact: async (nombre, apellido, email, telefono, motivo, mensaje) => {
      const query = `
        INSERT INTO mensajes_contacto (nombre, apellido, email, telefono, motivo, mensaje)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await pool.query(query, [nombre, apellido, email, telefono, motivo, mensaje]);
    }
  };

  module.exports = Contacto;