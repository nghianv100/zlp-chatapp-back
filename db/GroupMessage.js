const mongoose = require('mongoose');

const GroupMessageSchema = mongoose.Schema({
    sender_u: {
        type: String,
        require: true
    },
    sender_d: {
        type: String,
        require: true
    },
    group_id: {
        type: Number,
        require: true
    },
    isText: {
        type: Boolean,
        require: true
    },
    content: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GroupMessage', GroupMessageSchema);