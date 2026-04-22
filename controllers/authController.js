const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Reservation = require('../models/reservationModel');

exports.getLoginPage = (req, res) => {
    const error = req.session.error || null;
    const success = req.session.success || null;
       
    delete req.session.error;
    delete req.session.success;

    res.render('login', {
        errorMessage: error,
        successMessage: success,
        panel: req.query.panel || 'login', // Para saber qué panel mostrar
        extraScripts: ['login'] 
    });
};

exports.postRegistro = async (req, res) => {
    const { nombre, username, email, password, password2 } = req.body;
    
    try {
        const passwordHash = await bcrypt.hash(password, 12);
        await User.createUser({ nombre, username, email, passwordHash });
        req.session.success = '¡Cuenta creada!';
        res.redirect('/login');
    } catch (err) {
        req.session.error = 'el email o el usuario ya existe';
        res.redirect('/login?panel=registro');
    }
};

exports.postLogin = async (req, res) => {
    const { identificador, password } = req.body;
    const usuario = await User.findById(identificador);

    if (usuario && await bcrypt.compare(password, usuario.password)) {
        req.session.usuarioId = usuario.id_usuario;
        req.session.username = usuario.username;
        return res.redirect('/perfil');
    }
    req.session.error = 'Credenciales incorrectas';
    res.redirect('/login');
};

exports.getPerfil = async (req, res) => {
    try {
        const id_usuario = req.session.usuarioId;

        //Obtener datos del usuario 
        const usuario = await User.getProfile(id_usuario);

        //Obtener sus reservas 
        const misReservas = await Reservation.getReservasPorUsuario(id_usuario);

        //Renderizar pasando AMBOS datos
        res.render('perfil', {
            usuario,
            reservas: misReservas
        });

    } catch (error) {
        console.error("Error al cargar el perfil:", error);
        // Es buena idea manejar el error por si la base de datos falla
        res.status(500).send("Error al cargar el perfil");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};

// Función para mostrar la página recuperar
exports.getRecuperarPage = (req, res) => {
    res.render('recuperar', {
        error: null,
        exito: false, 
        extraScripts: ['recuperar'] 
    });
};

// Función para procesar el cambio de contraseña
exports.postRecuperarPassword = async (req, res) => {
    const { email, password } = req.body; 

    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Actualiza base de datos
        const usuarioActualizado = await User.updatePassword(email, hashedPassword);

        if (usuarioActualizado) {
            //Renderiza la misma página pero cambiando las variables
            return res.render('recuperar', {
                exito: true, 
                error: null,
                extraScripts: ['recuperar'] 
            });
        } else {
            return res.render('recuperar', {
                exito: false,
                error: 'El email introducido no pertenece a ningún socio.',
                extraScripts: ['recuperar']
            });
        }
    } catch (error) {
        console.error(error);
        res.render('recuperar', { 
            exito: false, 
            error: 'Error al procesar la solicitud.',
            extraScripts: ['recuperar']
        });
    }
};
