const router = require('express').Router();
const Group = require('../db/Group');

router.post('/', function(req, res) {
    let group = new Group({
        id: req.body.id,
        name: req.body.name,
        members: req.body.members
    });

    group.save().then(function(doc) {
        res.end();
    })
});

module.exports = router;