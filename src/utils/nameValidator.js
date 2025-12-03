
function validarNombre(nombre) {
    if (!nombre || nombre.trim() === '') {
        throw new Error('Nombre Invalido');
    }

    if (nombre.length > 8) {
        throw new Error('El nombre no puede exceder 8 caracteres');
    }

    const nombreRegex = /^[A-Z][a-z0-9]*$/;
    if (!nombreRegex.test(nombre)) {
        throw new Error('Nombre debe comenzar con mayúscula y contener solo letras o numeros');
    }

    return true;
}
module.exports = {
    validarNombre
};