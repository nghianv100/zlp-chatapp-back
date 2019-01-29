const router = require('express').Router();
const PersonalMessage = require('../db/PersonalMessage');

router.post('/', function(req, res) {
    let msg = new PersonalMessage({
        sender_u: req.body.sender_u,
        sender_d: req.body.sender_d,
        receiver_u: req.body.receiver_u,
        receiver_d: req.body.receiver_d,
        isText: req.body.isText,
        content: req.body.content
    });

    msg.save().then(function(doc) {
        console.log(doc);
        res.end();
    })
});

module.exports = router;