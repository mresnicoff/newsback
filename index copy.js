const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
// Middleware para parsear JSON y datos URL-encoded

const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware de CORS
app.use(cors());

// Crear la carpeta "uploads" si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  console.log(imageUrl);
  res.json({ url: imageUrl });
});

// Ruta para servir archivos estáticos
app.use('/uploads', express.static(uploadsDir));

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

app.post('/data', (req, res) => {
  setTimeout(() => {
    const { text: newText } = req.body;
    text = newText;
    console.log(text)
    res.send({ status: true });
  }, 2000);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});