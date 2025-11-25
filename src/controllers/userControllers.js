// controllers/userController.js
const User = require('../models/User'); // Importa el modelo

async function createUser(req, res) {
    try {
        // Usa el modelo para crear un nuevo documento en la colección 'users'
        const newUser = new User({
            nombre: req.body.nombre,
            email: req.body.email,
            edad: req.body.edad
        });
        
        // Guarda el documento en la base de datos.
        // Esto crea la colección 'users' si no existe.
        await newUser.save(); 

        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            user: newUser 
        });
    } catch (error) {
        // Manejo de errores (ej. si el email ya existe o falta el nombre)
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createUser };