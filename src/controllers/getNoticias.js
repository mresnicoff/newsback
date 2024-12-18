const { Noticia, Usuario } = require("../db.js");

const getNoticias = async (req, res) => {
  try {
    const { id } = req.params; // Suponiendo que el id se pasa como parámetro en la URL
    console.log("param",req.params)
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Número de noticias por página
    const offset = (page - 1) * limit;

    if (id) {
      // Si se proporciona un id, busca una noticia específica
      const noticia = await Noticia.findByPk(id, {
        include: [{
          model: Usuario,
          as: 'autor' // Asegúrate de que 'autor' es el alias que usaste al definir la relación en tu modelo
        }]
      });;
      console.log(noticia)
      if (noticia) {
        res.json({ article: noticia });
      } else {
        res.status(404).json({ error: 'Noticia no encontrada' });
      }
    } else {
      // Si no se proporciona un id, busca todas las noticias
      const noticias = await Noticia.findAndCountAll({
        limit,
        offset,
        order: [['date', 'DESC']],
        include: [{
          model: Usuario,
          as: 'autor',
          required: true
        }], 
      });
console.log(noticias)
      res.json({
        articles: noticias.rows,
        total: noticias.count,
        page,
        totalPages: Math.ceil(noticias.count / limit),
      });
    }
  } catch (error) {
    console.error('Error fetching noticias:', error);
    res.status(500).json({ error: 'Error fetching noticias' });
  }
};

module.exports = getNoticias;