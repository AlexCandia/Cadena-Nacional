const Catalogo = require('../../models/Catalogo');

class CatalogoService {
    async createCatalogo(titulo) {
        const catalogoExists = await Catalogo.findOne({titulo});
        if (catalogoExists) {
            throw new Error('Catalogo ya existe');
        }
        const catalogo = new Catalogo({
            titulo,
        });
        await catalogo.save();
        return catalogo;
    };

    async getCatalogos () {
        const catalogos = await Catalogo.find()
        .sort({ titulo: 1 });
        return catalogos;
    };
    async updateCatalogo(id,nombre_nuevo) {
        const catalogo = await Catalogo.findById(id);
        if (!catalogo) {
            throw new Error('Catalogo no encontrado');
        }
        catalogo.titulo = nombre_nuevo;
        await catalogo.save();
        return catalogo;
    }
    async deleteCatalogo(id) {
        await Catalogo.findByIdAndDelete(id);
    }
}
module.exports = new CatalogoService();