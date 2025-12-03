const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../../middleware/auth');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas
router.get('/profile', auth.isAuthenticated, authController.getProfile);
router.put('/profile', auth.isAuthenticated, authController.updateProfile);
router.put('/change-password', auth.isAuthenticated, authController.changePassword);

// Rutas para administradores
const User = require('../../models/User');

router.get('/admin/users', 
    auth.isAuthenticated, 
    auth.checkRole('administrador'),
    async (req, res) => {
        try {
            // Obtener todos los usuarios y poblar solo el nombre del rol
            const users = await User.find()
                .populate('role', 'name')
                .select('-password -resetPasswordToken -resetPasswordExpires -__v');

            const simpleUsers = users.map(u => ({
                id: u._id,
                email: u.email,
                username: u.username,
                firstName: u.firstName,
                lastName: u.lastName,
                role: u.role ? u.role.name : null,
                isActive: u.isActive,
                createdAt: u.createdAt
            }));

            return res.json({
                success: true,
                users: simpleUsers
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios'
            });
        }
    }
);

module.exports = router;