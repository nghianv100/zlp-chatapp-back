const jwt = require('jsonwebtoken');
const secretKey = require('../secret');

const checkAuth = function (req, res, next) {
    const token = req.body.token;

    if (!token || token.length < 5) {
        res.status(401).send({ success: false, message: 'Unauthorized: No token provided' });
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send({ success: false, message: 'Unauthorized: Invalid token' });
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
}

module.exports = checkAuth;