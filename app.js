const express = require("express");
const app = express();
const path = require("path")
const PORT = 3000;

// motor de plantillas
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//paso de página estáticas de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
const pageRoutes = require("./routes/pageRoutes");
app.use("/", pageRoutes);

//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});