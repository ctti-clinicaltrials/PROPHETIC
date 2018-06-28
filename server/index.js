const agentToken = require('./routes/agentToken');
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

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')), cors(corsOptions), helmet(), bodyParser.json());

// Connect to DB
mongoose.connect(dbConfig.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
});

app.use('/api/agent-token', agentToken);

app.get('/api/status', jwt.check(), (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"status":"ok"}');
});

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
// });
//
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

// All remaining requests return the React app, so it can handle routing.
app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));