const { Usuario } = require("../db.js");
const bcrypt = require("bcrypt")
const validarUsuario = async (req, res) => {

  if(req.method==="POST"){

    try{  
      const  datos=req.body

  if(datos.email && datos.password){
         const user = await Usuario.findOne({ where: { email: datos.email }, raw: true });
 console.log(user)
    if (user !== null) {
      if (await bcrypt.compare(datos.password, user.passhasheada))
      {

      res.json({
        success: true,
        // Podrías añadir otros campos aquí como mensaje, datos adicionales, etc.
        message: "Operación exitosa. Redirigiendo a la sección de noticias"
    });}
      
      
      
      
      else{

        res.status(200).json({success:false, message:"La clave no coincide"});
      }
    }
    else{        res.status(422).json({message:"Usuario no registrado"});}}



  }


  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
else{
  const email=req.query.email
  const user = await Usuario.findOne({ where: { email:email }, raw: true });
  res.status(200).json(user);
}
}




module.exports = validarUsuario;