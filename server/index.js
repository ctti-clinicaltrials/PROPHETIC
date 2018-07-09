const agentToken = require('./routes/agentToken');
const userResponse = require('./routes/userResponse');
const cors = require('cors');
const corsOptions = { origin: '*' };
const bodyParser = require('body-parser');
if (!process.env.NODE_ENV) require('dotenv').load();
const dbConfig = require('./db');
const express = require('express');
const fetch = require('node-fetch');
const helmet = require('helmet');
const morgan = require("morgan");
const jwt = require('./middleware/jwtCheck');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')), cors(corsOptions), helmet(), bodyParser.json());

// Connect to DB
mongoose.connect(dbConfig.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Cannot connect to the database' +err)
});

app.use('/api/agent-token', agentToken);
app.use('/api/user-response', userResponse);

app.get('/api/status', jwt.check(), (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"status":"ok"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));