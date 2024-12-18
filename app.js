const express = require("express");
const fs = require('fs');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./src/routes/index.js");
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require("./src/db.js");

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Asegúrate de usar la ruta absoluta
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const server = express();
const port = process.env.PORT || 3001;

server.name = "API";
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", routes);

// Ruta para subir archivos
server.post('/uploadf', upload.single('file'), (req, res) => {
  console.log(uploadsDir);
 // const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  //console.log(imageUrl);
  //res.json({ url: imageUrl });
});

// Ruta para servir archivos estáticos
server.use('/uploads', express.static(uploadsDir));

// Ruta de ejemplo para datos
server.post('/data', (req, res) => {
  setTimeout(() => {
    res.send({ status: true });
  }, 2000);
});

// Middleware para manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

module.exports = server;