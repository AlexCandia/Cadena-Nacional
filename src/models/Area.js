const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    nombre_area: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    id_catalogo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogo', 
        required: true
    }
});

module.exports = mongoose.model('Area', areaSchema);