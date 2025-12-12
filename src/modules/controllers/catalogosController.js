const catalogoServices = require('../services/catalogosServices');

const createCatalogo = async (req, res) => {
  try {
    const { titulo } = req.body;
    const catalogo = await catalogoServices.createCatalogo(titulo);
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
    const catalogos = await catalogoServices.getCatalogos()
    res.json({
      count: catalogos.length,
      data: catalogos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCatalogo = async (req, res) => {
  try {
    const { id } = req.params;
    const {nombre_nuevo} = req.body;
    const updatedCatalogo = await catalogoServices.updateCatalogo(id,nombre_nuevo);
    res.json({
      message: 'Catalogo actualizado con exito',
      data: updatedCatalogo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};    
const deleteCatalogo = async (req, res) => {
  try {
    const { id } = req.params;
    await catalogoServices.deleteCatalogo(id);
    res.json({ message: 'Catalogo eliminado con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCatalogo,
  getCatalogos,
  updateCatalogo,
  deleteCatalogo,
};