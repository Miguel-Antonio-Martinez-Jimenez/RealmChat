const verifyPassword = (password) => 
{
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase;
};
    
module.exports = { verifyPassword };