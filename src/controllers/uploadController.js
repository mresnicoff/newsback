// controllers/uploadController.js
const path = require('path');
require('dotenv').config(); 
const uploadFile = (req, res) => {

  const imageUrl = `${process.env.REACT_APP_API_URL}uploaded/${req.file.filename}`;
  console.log("url de la imagen",imageUrl);
  res.json({ url: imageUrl });
};

module.exports =  uploadFile
