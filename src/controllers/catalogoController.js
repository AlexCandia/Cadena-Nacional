const Catalogo = require('../models/Catalogo');

const createCatalogo = async (req, res) => {
  try {
    const { titulo } = req.body;

    const catalogo = new Catalogo({
      titulo,
    });

    await catalogo.save();
    res.status(201).json({
      message: 'Catalogo creado con exito',
      data: catalogo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCatalogos = async (req, res) => {
  try {
    const catalogos = await Catalogo.find()
      .sort({ titulo: 1 });

    res.json({
      count: catalogos.length,
      data: catalogos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCatalogo,
  getCatalogos
};