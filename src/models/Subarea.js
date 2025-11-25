const mongoose = require('mongoose');

const subareaSchema = mongoose.Schema({
    nombre_subarea: {
        type: String,
        required: true
    },

    id_catalogo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogo', 
        required: true
    }
});

module.exports = mongoose.model('Subarea', subareaSchema);