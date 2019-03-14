const express = require('express');
const radios = require('../routes/radios');
const cities = require('../routes/cities');
const themes = require('../routes/themes');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/radios', radios);
    app.use('/api/cities', cities);
    app.use('/api/themes', themes);
    
    // Express Error Middleware function is passed after all the existing middleware functions
    app.use(error);
}