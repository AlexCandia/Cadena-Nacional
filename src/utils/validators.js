const validator = {
    validateEmail: (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    },
    
    validatePassword: (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return passwordRegex.test(password);
    },
    
    validateUsername: (username) => {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        return usernameRegex.test(username);
    },
    
    validateRegister: (data) => {
        const errors = {};
        
        if (!data.email || !validator.validateEmail(data.email)) {
            errors.email = 'Email inválido';
        }
        
        if (!data.password || !validator.validatePassword(data.password)) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres, incluir una letra, un número y un carácter especial (@$!%*#?&)';
        }
        
        if (!data.username || !validator.validateUsername(data.username)) {
            errors.username = 'El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números, guiones y guiones bajos';
        }
        
        if (!data.firstName || data.firstName.trim().length < 2) {
            errors.firstName = 'El nombre debe tener al menos 2 caracteres';
        }
        
        if (!data.lastName || data.lastName.trim().length < 2) {
            errors.lastName = 'El apellido debe tener al menos 2 caracteres';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    validateLogin: (data) => {
        const errors = {};
        
        if (!data.email && !data.username) {
            errors.credentials = 'Email o nombre de usuario requerido';
        }
        
        if (!data.password) {
            errors.password = 'Contraseña requerida';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};

module.exports = validator;