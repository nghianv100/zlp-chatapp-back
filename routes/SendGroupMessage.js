const router = require('express').Router();
const GroupMessage = require('../db/GroupMessage');

router.post('/', function(req, res) {
    let msg = new GroupMessage({
        sender_u: req.body.sender_u,
        sender_d: req.body.sender_d,
        group_id: req.body.group_id,
        isText: req.body.isText,
        content: req.body.content
    });

    msg.save().then(function(doc) {
        res.end();
    });
});

module.exports = router;