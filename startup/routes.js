const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    
    // Express Error Middleware function is passed after all the existing middleware functions
    app.use(error);
}