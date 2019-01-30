const mongoose = require('mongoose');

const PersonalMessageSchema = new mongoose.Schema({
    sender_u: {
        type: String,
        required: true
    },
    sender_d: {
        type: String,
        required: true
    },
    receiver_u: {
        type: String,
        required: true
    },
    receiver_d: {
        type: String,
        required: true
    },
    isText: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model('PersonalMessage', PersonalMessageSchema);