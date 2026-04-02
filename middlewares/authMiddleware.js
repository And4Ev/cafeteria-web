exports.yaLogueado = (req, res, next) => {
    if (req.session && req.session.usuarioId) return res.redirect('/perfil');
    next();
};

 exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.usuarioId) return next();
    res.redirect('/login');
};
