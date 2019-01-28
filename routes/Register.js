const router = require('express').Router();
const User = require('../db/User');

router.post('/', function (req, res) {
    const {
        username,
        display_name,
        password
    } = req.body;

    User.find({
        username: username
    }).then(function (docs) {
        if (docs.length === 0) {
            const user = new User({
                username,
                display_name,
                password
            });
            user.save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Registering account fail'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'Registering account success'
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Account is already exist'
            });
        }
    });
});

module.exports = router;