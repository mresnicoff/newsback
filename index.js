const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const { conn } = require("./src/db.js");
const app = express();
const port = 3001;

// Middleware de CORS
app.use(cors());

// Middleware para parsear JSON y datos URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear la carpeta "uploads" si no existe
const uploadsDir = path.join(__dirname, 'uploaded');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ruta para servir archivos estáticos
app.use('/uploaded', express.static(uploadsDir));

// Usar las rutas definidas en el archivo de rutas
app.use('/', routes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});


conn.sync(
).then(() => {
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
})});