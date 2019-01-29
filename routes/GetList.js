const router = require('express').Router();
const User = require('../db/User');

router.post('/', function(req, res) {
    User.find({
        username: { $nin: req.body.username }
    }).then(docs => {
        let resultPerson = docs.map(function(value) {
            return {
                username: value.username,
                display_name: value.display_name
            }
        });
        res.json({
            persons: resultPerson
        });
    });
});

module.exports = router;