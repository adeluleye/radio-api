const express = require('express');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    
    // Express Error Middleware function is passed after all the existing middleware functions
    app.use(error);
}