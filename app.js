const express = require('express');
const winston = require('winston');

// Initialize app
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

// Define a home route
app.get('/', (req, res) => {
    res.send('Radio api is live...');
});

// define port
const PORT = process.env.PORT || 3900;

app.set('port', PORT);

// server setup
app.listen(app.get('port'), function() {
    console.log('Server has started on port '+ app.get('port'));
});