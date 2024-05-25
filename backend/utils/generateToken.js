const jwt = require('jsonwebtoken');
const secretKey = 'subscribe'
const generateToken = (user) => {
    console.log("Token Generate", user)
    const payload = {
        userDetails: user
    }
    const token = jwt.sign(payload, secretKey);
    return token;
}

module.exports = {
    generateToken
}