const Area = require('../../models/Area');
const Catalogo = require('../../models/Catalogo');

class AreaService {
    async createArea(nombre_area, id_catalogo) {
        // Validar que el catálogo exista
        const catalogoExists = await Catalogo.findById(id_catalogo);
        if (!catalogoExists) {
            throw new Error('Catálogo no encontrado');
        }

        // Crear el área
        const area = new Area({
            nombre_area,
            id_catalogo
        });

        await area.save();
        return area;
    }

    async getAllAreas() {
        const areas = await Area.find()
            .populate('id_catalogo', 'titulo')
            .sort({ nombre_area: 1 });
        return areas;
    }

    async getAreaById(id) {
        const area = await Area.findById(id);
        if (!area) {
            throw new Error('Área no encontrada');
        }
        return area;
    }

    async getAreasByCatalogo(catalogoId) {
        const areas = await Area.find({ id_catalogo: catalogoId })
            .populate('id_catalogo')
            .sort({ nombre_area: 1 });
        return areas;
    }
    async updateArea(id, campo, dato_nuevo) {
        const area = await Area.findById(id);
        if (!area) {
            throw new Error('Area no encontrada');
        }
        const camposExistentes = ['nombre_area', 'id_catalogo'];
        if (!camposExistentes.includes(campo)) {
            throw new Error(`Campo '${campo}' no existe`);
        }
        if (campo === 'id_catalogo') {
            const catalogoExists = await Catalogo.findById(dato_nuevo);
            if (!catalogoExists) {
                throw new Error('Catalogo no encontrado');
            }
        }
        area[campo] = dato_nuevo;
        await area.save();
        return area;
    }
    async deleteArea(id) {
        const area = await Area.findById(id);
        if (!area) {
            throw new Error('Area no encontrada');
        }
        await Area.deleteOne({ _id: id });
        return;
    }      
}

module.exports = new AreaService();