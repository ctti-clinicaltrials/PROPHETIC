const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    loginDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);