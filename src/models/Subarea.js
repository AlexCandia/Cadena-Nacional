const mongoose = require('mongoose');

const subareaSchema = mongoose.Schema({
    nombre_subarea: {
        type: String,
        required: true
    },

    id_area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area', 
        required: true
    }
});

module.exports = mongoose.model('Subarea', subareaSchema);