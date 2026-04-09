const Contacto = require('../models/formContactModel');

// Renderizar la página de salas
exports.getSalasPage = (req, res) => {
  res.render('salas', {extraScripts: ['reservas'] 
  });
};

// Renderizar la página de contacto
exports.getContacto = (req, res) => {
  // Recuperar mensaje de exito
  const success = req.session.success;
  delete req.session.success; 

  res.render('contacto', {
    extraScripts: ['formContacto'],
    successMessage: success 
  });
};
exports.insertContact = async (req, res) => {
  const { nombre, apellido, email, telefono, motivo, mensaje } = req.body;

  try {
      await Contacto.insertContact(nombre, apellido, email, telefono, motivo, mensaje);
      res.status(200).json({ 
        success: true, 
        message: 'Mensaje enviado' });
  } catch (error) {
      console.error('Error al guardar mensaje:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error en el servidor' });
  }
}
