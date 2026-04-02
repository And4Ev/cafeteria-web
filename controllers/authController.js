const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.getLoginPage = (req, res) => {
    res.render('login', {
        error: req.session.error || null,
        success: req.session.success || null,
        extraScripts: ['login'] // Para cargar tu public/js/login.js
    });
    delete req.session.error;
    delete req.session.success;
};

exports.postRegistro = async (req, res) => {
    const { nombre, username, email, password, password2 } = req.body;
    // ... aquí pegas las validaciones (if password !== password2, etc.) del archivo auth.js ...
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
/**exports.postLogin = async (req, res) => {
    console.log("¡Intento de login recibido!");
    console.log("Datos recibidos:", req.body); // Esto te dirá si llegan vacíos

    const { identificador, password } = req.body;

    try {
        const usuario = await User.findByIdentifier(identificador);
        console.log("Usuario encontrado en DB:", usuario ? "SÍ" : "NO");

        if (usuario && await bcrypt.compare(password, usuario.password)) {
            console.log("¡Contraseña correcta! Creando sesión...");
            req.session.usuarioId = usuario.id_usuario;
            
            // IMPORTANTE: Forzar el guardado de la sesión antes de redirigir
            return req.session.save(() => {
                console.log("Sesión guardada. Redirigiendo a /perfil");
                res.redirect('/perfil');
            });
        }

        console.log("Fallo: Usuario no existe o contraseña mal");
        res.redirect('/login');
    } catch (err) {
        console.error("ERROR CRÍTICO:", err);
        res.redirect('/login');
    }
};
***/
exports.getPerfil = async (req, res) => {
    const usuario = await User.getProfile(req.session.usuarioId);
    res.render('perfil', { usuario });
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};