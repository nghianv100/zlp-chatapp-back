const router = require('express').Router();
const PersonalMessage = require('../db/PersonalMessage');

router.post('/', function(req, res) {
    if(req.body.personal_message) {
        PersonalMessage.find({
            $or: [
                {
                    $and: [{sender_u: req.body.userA} , {receiver_u: req.body.userB}]
                },
                {
                    $and: [{sender_u: req.body.userB} , {receiver_u: req.body.userA}]
                }
            ]
        }).then(doc => {
            res.json(doc);
        })
    } else {

    }
});

module.exports = router;