
function nameValidator(nombre) {
    if (!nombre || nombre.trim() === '') {
        throw new Error('Nombre Invalido');
    }

    if (nombre.length > 20) {
        throw new Error('El nombre no puede exceder 8 caracteres');
    }
    const words = nombre.split(' ');
    for (let word of words) {
        if (word === '') continue;
        const string = /^[A-Z][a-z0-9]*$/;
        if (!string.test(palabra)) {
            throw new Error(`Nombre debe comenzar con mayuscula y contener solo letras o numeros`);
        }
    }
    return true;
}

module.exports = {
    nameValidator
};