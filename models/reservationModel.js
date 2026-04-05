// Importar la conexión a la DB
const pool = require('../config/db'); 

const Reservation = {
    // Función para insertar la reserva
    crearReserva: async (datos) => {
        const { id_sala, id_usuario, nombre_cliente, email, duracion, fecha, hora} = datos;
        
        const query = `
            INSERT INTO reservas (id_sala, id_usuario, nombre_cliente, email, duracion, fecha, hora) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
            
        const values = [id_sala, id_usuario, nombre_cliente, email, duracion, fecha, hora];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    getOcupacion: async (id_sala, fecha) => {
        const query = `
            SELECT hora, duracion 
            FROM reservas 
            WHERE id_sala = $1 AND fecha = $2 AND estado != 'cancelada'
        `;
        const result = await pool.query(query, [id_sala, fecha]);
        return result.rows;
    },
   
    getReservasPorUsuario: async (id_usuario) => {
    const query = `
        SELECT r.*, s.nombre AS nombre_sala 
        FROM reservas r
        JOIN salas s ON r.id_sala = s.id_sala
        WHERE r.id_usuario = $1
        ORDER BY r.fecha DESC, r.hora DESC
    `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows;
    }
};

// Busca reservas de un día concreto para una sala concreta
const obtenerOcupacion = async (id_sala, fecha) => {
    const query = `
        SELECT hora, duracion FROM reservas 
        WHERE id_sala = $1 AND fecha = $2 AND estado != 'cancelada'
    `;
    const result = await pool.query(query, [id_sala, fecha]);
    return result.rows;
};

module.exports = Reservation;