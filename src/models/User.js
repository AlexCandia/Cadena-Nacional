const mongoose = require('mongoose');

// 1. Define el Esquema:
// Esto define la estructura y tipos de datos esperados para los documentos
const userSchema = new mongoose.Schema({
    // La colección 'users' tendrá un campo 'nombre' que es un String requerido
    nombre: {
        type: String,
        required: true,
        trim: true // trim quita espacios al inicio y fin
    },
    // Tendrá un campo 'email' que es un String único y requerido
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Y un campo 'edad' que es un número, opcional
    edad: {
        type: Number,
        min: 1 // Asegura que el número sea al menos 1
    },
    // Mongoose añade automáticamente campos 'createdAt' y 'updatedAt'
}, { timestamps: true });

// 2. Crea y Exporta el Modelo:
// 'User' es el nombre del modelo. Mongoose lo convierte a plural ('users')
// para el nombre de la colección en MongoDB.
const User = mongoose.model('User', userSchema);

module.exports = User;