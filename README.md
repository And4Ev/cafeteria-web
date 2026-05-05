# cafeteria-web
Desarrollo web "La hora del café"

## ⚖️ Licencia y Propiedad Intelectual
Este proyecto ha sido desarrollado como trabajo de fin de grado. 
Todos los derechos de diseño y código están reservados. 
Se prohíbe explícitamente la copia, distribución o uso comercial de este material 
sin autorización previa. 

Registrado en Safe Creative / Bajo licencia CC BY-NC-ND 4.0.

## Introducción
Este es un proyecto de aplicación web completa diseñado para una cafetería moderna. Permite la gestión de socios, reserva de salas de estudio/reuniones y visualización dinámica de la carta de productos.
Características principales.
- Sistema de Socios: Registro e inicio de sesión seguro con encriptación de contraseñas.
- Recuperación de contraseña: comprobación de que el usuario existe y restablecimiento de
nueva contraseña segura con encriptación.
- Reserva de Salas: Interfaz para reservar espacios de trabajo ofreciendo disponibilidad de
horas.
- Carta Dinámica: Menú de productos conectado directamente a la base de datos
PostgreSQL.
- Perfil de Usuario: Panel personalizado para gestionar datos y ver el historial.
- Diseño Responsive: Totalmente adaptado a dispositivos móviles y tablets.
- Contacto Directo: Formulario de contacto que almacena mensajes en el servidor.

# Stack Tecnológico
### Tecnología
### Frontend
EJS (Embedded JavaScript), CSS3, JavaScrip
### Backednd
Node.js, Express.js
### Base de datos
PostgrgeSQL
### Seguridad
Bcrypt (Hashing de contraseñas)
### Entorno
Visual estudio code

## Requisitos previos
Instalación node.js y postgreSQL Instalación y configuración Instalar dependencias
### Inicializar proyecto Node
## Comando bash
       npm init -y 
Creaa un archivo package.json en el proyecto
## Nodemon
# Comando de instalación bash
    npm install --save-dev nodemon    
# Instalación del paquete pg 
      npm install pg
# Estructura de directorios
```
proyecto-cafeteria
├─ README.md
├─ app.js
├─ config
│  ├─ cafeteriadb.sql
│  └─ db.js
├─ controllers
│  ├─ authController.js
│  ├─ pageController.js
│  ├─ productController.js
│  └─ reservationController.js
├─ middlewares
│  └─ authMiddleware.js
├─ models
│  ├─ formContactModel.js
│  ├─ productModel.js
│  ├─ reservationModel.js
│  └─ userModel.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ layout.css
│  │  ├─ main.css
│  │  └─ pages
│  │     ├─ carta.css
│  │     ├─ contacto.css
│  │     ├─ index.css
│  │     ├─ login.css
│  │     ├─ perfil.css
│  │     ├─ recuperar.css
│  │     └─ salas.css
│  ├─ images
│  │  ├─ bagels.jpg
│  │  ├─ cafe.svg
│  │  ├─ dibujo-taza-cafe.png
│  │  ├─ espumando-cafe.jpg
│  │  ├─ sala-caliope.png
│  │  ├─ sala-de-reuniones.jpg
│  │  ├─ sala-socrates.png
│  │  ├─ tazas-de-cafe-espresspo.jpg
│  │  ├─ tipos-cafe.jpg
│  │  └─ variedad-cafes.jpg
│  └─ js
│     ├─ formContacto.js
│     ├─ home.js
│     ├─ login.js
│     ├─ main.js
│     ├─ menu.js
│     ├─ recuperar.js
│     └─ reservas.js
├─ routes
│  ├─ authRoutes.js
│  ├─ pageRoutes.js
│  ├─ productRoutes.js
│  └─ reservationRoutes.js
└─ views
   ├─ carta.ejs
   ├─ contacto.ejs
   ├─ index.ejs
   ├─ login.ejs
   ├─ partials
   │  ├─ footer.ejs
   │  └─ header.ejs
   ├─ perfil.ejs
   ├─ recuperar.ejs
   └─ salas.ejs

```
