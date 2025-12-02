const areaService = require('../services/areasService');
const createArea = async (req, res) => {
    try {
        const { nombre_area, id_catalogo } = req.body;
        const area = await areaService.createArea(nombre_area, id_catalogo);
        
        res.status(201).json({
            message: 'Área creada con éxito',
            data: area
        });
    } catch (error) {
        if (error.message === 'Catálogo no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};

const getAreas = async (req, res) => {
    try {
        const areas = await areaService.getAllAreas();
        
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
        const { id } = req.params;
        const area = await areaService.getAreaById(id);
        
        res.json({
            message: 'Área encontrada con éxito',
            data: area
        });
    } catch (error) {
        if (error.message === 'Área no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

const getAreasByCatalogo = async (req, res) => {
    try {
        const areas = await areaService.getAreasByCatalogo(req.params.catalogoId);
        
        res.json({
            count: areas.length,
            data: areas
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateArea = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_area, id_catalogo } = req.body;
        const updatedArea = await areaService.updateArea(id, nombre_area, id_catalogo);
        res.json({
            message: 'Área actualizada con éxito',
            data: updatedArea
        });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteArea = async (req, res) => {
    try {
        const { id } = req.params;  
        const deletedArea = await areaService.deleteArea(id);
        res.json({
            message: 'Área eliminada con éxito',
            data: deletedArea
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};       
module.exports = {
    createArea,
    getAreas,
    getAreaById,
    getAreasByCatalogo,
    updateArea,
    deleteArea
};