const express = require('express');
const radios = require('../routes/radios');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/radios', radios);
    
    // Express Error Middleware function is passed after all the existing middleware functions
    app.use(error);
}