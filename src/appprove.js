// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Para cargar tu .env

const app = express();
const PORT = process.env.PORT || 3000;
// --- Conexión a MongoDB Atlas (usando la MONGODB_URI) ---

// Asegúrate de usar MONGODB_URI. Revisa que tu .env esté bien configurado.
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas.');
            app.listen(PORT, () => {
            console.log(`🚀 Servidor Express en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ ERROR: Fallo al conectar con MongoDB Atlas.', err);
        process.exit(1); 
    });

app.use(express.json()); // Permite a Express leer cuerpos JSON
app.use('/api/users', require('./routes/userRoutes'));