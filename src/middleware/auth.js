const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Acceso denegado. No se proporcionó token.'
                });
            }
            
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            console.error('Error en verifyToken:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Token inválido o expirado.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    
    // Verificar rol específico
    checkRole: (...roles) => {
        return async (req, res, next) => {
            try {
                if (!req.user || !req.user.id) {
                    return res.status(401).json({
                        success: false,
                        message: 'Usuario no autenticado'
                    });
                }

                const user = await User.findById(req.user.id).populate('role');
                
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }
                
                if (!roles.includes(user.role.name)) {
                    return res.status(403).json({
                        success: false,
                        message: 'No tienes permisos para realizar esta acción',
                        requiredRole: roles,
                        userRole: user.role.name
                    });
                }
                
                req.user.role = user.role.name;
                next();
            } catch (error) {
                console.error('Error en checkRole:', error.message);
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar permisos',
                    error: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
        };
    },
    
    // Usuarios autenticados con cualquier rol
    isAuthenticated: async (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Debes iniciar sesión para acceder a este recurso'
                });
            }
            
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            
            if (!verified || !verified.id) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido'
                });
            }

            const user = await User.findById(verified.id).populate('role');
            
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no encontrado o inactivo'
                });
            }
            
            req.user = {
                id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name,
                roleId: user.role._id
            };
            
            next();
        } catch (error) {
            console.error('Error en isAuthenticated:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Sesión inválida o expirada',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = auth;