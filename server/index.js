const agentToken = require('./routes/agentToken');
const userResponse = require('./routes/userResponse');
const files = require('./routes/files');
const cors = require('cors');
const corsOptions = { origin: '*' };
const bodyParser = require('body-parser');
if (!process.env.NODE_ENV) require('dotenv').load();
const dbConfig = require('./db');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require("morgan");
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')), cors(corsOptions), helmet(), methodOverride('_method'), jwt.check(), (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

// Connect to DB
mongoose.connect(dbConfig.DB).then( 'open',
    () => {console.log('Database is connected')},
    err => { console.log('Cannot connect to the database' +err)
});

app.use('/api/agent-token', agentToken);
app.use('/api/user-response', userResponse);
app.use('/api/files', files);

// All remaining requests return the React app, so it can handle routing.
app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));