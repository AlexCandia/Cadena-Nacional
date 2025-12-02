const Subarea = require('../../models/Subarea');
const Area = require('../../models/Area');

class SubareaService {
    async createSubarea(nombre_subarea, id_area) {
        const areaExists = await Area.findById(id_area);
        if (!areaExists) {
        return res.status(404).json({ error: 'Area no encontrada' });
        }

        const subarea = new Subarea({
            nombre_subarea,
            id_area
        });

        await subarea.save();
        return subarea;
    };


    async getSubareas() {
        const subareas = await Subarea.find()
        .populate('id_area', 'nombre_area')
        .sort({ nombre_subarea: 1 });
    };


    async getSubareaById() {
        const { id } = req.params;
        const subarea = await Subarea.findById(id).populate('id_area', 'nombre_area');

        if (!subarea) {
        return res.status(404).json({ error: 'Subarea no encontrada' });
        }

        res.status(200).json({
        message: 'Subarea encontrada con exito',
        data: subarea
        });
    };


    async getSubareasByArea() {
        const subareas = await Subarea.find({ id_area: req.params.areaId })
        .populate('id_area', 'nombre_area')
        .sort({ nombre_subarea: 1 });

    };
}

module.exports = new SubareaService();