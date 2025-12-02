const Catalogo = require('../../models/Catalogo');

class CatalogoService {
    async createCatalogo(titulo) {
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
    async deleteCatalogo(id) {
        await Catalogo.findByIdAndDelete(id);
    }
}
module.exports = new CatalogoService();