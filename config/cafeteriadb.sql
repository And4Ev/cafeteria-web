-- Crear la base de datos
CREATE DATABASE cafeteriadb;

-- Crear la tabla usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    puntos INTEGER DEFAULT 0,
    es_socio BOOLEAN DEFAULT true,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla salas
CREATE TABLE salas (
    id_sala SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    capacidad INTEGER,
    descripcion TEXT
);

-- Crear tabla reservas
CREATE TABLE reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_sala INTEGER REFERENCES salas(id_sala),
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    nombre_cliente VARCHAR(100),
    email VARCHAR((255),
    duracion VARCHAR((50),
    fecha DATE,
    hora TIME,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Crear tabla Categorias
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    disponible BOOLEAN DEFAULT true
);

-- Tabla intermedia (Relaciona productos con muchas categorías)
CREATE TABLE producto_categorias (
    id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
    id_categoria INTEGER REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_categoria)
);
-- Tabla de formulario-contacto
CREATE TABLE mensajes_contacto (
    id_mensaje SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    motivo VARCHAR(50),
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insertar datos en la tabla categorias
INSERT INTO categorias (nombre) VALUES
('invierno'), 
('verano'), 
('temporada'), 
('desayuno'), 
('merienda'), 
('bebida'), 
('combo'), 
('bagel'), 
('bollería'),
('cafe');

 -- Insertar datos en la tabla productos
INSERT INTO productos (nombre, precio, id_categoria, descripcion, imagen, disponible) VALUES
('Ethiopian Natural', 4.50, 3, 'Notas de frutos rojos y jazmín.',NULL, true),
('Cold Brew Espresso', 3.80, 2, 'Extracción en frío 18h. Intenso, suave, sin acidez.', NULL, true),
('Café con leche', 1.80, 2, 'El de siempre. Café honesto con leche entera.', NULL, true),
('Pumpkin Spice Latte', 4.20, 2, 'Café con leche, calabaza, canela y nata. El favorito de la temporada.', NULL, true),
('El Clásico', 6.50, 6, 'Estilo Nueva York. Con queso crema y salmón ahumado.', NULL, true),
('El Vegetariano', 4.90, 6, 'Bagel tostado con queso crema y pepino. Simple y perfecto.', NULL, true),
('Croissant mantequilla', 2.20, 7, 'Hojaldrado, crujiente, con mantequilla de calidad.', NULL, true),
('Combo dulce y salado', 9.90, 4, 'Café de especialidad + bagel + bollería. ', NULL, true),
('Combo dulce y salado', 9.90, 5, 'Café de especialidad + bagel + bollería. ', NULL, true),
('Combo dulce y salado', 9.90, 2, 'Café de especialidad + bagel + bollería. ', NULL, true),
('Combo Insider', 8.50, 2, 'Café de especialidad + bagel + bollería. ', NULL, true),
('Guatemalan Washed', 4.50, 1, 'Notas de caramelo y nuez moscada. Limpio y redondo.', NULL, true),
('Cold Frappé', 4.80, 1, 'Café, leche, hielo y vainilla. Refrescante y energizante.', NULL, true),
('Matcha Latte Frío', 4.20, 1, 'Matcha japonés premium con leche de avena y hielo.', NULL, true),
('Café con hielo', 2.50, 1, 'Espresso doble sobre hielo. Rápido, frío, perfecto.', NULL, true),
('Smoked Salmon', 7.20, 1, 'Bagel de sésamo, queso crema, salmón y alcaparras.', NULL, true),
('Avocado & Egg', 6.80, 1, 'Bagel tostado con aguacate, huevo y cherry.', NULL, true),
('Muffin de limón', 2.80, 1, 'Esponjoso, ácido y con glaseado de limón fresco.', NULL, true),
('Combo veraniego', 8.50, 1, 'Frappé o cold brew + bagel a elegir. El dúo perfecto.', NULL, true);

-- Insercción del producto con su categoría:
INSERT INTO producto_categorias (id_producto, id_categoria) 
VALUES 
    (1, 10), (1, 1),
    (2, 10), (2, 1),
    (3, 10), (3, 1),
    (4, 10), (4, 1),
    (13, 10), (13, 2),
    (14, 10), (14, 2),
    (15, 10), (15, 2),
    (5, 8), (5, 4), (5, 5),
    (6, 8), (6, 4), (6, 5),
    (16, 8), (16, 4), (16, 5),
    (17, 8), (17, 4), (17, 5),
    (7, 9), (7, 4), (7, 5),
    (18, 9), (18, 4), (18, 5);
    
    -- Insercción 3 tipos de salas:
INSERT INTO salas (nombre, tipo, capacidad, descripcion) VALUES 
('Sala Mercury', 'Reunion', 6, 'Diseñada para sesiones de trabajo intensas o reuniones de equipo. Amplia y luminosa '),
('Sala Calíope', 'Lectura', 4, 'Ideal para leer, lejos del ruido y con musica de fondo.'),
('Sala Socrates', 'Focus', 2, 'Tu rincón de concentración. Silencio garantizado');
