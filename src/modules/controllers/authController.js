const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Role = require('../../models/Role');
const validator = require('../../utils/validators');

const authController = {
    register: async (req, res) => {
        try {
            const validation = validator.validateRegister(req.body);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }
            
            const existingUser = await User.findOne({
                $or: [
                    { email: req.body.email.toLowerCase() },
                    { username: req.body.username }
                ]
            });
            
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'El email o nombre de usuario ya está registrado'
                });
            }
            
            const defaultRole = await Role.findOne({ name: 'estudiante' });
            if (!defaultRole) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al asignar rol. Contacte al administrador.'
                });
            }
            
            const user = new User({
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: defaultRole._id
            });
            
            await user.save();
            
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: defaultRole.name,
                    fullName: user.getFullName()
                }
            });
            
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    
    login: async (req, res) => {
        try {
            const validation = validator.validateLogin(req.body);
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }
            
            const user = await User.findOne({
                $or: [
                    { email: req.body.email?.toLowerCase() },
                    { username: req.body.username }
                ]
            }).populate('role');
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }
            
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Tu cuenta está desactivada. Contacta al administrador.'
                });
            }
            
            const isValidPassword = await user.comparePassword(req.body.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }
            
            user.lastLogin = new Date();
            await user.save();
            
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );
            
            res.json({
                success: true,
                message: 'Login exitoso',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role.name,
                    fullName: user.getFullName()
                }
            });
            
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
                .populate('role')
                .select('-password -resetPasswordToken -resetPasswordExpires');
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            
            res.json({
                success: true,
                user
            });
            
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    },
    
    updateProfile: async (req, res) => {
        try {
            const updates = {};
            
            if (req.body.firstName) updates.firstName = req.body.firstName;
            if (req.body.lastName) updates.lastName = req.body.lastName;
            
            const user = await User.findByIdAndUpdate(
                req.user.id,
                updates,
                { new: true, runValidators: true }
            ).populate('role').select('-password');
            
            res.json({
                success: true,
                message: 'Perfil actualizado exitosamente',
                user
            });
            
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    },
    
    changePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Debes proporcionar la contraseña actual y la nueva'
                });
            }
            
            if (!validator.validatePassword(newPassword)) {
                return res.status(400).json({
                    success: false,
                    message: 'La nueva contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial (@$!%*#?&)'
                });
            }
            
            const user = await User.findById(req.user.id);
            
            const isValidPassword = await user.comparePassword(currentPassword);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña actual incorrecta'
                });
            }
            
            user.password = newPassword;
            await user.save();
            
            res.json({
                success: true,
                message: 'Contraseña cambiada exitosamente'
            });
            
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    }
};

module.exports = authController;