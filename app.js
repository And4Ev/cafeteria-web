const express = require("express");
const session = require('express-session');
const path = require("path");
// Cargamos variables de entorno si usas .env
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARES DE PARSEO (Deben ir antes de las rutas)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. CONFIGURACIÓN DE SESIÓN
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

// 3. MOTOR DE PLANTILLAS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// 4. ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// 5. IMPORTACIÓN DE RUTAS (Aquí estaba el fallo)
const authRoutes = require("./routes/authRoutes"); // Importamos el router de auth
const pageRoutes = require("./routes/pageRoutes");

// 6. USO DE RUTAS
app.use("/", authRoutes); // Rutas de login, registro, perfil, etc.
app.use("/", pageRoutes); // Rutas generales (index, carta, etc.)

// 7. SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});