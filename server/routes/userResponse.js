const express = require('express');
const mongoose = require('mongoose');
const UserResponse = require('../models/userResponse');
const error = require('../middleware/formatError');
const router = express.Router();

if (!process.env.NODE_ENV) require('dotenv').load();

router.post('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    if(req.body.name && req.body.email && req.body.file && req.body.answers) {
        const userResponse = new UserResponse({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            file: req.body.file,
            answers: req.body.answers
        });
        userResponse.save()
            .then(result => {
                res.status(201).json(result);
            }).catch(er => {
                res.status(500).json(error(500, "The server is unavailable"))
            });
    } else {
        res.status(400).json({error: 400, reason: "Bad request"})
    }
});

module.exports = router;