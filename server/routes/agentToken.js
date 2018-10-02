const express = require('express');
const fetch = require('node-fetch');
const jwt = require('../middleware/jwtCheck');
if (!process.env.NODE_ENV) require('dotenv').load();
const router = express.Router();

router.get('/', jwt.check(), (req, res) => {
    res.set('Content-Type', 'application/json');
    fetch(`${process.env.REACT_APP_DDS_API_URL}software_agents/api_token`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'agent_key': process.env.REACT_APP_AGENT_KEY,
            'user_key': process.env.REACT_APP_AGENT_USER_KEY
        })
    }).then(res => res.json()).then((json) => res.send(json))
        .catch((er) => res.send(er))
});

module.exports = router;