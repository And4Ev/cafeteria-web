const Reservation = require('../models/reservationModel');

exports.postReserva = async (req, res) => {
    try {
        // Preparar el objeto con lo que viene del formulario + el ID del usuario en sesión
        const datosReserva = {
            id_sala: req.body.id_sala,
            id_usuario: req.session.usuarioId,
            nombre_cliente: req.body.nombre,
            email: req.body.email,
            duracion: req.body.duracion,
            fecha: req.body.fecha,
            hora: req.body.hora
        };

        const nuevaReserva = await Reservation.crearReserva(datosReserva);
        res.status(200).json({ 
            success: true, 
            mensaje: 'Reserva guardada correctamente',
            data: nuevaReserva 
        });

    } catch (error) {
        console.error("Error en reservationController:", error);
        res.status(500).json({ 
            success: false, 
            mensaje: 'Error al procesar la reserva en el servidor' 
        });
    }
};

exports.getOcupacion = async (req, res) => {
    try {
        const { sala, fecha } = req.query;
        const ocupadas = await Reservation.getOcupacion(sala, fecha);
        
        res.status(200).json(ocupadas);
    } catch (error) {
        console.error("Error al obtener ocupación:", error);
        res.status(500).json({ error: 'Error al consultar disponibilidad' });
    }
};