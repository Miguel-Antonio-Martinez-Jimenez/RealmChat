const verifyPhoneNumber = (phoneNumber) => 
{
    const regex = /^[0-9]{10}$/; // Exactamente 10 dígitos
    return regex.test(phoneNumber);
};

module.exports = { verifyPhoneNumber };