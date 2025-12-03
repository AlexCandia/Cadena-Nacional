const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['administrador', 'profesor', 'estudiante'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    permissions: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

roleSchema.statics.initializeRoles = async function() {
    const roles = [
        {
            name: 'administrador',
            description: 'Administrador',
            permissions: []
        },
        {
            name: 'profesor',
            description: 'Profesor',
            permissions: []
        },
        {
            name: 'estudiante',
            description: 'Estudiante',
            permissions: []
        }
    ];

    for (const roleData of roles) {
        await this.findOneAndUpdate(
            { name: roleData.name },
            roleData,
            { upsert: true, new: true }
        );
    }
    };

module.exports = mongoose.model('Role', roleSchema);