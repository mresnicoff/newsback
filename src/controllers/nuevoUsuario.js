const { Usuario } = require("../db.js");
const bcrypt = require("bcrypt")
const nuevoUsuario = async (req, res) => {

    if(req.method==="POST"){

        try {
          async function hashPassword(plaintextPassword) {
            const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash}
        const  cargar=req.body
            const emailRegistrado = await Usuario.findOne({ where: { email: cargar.email } });
      
        if (emailRegistrado === null) {
        const cargaCorregida={}
        cargaCorregida.nombre=cargar.nombre
        cargaCorregida.passhasheada=await hashPassword(cargar.password)
        cargaCorregida.email=cargar.email
        cargaCorregida.avatar=cargar.avatar
        cargaCorregida.puedeescribir=cargar.puedeescribir
        
      if(cargar.linkautor) {   cargaCorregida.linkautor=cargar.linkautor}
            console.log(cargaCorregida)
        await Usuario.create(cargaCorregida);
        res.json({
            success: true,
            // Podrías añadir otros campos aquí como mensaje, datos adicionales, etc.
            message: "Operación exitosa. Redirigiendo al login"
        });
        
      } else {
        console.log("entró al else")
        res.status(422).json({message:"El email ya está registrado"});
      }
        }
        catch (error) {
                        res.status(500).json({ message: "Server no disponible" });
        }
      }}



module.exports = nuevoUsuario