const Area = require('../models/Area');
const Catalogo = require('../models/Catalogo');

const createArea = async (req, res) => {
  try {
    const { nombre_area, id_catalogo } = req.body;

    const catalogoExists = await Catalogo.findById(id_catalogo);
    if (!catalogoExists) {
      return res.status(404).json({ error: 'Catalogo no encontrado' });
    }

    const area = new Area({
      nombre_area,
      id_catalogo
    });

    await area.save();
    res.status(201).json({
      message: 'Area creada con exito',
      data: area
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAreas = async (req, res) => {
  try {
    const areas = await Area.find()
      .populate('id_catalogo', 'titulo')
      .sort({ nombre_area: 1 });

    res.json({
      count: areas.length,
      data: areas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAreaById = async (req, res) => {
  try {
    const  { id } = req.params;
    const area = await Area.findById(id);

    if(area === null){
      return res.status(404).json({ error: 'Area no encontrada' });
    }

    res.status(201).json({
      message: 'Area encontrada con exito',
      data: area
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAreasByCatalogo = async (req, res) => {
  try {
    const areas = await Area.find({ id_catalogo: req.params.catalogoId })
      .populate('id_catalogo')
      .sort({ nombre_area: 1 });

    res.json({
      count: areas.length,
      data: areas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArea,
  getAreas,
  getAreaById,
  getAreasByCatalogo
};