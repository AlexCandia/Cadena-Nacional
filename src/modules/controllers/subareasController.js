const Subarea = require('../../models/Subarea');
const Area = require('../../models/Area');
const subareaService = require('../services/subareasService');

const createSubarea = async (req, res) => {
  try {
    const { nombre_subarea, id_area } = req.body;
    const subarea = await subareaService.createSubarea(nombre_subarea,id_area);
    res.status(201).json({
      message: 'Subarea creada con exito',
      data: subarea
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getSubareas = async (req, res) => {
  try {
    const subareas = await Subarea.find()
      .populate('id_area', 'nombre_area')
      .sort({ nombre_subarea: 1 });

    res.json({
      count: subareas.length,
      data: subareas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSubareaById = async (req, res) => {
  try {
    const { id } = req.params;
    const subarea = await Subarea.findById(id).populate('id_area', 'nombre_area');

    if (!subarea) {
      return res.status(404).json({ error: 'Subarea no encontrada' });
    }

    res.status(200).json({
      message: 'Subarea encontrada con exito',
      data: subarea
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSubareasByArea = async (req, res) => {
  try {
    const subareas = await Subarea.find({ id_area: req.params.areaId })
      .populate('id_area', 'nombre_area')
      .sort({ nombre_subarea: 1 });

    res.json({
      count: subareas.length,
      data: subareas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubarea,
  getSubareas,
  getSubareaById,
  getSubareasByArea
};