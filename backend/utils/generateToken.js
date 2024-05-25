const jwt = require('jsonwebtoken');
const secretKey = 'subscribe'
const generateToken = (user) => {
    const payload = {
        userDetails: user
    }
    const token = jwt.sign(payload, secretKey);
    return token;
}

module.exports = {
    generateToken
}