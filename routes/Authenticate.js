const router = require('express').Router();
const User = require('../db/User');
const jwt = require('jsonwebtoken');

const secretKey = require('../secret');

router.post('/', function (req, res) {
    const {
        username,
        password
    } = req.body;

    User.findOne({
        username
    }, function (err, user) {
        if (err) {
            console.error(err);
            res.json({
                success: false,
                message: 'Server Internal error please try again'
            });
        } else if (!user) {
            res.send({
                success: false,
                message: 'Incorrect email or password'
            });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Server Internal error please try again'
                    });
                } else if (!same) {
                    res.json({
                        success: false,
                        message: 'Server Internal error please try again'
                    });
                } else {
                    const payload = {
                        username: user.username,
                    }

                    const token = jwt.sign(payload, secretKey, {
                        expiresIn: '1h'
                    });

                    res.json({
                        success: true,
                        user: {
                            username: user.username,
                            display_name: user.display_name
                        },
                    });
                }
            });
        }
    });
});

module.exports = router;