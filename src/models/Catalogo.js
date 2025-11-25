const mongoose = require('mongoose');

const catalogoSchema = mongoose({
    titulo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Catalogo', catalogoSchema);