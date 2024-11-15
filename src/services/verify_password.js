const verifyPassword = (password) => 
{
    const minLength = 6;
    const hasUpperCase = /[A-ZÁÉÍÓÚÑ]/.test(password); // Incluye letras con acento y Ñ mayúscula
    const hasLowerCase = /[a-záéíóúñ]/.test(password); // Incluye letras con acento y ñ minúscula
    const hasDigit = /\d/.test(password); // Verifica si contiene al menos un dígito
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Verifica si contiene un carácter especial
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
};
        
module.exports = { verifyPassword };