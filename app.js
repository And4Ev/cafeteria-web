const express = require("express");
const session = require('express-session');
const path = require("path");
// Cargamos variables de entorno si usas .env
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES DE PARSEO 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONFIGURACIÓN DE SESIÓN
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_secure',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    },
}));

//  MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//  ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// IMPORTACIÓN DE RUTAS 
const authRoutes = require("./routes/authRoutes"); 
const pageRoutes = require("./routes/pageRoutes");
const productRoutes = require("./routes/productRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use((req, res, next) => {
  res.locals.usuarioLogueado = req.session.usuarioId || null;
  next();
});

// USO DE RUTAS
app.use("/", authRoutes); // Rutas de login, registro, perfil, recuperación contraseña.
app.use("/", pageRoutes); // Rutas generales (index, carta, contacto.)
app.use("/", productRoutes); // Rutas relacionadas con productos 
app.use("/", reservationRoutes); // Rutas para reserva de salas

// SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});