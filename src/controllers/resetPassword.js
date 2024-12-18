const { where } = require("sequelize");
const { Usuario } = require("../db.js");
const bcrypt = require('bcrypt');

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

const resetPasswordController = async (req, res) => {
  const { token, password } = req.body; // Suponiendo que envías estos datos en el cuerpo de la solicitud
console.log(token,password)
  if (!token || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Se requiere tanto el token como la nueva contraseña." 
    });
  }

  try {
    // Encuentra el usuario por el token de email
    const usuario = await Usuario.findOne({ where: { tokenEmail: token } });

    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        message: "Token no válido o expirado." 
      });
    }

    // Hashea la nueva contraseña
    const hashedPassword = await hashPassword(password);

    // Actualiza la contraseña del usuario y limpia el tokenEmail
    await usuario.update({
      password: hashedPassword, // Asegúrate de que tu modelo Usuario tenga el campo password configurado para usar este valor
      tokenEmail: null // Limpia el token de email ya que el proceso ha terminado
    });

    return res.status(200).json({ 
      success: true, 
      message: "Contraseña actualizada con éxito." 
    });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error interno del servidor al restablecer la contraseña." 
    });
  }
};

module.exports = resetPasswordController;