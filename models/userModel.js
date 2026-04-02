const pool = require('../config/db'); // Usa tu conexión de /config/db.js

const User = {
    // Buscar por email o username
    findByIdentifier: async (id) => {
        const res = await pool.query('SELECT * FROM usuarios WHERE email = $1 OR username = $1', [id.toLowerCase().trim()]);
        return res.rows[0];
    },
    // Crear nuevo usuario
    create: async (data) => {
        const { nombre, username, email, passwordHash } = data;
        return await pool.query(
            `INSERT INTO usuarios (nombre, username, email, password, puntos, es_socio, fecha_registro)
             VALUES ($1, $2, $3, $4, 0, true, NOW())`,
            [nombre.trim(), username.toLowerCase().trim(), email.toLowerCase().trim(), passwordHash]
        );
    },
    // Obtener datos para el perfil
    getProfile: async (id) => {
        const res = await pool.query(
            'SELECT id_usuario, nombre, username, email, puntos, fecha_registro FROM usuarios WHERE id_usuario = $1',
            [id]
        );
        return res.rows[0];
    }
};

module.exports = User;