const express = require("express");
const fs = require('fs');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const multer = require('multer');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
const cors = require('cors');
const port=3001
require("./db.js");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const server = express();
const upload = multer({ storage: storage });

server.name = "API";
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", routes);
server.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  console.log(imageUrl)
  res.json({ url: imageUrl });
});

server.post('/data',  (req, res) => {



   const { text: newText } = req.body;
  text = newText;
  console.log(text)
   setTimeout(() => {
     res.send({ status: true });
   }, 2000);
   
 });
 server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});
// conn.models.Country.sync({ force: true }).then(async () => {
//  await saveApidata();
// });

module.exports = server;