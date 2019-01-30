const router = require('express').Router();
const User = require('../db/User');
const Group = require('../db/Group');

router.post('/', function(req, res) {
    let users = User.find({
        username: { $nin: req.body.username }
    });
    let groups = Group.find({
        members: req.body.username
    });

    Promise.all([users, groups]).then(values => {
        let resultPerson = values[0].map(function(value) {
            return {
                username: value.username,
                display_name: value.display_name
            }
        });
        let resultGroup = values[1].map(function(value) {
            return {
                id: value.id,
                name: value.name,
                members: value.members
            }
        });
        res.json({
            persons: resultPerson,
            groups: resultGroup
        })
    });
});

module.exports = router;