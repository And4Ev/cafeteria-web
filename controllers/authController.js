const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Reservation = require('../models/reservationModel');

exports.getLoginPage = (req, res) => {
    res.render('login', {
        error: req.session.error || null,
        success: req.session.success || null,
        extraScripts: ['login'] // carga el script.js
    });
    delete req.session.error;
    delete req.session.success;
};

exports.postRegistro = async (req, res) => {
    const { nombre, username, email, password, password2 } = req.body;
    //validaciones (if password !== password2, etc.) del archivo auth.js ...
    try {
        const passwordHash = await bcrypt.hash(password, 12);
        await User.create({ nombre, username, email, passwordHash });
        req.session.success = '¡Cuenta creada!';
        res.redirect('/login');
    } catch (err) {
        req.session.error = 'Error al registrarse';
        res.redirect('/login?panel=registro');
    }
};

exports.postLogin = async (req, res) => {
    const { identificador, password } = req.body;
    const usuario = await User.findByIdentifier(identificador);

    if (usuario && await bcrypt.compare(password, usuario.password)) {
        req.session.usuarioId = usuario.id_usuario;
        req.session.username = usuario.username;
        return res.redirect('/perfil');
    }
    req.session.error = 'Credenciales incorrectas';
    res.redirect('/login');
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
