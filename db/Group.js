const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: 'GROUP_NONAME'
    },
    members: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Group', GroupSchema);