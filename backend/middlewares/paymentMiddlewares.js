const generateHmacSha256 = (orderId, secret) => {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(orderId);
    return hmac.digest("hex");
}

module.exports = {
    generateHmacSha256
}