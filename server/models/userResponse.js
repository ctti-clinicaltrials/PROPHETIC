const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    email: {type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    file: {type: mongoose.Schema.Types.Mixed, required: true },
    answers: {type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);