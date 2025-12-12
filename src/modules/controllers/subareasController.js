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
    const subareas = await subareaService.getSubareas();
    if (!subareas || subareas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron subáreas' });
    }
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
    const subarea = await subareaService.getSubareaById(id);
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
    const subareas = await subareaService.getSubareasByArea(req.params.areaId);

    res.json({
      count: subareas.length,
      data: subareas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSubarea = async (req, res) => {
  try {
        const { id } = req.params;
        const campo = req.body.campo;
        const dato_nuevo = req.body.dato_nuevo;
        console.log(campo, dato_nuevo);
        if (!campo || dato_nuevo === undefined) {
            return res.status(400).json({ 
                error: 'Bad Request' 
            });
        }
        
        const updatedArea = await subareaService.updateSubarea(id, campo, dato_nuevo);
        res.json({
            message: 'Area Actualizada',
            data: updatedArea
        });
    } catch (error) {
        if (error.message === 'Area no encontrada' || 
            error.message === 'Catalogo no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};    
  const deleteSubarea = async (req, res) => {
    try {
        const { id } = req.params;  
        await subareaService.deleteSubarea(id);
        res.json({
            message: 'Subarea eliminada con exito'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  createSubarea,
  getSubareas,
  getSubareaById,
  getSubareasByArea,
  updateSubarea,
  deleteSubarea
};