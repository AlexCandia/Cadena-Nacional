require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');


const createAdmin = async () => {
    try {        
        await Role.initializeRoles();
        const adminRole = await Role.findOne({ name: 'administrador' });
        
        if (!adminRole) {
            throw new Error('No se pudo encontrar el rol administrador');
        }
        
        console.log(`Rol "administrador" disponible`);
        
        console.log('Creando Usuario Administrador');
        
        const adminEmail = 'admin@cadenanacional.com';
        const adminUsername = 'admin';
        const adminPassword = 'Admin123!';
        
        const existingAdmin = await User.findOne({
            $or: [
                { email: adminEmail },
                { username: adminUsername }
            ]
        });
        
        if (existingAdmin) {
            console.log(`Usuario admin ya existe: ${existingAdmin.email}`);
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Username: ${existingAdmin.username}`);
            
            // Generar token para el admin existente
            const token = jwt.sign(
                {
                    id: existingAdmin._id.toString(),
                    email: existingAdmin.email,
                    username: existingAdmin.username
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );
            console.log("Token: ", token);
            
        } else {
            // Crear nuevo admin
            const admin = new User({
                email: adminEmail,
                password: adminPassword,
                username: adminUsername,
                firstName: 'Administrador',
                lastName: 'Sistema',
                role: adminRole._id,
                isActive: true
            });
            
            await admin.save();
            console.log(`Usuario admin creado exitosamente`);
            
            console.log(`Email: ${adminEmail}`);
            console.log(`Username: ${adminUsername}`);
            console.log(`Contraseña: ${adminPassword}`);
                    
            const token = jwt.sign(
                {
                    id: admin._id.toString(),
                    email: admin.email,
                    username: admin.username
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );
            
            console.log('Token generado: ', token);
        }
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        console.log(error);
    } finally {
        await mongoose.connection.close();
    }
};

createAdmin();
