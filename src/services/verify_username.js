const verifyUsername = (username) => {
    const minLength = 5;
    const maxLength = 15;
    const isValidLength = username.length >= minLength && username.length <= maxLength;
    const hasValidChars = /^[a-zA-Z0-9._]+$/.test(username); // Solo letras, dígitos, punto y guion bajo
    const noSpecialCharAtStartOrEnd = /^[a-zA-Z0-9]+.*[a-zA-Z0-9]+$/.test(username); // No comienza ni termina con punto o guion bajo
    const noConsecutiveSpecialChars = !/([._])\1/.test(username); // No permite caracteres especiales consecutivos

    return isValidLength && hasValidChars && noSpecialCharAtStartOrEnd && noConsecutiveSpecialChars;
};

module.exports = { verifyUsername };