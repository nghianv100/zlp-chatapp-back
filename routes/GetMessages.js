const router = require('express').Router();
const PersonalMessage = require('../db/PersonalMessage');
const GroupMessage = require('../db/GroupMessage');

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
        GroupMessage.find({
            group_id: req.body.group_id
        }).then(doc => {
            res.json(doc);
        });
    }
});

module.exports = router;