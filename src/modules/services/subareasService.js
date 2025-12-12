const Subarea = require('../../models/Subarea');
const Area = require('../../models/Area');
const { nameValidator } = require('../../utils/nameValidator');

class SubareaService {
    async createSubarea(nombre_subarea, id_area) {
        nameValidator(nombre_subarea);
        const areaExists = await Area.findById(id_area);
        const subareaExists = await Subarea.findOne({ nombre_subarea, id_area });
        if (subareaExists) {
            throw new Error('Subarea ya existe');
        }
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
        .populate('id_area', 'nombre_subarea')
        .sort({ nombre_subarea: 1 });
        return subareas;
    };


    async getSubareaById(id) {
        const subarea = await Subarea.findById(id)

        if (!subarea) {
            throw new Error('Subarea no encontrada');
        }
        return subarea;
    };


    async getSubareasByArea(areaId) {
        const subareas = await Subarea.find({ id_area: areaId })
        .populate('id_area')
        .sort({ nombre_subarea: 1 });
        if(subareas.length === 0) {
            throw new Error('No se encontraron subareas para el area especificada');
        }
        return subareas;
    };
    async updateSubarea(id, campo, dato_nuevo) {
        const subarea = await Subarea.findById(id);
        if (!subarea) {
            throw new Error('Subarea no encontrada');
        }
        const camposExistentes = ['nombre_subarea', 'id_area'];
        if (!camposExistentes.includes(campo)) {
            throw new Error(`Campo '${campo}' no existe`);
        }
        if (campo === 'id_area') {
            const areaExists = await Area.findById(dato_nuevo);
            if (!areaExists) {
                throw new Error('Area no encontrada');
            }
        }
        if(campo === 'nombre_subarea') {
            nameValidator(dato_nuevo);
        }
        subarea[campo] = dato_nuevo;
        await subarea.save();
        return subarea;
    }
    async deleteSubarea(id) {
        const subarea = await Subarea.findById(id);
        if (!subarea) {
            throw new Error('Subarea no encontrada');
        }
        await Subarea.deleteOne({ _id: id });
        return; 
    }
}

module.exports = new SubareaService();